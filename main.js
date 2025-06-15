// Early 2010s Blog JavaScript

// Initialize the blog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBlog();
});

function initializeBlog() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize schedule functionality if on schedule page
    if (document.getElementById('quick-add-form')) {
        initializeSchedule();
    }
    
    // Initialize post sharing
    initializeSharing();
    
    // Add some retro interactions
    addRetroEffects();
    
    console.log('Early 2010s Blog initialized! 🎉');
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchPosts();
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            searchPosts();
        });
    }
}

function searchPosts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const blogPosts = document.querySelectorAll('.blog-post');
    let foundPosts = 0;
    
    blogPosts.forEach(post => {
        const titleElement = post.querySelector('h2 a');
        const contentElement = post.querySelector('.post-content p');
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        const content = contentElement ? contentElement.textContent.toLowerCase() : '';
        const category = post.dataset.category ? post.dataset.category.toLowerCase() : '';
        const tags = post.dataset.tags ? post.dataset.tags.toLowerCase() : '';
        
        if (title.includes(searchTerm) || 
            content.includes(searchTerm) || 
            category.includes(searchTerm) || 
            tags.includes(searchTerm)) {
            post.style.display = 'block';
            foundPosts++;
        } else {
            post.style.display = 'none';
        }
    });
    
    // Show search results feedback
    showSearchFeedback(searchTerm, foundPosts);
}

function showSearchFeedback(searchTerm, count) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.search-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    if (searchTerm) {
        const feedback = document.createElement('div');
        feedback.className = 'search-feedback';
        feedback.style.cssText = `
            background: #e6f2ff;
            border: 1px solid #b3d9ff;
            padding: 10px;
            margin: 10px 20px;
            border-radius: 3px;
            font-size: 12px;
            color: #0066cc;
        `;
        feedback.innerHTML = `
            Search results for "<strong>${searchTerm}</strong>": ${count} post${count !== 1 ? 's' : ''} found
            <button onclick="clearSearch()" style="float: right; background: none; border: none; color: #0066cc; cursor: pointer; font-size: 12px;">Clear</button>
        `;
        
        const blogPosts = document.getElementById('blog-posts');
        blogPosts.parentNode.insertBefore(feedback, blogPosts);
    }
}

function clearSearch() {
    document.getElementById('search').value = '';
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.style.display = 'block';
    });
    
    const feedback = document.querySelector('.search-feedback');
    if (feedback) {
        feedback.remove();
    }
}

// Filter functionality
function filterByCategory(category) {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        if (post.dataset.category === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
    
    showFilterFeedback('category', category);
}

function filterByTag(tag) {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        if (post.dataset.tags.includes(tag)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
    
    showFilterFeedback('tag', tag);
}

function showFilterFeedback(type, value) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.search-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = 'search-feedback';
    feedback.style.cssText = `
        background: #fff4e6;
        border: 1px solid #ffcc80;
        padding: 10px;
        margin: 10px 20px;
        border-radius: 3px;
        font-size: 12px;
        color: #cc6600;
    `;
    feedback.innerHTML = `
        Showing posts filtered by ${type}: <strong>${value}</strong>
        <button onclick="clearFilter()" style="float: right; background: none; border: none; color: #cc6600; cursor: pointer; font-size: 12px;">Show All</button>
    `;
    
    const blogPosts = document.getElementById('blog-posts');
    blogPosts.parentNode.insertBefore(feedback, blogPosts);
}

function clearFilter() {
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.style.display = 'block';
    });
    
    const feedback = document.querySelector('.search-feedback');
    if (feedback) {
        feedback.remove();
    }
}

// Pagination functionality
let currentPage = 1;
const postsPerPage = 5;

function nextPage() {
    // In a real implementation, this would load more posts
    console.log('Loading next page...');
    // For demo purposes, just show an alert
    showRetroAlert('Loading more posts...', 'info');
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        console.log('Loading previous page...');
        showRetroAlert('Loading previous posts...', 'info');
    }
}

// Schedule functionality
function initializeSchedule() {
    const quickAddForm = document.getElementById('quick-add-form');
    if (quickAddForm) {
        quickAddForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewTask();
        });
    }
}

function addNewTask() {
    const taskInput = document.getElementById('new-task');
    const taskType = document.getElementById('task-type');
    
    if (taskInput.value.trim()) {
        const task = {
            text: taskInput.value.trim(),
            type: taskType.value,
            time: 'All Day',
            priority: 'Medium'
        };
        
        addTaskToSchedule(task);
        taskInput.value = '';
        
        showRetroAlert('Task added successfully!', 'success');
    }
}

