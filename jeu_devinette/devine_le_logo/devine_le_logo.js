// Données des logos
const logoData = {
    easy: [
        {
            name: "Apple",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            options: ["Apple", "Samsung", "Nokia", "Blackberry"],
            hint: "Cette marque est connue pour ses iPhones et ses ordinateurs Mac."
        },
        {
            name: "Nike",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
            options: ["Adidas", "Puma", "Nike", "Reebok"],
            hint: "Leur slogan est 'Just Do It' et leur logo est un Swoosh."
        },
        {
            name: "McDonald's",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg",
            options: ["Burger King", "McDonald's", "KFC", "Subway"],
            hint: "Fast-food célèbre pour ses hamburgers et ses arches dorées."
        },
        {
            name: "Google",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            options: ["Google", "Bing", "Yahoo", "DuckDuckGo"],
            hint: "Le moteur de recherche le plus utilisé au monde."
        },
        {
            name: "Coca-Cola",
            image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
            options: ["Pepsi", "Coca-Cola", "Sprite", "Fanta"],
            hint: "Boisson gazeuse la plus connue avec une écriture cursive distinctive."
        }
    ],
    medium: [
        {
            name: "Twitter",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Twitter_Logo_Blue.svg",
            options: ["Facebook", "Instagram", "Twitter", "LinkedIn"],
            hint: "Réseau social connu pour ses tweets et son oiseau bleu."
        },
        {
            name: "Netflix",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            options: ["Amazon Prime", "Disney+", "Netflix", "HBO Max"],
            hint: "Plateforme de streaming qui a popularisé le binge-watching."
        },
        {
            name: "Spotify",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
            options: ["Apple Music", "Spotify", "Deezer", "Tidal"],
            hint: "Service de streaming musical avec un logo vert sur fond noir."
        },
        {
            name: "Airbnb",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
            options: ["Booking.com", "Airbnb", "TripAdvisor", "Expedia"],
            hint: "Plateforme de location de logements entre particuliers."
        },
        {
            name: "Tesla",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
            options: ["Ford", "Toyota", "Tesla", "BMW"],
            hint: "Entreprise de voitures électriques fondée par Elon Musk."
        }
    ],
    hard: [
        {
            name: "Slack",
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
            options: ["Microsoft Teams", "Slack", "Discord", "Zoom"],
            hint: "Outil de communication d'équipe avec un hashtag comme logo."
        },
        {
            name: "Asana",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Asana_logo.svg",
            options: ["Trello", "Asana", "Jira", "Monday.com"],
            hint: "Outil de gestion de projet avec un logo en forme de feuille."
        },
        {
            name: "Patreon",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Patreon_logomark.svg",
            options: ["Kickstarter", "Patreon", "GoFundMe", "Indiegogo"],
            hint: "Plateforme qui permet aux créateurs de recevoir un financement récurrent."
        },
        {
            name: "Notion",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
            options: ["Evernote", "Notion", "OneNote", "Bear"],
            hint: "Outil tout-en-un pour la prise de notes et la gestion de projets."
        },
        {
            name: "Figma",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
            options: ["Adobe XD", "Sketch", "Figma", "InVision"],
            hint: "Outil de design collaboratif qui fonctionne dans le navigateur."
        }
    ]
};

// Éléments du DOM
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startGameBtn = document.getElementById('start-game');
const playAgainBtn = document.getElementById('play-again-btn');
const changeModeBtn = document.getElementById('change-mode-btn');
const logoImage = document.getElementById('logo-image');
const answerOptions = document.getElementById('answer-options');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const timerDisplay = document.getElementById('timer-display');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const hintBtn = document.getElementById('hint-btn');
const skipBtn = document.getElementById('skip-btn');
const quitBtn = document.getElementById('quit-btn');
const hintModal = document.getElementById('hint-modal');
const hintText = document.getElementById('hint-text');
const closeModal = document.querySelector('.close-modal');
const finalScore = document.getElementById('final-score');
const correctAnswers = document.getElementById('correct-answers');
const totalQuestions = document.getElementById('total-questions');
const accuracy = document.getElementById('accuracy');
const leaderboardList = document.getElementById('leaderboard-list');
const currentDifficulty = document.getElementById('current-difficulty');
const blurOverlay = document.getElementById('blur-overlay');

// Variables du jeu
let currentMode = 'classic';
let currentDifficultyLevel = 'easy';
let score = 0;
let lives = 3;
let timer = 60;
let timerInterval;
let currentQuestionIndex = 0;
let questions = [];
let correctCount = 0;
let usedIndices = [];
let leaderboard = JSON.parse(localStorage.getItem('logoGameLeaderboard')) || [];

// Sons
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const gameOverSound = document.getElementById('game-over-sound');

// Initialisation
document.querySelectorAll('.option-btn[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.option-btn[data-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
    });
});

document.querySelectorAll('.option-btn[data-difficulty]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.option-btn[data-difficulty]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficultyLevel = btn.dataset.difficulty;
    });
});

startGameBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);
changeModeBtn.addEventListener('click', showIntroScreen);
hintBtn.addEventListener('click', showHint);
skipBtn.addEventListener('click', nextQuestion);
quitBtn.addEventListener('click', endGame);
closeModal.addEventListener('click', () => {
    hintModal.classList.remove('active');
});

