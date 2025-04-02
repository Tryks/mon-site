document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Toggle menu mobile
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animation des liens quand le menu s'ouvre
        if (navMenu.classList.contains('active')) {
            animateLinks();
        }
    });
    
    // Gestion des dropdowns sur mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                // Fermer les autres dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        otherToggle.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && !this.classList.contains('dropdown-toggle')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
        });
    });
    
    // Animation des liens
    function animateLinks() {
        navLinks.forEach((link, index) => {
            link.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1 + 0.3}s`;
        });
    }
    
    // Changement de couleur au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(108, 92, 231, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Effet de vague au survol des liens
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('cta-button')) {
                const underline = this.querySelector('.link-underline');
                underline.style.transition = 'none';
                underline.style.width = '0';
                setTimeout(() => {
                    underline.style.transition = 'width var(--transition-speed) ease';
                    underline.style.width = '100%';
                }, 10);
            }
        });
    });
});


