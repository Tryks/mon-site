document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const welcomeModal = document.getElementById('welcome-modal');
    const handResultModal = document.getElementById('hand-result-modal');
    const tutorialModal = document.getElementById('tutorial-modal');
    const startGameBtn = document.getElementById('start-game');
    const showTutorialBtn = document.getElementById('show-tutorial');
    const closeTutorialBtn = document.getElementById('close-tutorial');
    const nextHandBtn = document.getElementById('next-hand');
    const playerNameElement = document.getElementById('player-name');
    const playerChipsElement = document.getElementById('player-chips');
    const potAmountElement = document.getElementById('pot-amount');
    const communityCardsElement = document.getElementById('community-cards');
    const playerCardsElement = document.querySelector('.player-seat-0 .player-cards');
    const actionButtons = {
        fold: document.getElementById('fold-btn'),
        check: document.getElementById('check-btn'),
        call: document.getElementById('call-btn'),
        raise: document.getElementById('raise-btn'),
        allin: document.getElementById('allin-btn')
    };
    const betSlider = document.getElementById('bet-slider');
    const betAmountDisplay = document.getElementById('bet-amount');
    const betConfirmBtn = document.getElementById('bet-confirm');
    const playerNameInput = document.getElementById('player-name-input');
    const chipAmountSelect = document.getElementById('chip-amount');
    const tableThemeSelect = document.getElementById('table-theme');
    const cardBackSelect = document.getElementById('card-back');
    const animationSpeedSelect = document.getElementById('animation-speed');
    const saveSettingsBtn = document.getElementById('save-settings');
    const resetGameBtn = document.getElementById('reset-game');
    const handsPlayedElement = document.getElementById('hands-played');
    const winRateElement = document.getElementById('win-rate');
    const biggestPotElement = document.getElementById('biggest-pot');
    const bestHandElement = document.getElementById('best-hand');
    const historyList = document.getElementById('history-list');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const handComparison = document.getElementById('hand-comparison');
    
    // Sons
    const cardSound = document.getElementById('card-sound');
    const chipSound = document.getElementById('chip-sound');
    const winSound = document.getElementById('win-sound');
    
    // État du jeu
    let gameState = {
        player: {
            name: 'Joueur',
            chips: 10000,
            bet: 0,
            cards: [],
            folded: false
        },
        opponent: {
            name: 'Adversaire',
            chips: 10000,
            bet: 0,
            cards: [],
            folded: false
        },
        pot: 0,
        communityCards: [],
        currentBet: 0,
        dealer: 0, // 0 = joueur, 1 = adversaire
        gamePhase: 'preflop', // preflop, flop, turn, river, showdown
        handHistory: [],
        stats: {
            handsPlayed: 0,
            handsWon: 0,
            biggestPot: 0,
            bestHand: null
        },
        settings: {
            startingChips: 10000,
            tableTheme: 'green',
            cardBack: 'red',
            animationSpeed: 'normal'
        }
    };
    
    // Initialisation du jeu
    function initGame() {
        // Afficher la modal de bienvenue
        welcomeModal.classList.add('active');
        
        // Charger les paramètres sauvegardés
        loadSettings();
        
        // Mettre à jour l'interface
        updateUI();
        
        // Configurer les écouteurs d'événements
        setupEventListeners();
    }
    
    // Configurer les écouteurs d'événements
    function setupEventListeners() {
        // Boutons de la modal de bienvenue
        startGameBtn.addEventListener('click', startNewHand);
        showTutorialBtn.addEventListener('click', () => {
            welcomeModal.classList.remove('active');
            tutorialModal.classList.add('active');
        });
        
        // Boutons de la modal de tutoriel
        closeTutorialBtn.addEventListener('click', () => {
            tutorialModal.classList.remove('active');
            welcomeModal.classList.add('active');
        });
        
        // Bouton de la modal de résultat
        nextHandBtn.addEventListener('click', startNewHand);
        
        // Boutons d'action
        actionButtons.fold.addEventListener('click', () => playerAction('fold'));
        actionButtons.check.addEventListener('click', () => playerAction('check'));
        actionButtons.call.addEventListener('click', () => playerAction('call'));
        actionButtons.raise.addEventListener('click', () => playerAction('raise'));
        actionButtons.allin.addEventListener('click', () => playerAction('allin'));
        
        // Contrôle de mise
        betSlider.addEventListener('input', updateBetAmount);
        betConfirmBtn.addEventListener('click', confirmBet);
        
        // Onglets
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                switchTab(tabId);
            });
        });
        
        // Paramètres
        saveSettingsBtn.addEventListener('click', saveSettings);
        resetGameBtn.addEventListener('click', resetGame);
    }
    
    // Charger les paramètres sauvegardés
    function loadSettings() {
        const savedSettings = localStorage.getItem('pokerSettings');
        if (savedSettings) {
            gameState.settings = JSON.parse(savedSettings);
            
            // Mettre à jour les contrôles avec les paramètres chargés
            playerNameInput.value = gameState.player.name;
            chipAmountSelect.value = gameState.settings.startingChips;
            tableThemeSelect.value = gameState.settings.tableTheme;
            cardBackSelect.value = gameState.settings.cardBack;
            animationSpeedSelect.value = gameState.settings.animationSpeed;
            
            // Appliquer le thème de la table
            document.querySelector('.poker-table').className = `poker-table table-${gameState.settings.tableTheme}`;
        }
    }
    
    // Sauvegarder les paramètres
    function saveSettings() {
        gameState.player.name = playerNameInput.value;
        gameState.settings = {
            startingChips: parseInt(chipAmountSelect.value),
            tableTheme: tableThemeSelect.value,
            cardBack: cardBackSelect.value,
            animationSpeed: animationSpeedSelect.value
        };
        
        localStorage.setItem('pokerSettings', JSON.stringify(gameState.settings));
        
        // Appliquer les changements
        updateUI();
        document.querySelector('.poker-table').className = `poker-table table-${gameState.settings.tableTheme}`;
        
        // Afficher un feedback
        alert('Paramètres sauvegardés avec succès!');
    }
    
    // Réinitialiser la partie
    function resetGame() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser la partie? Toutes vos statistiques seront perdues.')) {
            gameState.stats = {
                handsPlayed: 0,
                handsWon: 0,
                biggestPot: 0,
                bestHand: null
            };
            
            updateStatsUI();
            saveSettings();
        }
    }
    
    // Changer d'onglet
    function switchTab(tabId) {
        tabButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.add('active');
            }
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}-tab`) {
                content.classList.add('active');
            }
        });
    }
    
    // Commencer une nouvelle main
    function startNewHand() {
        // Fermer les modals ouvertes
        welcomeModal.classList.remove('active');
        handResultModal.classList.remove('active');
        
        // Réinitialiser l'état de la main
        gameState.player.cards = [];
        gameState.opponent.cards = [];
        gameState.communityCards = [];
        gameState.pot = 0;
        gameState.currentBet = 0;
        gameState.player.folded = false;
        gameState.opponent.folded = false;
        gameState.gamePhase = 'preflop';
        
        // Distribuer les cartes
        dealCards();
        
        // Mettre à jour l'interface
        updateUI();
    }
    
    // Distribuer les cartes
    function dealCards() {
        // Simuler un jeu de cartes
        const deck = createDeck();
        shuffleDeck(deck);
        
        // Distribuer les cartes aux joueurs
        gameState.player.cards = [deck.pop(), deck.pop()];
        gameState.opponent.cards = [deck.pop(), deck.pop()];
        
        // Distribuer les cartes communes (pour le flop, turn et river)
        gameState.communityCards = deck.slice(0, 5);
        
        // Jouer le son de distribution
        playSound(cardSound);
        
        // Afficher les cartes avec animation
        animateDeal();
    }
    
    // Créer un jeu de cartes
    function createDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];
        
        for (const suit of suits) {
            for (const value of values) {
                deck.push({
                    suit,
                    value,
                    code: `${value}${suit[0].toUpperCase()}`,
                    image: `https://deckofcardsapi.com/static/img/${value}${suit[0].toUpperCase()}.png`
                });
            }
        }
        
        return deck;
    }
    
    // Mélanger le jeu
    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    
    // Animer la distribution des cartes
    function animateDeal() {
        // Vider les éléments de carte
        playerCardsElement.innerHTML = '';
        communityCardsElement.innerHTML = '';
        
        // Distribuer les cartes du joueur
        gameState.player.cards.forEach((card, index) => {
            const cardElement = createCardElement(card);
            cardElement.style.transform = `rotate(${(index - 0.5) * 5}deg)`;
            cardElement.style.animation = `dealCard 0.5s ${index * 0.2}s forwards`;
            playerCardsElement.appendChild(cardElement);
        });
        
        // Distribuer les cartes communes (seulement après le flop)
        setTimeout(() => {
            if (gameState.gamePhase === 'preflop') {
                // Distribuer les blinds
                postBlinds();
            }
        }, 1000);
    }
    
    // Poster les blinds
    function postBlinds() {
        const smallBlind = 50;
        const bigBlind = 100;
        
        if (gameState.dealer === 0) {
            // Le joueur est le dealer, l'adversaire poste les blinds
            gameState.opponent.bet = smallBlind;
            gameState.player.bet = bigBlind;
            gameState.opponent.chips -= smallBlind;
            gameState.player.chips -= bigBlind;
        } else {
            // L'adversaire est le dealer, le joueur poste les blinds
            gameState.player.bet = smallBlind;
            gameState.opponent.bet = bigBlind;
            gameState.player.chips -= smallBlind;
            gameState.opponent.chips -= bigBlind;
        }
        
        gameState.currentBet = bigBlind;
        gameState.pot = smallBlind + bigBlind;
        
        // Jouer le son de jetons
        playSound(chipSound);
        
        // Mettre à jour l'interface
        updateUI();
        
        // Si c'est au tour du joueur, activer les boutons d'action
        if (gameState.dealer === 1) {
            enableActionButtons();
        } else {
            // Sinon, l'IA joue
            setTimeout(opponentAction, 1500);
        }
    }
    
    // Créer un élément carte
    function createCardElement(card, isHidden = false) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        if (isHidden) {
            cardElement.classList.add('card-back');
        } else {
            cardElement.style.backgroundImage = `url(${card.image})`;
        }
        
        return cardElement;
    }
    
    // Mettre à jour l'interface
    function updateUI() {
        // Mettre à jour les informations du joueur
        playerNameElement.textContent = gameState.player.name;
        playerChipsElement.textContent = gameState.player.chips.toLocaleString();
        
        // Mettre à jour le pot
        potAmountElement.textContent = gameState.pot.toLocaleString();
        
        // Mettre à jour le slider de mise
        updateBetSlider();
        
        // Mettre à jour les statistiques
        updateStatsUI();
    }
    
    // Mettre à jour le slider de mise
    function updateBetSlider() {
        const minBet = Math.max(gameState.currentBet - gameState.player.bet, 0);
        const maxBet = gameState.player.chips;
        
        betSlider.min = minBet;
        betSlider.max = maxBet;
        betSlider.value = Math.min(Math.max(minBet, 500), maxBet);
        
        updateBetAmount();
    }
    
    // Mettre à jour l'affichage du montant de la mise
    function updateBetAmount() {
        betAmountDisplay.textContent = betSlider.value;
    }
    
    // Confirmer la mise
    function confirmBet() {
        const betAmount = parseInt(betSlider.value);
        playerAction('raise', betAmount);
    }
    
    // Action du joueur
    function playerAction(action, amount = 0) {
        disableActionButtons();
        
        switch (action) {
            case 'fold':
                gameState.player.folded = true;
                endHand('fold');
                break;
                
            case 'check':
                // Vérifier que le check est possible
                if (gameState.player.bet < gameState.currentBet) {
                    console.error("Cannot check when there's a bet to call");
                    enableActionButtons();
                    return;
                }
                proceedToNextPhase();
                break;
                
            case 'call':
                const callAmount = gameState.currentBet - gameState.player.bet;
                if (callAmount > gameState.player.chips) {
                    // All-in si pas assez de jetons
                    gameState.player.bet += gameState.player.chips;
                    gameState.pot += gameState.player.chips;
                    gameState.player.chips = 0;
                } else {
                    gameState.player.bet += callAmount;
                    gameState.pot += callAmount;
                    gameState.player.chips -= callAmount;
                }
                playSound(chipSound);
                proceedToNextPhase();
                break;
                
            case 'raise':
                const raiseAmount = amount || (gameState.currentBet * 2);
                const totalBet = gameState.player.bet + raiseAmount;
                
                if (totalBet > gameState.player.chips + gameState.player.bet) {
                    // All-in si pas assez de jetons
                    gameState.pot += gameState.player.chips;
                    gameState.player.bet += gameState.player.chips;
                    gameState.player.chips = 0;
                } else {
                    gameState.pot += raiseAmount;
                    gameState.player.bet += raiseAmount;
                    gameState.player.chips -= raiseAmount;
                    gameState.currentBet = gameState.player.bet;
                }
                playSound(chipSound);
                setTimeout(opponentAction, 1500);
                break;
                
            case 'allin':
                gameState.pot += gameState.player.chips;
                gameState.player.bet += gameState.player.chips;
                gameState.currentBet = Math.max(gameState.currentBet, gameState.player.bet);
                gameState.player.chips = 0;
                playSound(chipSound);
                setTimeout(opponentAction, 1500);
                break;
        }
        
        updateUI();
    }
    
    // Action de l'adversaire (IA)
    function opponentAction() {
        // Logique simple de l'IA
        let action;
        const callAmount = gameState.currentBet - gameState.opponent.bet;
        const potOdds = callAmount / (callAmount + gameState.pot);
        const handStrength = evaluateHandStrength();
        
        if (gameState.player.folded) {
            return; // Le joueur a déjà passé, pas besoin d'agir
        }
        
        if (callAmount === 0) {
            // Pas de mise à suivre, l'IA peut checker ou miser
            if (Math.random() < handStrength * 0.7) {
                // Miser avec une main forte
                const betSize = Math.min(
                    Math.floor(gameState.pot * (0.5 + Math.random() * 0.5)),
                    gameState.opponent.chips
                );
                gameState.opponent.bet += betSize;
                gameState.pot += betSize;
                gameState.opponent.chips -= betSize;
                gameState.currentBet = gameState.opponent.bet;
                action = `mise ${betSize}`;
            } else {
                // Checker
                action = 'check';
            }
        } else {
            // Il y a une mise à suivre
            if (handStrength > potOdds * 1.3 || Math.random() < 0.1) {
                // Suivre ou relancer avec une main forte
                if (handStrength > 0.8 && Math.random() < 0.5 && gameState.opponent.chips > callAmount * 2) {
                    // Relancer
                    const raiseAmount = Math.min(
                        callAmount * 2 + Math.floor(Math.random() * gameState.pot),
                        gameState.opponent.chips
                    );
                    gameState.opponent.bet += raiseAmount;
                    gameState.pot += raiseAmount;
                    gameState.opponent.chips -= raiseAmount;
                    gameState.currentBet = gameState.opponent.bet;
                    action = `relance ${raiseAmount}`;
                } else {
                    // Suivre
                    gameState.opponent.bet += callAmount;
                    gameState.pot += callAmount;
                    gameState.opponent.chips -= callAmount;
                    action = `suit ${callAmount}`;
                }
            } else if (Math.random() < 0.2 && callAmount < gameState.opponent.chips * 0.3) {
                // Suivre parfois même avec une main faible
                gameState.opponent.bet += callAmount;
                gameState.pot += callAmount;
                gameState.opponent.chips -= callAmount;
                action = `suit ${callAmount}`;
            } else {
                // Se coucher
                gameState.opponent.folded = true;
                action = 'se couche';
                endHand('fold');
                return;
            }
        }
        
        // Ajouter à l'historique
        addToHistory(`Adversaire: ${action}`);
        
        // Mettre à jour l'interface
        updateUI();
        
        // Si l'IA a juste suivi ou checké, passer à la phase suivante
        if (action.includes('suit') || action === 'check') {
            proceedToNextPhase();
        } else {
            // Sinon, c'est au tour du joueur de répondre
            enableActionButtons();
        }
    }
    
    // Évaluer la force de la main de l'IA
    function evaluateHandStrength() {
        // Simplification: évaluer en fonction de la phase de jeu et de la main
        let strength = Math.random() * 0.3; // Base aléatoire
        
        // Ajouter de la force basée sur les cartes privées
        const privateCards = gameState.opponent.cards;
        const highCards = privateCards.filter(card => 
            ['10', 'J', 'Q', 'K', 'A'].includes(card.value)
        ).length;
        
        strength += highCards * 0.15;
        
        // Ajouter de la force si paire privée
        if (privateCards[0].value === privateCards[1].value) {
            strength += 0.3;
        }
        
        // Ajouter de la force si couleurs assorties
        if (privateCards[0].suit === privateCards[1].suit) {
            strength += 0.1;
        }
        
        // En phase avancée, considérer les cartes communes
        if (gameState.gamePhase !== 'preflop') {
            strength += Math.random() * 0.4;
        }
        
        return Math.min(strength, 0.95); // Limiter la force maximale
    }
    
    // Passer à la phase suivante du jeu
    function proceedToNextPhase() {
        switch (gameState.gamePhase) {
            case 'preflop':
                gameState.gamePhase = 'flop';
                revealCommunityCards(3);
                break;
                
            case 'flop':
                gameState.gamePhase = 'turn';
                revealCommunityCards(1);
                break;
                
            case 'turn':
                gameState.gamePhase = 'river';
                revealCommunityCards(1);
                break;
                
            case 'river':
                gameState.gamePhase = 'showdown';
                endHand('showdown');
                break;
        }
        
        // Réinitialiser les mises pour la nouvelle phase
        gameState.player.bet = 0;
        gameState.opponent.bet = 0;
        gameState.currentBet = 0;
        
        // Déterminer qui parle en premier
        if (gameState.gamePhase !== 'showdown') {
            if (gameState.dealer === 0) {
                // Le joueur est le dealer, l'adversaire parle en premier
                setTimeout(opponentAction, 1500);
            } else {
                // L'adversaire est le dealer, le joueur parle en premier
                enableActionButtons();
            }
        }
        
        updateUI();
    }
    
    // Révéler les cartes communes
    function revealCommunityCards(count) {
        playSound(cardSound);
        
        // Calculer combien de cartes sont déjà révélées
        const revealedCount = document.querySelectorAll('#community-cards .card:not(.card-back)').length;
        
        // Révéler les nouvelles cartes avec animation
        for (let i = 0; i < count; i++) {
            const cardIndex = revealedCount + i;
            if (cardIndex >= gameState.communityCards.length) break;
            
            const card = gameState.communityCards[cardIndex];
            const cardElement = createCardElement(card);
            cardElement.style.animation = `dealCard 0.5s ${i * 0.2}s forwards`;
            
            // Si c'est la première fois qu'on révèle des cartes, créer le conteneur
            if (cardIndex === 0) {
                communityCardsElement.innerHTML = '';
            }
            
            communityCardsElement.appendChild(cardElement);
        }
    }
    
    // Terminer la main
    function endHand(reason) {
        gameState.stats.handsPlayed++;
        
        // Déterminer le gagnant
        let winner = null;
        let winningHand = null;
        
        if (reason === 'fold') {
            if (gameState.player.folded) {
                winner = 'opponent';
                addToHistory('Vous avez abandonné. Adversaire gagne.');
            } else {
                winner = 'player';
                addToHistory('Adversaire a abandonné. Vous gagnez!');
                gameState.stats.handsWon++;
            }
        } else {
            // Showdown - comparer les mains
            const playerHand = evaluatePlayerHand();
            const opponentHand = evaluateOpponentHand();
            
            // Ajouter à l'historique des mains
            addToHistory(`Votre main: ${playerHand.name}`);
            addToHistory(`Main adverse: ${opponentHand.name}`);
            
            if (playerHand.rank > opponentHand.rank) {
                winner = 'player';
                resultMessage.textContent = `Vous gagnez avec ${playerHand.name}!`;
                gameState.stats.handsWon++;
                
                // Mettre à jour la meilleure main si nécessaire
                if (!gameState.stats.bestHand || playerHand.rank > gameState.stats.bestHand.rank) {
                    gameState.stats.bestHand = playerHand;
                    bestHandElement.textContent = playerHand.name;
                }
            } else if (opponentHand.rank > playerHand.rank) {
                winner = 'opponent';
                resultMessage.textContent = `Adversaire gagne avec ${opponentHand.name}.`;
            } else {
                // Égalité - comparer les kickers
                const kickerComparison = compareKickers(playerHand, opponentHand);
                if (kickerComparison > 0) {
                    winner = 'player';
                    resultMessage.textContent = `Vous gagnez avec ${playerHand.name} (meilleurs kickers)!`;
                    gameState.stats.handsWon++;
                } else if (kickerComparison < 0) {
                    winner = 'opponent';
                    resultMessage.textContent = `Adversaire gagne avec ${opponentHand.name} (meilleurs kickers).`;
                } else {
                    winner = 'split';
                    resultMessage.textContent = `Égalité! Le pot est partagé.`;
                    gameState.stats.handsWon += 0.5;
                }
            }
            
            // Afficher la comparaison des mains
            showHandComparison(playerHand, opponentHand);
        }
        
        // Distribuer le pot
        if (winner === 'player') {
            gameState.player.chips += gameState.pot;
            playSound(winSound);
            resultTitle.textContent = 'Vous avez gagné!';
        } else if (winner === 'opponent') {
            gameState.opponent.chips += gameState.pot;
            resultTitle.textContent = 'Vous avez perdu';
        } else {
            // Split pot
            const halfPot = Math.floor(gameState.pot / 2);
            gameState.player.chips += halfPot;
            gameState.opponent.chips += halfPot;
            resultTitle.textContent = 'Égalité';
        }
        
        // Mettre à jour le plus gros pot si nécessaire
        if (gameState.pot > gameState.stats.biggestPot) {
            gameState.stats.biggestPot = gameState.pot;
            biggestPotElement.textContent = gameState.pot.toLocaleString();
        }
        
        // Mettre à jour les statistiques
        updateStatsUI();
        
        // Changer le dealer pour la prochaine main
        gameState.dealer = 1 - gameState.dealer;
        
        // Afficher le résultat
        handResultModal.classList.add('active');
    }
    
    // Évaluer la main du joueur
    function evaluatePlayerHand() {
        const allCards = [...gameState.player.cards, ...gameState.communityCards];
        return evaluateHand(allCards);
    }
    
    // Évaluer la main de l'adversaire
    function evaluateOpponentHand() {
        const allCards = [...gameState.opponent.cards, ...gameState.communityCards];
        return evaluateHand(allCards);
    }
    
    // Évaluer une main de poker
    function evaluateHand(cards) {
        // Convertir les valeurs des cartes en nombres
        const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        // Trier les cartes par valeur
        cards.sort((a, b) => valueOrder.indexOf(b.value) - valueOrder.indexOf(a.value));
        
        // Vérifier les combinaisons dans l'ordre décroissant de valeur
        if (isRoyalFlush(cards)) return { rank: 10, name: 'Quinte flush royale', cards: cards.slice(0, 5) };
        const straightFlush = isStraightFlush(cards);
        if (straightFlush) return { rank: 9, name: `Quinte flush (${straightFlush.highCard})`, cards: straightFlush.cards };
        const fourOfAKind = isFourOfAKind(cards);
        if (fourOfAKind) return { rank: 8, name: `Carré de ${fourOfAKind.value}s`, cards: fourOfAKind.cards };
        const fullHouse = isFullHouse(cards);
        if (fullHouse) return { rank: 7, name: `Full aux ${fullHouse.threeValue}s par les ${fullHouse.pairValue}s`, cards: fullHouse.cards };
        const flush = isFlush(cards);
        if (flush) return { rank: 6, name: `Couleur (${flush.suit}, hauteur ${flush.highCard})`, cards: flush.cards };
        const straight = isStraight(cards);
        if (straight) return { rank: 5, name: `Quinte (${straight.highCard})`, cards: straight.cards };
        const threeOfAKind = isThreeOfAKind(cards);
        if (threeOfAKind) return { rank: 4, name: `Brelan de ${threeOfAKind.value}s`, cards: threeOfAKind.cards };
        const twoPair = isTwoPair(cards);
        if (twoPair) return { rank: 3, name: `Double paire (${twoPair.pair1Value}s et ${twoPair.pair2Value}s)`, cards: twoPair.cards };
        const pair = isPair(cards);
        if (pair) return { rank: 2, name: `Paire de ${pair.value}s`, cards: pair.cards };
        
        // Carte haute
        return { rank: 1, name: `Carte haute (${cards[0].value})`, cards: cards.slice(0, 5) };
    }
    
    // Vérifier une quinte flush royale
    function isRoyalFlush(cards) {
        const royalValues = ['A', 'K', 'Q', 'J', '10'];
        const suits = {};
        
        for (const card of cards) {
            if (royalValues.includes(card.value)) {
                if (!suits[card.suit]) suits[card.suit] = 0;
                suits[card.suit]++;
                
                if (suits[card.suit] === 5) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // Vérifier une quinte flush
    function isStraightFlush(cards) {
        // Regrouper les cartes par couleur
        const suits = {};
        for (const card of cards) {
            if (!suits[card.suit]) suits[card.suit] = [];
            suits[card.suit].push(card);
        }
        
        // Vérifier chaque couleur pour une quinte
        for (const suit in suits) {
            if (suits[suit].length >= 5) {
                const straight = isStraight(suits[suit]);
                if (straight) {
                    return {
                        highCard: straight.highCard,
                        cards: straight.cards
                    };
                }
            }
        }
        
        return null;
    }
    
    // Vérifier un carré
    function isFourOfAKind(cards) {
        const valueCounts = {};
        for (const card of cards) {
            if (!valueCounts[card.value]) valueCounts[card.value] = 0;
            valueCounts[card.value]++;
            
            if (valueCounts[card.value] === 4) {
                const fourCards = cards.filter(c => c.value === card.value);
                const kicker = cards.find(c => c.value !== card.value);
                return {
                    value: card.value,
                    cards: [...fourCards, kicker].slice(0, 5)
                };
            }
        }
        
        return null;
    }
    
    // Vérifier un full
    function isFullHouse(cards) {
        const valueCounts = {};
        for (const card of cards) {
            if (!valueCounts[card.value]) valueCounts[card.value] = 0;
            valueCounts[card.value]++;
        }
        
        const values = Object.keys(valueCounts);
        let threeValue = null;
        let pairValue = null;
        
        // Trouver un brelan
        for (const value of values) {
            if (valueCounts[value] >= 3) {
                if (!threeValue || compareCardValues(value, threeValue) > 0) {
                    threeValue = value;
                }
            }
        }
        
        if (!threeValue) return null;
        
        // Trouver une paire (peut être la même valeur si on a 4 cartes)
        for (const value of values) {
            if (value !== threeValue && valueCounts[value] >= 2) {
                if (!pairValue || compareCardValues(value, pairValue) > 0) {
                    pairValue = value;
                }
            }
        }
        
        // Vérifier si on a un full avec 4 cartes de même valeur
        if (!pairValue && valueCounts[threeValue] >= 4) {
            // Prendre une autre valeur comme paire
            for (const value of values) {
                if (value !== threeValue && valueCounts[value] >= 1) {
                    pairValue = value;
                    break;
                }
            }
        }
        
        if (!pairValue) return null;
        
        // Construire la main
        const threeCards = cards.filter(c => c.value === threeValue).slice(0, 3);
        const pairCards = cards.filter(c => c.value === pairValue).slice(0, 2);
        
        return {
            threeValue,
            pairValue,
            cards: [...threeCards, ...pairCards]
        };
    }
    
    // Vérifier une couleur
    function isFlush(cards) {
        const suitCounts = {};
        for (const card of cards) {
            if (!suitCounts[card.suit]) suitCounts[card.suit] = [];
            suitCounts[card.suit].push(card);
            
            if (suitCounts[card.suit].length === 5) {
                return {
                    suit: card.suit,
                    highCard: suitCounts[card.suit][0].value,
                    cards: suitCounts[card.suit].slice(0, 5)
                };
            }
        }
        
        return null;
    }
    
    // Vérifier une quinte
    function isStraight(cards) {
        const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const uniqueValues = [...new Set(cards.map(card => card.value))];
        uniqueValues.sort((a, b) => valueOrder.indexOf(b) - valueOrder.indexOf(a));
        
        // Vérifier les quintes normales
        for (let i = 0; i <= uniqueValues.length - 5; i++) {
            let isStraight = true;
            for (let j = 1; j < 5; j++) {
                const currentIdx = valueOrder.indexOf(uniqueValues[i + j]);
                const prevIdx = valueOrder.indexOf(uniqueValues[i + j - 1]);
                if (prevIdx - currentIdx !== 1) {
                    isStraight = false;
                    break;
                }
            }
            
            if (isStraight) {
                const straightCards = [];
                for (let j = 0; j < 5; j++) {
                    const card = cards.find(c => c.value === uniqueValues[i + j]);
                    straightCards.push(card);
                }
                return {
                    highCard: uniqueValues[i],
                    cards: straightCards
                };
            }
        }
        
        // Vérifier la quinte 5-4-3-2-A
        if (uniqueValues.includes('A') && uniqueValues.includes('5') && uniqueValues.includes('4') && 
            uniqueValues.includes('3') && uniqueValues.includes('2')) {
            const straightCards = [
                cards.find(c => c.value === '5'),
                cards.find(c => c.value === '4'),
                cards.find(c => c.value === '3'),
                cards.find(c => c.value === '2'),
                cards.find(c => c.value === 'A')
            ];
            return {
                highCard: '5',
                cards: straightCards
            };
        }
        
        return null;
    }
    
    // Vérifier un brelan
    function isThreeOfAKind(cards) {
        const valueCounts = {};
        for (const card of cards) {
            if (!valueCounts[card.value]) valueCounts[card.value] = 0;
            valueCounts[card.value]++;
            
            if (valueCounts[card.value] === 3) {
                const threeCards = cards.filter(c => c.value === card.value);
                const kickers = cards.filter(c => c.value !== card.value).slice(0, 2);
                return {
                    value: card.value,
                    cards: [...threeCards, ...kickers]
                };
            }
        }
        
        return null;
    }
    
    // Vérifier une double paire
    function isTwoPair(cards) {
        const valueCounts = {};
        for (const card of cards) {
            if (!valueCounts[card.value]) valueCounts[card.value] = 0;
            valueCounts[card.value]++;
        }
        
        const pairs = [];
        for (const value in valueCounts) {
            if (valueCounts[value] >= 2) {
                pairs.push(value);
            }
        }
        
        if (pairs.length >= 2) {
            // Trier les paires par valeur
            pairs.sort((a, b) => compareCardValues(b, a));
            
            const pair1Cards = cards.filter(c => c.value === pairs[0]).slice(0, 2);
            const pair2Cards = cards.filter(c => c.value === pairs[1]).slice(0, 2);
            const kicker = cards.find(c => c.value !== pairs[0] && c.value !== pairs[1]);
            
            return {
                pair1Value: pairs[0],
                pair2Value: pairs[1],
                cards: [...pair1Cards, ...pair2Cards, kicker]
            };
        }
        
        return null;
    }
    
    // Vérifier une paire
    function isPair(cards) {
        const valueCounts = {};
        for (const card of cards) {
            if (!valueCounts[card.value]) valueCounts[card.value] = 0;
            valueCounts[card.value]++;
            
            if (valueCounts[card.value] === 2) {
                const pairCards = cards.filter(c => c.value === card.value);
                const kickers = cards.filter(c => c.value !== card.value).slice(0, 3);
                return {
                    value: card.value,
                    cards: [...pairCards, ...kickers]
                };
            }
        }
        
        return null;
    }
    
    // Comparer les valeurs des cartes
    function compareCardValues(a, b) {
        const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        return valueOrder.indexOf(a) - valueOrder.indexOf(b);
    }
    
    // Comparer les kickers
    function compareKickers(hand1, hand2) {
        // Pour les mains de même rang, comparer les cartes une à une
        const cards1 = hand1.cards;
        const cards2 = hand2.cards;
        const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        for (let i = 0; i < Math.min(cards1.length, cards2.length); i++) {
            const val1 = cards1[i]?.value;
            const val2 = cards2[i]?.value;
            
            if (!val1 || !val2) return 0;
            
            const cmp = valueOrder.indexOf(val2) - valueOrder.indexOf(val1);
            if (cmp !== 0) return cmp;
        }
        
        return 0;
    }
    
    // Afficher la comparaison des mains
    function showHandComparison(playerHand, opponentHand) {
        handComparison.innerHTML = '';
        
        // Afficher la main du joueur
        const playerHandDiv = document.createElement('div');
        playerHandDiv.className = 'hand-display';
        const playerLabel = document.createElement('h3');
        playerLabel.textContent = 'Votre main';
        playerHandDiv.appendChild(playerLabel);
        
        playerHand.cards.forEach(card => {
            const cardElement = createCardElement(card);
            playerHandDiv.appendChild(cardElement);
        });
        
        const playerHandName = document.createElement('p');
        playerHandName.textContent = playerHand.name;
        playerHandName.className = 'hand-name';
        playerHandDiv.appendChild(playerHandName);
        
        handComparison.appendChild(playerHandDiv);
        
        // Afficher la main de l'adversaire
        const opponentHandDiv = document.createElement('div');
        opponentHandDiv.className = 'hand-display';
        const opponentLabel = document.createElement('h3');
        opponentLabel.textContent = 'Main adverse';
        opponentHandDiv.appendChild(opponentLabel);
        
        opponentHand.cards.forEach(card => {
            const cardElement = createCardElement(card);
            opponentHandDiv.appendChild(cardElement);
        });
        
        const opponentHandName = document.createElement('p');
        opponentHandName.textContent = opponentHand.name;
        opponentHandName.className = 'hand-name';
        opponentHandDiv.appendChild(opponentHandName);
        
        handComparison.appendChild(opponentHandDiv);
    }
    
    // Activer les boutons d'action
    function enableActionButtons() {
        // Désactiver tous les boutons d'abord
        disableActionButtons();
        
        // Activer les boutons appropriés en fonction de la situation
        const canCheck = gameState.player.bet >= gameState.currentBet;
        
        if (canCheck) {
            actionButtons.check.disabled = false;
        } else {
            actionButtons.call.disabled = false;
            actionButtons.call.textContent = `Suivre (${gameState.currentBet - gameState.player.bet})`;
        }
        
        actionButtons.fold.disabled = false;
        actionButtons.raise.disabled = false;
        actionButtons.allin.disabled = false;
        
        // Mettre à jour le slider de mise
        updateBetSlider();
    }
    
    // Désactiver les boutons d'action
    function disableActionButtons() {
        Object.values(actionButtons).forEach(button => {
            button.disabled = true;
        });
    }
    
    // Ajouter une entrée à l'historique
    function addToHistory(message) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const entry = document.createElement('li');
        entry.textContent = `[${timeString}] ${message}`;
        historyList.appendChild(entry);
        historyList.scrollTop = historyList.scrollHeight;
    }
    
    // Mettre à jour les statistiques dans l'interface
    function updateStatsUI() {
        handsPlayedElement.textContent = gameState.stats.handsPlayed;
        
        const winRate = gameState.stats.handsPlayed > 0 
            ? Math.round((gameState.stats.handsWon / gameState.stats.handsPlayed) * 100)
            : 0;
        winRateElement.textContent = `${winRate}%`;
        
        biggestPotElement.textContent = gameState.stats.biggestPot.toLocaleString();
        
        if (gameState.stats.bestHand) {
            bestHandElement.textContent = gameState.stats.bestHand.name;
        }
    }
    
    // Jouer un son
    function playSound(audioElement) {
        if (gameState.settings.animationSpeed !== 'fast') {
            audioElement.currentTime = 0;
            audioElement.play().catch(e => console.log("Audio play prevented:", e));
        }
    }
    
    // Démarrer le jeu
    initGame();
});