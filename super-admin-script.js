document.addEventListener('DOMContentLoaded', function() {
    const createOrgForm = document.getElementById('create-organization-form');
    const undoOrgBtn = document.getElementById('undo-org-btn');
    const logoutBtn = document.getElementById('logout-btn');

    let lastCreatedOrg = null;

    // Functie om de formulierinzending te verwerken
    createOrgForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const orgName = document.getElementById('org-name').value;
        const adminEmail = document.getElementById('admin-email').value;
        
        // Simuleer de aanmaak van een organisatie
        lastCreatedOrg = { name: orgName, admin: adminEmail };
        
        alert(`Organisatie "${lastCreatedOrg.name}" aangemaakt. Eerste beheerder is ${lastCreatedOrg.admin}.`);
        
        // Toon de 'Ongedaan maken' knop
        undoOrgBtn.classList.remove('hidden');
    });

    // Functie om de laatste actie ongedaan te maken
    undoOrgBtn.addEventListener('click', function() {
        if (lastCreatedOrg) {
            alert(`Het aanmaken van organisatie "${lastCreatedOrg.name}" is ongedaan gemaakt.`);
            lastCreatedOrg = null;
            this.classList.add('hidden');
        }
    });

    // Logout functionaliteit
    logoutBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});