// Fonctions du jeu
function startGame() {
    // Réinitialiser les variables du jeu
    score = 0;
    lives = 3;
    correctCount = 0;
    currentQuestionIndex = 0;
    usedIndices = [];
    
    // Mettre à jour l'affichage
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    
    // Sélectionner les questions en fonction de la difficulté
    questions = [...logoData[currentDifficultyLevel]];
    shuffleArray(questions);
    
    // Configurer le mode de jeu
    if (currentMode === 'time') {
        timer = 60;
        timerElement.textContent = timer;
        timerDisplay.classList.remove('hidden');
        startTimer();
    } else {
        timerDisplay.classList.add('hidden');
        if (timerInterval) clearInterval(timerInterval);
    }
    
    // Mettre à jour l'indicateur de difficulté
    updateDifficultyIndicator();
    
    // Afficher l'écran de jeu
    introScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // Charger la première question
    loadQuestion();
}

function showIntroScreen() {
    gameOverScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // Si on a fait toutes les questions, on recommence
        shuffleArray(questions);
        currentQuestionIndex = 0;
        usedIndices = [];
    }
    
    const question = questions[currentQuestionIndex];
    
    // Mettre à jour l'image du logo
    logoImage.src = question.image;
    logoImage.alt = `Logo de ${question.name}`;
    
    // Réinitialiser le flou
    blurOverlay.style.backdropFilter = `blur(${currentDifficultyLevel === 'easy' ? 8 : currentDifficultyLevel === 'medium' ? 12 : 16}px)`;
    
    // Mélanger les options de réponse
    const shuffledOptions = [...question.options];
    shuffleArray(shuffledOptions);
    
    // Afficher les options
    answerOptions.innerHTML = '';
    shuffledOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('answer-option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option, question.name));
        answerOptions.appendChild(optionElement);
    });
    
    // Mettre à jour la barre de progression
    updateProgressBar();
}

function checkAnswer(selectedOption, correctAnswer) {
    const optionElements = document.querySelectorAll('.answer-option');
    let isCorrect = false;
    
    optionElements.forEach(element => {
        if (element.textContent === correctAnswer) {
            element.classList.add('correct');
            if (selectedOption === correctAnswer) {
                isCorrect = true;
            }
        }
        
        if (element.textContent === selectedOption && selectedOption !== correctAnswer) {
            element.classList.add('wrong');
        }
        
        element.style.pointerEvents = 'none';
    });
    
    if (isCorrect) {
        // Bonne réponse
        correctSound.play();
        score += currentDifficultyLevel === 'easy' ? 10 : currentDifficultyLevel === 'medium' ? 20 : 30;
        scoreDisplay.textContent = score;
        correctCount++;
        
        // Réduire le flou comme récompense
        blurOverlay.style.backdropFilter = 'blur(2px)';
    } else {
        // Mauvaise réponse
        wrongSound.play();
        lives--;
        livesDisplay.textContent = lives;
        
        if (lives <= 0) {
            setTimeout(() => endGame(), 1000);
            return;
        }
    }
    
    // Passer à la question suivante après un délai
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showHint() {
    const question = questions[currentQuestionIndex];
    hintText.textContent = question.hint;
    hintModal.classList.add('active');
    
    // Pénalité de score pour avoir utilisé un indice
    score = Math.max(0, score - 5);
    scoreDisplay.textContent = score;
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    if (timerInterval) clearInterval(timerInterval);
    
    // Jouer le son de fin de jeu
    gameOverSound.play();
    
    // Calculer la précision
    const accuracyValue = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    
    // Mettre à jour l'écran de fin de jeu
    finalScore.textContent = score;
    correctAnswers.textContent = correctCount;
    totalQuestions.textContent = questions.length;
    accuracy.textContent = accuracyValue;
    
    // Mettre à jour le classement
    updateLeaderboard(score);
    displayLeaderboard();
    
    // Afficher l'écran de fin de jeu
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateDifficultyIndicator() {
    let text, color;
    
    switch (currentDifficultyLevel) {
        case 'easy':
            text = 'Facile';
            color = 'var(--easy-color)';
            break;
        case 'medium':
            text = 'Moyen';
            color = 'var(--medium-color)';
            break;
        case 'hard':
            text = 'Difficile';
            color = 'var(--hard-color)';
            break;
    }
    
    currentDifficulty.textContent = text;
    currentDifficulty.style.backgroundColor = color;
}

function updateLeaderboard(newScore) {
    // Ajouter le nouveau score
    leaderboard.push({
        score: newScore,
        date: new Date().toLocaleDateString(),
        difficulty: currentDifficultyLevel,
        mode: currentMode
    });
    
    // Trier par score (du plus haut au plus bas)
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Garder seulement les 10 meilleurs scores
    if (leaderboard.length > 10) {
        leaderboard = leaderboard.slice(0, 10);
    }
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('logoGameLeaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    leaderboardList.innerHTML = '';
    
    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<li>Aucun score enregistré</li>';
        return;
    }
    
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        
        // Icône en fonction du mode
        const modeIcon = entry.mode === 'time' ? '⏱️' : '⭐';
        
        // Couleur en fonction de la difficulté
        let difficultyColor;
        switch (entry.difficulty) {
            case 'easy': difficultyColor = 'var(--easy-color)'; break;
            case 'medium': difficultyColor = 'var(--medium-color)'; break;
            case 'hard': difficultyColor = 'var(--hard-color)'; break;
        }
        
        li.innerHTML = `
            <span>${index + 1}. ${modeIcon} <span style="color: ${difficultyColor}">${entry.score} pts</span></span>
            <span>${entry.date}</span>
        `;
        
        leaderboardList.appendChild(li);
    });
}

// Fonctions utilitaires
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Afficher le classement au chargement
displayLeaderboard();