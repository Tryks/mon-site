// Données des pays et leurs drapeaux
const countries = [
    { name: "Afghanistan", code: "AF", region: "asia" },
    { name: "Albanie", code: "AL", region: "europe" },
    { name: "Algérie", code: "DZ", region: "africa" },
    { name: "Allemagne", code: "DE", region: "europe" },
    { name: "Andorre", code: "AD", region: "europe" },
    { name: "Angola", code: "AO", region: "africa" },
    { name: "Antigua-et-Barbuda", code: "AG", region: "americas" },
    { name: "Arabie saoudite", code: "SA", region: "asia" },
    { name: "Argentine", code: "AR", region: "americas" },
    { name: "Arménie", code: "AM", region: "asia" },
    { name: "Australie", code: "AU", region: "oceania" },
    { name: "Autriche", code: "AT", region: "europe" },
    { name: "Azerbaïdjan", code: "AZ", region: "asia" },
    { name: "Bahamas", code: "BS", region: "americas" },
    { name: "Bahreïn", code: "BH", region: "asia" },
    { name: "Bangladesh", code: "BD", region: "asia" },
    { name: "Barbade", code: "BB", region: "americas" },
    { name: "Belgique", code: "BE", region: "europe" },
    { name: "Belize", code: "BZ", region: "americas" },
    { name: "Bénin", code: "BJ", region: "africa" },
    { name: "Bhoutan", code: "BT", region: "asia" },
    { name: "Biélorussie", code: "BY", region: "europe" },
    { name: "Birmanie", code: "MM", region: "asia" },
    { name: "Bolivie", code: "BO", region: "americas" },
    { name: "Bosnie-Herzégovine", code: "BA", region: "europe" },
    { name: "Botswana", code: "BW", region: "africa" },
    { name: "Brésil", code: "BR", region: "americas" },
    { name: "Brunei", code: "BN", region: "asia" },
    { name: "Bulgarie", code: "BG", region: "europe" },
    { name: "Burkina Faso", code: "BF", region: "africa" },
    { name: "Burundi", code: "BI", region: "africa" },
    { name: "Cambodge", code: "KH", region: "asia" },
    { name: "Cameroun", code: "CM", region: "africa" },
    { name: "Canada", code: "CA", region: "americas" },
    { name: "Cap-Vert", code: "CV", region: "africa" },
    { name: "Chili", code: "CL", region: "americas" },
    { name: "Chine", code: "CN", region: "asia" },
    { name: "Chypre", code: "CY", region: "europe" },
    { name: "Colombie", code: "CO", region: "americas" },
    { name: "Comores", code: "KM", region: "africa" },
    { name: "Congo", code: "CG", region: "africa" },
    { name: "Corée du Nord", code: "KP", region: "asia" },
    { name: "Corée du Sud", code: "KR", region: "asia" },
    { name: "Costa Rica", code: "CR", region: "americas" },
    { name: "Côte d'Ivoire", code: "CI", region: "africa" },
    { name: "Croatie", code: "HR", region: "europe" },
    { name: "Cuba", code: "CU", region: "americas" },
    { name: "Danemark", code: "DK", region: "europe" },
    { name: "Djibouti", code: "DJ", region: "africa" },
    { name: "Dominique", code: "DM", region: "americas" },
    { name: "Égypte", code: "EG", region: "africa" },
    { name: "Émirats arabes unis", code: "AE", region: "asia" },
    { name: "Équateur", code: "EC", region: "americas" },
    { name: "Érythrée", code: "ER", region: "africa" },
    { name: "Espagne", code: "ES", region: "europe" },
    { name: "Estonie", code: "EE", region: "europe" },
    { name: "Eswatini", code: "SZ", region: "africa" },
    { name: "États-Unis", code: "US", region: "americas" },
    { name: "Éthiopie", code: "ET", region: "africa" },
    { name: "Fidji", code: "FJ", region: "oceania" },
    { name: "Finlande", code: "FI", region: "europe" },
    { name: "France", code: "FR", region: "europe" },
    { name: "Gabon", code: "GA", region: "africa" },
    { name: "Gambie", code: "GM", region: "africa" },
    { name: "Géorgie", code: "GE", region: "asia" },
    { name: "Ghana", code: "GH", region: "africa" },
    { name: "Grèce", code: "GR", region: "europe" },
    { name: "Grenade", code: "GD", region: "americas" },
    { name: "Guatemala", code: "GT", region: "americas" },
    { name: "Guinée", code: "GN", region: "africa" },
    { name: "Guinée équatoriale", code: "GQ", region: "africa" },
    { name: "Guinée-Bissau", code: "GW", region: "africa" },
    { name: "Guyana", code: "GY", region: "americas" },
    { name: "Haïti", code: "HT", region: "americas" },
    { name: "Honduras", code: "HN", region: "americas" },
    { name: "Hongrie", code: "HU", region: "europe" },
    { name: "Îles Marshall", code: "MH", region: "oceania" },
    { name: "Îles Salomon", code: "SB", region: "oceania" },
    { name: "Inde", code: "IN", region: "asia" },
    { name: "Indonésie", code: "ID", region: "asia" },
    { name: "Irak", code: "IQ", region: "asia" },
    { name: "Iran", code: "IR", region: "asia" },
    { name: "Irlande", code: "IE", region: "europe" },
    { name: "Islande", code: "IS", region: "europe" },
    { name: "Israël", code: "IL", region: "asia" },
    { name: "Italie", code: "IT", region: "europe" },
    { name: "Jamaïque", code: "JM", region: "americas" },
    { name: "Japon", code: "JP", region: "asia" },
    { name: "Jordanie", code: "JO", region: "asia" },
    { name: "Kazakhstan", code: "KZ", region: "asia" },
    { name: "Kenya", code: "KE", region: "africa" },
    { name: "Kirghizistan", code: "KG", region: "asia" },
    { name: "Kiribati", code: "KI", region: "oceania" },
    { name: "Koweït", code: "KW", region: "asia" },
    { name: "Laos", code: "LA", region: "asia" },
    { name: "Lesotho", code: "LS", region: "africa" },
    { name: "Lettonie", code: "LV", region: "europe" },
    { name: "Liban", code: "LB", region: "asia" },
    { name: "Liberia", code: "LR", region: "africa" },
    { name: "Libye", code: "LY", region: "africa" },
    { name: "Liechtenstein", code: "LI", region: "europe" },
    { name: "Lituanie", code: "LT", region: "europe" },
    { name: "Luxembourg", code: "LU", region: "europe" },
    { name: "Macédoine du Nord", code: "MK", region: "europe" },
    { name: "Madagascar", code: "MG", region: "africa" },
    { name: "Malaisie", code: "MY", region: "asia" },
    { name: "Malawi", code: "MW", region: "africa" },
    { name: "Maldives", code: "MV", region: "asia" },
    { name: "Mali", code: "ML", region: "africa" },
    { name: "Malte", code: "MT", region: "europe" },
    { name: "Maroc", code: "MA", region: "africa" },
    { name: "Maurice", code: "MU", region: "africa" },
    { name: "Mauritanie", code: "MR", region: "africa" },
    { name: "Mexique", code: "MX", region: "americas" },
    { name: "Micronésie", code: "FM", region: "oceania" },
    { name: "Moldavie", code: "MD", region: "europe" },
    { name: "Monaco", code: "MC", region: "europe" },
    { name: "Mongolie", code: "MN", region: "asia" },
    { name: "Monténégro", code: "ME", region: "europe" },
    { name: "Mozambique", code: "MZ", region: "africa" },
    { name: "Namibie", code: "NA", region: "africa" },
    { name: "Nauru", code: "NR", region: "oceania" },
    { name: "Népal", code: "NP", region: "asia" },
    { name: "Nicaragua", code: "NI", region: "americas" },
    { name: "Niger", code: "NE", region: "africa" },
    { name: "Nigeria", code: "NG", region: "africa" },
    { name: "Norvège", code: "NO", region: "europe" },
    { name: "Nouvelle-Zélande", code: "NZ", region: "oceania" },
    { name: "Oman", code: "OM", region: "asia" },
    { name: "Ouganda", code: "UG", region: "africa" },
    { name: "Ouzbékistan", code: "UZ", region: "asia" },
    { name: "Pakistan", code: "PK", region: "asia" },
    { name: "Palaos", code: "PW", region: "oceania" },
    { name: "Panama", code: "PA", region: "americas" },
    { name: "Papouasie-Nouvelle-Guinée", code: "PG", region: "oceania" },
    { name: "Paraguay", code: "PY", region: "americas" },
    { name: "Pays-Bas", code: "NL", region: "europe" },
    { name: "Pérou", code: "PE", region: "americas" },
    { name: "Philippines", code: "PH", region: "asia" },
    { name: "Pologne", code: "PL", region: "europe" },
    { name: "Portugal", code: "PT", region: "europe" },
    { name: "Qatar", code: "QA", region: "asia" },
    { name: "Roumanie", code: "RO", region: "europe" },
    { name: "Royaume-Uni", code: "GB", region: "europe" },
    { name: "Russie", code: "RU", region: "europe" },
    { name: "Rwanda", code: "RW", region: "africa" },
    { name: "Saint-Christophe-et-Niévès", code: "KN", region: "americas" },
    { name: "Sainte-Lucie", code: "LC", region: "americas" },
    { name: "Saint-Marin", code: "SM", region: "europe" },
    { name: "Saint-Vincent-et-les-Grenadines", code: "VC", region: "americas" },
    { name: "Salvador", code: "SV", region: "americas" },
    { name: "Samoa", code: "WS", region: "oceania" },
    { name: "Sao Tomé-et-Principe", code: "ST", region: "africa" },
    { name: "Sénégal", code: "SN", region: "africa" },
    { name: "Serbie", code: "RS", region: "europe" },
    { name: "Seychelles", code: "SC", region: "africa" },
    { name: "Sierra Leone", code: "SL", region: "africa" },
    { name: "Singapour", code: "SG", region: "asia" },
    { name: "Slovaquie", code: "SK", region: "europe" },
    { name: "Slovénie", code: "SI", region: "europe" },
    { name: "Somalie", code: "SO", region: "africa" },
    { name: "Soudan", code: "SD", region: "africa" },
    { name: "Soudan du Sud", code: "SS", region: "africa" },
    { name: "Sri Lanka", code: "LK", region: "asia" },
    { name: "Suède", code: "SE", region: "europe" },
    { name: "Suisse", code: "CH", region: "europe" },
    { name: "Suriname", code: "SR", region: "americas" },
    { name: "Syrie", code: "SY", region: "asia" },
    { name: "Tadjikistan", code: "TJ", region: "asia" },
    { name: "Tanzanie", code: "TZ", region: "africa" },
    { name: "Tchad", code: "TD", region: "africa" },
    { name: "Tchéquie", code: "CZ", region: "europe" },
    { name: "Thaïlande", code: "TH", region: "asia" },
    { name: "Timor oriental", code: "TL", region: "asia" },
    { name: "Togo", code: "TG", region: "africa" },
    { name: "Tonga", code: "TO", region: "oceania" },
    { name: "Trinité-et-Tobago", code: "TT", region: "americas" },
    { name: "Tunisie", code: "TN", region: "africa" },
    { name: "Turkménistan", code: "TM", region: "asia" },
    { name: "Turquie", code: "TR", region: "asia" },
    { name: "Tuvalu", code: "TV", region: "oceania" },
    { name: "Ukraine", code: "UA", region: "europe" },
    { name: "Uruguay", code: "UY", region: "americas" },
    { name: "Vanuatu", code: "VU", region: "oceania" },
    { name: "Vatican", code: "VA", region: "europe" },
    { name: "Venezuela", code: "VE", region: "americas" },
    { name: "Viêt Nam", code: "VN", region: "asia" },
    { name: "Yémen", code: "YE", region: "asia" },
    { name: "Zambie", code: "ZM", region: "africa" },
    { name: "Zimbabwe", code: "ZW", region: "africa" }
];

