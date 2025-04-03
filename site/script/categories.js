 // Données des catégories
 const categories = [
    {
        name: "Cartes",
        icon: "fas fa-club",
        count: 3, // Black Jack, Solitaire, Poker
        description: "Jeux de cartes classiques et stratégiques"
    },
    {
        name: "Devinette",
        icon: "fas fa-question-circle",
        count: 5, // Mot de passe, Pendu, Devine le prix, Devine le logo, N'appuie pas sur le bouton
        description: "Jeux de déduction et de connaissances"
    },
    {
        name: "Stratégie",
        icon: "fas fa-chess",
        count: 3, // Echec, Morpion, Pierre-Feuille-Ciseaux
        description: "Jeux de réflexion et de planification"
    },
    {
        name: "Réflexion",
        icon: "fas fa-brain",
        count: 2, // Sudoku, Memory
        description: "Jeux pour stimuler la mémoire et la logique"
    },
    {
        name: "Arcade",
        icon: "fas fa-gamepad",
        count: 3, // Snake, Geometry Dash, Voiture
        description: "Jeux rapides et addictifs"
    },
    {
        name: "Éducatif",
        icon: "fas fa-graduation-cap",
        count: 4, // Jeu de drapeau, Quiz d'anglais, Quiz de maths, QCM
        description: "Jeux pour apprendre en s'amusant"
    },
    {
        name: "Classique",
        icon: "fas fa-dice",
        count: 2, // Pierre-Feuille-Ciseaux, Memory
        description: "Jeux intemporels et universels"
    },
    {
        name: "Course",
        icon: "fas fa-car",
        count: 1, // Voiture
        description: "Jeux de vitesse et de conduite"
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