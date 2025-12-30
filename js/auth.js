document.addEventListener('DOMContentLoaded', () => {

    // LOGIN LOGIC
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            // Get users from localStorage
            let adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];

            // Seed default user if empty
            if (adminUsers.length === 0) {
                const defaultUser = { name: 'Admin', email: 'admin@nexdash.com', password: 'admin' };
                adminUsers.push(defaultUser);
                localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
            }

            // Find matching user
            const user = adminUsers.find(u => u.email === email && u.password === password);

            if (user) {
                // Login successful
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));

                alert(`Welcome back, ${user.name}!`);
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password. Please try again or sign up.');
            }
        });
    }

    // SIGNUP LOGIC
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!name || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Get existing users
            const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];

            // Check if email exists
            if (adminUsers.some(u => u.email === email)) {
                alert('An account with this email already exists.');
                return;
            }

            // Register new user
            const newUser = { name, email, password };
            adminUsers.push(newUser);
            localStorage.setItem('adminUsers', JSON.stringify(adminUsers));

            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';
        });
    }
});

// LOGOUT FUNCTION (Can be called from other files)
window.logout = () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
};