// Éléments du DOM
const flagImage = document.getElementById('flag-image');
const optionsContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const hintButton = document.getElementById('hint-btn');
const newGameButton = document.getElementById('new-game-btn');
const scoreElement = document.getElementById('score');
const maxScoreElement = document.getElementById('max-score');
const settingsButton = document.getElementById('settings-btn');
const settingsContent = document.getElementById('settings-content');
const difficultySelect = document.getElementById('difficulty');
const regionSelect = document.getElementById('region');
const questionsSelect = document.getElementById('questions');
const applySettingsButton = document.getElementById('apply-settings');
const resultModal = document.getElementById('result-modal');
const closeModalButton = document.getElementById('close-modal');
const finalScoreElement = document.getElementById('final-score');
const totalQuestionsElement = document.getElementById('total-questions');
const percentageElement = document.getElementById('percentage');
const progressBar = document.getElementById('progress-bar');
const playAgainButton = document.getElementById('play-again-btn');
const shareButton = document.getElementById('share-btn');

// Variables du jeu
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let gameInProgress = false;
let usedCountries = [];
let optionsCount = 6; // Valeur par défaut (moyen)
let totalQuestions = 20; // Valeur par défaut
let selectedRegion = 'all'; // Valeur par défaut

// Initialisation du jeu
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    questions = [];
    usedCountries = [];
    gameInProgress = true;
    
    // Mettre à jour les paramètres
    optionsCount = getOptionsCount();
    totalQuestions = parseInt(questionsSelect.value);
    selectedRegion = regionSelect.value;
    
    // Générer les questions
    generateQuestions();
    
    // Mettre à jour l'interface
    updateScore();
    maxScoreElement.textContent = `/${totalQuestions}`;
    nextButton.disabled = true;
    hintButton.disabled = false;
    
    // Afficher la première question
    showQuestion();
}

