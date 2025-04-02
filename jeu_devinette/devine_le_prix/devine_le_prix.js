// Variables du jeu
let currentProduct = {};
let actualPrice = 0;
let attemptsLeft = 3;
let totalScore = 0;
let gamesPlayed = 0;
let wins = 0;
let gameActive = false;
let hintsUsed = [];

// Éléments du DOM
const productImage = document.getElementById('product-image');
const productName = document.getElementById('product-name');
const productDescription = document.getElementById('product-description');
const priceSlider = document.getElementById('price-slider');
const priceInput = document.getElementById('price-input');
const submitGuess = document.getElementById('submit-guess');
const resultMessage = document.getElementById('result-message');
const attemptsCounter = document.getElementById('attempts-counter');
const minPriceSpan = document.getElementById('min-price');
const maxPriceSpan = document.getElementById('max-price');
const newGameBtn = document.getElementById('new-game-btn');
const hint10Btn = document.getElementById('hint-10');
const hint5Btn = document.getElementById('hint-5');
const gamesPlayedSpan = document.getElementById('games-played');
const winsSpan = document.getElementById('wins');
const totalScoreSpan = document.getElementById('total-score');
const soundToggle = document.getElementById('sound-toggle');
const animationsToggle = document.getElementById('animations-toggle');
const difficultySelect = document.getElementById('difficulty-select');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const hintSound = document.getElementById('hint-sound');

// Base de données de produits (simplifiée)
const products = [
    {
        name: "iPhone 15 Pro",
        description: "Dernier smartphone haut de gamme d'Apple avec écran Super Retina XDR et puce A17 Pro.",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009278906",
        price: 1159
    },
    {
        name: "PlayStation 5",
        description: "Console de jeu nouvelle génération avec lecteur Blu-ray Ultra HD et SSD ultra-rapide.",
        image: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
        price: 499
    },
    {
        name: "MacBook Air M2",
        description: "Ordinateur portable ultra-fin avec écran Retina, puce M2 et jusqu'à 18 heures d'autonomie.",
        image: "https://www.apple.com/v/macbook-air-m2/b/images/overview/design/design_top_midnight__f9y2jddj4eqa_large.jpg",
        price: 1299
    },
    {
        name: "Nike Air Jordan 1",
        description: "Chaussures de basketball emblématiques avec amorti Air-Sole et cuir premium.",
        image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-jordan-1-mid-shoes-X5pM09.png",
        price: 125
    },
    {
        name: "Dyson V15 Detect",
        description: "Aspirateur sans fil avec technologie de détection laser et jusqu'à 60 minutes d'autonomie.",
        image: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/420980-01.png?$responsive$&cropPathE=desktop&fit=stretch,1&wid=1920",
        price: 699
    }
];

// Initialisation du jeu
function initGame() {
    // Sélection aléatoire d'un produit
    const randomIndex = Math.floor(Math.random() * products.length);
    currentProduct = products[randomIndex];
    actualPrice = currentProduct.price;
    
    // Ajustement du prix selon la difficulté
    const difficulty = difficultySelect.value;
    let priceRange = 1000;
    
    if (difficulty === 'easy') {
        priceRange = 500;
        attemptsLeft = 5;
    } else if (difficulty === 'medium') {
        priceRange = 1000;
        attemptsLeft = 3;
    } else {
        priceRange = 2000;
        attemptsLeft = 2;
    }
    
    // Mise à jour de l'interface
    productImage.src = currentProduct.image;
    productName.textContent = currentProduct.name;
    productDescription.textContent = currentProduct.description;
    
    priceSlider.min = Math.max(0, actualPrice - priceRange);
    priceSlider.max = actualPrice + priceRange;
    priceSlider.value = (priceSlider.min + priceSlider.max) / 2;
    
    minPriceSpan.textContent = `${priceSlider.min}€`;
    maxPriceSpan.textContent = `${priceSlider.max}€`;
    
    priceInput.min = priceSlider.min;
    priceInput.max = priceSlider.max;
    priceInput.value = '';
    
    resultMessage.textContent = '';
    resultMessage.className = '';
    attemptsCounter.textContent = `Tentatives: ${attemptsLeft}/${difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 2}`;
    
    hintsUsed = [];
    gameActive = true;
    
    // Animation
    if (animationsToggle.checked) {
        productImage.classList.add('pulse');
        setTimeout(() => {
            productImage.classList.remove('pulse');
        }, 500);
    }
}

