document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const choices = document.querySelectorAll('.choice');
    const playerChoiceDisplay = document.querySelector('.player-choice .icon-placeholder');
    const computerChoiceDisplay = document.querySelector('.computer-choice .icon-placeholder');
    const resultMessage = document.getElementById('result-message');
    const resultExplanation = document.getElementById('result-explanation');
    const playAgainButton = document.getElementById('play-again');
    const resultDetails = document.getElementById('result-details');
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const tiesScoreElement = document.getElementById('ties-score');
    const statsContainer = document.getElementById('stats-container');
    const toggleStatsButton = document.getElementById('toggle-stats');
    const toggleSoundButton = document.getElementById('toggle-sound');
    const changeThemeButton = document.getElementById('change-theme');
    const resetStatsButton = document.getElementById('reset-stats');
    
    // Éléments de statistiques
    const totalGamesElement = document.getElementById('total-games');
    const winRateElement = document.getElementById('win-rate');
    const rockUsageElement = document.getElementById('rock-usage');
    const paperUsageElement = document.getElementById('paper-usage');
    const scissorsUsageElement = document.getElementById('scissors-usage');
    const currentStreakElement = document.getElementById('current-streak');
    
    // Sons
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const tieSound = document.getElementById('tie-sound');
    const clickSound = document.getElementById('click-sound');
    
    // Variables du jeu
    let playerScore = 0;
    let computerScore = 0;
    let tiesScore = 0;
    let gameHistory = [];
    let soundEnabled = true;
    let currentTheme = 'light';
    let currentStreak = 0;
    let choiceCounts = { rock: 0, paper: 0, scissors: 0 };
    
    // Initialisation
    loadFromLocalStorage();
    updateScoreDisplay();
    updateStatsDisplay();
    
    // Écouteurs d'événements
    choices.forEach(choice => {
        choice.addEventListener('click', () => playRound(choice.id));
    });
    
    playAgainButton.addEventListener('click', resetRound);
    toggleStatsButton.addEventListener('click', toggleStats);
    toggleSoundButton.addEventListener('click', toggleSound);
    changeThemeButton.addEventListener('click', changeTheme);
    resetStatsButton.addEventListener('click', resetStats);
    
    // Fonctions du jeu
    function playRound(playerChoice) {
        if (soundEnabled) clickSound.play();
        
        // Réinitialiser l'affichage
        resultDetails.classList.add('hidden');
        document.querySelectorAll('.battle-choice').forEach(el => el.classList.remove('winner', 'shake'));
        
        // Désactiver les choix pendant l'animation
        choices.forEach(choice => {
            choice.style.pointerEvents = 'none';
        });
        
        // Afficher le choix du joueur
        displayPlayerChoice(playerChoice);
        
        // Animation d'attente pour l'ordinateur
        computerChoiceDisplay.innerHTML = '<i class="fas fa-cog fa-spin"></i>';
        
        // Délai pour simuler le "choix" de l'ordinateur
        setTimeout(() => {
            const computerChoice = getComputerChoice();
            displayComputerChoice(computerChoice);
            
            // Déterminer le résultat
            const result = determineWinner(playerChoice, computerChoice);
            
            // Mettre à jour les scores et afficher le résultat
            updateScores(result);
            displayResult(result, playerChoice, computerChoice);
            
            // Enregistrer la partie dans l'historique
            recordGame(playerChoice, computerChoice, result);
            
            // Mettre à jour les statistiques
            updateStatsDisplay();
            
            // Réactiver les choix
            setTimeout(() => {
                choices.forEach(choice => {
                    choice.style.pointerEvents = 'auto';
                });
            }, 1000);
        }, 1000);
    }
    
    function displayPlayerChoice(choice) {
        playerChoiceDisplay.innerHTML = '';
        const icon = document.createElement('i');
        
        switch(choice) {
            case 'rock':
                icon.className = 'fa-regular fa-hand-back-fist';
                break;
            case 'paper':
                icon.className = 'fa-regular fa-hand';
                break;
            case 'scissors':
                icon.className = 'fa-regular fa-hand-scissors';
                break;
        }
        
        icon.style.fontSize = '5rem';
        icon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        playerChoiceDisplay.appendChild(icon);
        
        // Ajouter l'effet de sélection
        document.getElementById(choice).classList.add('selected');
    }
    
    function displayComputerChoice(choice) {
        computerChoiceDisplay.innerHTML = '';
        const icon = document.createElement('i');
        
        switch(choice) {
            case 'rock':
                icon.className = 'fa-regular fa-hand-back-fist';
                break;
            case 'paper':
                icon.className = 'fa-regular fa-hand';
                break;
            case 'scissors':
                icon.className = 'fa-regular fa-hand-scissors';
                break;
        }
        
        icon.style.fontSize = '5rem';
        icon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        computerChoiceDisplay.appendChild(icon);
    }
    
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }
    
    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        }
        
        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'win';
        }
        
        return 'lose';
    }
    
    function updateScores(result) {
        if (result === 'win') {
            playerScore++;
            currentStreak = currentStreak >= 0 ? currentStreak + 1 : 1;
            if (soundEnabled) winSound.play();
        } else if (result === 'lose') {
            computerScore++;
            currentStreak = currentStreak <= 0 ? currentStreak - 1 : -1;
            if (soundEnabled) loseSound.play();
        } else {
            tiesScore++;
            currentStreak = 0;
            if (soundEnabled) tieSound.play();
        }
        
        updateScoreDisplay();
    }
    
    function updateScoreDisplay() {
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;
        tiesScoreElement.textContent = tiesScore;
    }
    
    function displayResult(result, playerChoice, computerChoice) {
        let message = '';
        let explanation = '';
        
        // Ajouter des classes d'animation
        const playerElement = document.querySelector('.player-choice');
        const computerElement = document.querySelector('.computer-choice');
        
        if (result === 'win') {
            message = 'Vous avez gagné ! 🎉';
            explanation = getExplanationText(playerChoice, computerChoice, true);
            playerElement.classList.add('winner');
            computerElement.classList.add('shake');
        } else if (result === 'lose') {
            message = 'Vous avez perdu ! 😢';
            explanation = getExplanationText(playerChoice, computerChoice, false);
            computerElement.classList.add('winner');
            playerElement.classList.add('shake');
        } else {
            message = 'Égalité ! 🤝';
            explanation = `Vous avez tous les deux choisi ${getChoiceName(playerChoice)}.`;
        }
        
        resultMessage.textContent = message;
        resultExplanation.textContent = explanation;
        resultDetails.classList.remove('hidden');
        
        // Enregistrer le choix du joueur
        choiceCounts[playerChoice]++;
    }
    
    function getExplanationText(playerChoice, computerChoice, isWin) {
        const playerChoiceName = getChoiceName(playerChoice);
        const computerChoiceName = getChoiceName(computerChoice);
        
        if (isWin) {
            return `${playerChoiceName} bat ${computerChoiceName}.`;
        } else {
            return `${computerChoiceName} bat ${playerChoiceName}.`;
        }
    }
    
    function getChoiceName(choice) {
        switch(choice) {
            case 'rock': return 'la Pierre';
            case 'paper': return 'la Feuille';
            case 'scissors': return 'les Ciseaux';
            default: return '';
        }
    }
    
    function resetRound() {
        if (soundEnabled) clickSound.play();
        
        // Réinitialiser l'affichage des choix
        playerChoiceDisplay.innerHTML = '<i class="fa-solid fa-question"></i>';
        computerChoiceDisplay.innerHTML = '<i class="fa-solid fa-question"></i>';
        
        // Réinitialiser le message de résultat
        resultMessage.textContent = 'Prêt à jouer ? Choisissez une option !';
        resultDetails.classList.add('hidden');
        
        // Supprimer les classes de sélection
        choices.forEach(choice => {
            choice.classList.remove('selected');
        });
        
        document.querySelectorAll('.battle-choice').forEach(el => el.classList.remove('winner', 'shake'));
    }
    
    function recordGame(playerChoice, computerChoice, result) {
        gameHistory.push({
            playerChoice,
            computerChoice,
            result,
            timestamp: new Date().toISOString()
        });
        
        saveToLocalStorage();
    }
    
    function updateStatsDisplay() {
        const totalGames = gameHistory.length;
        const wins = gameHistory.filter(game => game.result === 'win').length;
        const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
        
        const totalChoices = choiceCounts.rock + choiceCounts.paper + choiceCounts.scissors;
        const rockUsage = totalChoices > 0 ? Math.round((choiceCounts.rock / totalChoices) * 100) : 0;
        const paperUsage = totalChoices > 0 ? Math.round((choiceCounts.paper / totalChoices) * 100) : 0;
        const scissorsUsage = totalChoices > 0 ? Math.round((choiceCounts.scissors / totalChoices) * 100) : 0;
        
        totalGamesElement.textContent = totalGames;
        winRateElement.textContent = `${winRate}%`;
        rockUsageElement.textContent = `${rockUsage}%`;
        paperUsageElement.textContent = `${paperUsage}%`;
        scissorsUsageElement.textContent = `${scissorsUsage}%`;
        currentStreakElement.textContent = currentStreak;
    }
    
    function toggleStats() {
        if (soundEnabled) clickSound.play();
        statsContainer.classList.toggle('hidden');
        toggleStatsButton.innerHTML = statsContainer.classList.contains('hidden') ? 
            '<i class="fas fa-chart-bar"></i> Statistiques' : 
            '<i class="fas fa-chart-bar"></i> Cacher stats';
    }
    
    function toggleSound() {
        soundEnabled = !soundEnabled;
        if (soundEnabled) clickSound.play();
        toggleSoundButton.innerHTML = soundEnabled ? 
            '<i class="fas fa-volume-up"></i> Son' : 
            '<i class="fas fa-volume-mute"></i> Son';
        saveToLocalStorage();
    }
    
    function changeTheme() {
        if (soundEnabled) clickSound.play();
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        changeThemeButton.innerHTML = currentTheme === 'light' ? 
            '<i class="fas fa-palette"></i> Thème clair' : 
            '<i class="fas fa-palette"></i> Thème sombre';
        saveToLocalStorage();
    }
    
    function resetStats() {
        if (soundEnabled) clickSound.play();
        if (confirm('Voulez-vous vraiment réinitialiser toutes les statistiques ?')) {
            playerScore = 0;
            computerScore = 0;
            tiesScore = 0;
            gameHistory = [];
            currentStreak = 0;
            choiceCounts = { rock: 0, paper: 0, scissors: 0 };
            
            updateScoreDisplay();
            updateStatsDisplay();
            resetRound();
            saveToLocalStorage();
        }
    }
    
    // Fonctions de stockage local
    function saveToLocalStorage() {
        const gameData = {
            playerScore,
            computerScore,
            tiesScore,
            gameHistory,
            soundEnabled,
            currentTheme,
            currentStreak,
            choiceCounts
        };
        
        localStorage.setItem('rpsGameData', JSON.stringify(gameData));
    }
    
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('rpsGameData');
        if (savedData) {
            const gameData = JSON.parse(savedData);
            
            playerScore = gameData.playerScore || 0;
            computerScore = gameData.computerScore || 0;
            tiesScore = gameData.tiesScore || 0;
            gameHistory = gameData.gameHistory || [];
            soundEnabled = gameData.soundEnabled !== undefined ? gameData.soundEnabled : true;
            currentTheme = gameData.currentTheme || 'light';
            currentStreak = gameData.currentStreak || 0;
            choiceCounts = gameData.choiceCounts || { rock: 0, paper: 0, scissors: 0 };
            
            // Appliquer le thème
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            // Mettre à jour les boutons
            toggleSoundButton.innerHTML = soundEnabled ? 
                '<i class="fas fa-volume-up"></i> Son' : 
                '<i class="fas fa-volume-mute"></i> Son';
                
            changeThemeButton.innerHTML = currentTheme === 'light' ? 
                '<i class="fas fa-palette"></i> Thème clair' : 
                '<i class="fas fa-palette"></i> Thème sombre';
        }
    }
});