// Générer les questions
function generateQuestions() {
    // Filtrer les pays selon la région sélectionnée
    let filteredCountries = countries;
    if (selectedRegion !== 'all') {
        filteredCountries = countries.filter(country => country.region === selectedRegion);
    }
    
    // Vérifier qu'il y a assez de pays
    if (filteredCountries.length < optionsCount) {
        alert(`Pas assez de pays dans cette région. Veuillez choisir une région avec au moins ${optionsCount} pays.`);
        return;
    }
    
    // Mélanger les pays et en sélectionner le nombre nécessaire
    const shuffledCountries = [...filteredCountries].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < totalQuestions; i++) {
        const countryIndex = i % shuffledCountries.length;
        const country = shuffledCountries[countryIndex];
        
        // Trouver des options aléatoires
        const options = [country.name];
        const otherCountries = shuffledCountries.filter(c => c.name !== country.name);
        
        while (options.length < optionsCount && options.length <= otherCountries.length) {
            const randomIndex = Math.floor(Math.random() * otherCountries.length);
            const randomCountry = otherCountries[randomIndex].name;
            
            if (!options.includes(randomCountry)) {
                options.push(randomCountry);
            }
        }
        
        // Mélanger les options
        const shuffledOptions = [...options].sort(() => 0.5 - Math.random());
        
        questions.push({
            country: country,
            options: shuffledOptions,
            answered: false,
            correct: false
        });
    }
}

