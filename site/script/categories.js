 // Données des catégories
 const categories = [
    {
        name: "Action",
        icon: "fas fa-fighter-jet",
        count: 156,
        description: "Jeux intenses avec des combats et de l'adrénaline"
    },
    {
        name: "Aventure",
        icon: "fas fa-map",
        count: 98,
        description: "Exploration, quêtes et histoires captivantes"
    },
    {
        name: "Stratégie",
        icon: "fas fa-chess",
        count: 87,
        description: "Réflexion, planification et prise de décision"
    },
    {
        name: "Puzzle",
        icon: "fas fa-puzzle-piece",
        count: 112,
        description: "Énigmes, casse-têtes et défis mentaux"
    },
    {
        name: "Sport",
        icon: "fas fa-running",
        count: 65,
        description: "Simulations sportives et compétitions"
    },
    {
        name: "Course",
        icon: "fas fa-car",
        count: 73,
        description: "Vitesse, dépassement et compétition automobile"
    },
    {
        name: "Multijoueur",
        icon: "fas fa-users",
        count: 124,
        description: "Jeux en ligne avec d'autres joueurs"
    },
    {
        name: "Simulation",
        icon: "fas fa-helicopter",
        count: 56,
        description: "Expériences réalistes et immersives"
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
        `;
        
        // Ajouter un événement pour rediriger vers une page de catégorie
        categoryCard.addEventListener('click', () => {
            window.location.href = `categorie.html?name=${encodeURIComponent(category.name)}`;
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// Afficher toutes les catégories au chargement
displayCategories();