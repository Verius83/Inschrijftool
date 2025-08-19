document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.main-nav ul li a:not(#logout-btn)');
    const logoutBtn = document.getElementById('logout-btn');
    const activityModal = document.getElementById('activity-modal');
    const addActivityBtn = document.getElementById('add-activity-btn');
    const undoActivityBtn = document.getElementById('undo-activity-btn');
    const closeButtons = document.querySelectorAll('.modal .close-btn');
    
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
    
    addActivityBtn.addEventListener('click', function() {
        activityModal.style.display = 'flex';
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            btn.closest('.modal').style.display = 'none';
        });
    });
    window.addEventListener('click', function(event) {
        if (event.target == activityModal) {
            activityModal.style.display = 'none';
        }
    });

    document.getElementById('activity-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Activiteit toegevoegd!');
        activityModal.style.display = 'none';
        undoActivityBtn.classList.remove('hidden');
    });

    undoActivityBtn.addEventListener('click', function() {
        alert('Het toevoegen van de laatste activiteit is ongedaan gemaakt.');
        undoActivityBtn.classList.add('hidden');
    });
});