function addTaskToSchedule(task) {
    const todaySection = document.querySelector('.schedule-section');
    const newItem = document.createElement('div');
    newItem.className = `schedule-item ${task.type}`;
    newItem.dataset.type = task.type;
    
    newItem.innerHTML = `
        <div class="item-time">${task.time}</div>
        <div class="item-content">
            <h4>${task.text}</h4>
            <p>Added via quick add</p>
            <div class="item-meta">
                <span class="item-type">${task.type.charAt(0).toUpperCase() + task.type.slice(1)}</span>
                <span class="item-priority">${task.priority}</span>
            </div>
        </div>
        <div class="item-actions">
            <button onclick="markComplete(this)">✓</button>
            <button onclick="editItem(this)">Edit</button>
        </div>
    `;
    
    todaySection.appendChild(newItem);
}

function markComplete(button) {
    const item = button.closest('.schedule-item');
    item.style.opacity = '0.6';
    item.style.textDecoration = 'line-through';
    
    // Move to completed section
    setTimeout(() => {
        moveToCompleted(item);
    }, 500);
    
    showRetroAlert('Task completed!', 'success');
}

function moveToCompleted(item) {
    let completedSection = document.getElementById('completed-section');
    
    if (completedSection.style.display === 'none') {
        completedSection.style.display = 'block';
    }
    
    const completedItems = document.getElementById('completed-items');
    item.querySelector('.item-actions').innerHTML = '<button onclick="removeItem(this)">Remove</button>';
    completedItems.appendChild(item);
}

function editItem(button) {
    const item = button.closest('.schedule-item');
    const title = item.querySelector('h4');
    const currentText = title.textContent;
    
    const newText = prompt('Edit task:', currentText);
    if (newText && newText.trim()) {
        title.textContent = newText.trim();
        showRetroAlert('Task updated!', 'success');
    }
}

function removeItem(button) {
    const item = button.closest('.schedule-item');
    item.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
        item.remove();
    }, 300);
}

// Calendar functionality
function prevMonth() {
    showRetroAlert('Previous month - Calendar functionality would go here!', 'info');
}

function nextMonth() {
    showRetroAlert('Next month - Calendar functionality would go here!', 'info');
}

// Filter functionality for schedule
function toggleFilter(type) {
    const items = document.querySelectorAll(`[data-type="${type}"]`);
    const checkbox = event.target;
    
    items.forEach(item => {
        item.style.display = checkbox.checked ? 'flex' : 'none';
    });
}

// View switching
function setView(viewType) {
    const buttons = document.querySelectorAll('.view-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    event.target.classList.add('active');
    
    if (viewType === 'calendar') {
        showRetroAlert('Calendar view would show here!', 'info');
    }
}

// Sharing functionality
function initializeSharing() {
    // Add sharing capabilities
    window.sharePost = function(platform) {
        const title = document.title;
        const url = window.location.href;
        
        switch(platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
                break;
        }
    };
}

// Retro effects and interactions
function addRetroEffects() {
    // Add subtle sound effects (if audio is enabled)
    addClickSounds();
    
    // Add some retro loading effects
    addLoadingEffects();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
}

function addClickSounds() {
    // Add click sounds to buttons (silent by default, can be enabled)
    const buttons = document.querySelectorAll('button, .read-more, nav a');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Could add a subtle click sound here
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

function addLoadingEffects() {
    // Add subtle loading animations
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!e.ctrlKey && !e.metaKey) {
                showLoadingIndicator();
            }
        });
    });
}

function showLoadingIndicator() {
    const loader = document.createElement('div');
    loader.id = 'retro-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(to right, #4682B4, #36648B);
        z-index: 9999;
        animation: loadingBar 0.8s ease-out;
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        if (loader.parentNode) {
            loader.remove();
        }
    }, 800);
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // ESC to clear search/filters
        if (e.key === 'Escape') {
            clearSearch();
            clearFilter();
        }
    });
}

// Retro alert system
function showRetroAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `retro-alert retro-alert-${type}`;
    
    const colors = {
        success: { bg: '#e6ffe6', border: '#80ff80', text: '#006600' },
        error: { bg: '#ffe6e6', border: '#ff8080', text: '#cc0000' },
        info: { bg: '#e6f2ff', border: '#80bfff', text: '#0066cc' },
        warning: { bg: '#fff4e6', border: '#ffcc80', text: '#cc6600' }
    };
    
    const color = colors[type];
    
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color.bg};
        border: 2px solid ${color.border};
        color: ${color.text};
        padding: 12px 16px;
        border-radius: 3px;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    alert.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: ${color.text};
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    closeBtn.onclick = () => alert.remove();
    alert.appendChild(closeBtn);
    
    document.body.appendChild(alert);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => alert.remove(), 300);
        }
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes loadingBar {
        from { width: 0%; }
        to { width: 100%; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
`;
document.head.appendChild(style);