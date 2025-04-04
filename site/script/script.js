// Données des jeux
const games = [
    {
        title: "QCM",
        description: "Testez vos connaissances avec ce questionnaire à choix multiples sur divers sujets.",
        category: "quiz",
        image: "../img/img-qcm.jpeg",
        rating: 4.5,
        link: "../jeu_devinette/qcm/qcm2.html"
    },
    {
        title: "Black Jack",
        description: "Affrontez le croupier dans ce jeu de cartes classique. Le but : atteindre 21 sans dépasser.",
        category: "cartes",
        image: "../img/blackjack.jpeg",
        rating: 4.2,
        link: "../jeu_de_carte/blackjack/blackjack.html"
    },
    {
        title: "mot de passe",
        description: "Devinez le mot mystère en utilisant les indices donnés. Un jeu de déduction passionnant.",
        category: "devinette",
        image: "../img/mot-de-passe.jpeg",
        rating: 4.8,
        link: "../jeu_devinette/mot_de_passe/mot_de_passe.html"
    },
    {
        title: "pendu",
        description: "Trouvez le mot caché en proposant des lettres avant que le bonhomme ne soit pendu !",
        category: "devinette",
        image: "../img/pendu.png",
        rating: 4.3,
        link: "../jeu_devinette/pendu/pendu.html"
    },
    {
        title: "sudoku",
        description: "Remplissez la grille avec des chiffres de 1 à 9 sans répétition dans les lignes, colonnes ou carrés.",
        category: "réflexion",
        image: "../img/sudoku.jpg",
        rating: 4.6,
        link: "../jeu_classique/sudoku/sudoku.html"
    },
    {
        title: "Echec",
        description: "Jeu de stratégie millénaire où le but est de mettre en échec le roi adverse.",
        category: "stratégie",
        image: "../img/echec.jpg",
        rating: 4.4,
        link: "../jeu_classique/echec/echec.html"
    },
    {
        title: "Jeu de drapeau",
        description: "Testez vos connaissances en reconnaissant les drapeaux des pays du monde.",
        category: "éducatif",
        image: "../img/drapeau.webp",
        rating: 4.7,
        link: "../jeu_devinette/jeu_de_drapeau/jeu_de_drapeau.html"
    },
    {
        title: "Solitaire",
        description: "Jeu de cartes en solitaire où le but est de ranger toutes les cartes par couleur et valeur.",
        category: "cartes",
        image: "../img/solitaire.jpg",
        rating: 4.1,
        link: "../jeu_de_carte/solitaire/solitaire.html"
    },
    {
        title: "Snake",
        description: "Contrôlez un serpent qui grandit en mangeant des fruits. Évitez de vous mordre la queue !",
        category: "arcade",
        image: "../img/snake.jpg",
        rating: 4.5,
        link: "../jeu_classique/snake/snake.html"
    },
    {
        title: "devine le prix",
        description: "Estimez le prix de différents produits pour remporter la partie.",
        category: "devinette",
        image: "../img/devine-le-prix.jpg",
        rating: 4.0,
        link: "../jeu_devinette/devine_le_prix/devine_le_prix.html"
    },
    {
        title: "Morpion",
        description: "Jeu de grille classique où il faut aligner 3 symboles identiques avant son adversaire.",
        category: "stratégie",
        image: "../img/morpion.png",
        rating: 4.2,
        link: "../jeu_classique/morpion/morpion.html"
    },
    {
        title: "Poker",
        description: "Jeu de cartes populaire où la stratégie et la psychologie sont essentielles pour bluffer ses adversaires.",
        category: "cartes",
        image: "../img/poker.jpg",
        rating: 4.6,
        link: "../jeu_de_carte/poker/poker.html"
    },
    {
        title: "Pierre-Feuille-Ciseaux",
        description: "Affrontez l'ordinateur dans ce jeu de mains classique où chaque symbole en bat un autre.",
        category: "classique",
        image: "../img/pierre-feuille-ciseaux.webp",
        rating: 4.6,
        link: "../jeu_classique/Pierre-Feuille-Ciseaux/pfc.html"
    },
    {
        title: "Voiture",
        description: "Jeu de course où vous devez éviter les obstacles et atteindre la ligne d'arrivée.",
        category: "course",
        image: "../img/voiture.png",
        rating: 4.6,
        link: "../jeu_combat/voiture/voiture.html"
    },
    {
        title: "Memory",
        description: "Retrouvez les paires de cartes identiques en mémorisant leur emplacement.",
        category: "mémoire",
        image: "../img/memory.jpg",
        rating: 4.6,
        link: "../jeu_classique/memory/memory.html"
    },
    {
        title: "Geometry Dash",
        description: "Jeu de plateforme rythmique où il faut sauter au bon moment pour éviter les obstacles.",
        category: "arcade",
        image: "../img/geometry_dash.jpg",
        rating: 4.6,
        link: "../jeu_classique/geometry_dash/geometry_dash.html"
    },
    {
        title: "devine le logo",
        description: "Reconnaissez les logos de marques célèbres dans ce jeu de culture générale.",
        category: "devinette",
        image: "../img/logo.jpg",
        rating: 4.6,
        link: "../jeu_devinette/devine_le_logo/devine_le_logo.html"
    },
    {
        title: "Quiz d'anglais",
        description: "Testez et améliorez votre anglais avec ce quiz de vocabulaire et grammaire.",
        category: "éducatif",
        image: "../img/anglais.jpg",
        rating: 4.6,
        link: "../jeu_devinette/quiz/quiz_anglais/quiz_anglais.html"
    },
    {
        title: "Quiz de mathématiques",
        description: "Résolvez des problèmes mathématiques de différents niveaux de difficulté.",
        category: "éducatif",
        image: "../img/maths.jpg",
        rating: 4.6,
        link: "../jeu_devinette/quiz/quiz_math/quiz_math.html"
    },
    {
        title: "N'appuie pas sur le bouton",
        description: "Jeu de réflexes où il faut résister à la tentation d'appuyer sur le bouton.",
        category: "arcade",
        image: "../img/bouton.jpg",
        rating: 4.6,
        link: "../jeu_classique/bouton_fuyare/accueil.html"
    },
    {
        title: "Clique",
        description: "Jeu de réflexes où il faut résister à la tentation d'appuyer sur le bouton.",
        category: "classique",
        image: "/img/cliquer.jpg",
        rating: 4.6,
        link: "../jeu_classique/cliquer/cliquer.html"
    }
];

