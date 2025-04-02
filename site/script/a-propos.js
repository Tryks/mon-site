 // Gestion du formulaire de contact
 document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Ici, vous pourriez ajouter une requête AJAX pour envoyer les données
    // Pour cet exemple, nous affichons simplement une alerte
    alert(`Merci ${name} pour votre message! Nous vous répondrons à ${email} dès que possible.`);
    
    // Réinitialisation du formulaire
    this.reset();
});

// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.mission-content, .stats, .team-grid, .testimonial-grid, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialisation des styles pour l'animation
    const animatedElements = document.querySelectorAll('.mission-content, .stats, .team-grid, .testimonial-grid, .contact-form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Déclenchement au chargement et au défilement
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});