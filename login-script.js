document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = {
        'admin': { password: 'superadmin', role: 'super-admin' },
        'organisatie-admin': { password: 'password', role: 'admin' },
        'coordinator': { password: 'password', role: 'coordinator' },
        'leerling': { password: 'password', role: 'leerling' }
    };

    if (users[username] && users[username].password === password) {
        const userRole = users[username].role;

        switch (userRole) {
            case 'super-admin':
                window.location.href = 'super-admin-dashboard.html';
                break;
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;
            case 'coordinator':
                window.location.href = 'coordinator-dashboard.html';
                break;
            case 'leerling':
                window.location.href = 'leerling-dashboard.html';
                break;
            default:
                alert('Onbekende rol.');
        }
    } else {
        alert('Ongeldige gebruikersnaam of wachtwoord.');
    }
});