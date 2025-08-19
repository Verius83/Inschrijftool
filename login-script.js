document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    // Functie voor de login-logica
    const handleLogin = (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulatie van de inloggegevens voor de verschillende rollen
        const validCredentials = {
            'superadmin': 'super-admin-dashboard.html',
            'admin': 'admin-dashboard.html',
            'coordinator': 'coordinator-dashboard.html',
            'leerling': 'leerling-dashboard.html'
        };

        if (validCredentials[username] && password === 'admin123') {
            console.log(`Gebruiker ${username} succesvol ingelogd!`);
            window.location.href = validCredentials[username];
        } else if (username === 'coordinator' && password === 'coord123') {
            console.log(`Gebruiker ${username} succesvol ingelogd!`);
            window.location.href = validCredentials[username];
        } else {
            console.error(`Inlogfout: Ongeldige combinatie voor gebruikersnaam: ${username}`);
            alert('Foutieve gebruikersnaam of wachtwoord. Probeer het opnieuw.');
        }
    };

    loginForm.addEventListener('submit', handleLogin);
});