document.addEventListener('DOMContentLoaded', function() {
    const createOrganizationForm = document.getElementById('create-organization-form');
    const logoutBtn = document.getElementById('logout-btn');
    const undoBtn = document.getElementById('undo-org-btn');
    let lastCreatedOrg = null;

    createOrganizationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const orgName = document.getElementById('org-name').value;
        const adminEmail = document.getElementById('admin-email').value;

        alert(`Organisatie "${orgName}" is succesvol aangemaakt met beheerderse-mail: ${adminEmail}`);
        lastCreatedOrg = orgName;
        undoBtn.classList.remove('hidden');
        
        this.reset();
    });

    if (undoBtn) {
        undoBtn.addEventListener('click', function() {
            if (lastCreatedOrg) {
                alert(`De aanmaak van organisatie "${lastCreatedOrg}" is ongedaan gemaakt.`);
                lastCreatedOrg = null;
                undoBtn.classList.add('hidden');
            }
        });
    }

    logoutBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});