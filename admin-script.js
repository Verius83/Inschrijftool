document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.main-nav ul li a:not(#logout-btn)');
    const logoutBtn = document.getElementById('logout-btn');
    const addModal = document.getElementById('add-user-modal');
    const addBtn = document.getElementById('add-user-btn');
    const closeBtn = document.querySelector('#add-user-modal .close-btn');

    // Nieuwe elementen voor CSV-import
    const importCsvBtn = document.getElementById('import-csv-btn');
    const csvFileInput = document.getElementById('csv-file-input');

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
                    if (targetSectionId === 'analytics') {
                        renderAnalytics();
                    }
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

    // Modal functionaliteit
    addBtn.addEventListener('click', () => {
        addModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        addModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == addModal) {
            addModal.style.display = 'none';
        }
    });

    // Functionaliteit voor CSV-import
    importCsvBtn.addEventListener('click', () => {
        // Activeer het verborgen bestandskiezer-element
        csvFileInput.click();
    });

    csvFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Dit is de gesimuleerde stap voor de front-end.
            // In de backend-fase zou je dit bestand naar de server sturen.
            alert(`Bestand "${file.name}" is geselecteerd voor import. De backend zal dit nu verwerken.`);
            
            // Optioneel: reset de input om hetzelfde bestand opnieuw te kunnen kiezen
            event.target.value = '';
        }
    });

    // Simuleer een lijst van online gebruikers
    function loadOnlineUsers() {
        const users = [
            { name: 'Jan Jansen', role: 'Leerling', lastLogin: '19-08-2025 20:30' },
            { name: 'Marieke de Vries', role: 'Coördinator', lastLogin: '19-08-2025 20:35' },
            { name: 'Piet Pietersen', role: 'Leerling', lastLogin: '19-08-2025 20:38' },
        ];
        
        const tableBody = document.querySelector('#online-users-table tbody');
        tableBody.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>${user.lastLogin}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Functie voor de geavanceerde analytics
    function renderAnalytics() {
        const projectData = [
            { name: 'Workshop Robotica', enrollments: 45 },
            { name: 'Debatclub', enrollments: 32 },
            { name: 'Digitale Kunst', enrollments: 58 },
            { name: 'Schaken voor Beginners', enrollments: 20 },
        ];
        
        const departmentData = [
            { name: 'Techniek', enrollments: 80 },
            { name: 'Economie', enrollments: 65 },
            { name: 'Zorg & Welzijn', enrollments: 55 },
        ];
        
        const projectChart = document.getElementById('project-popularity-chart');
        projectChart.innerHTML = '';
        const maxProjectEnrollment = Math.max(...projectData.map(item => item.enrollments));
        projectData.forEach(item => {
            const bar = document.createElement('div');
            bar.classList.add('bar-item');
            bar.style.width = `${(item.enrollments / maxProjectEnrollment) * 100}%`;
            bar.innerHTML = `<span>${item.name} (${item.enrollments})</span>`;
            projectChart.appendChild(bar);
        });

        const departmentChart = document.getElementById('department-enrollment-chart');
        departmentChart.innerHTML = '';
        const maxDepartmentEnrollment = Math.max(...departmentData.map(item => item.enrollments));
        departmentData.forEach(item => {
            const bar = document.createElement('div');
            bar.classList.add('bar-item');
            bar.style.width = `${(item.enrollments / maxDepartmentEnrollment) * 100}%`;
            bar.innerHTML = `<span>${item.name} (${item.enrollments})</span>`;
            departmentChart.appendChild(bar);
        });
    }

    loadOnlineUsers();
});