// Vérification de la devinette
function checkGuess() {
    if (!gameActive) return;
    
    const userGuess = parseInt(priceInput.value);
    
    if (isNaN(userGuess)) {
        resultMessage.textContent = "Veuillez entrer un nombre valide!";
        resultMessage.className = 'incorrect';
        return;
    }
    
    attemptsLeft--;
    attemptsCounter.textContent = `Tentatives: ${attemptsLeft}/${difficultySelect.value === 'easy' ? 5 : difficultySelect.value === 'medium' ? 3 : 2}`;
    
    const difference = Math.abs(userGuess - actualPrice);
    const percentageDiff = (difference / actualPrice) * 100;
    
    let scoreEarned = 0;
    
    if (difference === 0) {
        // Réponse exacte
        resultMessage.textContent = `Félicitations! C'est le prix exact! (+50 points)`;
        resultMessage.className = 'correct';
        scoreEarned = 50;
        endGame(true);
    } else if (percentageDiff <= 5) {
        // Très proche
        resultMessage.textContent = `Très proche! Le prix était ${actualPrice}€. (+30 points)`;
        resultMessage.className = 'correct';
        scoreEarned = 30;
        endGame(true);
    } else if (percentageDiff <= 15) {
        // Proche
        resultMessage.textContent = `Pas mal! Le prix était ${actualPrice}€. (+20 points)`;
        resultMessage.className = 'close';
        scoreEarned = 20;
        endGame(true);
    } else if (attemptsLeft <= 0) {
        // Plus de tentatives
        resultMessage.textContent = `Dommage! Le prix était ${actualPrice}€. Essayez encore!`;
        resultMessage.className = 'incorrect';
        endGame(false);
    } else {
        // Incorrect mais peut réessayer
        if (userGuess < actualPrice) {
            resultMessage.textContent = "C'est plus! Essayez encore.";
        } else {
            resultMessage.textContent = "C'est moins! Essayez encore.";
        }
        resultMessage.className = 'incorrect';
    }
    
    // Ajout du score (même en cas d'échec, pour les réponses proches)
    if (scoreEarned > 0) {
        totalScore += scoreEarned;
        totalScoreSpan.textContent = totalScore;
    }
    
    // Animation
    if (animationsToggle.checked) {
        resultMessage.classList.add('pulse');
        setTimeout(() => {
            resultMessage.classList.remove('pulse');
        }, 500);
    }
    
    // Son
    if (soundToggle.checked) {
        if (scoreEarned > 0) {
            winSound.currentTime = 0;
            winSound.play();
        } else {
            loseSound.currentTime = 0;
            loseSound.play();
        }
    }
}

// Fin de la partie
function endGame(win) {
    gameActive = false;
    gamesPlayed++;
    gamesPlayedSpan.textContent = gamesPlayed;
    
    if (win) {
        wins++;
        winsSpan.textContent = wins;
    }
}

// Utilisation d'un indice
function useHint(percentage) {
    if (!gameActive || hintsUsed.includes(percentage)) return;
    
    const pointsCost = percentage === 10 ? 5 : 10;
    const range = actualPrice * (percentage / 100);
    
    if (soundToggle.checked) {
        hintSound.currentTime = 0;
        hintSound.play();
    }
    
    hintsUsed.push(percentage);
    
    // Mise à jour de l'interface pour l'indice
    priceSlider.min = Math.max(priceSlider.min, actualPrice - range);
    priceSlider.max = Math.min(priceSlider.max, actualPrice + range);
    minPriceSpan.textContent = `${Math.floor(priceSlider.min)}€`;
    maxPriceSpan.textContent = `${Math.ceil(priceSlider.max)}€`;
    
    // Désactivation du bouton d'indice
    if (percentage === 10) {
        hint10Btn.disabled = true;
        hint10Btn.style.opacity = '0.6';
    } else {
        hint5Btn.disabled = true;
        hint5Btn.style.opacity = '0.6';
    }
    
    // Animation
    if (animationsToggle.checked) {
        priceSlider.classList.add('pulse');
        setTimeout(() => {
            priceSlider.classList.remove('pulse');
        }, 500);
    }
}

// Synchronisation du slider et de l'input
priceSlider.addEventListener('input', () => {
    priceInput.value = priceSlider.value;
});

priceInput.addEventListener('input', () => {
    if (priceInput.value) {
        priceSlider.value = priceInput.value;
    }
});

// Événements
submitGuess.addEventListener('click', checkGuess);
priceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});

newGameBtn.addEventListener('click', () => {
    initGame();
    hint10Btn.disabled = false;
    hint5Btn.disabled = false;
    hint10Btn.style.opacity = '1';
    hint5Btn.style.opacity = '1';
});

hint10Btn.addEventListener('click', () => useHint(10));
hint5Btn.addEventListener('click', () => useHint(5));

// Initialisation au chargement
window.addEventListener('DOMContentLoaded', () => {
    initGame();
});