// Afficher une question
function showQuestion() {
    if (currentQuestionIndex >= questions.length || !gameInProgress) {
        endGame();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    
    // Afficher le drapeau
    flagImage.style.display = 'none';
    document.querySelector('.loading-animation').style.display = 'flex';
    
    // Charger l'image du drapeau
    flagImage.onload = function() {
        document.querySelector('.loading-animation').style.display = 'none';
        flagImage.style.display = 'block';
    };
    
    flagImage.onerror = function() {
        document.querySelector('.loading-animation').style.display = 'none';
        flagImage.style.display = 'block';
        flagImage.src = 'https://via.placeholder.com/320x180?text=Drapeau+non+disponible';
    };
    
    flagImage.src = `https://flagcdn.com/w320/${question.country.code.toLowerCase()}.png`;
    flagImage.alt = `Drapeau de ${question.country.name}`;
    
    // Afficher les options
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(button);
    });
    
    // Réinitialiser le feedback
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    feedbackElement.classList.remove('show', 'correct', 'incorrect');
    
    // Désactiver le bouton suivant
    nextButton.disabled = true;
}

// Sélectionner une option
function selectOption(selectedOption) {
    if (!gameInProgress || questions[currentQuestionIndex].answered) return;
    
    const question = questions[currentQuestionIndex];
    question.answered = true;
    const isCorrect = selectedOption === question.country.name;
    
    // Mettre à jour l'état de la question
    question.correct = isCorrect;
    
    // Mettre à jour le score
    if (isCorrect) {
        score++;
        updateScore();
    }
    
    // Afficher le feedback
    feedbackElement.textContent = isCorrect 
        ? `Correct! C'est le drapeau de ${question.country.name}.` 
        : `Incorrect. C'est le drapeau de ${question.country.name}.`;
    
    feedbackElement.className = 'feedback show';
    feedbackElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Mettre en évidence les bonnes et mauvaises réponses
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === question.country.name) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption && !isCorrect) {
            button.classList.add('incorrect');
        }
    });
    
    // Activer le bouton suivant
    nextButton.disabled = false;
}

