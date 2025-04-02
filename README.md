# mon-site
idées de jeuy a faire :


🎲 Jeux Classiques Revisités
Memory (Jeu de mémoire avec des paires d'images)

Démineur (Version améliorée avec différents thèmes)

Puissance 4 (Avec mode solo contre IA et multijoueur)

Sudoku (Générateur avec 3 niveaux de difficulté)    A FAITS 

Morpion 3D (Variante en 3 niveaux)   A FAIRE

♠️ Jeux de Cartes
Solitaire (Klondike, Spider ou FreeCell) A FAIRE

Bataille (Avec animations de cartes)

Poker Texas Hold'em (Version simplifiée)

Uno (Version numérique avec règles personnalisables)

Jeu de 7 familles (Thème personnalisable)

🧩 Jeux de Réflexion
Mastermind (Décoder la combinaison secrète)

Taquin (Slider puzzle avec images personnalisables)

Picross (Grilles logiques avec créateur de niveaux)

Échecs (Avec tutoriel intégré pour débutants)

Dames (Internationales, anglaises, etc.)

✍️ Jeux de Mots
Wordle (Version française avec partage des résultats)

Scrabble (Solo contre IA ou multijoueur)

Motus (Jeu de télévision adapté)

Anagrammes (Trouver tous les mots possibles)

Boggle (Version chronométrée)

🎮 Jeux d'Action/Arcade
Snake (Avec différents modes de jeu)

Space Invaders (Version rétro ou moderne)

Pong (Avec physique réaliste)

Casse-briques (Power-ups et niveaux créatifs)

Jeu de plateforme (Mini-aventure avec 5 niveaux)

📊 Jeux Quiz & Éducatifs
Quiz Culture Générale (Par thèmes : histoire, géo, etc.)

Vrai ou Faux (Avec explications détaillées)

Jeu des drapeaux (Identifier les pays)

Chronologie (Ordonner des événements historiques)

Devinez le prix (Estimer le coût d'objets)

🎲 Jeux de Société Numériques
Loup-garou (Version simplifiée pour jouer en ligne)

Petits meurtres (Jeu d'enquête collaboratif)

Trivial Pursuit (Questions par catégories)

Dixit (Version numérique avec création de cartes)

Time's Up! (Jeu de devinettes chronométré)

🕹️ Jeux Originaux & Créatifs
Simulateur de vie (Mini-jeu de gestion)

Jeu de dessin (Dessiner et faire deviner)

Escape Game numérique (Résoudre des énigmes)

Générateur d'histoires (Choix multiples)

Jeu de programmation (Puzzles avec code simple)

💡 Idées Bonus
Jeu de trading (Simulation boursière simplifiée)

Jeu de recettes (Associer ingrédients)

Jeu météo (Prédire le temps sur des graphiques)

Jeu musical (Reconnaître des mélodies)

Jeu d'optique (Illusions interactives)

pierre feuille ciseaux

jeu de voiture

flapy bird avec unity

un jeu de platforme avec "groom" 

toucher coulé 

devine le logo

(devine le pays avec la carte)

traffic jam

quiz math

categorie revision pour l'ecole 

un jeu ou tu dois cliqueé sur un bouton et a chaque fois que tu te rapproche du bouton il se deplace a un autre endroit et le seul moyen d'arreter le bouton est de cliqué sur k


faire le bouton imposible. au debut il va très lentement et est felicite le joueur quand il arrive a cliqué desu mais de plus en plus que le joueur clique sur le bouton plus il va vite et plus il devient en colere qu'on le clique desu pour au final qu'il devenir impossible a touché et il humilira le joueur de sa nulité


faire un page assez beau, magnifique, super bien et grave bien visuellement en html css et js. au premier plan un texte qui dit "je vous mets au defi de terminé au moins un des trois jeux si dessous"
et un peu plus en bas trois bouton qui redirige sur d'autres page que je mettré moi 

et d'autre truc cool


# CODE A FAIRE 

fusionné le menu nav du qcm et du mot de passe 
reglé le probleme de nav sur toutes les pages
reglé les probleme sur la page pendu (lettre multiple) et le sudoku 
amélioré le jeu mot de passe, le qcm et le solitaire
rendre le tout plus beau visuellement


--

# MENU NAV :


<nav class="navbar">
            <div class="navbar-container">
                <a href="/index.html" class="logo">
                    <i class="fas fa-gamepad"></i>
                    <span>Game<span>Hub</span></span>
                </a>
    
                
                <div class="menu-toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="./site/index.html" class="nav-links active">
                            <i class="fas fa-home"></i> Accueil
                            <span class="link-underline"></span>
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a href="#" class="nav-links dropdown-toggle">
                            <i class="fas fa-info-circle"></i> Jeu de carte
                            <span class="link-underline"></span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="../jeu_de_carte/blackjack/blackjack.html" class="dropdown-item">Blackjack</a></li>
                            <li><a href="#" class="dropdown-item">Poker</a></li>
                            <li><a href="#" class="dropdown-item">Solitaire</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a href="#" class="nav-links dropdown-toggle">
                            <i class="fas fa-briefcase"></i> Jeu de devinette
                            <span class="link-underline"></span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#" class="dropdown-item">Géographie</a></li>
                            <li><a href="#" class="dropdown-item">puzzel</a></li>
                            <li><a href="#" class="dropdown-item">Casse tête</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="../jeu_devinette/mot_de_passe.html" class="nav-links">
                            <i class="fas fa-image"></i> Jeu CLassique
                            <span class="link-underline"></span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#" class="dropdown-item">Morpion</a></li>
                            <li><a href="#" class="dropdown-item">Snake</a></li>
                            <li><a href="#" class="dropdown-item">Pierre-Feuille-Ciseaux</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="../qcm/qcm.html" class="nav-links">
                            <i class="fas fa-envelope"></i> PLUS
                            <span class="link-underline"></span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="../index.html">Accueil</a></li>
                            <li><a href="nouveaux-jeux.html">Nouveautés</a></li>
                            <li><a href="jeux-populaires.html" class="active">Populaires</a></li>
                            <li><a href="categories.html">Catégories</a></li>
                            <li><a href="a-propos.html">À propos</a></li>

                        </ul>
                    </li>
                </ul>
            </div>
        </nav>


# A MODIFIER DANS LE JS :

js :
// Nouveaux paramètres de difficulté
const difficultySettings = {
    easy: {
        gridSize: 4,
        peekTime: 3000, // 3 secondes pour mémoriser
        timePenalty: 0, // Pas de pénalité
        timeLimit: 0 // Pas de limite
    },
    medium: {
        gridSize: 6,
        peekTime: 2500,
        timePenalty: 2, // +2 secondes par erreur
        timeLimit: 180 // 3 minutes
    },
    hard: {
        gridSize: 8,
        peekTime: 2000,
        timePenalty: 5,
        timeLimit: 150 // 2.5 minutes
    },
    impossible: {
        gridSize: 10,
        peekTime: 1500,
        timePenalty: 10,
        timeLimit: 120 // 2 minutes
    }
};

// Modifié la fonction startGame
function startGame() {
    if (gameStarted) return;
    
    const settings = difficultySettings[difficulty];
    
    // Reset game state
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    countdown = settings.timeLimit || 180;
    gameStarted = true;
    
    // Update UI
    updateDisplays();
    
    // Initialize board with new settings
    initializeBoard(settings.gridSize);
    
    // Generate and shuffle cards
    generateCardPairs();
    shuffleCards();
    
    // Apply difficulty-specific settings
    if (hintsEnabled === 'peek') {
        showAllCards();
        setTimeout(hideAllCards, settings.peekTime);
    }
    
    // Start timer with difficulty settings
    startTimer(settings);
    
    // Show difficulty indicator
    showDifficultyIndicator();
}

// Nouvelle fonction pour appliquer les pénalités
function applyTimePenalty() {
    if (difficulty === 'easy') return;
    
    const settings = difficultySettings[difficulty];
    seconds += settings.timePenalty;
    
    // Show penalty animation
    const penaltyDisplay = document.createElement('div');
    penaltyDisplay.className = 'penalty-display';
    penaltyDisplay.textContent = `+${settings.timePenalty}s`;
    penaltyDisplay.style.color = '#ff4757';
    document.body.appendChild(penaltyDisplay);
    
    // Animate
    setTimeout(() => {
        penaltyDisplay.style.transform = 'translateY(-50px)';
        penaltyDisplay.style.opacity = '0';
        setTimeout(() => penaltyDisplay.remove(), 1000);
    }, 50);
}

// Modifié la fonction flipCardsBack
function flipCardsBack() {
    // Appliquer pénalité de temps
    applyTimePenalty();
    
    // Animation améliorée
    flippedCards[0].element.classList.add('shake');
    flippedCards[1].element.classList.add('shake');
    
    setTimeout(() => {
        flippedCards.forEach(card => {
            card.flipped = false;
            card.element.classList.remove('flipped');
            card.element.classList.remove('shake');
        });
        
        flippedCards = [];
    }, 800);
}

// Nouvelle fonction pour l'indicateur de difficulté
function showDifficultyIndicator() {
    const difficultyNames = {
        easy: 'Facile',
        medium: 'Moyen',
        hard: 'Difficile',
        impossible: 'Impossible'
    };
    
    const colors = {
        easy: '#2ecc71',
        medium: '#f39c12',
        hard: '#e74c3c',
        impossible: '#9b59b6'
    };
    
    const indicator = document.createElement('div');
    indicator.className = 'difficulty-indicator';
    indicator.textContent = difficultyNames[difficulty];
    indicator.style.backgroundColor = colors[difficulty];
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => indicator.remove(), 1000);
    }, 3000);
}




# DANS LE CSS :

/* Indicateur de difficulté */
.difficulty-indicator {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: opacity 0.5s ease;
}

/* Affichage des pénalités */
.penalty-display {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    font-weight: bold;
    z-index: 1000;
    transition: all 0.5s ease;
}

/* Effet de surbrillance pour les correspondances */
@keyframes highlight {
    0% { box-shadow: 0 0 5px 2px rgba(76, 195, 247, 0.5); }
    50% { box-shadow: 0 0 20px 10px rgba(76, 195, 247, 0.8); }
    100% { box-shadow: 0 0 5px 2px rgba(76, 195, 247, 0.5); }
}

.card.matched {
    animation: highlight 2s infinite;
}

/* Responsive amélioré */
@media (max-width: 768px) {
    .card-front {
        font-size: 2.5rem;
    }
    
    .game-board {
        gap: 8px;
        padding: 10px;
    }
}

@media (max-width: 480px) {
    .card-front {
        font-size: 2rem;
    }
}