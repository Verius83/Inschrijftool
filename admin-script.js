document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.main-nav ul li a:not(#logout-btn)');
    const logoutBtn = document.getElementById('logout-btn');

    const addProjectBtn = document.getElementById('add-project-btn');
    const projectModal = document.getElementById('project-modal');
    const projectForm = document.getElementById('project-form');

    const addUserBtn = document.getElementById('add-user-btn');
    const userModal = document.getElementById('user-modal');
    const userForm = document.getElementById('user-form');
    const importUsersBtn = document.getElementById('import-users-btn');
    const csvFileInput = document.getElementById('csv-file-input');
    
    // Nieuwe elementen voor organisatiegegevens van de Admin
    const myOrgDataForm = document.getElementById('my-org-data-form');
    const myOrgName = document.getElementById('my-org-name');
    const myOrgContactPerson = document.getElementById('my-org-contact-person');
    const myOrgPhone = document.getElementById('my-org-phone');
    const myOrgAddress = document.getElementById('my-org-address');
    const myOrgContractLink = document.getElementById('my-org-contract-link');
    const myOrgInvoiceStatus = document.getElementById('my-org-invoice-status');

    const closeBtns = document.querySelectorAll('.close-btn');
    const projectsTableBody = document.getElementById('projects-table-body');
    const usersTableBody = document.getElementById('users-table-body');

    // Simuleer de data voor een specifieke organisatie
    let projects = [
        { id: 1, name: 'Project Groen', coordinator: 'Coordinator', departments: 'Klas 1A, Klas 1B', maxRegistrations: 3 }
    ];

    let users = [
        { id: 1, username: 'coordinator', role: 'coordinator' },
        { id: 2, username: 'student_x', role: 'student' }
    ];

    let myOrganization = {
        name: 'Organisatie B',
        contact: {
            person: 'Piet Pietersen',
            phone: '06-87654321',
            address: 'Voorbeeldlaan 2, 5678 CD, Dorp'
        },
        contractFile: 'contract_org_b.pdf',
        invoiceStatus: 'Openstaand'
    };

    function renderProjects() {
        projectsTableBody.innerHTML = '';
        projects.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${project.name}</td>
                <td>${project.coordinator}</td>
                <td>${project.departments}</td>
                <td>${project.maxRegistrations}</td>
                <td>
                    <button class="btn btn-secondary edit-project-btn" data-id="${project.id}">Bewerk</button>
                    <button class="btn btn-secondary delete-project-btn" data-id="${project.id}">Verwijder</button>
                </td>
            `;
            projectsTableBody.appendChild(row);
        });
    }

    function renderUsers() {
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-secondary edit-user-btn" data-id="${user.id}">Bewerk</button>
                    <button class="btn btn-secondary delete-user-btn" data-id="${user.id}">Verwijder</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
    }

    // Organisatiegegevens renderen
    function renderMyOrgData() {
        myOrgName.value = myOrganization.name;
        myOrgContactPerson.value = myOrganization.contact.person;
        myOrgPhone.value = myOrganization.contact.phone;
        myOrgAddress.value = myOrganization.contact.address;
        myOrgContractLink.href = myOrganization.contractFile; // Dit moet later naar de backend wijzen
        myOrgInvoiceStatus.value = myOrganization.invoiceStatus;
    }

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

    // Modals openen
    addProjectBtn.addEventListener('click', () => projectModal.style.display = 'flex');
    addUserBtn.addEventListener('click', () => userModal.style.display = 'flex');
    importUsersBtn.addEventListener('click', () => csvFileInput.click());

    // Form submissions
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Logica voor het toevoegen van een project
    });

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Logica voor het toevoegen van een gebruiker
    });

    myOrgDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Logica om organisatiegegevens bij te werken
        alert('Gegevens zijn opgeslagen!');
    });

    // Render de initiële data
    renderProjects();
    renderUsers();
    renderMyOrgData();
});