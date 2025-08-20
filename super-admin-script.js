document.addEventListener('DOMContentLoaded', function() {
    // Selecteer alle relevante elementen
    const sections = document.querySelectorAll('.dashboard-section');
    const navMenu = document.querySelector('.main-nav ul');
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const logoutBtn = document.getElementById('logout-btn');

    // Modals en hun gerelateerde knoppen
    const addOrganizationBtn = document.getElementById('add-organization-btn');
    const organizationModal = document.getElementById('organization-modal');
    const organizationForm = document.getElementById('organization-form');
    const modalTitle = document.getElementById('modal-title');
    const orgIdInput = document.getElementById('org-id');
    const adminPasswordInput = document.getElementById('admin-password');

    const closeBtns = document.querySelectorAll('.close-btn');
    const organizationsTableBody = document.getElementById('organizations-table-body');
    const moduleOverviewTableBody = document.getElementById('module-overview-table-body');
    
    // Elementen voor organisatiegegevens
    const selectOrganization = document.getElementById('select-organization');
    const viewOrgDataBtn = document.getElementById('view-org-data-btn');
    const organizationDetails = document.getElementById('organization-details');
    const orgDetailsName = document.getElementById('org-details-name');
    const orgContactPerson = document.getElementById('org-contact-person');
    const orgPhone = document.getElementById('org-phone');
    const orgAddress = document.getElementById('org-address');
    const orgContractFile = document.getElementById('org-contract-file');
    const orgContractLink = document.getElementById('org-contract-link');
    const orgInvoiceStatus = document.getElementById('org-invoice-status');
    const editOrgDataBtn = document.getElementById('edit-org-data-btn');
    const saveOrgDataBtn = document.getElementById('save-org-data-btn');

    // Simuleer een lijst van organisaties
    let organizations = [
        { 
            id: 1, 
            name: 'Organisatie A', 
            adminUsername: 'admin_a', 
            permissions: { csv: true, zermelo: false, magister: false, style: true },
            contact: {
                person: 'Jan Jansen',
                phone: '06-12345678',
                address: 'Voorbeeldstraat 1, 1234 AB, Stad'
            },
            contractFile: 'contract_org_a.pdf',
            invoiceStatus: 'Betaald'
        },
        { 
            id: 2, 
            name: 'Organisatie B', 
            adminUsername: 'admin_b', 
            permissions: { csv: true, zermelo: true, magister: false, style: false },
            contact: {
                person: 'Piet Pietersen',
                phone: '06-87654321',
                address: 'Voorbeeldlaan 2, 5678 CD, Dorp'
            },
            contractFile: 'contract_org_b.pdf',
            invoiceStatus: 'Openstaand'
        }
    ];

    function renderOrganizations() {
        organizationsTableBody.innerHTML = '';
        moduleOverviewTableBody.innerHTML = '';
        selectOrganization.innerHTML = '<option value="">Selecteer een organisatie</option>';
        
        organizations.forEach(org => {
            // Tabel in de 'Organisaties Beheren' sectie
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${org.name}</td>
                <td>${org.adminUsername}</td>
                <td>
                    <button class="btn btn-secondary edit-organization-btn" data-id="${org.id}">Bewerk</button>
                    <button class="btn btn-secondary delete-organization-btn" data-id="${org.id}">Verwijder</button>
                </td>
            `;
            organizationsTableBody.appendChild(row);

            // Tabel in de 'Overzicht Modulegebruik' sectie
            const overviewRow = document.createElement('tr');
            overviewRow.innerHTML = `
                <td>${org.name}</td>
                <td>${org.permissions.csv ? '✔️' : '❌'}</td>
                <td>${org.permissions.zermelo ? '✔️' : '❌'}</td>
                <td>${org.permissions.magister ? '✔️' : '❌'}</td>
                <td>${org.permissions.style ? '✔️' : '❌'}</td>
            `;
            moduleOverviewTableBody.appendChild(overviewRow);

            // Selectbox in de 'Organisatiegegevens' sectie
            const option = document.createElement('option');
            option.value = org.id;
            option.textContent = org.name;
            selectOrganization.appendChild(option);
        });

        document.querySelectorAll('.edit-organization-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const orgId = parseInt(e.target.dataset.id);
                const org = organizations.find(o => o.id === orgId);
                if (org) {
                    modalTitle.textContent = `Organisatie ${org.name} Bewerken`;
                    orgIdInput.value = org.id;
                    document.getElementById('organization-name').value = org.name;
                    document.getElementById('admin-username').value = org.adminUsername;
                    
                    adminPasswordInput.value = '';
                    adminPasswordInput.required = false;

                    document.getElementById('permission-csv').checked = org.permissions.csv;
                    document.getElementById('permission-zermelo').checked = org.permissions.zermelo;
                    document.getElementById('permission-magister').checked = org.permissions.magister;
                    document.getElementById('permission-style').checked = org.permissions.style;
                    
                    organizationModal.style.display = 'flex';
                }
            });
        });

        document.querySelectorAll('.delete-organization-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const orgId = parseInt(e.target.dataset.id);
                if (confirm('Weet je zeker dat je deze organisatie wilt verwijderen?')) {
                    organizations = organizations.filter(o => o.id !== orgId);
                    renderOrganizations();
                }
            });
        });
    }

    // Navigatie functionaliteit
    navMenu.addEventListener('click', function(event) {
        const clickedLink = event.target.closest('a');
        if (!clickedLink) return;

        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');

        const targetSectionId = clickedLink.getAttribute('data-section');
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

    // Organisatie modal openen
    addOrganizationBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Nieuwe Organisatie Aanmaken';
        orgIdInput.value = '';
        organizationForm.reset();
        adminPasswordInput.required = true;
        organizationModal.style.display = 'flex';
    });

    // Form submissions
    organizationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const orgId = orgIdInput.value;
        const orgName = document.getElementById('organization-name').value;
        const adminUsername = document.getElementById('admin-username').value;
        
        const permissions = {
            csv: document.getElementById('permission-csv').checked,
            zermelo: document.getElementById('permission-zermelo').checked,
            magister: document.getElementById('permission-magister').checked,
            style: document.getElementById('permission-style').checked,
        };

        if (orgId) {
            const orgIndex = organizations.findIndex(o => o.id === parseInt(orgId));
            if (orgIndex !== -1) {
                organizations[orgIndex].name = orgName;
                organizations[orgIndex].permissions = permissions;
            }
        } else {
            const newOrganization = {
                id: organizations.length > 0 ? Math.max(...organizations.map(o => o.id)) + 1 : 1,
                name: orgName,
                adminUsername: adminUsername,
                permissions: permissions,
                contact: {},
                contractFile: '',
                invoiceStatus: ''
            };
            organizations.push(newOrganization);
        }

        renderOrganizations();
        organizationModal.style.display = 'none';
        organizationForm.reset();
    });

    // Organisatiegegevens functionaliteit
    selectOrganization.addEventListener('change', (e) => {
        if (e.target.value) {
            viewOrgDataBtn.disabled = false;
        } else {
            viewOrgDataBtn.disabled = true;
            organizationDetails.classList.add('hidden');
        }
    });

    viewOrgDataBtn.addEventListener('click', () => {
        const org = organizations.find(o => o.id === parseInt(selectOrganization.value));
        if (org) {
            orgDetailsName.textContent = org.name;
            orgContactPerson.value = org.contact.person || '';
            orgPhone.value = org.contact.phone || '';
            orgAddress.value = org.contact.address || '';
            orgInvoiceStatus.value = org.invoiceStatus || '';

            if (org.contractFile) {
                orgContractLink.href = org.contractFile;
                orgContractLink.classList.remove('hidden');
            } else {
                orgContractLink.classList.add('hidden');
            }

            organizationDetails.classList.remove('hidden');
            orgContactPerson.readOnly = true;
            orgPhone.readOnly = true;
            orgAddress.readOnly = true;
            editOrgDataBtn.classList.remove('hidden');
            saveOrgDataBtn.classList.add('hidden');
        }
    });

    editOrgDataBtn.addEventListener('click', () => {
        orgContactPerson.readOnly = false;
        orgPhone.readOnly = false;
        orgAddress.readOnly = false;
        editOrgDataBtn.classList.add('hidden');
        saveOrgDataBtn.classList.remove('hidden');
    });

    // Render de initiële data
    renderOrganizations();
});