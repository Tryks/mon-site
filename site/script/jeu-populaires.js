// Données des jeux populaires
const popularGames = {
    trending: [
        {
            title: "Battle Royale Ultimate",
            description: "Le jeu de combat multijoueur qui domine les classements. Nouvelle saison disponible maintenant.",
            category: "multijoueur",
            image: "https://via.placeholder.com/300x180?text=Battle+Royale+Ultimate",
            rating: 4.8,
            players: "2M+"
        },
        {
            title: "Farm Simulator 2023",
            description: "La nouvelle version du simulateur de ferme préféré des joueurs. Plus de cultures et d'animaux.",
            category: "simulation",
            image: "https://via.placeholder.com/300x180?text=Farm+Simulator+2023",
            rating: 4.6,
            players: "1.5M+"
        },
        {
            title: "Speed Racers",
            description: "Course de voitures intense avec des graphismes photoréalistes. Mode esport intégré.",
            category: "course",
            image: "https://via.placeholder.com/300x180?text=Speed+Racers",
            rating: 4.7,
            players: "1.2M+"
        }
    ],
    multiplayer: [
        {
            title: "Team Fortress Legends",
            description: "Jeu de tir en équipe avec des classes uniques. Nouveaux héros ajoutés chaque mois.",
            category: "multijoueur",
            image: "https://via.placeholder.com/300x180?text=Team+Fortress+Legends",
            rating: 4.9,
            players: "3M+"
        },
        {
            title: "Word Duel",
            description: "Affrontez vos amis dans des batailles de mots. Nouveaux modes de jeu compétitifs.",
            category: "puzzle",
            image: "https://via.placeholder.com/300x180?text=Word+Duel",
            rating: 4.5,
            players: "800K+"
        },
        {
            title: "Kingdom Wars",
            description: "Stratégie en temps réel massive. Construisez votre empire et combattez des milliers de joueurs.",
            category: "stratégie",
            image: "https://via.placeholder.com/300x180?text=Kingdom+Wars",
            rating: 4.7,
            players: "2.5M+"
        }
    ],
    topRated: [
        {
            title: "The Last Odyssey",
            description: "Aventure narrative acclamée par la critique. Histoire émouvante et gameplay innovant.",
            category: "aventure",
            image: "https://via.placeholder.com/300x180?text=The+Last+Odyssey",
            rating: 4.9,
            players: "1.8M+"
        },
        {
            title: "Chess Grandmaster",
            description: "Le jeu d'échecs le plus abouti avec un IA de niveau champion du monde.",
            category: "stratégie",
            image: "https://via.placeholder.com/300x180?text=Chess+Grandmaster",
            rating: 4.9,
            players: "1M+"
        },
        {
            title: "Puzzle Dimensions 2",
            description: "Suite du puzzle game primé. Mécaniques encore plus innovantes.",
            category: "puzzle",
            image: "https://via.placeholder.com/300x180?text=Puzzle+Dimensions+2",
            rating: 4.8,
            players: "750K+"
        }
    ]
};

// Afficher les jeux par section
function displayPopularGames() {
    const trendingGrid = document.getElementById('trending-games');
    const multiplayerGrid = document.getElementById('multiplayer-games');
    const topRatedGrid = document.getElementById('top-rated-games');
    
    function createGameCard(game) {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <span class="popular-badge">POPULAIRE</span>
            <img src="${game.image}" alt="${game.title}">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span class="game-category">${game.category}</span>
                    <div>
                        <span class="game-rating"><i class="fas fa-star"></i>${game.rating}</span>
                        <span style="margin-left: 10px; color: #666; font-size: 0.8rem;"><i class="fas fa-users"></i> ${game.players}</span>
                    </div>
                </div>
            </div>
        `;
        return gameCard;
    }
    
    // Afficher les jeux tendance
    popularGames.trending.forEach(game => {
        trendingGrid.appendChild(createGameCard(game));
    });
    
    // Afficher les jeux multijoueurs
    popularGames.multiplayer.forEach(game => {
        multiplayerGrid.appendChild(createGameCard(game));
    });
    
    // Afficher les jeux mieux notés
    popularGames.topRated.forEach(game => {
        topRatedGrid.appendChild(createGameCard(game));
    });
}

// Afficher tous les jeux au chargement
displayPopularGames();