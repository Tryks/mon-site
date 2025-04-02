// Variables globales
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;
let quizData = [];
let playerName = "";
let selectedCategory = "";
let selectedDifficulty = "";
let timerEnabled = true;
let soundEnabled = true;
let questionCount = 10;
let startTime;
let answerTimes = [];

// Éléments DOM
const selectionScreen = document.getElementById('selection-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const categoryElements = document.querySelectorAll('.category');
const difficultyElements = document.querySelectorAll('.difficulty');
const timerToggle = document.getElementById('timer-toggle');
const soundToggle = document.getElementById('sound-toggle');
const questionCountSelect = document.getElementById('question-count');
const categoryDisplay = document.getElementById('category-display');
const difficultyDisplay = document.getElementById('difficulty-display');
const playerDisplay = document.getElementById('player-display');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const hintBtn = document.getElementById('hint-btn');
const hintModal = document.getElementById('hint-modal');
const hintText = document.getElementById('hint-text');
const closeModal = document.querySelector('.close-modal');
const resultPlayer = document.getElementById('result-player');
const resultScore = document.getElementById('result-score');
const resultCategory = document.getElementById('result-category');
const resultDifficulty = document.getElementById('result-difficulty');
const resultTime = document.getElementById('result-time');
const retryBtn = document.getElementById('retry-btn');
const newQuizBtn = document.getElementById('new-quiz-btn');
const shareBtn = document.getElementById('share-btn');
const performanceChart = document.getElementById('performance-chart');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const completeSound = document.getElementById('complete-sound');

// Questions par catégorie et difficulté
const questionsDatabase = {
    fonctions: {
        facile: [
            {
                question: "Quelle est la valeur de f(2) pour la fonction f(x) = 3x + 5 ?",
                options: ["11", "10", "8", "6"],
                correctAnswer: 0,
                hint: "Remplacez x par 2 dans la fonction f(x) = 3x + 5."
            },
            {
                question: "Quelle est l'image de 0 par la fonction f(x) = x² - 4 ?",
                options: ["0", "-4", "4", "16"],
                correctAnswer: 1,
                hint: "Calculez f(0) en remplaçant x par 0 dans l'expression."
            },
            {
                question: "Quel est l'antécédent de 7 par la fonction f(x) = 2x + 1 ?",
                options: ["3", "4", "2", "5"],
                correctAnswer: 0,
                hint: "Résolvez l'équation 2x + 1 = 7."
            }
        ],
        moyen: [
            {
                question: "Quelle est la dérivée de f(x) = 3x² + 2x - 5 ?",
                options: ["6x + 2", "3x + 2", "6x² + 2", "6x + 2x"],
                correctAnswer: 0,
                hint: "Appliquez les règles de dérivation pour chaque terme."
            },
            {
                question: "Quel est le domaine de définition de f(x) = √(x - 3) ?",
                options: ["x ≥ 3", "x > 3", "x ≤ 3", "x < 3"],
                correctAnswer: 0,
                hint: "L'expression sous la racine doit être positive ou nulle."
            }
        ],
        difficile: [
            {
                question: "Quelle est la limite de (x² - 4)/(x - 2) quand x tend vers 2 ?",
                options: ["4", "0", "Indéfinie", "2"],
                correctAnswer: 0,
                hint: "Factorisez le numérateur et simplifiez la fraction."
            },
            {
                question: "Quelle est la dérivée seconde de f(x) = sin(x) ?",
                options: ["-sin(x)", "cos(x)", "sin(x)", "-cos(x)"],
                correctAnswer: 0,
                hint: "Dérivez deux fois successivement la fonction sin(x)."
            }
        ],
        expert: [
            {
                question: "Quelle est l'intégrale de ∫(3x² + 2x - 5) dx ?",
                options: ["x³ + x² - 5x + C", "6x + 2 + C", "3x³ + 2x² - 5x + C", "x³ + x² + C"],
                correctAnswer: 0,
                hint: "Intégrez terme à terme en ajoutant 1 à l'exposant et en divisant par le nouvel exposant."
            },
            {
                question: "Quelle est la solution de l'équation différentielle y' = y ?",
                options: ["y = Ce^x", "y = Cx", "y = e^x + C", "y = Ce^(-x)"],
                correctAnswer: 0,
                hint: "La solution générale est une exponentielle multipliée par une constante."
            }
        ]
    },
    simplification: {
        facile: [
            {
                question: "Simplifiez l'expression: 3x + 2x - 5",
                options: ["5x - 5", "6x - 5", "x - 5", "5x² - 5"],
                correctAnswer: 0,
                hint: "Combinez les termes semblables (3x et 2x)."
            },
            {
                question: "Simplifiez: (4a²b)/(2ab)",
                options: ["2a", "2ab", "2a²b", "2b"],
                correctAnswer: 0,
                hint: "Simplifiez les coefficients et les variables séparément."
            }
        ],
        moyen: [
            {
                question: "Factorisez: x² - 9",
                options: ["(x - 3)(x + 3)", "(x - 3)²", "(x + 3)²", "Ne peut pas être factorisé"],
                correctAnswer: 0,
                hint: "C'est une différence de carrés a² - b² = (a - b)(a + b)."
            },
            {
                question: "Simplifiez: (x² + 5x + 6)/(x + 2)",
                options: ["x + 3", "x - 3", "x + 2", "x² + 3x"],
                correctAnswer: 0,
                hint: "Factorisez le numérateur et simplifiez avec le dénominateur."
            }
        ],
        difficile: [
            {
                question: "Simplifiez: (√12 + √3)/√3",
                options: ["√3", "3", "2 + √3", "2√3"],
                correctAnswer: 1,
                hint: "Simplifiez √12 en 2√3, puis factorisez √3 au numérateur."
            },
            {
                question: "Développez et simplifiez: (x + 2)³",
                options: ["x³ + 6x² + 12x + 8", "x³ + 8", "x³ + 6x + 12", "x³ + 3x² + 3x + 8"],
                correctAnswer: 0,
                hint: "Utilisez la formule (a + b)³ = a³ + 3a²b + 3ab² + b³."
            }
        ],
        expert: [
            {
                question: "Simplifiez: log₄(64)",
                options: ["3", "4", "2", "16"],
                correctAnswer: 0,
                hint: "Exprimez 64 comme une puissance de 4 : 64 = 4³."
            },
            {
                question: "Simplifiez: (e^(2x) - 1)/(e^x - 1)",
                options: ["e^x + 1", "e^x - 1", "e^(2x) + 1", "1"],
                correctAnswer: 0,
                hint: "Le numérateur est une différence de carrés : (e^x)² - 1²."
            }
        ]
    },
    equations: {
        facile: [
            {
                question: "Résolvez: 2x + 3 = 7",
                options: ["x = 2", "x = 4", "x = 5", "x = 3"],
                correctAnswer: 0,
                hint: "Soustrayez 3 des deux côtés, puis divisez par 2."
            },
            {
                question: "Résolvez: x/4 = 3",
                options: ["x = 12", "x = 7", "x = 1.5", "x = 0.75"],
                correctAnswer: 0,
                hint: "Multipliez les deux côtés par 4."
            }
        ],
        moyen: [
            {
                question: "Résolvez: x² - 5x + 6 = 0",
                options: ["x = 2 ou x = 3", "x = -2 ou x = -3", "x = 1 ou x = 6", "x = -1 ou x = 6"],
                correctAnswer: 0,
                hint: "Factorisez l'équation ou utilisez la formule quadratique."
            },
            {
                question: "Résolvez le système: 2x + y = 5 et x - y = 1",
                options: ["x = 2, y = 1", "x = 1, y = 3", "x = 3, y = -1", "x = 2, y = -1"],
                correctAnswer: 0,
                hint: "Additionnez les deux équations pour éliminer y."
            }
        ],
        difficile: [
            {
                question: "Résolvez: √(x + 3) = x - 3",
                options: ["x = 6", "x = 1", "x = 1 ou x = 6", "Aucune solution"],
                correctAnswer: 0,
                hint: "Élevez au carré les deux côtés, puis vérifiez les solutions potentielles."
            },
            {
                question: "Résolvez: e^(2x) - 3e^x + 2 = 0",
                options: ["x = 0 ou x = ln(2)", "x = 1 ou x = 2", "x = ln(3) ou x = ln(2)", "x = e ou x = 2e"],
                correctAnswer: 0,
                hint: "Faites un changement de variable y = e^x et résolvez l'équation quadratique."
            }
        ],
        expert: [
            {
                question: "Résolvez: sin(x) = cos(x) pour x ∈ [0, π/2]",
                options: ["x = π/4", "x = π/6", "x = π/3", "x = 0"],
                correctAnswer: 0,
                hint: "Divisez les deux côtés par cos(x) pour obtenir tan(x) = 1."
            },
            {
                question: "Résolvez l'équation différentielle: y'' + y = 0",
                options: ["y = A sin(x) + B cos(x)", "y = A e^x + B e^(-x)", "y = A x + B", "y = A sin(x) + B x"],
                correctAnswer: 0,
                hint: "La solution générale combine des fonctions sinusoïdales."
            }
        ]
    },
    geometrie: {
        facile: [
            {
                question: "Quelle est l'aire d'un rectangle de longueur 5 et largeur 3 ?",
                options: ["15", "8", "16", "30"],
                correctAnswer: 0,
                hint: "Aire = longueur × largeur."
            },
            {
                question: "Quel est le périmètre d'un carré de côté 4 ?",
                options: ["16", "8", "12", "4"],
                correctAnswer: 0,
                hint: "Périmètre = 4 × côté."
            }
        ],
        moyen: [
            {
                question: "Quel est le volume d'une sphère de rayon 3 ? (V = 4/3 π r³)",
                options: ["36π", "108π", "12π", "27π"],
                correctAnswer: 0,
                hint: "Remplacez r par 3 dans la formule du volume."
            },
            {
                question: "Dans un triangle rectangle, si les deux côtés sont 3 et 4, quelle est l'hypoténuse ?",
                options: ["5", "7", "6", "12"],
                correctAnswer: 0,
                hint: "Utilisez le théorème de Pythagore: a² + b² = c²."
            }
        ],
        difficile: [
            {
                question: "Quelle est l'équation d'un cercle de centre (2, -1) et rayon 3 ?",
                options: ["(x-2)² + (y+1)² = 9", "(x+2)² + (y-1)² = 9", "(x-2)² + (y+1)² = 3", "(x+2)² + (y-1)² = 3"],
                correctAnswer: 0,
                hint: "Formule du cercle: (x-h)² + (y-k)² = r² où (h,k) est le centre."
            },
            {
                question: "Quel est l'angle entre les vecteurs u = (1, 0) et v = (0, 1) ?",
                options: ["90°", "0°", "45°", "180°"],
                correctAnswer: 0,
                hint: "Ces vecteurs sont perpendiculaires."
            }
        ],
        expert: [
            {
                question: "Quelle est la distance entre les plans parallèles 2x - y + 2z = 4 et 2x - y + 2z = 8 ?",
                options: ["4/3", "2", "4", "8/3"],
                correctAnswer: 0,
                hint: "Utilisez la formule de distance entre plans: |D2 - D1| / √(a² + b² + c²)."
            },
            {
                question: "Quelle est l'aire de l'intersection d'un cube d'arête 2 et d'une sphère de rayon √3 centrée au centre du cube ?",
                options: ["4π", "π", "12π", "3π"],
                correctAnswer: 0,
                hint: "La sphère est circonscrite au cube, donc l'intersection est la surface de la sphère."
            }
        ]
    }
};

// Événements
startBtn.addEventListener('click', startQuiz);
categoryElements.forEach(category => {
    category.addEventListener('click', () => selectCategory(category));
});
difficultyElements.forEach(difficulty => {
    difficulty.addEventListener('click', () => selectDifficulty(difficulty));
});
timerToggle.addEventListener('change', toggleTimer);
soundToggle.addEventListener('change', toggleSound);
questionCountSelect.addEventListener('change', updateQuestionCount);
nextBtn.addEventListener('click', nextQuestion);
hintBtn.addEventListener('click', showHint);
closeModal.addEventListener('click', hideHint);
retryBtn.addEventListener('click', retryQuiz);
newQuizBtn.addEventListener('click', newQuiz);
shareBtn.addEventListener('click', shareResults);

// Fonctions
function selectCategory(categoryElement) {
    categoryElements.forEach(cat => cat.classList.remove('selected'));
    categoryElement.classList.add('selected');
    selectedCategory = categoryElement.dataset.category;
}

function selectDifficulty(difficultyElement) {
    difficultyElements.forEach(diff => diff.classList.remove('selected'));
    difficultyElement.classList.add('selected');
    selectedDifficulty = difficultyElement.dataset.difficulty;
}

function toggleTimer() {
    timerEnabled = timerToggle.checked;
}

function toggleSound() {
    soundEnabled = soundToggle.checked;
}

function updateQuestionCount() {
    questionCount = parseInt(questionCountSelect.value);
}

function startQuiz() {
    playerName = playerNameInput.value.trim() || "Joueur";
    
    if (!selectedCategory || !selectedDifficulty) {
        alert("Veuillez sélectionner une catégorie et une difficulté !");
        return;
    }
    
    // Préparer les questions
    quizData = prepareQuestions();
    
    // Initialiser les variables du quiz
    currentQuestionIndex = 0;
    score = 0;
    answerTimes = [];
    
    // Mettre à jour l'affichage
    categoryDisplay.textContent = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    difficultyDisplay.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    playerDisplay.textContent = playerName;
    scoreDisplay.textContent = score;
    
    // Basculer vers l'écran de quiz
    selectionScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Démarrer le quiz
    startTime = new Date();
    loadQuestion();
    
    // Démarrer le timer si activé
    if (timerEnabled) {
        timeLeft = 60;
        updateTimerDisplay();
        timer = setInterval(updateTimer, 1000);
    } else {
        timerDisplay.textContent = "∞";
    }
}

function prepareQuestions() {
    const availableQuestions = [...questionsDatabase[selectedCategory][selectedDifficulty]];
    const selectedQuestions = [];
    
    // Mélanger les questions
    availableQuestions.sort(() => Math.random() - 0.5);
    
    // Sélectionner le nombre demandé de questions
    for (let i = 0; i < Math.min(questionCount, availableQuestions.length); i++) {
        selectedQuestions.push(availableQuestions[i]);
    }
    
    // Si nous n'avons pas assez de questions, répéter certaines questions
    while (selectedQuestions.length < questionCount) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        selectedQuestions.push(availableQuestions[randomIndex]);
    }
    
    return selectedQuestions;
}

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        endQuiz();
        return;
    }
    
    const question = quizData[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / quizData.length) * 100;
    
    // Mettre à jour la barre de progression
    progressBar.style.width = `${progress}%`;
    
    // Afficher la question
    questionText.textContent = question.question;
    
    // Afficher les options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.classList.add('option-btn');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(optionElement);
    });
    
    // Désactiver le bouton suivant jusqu'à ce qu'une réponse soit sélectionnée
    nextBtn.disabled = true;
    
    // Mettre à jour l'indice
    hintText.textContent = question.hint;
    
    // Enregistrer le temps de début pour cette question
    startTime = new Date();
}

