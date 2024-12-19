document.addEventListener('DOMContentLoaded', function() {
    // Main comment form submission
    const mainCommentForm = document.getElementById('main-comment-form');
    if (mainCommentForm) {
        mainCommentForm.addEventListener('submit', handleCommentSubmit);
    }

    // Reply button click handlers
    document.querySelectorAll('.reply-toggle').forEach(button => {
        button.addEventListener('click', toggleReplyForm);
    });

    // Reply form submission handlers
    document.querySelectorAll('.reply-form').forEach(form => {
        form.addEventListener('submit', handleReplySubmit);
    });

    // Cancel reply button handlers
    document.querySelectorAll('.cancel-reply').forEach(button => {
        button.addEventListener('click', cancelReply);
    });
});

function toggleReplyForm(e) {
    const commentId = e.target.dataset.commentId;
    const replyForm = document.getElementById(`reply-form-${commentId}`);
    replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
}

function cancelReply(e) {
    const form = e.target.closest('.reply-form');
    form.style.display = 'none';
    form.reset();
}

function formatTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

async function handleCommentSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const postSlug = form.dataset.postSlug;
    const commentText = form.querySelector('textarea[name="comment"]').value;

    try {
        const response = await fetch(`/posts/${postSlug}/comment/add/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'comment': commentText,
            })
        });

        const data = await response.json();
        if (data.status === 'success') {
            addCommentToDOM(data.comment);
            form.reset();
            updateCommentsCount(1);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function handleReplySubmit(e) {
    e.preventDefault();
    const form = e.target;
    const postSlug = form.dataset.postSlug;
    const parentId = form.querySelector('input[name="parent_id"]').value;
    const replyText = form.querySelector('textarea[name="comment"]').value;

    try {
        const response = await fetch(`/posts/${postSlug}/comment/add/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'comment': replyText,
                'parent_id': parentId
            })
        });

        const data = await response.json();
        if (data.status === 'success') {
            addReplyToDOM(data.comment, parentId);
            form.reset();
            form.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function addCommentToDOM(comment) {
    const commentsContainer = document.getElementById('comments-container');
    const commentHTML = `
        <div class="comment d-flex mb-4" id="comment-${comment.id}">
            <div class="flex-shrink-0">
                <div class="avatar avatar-sm rounded-circle">
                    <img class="avatar-img" src="${comment.user_avatar || '/static/assets/img/default-avatar.jpg'}" alt="${comment.username}">
                </div>
            </div>
            <div class="flex-grow-1 ms-2 ms-sm-3">
                <div class="comment-meta d-flex align-items-baseline">
                    <h6 class="me-2">${comment.username}</h6>
                    <span class="text-muted">${formatTimeAgo(comment.created_at)}</span>
                </div>
                <div class="comment-body">
                    ${comment.comment}
                </div>
                <button class="btn btn-sm btn-outline-secondary reply-toggle mt-2" 
                        data-comment-id="${comment.id}">
                    Reply
                </button>
                <form method="post" class="reply-form mt-2" 
                    data-post-slug="${window.location.pathname.split('/')[2]}"
                    id="reply-form-${comment.id}" 
                    style="display:none;">
                    <input type="hidden" name="parent_id" value="${comment.id}">
                    <div class="form-group">
                        <textarea name="comment" class="form-control" 
                                placeholder="Write your reply" 
                                required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mt-2">Post Reply</button>
                    <button type="button" class="btn btn-secondary mt-2 ml-2 cancel-reply">Cancel</button>
                </form>
                <div class="comment-replies-container" id="replies-container-${comment.id}"></div>
            </div>
        </div>
    `;
    commentsContainer.insertAdjacentHTML('afterbegin', commentHTML);
    
    // Add event listeners to new elements
    const newReplyToggle = document.querySelector(`#comment-${comment.id} .reply-toggle`);
    const newReplyForm = document.querySelector(`#reply-form-${comment.id}`);
    const newCancelButton = document.querySelector(`#reply-form-${comment.id} .cancel-reply`);
    
    newReplyToggle.addEventListener('click', toggleReplyForm);
    newReplyForm.addEventListener('submit', handleReplySubmit);
    newCancelButton.addEventListener('click', cancelReply);
}

// Add this to your existing DOMContentLoaded event listener
document.querySelectorAll('.toggle-replies').forEach(button => {
    button.addEventListener('click', toggleReplies);
});

function toggleReplies(e) {
    const button = e.target;
    const repliesContainer = button.closest('.comment').querySelector('.comment-replies');
    const isCollapsed = repliesContainer.classList.contains('collapsed');
    
    if (isCollapsed) {
        repliesContainer.classList.remove('collapsed');
        button.textContent = 'Hide Replies';
    } else {
        repliesContainer.classList.add('collapsed');
        button.textContent = 'Show Replies';
    }
}

// Modify your addReplyToDOM function to include the collapse button
function addReplyToDOM(reply, parentId) {
    const repliesContainer = document.querySelector(`#replies-container-${parentId}`);
    let mainRepliesContainer = repliesContainer.querySelector('.comment-replies');
    
    if (!mainRepliesContainer) {
        repliesContainer.innerHTML = `
            <button class="btn btn-sm btn-link toggle-replies mb-2">Show Replies</button>
            <div class="comment-replies bg-light p-3 mt-3 rounded collapsed">
                <h6 class="comment-replies-title mb-4 text-muted text-uppercase">1 Reply</h6>
                <div id="main-replies-container"></div>
            </div>
        `;
        mainRepliesContainer = repliesContainer.querySelector('#main-replies-container');
        
        // Add event listener to new toggle button
        const newToggleButton = repliesContainer.querySelector('.toggle-replies');
        newToggleButton.addEventListener('click', toggleReplies);
    }


    const replyHTML = `
        <div class="reply d-flex mb-3" id="reply-${reply.id}">
            <div class="flex-shrink-0">
                <div class="avatar avatar-sm rounded-circle">
                    <img class="avatar-img" src="${reply.user_avatar || '/static/assets/img/default-avatar.jpg'}" alt="${reply.username}">
                </div>
            </div>
            <div class="flex-grow-1 ms-2 ms-sm-3">
                <div class="reply-meta d-flex align-items-baseline">
                    <h6 class="mb-0 me-2">${reply.username}</h6>
                    <span class="text-muted">${formatTimeAgo(reply.created_at)}</span>
                </div>
                <div class="reply-body">
                    ${reply.comment}
                </div>
            </div>
        </div>
    `;
    mainRepliesContainer.insertAdjacentHTML('beforeend', replyHTML);
    
    // Update replies count
    const repliesTitle = repliesContainer.querySelector('.comment-replies-title');
    const currentCount = parseInt(repliesTitle.textContent.split(' ')[0]) || 0;
    repliesTitle.textContent = `${currentCount + 1} Replies`;
}

function updateCommentsCount(increment) {
    const commentsCountElement = document.getElementById('comments-count');
    const currentCount = parseInt(commentsCountElement.textContent.split(' ')[0]);
    commentsCountElement.textContent = `${currentCount + increment} Comments`;
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
