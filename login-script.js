document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simuleer inloggen op basis van gebruikersnaam en wachtwoord
        if (username === 'superadmin' && password === 'admin123') {
            window.location.href = 'super-admin-dashboard.html';
        } else if (username === 'admin' && password === 'admin123') {
            window.location.href = 'admin-dashboard.html';
        } else if (username === 'coordinator' && password === 'coord123') {
            window.location.href = 'coordinator-dashboard.html';
        } else if (username === 'leerling' && password === 'leerling123') {
            window.location.href = 'leerling-dashboard.html';
        } else {
            alert('Foutieve gebruikersnaam of wachtwoord. Probeer het opnieuw.');
        }
    });
});