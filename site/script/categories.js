// Données des catégories
const categories = [
    {
        name: "Cartes",
        icon: "fas fa-club",
        count: 3,
        description: "Jeux de cartes classiques et stratégiques",
        link: "/site/categorie/carte.html"
    },
    {
        name: "Devinette",
        icon: "fas fa-question-circle",
        count: 5,
        description: "Jeux de déduction et de connaissances",
        link: "/site/categorie/devinette.html"
    },
    {
        name: "Stratégie",
        icon: "fas fa-chess",
        count: 3,
        description: "Jeux de réflexion et de planification",
        link: "/site/categorie/strategie.html"
    },
    {
        name: "Réflexion",
        icon: "fas fa-brain",
        count: 2,
        description: "Jeux pour stimuler la mémoire et la logique",
        link: "/site/categorie/reflexion.html"
    },
    {
        name: "Arcade",
        icon: "fas fa-gamepad",
        count: 3,
        description: "Jeux rapides et addictifs",
        link: "/site/categorie/arcade.html"
    },
    {
        name: "Éducatif",
        icon: "fas fa-graduation-cap",
        count: 4,
        description: "Jeux pour apprendre en s'amusant",
        link: "/site/categorie/educatif.html" // Correction de "deucatif" à "educatif"
    },
    {
        name: "Classique",
        icon: "fas fa-dice",
        count: 2,
        description: "Jeux intemporels et universels",
        link: "/site/categorie/classique.html"
    },
    {
        name: "Course",
        icon: "fas fa-car",
        count: 1,
        description: "Jeux de vitesse et de conduite",
        link: "/site/categorie/course.html"
    },
    {
        name: "Mémoire",
        icon: "fas fa-brain",
        count: 1,
        description: "Jeu de mémoire et de concentration",
        link: "/site/categorie/memorie.html"
    }
];

// Afficher les catégories
const categoriesGrid = document.getElementById('categories-grid');

function displayCategories() {
    categoriesGrid.innerHTML = '';
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-icon"><i class="${category.icon}"></i></div>
            <h3 class="category-title">${category.name}</h3>
            <p class="category-count">${category.count} jeux</p>
            <p class="category-description">${category.description}</p>
        `;
        
        // Redirection vers la page spécifiée dans l'objet category
        categoryCard.addEventListener('click', () => {
            window.location.href = category.link;
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// Afficher toutes les catégories au chargement
document.addEventListener('DOMContentLoaded', displayCategories);