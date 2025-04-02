// Données des nouveaux jeux
const newGames = [
    {
        title: "Galactic Explorers",
        description: "Nouveau jeu d'exploration spatiale avec des graphismes révolutionnaires. Découvrez des galaxies lointaines.",
        category: "aventure",
        image: "https://via.placeholder.com/300x180?text=Galactic+Explorers",
        rating: 4.7,
        isNew: true
    },
    {
        title: "Cyber Ninja",
        description: "Action-aventure futuriste où vous incarnez un ninja cybernétique. Combats rapides et parkour urbain.",
        category: "action",
        image: "https://via.placeholder.com/300x180?text=Cyber+Ninja",
        rating: 4.5,
        isNew: true
    },
    {
        title: "Puzzle Dimensions",
        description: "Nouveau concept de puzzle en 3D où vous manipulez l'espace pour résoudre des énigmes complexes.",
        category: "puzzle",
        image: "https://via.placeholder.com/300x180?text=Puzzle+Dimensions",
        rating: 4.3,
        isNew: true
    },
    {
        title: "Kingdom Builders",
        description: "Jeu de stratégie où vous construisez et gérez un royaume médiéval. Nouveau système de diplomatie.",
        category: "stratégie",
        image: "https://via.placeholder.com/300x180?text=Kingdom+Builders",
        rating: 4.6,
        isNew: true
    },
    {
        title: "Extreme Skate",
        description: "Simulation de skateboard réaliste avec de nouveaux tricks et lieux inspirés de villes réelles.",
        category: "sport",
        image: "https://via.placeholder.com/300x180?text=Extreme+Skate",
        rating: 4.2,
        isNew: true
    },
    {
        title: "Neon Racers",
        description: "Course futuriste avec des véhicules rétro-futuristes et des pistes lumineuses. Nouveaux modes multijoueurs.",
        category: "course",
        image: "https://via.placeholder.com/300x180?text=Neon+Racers",
        rating: 4.4,
        isNew: true
    }
];

// Afficher les jeux
const gamesGrid = document.getElementById('games-grid');

function displayNewGames() {
    gamesGrid.innerHTML = '';
    
    newGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        let badge = '';
        if (game.isNew) {
            badge = '<span class="new-badge">NOUVEAU</span>';
        }
        
        gameCard.innerHTML = `
            ${badge}
            <img src="${game.image}" alt="${game.title}">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span class="game-category">${game.category}</span>
                    <span class="game-rating"><i class="fas fa-star"></i>${game.rating}</span>
                </div>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

// Afficher tous les jeux au chargement
displayNewGames();