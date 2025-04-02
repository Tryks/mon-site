// Constantes du jeu
const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
    "A", "2", "3", "4", "5", "6", "7", 
    "8", "9", "10", "J", "Q", "K"
];

// Éléments du DOM
const stockElement = document.getElementById('stock');
const wasteElement = document.getElementById('waste');
const foundations = [
    document.getElementById('foundation-1'),
    document.getElementById('foundation-2'),
    document.getElementById('foundation-3'),
    document.getElementById('foundation-4')
];
const piles = [
    document.getElementById('pile-1'),
    document.getElementById('pile-2'),
    document.getElementById('pile-3'),
    document.getElementById('pile-4'),
    document.getElementById('pile-5'),
    document.getElementById('pile-6'),
    document.getElementById('pile-7')
];
const timeElement = document.getElementById('time');
const movesElement = document.getElementById('moves');
const newGameBtn = document.getElementById('new-game-btn');
const hintBtn = document.getElementById('hint-btn');
const undoBtn = document.getElementById('undo-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const applySettingsBtn = document.getElementById('apply-settings');
const winModal = document.getElementById('win-modal');
const finalTimeElement = document.getElementById('final-time');
const finalMovesElement = document.getElementById('final-moves');
const finalScoreElement = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');
const shareBtn = document.getElementById('share-btn');
const hintDisplay = document.getElementById('hint-display');

// Variables du jeu
let deck = [];
let stock = [];
let waste = [];
let tableau = [[], [], [], [], [], [], []];
let foundation = [[], [], [], []];
let selectedCard = null;
let moves = 0;
let seconds = 0;
let timerInterval = null;
let gameStarted = false;
let moveHistory = [];
let hintTimeout = null;

// Initialisation du jeu
function initGame() {
    // Réinitialiser les variables
    deck = createDeck();
    stock = [];
    waste = [];
    tableau = [[], [], [], [], [], [], []];
    foundation = [[], [], [], []];
    selectedCard = null;
    moves = 0;
    seconds = 0;
    gameStarted = false;
    moveHistory = [];
    
    // Réinitialiser l'interface
    clearInterval(timerInterval);
    timeElement.textContent = "00:00";
    movesElement.textContent = "0";
    wasteElement.innerHTML = "";
    stockElement.innerHTML = '<div class="card-back"></div>';
    foundations.forEach(f => f.innerHTML = "");
    piles.forEach(p => p.innerHTML = "");
    
    // Mélanger le deck
    shuffleDeck(deck);
    
    // Distribuer les cartes dans le tableau
    dealCards();
    
    // Préparer le talon
    stock = [...deck];
    updateStock();
    
    // Écouteurs d'événements
    setupEventListeners();
    
    // Démarrer le jeu
    gameStarted = true;
    startTimer();
}

// Créer un deck de cartes
function createDeck() {
    const deck = [];
    for (let suit of SUITS) {
        for (let value of VALUES) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

// Mélanger le deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Distribuer les cartes dans le tableau
function dealCards() {
    for (let i = 0; i < 7; i++) {
        for (let j = i; j < 7; j++) {
            const card = deck.pop();
            if (j === i) {
                // Dernière carte de la pile est face visible
                tableau[j].push({ ...card, faceUp: true });
            } else {
                // Autres cartes sont face cachée
                tableau[j].push({ ...card, faceUp: false });
            }
        }
    }
    updateTableau();
}

// Mettre à jour l'affichage du tableau
function updateTableau() {
    for (let i = 0; i < 7; i++) {
        piles[i].innerHTML = "";
        tableau[i].forEach((card, index) => {
            const cardElement = createCardElement(card, index);
            piles[i].appendChild(cardElement);
        });
    }
}

// Mettre à jour le talon
function updateStock() {
    stockElement.innerHTML = stock.length > 0 ? '<div class="card-back"></div>' : '';
}

// Mettre à jour la défausse
function updateWaste() {
    wasteElement.innerHTML = "";
    if (waste.length > 0) {
        const card = waste[waste.length - 1];
        const cardElement = createCardElement(card, 0);
        wasteElement.appendChild(cardElement);
    }
}

// Mettre à jour les fondations
function updateFoundations() {
    for (let i = 0; i < 4; i++) {
        foundations[i].innerHTML = "";
        if (foundation[i].length > 0) {
            const card = foundation[i][foundation[i].length - 1];
            const cardElement = createCardElement(card, 0);
            foundations[i].appendChild(cardElement);
        }
    }
}

// Créer un élément carte
function createCardElement(card, index) {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${getCardColor(card)}`;
    if (!card.faceUp) {
        cardElement.classList.add('face-down');
    }
    
    cardElement.dataset.suit = card.suit;
    cardElement.dataset.value = card.value;
    cardElement.dataset.index = index;
    
    cardElement.innerHTML = `
        <div class="card-value">${card.value}</div>
        <div class="card-suit">${card.suit}</div>
        <div class="card-corner">
            <div>${card.value}</div>
            <div>${card.suit}</div>
        </div>
    `;
    
    return cardElement;
}

// Obtenir la couleur d'une carte (rouge ou noire)
function getCardColor(card) {
    return card.suit === '♥' || card.suit === '♦' ? 'red' : 'black';
}

// Démarrer le timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Piocher une carte du talon
function drawCard() {
    if (stock.length === 0) {
        // Si le talon est vide, remettre les cartes de la défausse dans le talon
        if (waste.length > 0) {
            stock = [...waste.reverse()];
            waste = [];
            stock.forEach(card => card.faceUp = false);
            updateStock();
            updateWaste();
            addMoveToHistory('restock');
        }
        return;
    }
    
    // Prendre les 3 cartes du dessus (ou moins s'il en reste moins)
    const cardsToDraw = Math.min(3, stock.length);
    const drawnCards = stock.splice(-cardsToDraw, cardsToDraw);
    drawnCards.forEach(card => card.faceUp = true);
    waste.push(...drawnCards);
    
    updateStock();
    updateWaste();
    addMoveToHistory('draw', { count: cardsToDraw });
}

// Sélectionner une carte
function selectCard(cardElement) {
    if (!gameStarted) return;
    
    // Si aucune carte n'est sélectionnée, sélectionner celle-ci
    if (!selectedCard) {
        // Vérifier que la carte est face visible
        if (cardElement.classList.contains('face-down')) return;
        
        selectedCard = cardElement;
        cardElement.classList.add('selected');
        return;
    }
    
    // Si la même carte est cliquée à nouveau, la désélectionner
    if (selectedCard === cardElement) {
        selectedCard.classList.remove('selected');
        selectedCard = null;
        return;
    }
    
    // Essayer de déplacer la carte sélectionnée vers la nouvelle carte/pile
    const success = tryMoveCard(selectedCard, cardElement);
    
    // Désélectionner la carte dans tous les cas
    selectedCard.classList.remove('selected');
    selectedCard = null;
    
    if (success) {
        moves++;
        movesElement.textContent = moves;
    }
}

// Essayer de déplacer une carte
function tryMoveCard(fromCardElement, toElement) {
    const fromLocation = getCardLocation(fromCardElement);
    const toLocation = getCardLocation(toElement);
    
    // Si on déplace vers une fondation
    if (toElement.classList.contains('foundation')) {
        const foundationIndex = foundations.indexOf(toElement);
        return moveToFoundation(fromCardElement, foundationIndex);
    }
    
    // Si on déplace vers une pile du tableau
    if (toElement.classList.contains('pile')) {
        const pileIndex = piles.indexOf(toElement);
        return moveToTableau(fromCardElement, pileIndex);
    }
    
    // Si on déplace vers une autre carte du tableau
    if (toElement.classList.contains('card')) {
        const toCard = getCardFromElement(toElement);
        const fromCard = getCardFromElement(fromCardElement);
        
        // Vérifier si le déplacement est valide
        if (isValidTableauMove(fromCard, toCard)) {
            const pileIndex = getPileIndexFromCard(toElement);
            return moveCardsToTableau(fromCardElement, pileIndex);
        }
    }
    
    return false;
}

// Obtenir l'emplacement d'une carte
function getCardLocation(cardElement) {
    if (wasteElement.contains(cardElement)) return 'waste';
    if (foundations.some(f => f.contains(cardElement))) return 'foundation';
    if (piles.some(p => p.contains(cardElement))) return 'tableau';
    return null;
}

// Obtenir l'index de la pile d'une carte
function getPileIndexFromCard(cardElement) {
    for (let i = 0; i < 7; i++) {
        if (piles[i].contains(cardElement)) {
            return i;
        }
    }
    return -1;
}

// Obtenir la carte à partir de son élément
function getCardFromElement(cardElement) {
    const suit = cardElement.dataset.suit;
    const value = cardElement.dataset.value;
    return { suit, value };
}

// Déplacer une carte vers une fondation
function moveToFoundation(cardElement, foundationIndex) {
    const card = getCardFromElement(cardElement);
    const currentLocation = getCardLocation(cardElement);
    
    // Vérifier si le déplacement est valide
    if (isValidFoundationMove(card, foundationIndex)) {
        // Retirer la carte de son emplacement actuel
        if (currentLocation === 'waste') {
            waste.pop();
            updateWaste();
        } else if (currentLocation === 'tableau') {
            const pileIndex = getPileIndexFromCard(cardElement);
            tableau[pileIndex].pop();
            // Retourner la carte précédente si elle est face cachée
            if (tableau[pileIndex].length > 0 && !tableau[pileIndex][tableau[pileIndex].length - 1].faceUp) {
                tableau[pileIndex][tableau[pileIndex].length - 1].faceUp = true;
            }
            updateTableau();
        }
        
        // Ajouter la carte à la fondation
        foundation[foundationIndex].push(card);
        updateFoundations();
        
        // Vérifier si le jeu est gagné
        checkWin();
        
        // Ajouter au historique
        addMoveToHistory('toFoundation', { card, foundationIndex, from: currentLocation });
        
        return true;
    }
    
    return false;
}

// Vérifier si un déplacement vers une fondation est valide
function isValidFoundationMove(card, foundationIndex) {
    const foundationPile = foundation[foundationIndex];
    
    // Si la fondation est vide, seule l'As peut être placée
    if (foundationPile.length === 0) {
        return card.value === 'A';
    }
    
    // Sinon, vérifier que la carte est de la même couleur et de valeur suivante
    const topCard = foundationPile[foundationPile.length - 1];
    return (
        card.suit === topCard.suit && 
        VALUES.indexOf(card.value) === VALUES.indexOf(topCard.value) + 1
    );
}

// Déplacer une carte vers le tableau
function moveToTableau(cardElement, pileIndex) {
    const card = getCardFromElement(cardElement);
    const currentLocation = getCardLocation(cardElement);
    
    // Vérifier si le déplacement est valide
    if (isValidTableauMoveToEmptyPile(card, pileIndex)) {
        // Retirer la carte de son emplacement actuel
        if (currentLocation === 'waste') {
            waste.pop();
            updateWaste();
        } else if (currentLocation === 'foundation') {
            const foundationIndex = foundations.findIndex(f => f.contains(cardElement));
            foundation[foundationIndex].pop();
            updateFoundations();
        } else if (currentLocation === 'tableau') {
            const fromPileIndex = getPileIndexFromCard(cardElement);
            tableau[fromPileIndex].pop();
            // Retourner la carte précédente si elle est face cachée
            if (tableau[fromPileIndex].length > 0 && !tableau[fromPileIndex][tableau[fromPileIndex].length - 1].faceUp) {
                tableau[fromPileIndex][tableau[fromPileIndex].length - 1].faceUp = true;
            }
            updateTableau();
        }
        
        // Ajouter la carte au tableau
        tableau[pileIndex].push({ ...card, faceUp: true });
        updateTableau();
        
        // Ajouter au historique
        addMoveToHistory('toTableau', { card, pileIndex, from: currentLocation });
        
        return true;
    }
    
    return false;
}

// Vérifier si un déplacement vers une pile vide est valide
function isValidTableauMoveToEmptyPile(card, pileIndex) {
    // Une pile vide ne peut accueillir qu'un roi
    return tableau[pileIndex].length === 0 && card.value === 'K';
}

// Déplacer une ou plusieurs cartes vers une autre pile du tableau
function moveCardsToTableau(fromCardElement, toPileIndex) {
    const fromPileIndex = getPileIndexFromCard(fromCardElement);
    const fromCard = getCardFromElement(fromCardElement);
    
    // Trouver l'index de la carte dans la pile
    let cardIndex = -1;
    for (let i = 0; i < tableau[fromPileIndex].length; i++) {
        const card = tableau[fromPileIndex][i];
        if (card.suit === fromCard.suit && card.value === fromCard.value && card.faceUp) {
            cardIndex = i;
            break;
        }
    }
    
    if (cardIndex === -1) return false;
    
    // Vérifier que toutes les cartes au-dessus sont face visible
    for (let i = cardIndex; i < tableau[fromPileIndex].length; i++) {
        if (!tableau[fromPileIndex][i].faceUp) return false;
    }
    
    // Déplacer les cartes
    const cardsToMove = tableau[fromPileIndex].splice(cardIndex);
    tableau[toPileIndex].push(...cardsToMove);
    
    // Retourner la carte précédente si elle est face cachée
    if (tableau[fromPileIndex].length > 0 && !tableau[fromPileIndex][tableau[fromPileIndex].length - 1].faceUp) {
        tableau[fromPileIndex][tableau[fromPileIndex].length - 1].faceUp = true;
    }
    
    updateTableau();
    
    // Ajouter au historique
    addMoveToHistory('moveInTableau', { 
        fromPileIndex, 
        toPileIndex, 
        cardIndex, 
        count: cardsToMove.length 
    });
    
    return true;
}

// Vérifier si un déplacement dans le tableau est valide
function isValidTableauMove(fromCard, toCard) {
    // Les couleurs doivent être alternées
    const fromColor = getCardColor(fromCard);
    const toColor = getCardColor(toCard);
    if (fromColor === toColor) return false;
    
    // La valeur doit être inférieure de 1
    return VALUES.indexOf(fromCard.value) === VALUES.indexOf(toCard.value) - 1;
}

// Vérifier si le jeu est gagné
function checkWin() {
    // Vérifier si toutes les fondations sont complètes
    const isWin = foundation.every(pile => pile.length === 13);
    
    if (isWin) {
        clearInterval(timerInterval);
        showWinModal();
    }
    
    return isWin;
}

// Afficher le modal de victoire
function showWinModal() {
    finalTimeElement.textContent = timeElement.textContent;
    finalMovesElement.textContent = moves;
    
    // Calculer le score (moins de mouvements et moins de temps = meilleur score)
    const score = Math.max(0, 1000 - moves - seconds);
    finalScoreElement.textContent = score;
    
    winModal.classList.add('show');
}

// Annuler le dernier mouvement
function undoMove() {
    if (moveHistory.length === 0) return;
    
    const lastMove = moveHistory.pop();
    
    switch (lastMove.type) {
        case 'draw':
            // Remettre les cartes dans le talon
            const drawnCards = waste.splice(-lastMove.details.count, lastMove.details.count);
            drawnCards.forEach(card => card.faceUp = false);
            stock.push(...drawnCards.reverse());
            updateStock();
            updateWaste();
            break;
            
        case 'restock':
            // Remettre les cartes dans la défausse
            waste = [...stock.reverse()];
            stock = [];
            waste.forEach(card => card.faceUp = true);
            updateStock();
            updateWaste();
            break;
            
        case 'toFoundation':
            // Retirer de la fondation et remettre à l'emplacement d'origine
            const foundationPile = foundation[lastMove.details.foundationIndex];
            const card = foundationPile.pop();
            
            if (lastMove.details.from === 'waste') {
                waste.push({ ...card, faceUp: true });
            } else if (lastMove.details.from === 'tableau') {
                // On ne sait pas exactement de quelle pile elle venait, donc on ne peut pas annuler ce cas
                // Pour simplifier, on la met dans la défausse
                waste.push({ ...card, faceUp: true });
            }
            
            updateFoundations();
            updateWaste();
            break;
            
        case 'toTableau':
            // Retirer de la pile et remettre à l'emplacement d'origine
            const tableauPile = tableau[lastMove.details.pileIndex];
            const tableauCard = tableauPile.pop();
            
            if (lastMove.details.from === 'waste') {
                waste.push({ ...tableauCard, faceUp: true });
            } else if (lastMove.details.from === 'foundation') {
                // On ne sait pas exactement de quelle fondation elle venait, donc on ne peut pas annuler ce cas
                // Pour simplifier, on la met dans la défausse
                waste.push({ ...tableauCard, faceUp: true });
            } else if (lastMove.details.from === 'tableau') {
                // On ne sait pas exactement de quelle pile elle venait, donc on ne peut pas annuler ce cas
                // Pour simplifier, on la met dans la défausse
                waste.push({ ...tableauCard, faceUp: true });
            }
            
            updateTableau();
            updateWaste();
            break;
            
        case 'moveInTableau':
            // Déplacer les cartes retour à leur pile d'origine
            const fromPile = tableau[lastMove.details.toPileIndex];
            const movedCards = fromPile.splice(-lastMove.details.count);
            tableau[lastMove.details.fromPileIndex].push(...movedCards);
            
            // Si la carte précédente était retournée, la remettre face cachée
            if (tableau[lastMove.details.fromPileIndex].length > lastMove.details.cardIndex + 1) {
                tableau[lastMove.details.fromPileIndex][lastMove.details.cardIndex].faceUp = false;
            }
            
            updateTableau();
            break;
    }
    
    moves--;
    movesElement.textContent = moves;
}

// Ajouter un mouvement à l'historique
function addMoveToHistory(type, details) {
    moveHistory.push({ type, details });
}

// Donner un indice
function giveHint() {
    if (!gameStarted) return;
    
    // Chercher une carte pouvant être déplacée vers une fondation
    // 1. Vérifier la défausse
    if (waste.length > 0) {
        const card = waste[waste.length - 1];
        for (let i = 0; i < 4; i++) {
            if (isValidFoundationMove(card, i)) {
                showHint(`Déplacez ${card.value}${card.suit} vers la fondation ${i+1}`);
                highlightCard(wasteElement.lastChild);
                return;
            }
        }
    }
    
    // 2. Vérifier les cartes du tableau
    for (let i = 0; i < 7; i++) {
        if (tableau[i].length > 0) {
            const card = tableau[i][tableau[i].length - 1];
            if (!card.faceUp) continue;
            
            for (let j = 0; j < 4; j++) {
                if (isValidFoundationMove(card, j)) {
                    const pileElement = piles[i];
                    showHint(`Déplacez ${card.value}${card.suit} vers la fondation ${j+1}`);
                    highlightCard(pileElement.lastChild);
                    return;
                }
            }
        }
    }
    
    // 3. Chercher un déplacement possible dans le tableau
    for (let i = 0; i < 7; i++) {
        if (tableau[i].length === 0) continue;
        
        // Trouver la première carte face visible
        let cardIndex = -1;
        for (let j = 0; j < tableau[i].length; j++) {
            if (tableau[i][j].faceUp) {
                cardIndex = j;
                break;
            }
        }
        
        if (cardIndex === -1) continue;
        
        const card = tableau[i][cardIndex];
        
        // Chercher une pile où cette carte peut être déplacée
        for (let j = 0; j < 7; j++) {
            if (i === j) continue;
            
            if (tableau[j].length > 0) {
                const topCard = tableau[j][tableau[j].length - 1];
                if (isValidTableauMove(card, topCard)) {
                    const pileElement = piles[i];
                    const cardElement = pileElement.children[cardIndex];
                    showHint(`Déplacez ${card.value}${card.suit} vers ${topCard.value}${topCard.suit}`);
                    highlightCard(cardElement);
                    return;
                }
            } else if (card.value === 'K') {
                const pileElement = piles[i];
                const cardElement = pileElement.children[cardIndex];
                showHint(`Déplacez ${card.value}${card.suit} vers une pile vide`);
                highlightCard(cardElement);
                return;
            }
        }
    }
    
    // 4. Si aucune autre option, suggérer de piocher
    if (stock.length > 0 || waste.length > 0) {
        showHint("Piochez une nouvelle carte du talon");
        highlightCard(stockElement);
        return;
    }
    
    // Si aucune suggestion n'est trouvée
    showHint("Aucun mouvement évident. Essayez de réorganiser les cartes.");
}

// Afficher un indice
function showHint(message) {
    hintDisplay.textContent = message;
    hintDisplay.classList.add('show');
    
    // Masquer après 5 secondes
    clearTimeout(hintTimeout);
    hintTimeout = setTimeout(() => {
        hintDisplay.classList.remove('show');
    }, 5000);
}

// Mettre en évidence une carte
function highlightCard(cardElement) {
    cardElement.classList.add('hint');
    
    // Arrêter la mise en évidence après 5 secondes
    setTimeout(() => {
        cardElement.classList.remove('hint');
    }, 5000);
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
    // Talon
    stockElement.addEventListener('click', drawCard);
    
    // Défausse
    wasteElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('card')) {
            selectCard(e.target);
        }
    });
    
    // Fondations
    foundations.forEach(f => {
        f.addEventListener('click', (e) => {
            if (selectedCard) {
                selectCard(f);
            } else if (f.lastChild && f.lastChild.classList.contains('card')) {
                selectCard(f.lastChild);
            }
        });
    });
    
    // Tableau
    piles.forEach(p => {
        p.addEventListener('click', (e) => {
            if (e.target.classList.contains('card')) {
                selectCard(e.target);
            } else if (selectedCard) {
                selectCard(p);
            }
        });
    });
    
    // Boutons
    newGameBtn.addEventListener('click', initGame);
    hintBtn.addEventListener('click', giveHint);
    undoBtn.addEventListener('click', undoMove);
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('show');
    });
    
    applySettingsBtn.addEventListener('click', () => {
        // Ici, vous pourriez appliquer les paramètres comme le style des cartes
        settingsPanel.classList.remove('show');
    });
    
    playAgainBtn.addEventListener('click', () => {
        winModal.classList.remove('show');
        initGame();
    });
    
    shareBtn.addEventListener('click', shareResult);
    
    // Fermer les paramètres quand on clique à l'extérieur
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
            settingsPanel.classList.remove('show');
        }
    });
}

// Partager le résultat
function shareResult() {
    const text = `J'ai gagné au Solitaire en ${timeElement.textContent} avec ${moves} mouvements!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Solitaire',
            text: text,
            url: window.location.href
        }).catch(err => {
            console.log('Erreur de partage:', err);
            fallbackShare(text);
        });
    } else {
        fallbackShare(text);
    }
}

// Alternative pour le partage
function fallbackShare(text) {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank');
}

// Démarrer le jeu
document.addEventListener('DOMContentLoaded', initGame);