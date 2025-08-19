document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.main-nav ul li a:not(#logout-btn)');
    const logoutBtn = document.getElementById('logout-btn');
    const addActivityBtn = document.getElementById('add-activity-btn');
    const activityModal = document.getElementById('activity-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const activitiesTableBody = document.getElementById('activities-table-body');
    const undoActivityBtn = document.getElementById('undo-activity-btn');

    let lastAddedActivity = null;

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

    // Modals sluiten
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    // Modal voor activiteit toevoegen
    addActivityBtn.addEventListener('click', () => {
        activityModal.style.display = 'flex';
    });
    
    // Form submission voor activiteit
    document.getElementById('activity-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const activityName = document.getElementById('activity-name').value;
        const activityDate = document.getElementById('activity-date').value;
        const activityLocation = document.getElementById('activity-location').value;
        
        lastAddedActivity = {
            name: activityName,
            date: activityDate,
            location: activityLocation
        };
        
        addActivityToTable(lastAddedActivity);
        activityModal.style.display = 'none';
        
        // Toon de ongedaan maken knop
        undoActivityBtn.classList.remove('hidden');
    });

    // Functie om een activiteit aan de tabel toe te voegen
    function addActivityToTable(activity) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.name}</td>
            <td>${activity.date}</td>
            <td>${activity.location}</td>
            <td>
                <select class="activity-status">
                    <option value="active" selected>Actief</option>
                    <option value="full">Vol</option>
                    <option value="closed">Gesloten</option>
                </select>
            </td>
            <td>
                <button class="btn btn-secondary">Bewerk</button>
                <button class="btn btn-secondary">Verwijder</button>
            </td>
        `;
        activitiesTableBody.appendChild(row);
    }
    
    // Ongedaan maken functionaliteit
    undoActivityBtn.addEventListener('click', function() {
        if (lastAddedActivity) {
            const rows = activitiesTableBody.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (row.cells[0].textContent === lastAddedActivity.name &&
                    row.cells[1].textContent === lastAddedActivity.date &&
                    row.cells[2].textContent === lastAddedActivity.location) {
                    row.remove();
                    lastAddedActivity = null;
                    undoActivityBtn.classList.add('hidden');
                    alert('Activiteit is ongedaan gemaakt.');
                    break;
                }
            }
        }
    });

    // Simuleer initiële data voor de activiteiten tabel
    const initialActivities = [
        { name: 'Workshop Robotica', date: '2025-08-25', location: 'Lokaal 101', status: 'Actief' },
        { name: 'Debatclub', date: '2025-09-01', location: 'Aula', status: 'Vol' }
    ];

    initialActivities.forEach(activity => {
        const row = document.createElement('tr');
        const statusDropdown = `
            <select class="activity-status">
                <option value="active" ${activity.status === 'Actief' ? 'selected' : ''}>Actief</option>
                <option value="full" ${activity.status === 'Vol' ? 'selected' : ''}>Vol</option>
                <option value="closed" ${activity.status === 'Gesloten' ? 'selected' : ''}>Gesloten</option>
            </select>
        `;
        row.innerHTML = `
            <td>${activity.name}</td>
            <td>${activity.date}</td>
            <td>${activity.location}</td>
            <td>${statusDropdown}</td>
            <td>
                <button class="btn btn-secondary">Bewerk</button>
                <button class="btn btn-secondary">Verwijder</button>
            </td>
        `;
        activitiesTableBody.appendChild(row);
    });

    // Simuleer initiële data voor inschrijvingen tabel
    const initialRegistrations = [
        { student: 'Jan Jansen', activity: 'Workshop Robotica', status: 'Goedgekeurd' },
        { student: 'Marieke de Vries', activity: 'Debatclub', status: 'In behandeling' }
    ];
    
    const registrationsTableBody = document.getElementById('registrations-table-body');
    initialRegistrations.forEach(reg => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reg.student}</td>
            <td>${reg.activity}</td>
            <td>${reg.status}</td>
            <td>
                <button class="btn btn-secondary">Bekijk</button>
            </td>
        `;
        registrationsTableBody.appendChild(row);
    });
});