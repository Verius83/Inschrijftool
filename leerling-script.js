document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.main-nav ul li a:not(#logout-btn)');
    const logoutBtn = document.getElementById('logout-btn');
    
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
    
    const enrolledActivitiesDiv = document.getElementById('enrolled-activities');
    enrolledActivitiesDiv.innerHTML = `
        <div class="activity-card">
            <h4>Workshop Robotica</h4>
            <p>Datum: 19-08-2025</p>
            <button class="btn btn-secondary cancel-reg-btn">Annuleer inschrijving</button>
        </div>
    `;

    document.querySelectorAll('.cancel-reg-btn').forEach(button => {
        button.addEventListener('click', function() {
            const activityCard = this.closest('.activity-card');
            alert('Je inschrijving is geannuleerd.');
            activityCard.remove();
            if (enrolledActivitiesDiv.children.length === 0) {
                 enrolledActivitiesDiv.innerHTML = '<p>Nog geen inschrijvingen.</p>';
            }
        });
    });
});