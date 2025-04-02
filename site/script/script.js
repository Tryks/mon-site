// Données des jeux
const games = [
    {
        title: "QCM",
        description: "Explorez l'univers dans ce jeu d'aventure spatiale passionnant.",
        category: "aventure",
        image: "../img/img-qcm.jpeg",
        rating: 4.5,
        link: "../jeu_devinette/qcm/qcm2.html"
    },
    {
        title: "Black Jack",
        description: "Survivez à une apocalypse zombie dans ce FPS intense. Trouvez des armes et des ressources pour rester en vie.",
        category: "action",
        image: "../img/blackjack.jpeg",
        rating: 4.2,
        link: "../jeu_de_carte/blackjack/blackjack.html"
    },
    {
        title: "mot de passe",
        description: "Améliorez vos compétences aux échecs avec ce jeu de stratégie classique. Plusieurs niveaux de difficulté disponibles.",
        category: "stratégie",
        image: "../img/mot-de-passe.jpeg",
        rating: 4.8,
        link: "../jeu_devinette/mot_de_passe/mot_de_passe.html"
    },
    {
        title: "pendu",
        description: "Résolvez des centaines de puzzles captivants dans ce jeu qui stimule votre cerveau. Parfait pour les amateurs de défis.",
        category: "puzzle",
        image: "../img/pendu.png",
        rating: 4.3,
        link: "../jeu_devinette/pendu/pendu.html"
    },
    {
        title: "sudoku",
        description: "Devenez un champion du football dans ce jeu de sport réaliste. Jouez en solo ou en multijoueur en ligne.",
        category: "sport",
        image: "../img/sudoku.jpg",
        rating: 4.6,
        link: "../jeu_classique/sudoku/sudoku.html"
    },
    {
        title: "Echec",
        description: "Course de voitures à haute vitesse avec des graphismes époustouflants. Personnalisez votre véhicule et défiez vos amis.",
        category: "course",
        image: "../img/echec.jpg",
        rating: 4.4,
        link: "../jeu_classique/echec/echec.html"
    },
    {
        title: "Jeu de drapeau",
        description: "Jeu de combat multijoueur où le dernier survivant gagne. Choisissez votre stratégie et dominez l'arène.",
        category: "multijoueur",
        image: "../img/drapeau.webp",
        rating: 4.7,
        link: "../jeu_devinette/jeu_de_drapeau/jeu_de_drapeau.html"
    },
    {
        title: "Solitaire",
        description: "Gérez votre propre ferme dans ce jeu de simulation relaxant. Cultivez, élevez des animaux et développez votre entreprise.",
        category: "simulation",
        image: "../img/solitaire.jpg",
        rating: 4.1,
        link: "../jeu_de_carte/solitaire/solitaire.html"
    },
    {
        title: "Snake",
        description: "Jeu d'enquête où vous devez résoudre un mystère dans un manoir hanté. Trouvez des indices et démasquez le coupable.",
        category: "aventure",
        image: "../img/snake.jpg",
        rating: 4.5,
        link: "../jeu_classique/snake/snake.html"
    },
    {
        title: "devine le prix",
        description: "Montrez vos compétences au basket dans ce jeu de sport rapide. Plusieurs modes de jeu disponibles.",
        category: "sport",
        image: "../img/devine-le-prix.jpg",
        rating: 4.0,
        link: "../jeu_devinette/devine_le_prix/devine_le_prix.html"
    },
    {
        title: "Morpion",
        description: "Jeu de mots addictif où vous devez trouver le plus de mots possible à partir d'un ensemble de lettres.",
        category: "puzzle",
        image: "../img/morpion.png",
        rating: 4.2,
        link: "../jeu_classique/morpion/morpion.html"
    },
    {
        title: "Poker",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/poker.jpg",
        rating: 4.6,
        link: "../jeu_de_carte/poker/poker.html"
    },
    {
        title: "Pierre-Feuille-Ciseaux",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/pierre-feuille-ciseaux.webp",
        rating: 4.6,
        link: "../jeu_classique/Pierre-Feuille-Ciseaux/pfc.html"
    },
    {
        title: "Voiture",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/voiture.png",
        rating: 4.6,
        link: "../jeu_combat/voiture/voiture.html"
    },
    {
        title: "Memory",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/memory.jpg",
        rating: 4.6,
        link: "../jeu_classique/memory/memory.html"
    },
    {
        title: "Geometry Dash",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/geometry_dash.jpg",
        rating: 4.6,
        link: "../jeu_classique/geometry_dash/geometry_dash.html"
    },
    {
        title: "devine le logo",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/logo.jpg",
        rating: 4.6,
        link: "../jeu_devinette/devine_le_logo/devine_le_logo.html"
    },
    {
        title: "Quiz d'anglais",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/anglais.jpg",
        rating: 4.6,
        link: "../jeu_devinette/quiz/quiz_anglais/quiz_anglais.html"
    },
    {
        title: "Quiz de mathématiques",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/maths.jpg",
        rating: 4.6,
        link: "../jeu_devinette/quiz/quiz_math/quiz_math.html"
    },
    {
        title: "N'appuie pas sur le bouton",
        description: "Jeu de stratégie en temps réel où vous devez construire une armée et conquérir des territoires.",
        category: "stratégie",
        image: "../img/bouton.jpg",
        rating: 4.6,
        link: "../jeu_classique/bouton_fuyare/accueil.html"
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