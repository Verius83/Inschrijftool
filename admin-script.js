document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.main-nav ul li a:not(#logout-btn)');
    const logoutBtn = document.getElementById('logout-btn');
    const userModal = document.getElementById('user-modal');
    const projectModal = document.getElementById('project-modal');
    const addUserBtn = document.getElementById('add-user-btn');
    const addProjectBtn = document.getElementById('add-project-btn');
    const closeButtons = document.querySelectorAll('.modal .close-btn');
    const undoUserBtn = document.getElementById('undo-user-btn');
    const undoProjectBtn = document.getElementById('undo-project-btn');

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

    logoutBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    addUserBtn.addEventListener('click', function() {
        userModal.style.display = 'flex';
    });
    addProjectBtn.addEventListener('click', function() {
        projectModal.style.display = 'flex';
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            btn.closest('.modal').style.display = 'none';
        });
    });
    window.addEventListener('click', function(event) {
        if (event.target == userModal) userModal.style.display = 'none';
        if (event.target == projectModal) projectModal.style.display = 'none';
    });

    document.getElementById('user-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Gebruiker toegevoegd!');
        userModal.style.display = 'none';
        undoUserBtn.classList.remove('hidden');
    });

    document.getElementById('project-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Project toegevoegd!');
        projectModal.style.display = 'none';
        undoProjectBtn.classList.remove('hidden');
    });

    undoUserBtn.addEventListener('click', function() {
        alert('Het toevoegen van de laatste gebruiker is ongedaan gemaakt.');
        undoUserBtn.classList.add('hidden');
    });

    undoProjectBtn.addEventListener('click', function() {
        alert('Het toevoegen van het laatste project is ongedaan gemaakt.');
        undoProjectBtn.classList.add('hidden');
    });
});