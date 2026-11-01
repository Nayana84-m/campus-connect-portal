// LAB 3: DOM Selection, Event Handling & Manipulation
// Handles real-time input preview, element styling, and adding/removing list items without page reload.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Role Portal Access Button Click Handler (Navigates to Student, Faculty, or Admin Portal)
    const portalBtns = document.querySelectorAll('.btn-portal');
    portalBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let roleName = 'student';
            if (btn.classList.contains('faculty-bg') || btn.innerText.includes('Faculty')) {
                roleName = 'faculty';
            } else if (btn.classList.contains('admin-bg') || btn.innerText.includes('Admin')) {
                roleName = 'admin';
            }

            // Update URL hash & dispatch switchPortal event to App.jsx
            window.location.hash = `#${roleName}`;
            window.dispatchEvent(new CustomEvent('switchPortal', { detail: { role: roleName } }));

            // Dispatch custom role event to React AuthModule as well
            window.dispatchEvent(new CustomEvent('roleSelect', { detail: { role: roleName } }));

            // Smooth scroll to the portal container
            const mountElem = document.getElementById('register') || document.getElementById('portalMountPoint');
            if (mountElem) {
                mountElem.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Navbar Login / Register Anchor click handlers
    const navLogin = document.querySelector('a[href="#login"]');
    const navRegister = document.querySelector('a[href="#register"]');

    if (navLogin) {
        navLogin.addEventListener('click', (e) => {
            window.location.hash = '#login';
            window.dispatchEvent(new CustomEvent('switchPortal', { detail: { role: 'auth' } }));
        });
    }

    if (navRegister) {
        navRegister.addEventListener('click', (e) => {
            window.location.hash = '#register';
            window.dispatchEvent(new CustomEvent('switchPortal', { detail: { role: 'auth' } }));
        });
    }
});
