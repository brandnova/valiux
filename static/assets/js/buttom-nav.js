// Category and subcategory toggle buttons
document.querySelectorAll('.toggle-subcategories').forEach((toggleButton) => {
    toggleButton.addEventListener('click', (event) => {
        // Get the sibling element (subcategories list)
        const subcategories = toggleButton.nextElementSibling;

        // Check if the subcategories exist and toggle the 'show' class
        if (subcategories && subcategories.classList.contains('subcategories')) {
            subcategories.classList.toggle('show');

            // Change the icon dynamically
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('bi-chevron-down'); // Default closed icon
                icon.classList.toggle('bi-chevron-up');   // Opened icon
            }
        }
    });
});



// Dynamic Comments JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Utility function for human-readable timestamps
    function timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 120) return '1 minute ago';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 7200) return '1 hour ago';
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 172800) return '1 day ago';
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }

    // Main comment form submission
    const mainCommentForm = document.getElementById('main-comment-form');
    if (mainCommentForm) {
        mainCommentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitComment(this, null);
        });
    }

    // Reply form toggles
    function setupReplyToggles() {
        const replyToggles = document.querySelectorAll('.reply-toggle');
        replyToggles.forEach(toggle => {
            toggle.innerHTML = `<i class="bi bi-chat-left-text"></i> Reply`;
            toggle.addEventListener('click', function() {
                const commentId = this.getAttribute('data-comment-id');
                const replyForm = document.getElementById(`reply-form-${commentId}`);
                const repliesContainer = replyForm.closest('.flex-grow-1').querySelector('.comment-replies-container');
                
                // Toggle form visibility
                replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
                
                // Focus on textarea when opened
                if (replyForm.style.display === 'block') {
                    replyForm.querySelector('textarea').focus();
                }
            });
        });
    }

    // Cancel reply buttons
    function setupCancelReplyButtons() {
        const cancelReplyButtons = document.querySelectorAll('.cancel-reply');
        cancelReplyButtons.forEach(button => {
            button.innerHTML = `<i class="bi bi-x-circle"></i> Cancel`;
            button.addEventListener('click', function() {
                const replyForm = this.closest('.reply-form');
                replyForm.style.display = 'none';
            });
        });
    }

    // Reply form submissions
    function setupReplyFormSubmissions() {
        const replyForms = document.querySelectorAll('.reply-form');
        replyForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const parentId = this.querySelector('input[name="parent_id"]').value;
                submitComment(this, parentId);
            });
        });
    }

    function submitComment(form, parentId) {
        const commentTextarea = form.querySelector('textarea[name="comment"]');
        const commentText = commentTextarea.value.trim();
        const postSlug = form.getAttribute('data-post-slug');

        if (!commentText) {
            alert('Please enter a comment');
            return;
        }

        const formData = new FormData();
        formData.append('comment', commentText);
        if (parentId) {
            formData.append('parent_id', parentId);
        }

        fetch(`/posts/${postSlug}/comment/add/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const comment = data.comment;
                
                // Clear the textarea
                commentTextarea.value = '';

                // Update comments count
                const commentsCountEl = document.getElementById('comments-count');
                const currentCount = parseInt(commentsCountEl.textContent);
                commentsCountEl.textContent = `${currentCount + 1} Comments`;

                // Create comment HTML
                if (comment.parent_id) {
                    // It's a reply
                    const repliesContainer = document.getElementById(`replies-container-${comment.parent_id}`);
                    
                    // Check if replies container exists, if not create it
                    if (!repliesContainer) {
                        const commentEl = document.getElementById(`comment-${comment.parent_id}`);
                        const newRepliesContainer = document.createElement('div');
                        newRepliesContainer.id = `replies-container-${comment.parent_id}`;
                        newRepliesContainer.className = 'comment-replies-container';
                        commentEl.querySelector('.flex-grow-1').appendChild(newRepliesContainer);
                    }

                    // Create replies container if not exists
                    if (repliesContainer.querySelector('.comment-replies') === null) {
                        const repliesWrapper = document.createElement('div');
                        repliesWrapper.className = 'comment-replies bg-light p-3 mt-3 rounded';
                        repliesWrapper.innerHTML = `
                            <h6 class="comment-replies-title mb-4 text-muted text-uppercase">
                                1 Reply
                            </h6>
                        `;
                        repliesContainer.appendChild(repliesWrapper);
                    }

                    const repliesTitle = repliesContainer.querySelector('.comment-replies-title');
                    if (repliesTitle) {
                        const currentReplyText = repliesTitle.textContent.trim();
                        const currentReplyCount = currentReplyText.split(' ')[0] === 'Replies' ? 0 : parseInt(currentReplyText);
                        repliesTitle.textContent = `${currentReplyCount + 1} ${currentReplyCount + 1 === 1 ? 'Reply' : 'Replies'}`;
                    }

                    const replyHTML = `
                        <div class="reply d-flex mb-3" id="reply-${comment.id}">
                            <div class="flex-shrink-0">
                                <div class="avatar avatar-sm rounded-circle">
                                    <img class="avatar-img" src="{% static 'assets/img/default-avatar.jpg' %}" alt="${comment.username}">
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-2 ms-sm-3">
                                <div class="reply-meta d-flex align-items-baseline">
                                    <h6 class="mb-0 me-2">${comment.username}</h6>
                                    <span class="text-muted">${timeAgo(comment.created_at)}</span>
                                </div>
                                <div class="reply-body">
                                    ${comment.comment}
                                </div>
                            </div>
                        </div>
                    `;
                    
                    repliesContainer.querySelector('.comment-replies').insertAdjacentHTML('beforeend', replyHTML);
                    
                    // Hide reply form
                    const replyForm = document.getElementById(`reply-form-${comment.parent_id}`);
                    if (replyForm) replyForm.style.display = 'none';
                } else {
                    // Top-level comment
                    const commentHTML = `
                        <div class="comment d-flex mb-4" id="comment-${comment.id}">
                            <div class="flex-shrink-0">
                                <div class="avatar avatar-sm rounded-circle">
                                    <img class="avatar-img" src="{% static 'assets/img/default-avatar.jpg' %}" alt="${comment.username}">
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-2 ms-sm-3">
                                <div class="comment-meta d-flex align-items-baseline">
                                    <h6 class="me-2">${comment.username}</h6>
                                    <span class="text-muted">${timeAgo(comment.created_at)}</span>
                                </div>
                                <div class="comment-body">
                                    ${comment.comment}
                                </div>
                                <button class="btn btn-sm btn-outline-secondary reply-toggle mt-2" 
                                        data-comment-id="${comment.id}">
                                    <i class="bi bi-chat-left-text"></i> Reply
                                </button>
                                <form method="post" class="reply-form mt-2" 
                                    data-post-slug="{{ post.slug }}"
                                    id="reply-form-${comment.id}" 
                                    style="display:none;">
                                    {% csrf_token %}
                                    <input type="hidden" name="parent_id" value="${comment.id}">
                                    <div class="form-group">
                                        <textarea name="comment" class="form-control" 
                                                placeholder="Write your reply" 
                                                required></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-2">Post Reply</button>
                                    <button type="button" class="btn btn-secondary mt-2 ml-2 cancel-reply">
                                        <i class="bi bi-x-circle"></i> Cancel
                                    </button>
                                </form>
                                <div class="comment-replies-container" id="replies-container-${comment.id}"></div>
                            </div>
                        </div>
                    `;
                    
                    document.getElementById('comments-container').insertAdjacentHTML('afterbegin', commentHTML);
                    
                    // Re-attach event listeners
                    setupReplyToggles();
                    setupCancelReplyButtons();
                    setupReplyFormSubmissions();
                }
            } else {
                alert('An error occurred while submitting the comment');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the comment');
        });
    }

    // Initial setup
    setupReplyToggles();
    setupCancelReplyButtons();
    setupReplyFormSubmissions();
});


// Post Interactions Script

document.addEventListener('DOMContentLoaded', function() {
    const postSlug = document.querySelector('meta[name="post-slug"]').getAttribute('content');
    const postUrl = window.location.href;
    const postTitle = document.querySelector('meta[name="title"]')?.content || document.title;
    
    // Persistent State Management
    const PersistentState = {
        getBookmarkState() {
            return localStorage.getItem(`bookmark_${postSlug}`) === 'true';
        },
        setBookmarkState(isBookmarked) {
            localStorage.setItem(`bookmark_${postSlug}`, isBookmarked);
        },
        getReactionState() {
            return localStorage.getItem(`reaction_${postSlug}`) || null;
        },
        setReactionState(reactionType) {
            localStorage.setItem(`reaction_${postSlug}`, reactionType);
        },
        clearReactionState() {
            localStorage.removeItem(`reaction_${postSlug}`);
        }
    };

    // Interaction Container Creation
    const createInteractionContainer = () => {
        const container = document.createElement('div');
        container.classList.add('post-interactions-container');
        container.innerHTML = `
            <div class="post-interactions-backdrop"></div>
            <div class="post-interactions-modal">
                <div class="modal-header">
                    <h5 class="modal-title">React to Post</h5>
                    <button type="button" class="btn-close close-reactions-modal"></button>
                </div>
                <div class="reactions-grid">
                    ${[
                        ['like', '👍', 'Like'], 
                        ['love', '❤️', 'Love'], 
                        ['laugh', '😂', 'Laugh'], 
                        ['surprise', '😮', 'Surprise'], 
                        ['sad', '😢', 'Sad'], 
                        ['dislike', '👎', 'Dislike']
                    ].map(([type, emoji, label]) => `
                        <button 
                            class="reaction-button" 
                            data-reaction="${type}"
                        >
                            <span class="reaction-emoji">${emoji}</span>
                            <span class="reaction-label">${label}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="post-interactions-navbar">
                <div class="interactions-wrapper">
                    <button class="interaction-btn btn-reactions" id="show-reactions-btn">
                        <span class="reaction-icon">🙂</span>
                        <span class="interaction-label">React</span>
                    </button>
                    <button class="interaction-btn btn-bookmark" id="bookmark-btn">
                        <i class="bi bi-bookmark"></i>
                        <span class="interaction-label">Bookmark</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
        return container;
    };

    const interactionsContainer = createInteractionContainer();
    const reactionsModal = interactionsContainer.querySelector('.post-interactions-modal');
    const reactionsBackdrop = interactionsContainer.querySelector('.post-interactions-backdrop');
    const showReactionsBtn = document.getElementById('show-reactions-btn');
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const reactionButtons = reactionsModal.querySelectorAll('.reaction-button');
    const closeReactionsModalBtn = reactionsModal.querySelector('.btn-close');

    // Initialize Persistent States
    function initializePersistentStates() {
        // Bookmark State
        const isBookmarked = PersistentState.getBookmarkState();
        bookmarkBtn.classList.toggle('bookmarked', isBookmarked);

        // Reaction State
        const savedReaction = PersistentState.getReactionState();
        if (savedReaction) {
            updateReactionButtonState(savedReaction);
        }
    }

    // Update Reaction Button State
    function updateReactionButtonState(reactionType) {
        const reactionEmoji = {
            'like': '👍', 'love': '❤️', 'laugh': '😂', 
            'surprise': '😮', 'sad': '😢', 'dislike': '👎'
        };
        
        showReactionsBtn.querySelector('.reaction-icon').textContent = 
            reactionEmoji[reactionType] || '🙂';
    }

    // Show Reactions Modal
    showReactionsBtn.addEventListener('click', () => {
        reactionsModal.classList.add('show');
        reactionsBackdrop.classList.add('show');
    });

    // Close Reactions Modal
    function closeReactionsModal() {
        reactionsModal.classList.remove('show');
        reactionsBackdrop.classList.remove('show');
    }

    closeReactionsModalBtn.addEventListener('click', closeReactionsModal);
    reactionsBackdrop.addEventListener('click', closeReactionsModal);

    // Reaction Handling
    reactionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reactionType = this.getAttribute('data-reaction');
            sendReaction(reactionType);
        });
    });

    // Send Reaction via AJAX
    function sendReaction(reactionType) {
        fetch(`/posts/${postSlug}/react/${reactionType}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'added' || data.status === 'changed') {
                updateReactionButtonState(reactionType);
                PersistentState.setReactionState(reactionType);
            } else if (data.status === 'removed') {
                showReactionsBtn.querySelector('.reaction-icon').textContent = '🙂';
                PersistentState.clearReactionState();
            }
            closeReactionsModal();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send reaction. Please try again.');
        });
    }

    // Bookmark Handling
    bookmarkBtn.addEventListener('click', function() {
        fetch(`/posts/${postSlug}/bookmark/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            const isBookmarked = data.status === 'added';
            bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
            PersistentState.setBookmarkState(isBookmarked);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to toggle bookmark. Please try again.');
        });
    });

    // Get CSRF Token
    function getCsrfToken() {
        const csrfTokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
        return csrfTokenElement ? csrfTokenElement.value : '';
    }


    // Share Functionality
    const createShareContainer = () => {
        const shareContainer = document.createElement('div');
        shareContainer.classList.add('share-modal');
        shareContainer.innerHTML = `
            <div class="share-modal-backdrop"></div>
            <div class="share-modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Share Post</h5>
                    <button type="button" class="btn-close close-share-modal"></button>
                </div>
                <div class="share-options">
                    <button class="share-option" data-share-type="copy">
                        <i class="bi bi-link-45deg"></i>
                        <span>Copy Link</span>
                    </button>
                    <button class="share-option" data-share-type="facebook">
                        <i class="bi bi-facebook"></i>
                        <span>Facebook</span>
                    </button>
                    <button class="share-option" data-share-type="twitter">
                        <i class="bi bi-twitter-x"></i>
                        <span>X (Twitter)</span>
                    </button>
                    <button class="share-option" data-share-type="linkedin">
                        <i class="bi bi-linkedin"></i>
                        <span>LinkedIn</span>
                    </button>
                    <button class="share-option" data-share-type="native">
                        <i class="bi bi-share-fill"></i>
                        <span>Native Share</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(shareContainer);
        return shareContainer;
    };

    const shareContainer = createShareContainer();
    const shareModal = shareContainer.querySelector('.share-modal-content');
    const shareBackdrop = shareContainer.querySelector('.share-modal-backdrop');
    const shareBtn = document.createElement('button');
    shareBtn.classList.add('interaction-btn', 'btn-share');
    shareBtn.innerHTML = `
        <i class="bi bi-share-fill"></i>
        <span class="interaction-label">Share</span>
    `;

    // Add share button to interactions wrapper
    document.querySelector('.interactions-wrapper').appendChild(shareBtn);

    // Share Modal Functionality
    const closeShareModal = () => {
        shareModal.classList.remove('show');
        shareBackdrop.classList.remove('show');
    };

    shareBtn.addEventListener('click', () => {
        shareModal.classList.add('show');
        shareBackdrop.classList.add('show');
    });

    shareContainer.querySelector('.close-share-modal').addEventListener('click', closeShareModal);
    shareBackdrop.addEventListener('click', closeShareModal);

    // Share Options Handler
    const shareOptions = shareContainer.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', function() {
            const shareType = this.getAttribute('data-share-type');
            handleShareOption(shareType);
        });
    });

    function handleShareOption(shareType) {
        switch(shareType) {
            case 'copy':
                copyPostLink();
                break;
            case 'facebook':
                shareFacebook();
                break;
            case 'twitter':
                shareTwitter();
                break;
            case 'linkedin':
                shareLinkedIn();
                break;
            case 'native':
                nativeShare();
                break;
        }
        closeShareModal();
    }

    function copyPostLink() {
        navigator.clipboard.writeText(postUrl).then(() => {
            showToast('Link copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            showToast('Failed to copy link');
        });
    }

    function shareFacebook() {
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        window.open(fbShareUrl, '_blank');
    }

    function shareTwitter() {
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
        window.open(twitterShareUrl, '_blank');
    }

    function shareLinkedIn() {
        const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        window.open(linkedinShareUrl, '_blank');
    }

    function nativeShare() {
        if (navigator.share) {
            navigator.share({
                title: postTitle,
                url: postUrl
            }).catch(console.error);
        } else {
            showToast('Native sharing not supported');
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('custom-toast');
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 2000);
        }, 10);
    }

    // Initialize on page load
    initializePersistentStates();
});