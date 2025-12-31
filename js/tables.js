// Table Rendering, Filtering, and Pagination
const ITEMS_PER_PAGE = 5;

let userCurrentPage = 1;
let orderCurrentPage = 1;

// Rendering Users Table
const renderUsers = (filteredUsers = dashboardData.users) => {
    const tbody = document.querySelector('#users-table tbody');
    const pagination = document.getElementById('users-pagination');

    const startIndex = (userCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = filteredUsers.slice(startIndex, endIndex);

    tbody.innerHTML = paginatedItems.map(user => `
        <tr>
            <td data-label="ID">${user.id}</td>
            <td data-label="User">
                <div class="user-info">
                    <img src="${user.avatar}" alt="${user.name}" class="avatar">
                    <span>${user.name}</span>
                </div>
            </td>
            <td data-label="Email">${user.email}</td>
            <td data-label="Role">${user.role}</td>
            <td data-label="Status"><span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></td>
            <td data-label="Actions">
                <div class="table-actions">
                    <button class="action-btn edit-user-btn" data-user-id="${user.id}" title="Edit">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="action-btn delete-user-btn" data-user-id="${user.id}" title="Delete">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    renderPagination('users', filteredUsers.length, userCurrentPage, (page) => {
        userCurrentPage = page;
        renderUsers(filteredUsers);
    });
};

// Rendering Orders Table
const renderOrders = (filteredOrders = dashboardData.orders) => {
    const tbody = document.querySelector('#orders-table tbody');

    const startIndex = (orderCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = filteredOrders.slice(startIndex, endIndex);

    tbody.innerHTML = paginatedItems.map(order => `
        <tr>
            <td data-label="Order ID">${order.id}</td>
            <td data-label="User">${order.user}</td>
            <td data-label="Amount" class="amount">${order.amount}</td>
            <td data-label="Date">${order.date}</td>
            <td data-label="Status"><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
            <td data-label="Actions">
                <div class="table-actions">
                    <button class="action-btn" title="View Details">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    renderPagination('orders', filteredOrders.length, orderCurrentPage, (page) => {
        orderCurrentPage = page;
        renderOrders(filteredOrders);
    });
};

// Generic Pagination Renderer
const renderPagination = (type, totalItems, currentPage, onPageChange) => {
    const container = document.getElementById(`${type}-pagination`);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    let paginationHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.handlePageChange('${type}', ${i})">${i}</button>
        `;
    }
    container.innerHTML = paginationHtml;

    // Attach to window to handle the onclick
    window.handlePageChange = (pType, page) => {
        if (pType === 'users') {
            userCurrentPage = page;
            renderUsers(getFilteredUsers());
        } else {
            orderCurrentPage = page;
            renderOrders(getFilteredOrders());
        }
    };
};

// Filter Logic for Users
const getFilteredUsers = () => {
    const search = document.getElementById('user-search').value.toLowerCase();
    const role = document.getElementById('user-role-filter').value;
    const status = document.getElementById('user-status-filter').value;

    return dashboardData.users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
        const matchesRole = role === 'all' || user.role === role;
        const matchesStatus = status === 'all' || user.status === status;
        return matchesSearch && matchesRole && matchesStatus;
    });
};

// Filter Logic for Orders
const getFilteredOrders = () => {
    const search = document.getElementById('order-search').value.toLowerCase();
    const status = document.getElementById('order-status-filter').value;
    const date = document.getElementById('order-date-filter').value;

    return dashboardData.orders.filter(order => {
        const matchesSearch = order.user.toLowerCase().includes(search) || order.id.toLowerCase().includes(search);
        const matchesStatus = status === 'all' || order.status === status;
        const matchesDate = !date || order.date === date;
        return matchesSearch && matchesStatus && matchesDate;
    });
};

// Event Listeners for Filters
const initTableFilters = () => {
    const userInputs = ['user-search', 'user-role-filter', 'user-status-filter'];
    userInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            userCurrentPage = 1;
            renderUsers(getFilteredUsers());
        });
    });

    const orderInputs = ['order-search', 'order-status-filter', 'order-date-filter'];
    orderInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            orderCurrentPage = 1;
            renderOrders(getFilteredOrders());
        });
    });
};

// Edit User Function
window.editUser = (userId) => {
    const user = dashboardData.users.find(u => u.id === userId);
    if (!user) return;

    // Populate modal with user data
    const nameInput = document.getElementById('new-user-name');
    if (nameInput) nameInput.value = user.name;

    const emailInput = document.getElementById('new-user-email');
    if (emailInput) emailInput.value = user.email;

    const roleInput = document.getElementById('new-user-role');
    if (roleInput) roleInput.value = user.role;

    const statusInput = document.getElementById('new-user-status');
    if (statusInput) statusInput.value = user.status;

    // Change modal title
    const modalTitle = document.querySelector('#add-user-modal .modal-header h2');
    if (modalTitle) modalTitle.textContent = 'Edit User';

    // Store editing user ID
    window.editingUserId = userId;

    // Open modal
    const modal = document.getElementById('add-user-modal');
    if (modal) modal.classList.add('show');
};

// Delete User Function
window.deleteUser = (userId) => {
    console.log('Attempting to delete user:', userId);
    const user = dashboardData.users.find(u => u.id === userId);
    if (!user) {
        console.error('User not found:', userId);
        return;
    }

    // Use custom modal instead of native confirm
    if (typeof window.showConfirm === 'function') {
        window.showConfirm('Delete User', `Are you sure you want to delete user "${user.name}"?`, () => {
            // Remove from array
            const index = dashboardData.users.findIndex(u => u.id === userId);
            dashboardData.users.splice(index, 1);

            // Save to localStorage
            saveUsersToStorage();

            // Re-render table with current filters
            userCurrentPage = 1;
            renderUsers(getFilteredUsers());

            window.showAlert('Success', `User "${user.name}" deleted successfully!`);
        });
    } else {
        // Fallback if modal not loaded
        if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
            const index = dashboardData.users.findIndex(u => u.id === userId);
            dashboardData.users.splice(index, 1);
            saveUsersToStorage();
            userCurrentPage = 1;
            renderUsers(getFilteredUsers());
            alert(`User "${user.name}" deleted successfully!`);
        }
    }
};

// Setup event delegation for dynamically created buttons
window.setupUserActions = () => {
    const tbody = document.querySelector('#users-table tbody');
    if (tbody) {
        console.log('Setting up user actions listener'); // Debug
        tbody.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-user-btn');
            const deleteBtn = e.target.closest('.delete-user-btn');

            if (editBtn) {
                const userId = editBtn.getAttribute('data-user-id');
                window.editUser(userId);
            } else if (deleteBtn) {
                const userId = deleteBtn.getAttribute('data-user-id');
                window.deleteUser(userId);
            }
        });
    } else {
        console.error('Users table tbody not found');
    }
};

// Initialize listeners
setupUserActions();
