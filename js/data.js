// Mock Data for Dashboard

// Initialize users from localStorage or use default data
const initializeUsers = () => {
    const savedUsers = localStorage.getItem('dashboardUsers');
    if (savedUsers) {
        return JSON.parse(savedUsers);
    }
    return [
        { id: 'USR-001', name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Admin', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson' },
        { id: 'USR-002', name: 'Sarah Miller', email: 'sarah.m@example.com', role: 'Editor', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Sarah+Miller' },
        { id: 'USR-003', name: 'James Wilson', email: 'james.w@example.com', role: 'Viewer', status: 'Blocked', avatar: 'https://ui-avatars.com/api/?name=James+Wilson' },
        { id: 'USR-004', name: 'Elena Rodriguez', email: 'elena.r@example.com', role: 'Editor', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez' },
        { id: 'USR-005', name: 'David Smith', email: 'david.s@example.com', role: 'Viewer', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=David+Smith' },
        { id: 'USR-006', name: 'Maria Garcia', email: 'maria.g@example.com', role: 'Admin', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia' },
        { id: 'USR-007', name: 'Christopher Lee', email: 'chris.l@example.com', role: 'Editor', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Christopher+Lee' },
        { id: 'USR-008', name: 'Amanda White', email: 'amanda.w@example.com', role: 'Viewer', status: 'Blocked', avatar: 'https://ui-avatars.com/api/?name=Amanda+White' },
        { id: 'USR-009', name: 'Robert Brown', email: 'robert.b@example.com', role: 'Editor', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Robert+Brown' },
        { id: 'USR-010', name: 'Jessica Taylor', email: 'jess.t@example.com', role: 'Viewer', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Jessica+Taylor' },
        { id: 'USR-011', name: 'Kevin Anderson', email: 'kevin.a@example.com', role: 'Admin', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Kevin+Anderson' },
        { id: 'USR-012', name: 'Lisa Thomas', email: 'lisa.t@example.com', role: 'Editor', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Lisa+Thomas' },
    ];
};

// Save users to localStorage
const saveUsersToStorage = () => {
    localStorage.setItem('dashboardUsers', JSON.stringify(dashboardData.users));
};

const dashboardData = {
    users: initializeUsers(),
    orders: [
        { id: '#ORD-7241', user: 'Alex Johnson', amount: '$240.00', date: '2025-12-28', status: 'Paid' },
        { id: '#ORD-7242', user: 'Sarah Miller', amount: '$150.50', date: '2025-12-28', status: 'Pending' },
        { id: '#ORD-7243', user: 'James Wilson', amount: '$89.00', date: '2025-12-27', status: 'Paid' },
        { id: '#ORD-7244', user: 'Elena Rodriguez', amount: '$430.00', date: '2025-12-27', status: 'Failed' },
        { id: '#ORD-7245', user: 'David Smith', amount: '$120.00', date: '2025-12-26', status: 'Paid' },
        { id: '#ORD-7246', user: 'Maria Garcia', amount: '$67.20', date: '2025-12-26', status: 'Paid' },
        { id: '#ORD-7247', user: 'Christopher Lee', amount: '$310.00', date: '2025-12-25', status: 'Pending' },
        { id: '#ORD-7248', user: 'Amanda White', amount: '$45.00', date: '2025-12-25', status: 'Paid' },
        { id: '#ORD-7249', user: 'Robert Brown', amount: '$215.00', date: '2025-12-24', status: 'Paid' },
        { id: '#ORD-7250', user: 'Jessica Taylor', amount: '$540.00', date: '2025-12-24', status: 'Paid' },
    ],
    analytics: {
        salesData: [3000, 4500, 3200, 5800, 4900, 7200, 6400, 8100, 7500, 9200, 8400, 10500],
        userGrowth: [100, 250, 400, 600, 850, 1100, 1400, 1800, 2300, 2900, 3600, 4500],
        orderStatus: [65, 20, 15] // Paid, Pending, Failed
    }
};