function selectAnswer(e) {
    const selectedOption = e.target;
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const question = quizData[currentQuestionIndex];
    
    // Désactiver toutes les options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Marquer la bonne réponse
    const correctIndex = question.correctAnswer;
    document.querySelector(`.option-btn[data-index="${correctIndex}"]`).classList.add('correct');
    
    // Marquer la réponse sélectionnée si elle est incorrecte
    if (selectedIndex !== correctIndex) {
        selectedOption.classList.add('wrong');
        if (soundEnabled) wrongSound.play();
    } else {
        score++;
        scoreDisplay.textContent = score;
        if (soundEnabled) correctSound.play();
    }
    
    // Activer le bouton suivant
    nextBtn.disabled = false;
    
    // Enregistrer le temps de réponse
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // en secondes
    answerTimes.push(timeTaken);
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function updateTimer() {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz();
    }
}

function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
    
    // Changer la couleur en fonction du temps restant
    if (timeLeft <= 10) {
        timerDisplay.style.color = 'var(--danger-color)';
    } else if (timeLeft <= 20) {
        timerDisplay.style.color = 'var(--warning-color)';
    } else {
        timerDisplay.style.color = 'inherit';
    }
}

function showHint() {
    hintModal.classList.add('active');
}

function hideHint() {
    hintModal.classList.remove('active');
}

