document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const wordDisplay = document.getElementById('wordDisplay');
    const usedLettersDisplay = document.getElementById('usedLetters');
    const remainingAttemptsDisplay = document.getElementById('remainingAttempts');
    const keyboard = document.getElementById('keyboard');
    const newGameBtn = document.getElementById('newGameBtn');
    const changeCategoryBtn = document.getElementById('changeCategoryBtn');
    const gameOverModal = document.getElementById('gameOverModal');
    const correctWordDisplay = document.getElementById('correctWord');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const categoryModal = document.getElementById('categoryModal');
    const categoryOptions = document.getElementById('categoryOptions');
    const confirmCategoryBtn = document.getElementById('confirmCategoryBtn');
    const currentCategoryDisplay = document.getElementById('currentCategory');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const hintButton = document.getElementById('hintButton');
    const hintText = document.getElementById('hintText');
    const winsDisplay = document.getElementById('wins');
    const lossesDisplay = document.getElementById('losses');
    const winRateDisplay = document.getElementById('winRate');
    
    // Sons
    const correctSound = document.getElementById('correctSound');
    const wrongSound = document.getElementById('wrongSound');
    const winSound = document.getElementById('winSound');
    const loseSound = document.getElementById('loseSound');
    const clickSound = document.getElementById('clickSound');
    
    // Variables du jeu
    let selectedWord = '';
    let guessedLetters = [];
    let wrongAttempts = 0;
    let maxAttempts = 7;
    let gameActive = false;
    let currentCategory = 'general';
    let stats = { wins: 0, losses: 0 };
    let settings = {
        difficulty: 'medium',
        theme: 'classic',
        language: 'fr',
        hintMode: 'sometimes',
        sound: true
    };
    
    // Mots par catégorie
    const wordCategories = {
        general: {
            name: 'Général',
            words: [
                'ordinateur', 'bibliothèque', 'montagne', 'restaurant', 'aventure',
                'chocolat', 'éléphant', 'télévision', 'parapluie', 'basketball',
                'hélicoptère', 'architecture', 'photographie', 'université', 'révolution'
            ],
            hints: [
                'Une machine pour traiter des données',
                'Lieu contenant des livres',
                'Formation géologique élevée',
                'Endroit où on mange',
                'Expérience excitante et risquée',
                'Délicieuse friandise',
                'Grand mammifère avec une trompe',
                'Appareil pour regarder des programmes',
                'Objet pour se protéger de la pluie',
                'Sport avec un ballon et un panier',
                'Véhicule aérien à rotors',
                'Art de concevoir des bâtiments',
                'Art de capturer des images',
                'Institution d\'enseignement supérieur',
                'Changement radical et soudain'
            ]
        },
        animals: {
            name: 'Animaux',
            words: [
                'girafe', 'kangourou', 'crocodile', 'papillon', 'hippopotame',
                'rhinocéros', 'scorpion', 'ornithorynque', 'panda', 'chameau',
                'colibri', 'méduse', 'pangolin', 'narval', 'axolotl'
            ],
            hints: [
                'Animal avec un long cou',
                'Marsupial sauteur d\'Australie',
                'Reptile aquatique dangereux',
                'Insecte aux ailes colorées',
                'Gros mammifère africain',
                'Animal avec une ou deux cornes',
                'Arachnide venimeux avec une queue',
                'Mammifère pondeur d\'Australie',
                'Ours noir et blanc de Chine',
                'Animal du désert avec des bosses',
                'Très petit oiseau butineur',
                'Animal marin gélatineux',
                'Mammifère avec des écailles',
                'Baleine avec une longue défense',
                'Salamandre aquatique mexicaine'
            ]
        },
        countries: {
            name: 'Pays',
            words: [
                'canada', 'japon', 'brésil', 'australie', 'italie',
                'norvège', 'égypte', 'argentine', 'indonésie', 'islande',
                'madagascar', 'nouvelle-zélande', 'corée du sud', 'maroc', 'finlande'
            ],
            hints: [
                'Pays connu pour le sirop d\'érable',
                'Pays du soleil levant',
                'Pays du carnaval de Rio',
                'Pays-continent de l\'hémisphère sud',
                'Pays en forme de botte',
                'Pays des fjords et aurores boréales',
                'Pays des pyramides',
                'Pays du tango et du football',
                'Archipel de plus de 17 000 îles',
                'Pays de glace et de feu',
                'Grande île africaine',
                'Pays des kiwis et des All Blacks',
                'Pays de la K-pop et des dramas',
                'Pays nord-africain avec désert',
                'Pays des mille lacs'
            ]
        },
        science: {
            name: 'Science',
            words: [
                'gravité', 'photosynthèse', 'astronomie', 'molécule', 'électricité',
                'évolution', 'tectonique', 'neutron', 'écosystème', 'chromosome',
                'bactérie', 'algorithm', 'quantique', 'génome', 'relativité'
            ],
            hints: [
                'Force qui nous maintient au sol',
                'Processus des plantes pour créer de l\'énergie',
                'Étude des corps célestes',
                'Groupe d\'atomes liés',
                'Énergie des charges en mouvement',
                'Théorie du changement des espèces',
                'Mouvement des plaques terrestres',
                'Particule subatomique sans charge',
                'Communauté d\'organismes interactifs',
                'Structure contenant l\'ADN',
                'Micro-organisme unicellulaire',
                'Ensemble d\'instructions pour résoudre un problème',
                'Physique à très petite échelle',
                'Ensemble complet des gènes',
                'Théorie d\'Einstein sur l\'espace-temps'
            ]
        }
    };
    
    // Initialisation
    loadSettings();
    loadStats();
    createKeyboard();
    updateTheme();
    updateStatsDisplay();
    
    // Événements
    newGameBtn.addEventListener('click', startNewGame);
    changeCategoryBtn.addEventListener('click', showCategoryModal);
    playAgainBtn.addEventListener('click', startNewGame);
    confirmCategoryBtn.addEventListener('click', confirmCategory);
    settingsBtn.addEventListener('click', toggleSettingsPanel);
    saveSettingsBtn.addEventListener('click', saveSettings);
    hintButton.addEventListener('click', giveHint);
    
    // Démarrer une nouvelle partie automatiquement
    startNewGame();
    
    // Fonctions du jeu
    function startNewGame() {
        // Réinitialiser les variables du jeu
        guessedLetters = [];
        wrongAttempts = 0;
        gameActive = true;
        
        // Choisir un mot aléatoire dans la catégorie actuelle
        const category = wordCategories[currentCategory];
        const randomIndex = Math.floor(Math.random() * category.words.length);
        selectedWord = category.words[randomIndex].toUpperCase();
        
        // Mettre à jour l'affichage
        updateWordDisplay();
        updateUsedLettersDisplay();
        updateHangmanDisplay();
        remainingAttemptsDisplay.textContent = maxAttempts - wrongAttempts;
        
        // Réinitialiser le clavier
        resetKeyboard();
        
        // Cacher les modales
        gameOverModal.style.display = 'none';
        categoryModal.style.display = 'none';
        
        // Réinitialiser l'indice
        hintText.textContent = '';
        
        // Jouer le son si activé
        if (settings.sound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }
    
    function updateWordDisplay() {
        let display = '';
        let lettersToFind = 0;
        
        // Compter les lettres à trouver (en ignorant espaces et tirets)
        for (const letter of selectedWord) {
            if (letter !== ' ' && letter !== '-' && !guessedLetters.includes(letter)) {
                lettersToFind++;
            }
        }
        
        // Créer l'affichage du mot
        for (const letter of selectedWord) {
            if (guessedLetters.includes(letter)) {
                display += `<span class="letter-reveal">${letter}</span> `;
            } else if (letter === ' ' || letter === '-') {
                display += `<span class="separator">${letter}</span> `;
            } else {
                display += '_ ';
                lettersToFind++;
            }
        }
        
        wordDisplay.innerHTML = display;
        
        // Animer les nouvelles lettres trouvées
        const letterElements = wordDisplay.querySelectorAll('.letter-reveal');
        letterElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('bounce');
                setTimeout(() => el.classList.remove('bounce'), 500);
            }, index * 100);
        });
        
        // Vérifier si le joueur a gagné
        if (lettersToFind === 0) {
            gameWon();
        }
    }
    
    function updateUsedLettersDisplay() {
        usedLettersDisplay.innerHTML = '';
        const wrongLetters = guessedLetters.filter(letter => !selectedWord.includes(letter));
        
        wrongLetters.forEach(letter => {
            const span = document.createElement('span');
            span.textContent = letter;
            usedLettersDisplay.appendChild(span);
        });
    }
    
    function updateHangmanDisplay() {
        // Masquer toutes les parties du corps
        document.querySelectorAll('.scaffold, .body-part, .face').forEach(el => {
            el.style.display = 'none';
        });
        
        // Afficher l'échafaudage
        document.getElementById('base').style.display = 'block';
        document.getElementById('pole').style.display = 'block';
        document.getElementById('beam').style.display = 'block';
        document.getElementById('rope').style.display = 'block';
        
        // Afficher les parties du corps en fonction des mauvaises tentatives
        const bodyParts = [
            'head', 'body', 'left-arm', 'right-arm', 
            'left-leg', 'right-leg', 'face'
        ];
        
        for (let i = 0; i < wrongAttempts && i < bodyParts.length; i++) {
            document.getElementById(bodyParts[i]).style.display = 'block';
        }
        
        // Vérifier si le joueur a perdu
        if (wrongAttempts >= maxAttempts) {
            gameLost();
        }
    }
    
    function handleLetterClick(letter) {
        if (!gameActive || guessedLetters.includes(letter)) return;
        
        // Jouer le son si activé
        if (settings.sound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        
        guessedLetters.push(letter);
        const button = document.querySelector(`.keyboard button[data-letter="${letter}"]`);
        
        if (!selectedWord.includes(letter)) {
            wrongAttempts++;
            button.classList.add('wrong');
            button.classList.add('shake');
            
            // Jouer le son d'erreur si activé
            if (settings.sound) {
                wrongSound.currentTime = 0;
                wrongSound.play();
            }
            
            setTimeout(() => {
                button.classList.remove('shake');
            }, 500);
        } else {
            button.classList.add('correct');
            button.classList.add('bounce');
            
            // Jouer le son de réussite si activé
            if (settings.sound) {
                correctSound.currentTime = 0;
                correctSound.play();
            }
            
            setTimeout(() => {
                button.classList.remove('bounce');
            }, 500);
        }
        
        // Mettre à jour l'affichage
        updateWordDisplay();
        updateUsedLettersDisplay();
        updateHangmanDisplay();
        remainingAttemptsDisplay.textContent = maxAttempts - wrongAttempts;
    }
    
    function gameWon() {
        gameActive = false;
        stats.wins++;
        saveStats();
        updateStatsDisplay();
        
        modalTitle.textContent = 'Félicitations!';
        modalMessage.textContent = 'Vous avez trouvé le mot:';
        correctWordDisplay.textContent = selectedWord;
        
        // Jouer le son de victoire si activé
        if (settings.sound) {
            winSound.currentTime = 0;
            winSound.play();
        }
        
        gameOverModal.style.display = 'flex';
    }
    
    function gameLost() {
        gameActive = false;
        stats.losses++;
        saveStats();
        updateStatsDisplay();
        
        modalTitle.textContent = 'Partie Terminée!';
        modalMessage.textContent = 'Le mot était:';
        correctWordDisplay.textContent = selectedWord;
        
        // Jouer le son de défaite si activé
        if (settings.sound) {
            loseSound.currentTime = 0;
            loseSound.play();
        }
        
        gameOverModal.style.display = 'flex';
    }
    
    function createKeyboard() {
        keyboard.innerHTML = '';
        const letters = 'AZERTYUIOPQSDFGHJKLMWXCVBN';
        
        for (const letter of letters) {
            const button = document.createElement('button');
            button.textContent = letter;
            button.setAttribute('data-letter', letter);
            button.addEventListener('click', () => handleLetterClick(letter));
            keyboard.appendChild(button);
        }
    }
    
    function resetKeyboard() {
        const buttons = keyboard.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('correct', 'wrong');
        });
    }
    
    function showCategoryModal() {
        categoryOptions.innerHTML = '';
        
        for (const category in wordCategories) {
            const button = document.createElement('button');
            button.textContent = wordCategories[category].name;
            button.setAttribute('data-category', category);
            
            if (category === currentCategory) {
                button.classList.add('selected');
            }
            
            button.addEventListener('click', () => {
                categoryOptions.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
            });
            
            categoryOptions.appendChild(button);
        }
        
        categoryModal.style.display = 'flex';
        
        // Jouer le son si activé
        if (settings.sound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }
    
    function confirmCategory() {
        const selectedButton = categoryOptions.querySelector('.selected');
        if (selectedButton) {
            currentCategory = selectedButton.getAttribute('data-category');
            currentCategoryDisplay.textContent = wordCategories[currentCategory].name;
            startNewGame();
        }
        
        // Jouer le son si activé
        if (settings.sound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }
    
    function giveHint() {
        if (!gameActive || hintText.textContent !== '') return;
        
        // Déterminer la probabilité d'obtenir un indice basée sur les paramètres
        let hintProbability = 0;
        switch (settings.hintMode) {
            case 'none': hintProbability = 0; break;
            case 'rare': hintProbability = 0.3; break;
            case 'sometimes': hintProbability = 0.6; break;
            case 'often': hintProbability = 0.9; break;
        }
        
        if (Math.random() > hintProbability) {
            hintText.textContent = 'Pas d\'indice disponible pour le moment. Essayez encore!';
            return;
        }
        
        const category = wordCategories[currentCategory];
        const wordIndex = category.words.indexOf(selectedWord.toLowerCase());
        hintText.textContent = category.hints[wordIndex];
        
        // Appliquer une animation
        hintText.classList.add('pulse');
        setTimeout(() => {
            hintText.classList.remove('pulse');
        }, 500);
        
        // Jouer le son si activé
        if (settings.sound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }
    
    // Fonctions de paramètres
    function toggleSettingsPanel() {
        settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
        
        // Jouer le son si activé
        if (settings.sound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }
    
    function saveSettings() {
        settings.difficulty = document.getElementById('difficulty').value;
        settings.theme = document.getElementById('theme').value;
        settings.language = document.getElementById('language').value;
        settings.hintMode = document.getElementById('hintMode').value;
        settings.sound = document.getElementById('sound').checked;
        
        // Appliquer les nouveaux paramètres
        applyDifficulty();
        updateTheme();
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('hangmanSettings', JSON.stringify(settings));
        
        // Cacher le panneau des paramètres
        settingsPanel.style.display = 'none';
        
        // Jouer le son si activé
        if (settings.sound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }
    
    function loadSettings() {
        const savedSettings = localStorage.getItem('hangmanSettings');
        if (savedSettings) {
            settings = JSON.parse(savedSettings);
        }
        
        // Mettre à jour les contrôles du formulaire
        document.getElementById('difficulty').value = settings.difficulty;
        document.getElementById('theme').value = settings.theme;
        document.getElementById('language').value = settings.language;
        document.getElementById('hintMode').value = settings.hintMode;
        document.getElementById('sound').checked = settings.sound;
        
        // Appliquer les paramètres
        applyDifficulty();
    }
    
    function applyDifficulty() {
        switch (settings.difficulty) {
            case 'easy':
                maxAttempts = 10;
                break;
            case 'medium':
                maxAttempts = 7;
                break;
            case 'hard':
                maxAttempts = 5;
                break;
            case 'expert':
                maxAttempts = 3;
                break;
        }
        
        if (gameActive) {
            remainingAttemptsDisplay.textContent = maxAttempts - wrongAttempts;
        }
    }
    
    function updateTheme() {
        // Supprimer toutes les classes de thème
        document.body.classList.remove(
            'dark-theme', 'nature-theme', 'ocean-theme'
        );
        
        // Ajouter la classe du thème sélectionné
        if (settings.theme !== 'classic') {
            document.body.classList.add(`${settings.theme}-theme`);
        }
    }
    
    // Fonctions de statistiques
    function loadStats() {
        const savedStats = localStorage.getItem('hangmanStats');
        if (savedStats) {
            stats = JSON.parse(savedStats);
        }
    }
    
    function saveStats() {
        localStorage.setItem('hangmanStats', JSON.stringify(stats));
    }
    
    function updateStatsDisplay() {
        winsDisplay.textContent = stats.wins;
        lossesDisplay.textContent = stats.losses;
        
        const totalGames = stats.wins + stats.losses;
        const winRate = totalGames > 0 ? Math.round((stats.wins / totalGames) * 100) : 0;
        winRateDisplay.textContent = `${winRate}%`;
    }
    
    // Gestion du clavier physique
    document.addEventListener('keydown', function(e) {
        if (!gameActive) return;
        
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key) && !guessedLetters.includes(key)) {
            handleLetterClick(key);
        }
    });
});