// Passer à la question suivante
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
    
    // Réactiver le bouton d'indice
    hintButton.disabled = false;
}

// Donner un indice
function giveHint() {
    if (!gameInProgress || questions[currentQuestionIndex].answered) return;
    
    const question = questions[currentQuestionIndex];
    const countryName = question.country.name;
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Trouver les options incorrectes
    const incorrectOptions = Array.from(optionButtons)
        .filter(button => button.textContent !== countryName);
    
    // Supprimer aléatoirement la moitié des options incorrectes
    const optionsToRemove = Math.floor(incorrectOptions.length / 2);
    for (let i = 0; i < optionsToRemove; i++) {
        const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
        incorrectOptions[randomIndex].style.visibility = 'hidden';
        incorrectOptions.splice(randomIndex, 1);
    }
    
    // Désactiver le bouton d'indice
    hintButton.disabled = true;
}

// Terminer le jeu
function endGame() {
    gameInProgress = false;
    
    // Afficher les résultats
    showResults();
}

// Afficher les résultats
function showResults() {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    finalScoreElement.textContent = score;
    totalQuestionsElement.textContent = totalQuestions;
    percentageElement.textContent = percentage;
    progressBar.style.width = `${percentage}%`;
    
    // Changer la couleur de la barre de progression selon le score
    if (percentage >= 80) {
        progressBar.style.backgroundColor = '#4cc9f0'; // Vert bleuté
    } else if (percentage >= 50) {
        progressBar.style.backgroundColor = '#4895ef'; // Bleu
    } else {
        progressBar.style.backgroundColor = '#f72585'; // Rouge
    }
    
    resultModal.classList.add('show');
}

// Fermer la modal des résultats
function closeResults() {
    resultModal.classList.remove('show');
}

// Mettre à jour le score
function updateScore() {
    scoreElement.textContent = score;
}

// Obtenir le nombre d'options selon la difficulté
function getOptionsCount() {
    switch (difficultySelect.value) {
        case 'easy': return 4;
        case 'medium': return 6;
        case 'hard': return 8;
        default: return 6;
    }
}

// Partager les résultats
function shareResults() {
    const text = `J'ai obtenu ${score}/${totalQuestions} au Jeu des Drapeaux! Saurez-vous faire mieux?`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Jeu des Drapeaux',
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

// Événements
nextButton.addEventListener('click', nextQuestion);
hintButton.addEventListener('click', giveHint);
newGameButton.addEventListener('click', initGame);
playAgainButton.addEventListener('click', () => {
    closeResults();
    initGame();
});
closeModalButton.addEventListener('click', closeResults);
shareButton.addEventListener('click', shareResults);

// Paramètres
settingsButton.addEventListener('click', () => {
    settingsContent.classList.toggle('show');
});

applySettingsButton.addEventListener('click', () => {
    settingsContent.classList.remove('show');
    initGame();
});

// Fermer les paramètres quand on clique à l'extérieur
document.addEventListener('click', (e) => {
    if (!settingsContent.contains(e.target) && e.target !== settingsButton) {
        settingsContent.classList.remove('show');
    }
});

// Démarrer le jeu au chargement
document.addEventListener('DOMContentLoaded', () => {
    // Afficher un message de bienvenue
    feedbackElement.textContent = 'Bienvenue dans le Jeu des Drapeaux! Cliquez sur "Nouvelle Partie" pour commencer.';
    feedbackElement.classList.add('show');
    
    // Désactiver les boutons inutiles
    nextButton.disabled = true;
    hintButton.disabled = true;
});