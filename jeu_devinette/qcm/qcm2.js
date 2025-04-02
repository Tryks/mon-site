document.addEventListener('DOMContentLoaded', function() {
    // Questions du QCM
    const questions = [
        {
            question: "Quelle est la capitale de la France ?",
            options: {
                a: "Londres",
                b: "Paris",
                c: "Berlin",
                d: "Madrid"
            },
            answer: "b"
        },
        {
            question: "Quel est le plus grand océan du monde ?",
            options: {
                a: "Océan Atlantique",
                b: "Océan Indien",
                c: "Océan Pacifique",
                d: "Océan Arctique"
            },
            answer: "c"
        },
        {
            question: "Qui a peint la Joconde ?",
            options: {
                a: "Pablo Picasso",
                b: "Vincent van Gogh",
                c: "Léonard de Vinci",
                d: "Michel-Ange"
            },
            answer: "c"
        },
        {
            question: "Combien de continents y a-t-il sur Terre ?",
            options: {
                a: "5",
                b: "6",
                c: "7",
                d: "8"
            },
            answer: "c"
        },
        {
            question: "Quel est le plus long fleuve du monde ?",
            options: {
                a: "Le Nil",
                b: "L'Amazone",
                c: "Le Yangzi Jiang",
                d: "Le Mississippi"
            },
            answer: "b"
        },
        {
            question: "Quel élément chimique a pour symbole 'O' ?",
            options: {
                a: "Or",
                b: "Osmium",
                c: "Oxygène",
                d: "Oganesson"
            },
            answer: "c"
        },
        {
            question: "Quelle est la planète la plus proche du Soleil ?",
            options: {
                a: "Vénus",
                b: "Terre",
                c: "Mercure",
                d: "Mars"
            },
            answer: "c"
        },
        {
            question: "En quelle année a eu lieu la Révolution française ?",
            options: {
                a: "1776",
                b: "1789",
                c: "1799",
                d: "1812"
            },
            answer: "b"
        },
        {
            question: "Quel est l'animal national de l'Australie ?",
            options: {
                a: "Le koala",
                b: "Le kangourou",
                c: "L'émeu",
                d: "Le diable de Tasmanie"
            },
            answer: "b"
        },
        {
            question: "Combien de côtés a un hexagone ?",
            options: {
                a: "4",
                b: "5",
                c: "6",
                d: "7"
            },
            answer: "c"
        },
        {
            question: "Quel est le plus grand désert du monde ?",
            options: {
                a: "Le désert du Sahara",
                b: "Le désert d'Arabie",
                c: "Le désert de Gobi",
                d: "L'Antarctique"
            },
            answer: "d"
        },
        {
            question: "Qui a écrit 'Roméo et Juliette' ?",
            options: {
                a: "William Shakespeare",
                b: "Charles Dickens",
                c: "Jane Austen",
                d: "Mark Twain"
            },
            answer: "a"
        },
        {
            question: "Quelle est la langue la plus parlée au monde ?",
            options: {
                a: "Le mandarin",
                b: "L'anglais",
                c: "L'espagnol",
                d: "L'hindi"
            },
            answer: "a"
        },
        {
            question: "Quel est le plus haut sommet du monde ?",
            options: {
                a: "L'Everest",
                b: "Le K2",
                c: "Le Kilimandjaro",
                d: "Les Alpes"
            },
            answer: "a"
        },
        {
            question: "Quel pays a remporté la Coupe du Monde de Football en 2018 ?",
            options: {
                a: "France",
                b: "Croatie",
                c: "Belgique",
                d: "Brésil"
            },
            answer: "a"
        },
        {
            question: "Quelle est la monnaie du Japon ?",
            options: {
                a: "Le won",
                b: "Le yen",
                c: "Le yuan",
                d: "Le dollar"
            },
            answer: "b"
        },
        {
            question: "Combien de temps la Terre met-elle pour faire un tour complet autour du Soleil ?",
            options: {
                a: "24 heures",
                b: "30 jours",
                c: "365 jours",
                d: "7 jours"
            },
            answer: "c"
        },
        {
            question: "Quel est le plus grand mammifère du monde ?",
            options: {
                a: "L'éléphant",
                b: "Le rhinocéros",
                c: "La baleine bleue",
                d: "Le girafe"
            },
            answer: "c"
        },
        {
            question: "Quelle est la couleur obtenue en mélangeant du rouge et du bleu ?",
            options: {
                a: "Vert",
                b: "Orange",
                c: "Violet",
                d: "Jaune"
            },
            answer: "c"
        },
        {
            question: "Qui a inventé l'ampoule électrique ?",
            options: {
                a: "Albert Einstein",
                b: "Nikola Tesla",
                c: "Thomas Edison",
                d: "Alexander Graham Bell"
            },
            answer: "c"
        }
    ];

    const qcmForm = document.getElementById('qcm-form');
    const resultContainer = document.getElementById('result-container');
    const resultDiv = document.getElementById('result');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const bonusQuestion = document.getElementById('bonus-question');
    const restartBtn = document.getElementById('restart-btn');

    // Générer les questions dans le formulaire
    function generateQuestions() {
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `
                <h3>Question ${index + 1}: ${q.question}</h3>
                <div class="options">
                    ${Object.entries(q.options).map(([key, value]) => `
                        <label>
                            <input type="radio" name="q${index + 1}" value="${key}">
                            ${value}
                        </label>
                    `).join('')}
                </div>
            `;
            qcmForm.appendChild(questionDiv);
        });

        // Ajouter le bouton de soumission
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn';
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Soumettre le QCM';
        qcmForm.appendChild(submitBtn);
    }

    // Mettre à jour la barre de progression
    function updateProgress() {
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        const total = questions.length;
        const percentage = (answered / total) * 100;
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${answered}/${total}`;
    }

    // Écouter les changements sur les réponses
    qcmForm.addEventListener('change', updateProgress);

    // Soumission du formulaire
    qcmForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let score = 0;
        let resultsHTML = '';
        
        questions.forEach((q, index) => {
            const questionName = `q${index + 1}`;
            const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (selectedAnswer) {
                if (selectedAnswer.value === q.answer) {
                    score++;
                    resultsHTML += `
                        <p class="correct">
                            <i class="fas fa-check-circle"></i> 
                            Question ${index + 1}: Correct! (${q.options[q.answer]})
                        </p>
                    `;
                } else {
                    resultsHTML += `
                        <p class="incorrect">
                            <i class="fas fa-times-circle"></i> 
                            Question ${index + 1}: Incorrect. La bonne réponse était ${q.answer.toUpperCase()} (${q.options[q.answer]})
                        </p>
                    `;
                }
            } else {
                resultsHTML += `
                    <p class="incorrect">
                        <i class="fas fa-exclamation-circle"></i> 
                        Question ${index + 1}: Aucune réponse sélectionnée. La bonne réponse était ${q.answer.toUpperCase()} (${q.options[q.answer]})
                    </p>
                `;
            }
        });
        
        // Afficher les résultats
        resultDiv.innerHTML = `
            <div class="score">Score: ${score}/${questions.length}</div>
            ${resultsHTML}
        `;
        
        qcmForm.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Afficher la question bonus si score parfait
        if (score === questions.length) {
            bonusQuestion.style.display = 'block';
        }
    });

    // Gestion de la question bonus
    document.getElementById('submit-bonus').addEventListener('click', function() {
        const selectedAnswer = document.querySelector('input[name="q21"]:checked');
        
        if (selectedAnswer && selectedAnswer.value === 'a') {
            alert('Bravo ! La réponse bonus est correcte : Neil Armstrong est le premier homme à avoir marché sur la Lune.');
        } else {
            alert('Réponse bonus incorrecte. La bonne réponse était : Neil Armstrong.');
        }
    });

    // Bouton recommencer
    restartBtn.addEventListener('click', function() {
        qcmForm.style.display = 'flex';
        resultContainer.style.display = 'none';
        bonusQuestion.style.display = 'none';
        qcmForm.reset();
        updateProgress();
    });

    // Initialiser le QCM
    generateQuestions();
    updateProgress();
});

// assets/js/navigation.js
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animation des barres du burger
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'translateY(9px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                bars.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                });
            }
        });
    }

    // Fermer le menu au clic sur un lien (mobile)
    document.querySelectorAll('.nav-links').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Mise à jour du lien actif
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});