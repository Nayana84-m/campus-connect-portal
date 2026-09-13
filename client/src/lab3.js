// LAB 3: DOM Selection, Event Handling & Manipulation
// Handles real-time input preview, element styling, and adding/removing list items without page reload.

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Element Selection
    const noticeInput = document.getElementById('noticeInput');
    const addNoticeBtn = document.getElementById('addNoticeBtn');
    const toggleStyleBtn = document.getElementById('toggleStyleBtn');
    const noticeList = document.getElementById('noticeList');
    const livePreviewText = document.getElementById('livePreviewText');
    const labHeading = document.getElementById('labHeading');
    const noticeCount = document.getElementById('noticeCount');

    // Helper function to update the list item counter text
    function updateNoticeCount() {
        if (noticeCount && noticeList) {
            noticeCount.textContent = noticeList.children.length;
        }
    }

    // 2. Real-time Input Event Listener
    if (noticeInput && livePreviewText) {
        noticeInput.addEventListener('input', (event) => {
            const val = event.target.value;
            if (val.trim().length > 0) {
                livePreviewText.textContent = val;
                livePreviewText.style.color = '#0d5c3a';
                livePreviewText.style.fontWeight = '600';
            } else {
                livePreviewText.textContent = 'Start typing above to see live preview...';
                livePreviewText.style.color = '#64748b';
                livePreviewText.style.fontWeight = 'normal';
            }
        });

        // Keydown listener for 'Enter' key press
        noticeInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                addNotice();
            }
        });
    }

    // 3. Function to Create and Append a New List Item
    function addNotice() {
        const text = noticeInput.value.trim();
        if (!text) {
            alert('Please enter a notice before adding!');
            return;
        }

        // Create new li element
        const li = document.createElement('li');
        li.className = 'notice-item';

        const span = document.createElement('span');
        span.textContent = text;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '&times; Remove';
        removeBtn.setAttribute('aria-label', 'Remove notice');

        // Attach click event to remove this specific list item
        removeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            li.remove();
            updateNoticeCount();
        });

        li.appendChild(span);
        li.appendChild(removeBtn);
        noticeList.appendChild(li);

        // Reset input field & live preview
        noticeInput.value = '';
        livePreviewText.textContent = 'Start typing above to see live preview...';
        livePreviewText.style.color = '#64748b';
        livePreviewText.style.fontWeight = 'normal';

        updateNoticeCount();
    }

    // Click event listener for Add Notice button
    if (addNoticeBtn) {
        addNoticeBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevents default action / page reload
            addNotice();
        });
    }

    // 4. Click Event Listener to Update Element Text and Style dynamically
    let isHighlighted = false;
    if (toggleStyleBtn && labHeading) {
        toggleStyleBtn.addEventListener('click', (event) => {
            event.preventDefault();
            isHighlighted = !isHighlighted;
            if (isHighlighted) {
                labHeading.style.color = '#a61c1c';
                labHeading.style.textDecoration = 'underline';
                toggleStyleBtn.textContent = 'Reset Heading Style';
            } else {
                labHeading.style.color = 'var(--primary-green)';
                labHeading.style.textDecoration = 'none';
                toggleStyleBtn.textContent = 'Toggle Highlight Style';
            }
        });
    }

    // 5. Attach Remove Event Listeners to Initial Static Items
    if (noticeList) {
        const initialRemoveBtns = noticeList.querySelectorAll('.remove-btn');
        initialRemoveBtns.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const li = btn.closest('li');
                if (li) {
                    li.remove();
                    updateNoticeCount();
                }
            });
        });
    }

    updateNoticeCount();
});
