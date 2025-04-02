// Génère un mot de passe aléatoire (ex: "A1B2C")
function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 5; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

const password = generatePassword();
let attempts = 0;
let hintsLeft = 3;
let revealedIndices = [];
let gameOver = false;

// Éléments du DOM
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const hintBtn = document.getElementById('hint-btn');
const hintCount = document.getElementById('hint-count');
const resultDisplay = document.getElementById('result');
const attemptsDisplay = document.getElementById('attempts');
const hintDisplay = document.getElementById('hint');

// Écouteurs d'événements
guessInput.addEventListener('input', toggleGuessButton);
guessBtn.addEventListener('click', checkGuess);
hintBtn.addEventListener('click', giveHint);

// Active/désactive le bouton Essayer
function toggleGuessButton() {
    guessBtn.disabled = guessInput.value.length !== 5;
}

// ... (conservez le début du fichier jusqu'à la fonction checkGuess)

function checkGuess() {
    if (gameOver) return;
    
    const guess = guessInput.value.toUpperCase();
    attempts++;
    attemptsDisplay.textContent = `Tentatives : ${attempts}/7`;
    
    if (guess === password) {
        endGame(true);
        return;
    }
    
    if (attempts >= 7) {
        endGame(false);
        return;
    }
    
    // Crée des copies pour manipulation
    let remainingPasswordLetters = password.split('');
    let remainingGuessLetters = guess.split('');
    let feedback = Array(5).fill(null);
    
    // Étape 1: Trouver les lettres correctement placées (vertes)
    for (let i = 0; i < 5; i++) {
        if (remainingGuessLetters[i] === remainingPasswordLetters[i]) {
            feedback[i] = `<span class="correct-position">${remainingGuessLetters[i]}</span>`;
            remainingPasswordLetters[i] = ''; // Marquer comme traité
            remainingGuessLetters[i] = ''; // Marquer comme traité
        }
    }
    
    // Étape 2: Trouver les lettres mal placées mais présentes (oranges)
    for (let i = 0; i < 5; i++) {
        if (remainingGuessLetters[i] === '') continue; // Déjà traité
        
        const foundIndex = remainingPasswordLetters.indexOf(remainingGuessLetters[i]);
        if (foundIndex !== -1) {
            feedback[i] = `<span class="wrong-position">${remainingGuessLetters[i]}</span>`;
            remainingPasswordLetters[foundIndex] = ''; // Marquer comme traité
        } else {
            feedback[i] = remainingGuessLetters[i];
        }
    }
    
    resultDisplay.innerHTML = `Votre essai: ${feedback.join('')}`;
    guessInput.value = '';
    guessBtn.disabled = true;
}

// ... (conservez le reste du fichier inchangé)

function giveHint() {
    if (hintsLeft <= 0 || gameOver) return;
    
    // Trouve une lettre non encore révélée
    let availableIndices = [];
    for (let i = 0; i < password.length; i++) {
        if (!revealedIndices.includes(i)) {
            availableIndices.push(i);
        }
    }
    
    if (availableIndices.length === 0) return;
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    revealedIndices.push(randomIndex);
    hintsLeft--;
    
    hintCount.textContent = hintsLeft;
    if (hintsLeft === 0) {
        hintBtn.disabled = true;
    }
    
    updateHintDisplay();
}

function updateHintDisplay() {
    let hint = '';
    for (let i = 0; i < password.length; i++) {
        if (revealedIndices.includes(i)) {
            hint += `<span class="correct-position">${password[i]}</span>`;
        } else {
            hint += '*';
        }
    }
    hintDisplay.innerHTML = hint;
}

function endGame(won) {
    gameOver = true;
    guessBtn.disabled = true;
    hintBtn.disabled = true;
    
    if (won) {
        resultDisplay.textContent = '🎉 Bravo ! Vous avez trouvé le mot de passe !';
        resultDisplay.style.color = '#2ecc71';
    } else {
        resultDisplay.textContent = '💥 Game Over ! Vous avez épuisé vos tentatives.';
        resultDisplay.style.color = '#e74c3c';
        resultDisplay.classList.add('game-over');
    }
    
    hintDisplay.innerHTML = `Mot de passe: <span class="correct-position">${password}</span>`;
}

// Pour debug (à enlever en production)
console.log("Mot de passe:", password);