// Afficher les jeux
const gamesGrid = document.getElementById('games-grid');
const searchInput = document.querySelector('.search-bar input');
const filterButtons = document.querySelectorAll('.filter-btn');

function displayGames(gamesToDisplay) {
    gamesGrid.innerHTML = '';

    gamesToDisplay.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
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
        
        // Ajout de l'événement de clic pour la redirection
        gameCard.addEventListener('click', () => {
            // Passer le nom du jeu en paramètre d'URL
            window.location.href = `${game.link}?game=${encodeURIComponent(game.title)}`;
        });
        
        // Effet hover
        gameCard.style.cursor = 'pointer';
        gameCard.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        gameCard.addEventListener('mouseenter', () => {
            gameCard.style.transform = 'translateY(-5px)';
            gameCard.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        gameCard.addEventListener('mouseleave', () => {
            gameCard.style.transform = 'translateY(0)';
            gameCard.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });
        
        gamesGrid.appendChild(gameCard);
    });
}

// Filtrage des jeux
function filterGames() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active');
    const category = activeFilter ? activeFilter.dataset.category : null;

    let filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm);

        const matchesCategory = !category || game.category === category;

        return matchesSearch && matchesCategory;
    });

    displayGames(filteredGames);
}

// Événements
searchInput.addEventListener('input', filterGames);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterGames();
    });
});

// Afficher tous les jeux au chargement
document.addEventListener('DOMContentLoaded', () => {
    displayGames(games);
    
    // Activer le bouton "Tous" par défaut
    const allButton = document.querySelector('.filter-btn[data-category="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
});

// Particules.js (si vous voulez le garder)
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
});