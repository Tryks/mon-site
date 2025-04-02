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
let questionsInEnglish = false;
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
const languageToggle = document.getElementById('language-toggle');
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
const feedbackText = document.getElementById('feedback-text');
const retryBtn = document.getElementById('retry-btn');
const newQuizBtn = document.getElementById('new-quiz-btn');
const shareBtn = document.getElementById('share-btn');
const performanceChart = document.getElementById('performance-chart');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const completeSound = document.getElementById('complete-sound');

// Base de données de questions
const questionsDatabase = {
    grammar: {
        beginner: [
            {
                questionFr: "Quelle est la forme correcte du pluriel de 'child' ?",
                questionEn: "What is the correct plural form of 'child'?",
                options: ["childs", "children", "childes", "child"],
                correctAnswer: 1,
                hintFr: "C'est un pluriel irrégulier en anglais.",
                hintEn: "It's an irregular plural in English."
            },
            {
                questionFr: "Quelle phrase est correcte ?",
                questionEn: "Which sentence is correct?",
                options: ["She don't like apples", "She doesn't likes apples", "She doesn't like apples", "She don't likes apples"],
                correctAnswer: 2,
                hintFr: "N'oubliez pas la conjugaison à la troisième personne du singulier.",
                hintEn: "Don't forget the third person singular conjugation."
            },
            {
                questionFr: "Quel est le pluriel de 'book' ?",
                questionEn: "What is the plural of 'book'?",
                options: ["books", "bookes", "bookies", "book"],
                correctAnswer: 0,
                hintFr: "La plupart des noms forment leur pluriel en ajoutant simplement un 's'.",
                hintEn: "Most nouns form their plural by simply adding 's'."
            },
            {
                questionFr: "Quel pronom remplace 'Mary' dans : 'Mary is happy' ?",
                questionEn: "Which pronoun replaces 'Mary' in: 'Mary is happy'?",
                options: ["He", "She", "It", "They"],
                correctAnswer: 1,
                hintFr: "Mary est un prénom féminin.",
                hintEn: "Mary is a feminine name."
            },
            {
                questionFr: "Quelle est la forme négative correcte de : 'I like pizza' ?",
                questionEn: "What is the correct negative form of: 'I like pizza'?",
                options: ["I no like pizza", "I don't like pizza", "I doesn't like pizza", "I not like pizza"],
                correctAnswer: 1,
                hintFr: "La négation en anglais utilise 'do not' ou 'don't'.",
                hintEn: "Negation in English uses 'do not' or 'don't'."
            },
            {
                questionFr: "Quel est l'article correct : '___ apple' ?",
                questionEn: "What is the correct article: '___ apple'?",
                options: ["a", "an", "the", "no article"],
                correctAnswer: 1,
                hintFr: "On utilise 'an' devant les mots commençant par une voyelle.",
                hintEn: "We use 'an' before words starting with a vowel sound."
            },
            {
                questionFr: "Quelle phrase est correcte ?",
                questionEn: "Which sentence is correct?",
                options: ["They is happy", "They am happy", "They are happy", "They be happy"],
                correctAnswer: 2,
                hintFr: "Le verbe 'to be' se conjugue 'are' avec 'they'.",
                hintEn: "The verb 'to be' conjugates as 'are' with 'they'."
            },
            {
                questionFr: "Quelle est la forme possessive de 'the dog' ?",
                questionEn: "What is the possessive form of 'the dog'?",
                options: ["the dogs'", "the dog's", "the dogs's", "the doges'"],
                correctAnswer: 1,
                hintFr: "Pour un possessif singulier, on ajoute 's.",
                hintEn: "For singular possessive, add 's."
            },
            {
                questionFr: "Quel mot est un adjectif dans : 'The big house' ?",
                questionEn: "Which word is an adjective in: 'The big house'?",
                options: ["The", "big", "house", "all"],
                correctAnswer: 1,
                hintFr: "Un adjectif décrit un nom.",
                hintEn: "An adjective describes a noun."
            },
            {
                questionFr: "Quelle phrase est à la forme interrogative ?",
                questionEn: "Which sentence is in the interrogative form?",
                options: ["You are happy", "Are you happy?", "Happy you are", "You happy are"],
                correctAnswer: 1,
                hintFr: "Une question en anglais inverse le sujet et le verbe.",
                hintEn: "A question in English inverts the subject and verb."
            }
        ],
        intermediate: [
            {
                questionFr: "Quelle est la forme correcte du comparatif de 'good' ?",
                questionEn: "What is the correct comparative form of 'good'?",
                options: ["gooder", "more good", "better", "best"],
                correctAnswer: 2,
                hintFr: "C'est un comparatif irrégulier.",
                hintEn: "It's an irregular comparative."
            },
            {
                questionFr: "Choisissez la phrase correcte :",
                questionEn: "Choose the correct sentence:",
                options: [
                    "If I will see him, I will tell him",
                    "If I see him, I will tell him", 
                    "If I saw him, I will tell him",
                    "If I seen him, I will tell him"
                ],
                correctAnswer: 1,
                hintFr: "Dans les conditionnelles de type 1, on n'utilise pas 'will' dans la partie 'if'.",
                hintEn: "In first conditional, we don't use 'will' in the 'if' part."
            },
            {
                questionFr: "Quelle phrase utilise correctement 'used to' ?",
                questionEn: "Which sentence correctly uses 'used to'?",
                options: [
                    "I use to play tennis",
                    "I used to playing tennis",
                    "I used to play tennis",
                    "I'm used to play tennis"
                ],
                correctAnswer: 2,
                hintFr: "'Used to' exprime une habitude passée, suivi de la base verbale.",
                hintEn: "'Used to' expresses past habits, followed by base verb."
            },
            {
                questionFr: "Identifiez l'erreur : 'She should to go now'",
                questionEn: "Identify the error: 'She should to go now'",
                options: ["She", "should", "to go", "now"],
                correctAnswer: 2,
                hintFr: "Les verbes modaux (should, could...) sont suivis directement de la base verbale.",
                hintEn: "Modal verbs are followed directly by base verb."
            },
            {
                questionFr: "Quelle phrase contient un adverbe de fréquence correctement placé ?",
                questionEn: "Which sentence has the frequency adverb correctly placed?",
                options: [
                    "She always is on time",
                    "She is on time always",
                    "She is always on time",
                    "Always she is on time"
                ],
                correctAnswer: 2,
                hintFr: "Les adverbes de fréquence se placent avant le verbe principal, mais après 'be'.",
                hintEn: "Frequency adverbs go before main verb but after 'be'."
            },
            {
                questionFr: "Quelle est la forme passive de : 'Someone stole my wallet' ?",
                questionEn: "What is the passive form of: 'Someone stole my wallet'?",
                options: [
                    "My wallet was stolen",
                    "My wallet is stolen",
                    "My wallet has been stolen",
                    "My wallet got stole"
                ],
                correctAnswer: 0,
                hintFr: "Passé simple → was/were + participe passé.",
                hintEn: "Past simple → was/were + past participle."
            },
            {
                questionFr: "Quel pronom relatif complète : 'The woman ___ lives next door is a doctor' ?",
                questionEn: "Which relative pronoun completes: 'The woman ___ lives next door is a doctor'?",
                options: ["which", "whose", "whom", "who"],
                correctAnswer: 3,
                hintFr: "'Who' est utilisé pour les sujets humains.",
                hintEn: "'Who' is used for human subjects."
            },
            {
                questionFr: "Quelle phrase utilise correctement 'too' et 'enough' ?",
                questionEn: "Which sentence correctly uses 'too' and 'enough'?",
                options: [
                    "This coffee is too hot to drink",
                    "This coffee is too hot for drink",
                    "This coffee is enough hot to drink",
                    "This coffee is too hot enough to drink"
                ],
                correctAnswer: 0,
                hintFr: "Too + adjectif + to + base verbale / adjectif + enough + to + base verbale.",
                hintEn: "Too + adjective + to + base verb / adjective + enough + to + base verb."
            },
            {
                questionFr: "Quelle phrase contient un gérondif correctement utilisé ?",
                questionEn: "Which sentence correctly uses a gerund?",
                options: [
                    "I enjoy to swim",
                    "I enjoy swimming",
                    "I enjoy swim",
                    "I enjoy to swimming"
                ],
                correctAnswer: 1,
                hintFr: "Après certains verbes (enjoy, avoid...), on utilise le gérondif (-ing).",
                hintEn: "After certain verbs (enjoy, avoid...), we use gerund (-ing)."
            },
            {
                questionFr: "Quelle phrase montre une inversion correcte après une expression négative ?",
                questionEn: "Which sentence shows correct inversion after a negative expression?",
                options: [
                    "Never I have seen such beauty",
                    "Never have I seen such beauty",
                    "Never I seen such beauty",
                    "Never have seen I such beauty"
                ],
                correctAnswer: 1,
                hintFr: "Structure : expression négative + auxiliaire + sujet + verbe principal.",
                hintEn: "Structure: negative expression + auxiliary + subject + main verb."
            }
        ],
        advanced: [
            {
                questionFr: "Quelle phrase utilise correctement le subjonctif ?",
                questionEn: "Which sentence correctly uses the subjunctive mood?",
                options: [
                    "I suggest that he goes now",
                    "I suggest that he go now",
                    "I suggest that he will go now", 
                    "I suggest that he went now"
                ],
                correctAnswer: 1,
                hintFr: "Le subjonctif en anglais utilise la base verbale sans 's' à la troisième personne.",
                hintEn: "English subjunctive uses base form of the verb without 's' for third person."
            },
            {
                questionFr: "Identifiez la phrase avec une proposition relative restrictive :",
                questionEn: "Identify the sentence with a restrictive relative clause:",
                options: [
                    "My brother, who lives in Paris, is a doctor",
                    "My brother who lives in Paris is a doctor",
                    "My brother, that lives in Paris, is a doctor",
                    "My brother which lives in Paris is a doctor"
                ],
                correctAnswer: 1,
                hintFr: "Les clauses restrictives (essentielles) ne sont pas séparées par des virgules.",
                hintEn: "Restrictive (essential) clauses aren't set off by commas."
            },
            {
                questionFr: "Quelle phrase contient une inversion correcte après une expression négative ?",
                questionEn: "Which sentence has correct inversion after a negative expression?",
                options: [
                    "Not only she sings but she also dances",
                    "Not only does she sing but she also dances",
                    "Not only sings she but she also dances",
                    "Not only she does sing but she also dances"
                ],
                correctAnswer: 1,
                hintFr: "La structure est : expression négative + auxiliaire + sujet + verbe principal.",
                hintEn: "Structure: negative expression + auxiliary + subject + main verb."
            },
            {
                questionFr: "Quelle phrase utilise correctement 'were' au subjonctif ?",
                questionEn: "Which sentence correctly uses subjunctive 'were'?",
                options: [
                    "If I was you, I would apologize",
                    "If I were you, I would apologize",
                    "If I am you, I would apologize",
                    "If I be you, I would apologize"
                ],
                correctAnswer: 1,
                hintFr: "Le subjonctif utilise 'were' pour toutes les personnes dans les contextes hypothétiques.",
                hintEn: "Subjunctive uses 'were' for all persons in hypothetical contexts."
            },
            {
                questionFr: "Identifiez la phrase avec une anacoluthe :",
                questionEn: "Identify the sentence with a dangling modifier:",
                options: [
                    "Running to catch the bus, my bag fell open",
                    "As I ran to catch the bus, my bag fell open",
                    "My bag fell open as I ran to catch the bus",
                    "I ran to catch the bus, and my bag fell open"
                ],
                correctAnswer: 0,
                hintFr: "Le sujet implicite ('je') ne correspond pas au sujet explicite ('my bag').",
                hintEn: "Implied subject ('I') doesn't match explicit subject ('my bag')."
            },
            {
                questionFr: "Quelle phrase utilise correctement 'need' comme semi-modal ?",
                questionEn: "Which sentence correctly uses 'need' as a semi-modal?",
                options: [
                    "He need to finish his work",
                    "He needs finish his work",
                    "He need finish his work",
                    "He needs to finish his work"
                ],
                correctAnswer: 2,
                hintFr: "Forme semi-modale : 'need' + base verbale (sans 'to' ni 's').",
                hintEn: "Semi-modal form: 'need' + base verb (no 'to' or 's')."
            },
            {
                questionFr: "Quelle construction utilise correctement l'ellipse ?",
                questionEn: "Which construction correctly uses ellipsis?",
                options: [
                    "She can swim and he can swim too",
                    "She can swim and he can too",
                    "She can swim and he too",
                    "She can swim and he can to swim too"
                ],
                correctAnswer: 1,
                hintFr: "L'ellipse évite la répétition du verbe principal quand le sens reste clair.",
                hintEn: "Ellipsis avoids repeating the main verb when meaning remains clear."
            },
            {
                questionFr: "Identifiez la phrase avec une mise en emphase correcte :",
                questionEn: "Identify the sentence with correct cleft structure:",
                options: [
                    "What it happened was shocking",
                    "What happened it was shocking",
                    "What happened was shocking",
                    "What was happened shocked"
                ],
                correctAnswer: 2,
                hintFr: "Structure correcte : 'What' + sujet + verbe + 'was' + complément.",
                hintEn: "Correct structure: 'What' + subject + verb + 'was' + complement."
            },
            {
                questionFr: "Quelle phrase utilise correctement 'as though' avec le subjonctif ?",
                questionEn: "Which sentence correctly uses 'as though' with subjunctive?",
                options: [
                    "He acts as though he is the boss",
                    "He acts as though he was the boss",
                    "He acts as though he were the boss",
                    "He acts as though he be the boss"
                ],
                correctAnswer: 2,
                hintFr: "Après 'as though', on utilise souvent le subjonctif ('were') pour exprimer l'irréel.",
                hintEn: "After 'as though', subjunctive ('were') often expresses unreality."
            },
            {
                questionFr: "Quelle construction montre une postposition correcte de la préposition ?",
                questionEn: "Which construction shows correct preposition stranding?",
                options: [
                    "With whom did you go to the concert?",
                    "Who did you go to the concert with?",
                    "With who did you go to the concert?",
                    "Whom did you go to the concert with?"
                ],
                correctAnswer: 1,
                hintFr: "La postposition de préposition est acceptable en anglais courant (mais pas 'with who').",
                hintEn: "Preposition stranding is acceptable in informal English (but not 'with who')."
            }
        ],
        expert: [
            {
                questionFr: "Quelle est la forme passive de 'They say that he knows the answer' ?",
                questionEn: "What is the passive form of 'They say that he knows the answer'?",
                options: [
                    "He is said to know the answer",
                    "The answer is known by him",
                    "It is said that the answer is known by him",
                    "They are said to know the answer"
                ],
                correctAnswer: 0,
                hintFr: "Construction passive impersonnelle avec 'is said to' + infinitif.",
                hintEn: "Impersonal passive with 'is said to' + infinitive."
            },
            {
                questionFr: "Quelle phrase contient un participe présent comme adjectif ?",
                questionEn: "Which sentence contains a present participle as adjective?",
                options: [
                    "She is baking a cake",
                    "The baking dish is hot",
                    "Baking is her favorite hobby",
                    "She has been baking all day"
                ],
                correctAnswer: 1,
                hintFr: "Le participe présent 'baking' décrit le nom 'dish'.",
                hintEn: "'Baking' describes the noun 'dish'."
            },
            {
                questionFr: "Identifiez la construction absolue correcte :",
                questionEn: "Identify the correct absolute construction:",
                options: [
                    "Weather permitting, we'll have a picnic",
                    "Permitting weather, we'll have a picnic",
                    "We'll have a picnic, weather permitting it",
                    "We'll have a picnic, the weather permitting"
                ],
                correctAnswer: 0,
                hintFr: "Structure : Nom + participe présent, sans conjonction.",
                hintEn: "Structure: Noun + present participle, no conjunction."
            },
            {
                questionFr: "Quelle phrase utilise correctement 'were' dans une inversion formelle ?",
                questionEn: "Which sentence correctly uses 'were' in formal inversion?",
                options: [
                    "Were I you, I would reconsider",
                    "Was I you, I would reconsider",
                    "If I was you, I would reconsider",
                    "If I were you, I would reconsider"
                ],
                correctAnswer: 0,
                hintFr: "Inversion formelle omettant 'if' avec subjonctif 'were'.",
                hintEn: "Formal inversion omitting 'if' with subjunctive 'were'."
            },
            {
                questionFr: "Quelle construction montre un gérondif parfait correct ?",
                questionEn: "Which shows correct perfect gerund usage?",
                options: [
                    "He denied to have stolen the money",
                    "He denied having stolen the money",
                    "He denied to steal the money",
                    "He denied stealing the money"
                ],
                correctAnswer: 1,
                hintFr: "'Having + participe passé' pour une action antérieure.",
                hintEn: "'Having + past participle' for prior action."
            },
            {
                questionFr: "Identifiez l'antécédent ambigu dans : 'The teachers told the students they were overworked'",
                questionEn: "Identify the ambiguous antecedent in: 'The teachers told the students they were overworked'",
                options: [
                    "teachers",
                    "students",
                    "they",
                    "were"
                ],
                correctAnswer: 2,
                hintFr: "'They' peut référer aux enseignants ou aux étudiants.",
                hintEn: "'They' could refer to teachers or students."
            },
            {
                questionFr: "Quelle phrase contient une anaphore grammaticale correcte ?",
                questionEn: "Which sentence contains correct grammatical anaphora?",
                options: [
                    "John said he would come, and it happened",
                    "John said he would come, and that happened",
                    "John said he would come, and so he did",
                    "John said he would come, and this happened"
                ],
                correctAnswer: 2,
                hintFr: "'So he did' reprend correctement l'action précédente.",
                hintEn: "'So he did' properly echoes prior action."
            },
            {
                questionFr: "Quelle construction utilise correctement 'as' dans une comparaison elliptique ?",
                questionEn: "Which correctly uses 'as' in elliptical comparison?",
                options: [
                    "She speaks French as well as English",
                    "She speaks French as well as she speaks English",
                    "She speaks French as well as she does English",
                    "She speaks French as well like English"
                ],
                correctAnswer: 2,
                hintFr: "Structure parallèle avec 'does' remplaçant le verbe répété.",
                hintEn: "Parallel structure with 'does' replacing repeated verb."
            },
            {
                questionFr: "Identifiez la phrase avec un participe passé attributif :",
                questionEn: "Identify the sentence with attributive past participle:",
                options: [
                    "The broken vase was expensive",
                    "The vase was broken yesterday",
                    "Someone broke the vase",
                    "The vase broke when it fell"
                ],
                correctAnswer: 0,
                hintFr: "'Broken' décrit le vase comme adjectif, non comme verbe.",
                hintEn: "'Broken' describes 'vase' as adjective, not verb."
            },
            {
                questionFr: "Quelle construction montre une dislocation à droite correcte ?",
                questionEn: "Which shows correct right dislocation?",
                options: [
                    "He's very talented, your brother",
                    "Your brother, he's very talented",
                    "He, your brother, is very talented",
                    "Your brother is he very talented"
                ],
                correctAnswer: 0,
                hintFr: "La dislocation place l'élément détaché (your brother) en fin de phrase.",
                hintEn: "Dislocation places detached element (your brother) at end."
            }
        ]
    },
    tenses: {
        beginner: [
            {
                questionFr: "Quel temps est utilisé dans : 'I eat breakfast every day' ?",
                questionEn: "Which tense is used in: 'I eat breakfast every day'?",
                options: ["Present Simple", "Present Continuous", "Past Simple", "Future Simple"],
                correctAnswer: 0,
                hintFr: "Ce temps décrit des routines.",
                hintEn: "This tense describes routines."
            },
            {
                questionFr: "Conjuguez 'to go' au passé simple :",
                questionEn: "Conjugate 'to go' in past simple:",
                options: ["goed", "went", "gone", "goes"],
                correctAnswer: 1,
                hintFr: "Verbe irrégulier important à mémoriser.",
                hintEn: "Important irregular verb to memorize."
            },
            {
                questionFr: "Quelle phrase est au présent continu ?",
                questionEn: "Which sentence is in present continuous?",
                options: [
                    "She works in London",
                    "She is working in London",
                    "She worked in London",
                    "She will work in London"
                ],
                correctAnswer: 1,
                hintFr: "Cherchez la forme 'be' + verbe -ing.",
                hintEn: "Look for 'be' + verb-ing form."
            },
            {
                questionFr: "Conjuguez 'to study' au futur simple :",
                questionEn: "Conjugate 'to study' in future simple:",
                options: [
                    "I am studying",
                    "I study",
                    "I will study",
                    "I studied"
                ],
                correctAnswer: 2,
                hintFr: "Futur simple = will + base verbale.",
                hintEn: "Future simple = will + base verb."
            },
            {
                questionFr: "Quelle phrase utilise correctement le passé simple ?",
                questionEn: "Which sentence correctly uses past simple?",
                options: [
                    "I have seen that movie yesterday",
                    "I saw that movie yesterday",
                    "I see that movie yesterday",
                    "I seeing that movie yesterday"
                ],
                correctAnswer: 1,
                hintFr: "Avec 'yesterday', on utilise le passé simple.",
                hintEn: "With 'yesterday', use past simple."
            },
            {
                questionFr: "Trouvez l'erreur : 'They is playing football'",
                questionEn: "Find the error: 'They is playing football'",
                options: ["They", "is", "playing", "football"],
                correctAnswer: 1,
                hintFr: "'They' nécessite 'are' au présent continu.",
                hintEn: "'They' requires 'are' in present continuous."
            },
            {
                questionFr: "Quel auxiliaire utilise-t-on pour former le présent simple négatif ?",
                questionEn: "Which auxiliary do we use for negative present simple?",
                options: ["am/is/are", "do/does", "have/has", "will"],
                correctAnswer: 1,
                hintFr: "On utilise do/does + not + base verbale.",
                hintEn: "We use do/does + not + base verb."
            },
            {
                questionFr: "Conjuguez 'to be' au présent simple pour 'he' :",
                questionEn: "Conjugate 'to be' in present simple for 'he':",
                options: ["am", "are", "is", "be"],
                correctAnswer: 2,
                hintFr: "Je suis = I am, tu es = you are, il est = he is...",
                hintEn: "I am, you are, he is..."
            },
            {
                questionFr: "Quelle phrase est au passé continu ?",
                questionEn: "Which sentence is in past continuous?",
                options: [
                    "She cooks dinner",
                    "She was cooking dinner",
                    "She has cooked dinner",
                    "She will cook dinner"
                ],
                correctAnswer: 1,
                hintFr: "Passé continu = was/were + verbe -ing.",
                hintEn: "Past continuous = was/were + verb-ing."
            },
            {
                questionFr: "Complétez : '___ you like ice cream?'",
                questionEn: "Complete: '___ you like ice cream?'",
                options: ["Do", "Does", "Is", "Are"],
                correctAnswer: 0,
                hintFr: "Auxiliaire 'do' pour les questions au présent simple (sujet pluriel).",
                hintEn: "'Do' for present simple questions (plural subject)."
            }
        ],
        intermediate: [
            {
                questionFr: "Quelle phrase utilise correctement le present perfect ?",
                questionEn: "Which sentence correctly uses the present perfect?",
                options: [
                    "I have seen that movie yesterday",
                    "I saw that movie yesterday",
                    "I have seen that movie",
                    "I see that movie"
                ],
                correctAnswer: 2,
                hintFr: "Le present perfect exprime une expérience sans moment précis.",
                hintEn: "Present perfect expresses experience without specific time."
            },
            {
                questionFr: "Choisissez la forme correcte du futur : 'By next year, I ___ here for five years.'",
                questionEn: "Choose the correct future form: 'By next year, I ___ here for five years.'",
                options: [
                    "will work",
                    "will be working",
                    "will have worked",
                    "work"
                ],
                correctAnswer: 2,
                hintFr: "Future perfect pour une action terminée avant un moment futur.",
                hintEn: "Future perfect for action completed before future time."
            },
            {
                questionFr: "Identifiez le temps dans : 'She has been working here since 2020'",
                questionEn: "Identify the tense in: 'She has been working here since 2020'",
                options: [
                    "Present Perfect Simple",
                    "Present Perfect Continuous",
                    "Past Perfect",
                    "Present Continuous"
                ],
                correctAnswer: 1,
                hintFr: "'Has been working' montre la durée avec 'since'.",
                hintEn: "'Has been working' shows duration with 'since'."
            },
            {
                questionFr: "Quelle phrase utilise correctement le past perfect ?",
                questionEn: "Which sentence correctly uses the past perfect?",
                options: [
                    "When I arrived, they ate dinner",
                    "When I arrived, they were eating dinner",
                    "When I arrived, they had eaten dinner",
                    "When I arrived, they have eaten dinner"
                ],
                correctAnswer: 2,
                hintFr: "Past perfect pour une action antérieure à une autre action passée.",
                hintEn: "Past perfect for action before another past action."
            },
            {
                questionFr: "Complétez : 'This time next week, I ___ on the beach.'",
                questionEn: "Complete: 'This time next week, I ___ on the beach.'",
                options: [
                    "will lie",
                    "will be lying",
                    "will have lain",
                    "lie"
                ],
                correctAnswer: 1,
                hintFr: "Future continuous pour une action en cours à un moment futur précis.",
                hintEn: "Future continuous for action in progress at specific future time."
            },
            {
                questionFr: "Quelle phrase montre correctement 'used to' pour une habitude passée ?",
                questionEn: "Which sentence correctly shows 'used to' for past habit?",
                options: [
                    "I use to play tennis",
                    "I was used to play tennis",
                    "I used to play tennis",
                    "I got used to play tennis"
                ],
                correctAnswer: 2,
                hintFr: "'Used to' + base verbale pour les habitudes passées qui n'existent plus.",
                hintEn: "'Used to' + base verb for past habits that no longer exist."
            },
            {
                questionFr: "Identifiez l'erreur : 'I'm knowing the answer'",
                questionEn: "Identify the error: 'I'm knowing the answer'",
                options: [
                    "I'm",
                    "knowing",
                    "the",
                    "answer"
                ],
                correctAnswer: 1,
                hintFr: "'Know' est un verbe d'état qui ne s'utilise généralement pas au continu.",
                hintEn: "'Know' is a stative verb not usually used in continuous."
            },
            {
                questionFr: "Quelle phrase utilise correctement le present perfect continu ?",
                questionEn: "Which sentence correctly uses present perfect continuous?",
                options: [
                    "She has written three letters",
                    "She has been writing for two hours",
                    "She writes letters every day",
                    "She wrote letters yesterday"
                ],
                correctAnswer: 1,
                hintFr: "Présent perfect continu met l'accent sur la durée de l'action.",
                hintEn: "Present perfect continuous emphasizes action duration."
            },
            {
                questionFr: "Choisissez la bonne forme verbale : 'If I ___ you, I would apologize.'",
                questionEn: "Choose the correct verb form: 'If I ___ you, I would apologize.'",
                options: [
                    "am",
                    "was",
                    "were",
                    "will be"
                ],
                correctAnswer: 2,
                hintFr: "Conditionnel type 2 : 'if' + past simple (were pour toutes les personnes), 'would' + base verbale.",
                hintEn: "Second conditional: 'if' + past simple (were for all persons), 'would' + base verb."
            },
            {
                questionFr: "Quelle phrase utilise correctement le futur dans le passé ?",
                questionEn: "Which sentence correctly uses future in the past?",
                options: [
                    "He said he will come",
                    "He said he would come",
                    "He said he comes",
                    "He said he came"
                ],
                correctAnswer: 1,
                hintFr: "Dans le discours rapporté, 'will' devient 'would' quand le verbe principal est au passé.",
                hintEn: "In reported speech, 'will' becomes 'would' when main verb is in past."
            }
        ],
        advanced: [
            {
                questionFr: "Identifiez le temps dans : 'She had been working all day before she went out'",
                questionEn: "Identify the tense in: 'She had been working all day before she went out'",
                options: [
                    "Past Perfect",
                    "Past Perfect Continuous",
                    "Past Continuous",
                    "Present Perfect Continuous"
                ],
                correctAnswer: 1,
                hintFr: "Had + been + -ing pour une action continue antérieure à une autre action passée.",
                hintEn: "Had + been + -ing for continuous action before another past action."
            },
            {
                questionFr: "Quelle phrase utilise correctement le conditionnel mixte ?",
                questionEn: "Which sentence correctly uses a mixed conditional?",
                options: [
                    "If I had studied, I would pass the exam",
                    "If I studied, I would pass the exam",
                    "If I had studied, I would have passed the exam",
                    "If I study, I will pass the exam"
                ],
                correctAnswer: 0,
                hintFr: "Conditionnel mixte = if + past perfect (condition passée), would + base verbale (conséquence présente).",
                hintEn: "Mixed conditional = if + past perfect (past condition), would + base verb (present result)."
            },
            {
                questionFr: "Quelle construction montre un futur perfect continu correct ?",
                questionEn: "Which construction shows correct future perfect continuous?",
                options: [
                    "By 2025, I will work here for 10 years",
                    "By 2025, I will be working here for 10 years",
                    "By 2025, I will have been working here for 10 years",
                    "By 2025, I work here for 10 years"
                ],
                correctAnswer: 2,
                hintFr: "Will + have + been + -ing pour souligner la durée d'une action future.",
                hintEn: "Will + have + been + -ing to emphasize duration of future action."
            },
            {
                questionFr: "Identifiez l'erreur de concordance des temps : 'He said he is coming tomorrow'",
                questionEn: "Identify the tense agreement error: 'He said he is coming tomorrow'",
                options: [
                    "said",
                    "is coming",
                    "tomorrow",
                    "No error"
                ],
                correctAnswer: 1,
                hintFr: "Dans le discours rapporté au passé, 'is coming' devrait devenir 'was coming'.",
                hintEn: "In past reported speech, 'is coming' should become 'was coming'."
            },
            {
                questionFr: "Quelle phrase contient un passé perfect passif correct ?",
                questionEn: "Which sentence contains correct past perfect passive?",
                options: [
                    "The documents had been signed before the meeting",
                    "The documents had being signed before the meeting",
                    "The documents have been signed before the meeting",
                    "The documents were been signed before the meeting"
                ],
                correctAnswer: 0,
                hintFr: "Structure : had + been + participe passé.",
                hintEn: "Structure: had + been + past participle."
            },
            {
                questionFr: "Quelle construction utilise correctement 'would' pour des habitudes passées ?",
                questionEn: "Which construction correctly uses 'would' for past habits?",
                options: [
                    "When I was young, I would go fishing every Sunday",
                    "When I was young, I would have gone fishing every Sunday",
                    "When I was young, I would be going fishing every Sunday",
                    "When I was young, I would to go fishing every Sunday"
                ],
                correctAnswer: 0,
                hintFr: "'Would' + base verbale pour les habitudes passées (équivalent de 'used to').",
                hintEn: "'Would' + base verb for past habits (similar to 'used to')."
            },
            {
                questionFr: "Identifiez la phrase avec une inversion conditionnelle correcte :",
                questionEn: "Identify the sentence with correct conditional inversion:",
                options: [
                    "Were I you, I would accept the offer",
                    "Was I you, I would accept the offer",
                    "If I was you, I would accept the offer",
                    "If I were you, I would accept the offer"
                ],
                correctAnswer: 0,
                hintFr: "Inversion formelle = Were + sujet + complément (sans 'if').",
                hintEn: "Formal inversion = Were + subject + complement (no 'if')."
            },
            {
                questionFr: "Quelle phrase montre un présent historique correct ?",
                questionEn: "Which sentence shows correct historical present?",
                options: [
                    "In 1945, the war ends",
                    "In 1945, the war ended",
                    "In 1945, the war has ended",
                    "In 1945, the war was ending"
                ],
                correctAnswer: 0,
                hintFr: "Le présent historique utilise le présent simple pour des événements passés (style narratif).",
                hintEn: "Historical present uses simple present for past events (narrative style)."
            },
            {
                questionFr: "Quelle construction utilise correctement 'was/were to + infinitif' pour exprimer le destin ?",
                questionEn: "Which construction correctly uses 'was/were to + infinitive' to express fate?",
                options: [
                    "He was to become a great leader",
                    "He was becoming a great leader",
                    "He would become a great leader",
                    "He became to be a great leader"
                ],
                correctAnswer: 0,
                hintFr: "'Was/were to + infinitif' exprime un destin ou un plan officiel.",
                hintEn: "'Was/were to + infinitive' expresses fate or official plan."
            },
            {
                questionFr: "Identifiez la phrase avec un gérondif parfait correct :",
                questionEn: "Identify the sentence with correct perfect gerund:",
                options: [
                    "He regretted to have said those words",
                    "He regretted having said those words",
                    "He regretted to say those words",
                    "He regretted said those words"
                ],
                correctAnswer: 1,
                hintFr: "Having + participe passé après certains verbes (regret, admit...) pour une action antérieure.",
                hintEn: "Having + past participle after certain verbs (regret, admit...) for prior action."
            }
        ],
        expert: [
            {
                questionFr: "Quelle est la forme correcte du futur dans le passé pour : 'He says he will come' ?",
                questionEn: "What is the correct future in the past form of: 'He says he will come'?",
                options: [
                    "He said he will come",
                    "He said he would come",
                    "He said he comes",
                    "He said he came"
                ],
                correctAnswer: 1,
                hintFr: "Dans le discours rapporté au passé, 'will' devient 'would' (backshift).",
                hintEn: "In past reported speech, 'will' becomes 'would' (backshift)."
            },
            {
                questionFr: "Identifiez l'utilisation du présent simple dans : 'The train leaves at 8 pm'",
                questionEn: "Identify the use of present simple in: 'The train leaves at 8 pm'",
                options: [
                    "Habit",
                    "Timetabled future event",
                    "General truth",
                    "Current action"
                ],
                correctAnswer: 1,
                hintFr: "Le présent simple pour les horaires officiels (trains, vols, etc.).",
                hintEn: "Present simple for official schedules (trains, flights, etc.)."
            },
            {
                questionFr: "Quelle phrase contient un passé prospectif correct ?",
                questionEn: "Which sentence contains correct prospective past?",
                options: [
                    "He was about to leave when the phone rang",
                    "He was leaving when the phone rang",
                    "He left when the phone rang",
                    "He had left when the phone rang"
                ],
                correctAnswer: 0,
                hintFr: "'Was/were about to' exprime une action imminente interrompue.",
                hintEn: "'Was/were about to' expresses interrupted imminent action."
            },
            {
                questionFr: "Identifiez l'utilisation de 'would' dans : 'In his youth, he would walk 10 miles daily'",
                questionEn: "Identify the use of 'would' in: 'In his youth, he would walk 10 miles daily'",
                options: [
                    "Conditional",
                    "Past habit",
                    "Future in the past",
                    "Polite request"
                ],
                correctAnswer: 1,
                hintFr: "'Would' + base verbale pour décrire des habitudes passées (style narratif).",
                hintEn: "'Would' + base verb to describe past habits (narrative style)."
            },
            {
                questionFr: "Quelle construction montre un futur perfect passif correct ?",
                questionEn: "Which construction shows correct future perfect passive?",
                options: [
                    "The project will have been completed by Friday",
                    "The project will be have completed by Friday",
                    "The project will have completed by Friday",
                    "The project will be being completed by Friday"
                ],
                correctAnswer: 0,
                hintFr: "Structure : will + have + been + participe passé.",
                hintEn: "Structure: will + have + been + past participle."
            },
            {
                questionFr: "Identifiez la nuance exprimée par : 'I was hoping you could help me'",
                questionEn: "Identify the nuance in: 'I was hoping you could help me'",
                options: [
                    "Regret about past inability",
                    "Polite tentative request",
                    "Past continuous action",
                    "Hypothetical condition"
                ],
                correctAnswer: 1,
                hintFr: "Le past continuous atténue la demande (plus poli que 'I hope').",
                hintEn: "Past continuous softens the request (more polite than 'I hope')."
            },
            {
                questionFr: "Quelle phrase utilise correctement 'was to have + participe' ?",
                questionEn: "Which sentence correctly uses 'was to have + past participle'?",
                options: [
                    "He was to have arrived by noon (but didn't)",
                    "He was to arrive by noon (and did)",
                    "He was having arrived by noon",
                    "He had been to arrive by noon"
                ],
                correctAnswer: 0,
                hintFr: "Construction exprimant un plan non réalisé dans le passé.",
                hintEn: "Structure expressing unfulfilled past plan."
            },
            {
                questionFr: "Analysez l'aspect verbal dans : 'She has been being interviewed all morning'",
                questionEn: "Analyze the verbal aspect in: 'She has been being interviewed all morning'",
                options: [
                    "Present perfect continuous passive",
                    "Present perfect passive",
                    "Past perfect continuous passive",
                    "Present continuous passive"
                ],
                correctAnswer: 0,
                hintFr: "Structure rare : have + been + being + participe passé (accent sur la durée).",
                hintEn: "Rare structure: have + been + being + past participle (emphasizes duration)."
            },
            {
                questionFr: "Quelle construction exprime une hypothèse contrefactuelle passée ?",
                questionEn: "Which construction expresses past counterfactual hypothesis?",
                options: [
                    "If only I had studied harder",
                    "If I study harder",
                    "If I studied harder",
                    "If I was studying harder"
                ],
                correctAnswer: 0,
                hintFr: "'If only' + past perfect exprime un regret sur une action passée non réalisée.",
                hintEn: "'If only' + past perfect expresses regret about unfulfilled past action."
            },
            {
                questionFr: "Identifiez la fonction de 'should' dans : 'It's odd that he should say that'",
                questionEn: "Identify the function of 'should' in: 'It's odd that he should say that'",
                options: [
                    "Obligation",
                    "Subjunctive equivalent",
                    "Future in the past",
                    "Conditional"
                ],
                correctAnswer: 1,
                hintFr: "'Should' comme substitut du subjonctif après des expressions d'émotion.",
                hintEn: "'Should' as subjunctive substitute after emotional expressions."
            }
        ]
    },
    vocabulary: {
        beginner: [
            {
                questionFr: "Quel est le synonyme de 'happy' ?",
                questionEn: "What is a synonym for 'happy'?",
                options: ["sad", "joyful", "angry", "tired"],
                correctAnswer: 1,
                hintFr: "Un synonyme signifie presque la même chose.",
                hintEn: "A synonym means nearly the same thing."
            },
            {
                questionFr: "Quel est le contraire de 'expensive' ?",
                questionEn: "What is the opposite of 'expensive'?",
                options: ["cheap", "dear", "costly", "valuable"],
                correctAnswer: 0,
                hintFr: "Cherchez le mot qui décrit un prix bas.",
                hintEn: "Look for the word describing low price."
            },
            {
                questionFr: "Quel mot correspond à ce dessin [image de pluie] ?",
                questionEn: "Which word matches this picture [rain image]?",
                options: ["sun", "rain", "wind", "snow"],
                correctAnswer: 1,
                hintFr: "Gouttes d'eau qui tombent du ciel.",
                hintEn: "Water drops falling from the sky."
            },
            {
                questionFr: "Trouvez l'intrus dans cette liste :",
                questionEn: "Find the odd one out:",
                options: ["apple", "banana", "carrot", "orange"],
                correctAnswer: 2,
                hintFr: "Les autres sont des fruits.",
                hintEn: "Others are fruits."
            },
            {
                questionFr: "Comment dit-on 'chien' en anglais ?",
                questionEn: "How do you say 'chien' in English?",
                options: ["cat", "dog", "bird", "fish"],
                correctAnswer: 1,
                hintFr: "Animal qui aboie.",
                hintEn: "Animal that barks."
            },
            {
                questionFr: "Quel mot complète la phrase : 'Je porte une ___ rouge' (vêtement)",
                questionEn: "Which word completes: 'I wear a red ___' (clothing)",
                options: ["apple", "shirt", "car", "book"],
                correctAnswer: 1,
                hintFr: "Vêtement pour le haut du corps.",
                hintEn: "Clothing for upper body."
            },
            {
                questionFr: "Associez le mot à sa catégorie : 'pencil'",
                questionEn: "Match the word to its category: 'pencil'",
                options: ["food", "animal", "school object", "clothing"],
                correctAnswer: 2,
                hintFr: "On l'utilise pour écrire.",
                hintEn: "Used for writing."
            },
            {
                questionFr: "Quel est le mot correct pour ce dessin [image de maison] ?",
                questionEn: "What's the correct word for this picture [house image]?",
                options: ["tree", "house", "car", "table"],
                correctAnswer: 1,
                hintFr: "Endroit où on habite.",
                hintEn: "Place where people live."
            },
            {
                questionFr: "Trouvez le verbe dans cette liste :",
                questionEn: "Find the verb in this list:",
                options: ["run", "blue", "table", "happy"],
                correctAnswer: 0,
                hintFr: "Mot qui décrit une action.",
                hintEn: "Word describing an action."
            },
            {
                questionFr: "Comment dit-on 'merci' en anglais ?",
                questionEn: "How do you say 'merci' in English?",
                options: ["hello", "thank you", "goodbye", "please"],
                correctAnswer: 1,
                hintFr: "On le dit quand quelqu'un nous aide.",
                hintEn: "Said when someone helps you."
            }
        ],
        intermediate: [
            {
                questionFr: "Que signifie 'to look forward to' ?",
                questionEn: "What does 'to look forward to' mean?",
                options: [
                    "to search for",
                    "to anticipate with pleasure",
                    "to watch carefully", 
                    "to ignore"
                ],
                correctAnswer: 1,
                hintFr: "Expression utilisée pour parler d'événements futurs excitants.",
                hintEn: "Used when excited about future events."
            },
            {
                questionFr: "Quel mot ne correspond pas aux autres ?",
                questionEn: "Which word doesn't belong with the others?",
                options: [
                    "apple", 
                    "banana",
                    "carrot",
                    "orange"
                ],
                correctAnswer: 2,
                hintFr: "3 sont des fruits, 1 est un légume.",
                hintEn: "3 are fruits, 1 is a vegetable."
            },
            {
                questionFr: "Que veut dire 'to hit the sack' ?",
                questionEn: "What does 'to hit the sack' mean?",
                options: [
                    "to go to bed",
                    "to play sports",
                    "to clean the house",
                    "to eat quickly"
                ],
                correctAnswer: 0,
                hintFr: "Expression familière concernant le sommeil.",
                hintEn: "Informal expression about sleeping."
            },
            {
                questionFr: "Quel mot complète cette analogie : hot is to cold as happy is to ___",
                questionEn: "Complete this analogy: hot is to cold as happy is to ___",
                options: [
                    "joyful",
                    "sad",
                    "angry",
                    "tired"
                ],
                correctAnswer: 1,
                hintFr: "Cherchez le contraire de 'happy'.",
                hintEn: "Find the opposite of 'happy'."
            },
            {
                questionFr: "Que signifie 'bittersweet' ?",
                questionEn: "What does 'bittersweet' mean?",
                options: [
                    "very sweet",
                    "both happy and sad",
                    "not sweet at all",
                    "a type of chocolate"
                ],
                correctAnswer: 1,
                hintFr: "Décrit une situation avec des émotions mélangées.",
                hintEn: "Describes mixed emotions."
            },
            {
                questionFr: "Quel est le sens figuré de 'to have a sweet tooth' ?",
                questionEn: "What is the figurative meaning of 'to have a sweet tooth'?",
                options: [
                    "to have dental problems",
                    "to love sugary foods",
                    "to be very kind",
                    "to have white teeth"
                ],
                correctAnswer: 1,
                hintFr: "Expression sur les préférences alimentaires.",
                hintEn: "Expression about food preferences."
            },
            {
                questionFr: "Trouvez les deux mots synonymes :",
                questionEn: "Find the two synonyms:",
                options: [
                    "big / small",
                    "smart / intelligent",
                    "happy / angry",
                    "fast / slow"
                ],
                correctAnswer: 1,
                hintFr: "Les deux mots signifient 'intelligent'.",
                hintEn: "Both mean 'intelligent'."
            },
            {
                questionFr: "Que veut dire 'it's raining cats and dogs' ?",
                questionEn: "What does 'it's raining cats and dogs' mean?",
                options: [
                    "animals are falling from the sky",
                    "it's raining heavily",
                    "there are many stray animals",
                    "it's not really raining"
                ],
                correctAnswer: 1,
                hintFr: "Expression imagée sur la météo.",
                hintEn: "Colorful weather expression."
            },
            {
                questionFr: "Quel mot décrit le mieux cette image [photo de désert] ?",
                questionEn: "Which word best describes this picture [desert photo]?",
                options: [
                    "humid",
                    "arid",
                    "frozen",
                    "crowded"
                ],
                correctAnswer: 1,
                hintFr: "Environnement très sec avec peu de végétation.",
                hintEn: "Very dry environment with little vegetation."
            },
            {
                questionFr: "Quelle expression signifie 'annuler' ?",
                questionEn: "Which expression means 'to cancel'?",
                options: [
                    "to call off",
                    "to call in",
                    "to call out",
                    "to call up"
                ],
                correctAnswer: 0,
                hintFr: "Verbe à particule courant (phrasal verb).",
                hintEn: "Common phrasal verb."
            }
        ],
        advanced: [
            {
                questionFr: "Quelle est la signification de 'to beat around the bush' ?",
                questionEn: "What is the meaning of 'to beat around the bush'?",
                options: [
                    "to dance in nature",
                    "to avoid the main topic",
                    "to hit plants",
                    "to run quickly"
                ],
                correctAnswer: 1,
                hintFr: "Origine : la chasse aux oiseaux où on battait les buissons pour les faire sortir.",
                hintEn: "Origin: hunting practice of beating bushes to flush out birds."
            },
            {
                questionFr: "Quel mot signifie 'extrêmement froid' ?",
                questionEn: "Which word means 'extremely cold'?",
                options: [
                    "chilly",    // légèrement froid
                    "frigid",    // extrêmement froid (correct)
                    "cool",      // frais
                    "brisk"      // vivifiant
                ],
                correctAnswer: 1,
                hintFr: "Terme souvent utilisé pour décrire les pôles ou les glaciers.",
                hintEn: "Often used to describe polar regions or glaciers."
            },
            {
                questionFr: "Que signifie 'to be at loggerheads' ?",
                questionEn: "What does 'to be at loggerheads' mean?",
                options: [
                    "to be in violent agreement",
                    "to be in stubborn disagreement",
                    "to be extremely happy",
                    "to feel physically ill"
                ],
                correctAnswer: 1,
                hintFr: "Origine obscure - peut-être lié aux outils de combat (logger = bûcheron).",
                hintEn: "Obscure origin - possibly related to combat tools (logger = lumberjack)."
            },
            {
                questionFr: "Quel terme décrit une 'peur irrationnelle des espaces ouverts' ?",
                questionEn: "Which term describes 'irrational fear of open spaces'?",
                options: [
                    "claustrophobia",
                    "agoraphobia",
                    "acrophobia",
                    "xenophobia"
                ],
                correctAnswer: 1,
                hintFr: "Du grec 'agora' (place publique) + 'phobos' (peur).",
                hintEn: "From Greek 'agora' (public square) + 'phobos' (fear)."
            },
            {
                questionFr: "Que veut dire 'sesquipedalian' dans ce contexte : 'sesquipedalian vocabulary' ?",
                questionEn: "What does 'sesquipedalian' mean in: 'sesquipedalian vocabulary'?",
                options: [
                    "very simple",
                    "overly long/complex",
                    "scientific",
                    "foreign"
                ],
                correctAnswer: 1,
                hintFr: "Littéralement 'un pied et demi' en latin - mots démesurément longs.",
                hintEn: "Literally 'a foot and a half' in Latin - overly long words."
            },
            {
                questionFr: "Quelle expression signifie 'se préparer à l'échec' ?",
                questionEn: "Which phrase means 'preparing for failure'?",
                options: [
                    "to hedge one's bets",
                    "to hit the jackpot",
                    "to strike gold",
                    "to face the music"
                ],
                correctAnswer: 0,
                hintFr: "Origine : les haies (hedges) comme protection en jardinage.",
                hintEn: "Origin: hedges as protective barriers in gardening."
            },
            {
                questionFr: "Quel mot décrit le mieux un 'changement soudain de pouvoir' ?",
                questionEn: "Which word best describes 'sudden power shift'?",
                options: [
                    "coup",
                    "revolution",
                    "election",
                    "transition"
                ],
                correctAnswer: 0,
                hintFr: "Abréviation de 'coup d'État' - emprunt français.",
                hintEn: "Short for 'coup d'État' - French borrowing."
            },
            {
                questionFr: "Que signifie 'to gild the lily' ?",
                questionEn: "What does 'to gild the lily' mean?",
                options: [
                    "to decorate unnecessarily",
                    "to paint flowers",
                    "to value nature",
                    "to create art"
                ],
                correctAnswer: 0,
                hintFr: "Référence à Shakespeare - orner ce qui est déjà parfait.",
                hintEn: "Shakespeare reference - adorn what's already perfect."
            },
            {
                questionFr: "Quel terme juridique signifie 'de bonne foi' ?",
                questionEn: "Which legal term means 'in good faith'?",
                options: [
                    "bona fide",
                    "quid pro quo",
                    "habeas corpus",
                    "pro bono"
                ],
                correctAnswer: 0,
                hintFr: "Locution latine signifiant 'de bonne foi'.",
                hintEn: "Latin phrase meaning 'in good faith'."
            },
            {
                questionFr: "Que veut dire 'to be hoist with one's own petard' ?",
                questionEn: "What does 'to be hoist with one's own petard' mean?",
                options: [
                    "to be physically lifted",
                    "to be harmed by one's own plan",
                    "to celebrate victory",
                    "to ignore danger"
                ],
                correctAnswer: 1,
                hintFr: "Référence shakespearienne - un petard était une petite bombe.",
                hintEn: "Shakespeare reference - petard was a small bomb."
            }
        ],
        expert: [
            {
                questionFr: "Quelle est la différence entre 'historic' et 'historical' ?",
                questionEn: "What is the difference between 'historic' and 'historical'?",
                options: [
                    "'Historic' signifie important dans l'histoire, 'historical' se rapporte à l'histoire",
                    "Ils sont interchangeables",
                    "'Historical' signifie important dans l'histoire, 'historic' se rapporte à l'histoire",
                    "Il n'y a pas de différence"
                ],
                correctAnswer: 0,
                hintFr: "Un événement 'historic' change le cours de l'histoire, alors que 'historical' est neutre.",
                hintEn: "'Historic' events change history's course, while 'historical' is neutral."
            },
            {
                questionFr: "Quel est le terme technique pour 'un mot qui imite un son' ?",
                questionEn: "What is the technical term for 'a word that imitates a sound'?",
                options: [
                    "onomatopoeia",
                    "alliteration",
                    "metaphor",
                    "simile"
                ],
                correctAnswer: 0,
                hintFr: "Exemple : 'crac' en français ou 'splash' en anglais.",
                hintEn: "Example: 'boom' in English or 'plouf' in French."
            },
            {
                questionFr: "Quel terme décrit un mot qui a deux sens opposés (ex: 'sanction') ?",
                questionEn: "Which term describes a word with two opposite meanings (e.g. 'sanction')?",
                options: [
                    "antonomasia",
                    "contronym",
                    "eponym",
                    "heteronym"
                ],
                correctAnswer: 1,
                hintFr: "Du latin 'contra' (contre) + 'nym' (nom). 'Sanction' peut signifier punir ou approuver.",
                hintEn: "From Latin 'contra' (against) + 'nym' (name). 'Sanction' can mean punish or approve."
            },
            {
                questionFr: "Qu'est-ce qu'un 'ghost word' ?",
                questionEn: "What is a 'ghost word'?",
                options: [
                    "Un mot effrayant",
                    "Un mot créé par erreur dans les dictionnaires",
                    "Un mot désuet",
                    "Un mot intraduisible"
                ],
                correctAnswer: 1,
                hintFr: "Exemple : 'dord' apparu dans le Webster's en 1934 par erreur de typographie.",
                hintEn: "Example: 'dord' appeared in Webster's 1934 due to a typesetting error."
            },
            {
                questionFr: "Quel terme décrit l'évolution sémantique négative d'un mot ?",
                questionEn: "Which term describes negative semantic evolution of a word?",
                options: [
                    "amelioration",
                    "pejoration",
                    "neologism",
                    "archaism"
                ],
                correctAnswer: 1,
                hintFr: "Exemple : 'silly' signifiait 'heureux' en vieil anglais avant de devenir 'stupide'.",
                hintEn: "Example: 'silly' meant 'happy' in Old English before becoming 'foolish'."
            },
            {
                questionFr: "Quel est le nom de la peur des mots longs ?",
                questionEn: "What is the fear of long words called?",
                options: [
                    "hippopotomonstrosesquipedaliophobia",
                    "antidisestablishmentarianism",
                    "pneumonoultramicroscopicsilicovolcanoconiosis",
                    "supercalifragilisticexpialidocious"
                ],
                correctAnswer: 0,
                hintFr: "Ironiquement, le mot est extrêmement long (35 lettres).",
                hintEn: "Ironically, the word itself is extremely long (35 letters)."
            },
            {
                questionFr: "Que signifie 'ultracrepidarian' ?",
                questionEn: "What does 'ultracrepidarian' mean?",
                options: [
                    "Qui donne des avis hors de sa compétence",
                    "Qui marche pieds nus",
                    "Qui crée des mots nouveaux",
                    "Qui étudie les anciennes chaussures"
                ],
                correctAnswer: 0,
                hintFr: "Du latin 'ultra' (au-delà) + 'crepidam' (soulier), référence au peintre Apelle.",
                hintEn: "From Latin 'ultra' (beyond) + 'crepidam' (sandal), referencing painter Apelles."
            },
            {
                questionFr: "Quel terme linguistique décrit 'l'étude des inscriptions anciennes' ?",
                questionEn: "Which linguistic term means 'study of ancient inscriptions'?",
                options: [
                    "etymology",
                    "epigraphy",
                    "paleography",
                    "orthography"
                ],
                correctAnswer: 1,
                hintFr: "Diffère de la paléographie qui étudie les écritures manuscrites anciennes.",
                hintEn: "Differs from paleography which studies ancient handwriting."
            },
            {
                questionFr: "Qu'est-ce qu'un 'eggcorn' en linguistique ?",
                questionEn: "What is an 'eggcorn' in linguistics?",
                options: [
                    "Une erreur de prononciation comique",
                    "Une substitution plausible mais incorrecte d'un mot ou d'une expression",
                    "Un type particulier de métaphore",
                    "Un mot-valise"
                ],
                correctAnswer: 1,
                hintFr: "Exemple : dire 'eggcorn' au lieu de 'acorn' (gland en anglais).",
                hintEn: "Example: saying 'eggcorn' instead of 'acorn'."
            },
            {
                questionFr: "Quel terme décrit un mot spécifique à une langue et intraduisible ?",
                questionEn: "Which term describes a language-specific untranslatable word?",
                options: [
                    "loanword",
                    "calque",
                    "cultural word",
                    "untranslatable"
                ],
                correctAnswer: 3,
                hintFr: "Exemple : 'saudade' en portugais ou 'hygge' en danois.",
                hintEn: "Example: Portuguese 'saudade' or Danish 'hygge'."
            }
        ]
    },
    reading: {
        beginner: [
            {
              questionFr: "Lisez le texte : 'John is a teacher. He works at a school. He likes his job.' Quelle est la profession de John ?",
              questionEn: "Read the text: 'John is a teacher. He works at a school. He likes his job.' What is John's profession?",
              options: ["Doctor", "Teacher", "Engineer", "Student"],
              correctAnswer: 1,
              hintFr: "Regardez la première phrase du texte.",
              hintEn: "Look at the first sentence of the text."
            },
            {
              questionFr: "D'après le texte : 'It's raining today. Mary has an umbrella but Peter doesn't.' Qui est préparé pour la pluie ?",
              questionEn: "According to the text: 'It's raining today. Mary has an umbrella but Peter doesn't.' Who is prepared for the rain?",
              options: ["Mary", "Peter", "Both", "Neither"],
              correctAnswer: 0,
              hintFr: "Cherchez qui a un parapluie.",
              hintEn: "Look for who has an umbrella."
            },
            {
              questionFr: "Lisez le texte : 'Sarah a un chien. Son chien s'appelle Max. Il est très joueur.' Quel est le nom du chien de Sarah ?",
              questionEn: "Read the text: 'Sarah has a dog. Her dog's name is Max. He is very playful.' What is the name of Sarah's dog?",
              options: ["Bobby", "Max", "Charlie", "Rocky"],
              correctAnswer: 1,
              hintFr: "Regardez la deuxième phrase.",
              hintEn: "Look at the second sentence."
            },
            {
              questionFr: "D'après le texte : 'Tom et Lisa vont au parc. Ils jouent au football.' Où vont Tom et Lisa ?",
              questionEn: "According to the text: 'Tom and Lisa go to the park. They play football.' Where do Tom and Lisa go?",
              options: ["À l'école", "Au parc", "Au supermarché", "À la maison"],
              correctAnswer: 1,
              hintFr: "Regardez la première phrase.",
              hintEn: "Look at the first sentence."
            },
            {
              questionFr: "Lisez le texte : 'Le café est chaud. Je ne peux pas le boire maintenant.' Pourquoi la personne ne peut-elle pas boire le café ?",
              questionEn: "Read the text: 'The coffee is hot. I can't drink it now.' Why can't the person drink the coffee?",
              options: ["Il est froid", "Il est chaud", "Il est sucré", "Il est vide"],
              correctAnswer: 1,
              hintFr: "Regardez la première phrase.",
              hintEn: "Look at the first sentence."
            },
            {
              questionFr: "D'après le texte : 'J'ai deux sœurs. Mon frère a 10 ans.' Combien de sœurs a la personne ?",
              questionEn: "According to the text: 'I have two sisters. My brother is 10 years old.' How many sisters does the person have?",
              options: ["1", "2", "3", "10"],
              correctAnswer: 1,
              hintFr: "Regardez la première phrase.",
              hintEn: "Look at the first sentence."
            },
            {
              questionFr: "Lisez le texte : 'Nous mangeons des pizzas. Nous n'aimons pas les hamburgers.' Que mangent les personnes ?",
              questionEn: "Read the text: 'We are eating pizzas. We don't like hamburgers.' What are the people eating?",
              options: ["Hamburgers", "Pizzas", "Salades", "Frites"],
              correctAnswer: 1,
              hintFr: "Regardez la première phrase.",
              hintEn: "Look at the first sentence."
            },
            {
              questionFr: "D'après le texte : 'La bibliothèque ouvre à 9h. J'arrive à 9h30.' À quelle heure ouvre la bibliothèque ?",
              questionEn: "According to the text: 'The library opens at 9am. I arrive at 9:30am.' What time does the library open?",
              options: ["8h", "9h", "9h30", "10h"],
              correctAnswer: 1,
              hintFr: "Regardez la première phrase.",
              hintEn: "Look at the first sentence."
            },
            {
              questionFr: "Lisez le texte : 'Mon sac est lourd. Il contient cinq livres.' Pourquoi le sac est-il lourd ?",
              questionEn: "Read the text: 'My bag is heavy. It contains five books.' Why is the bag heavy?",
              options: ["Il est vide", "Il a des livres", "Il est petit", "Il est neuf"],
              correctAnswer: 1,
              hintFr: "Regardez la deuxième phrase.",
              hintEn: "Look at the second sentence."
            },
            {
              questionFr: "D'après le texte : 'Il fait froid dehors. Je porte un manteau.' Pourquoi la personne porte-t-elle un manteau ?",
              questionEn: "According to the text: 'It's cold outside. I'm wearing a coat.' Why is the person wearing a coat?",
              options: ["Il fait chaud", "Il pleut", "Il fait froid", "C'est la mode"],
              correctAnswer: 2,
              hintFr: "Regardez la première phrase.",
              hintEn: "Look at the first sentence."
            }
          ],
          intermediate: [
            {
              questionFr: "Lisez : 'The meeting was postponed due to unforeseen circumstances.' Pourquoi la réunion a-t-elle été reportée ?",
              questionEn: "Read: 'The meeting was postponed due to unforeseen circumstances.' Why was the meeting postponed?",
              options: ["Because of bad weather", "Because of unexpected events", "Because no one came", "Because it wasn't important"],
              correctAnswer: 1,
              hintFr: "'Unforeseen circumstances' signifie des événements imprévus.",
              hintEn: "'Unforeseen circumstances' means unexpected events."
            },
            {
              questionFr: "D'après : 'While Tom prefers coffee, his wife always drinks tea.' Quelle est l'attitude de la femme de Tom envers le café ?",
              questionEn: "According to: 'While Tom prefers coffee, his wife always drinks tea.' What is Tom's wife's attitude toward coffee?",
              options: ["She hates it", "She prefers tea", "She sometimes drinks it", "The text doesn't say"],
              correctAnswer: 3,
              hintFr: "Le texte ne mentionne pas son opinion sur le café, seulement qu'elle boit toujours du thé.",
              hintEn: "The text doesn't mention her opinion about coffee, only that she always drinks tea."
            },
            {
              questionFr: "Lisez : 'The project deadline was extended, much to the team's relief.' Comment l'équipe a-t-elle réagi à la prolongation ?",
              questionEn: "Read: 'The project deadline was extended, much to the team's relief.' How did the team react to the extension?",
              options: ["With anger", "With relief", "With indifference", "With confusion"],
              correctAnswer: 1,
              hintFr: "Cherchez le mot qui décrit l'émotion de l'équipe.",
              hintEn: "Look for the word describing the team's emotion."
            },
            {
              questionFr: "D'après : 'Despite the rain, the outdoor concert proceeded as planned.' Que peut-on déduire sur le concert ?",
              questionEn: "According to: 'Despite the rain, the outdoor concert proceeded as planned.' What can be inferred about the concert?",
              options: ["It was canceled", "It happened anyway", "It was moved indoors", "It was postponed"],
              correctAnswer: 1,
              hintFr: "'Despite' indique une opposition entre la pluie et le déroulement du concert.",
              hintEn: "'Despite' indicates opposition between the rain and the concert happening."
            },
            {
              questionFr: "Lisez : 'The restaurant, renowned for its seafood, unexpectedly served vegetarian dishes only that evening.' Quelle était la particularité du restaurant ce soir-là ?",
              questionEn: "Read: 'The restaurant, renowned for its seafood, unexpectedly served vegetarian dishes only that evening.' What was special about the restaurant that evening?",
              options: ["It was closed", "It served only seafood", "It served only vegetarian food", "It changed its name"],
              correctAnswer: 2,
              hintFr: "Cherchez ce qui était 'unexpected' (inattendu) par rapport à la réputation du restaurant.",
              hintEn: "Look for what was 'unexpected' compared to the restaurant's reputation."
            },
            {
              questionFr: "D'après : 'The instructions were ambiguous, leading to multiple interpretations.' Quel était le problème avec les instructions ?",
              questionEn: "According to: 'The instructions were ambiguous, leading to multiple interpretations.' What was the problem with the instructions?",
              options: ["They were too long", "They were unclear", "They were in another language", "They were missing"],
              correctAnswer: 1,
              hintFr: "'Ambiguous' signifie qu'elles prêtaient à confusion.",
              hintEn: "'Ambiguous' means they were unclear."
            },
            {
              questionFr: "Lisez : 'The CEO emphasized sustainability, yet the company continued using non-recyclable materials.' Quelle contradiction est présentée ici ?",
              questionEn: "Read: 'The CEO emphasized sustainability, yet the company continued using non-recyclable materials.' What contradiction is presented here?",
              options: [
                "Between words and actions",
                "Between two executives",
                "Between different departments",
                "There is no contradiction"
              ],
              correctAnswer: 0,
              hintFr: "Cherchez la différence entre ce que le CEO a dit et ce que l'entreprise a fait.",
              hintEn: "Look for the difference between what the CEO said and what the company did."
            },
            {
              questionFr: "D'après : 'The novel, though critically acclaimed, failed to attract a wide readership.' Quelle est la situation paradoxale concernant ce roman ?",
              questionEn: "According to: 'The novel, though critically acclaimed, failed to attract a wide readership.' What is the paradoxical situation about this novel?",
              options: [
                "It was popular but poorly written",
                "It was praised but not widely read",
                "It was long but interesting",
                "It was expensive but sold well"
              ],
              correctAnswer: 1,
              hintFr: "Cherchez la différence entre la réception critique et le succès public.",
              hintEn: "Look for the difference between critical reception and public success."
            },
            {
              questionFr: "Lisez : 'The museum waived admission fees temporarily to encourage more visitors.' Quel était le but de cette mesure ?",
              questionEn: "Read: 'The museum waived admission fees temporarily to encourage more visitors.' What was the purpose of this measure?",
              options: [
                "To make more money",
                "To attract more visitors",
                "To reduce staff workload",
                "To prepare for renovation"
              ],
              correctAnswer: 1,
              hintFr: "Regardez la partie finale de la phrase après 'to'.",
              hintEn: "Look at the final part of the sentence after 'to'."
            },
            {
              questionFr: "D'après : 'The researchers' findings were preliminary, requiring further verification before publication.' Que peut-on déduire sur ces résultats ?",
              questionEn: "According to: 'The researchers' findings were preliminary, requiring further verification before publication.' What can be inferred about these findings?",
              options: [
                "They were final and complete",
                "They needed more confirmation",
                "They were already published",
                "They were rejected"
              ],
              correctAnswer: 1,
              hintFr: "'Preliminary' et 'requiring further verification' indiquent que les résultats ne sont pas définitifs.",
              hintEn: "'Preliminary' and 'requiring further verification' indicate the results aren't final."
            }
          ],
          advanced: [
            {
              questionFr: "Analysez : 'The author's tone in the passage is best described as...' (Le passage décrit des problèmes sociaux avec des statistiques et des faits, sans émotion)",
              questionEn: "Analyze: 'The author's tone in the passage is best described as...' (The passage describes social issues with statistics and facts, without emotion)",
              options: ["Humorous", "Objective", "Sarcastic", "Enthusiastic"],
              correctAnswer: 1,
              hintFr: "Un ton objectif présente des faits sans émotion.",
              hintEn: "An objective tone presents facts without emotion."
            },
            {
              questionFr: "Quel est le but principal de ce texte : 'Ce manuel explique comment utiliser notre nouveau logiciel en 10 étapes simples.' ?",
              questionEn: "What is the main purpose of this text: 'This manual explains how to use our new software in 10 simple steps.'?",
              options: ["To entertain", "To persuade", "To instruct", "To criticize"],
              correctAnswer: 2,
              hintFr: "Les manuels ont généralement pour but d'instruire ou d'expliquer.",
              hintEn: "Manuals are generally meant to instruct or explain."
            },
            {
              questionFr: "Identifiez le procédé rhétorique dominant dans : 'Comme un oiseau en cage, la population vivait sous surveillance constante.'",
              questionEn: "Identify the dominant rhetorical device in: 'Like a caged bird, the population lived under constant surveillance.'",
              options: ["Allitération", "Métaphore", "Comparaison", "Hyperbole"],
              correctAnswer: 2,
              hintFr: "Le texte utilise 'comme' pour établir un parallèle entre deux éléments.",
              hintEn: "The text uses 'like' to draw a parallel between two elements."
            },
            {
              questionFr: "Quelle inférence peut-on tirer de : 'Bien que l'étude ait été financée par l'industrie pharmaceutique, les chercheurs ont maintenu un protocole rigoureux.' ?",
              questionEn: "What inference can be drawn from: 'Although the study was funded by the pharmaceutical industry, the researchers maintained rigorous protocols.'?",
              options: [
                "The results are definitely biased",
                "Funding source doesn't necessarily invalidate methodology",
                "Researchers were pressured to alter results",
                "The study should be disregarded completely"
              ],
              correctAnswer: 1,
              hintFr: "Le mot 'bien que' introduit une concession importante.",
              hintEn: "The word 'although' introduces an important concession."
            },
            {
              questionFr: "Analysez l'argument implicite dans : 'Si même les pays scandinaves, modèles en matière d'égalité, n'ont pas résolu ce problème, qui le pourra ?'",
              questionEn: "Analyze the implicit argument in: 'If even Scandinavian countries, models of equality, haven't solved this issue, who can?'",
              options: [
                "The problem is unsolvable",
                "Scandinavian countries are overrated",
                "Other countries should try harder",
                "The speaker is Scandinavian"
              ],
              correctAnswer: 0,
              hintFr: "L'argument utilise une référence extrême pour suggérer l'impossibilité.",
              hintEn: "The argument uses an extreme reference to suggest impossibility."
            },
            {
              questionFr: "Quelle est la fonction du dernier paragraphe dans un texte qui présente d'abord des théories contradictoires puis propose une nouvelle approche ?",
              questionEn: "What is the function of the final paragraph in a text that first presents conflicting theories then proposes a new approach?",
              options: [
                "To summarize the conflicts",
                "To introduce the author's solution",
                "To list references",
                "To pose new questions"
              ],
              correctAnswer: 1,
              hintFr: "Dans une structure argumentative classique, la conclusion présente souvent la position de l'auteur.",
              hintEn: "In classic argumentative structure, the conclusion often presents the author's position."
            },
            {
              questionFr: "Comment interpréter : 'Les chiffres suggèrent une tendance, mais il convient de les contextualiser avant de tirer des conclusions.' ?",
              questionEn: "How to interpret: 'The numbers suggest a trend, but they need contextualizing before drawing conclusions.'?",
              options: [
                "The data is completely unreliable",
                "Statistics alone aren't sufficient for analysis",
                "The trend is definitely accurate",
                "Context will disprove the trend"
              ],
              correctAnswer: 1,
              hintFr: "Le mot 'mais' introduit une limitation importante à la valeur des chiffres.",
              hintEn: "The word 'but' introduces an important limitation to the data's value."
            },
            {
              questionFr: "Quelle stratégie argumentative est employée dans : 'Non seulement cette politique a échoué ailleurs, mais elle coûterait des milliards à implémenter ici.' ?",
              questionEn: "What argumentative strategy is used in: 'Not only has this policy failed elsewhere, but it would cost billions to implement here.'?",
              options: [
                "Appel à l'autorité",
                "Empilement d'arguments négatifs",
                "Comparaison historique",
                "Appel à l'émotion"
              ],
              correctAnswer: 1,
              hintFr: "La structure 'non seulement... mais aussi' accumule des points négatifs.",
              hintEn: "The 'not only... but also' structure accumulates negative points."
            },
            {
              questionFr: "Identifiez le biais dans : 'Tous mes amis détestent ce politicien, donc il est impopulaire dans tout le pays.'",
              questionEn: "Identify the bias in: 'All my friends hate this politician, so he's unpopular nationwide.'",
              options: [
                "Biais de confirmation",
                "Généralisation abusive",
                "Biais de survivance",
                "Appel à la tradition"
              ],
              correctAnswer: 1,
              hintFr: "L'argument extrapole indûment d'un échantillon très limité.",
              hintEn: "The argument improperly extrapolates from a very limited sample."
            },
            {
              questionFr: "Quelle technique de persuasion est utilisée dans : 'Imaginez un monde sans ce problème - c'est possible si vous soutenez notre cause.' ?",
              questionEn: "What persuasion technique is used in: 'Imagine a world without this problem - it's possible if you support our cause.'?",
              options: [
                "Appel à la peur",
                "Visualisation positive",
                "Argument d'autorité",
                "Fausse dichotomie"
              ],
              correctAnswer: 1,
              hintFr: "Le texte invite le lecteur à se projeter dans un scénario idéal.",
              hintEn: "The text invites the reader to envision an ideal scenario."
            }
          ],
          expert: [
            {
              questionFr: "Dans le passage suivant, quelle technique rhétorique est utilisée : 'Ask not what your country can do for you - ask what you can do for your country.' ?",
              questionEn: "In the following passage, what rhetorical technique is used: 'Ask not what your country can do for you - ask what you can do for your country.'?",
              options: ["Metaphor", "Alliteration", "Chiasmus", "Hyperbole"],
              correctAnswer: 2,
              hintFr: "Le chiasmus est une inversion de structure dans des clauses parallèles.",
              hintEn: "Chiasmus is an inversion of structure in parallel clauses."
            },
            {
              questionFr: "Quelle inférence peut-on faire à partir de : 'Bien que l'étude ait été menée avec soin, certains scientifiques remettent en question ses conclusions.' ?",
              questionEn: "What inference can be made from: 'Although the study was conducted carefully, some scientists question its conclusions.'?",
              options: ["The study was poorly done", "All scientists agree with the study", "The findings are universally accepted", "There is some controversy about the results"],
              correctAnswer: 3,
              hintFr: "Le fait que certains scientifiques remettent en question les conclusions implique une certaine controverse.",
              hintEn: "The fact that some scientists question the conclusions implies some controversy."
            },
            {
              questionFr: "Analysez la stratégie argumentative dans : 'Ce n'est pas simplement une erreur; c'est une trahison des principes fondamentaux de notre démocratie.'",
              questionEn: "Analyze the argumentative strategy in: 'This isn't just a mistake; it's a betrayal of our democracy's fundamental principles.'",
              options: ["Minimization", "False equivalence", "Moral framing", "Appeal to authority"],
              correctAnswer: 2,
              hintFr: "L'argument recadre le sujet en termes de valeurs morales absolues.",
              hintEn: "The argument reframes the issue in terms of absolute moral values."
            },
            {
              questionFr: "Identifiez le paradoxe dans : 'La seule constante est le changement lui-même.'",
              questionEn: "Identify the paradox in: 'The only constant is change itself.'",
              options: ["Oxymoron", "Circular reasoning", "Self-contradictory statement", "All of the above"],
              correctAnswer: 3,
              hintFr: "Un paradoxe apparent existe entre 'constant' et 'changement'.",
              hintEn: "An apparent paradox exists between 'constant' and 'change'."
            },
            {
              questionFr: "Quelle est la fonction discursive de : 'Pour reprendre les mots de Tocqueville...' dans un texte argumentatif ?",
              questionEn: "What is the discursive function of: 'To quote Tocqueville...' in an argumentative text?",
              options: ["Establish authority", "Provide counterargument", "Change subject", "Conclude discussion"],
              correctAnswer: 0,
              hintFr: "Les citations d'auteurs reconnus servent souvent à légitimer un argument.",
              hintEn: "Quoting recognized authors often serves to legitimize an argument."
            },
            {
              questionFr: "Quel biais cognitif est illustré par : 'Je n'ai jamais rencontré personne qui soutient cette politique, donc elle est impopulaire.' ?",
              questionEn: "Which cognitive bias is illustrated by: 'I've never met anyone who supports this policy, so it must be unpopular.'?",
              options: ["Confirmation bias", "Availability heuristic", "False consensus effect", "Hindsight bias"],
              correctAnswer: 1,
              hintFr: "Le jugement est basé sur des exemples immédiatement disponibles plutôt que des données représentatives.",
              hintEn: "The judgment is based on immediately available examples rather than representative data."
            },
            {
              questionFr: "Analysez la structure logique de : 'Si A est vrai, alors B. Or, B est faux, donc A est faux.'",
              questionEn: "Analyze the logical structure of: 'If A is true, then B. But B is false, therefore A is false.'",
              options: ["Modus ponens", "Modus tollens", "Affirming the consequent", "Denying the antecedent"],
              correctAnswer: 1,
              hintFr: "Il s'agit d'une inférence valide par contraposition (modus tollens).",
              hintEn: "This is a valid contrapositive inference (modus tollens)."
            },
            {
              questionFr: "Quelle nuance sémantique distingue : 'certains croient que' de 'certains prétendent que' dans un texte académique ?",
              questionEn: "What semantic nuance distinguishes: 'some believe that' from 'some claim that' in academic writing?",
              options: [
                "'Claim' implies stronger evidence",
                "'Believe' suggests more skepticism",
                "'Claim' may imply doubt about the assertion",
                "There is no difference"
              ],
              correctAnswer: 2,
              hintFr: "'Prétendre' peut sous-entendre un désaccord implicite de l'auteur.",
              hintEn: "'Claim' may imply the author's implicit disagreement."
            },
            {
              questionFr: "Identifiez le procédé stylistique dans : 'Le silence était assourdissant.'",
              questionEn: "Identify the stylistic device in: 'The silence was deafening.'",
              options: ["Simile", "Oxymoron", "Litotes", "Paradox"],
              correctAnswer: 1,
              hintFr: "L'oxymore combine deux termes apparemment contradictoires.",
              hintEn: "Oxymoron combines two seemingly contradictory terms."
            },
            {
              questionFr: "Quelle stratégie de persuasion est employée dans : 'Comme l'a démontré l'échec catastrophique de 2008, cette approche est dangereuse.' ?",
              questionEn: "What persuasion strategy is used in: 'As the catastrophic failure of 2008 demonstrated, this approach is dangerous.'?",
              options: [
                "Appeal to emotion",
                "Historical analogy",
                "Slippery slope",
                "Straw man argument"
              ],
              correctAnswer: 1,
              hintFr: "L'argument s'appuie sur un exemple historique comme preuve.",
              hintEn: "The argument relies on a historical example as evidence."
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
languageToggle.addEventListener('change', toggleLanguage);
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

function toggleLanguage() {
    questionsInEnglish = languageToggle.checked;
}

function startQuiz() {
    playerName = playerNameInput.value.trim() || "Player";

    if (!selectedCategory || !selectedDifficulty) {
        alert("Please select a category and difficulty!");
        return;
    }

    // Préparer les questions
    quizData = prepareQuestions();

    // Initialiser les variables du quiz
    currentQuestionIndex = 0;
    score = 0;
    answerTimes = [];

    // Mettre à jour l'affichage
    categoryDisplay.textContent = getCategoryDisplayName(selectedCategory);
    difficultyDisplay.textContent = getDifficultyDisplayName(selectedDifficulty);
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

function getCategoryDisplayName(category) {
    const names = {
        grammar: "Grammaire",
        tenses: "Temps Verbaux",
        vocabulary: "Vocabulaire",
        reading: "Compréhension"
    };
    return names[category] || category;
}

function getDifficultyDisplayName(difficulty) {
    const names = {
        beginner: "Débutant",
        intermediate: "Intermédiaire",
        advanced: "Avancé",
        expert: "Expert"
    };
    return names[difficulty] || difficulty;
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

    // Afficher la question dans la langue appropriée
    questionText.textContent = questionsInEnglish ? question.questionEn : question.questionFr;

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

    // Mettre à jour l'indice dans la langue appropriée
    hintText.textContent = questionsInEnglish ? question.hintEn : question.hintFr;

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
    resultCategory.textContent = getCategoryDisplayName(selectedCategory);
    resultDifficulty.textContent = getDifficultyDisplayName(selectedDifficulty);
    resultTime.textContent = `${averageTime.toFixed(1)} secondes`;

    // Donner un feedback personnalisé
    const percentage = (score / quizData.length) * 100;
    let feedback;

    if (percentage >= 90) {
        feedback = questionsInEnglish
            ? "Excellent work! Your English skills are outstanding."
            : "Excellent travail ! Vos compétences en anglais sont exceptionnelles.";
    } else if (percentage >= 70) {
        feedback = questionsInEnglish
            ? "Great job! You have a good command of English."
            : "Bon travail ! Vous avez une bonne maîtrise de l'anglais.";
    } else if (percentage >= 50) {
        feedback = questionsInEnglish
            ? "Not bad! With more practice, you'll improve quickly."
            : "Pas mal ! Avec un peu plus de pratique, vous progresserez rapidement.";
    } else {
        feedback = questionsInEnglish
            ? "Keep practicing! Everyone starts somewhere."
            : "Continuez à pratiquer ! Tout le monde doit bien commencer quelque part.";
    }

    feedbackText.textContent = feedback;

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
                    label: 'Time (s)',
                    data: answerTimes,
                    backgroundColor: answerTimes.map((_, i) =>
                        i < score ? 'rgba(52, 168, 83, 0.7)' : 'rgba(234, 67, 53, 0.7)'
                    ),
                    borderColor: answerTimes.map((_, i) =>
                        i < score ? 'rgba(52, 168, 83, 1)' : 'rgba(234, 67, 53, 1)'
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
                        text: 'Time (seconds)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const index = context.dataIndex;
                            const isCorrect = index < score;
                            return [
                                `Time: ${context.raw.toFixed(1)}s`,
                                `Status: ${isCorrect ? 'Correct' : 'Incorrect'}`
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
    const shareText = questionsInEnglish
        ? `I scored ${score}/${quizData.length} on the ${selectedCategory} (${selectedDifficulty}) English quiz!`
        : `J'ai obtenu ${score}/${quizData.length} au quiz ${getCategoryDisplayName(selectedCategory)} (${getDifficultyDisplayName(selectedDifficulty)}) sur English Master Quiz!`;

    if (navigator.share) {
        navigator.share({
            title: questionsInEnglish ? 'My English Quiz Results' : 'Mes résultats au quiz d\'anglais',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(shareText) {
    // Copier dans le presse-papiers
    navigator.clipboard.writeText(shareText).then(() => {
        alert(questionsInEnglish
            ? 'Results copied to clipboard!'
            : 'Résultats copiés dans le presse-papiers !');
    }).catch(err => {
        console.log('Copy error:', err);
        prompt(questionsInEnglish
            ? 'Copy this text to share your results:'
            : 'Copiez ce texte pour partager vos résultats:', shareText);
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
    languageToggle.checked = false;
}

init();