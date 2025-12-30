document.addEventListener('DOMContentLoaded', () => {
    // 0. Authentication Check
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // --- CUSTOM MODAL UTILS ---
    window.showConfirm = (title, message, onConfirm) => {
        const modal = document.getElementById('generic-modal');
        if (!modal) return;

        document.getElementById('generic-modal-title').textContent = title;
        document.getElementById('generic-modal-message').textContent = message;

        const confirmBtn = document.getElementById('generic-modal-confirm');
        confirmBtn.textContent = 'Confirm';
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        newConfirmBtn.addEventListener('click', () => {
            onConfirm();
            modal.classList.remove('show');
        });

        const cancelBtn = document.getElementById('generic-modal-cancel');
        cancelBtn.style.display = 'block';
        cancelBtn.onclick = () => modal.classList.remove('show');

        document.getElementById('close-generic-modal').onclick = () => modal.classList.remove('show');
        modal.classList.add('show');
    };

    window.showAlert = (title, message) => {
        const modal = document.getElementById('generic-modal');
        if (!modal) {
            alert(message);
            return;
        }

        document.getElementById('generic-modal-title').textContent = title;
        document.getElementById('generic-modal-message').innerHTML = message.replace(/\n/g, '<br>');

        const confirmBtn = document.getElementById('generic-modal-confirm');
        confirmBtn.textContent = 'OK';

        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        newConfirmBtn.addEventListener('click', () => modal.classList.remove('show'));

        document.getElementById('generic-modal-cancel').style.display = 'none';
        document.getElementById('close-generic-modal').onclick = () => modal.classList.remove('show');

        modal.classList.add('show');
    };

    // 1. Sidebar Toggle (Desktop)
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    // --- MOBILE SIDEBAR LOGIC ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('show-mobile');
        });
    }

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.remove('show-mobile');
        });
    }

    // Close Sidebar on Overlay Click (Clicking outside)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('show-mobile')) {
            // Check if click target is NOT inside sidebar and NOT inside the menu button
            if (!sidebar.contains(e.target) && (!mobileMenuBtn || !mobileMenuBtn.contains(e.target))) {
                sidebar.classList.remove('show-mobile');
            }
        }
    });

    // 2. Navigation Logic
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${sectionId}-section`) {
                    section.classList.add('active');
                }
            });
            // Close sidebar on mobile when item clicked
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show-mobile');
            }
        });
    });

    // 3. Animated Counters
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('$', '').replace('%', '');
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // 4. Notification Dropdown
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
            const profileMenu = document.getElementById('profile-menu');
            if (profileMenu) profileMenu.classList.remove('show');
        });
    }

    const markReadBtn = document.querySelector('.mark-read');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', () => {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            const badge = document.querySelector('.badge');
            if (badge) badge.textContent = '';
        });
    }

    // 5. Profile Dropdown Logic
    const profileBtn = document.getElementById('profile-btn');
    const profileMenu = document.getElementById('profile-menu');

    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('show');
            if (notificationDropdown) notificationDropdown.classList.remove('show');
        });
    }

    if (profileMenu) {
        profileMenu.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            e.preventDefault();
            const href = link.getAttribute('href');

            if (href === '#settings') {
                navItems.forEach(nav => nav.classList.remove('active'));
                const settingsNav = document.querySelector('[data-section="settings"]');
                if (settingsNav) settingsNav.classList.add('active');
                sections.forEach(section => section.classList.remove('active'));
                const settingsSection = document.getElementById('settings-section');
                if (settingsSection) settingsSection.classList.add('active');

            } else if (href === '#logout') {
                window.showConfirm('Logout', 'Are you sure you want to logout?', () => {
                    localStorage.removeItem('isLoggedIn');
                    window.location.href = 'login.html';
                });
            } else if (href === '#help') {
                window.showAlert('Help & Support', 'Contact: support@nexdash.com\nPhone: +1 555-0123');
            } else if (href === '#profile') {
                navItems.forEach(nav => nav.classList.remove('active'));
                const settingsNav = document.querySelector('[data-section="settings"]');
                if (settingsNav) settingsNav.classList.add('active');
                sections.forEach(section => section.classList.remove('active'));
                const settingsSection = document.getElementById('settings-section');
                if (settingsSection) settingsSection.classList.add('active');
            }

            profileMenu.classList.remove('show');
        });
    }

    document.addEventListener('click', () => {
        if (notificationDropdown) notificationDropdown.classList.remove('show');
        if (profileMenu) profileMenu.classList.remove('show');
    });

    // 6. Add User Modal
    const addUserBtn = document.querySelector('.header-actions .primary-btn');
    const modal = document.getElementById('add-user-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelModal = document.getElementById('cancel-modal');
    const saveUser = document.getElementById('save-user');

    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            window.editingUserId = null;
            document.querySelector('#add-user-modal .modal-header h2').textContent = 'Add New User';
            document.getElementById('new-user-name').value = '';
            document.getElementById('new-user-email').value = '';
            document.getElementById('new-user-role').selectedIndex = 1;
            document.getElementById('new-user-status').selectedIndex = 0;
            modal.classList.add('show');
        });
    }

    if (closeModal) closeModal.addEventListener('click', () => modal.classList.remove('show'));
    if (cancelModal) cancelModal.addEventListener('click', () => modal.classList.remove('show'));

    if (saveUser) {
        saveUser.addEventListener('click', () => {
            const name = document.getElementById('new-user-name').value.trim();
            const email = document.getElementById('new-user-email').value.trim();
            const role = document.getElementById('new-user-role').value;
            const status = document.getElementById('new-user-status').value;

            if (!name || !email) {
                window.showAlert('Validation Error', 'Please fill in all required fields!');
                return;
            }

            if (window.editingUserId) {
                const user = dashboardData.users.find(u => u.id === window.editingUserId);
                if (user) {
                    user.name = name;
                    user.email = email;
                    user.role = role;
                    user.status = status;
                    user.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3B82F6&color=fff`;
                    window.showAlert('Success', `User "${name}" updated successfully!`);
                }
                window.editingUserId = null;
            } else {
                const newUser = {
                    id: `USR-${String(dashboardData.users.length + 1).padStart(3, '0')}`,
                    name: name,
                    email: email,
                    role: role,
                    status: status,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3B82F6&color=fff`
                };
                dashboardData.users.push(newUser);
                window.showAlert('Success', `User "${name}" added successfully!`);
            }

            saveUsersToStorage();
            userCurrentPage = 1;
            renderUsers();
            modal.classList.remove('show');
        });
    }

    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });

    // 7. Chart Toggles
    const chartToggleBtns = document.querySelectorAll('.chart-actions button');
    chartToggleBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 8. Settings Navigation
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    const settingsTabs = document.querySelectorAll('.settings-tab');

    settingsNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            settingsNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            settingsTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === `${tabId}-tab`) tab.classList.add('active');
            });
        });
    });

    // 9. Profile & Settings Implementation
    const initializeProfile = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const headerImg = document.querySelector('#profile-btn img');
            const menuImg = document.querySelector('.profile-header img');
            const menuName = document.querySelector('.profile-header strong');
            const menuEmail = document.querySelector('.profile-header span');
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=3B82F6&color=fff`;

            if (headerImg) headerImg.src = avatarUrl;
            if (menuImg) menuImg.src = avatarUrl;
            if (menuName) menuName.textContent = currentUser.name;
            if (menuEmail) menuEmail.textContent = currentUser.email;

            // Sidebar Footer Info
            const sidebarName = document.querySelector('.sidebar-footer .name');
            const sidebarRole = document.querySelector('.sidebar-footer .role');
            const sidebarAvatar = document.querySelector('.sidebar-footer .avatar');
            if (sidebarName) sidebarName.textContent = currentUser.name;
            if (sidebarRole) sidebarRole.textContent = 'Admin';
            if (sidebarAvatar) sidebarAvatar.src = avatarUrl;

            const exists = dashboardData.users.some(u => u.email === currentUser.email);
            if (!exists) {
                const newUser = {
                    id: `USR-${String(dashboardData.users.length + 1).padStart(3, '0')}`,
                    name: currentUser.name,
                    email: currentUser.email,
                    role: 'Admin',
                    status: 'Active',
                    avatar: avatarUrl
                };
                dashboardData.users.push(newUser);
                saveUsersToStorage();
                renderUsers();
            }
        }
    };

    const initializeSettings = () => {
        const settings = JSON.parse(localStorage.getItem('dashboardSettings')) || {
            general: { name: 'NexDash', timezone: 'IST (GMT+5:30)', language: 'English' },
            notifications: { email: true, order: true, user: false },
            appearance: { theme: 'Dark Mode', accentColor: '#3B82F6', compact: false }
        };

        if (document.getElementById('settings-dash-name')) document.getElementById('settings-dash-name').value = settings.general.name;
        if (document.getElementById('settings-timezone')) document.getElementById('settings-timezone').value = settings.general.timezone;
        if (document.getElementById('settings-language')) document.getElementById('settings-language').value = settings.general.language;

        if (document.getElementById('settings-notif-email')) document.getElementById('settings-notif-email').checked = settings.notifications.email;
        if (document.getElementById('settings-notif-order')) document.getElementById('settings-notif-order').checked = settings.notifications.order;
        if (document.getElementById('settings-notif-user')) document.getElementById('settings-notif-user').checked = settings.notifications.user;

        if (document.getElementById('settings-theme')) document.getElementById('settings-theme').value = settings.appearance.theme;
        if (document.getElementById('settings-compact')) {
            document.getElementById('settings-compact').checked = settings.appearance.compact;
            if (settings.appearance.compact) document.body.classList.add('compact-mode');
        }

        const root = document.documentElement;
        root.style.setProperty('--primary', settings.appearance.accentColor);

        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-color') === settings.appearance.accentColor) {
                opt.classList.add('active');
            }
        });
    };

    const saveSettings = () => {
        const activeColorBtn = document.querySelector('.color-option.active');
        const accentColor = activeColorBtn ? activeColorBtn.getAttribute('data-color') : '#3B82F6';

        const settings = {
            general: {
                name: document.getElementById('settings-dash-name') ? document.getElementById('settings-dash-name').value : 'NexDash',
                timezone: document.getElementById('settings-timezone') ? document.getElementById('settings-timezone').value : 'IST (GMT+5:30)',
                language: document.getElementById('settings-language') ? document.getElementById('settings-language').value : 'English'
            },
            notifications: {
                email: document.getElementById('settings-notif-email') ? document.getElementById('settings-notif-email').checked : true,
                order: document.getElementById('settings-notif-order') ? document.getElementById('settings-notif-order').checked : true,
                user: document.getElementById('settings-notif-user') ? document.getElementById('settings-notif-user').checked : false
            },
            appearance: {
                theme: document.getElementById('settings-theme') ? document.getElementById('settings-theme').value : 'Dark Mode',
                accentColor: accentColor,
                compact: document.getElementById('settings-compact') ? document.getElementById('settings-compact').checked : false
            }
        };

        localStorage.setItem('dashboardSettings', JSON.stringify(settings));

        if (settings.appearance.compact) document.body.classList.add('compact-mode');
        else document.body.classList.remove('compact-mode');
    };

    const generalSaveBtn = document.getElementById('settings-general-save-btn');
    if (generalSaveBtn) {
        generalSaveBtn.addEventListener('click', () => {
            saveSettings();
            window.showAlert('Saved', 'General settings saved successfully!');
        });
    }

    ['settings-notif-email', 'settings-notif-order', 'settings-notif-user'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', saveSettings);
    });

    const updatePassBtn = document.getElementById('settings-update-pass-btn');
    if (updatePassBtn) {
        updatePassBtn.addEventListener('click', () => {
            const currentPassInput = document.getElementById('settings-current-pass').value;
            const newPassInput = document.getElementById('settings-new-pass').value;
            const confirmPassInput = document.getElementById('settings-confirm-pass').value;

            if (!currentPassInput || !newPassInput || !confirmPassInput) {
                window.showAlert('Error', 'Please fill in all password fields.');
                return;
            }
            if (newPassInput !== confirmPassInput) {
                window.showAlert('Error', 'New password and Confirm password do not match!');
                return;
            }

            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                window.location.href = 'login.html';
                return;
            }

            if (currentPassInput !== currentUser.password) {
                window.showAlert('Error', 'Incorrect current password.');
                return;
            }

            currentUser.password = newPassInput;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
            const userIndex = adminUsers.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                adminUsers[userIndex].password = newPassInput;
                localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
            }

            window.showAlert('Success', 'Password updated successfully!');
            document.getElementById('settings-current-pass').value = '';
            document.getElementById('settings-new-pass').value = '';
            document.getElementById('settings-confirm-pass').value = '';
        });
    }

    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            document.documentElement.style.setProperty('--primary', this.getAttribute('data-color'));
            saveSettings();
        });
    });

    if (document.getElementById('settings-theme')) document.getElementById('settings-theme').addEventListener('change', saveSettings);
    if (document.getElementById('settings-compact')) document.getElementById('settings-compact').addEventListener('change', saveSettings);

    // 10. Initialize Everything
    initCharts();
    renderUsers();
    renderOrders();
    initTableFilters();
    animateCounters();
    initializeSettings();
    initializeProfile();
    if (typeof setupUserActions === 'function') setupUserActions();
});