function endQuiz() {
    clearInterval(timer);
    
    // Calculer le temps moyen par question
    const averageTime = answerTimes.reduce((sum, time) => sum + time, 0) / answerTimes.length;
    
    // Afficher les résultats
    resultPlayer.textContent = playerName;
    resultScore.textContent = `${score} / ${quizData.length}`;
    resultCategory.textContent = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    resultDifficulty.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    resultTime.textContent = `${averageTime.toFixed(1)} secondes`;
    
    // Jouer le son de fin si activé
    if (soundEnabled) completeSound.play();
    
    // Basculer vers l'écran des résultats
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // Créer le graphique de performance
    createPerformanceChart();
}

function createPerformanceChart() {
    const ctx = performanceChart.getContext('2d');
    
    // Préparer les données pour le graphique
    const labels = quizData.map((_, i) => `Q${i + 1}`);
    const correctAnswers = quizData.map((q, i) => {
        return answerTimes[i] !== undefined ? (i < score ? 1 : 0) : null;
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Temps (s)',
                    data: answerTimes,
                    backgroundColor: answerTimes.map((_, i) => 
                        i < score ? 'rgba(0, 184, 148, 0.7)' : 'rgba(255, 118, 117, 0.7)'
                    ),
                    borderColor: answerTimes.map((_, i) => 
                        i < score ? 'rgba(0, 184, 148, 1)' : 'rgba(255, 118, 117, 1)'
                    ),
                    borderWidth: 1,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Temps (secondes)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const isCorrect = index < score;
                            return [
                                `Temps: ${context.raw.toFixed(1)}s`,
                                `Statut: ${isCorrect ? 'Correct' : 'Incorrect'}`
                            ];
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

function retryQuiz() {
    // Réinitialiser le graphique
    performanceChart.innerHTML = '';
    
    // Revenir à l'écran de quiz
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Réinitialiser le quiz
    currentQuestionIndex = 0;
    score = 0;
    answerTimes = [];
    scoreDisplay.textContent = score;
    
    // Redémarrer le quiz
    startTime = new Date();
    loadQuestion();
    
    // Redémarrer le timer si activé
    if (timerEnabled) {
        timeLeft = 60;
        updateTimerDisplay();
        timer = setInterval(updateTimer, 1000);
    }
}

function newQuiz() {
    // Réinitialiser le graphique
    performanceChart.innerHTML = '';
    
    // Revenir à l'écran de sélection
    resultsScreen.classList.remove('active');
    selectionScreen.classList.add('active');
}

function shareResults() {
    const shareText = `J'ai obtenu ${score}/${quizData.length} au quiz ${selectedCategory} (${selectedDifficulty}) sur Math Quiz!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mes résultats Math Quiz',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Erreur de partage:', err);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(shareText) {
    // Copier dans le presse-papiers
    navigator.clipboard.writeText(shareText).then(() => {
        alert('Résultats copiés dans le presse-papiers !');
    }).catch(err => {
        console.log('Erreur de copie:', err);
        prompt('Copiez ce texte pour partager vos résultats:', shareText);
    });
}

// Initialisation
function init() {
    // Sélectionner des valeurs par défaut
    selectCategory(categoryElements[0]);
    selectDifficulty(difficultyElements[1]);
    
    // Activer les options par défaut
    timerToggle.checked = true;
    soundToggle.checked = true;
    questionCountSelect.value = "10";
}

init();