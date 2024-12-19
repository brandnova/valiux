document.addEventListener('DOMContentLoaded', function() {
    // Add toast container to body
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    // Reaction handlers
    const reactionToggle = document.querySelector('.reactions-toggle');
    const reactionButtons = document.querySelectorAll('.reaction-btn');
    
    reactionToggle?.addEventListener('click', toggleReactionsPopup);
    reactionButtons.forEach(btn => {
        btn.addEventListener('click', handleReaction);
    });

    // Bookmark handler
    const bookmarkBtn = document.querySelector('.bookmark-btn');
    bookmarkBtn?.addEventListener('click', handleBookmark);

    // Share handlers
    const shareToggle = document.querySelector('.share-toggle');
    const shareOptions = document.querySelectorAll('.share-option');
    
    shareToggle?.addEventListener('click', toggleSharePopup);
    shareOptions.forEach(option => {
        option.addEventListener('click', handleShare);
    });

    // Close popups when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.reactions-wrapper') && !e.target.closest('.share-wrapper')) {
            closeAllPopups();
        }
    });
});

// Toast styling
const toastCSS = `
.toast-container {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
}

.toast {
    padding: 12px 24px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 8px;
    margin-bottom: 10px;
    animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s;
    opacity: 0;
}

@keyframes toastIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes toastOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
}`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = toastCSS;
document.head.appendChild(style);

function showToast(message) {
    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function toggleReactionsPopup(e) {
    const popup = document.querySelector('.reactions-popup');
    togglePopup(popup);
}

function toggleSharePopup(e) {
    const popup = document.querySelector('.share-popup');
    togglePopup(popup);
}

function togglePopup(popup) {
    closeAllPopups();
    if (popup.style.display === 'none') {
        popup.style.display = 'block';
        popup.classList.add('popup-enter');
    } else {
        popup.classList.add('popup-exit');
        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove('popup-exit');
        }, 200);
    }
}

function closeAllPopups() {
    const popups = document.querySelectorAll('.reactions-popup, .share-popup');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
}

async function handleReaction(e) {
    const button = e.currentTarget;
    const reactionType = button.dataset.reaction;
    const postSlug = button.dataset.postSlug;

    try {
        const response = await fetch(`/posts/${postSlug}/react/${reactionType}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            }
        });

        const data = await response.json();
        if (data.status !== 'error') {
            updateReactionCounts(data.reaction_counts);
            updateReactionButtons(data.status, data.reaction_type);
            
            // Show appropriate toast message
            if (data.status === 'added') {
                showToast(`You reacted with ${reactionType}`);
            } else if (data.status === 'changed') {
                showToast(`Changed reaction to ${reactionType}`);
            } else if (data.status === 'removed') {
                showToast('Reaction removed');
            }
        }
    } catch (error) {
        showToast('Error processing reaction');
    }
}

async function handleBookmark(e) {
    const button = e.currentTarget;
    const postSlug = button.dataset.postSlug;

    try {
        const response = await fetch(`/posts/${postSlug}/bookmark/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            }
        });

        const data = await response.json();
        if (data.status !== 'error') {
            updateBookmarkButton(data.status === 'added');
            updateBookmarkCount(data.bookmark_count);
            showToast(data.status === 'added' ? 'Post bookmarked' : 'Bookmark removed');
        }
    } catch (error) {
        showToast('Error processing bookmark');
    }
}

function handleShare(e) {
    e.preventDefault();
    const option = e.currentTarget;
    const shareType = option.dataset.share;
    const postUrl = window.location.href;
    const postTitle = document.title;

    const shareData = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(postTitle + ' ' + postUrl)}`
    };

    if (shareType === 'copy') {
        navigator.clipboard.writeText(postUrl)
            .then(() => showToast('Link copied to clipboard!'))
            .catch(() => showToast('Failed to copy link'));
    } else if (shareType === 'native' && navigator.share) {
        navigator.share({
            title: postTitle,
            url: postUrl
        }).catch(() => showToast('Error sharing post'));
    } else if (shareData[shareType]) {
        window.open(shareData[shareType], '_blank', 'width=600,height=400');
        showToast(`Sharing on ${shareType}`);
    }

    closeAllPopups();
}

function updateReactionCounts(counts) {
    // Update individual reaction counts
    Object.entries(counts).forEach(([type, count]) => {
        const countElement = document.getElementById(`count-${type}`);
        if (countElement) {
            countElement.textContent = count;
        }
    });

    // Update total reactions count
    const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const totalCountElement = document.querySelector('.reactions-toggle .reaction-count');
    if (totalCountElement) {
        totalCountElement.textContent = totalCount;
    }
}

function updateReactionButtons(status, activeType) {
    const buttons = document.querySelectorAll('.reaction-btn');
    buttons.forEach(button => {
        const isActive = button.dataset.reaction === activeType;
        button.classList.toggle('active', isActive && status !== 'removed');
    });
}

function updateBookmarkButton(isBookmarked) {
    const button = document.querySelector('.bookmark-btn');
    const icon = button.querySelector('i');
    
    button.classList.toggle('active', isBookmarked);
    icon.classList.toggle('bi-bookmark-fill', isBookmarked);
    icon.classList.toggle('bi-bookmark', !isBookmarked);
}

function updateBookmarkCount(count) {
    const countElement = document.querySelector('.bookmark-count');
    if (countElement) {
        countElement.textContent = count;
    }
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
