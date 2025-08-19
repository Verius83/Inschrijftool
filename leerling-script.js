document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.main-nav ul li a:not(#logout-btn)');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Gesimuleerde activiteitenlijst voor zowel dashboard als agenda
    let enrolledActivities = [
        { id: '1', name: 'Workshop Robotica', date: '2025-08-25', time: '14:00', location: 'Lokaal 101' },
        { id: '2', name: 'Creatief Schrijven', date: '2025-09-01', time: '10:00', location: 'Bibliotheek' }
    ];

    // Functie om de activiteiten op het dashboard en in de agenda te renderen
    function renderActivities() {
        const enrolledActivitiesDiv = document.getElementById('enrolled-activities');
        const calendarEventsList = document.getElementById('calendar-events-list');

        enrolledActivitiesDiv.innerHTML = '';
        calendarEventsList.innerHTML = '';

        if (enrolledActivities.length === 0) {
            enrolledActivitiesDiv.innerHTML = '<p>Nog geen inschrijvingen.</p>';
            calendarEventsList.innerHTML = '<p>Geen ingeschreven activiteiten in je agenda.</p>';
            return;
        }

        enrolledActivities.forEach(activity => {
            // Rendering voor Mijn Dashboard
            const dashboardCard = document.createElement('div');
            dashboardCard.classList.add('activity-card');
            dashboardCard.innerHTML = `
                <h4>${activity.name}</h4>
                <p>Datum: ${activity.date}</p>
                <button class="btn btn-secondary cancel-reg-btn" data-id="${activity.id}">Annuleer inschrijving</button>
            `;
            enrolledActivitiesDiv.appendChild(dashboardCard);

            // Rendering voor Mijn Agenda
            const calendarItem = document.createElement('div');
            calendarItem.classList.add('calendar-item');
            calendarItem.innerHTML = `
                <h4>${activity.name}</h4>
                <p>Datum: ${activity.date} - ${activity.time}</p>
                <p>Locatie: ${activity.location}</p>
            `;
            calendarEventsList.appendChild(calendarItem);
        });
        
        // Annuleer inschrijving functionaliteit toevoegen
        document.querySelectorAll('.cancel-reg-btn').forEach(button => {
            button.addEventListener('click', function() {
                const activityId = this.getAttribute('data-id');
                enrolledActivities = enrolledActivities.filter(act => act.id !== activityId);
                alert('Je inschrijving is geannuleerd.');
                renderActivities(); // Herlaad de weergave
                renderBadges(); // Update ook de badges
            });
        });
    }

    // Functie om de badges te renderen
    function renderBadges() {
        const badgesContainer = document.getElementById('badges-container');
        badgesContainer.innerHTML = ''; // Leeg de container

        const badgeList = [];
        
        // Regel 1: Badge voor 1+ activiteit
        if (enrolledActivities.length >= 1) {
            badgeList.push({
                name: 'Eerste Inschrijving',
                description: 'Je hebt je eerste activiteit ingeschreven! Goed bezig.',
                image: 'https://via.placeholder.com/80/00796B/FFFFFF?text=1%2B'
            });
        }
        
        // Regel 2: Badge voor 2+ activiteiten
        if (enrolledActivities.length >= 2) {
            badgeList.push({
                name: 'Serieuze Deelnemer',
                description: 'Je hebt twee of meer activiteiten ingeschreven!',
                image: 'https://via.placeholder.com/80/004D40/FFFFFF?text=2%2B'
            });
        }
        
        // Regel 3: Badge voor 5+ activiteiten (voorbeeld)
        if (enrolledActivities.length >= 5) {
            badgeList.push({
                name: 'Activiteiten Expert',
                description: 'Je hebt al vijf of meer activiteiten ingeschreven.',
                image: 'https://via.placeholder.com/80/80CBC4/000000?text=5%2B'
            });
        }

        if (badgeList.length === 0) {
            badgesContainer.innerHTML = '<p>Nog geen badges behaald.</p>';
            return;
        }

        badgeList.forEach(badge => {
            const badgeItem = document.createElement('div');
            badgeItem.classList.add('badge-item');
            badgeItem.innerHTML = `
                <img src="${badge.image}" alt="${badge.name}">
                <p>${badge.name}</p>
                <p class="badge-description">${badge.description}</p>
            `;
            badgesContainer.appendChild(badgeItem);
        });
    }

    // Initialiseer de paginaweergave
    renderActivities();
    renderBadges();

    // Navigatie functionaliteit
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            const targetSectionId = this.getAttribute('data-section');
            sections.forEach(section => {
                if (section.id === targetSectionId) {
                    section.classList.remove('hidden');
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                    section.classList.add('hidden');
                }
            });
        });
    });

    // Logout functionaliteit
    logoutBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});