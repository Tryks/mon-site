document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let totalPairs = 0;
    let moves = 0;
    let timer = null;
    let seconds = 0;
    let countdown = 180; // 3 minutes for countdown timer
    let gameStarted = false;
    let hintTimeout = null;
    
    // DOM elements
    const gameBoard = document.getElementById('game-board');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const winModal = document.getElementById('win-modal');
    const timeDisplay = document.getElementById('time');
    const movesDisplay = document.getElementById('moves');
    const scoreDisplay = document.getElementById('score');
    const finalTimeDisplay = document.getElementById('final-time');
    const finalMovesDisplay = document.getElementById('final-moves');
    const finalScoreDisplay = document.getElementById('final-score');
    
    // Audio elements
    const flipSound = document.getElementById('flip-sound');
    const matchSound = document.getElementById('match-sound');
    const winSound = document.getElementById('win-sound');
    
    // Game settings
    let difficulty = 'easy';
    let theme = 'animals';
    let cardStyle = 'classic';
    let timerType = 'count-up';
    let soundEnabled = true;
    let hintsEnabled = 'none';
    
    // Initialize the game
    init();
    
    function init() {
        // Load settings from UI
        difficulty = document.getElementById('difficulty').value;
        theme = document.getElementById('theme').value;
        cardStyle = document.getElementById('card-style').value;
        timerType = document.getElementById('timer').value;
        soundEnabled = document.getElementById('sound').value === 'on';
        hintsEnabled = document.getElementById('hints').value;
        
        // Set up event listeners
        startBtn.addEventListener('click', startGame);
        resetBtn.addEventListener('click', resetGame);
        playAgainBtn.addEventListener('click', playAgain);
        
        // Initialize the game board with back faces only
        initializeBoard();
    }
    
    function initializeBoard() {
        gameBoard.innerHTML = '';
        gameBoard.className = 'game-board';
        gameBoard.classList.add(difficulty);
        gameBoard.classList.add(`card-style-${cardStyle}`);
        
        // Determine grid size based on difficulty
        let gridSize;
        switch(difficulty) {
            case 'easy':
                gridSize = 4;
                break;
            case 'medium':
                gridSize = 6;
                break;
            case 'hard':
                gridSize = 8;
                break;
            case 'impossible':
                gridSize = 10;
                break;
            default:
                gridSize = 4;
        }
        
        totalPairs = (gridSize * gridSize) / 2;
        
        // Create card elements (just backs for now)
        for (let i = 0; i < gridSize * gridSize; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-face card-back';
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-face card-front';
            
            card.appendChild(cardBack);
            card.appendChild(cardFront);
            
            card.addEventListener('click', () => flipCard(card));
            
            gameBoard.appendChild(card);
        }
    }
    
    function startGame() {
        if (gameStarted) return;
        
        // Reset game state
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        seconds = 0;
        countdown = 180;
        gameStarted = true;
        
        // Update displays
        movesDisplay.textContent = moves;
        scoreDisplay.textContent = matchedPairs;
        
        // Start timer
        startTimer();
        
        // Generate card pairs based on theme
        generateCardPairs();
        
        // Shuffle cards
        shuffleCards();
        
        // Apply initial hints if enabled
        if (hintsEnabled === 'peek') {
            showAllCards();
            setTimeout(hideAllCards, 2000);
        } else if (hintsEnabled === 'occasional') {
            hintTimeout = setTimeout(showRandomHint, 10000);
        }
    }
    
    function generateCardPairs() {
        const gridSize = gameBoard.childElementCount;
        const pairsNeeded = gridSize / 2;
        
        // Different themes have different sets of icons/images
        let cardSet = [];
        
        switch(theme) {
            case 'animals':
                cardSet = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', 
                          '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦄',
                          '🐴', '🦓', '🐘', '🦒', '🐑', '🐫', '🦔', '🐿️', '🦃', '🦚'];
                break;
            case 'flags':
                cardSet = ['🇫🇷', '🇬🇧', '🇩🇪', '🇮🇹', '🇪🇸', '🇵🇹', '🇳🇱', '🇧🇪', '🇱🇺', '🇨🇭',
                          '🇦🇹', '🇮🇪', '🇸🇪', '🇳🇴', '🇩🇰', '🇫🇮', '🇵🇱', '🇷🇺', '🇺🇦', '🇬🇷',
                          '🇹🇷', '🇺🇸', '🇨🇦', '🇲🇽', '🇧🇷', '🇦🇷', '🇯🇵', '🇨🇳', '🇰🇷', '🇮🇳'];
                break;
            case 'emoji':
                cardSet = ['😀', '😂', '🥰', '😎', '🤩', '😋', '🤪', '😴', '🥳', '😭',
                          '🤯', '😱', '👻', '🤠', '👽', '🤖', '👾', '🐲', '🦖', '🦕',
                          '🍎', '🍕', '🎂', '🍭', '🍫', '🍿', '🍩', '🍪', '🥨', '🧀'];
                break;
            case 'landmarks':
                // For landmarks, we'll use images
                cardSet = Array.from({length: 30}, (_, i) => `landmark${i+1}.jpg`);
                break;
            case 'space':
                // For space theme, we'll use images
                cardSet = Array.from({length: 30}, (_, i) => `space${i+1}.jpg`);
                break;
        }
        
        // Select random pairs from the set
        const selectedPairs = [];
        for (let i = 0; i < pairsNeeded; i++) {
            const randomIndex = Math.floor(Math.random() * cardSet.length);
            selectedPairs.push(cardSet[randomIndex]);
            // Remove the selected item to avoid duplicates
            cardSet.splice(randomIndex, 1);
        }
        
        // Duplicate to create pairs
        const cardValues = [...selectedPairs, ...selectedPairs];
        
        // Assign values to cards
        const cardElements = Array.from(gameBoard.children);
        cardElements.forEach((card, index) => {
            const value = cardValues[index];
            cards.push({
                element: card,
                value: value,
                matched: false
            });
            
            // Set front face content
            const frontFace = card.querySelector('.card-front');
            if (theme === 'animals' || theme === 'flags' || theme === 'emoji') {
                frontFace.textContent = value;
            } else {
                // For image-based themes
                const img = document.createElement('img');
                img.src = `assets/${theme}/${value}`;
                img.alt = `Card ${index + 1}`;
                frontFace.appendChild(img);
            }
        });
    }
    
    function shuffleCards() {
        const cardElements = Array.from(gameBoard.children);
        
        // Fisher-Yates shuffle algorithm
        for (let i = cardElements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            gameBoard.appendChild(cardElements[j]);
            cardElements.splice(j, 1);
        }
    }
    
    function flipCard(cardElement) {
        if (!gameStarted) return;
        
        // Find the card in our state
        const card = cards.find(c => c.element === cardElement);
        
        // Don't allow flipping if:
        // - Card is already flipped
        // - Card is already matched
        // - There are already 2 cards flipped
        if (card.flipped || card.matched || flippedCards.length >= 2) {
            return;
        }
        
        // Flip the card
        card.flipped = true;
        cardElement.classList.add('flipped');
        
        // Play sound
        if (soundEnabled) {
            flipSound.currentTime = 0;
            flipSound.play();
        }
        
        // Add to flipped cards
        flippedCards.push(card);
        
        // If two cards are flipped, check for a match
        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            
            if (flippedCards[0].value === flippedCards[1].value) {
                // Match found
                matchFound();
            } else {
                // No match
                setTimeout(flipCardsBack, 1000);
            }
        }
    }
    
    function matchFound() {
        flippedCards[0].matched = true;
        flippedCards[1].matched = true;
        
        // Add matched class for styling
        flippedCards[0].element.classList.add('matched');
        flippedCards[1].element.classList.add('matched');
        
        // Add bounce animation
        flippedCards[0].element.classList.add('bounce');
        flippedCards[1].element.classList.add('bounce');
        
        // Play match sound
        if (soundEnabled) {
            matchSound.currentTime = 0;
            matchSound.play();
        }
        
        // Update score
        matchedPairs++;
        scoreDisplay.textContent = matchedPairs;
        
        // Clear flipped cards
        flippedCards = [];
        
        // Check for win
        if (matchedPairs === totalPairs) {
            endGame();
        }
        
        // Remove bounce animation after it completes
        setTimeout(() => {
            const matchedCards = document.querySelectorAll('.matched');
            matchedCards.forEach(card => {
                card.classList.remove('bounce');
            });
        }, 500);
    }
    
    function flipCardsBack() {
        // Shake animation for no match
        flippedCards[0].element.classList.add('shake');
        flippedCards[1].element.classList.add('shake');
        
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.flipped = false;
                card.element.classList.remove('flipped');
                card.element.classList.remove('shake');
            });
            
            flippedCards = [];
        }, 500);
    }
    
    function startTimer() {
        if (timerType === 'none') {
            timeDisplay.textContent = '--:--';
            return;
        }
        
        clearInterval(timer);
        
        if (timerType === 'count-up') {
            seconds = 0;
            updateTimeDisplay();
            timer = setInterval(() => {
                seconds++;
                updateTimeDisplay();
            }, 1000);
        } else if (timerType === 'count-down') {
            seconds = countdown;
            updateTimeDisplay();
            timer = setInterval(() => {
                seconds--;
                updateTimeDisplay();
                
                if (seconds <= 0) {
                    endGame(false);
                }
            }, 1000);
        }
    }
    
    function updateTimeDisplay() {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timeDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        // Change color when time is running out in countdown mode
        if (timerType === 'count-down' && seconds <= 30) {
            timeDisplay.style.color = 'red';
        } else {
            timeDisplay.style.color = '';
        }
    }
    
    function endGame(won = true) {
        clearInterval(timer);
        gameStarted = false;
        
        if (hintTimeout) {
            clearTimeout(hintTimeout);
            hintTimeout = null;
        }
        
        if (won) {
            // Play win sound
            if (soundEnabled) {
                winSound.currentTime = 0;
                winSound.play();
            }
            
            // Show win modal
            finalTimeDisplay.textContent = timeDisplay.textContent;
            finalMovesDisplay.textContent = moves;
            finalScoreDisplay.textContent = matchedPairs;
            
            // Calculate star rating based on performance
            const rating = calculateRating();
            
            winModal.style.display = 'flex';
        }
    }
    
    function calculateRating() {
        // Calculate rating based on moves and time
        let rating = 3;
        
        // Adjust based on difficulty
        const difficultyFactor = {
            'easy': 1,
            'medium': 1.2,
            'hard': 1.5,
            'impossible': 2
        }[difficulty];
        
        const maxMoves = totalPairs * 2;
        const moveEfficiency = moves / maxMoves;
        
        if (moveEfficiency > 1.5) rating--;
        if (moveEfficiency > 2) rating--;
        
        if (timerType !== 'none') {
            const timePerPair = seconds / totalPairs;
            if (timePerPair > 15) rating--;
            if (timePerPair > 30) rating--;
        }
        
        return Math.max(1, Math.min(5, rating));
    }
    
    function resetGame() {
        clearInterval(timer);
        if (hintTimeout) {
            clearTimeout(hintTimeout);
            hintTimeout = null;
        }
        
        gameStarted = false;
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        seconds = 0;
        
        movesDisplay.textContent = moves;
        scoreDisplay.textContent = matchedPairs;
        timeDisplay.textContent = '00:00';
        timeDisplay.style.color = '';
        
        initializeBoard();
    }
    
    function playAgain() {
        winModal.style.display = 'none';
        resetGame();
        startGame();
    }
    
    function showAllCards() {
        cards.forEach(card => {
            card.flipped = true;
            card.element.classList.add('flipped');
        });
    }
    
    function hideAllCards() {
        cards.forEach(card => {
            card.flipped = false;
            card.element.classList.remove('flipped');
        });
    }
    
    function showRandomHint() {
        if (!gameStarted || hintsEnabled !== 'occasional') return;
        
        // Find all unmatched cards
        const unmatchedCards = cards.filter(card => !card.matched && !card.flipped);
        
        if (unmatchedCards.length > 0) {
            // Pick a random unmatched card
            const randomIndex = Math.floor(Math.random() * unmatchedCards.length);
            const card = unmatchedCards[randomIndex];
            
            // Find its pair
            const pair = cards.find(c => 
                c.value === card.value && 
                c !== card && 
                !c.matched && 
                !c.flipped
            );
            
            // Flip both cards briefly
            card.flipped = true;
            card.element.classList.add('flipped');
            
            if (pair) {
                pair.flipped = true;
                pair.element.classList.add('flipped');
            }
            
            // Play hint sound if enabled
            if (soundEnabled) {
                flipSound.currentTime = 0;
                flipSound.play();
            }
            
            // Hide them after a short delay
            setTimeout(() => {
                card.flipped = false;
                card.element.classList.remove('flipped');
                
                if (pair) {
                    pair.flipped = false;
                    pair.element.classList.remove('flipped');
                }
                
                // Schedule next hint
                hintTimeout = setTimeout(showRandomHint, 15000);
            }, 1000);
        } else {
            // No unmatched cards left, try again later
            hintTimeout = setTimeout(showRandomHint, 5000);
        }
    }
    
    // Settings change handlers
    document.getElementById('difficulty').addEventListener('change', resetGame);
    document.getElementById('theme').addEventListener('change', resetGame);
    document.getElementById('card-style').addEventListener('change', function() {
        cardStyle = this.value;
        gameBoard.className = 'game-board';
        gameBoard.classList.add(difficulty);
        gameBoard.classList.add(`card-style-${cardStyle}`);
    });
    document.getElementById('timer').addEventListener('change', function() {
        timerType = this.value;
        if (gameStarted) {
            startTimer();
        }
    });
    document.getElementById('sound').addEventListener('change', function() {
        soundEnabled = this.value === 'on';
    });
    document.getElementById('hints').addEventListener('change', function() {
        hintsEnabled = this.value;
        if (hintTimeout) {
            clearTimeout(hintTimeout);
            hintTimeout = null;
        }
    });
});