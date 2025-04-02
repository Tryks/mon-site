document.addEventListener('DOMContentLoaded', () => {
    // Elements du DOM
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const startButton = document.getElementById('start-btn');
    const restartButton = document.getElementById('restart-btn');
    const pauseButton = document.getElementById('pause-btn');
    const finalScoreElement = document.getElementById('final-score');
    const directionButtons = {
        up: document.getElementById('up-btn'),
        down: document.getElementById('down-btn'),
        left: document.getElementById('left-btn'),
        right: document.getElementById('right-btn')
    };
    const settings = {
        snakeSkin: document.getElementById('snake-skin'),
        theme: document.getElementById('theme'),
        difficulty: document.getElementById('difficulty'),
        gridSize: document.getElementById('grid-size'),
        sound: document.getElementById('sound')
    };
    const eatSound = document.getElementById('eat-sound');
    const gameoverSound = document.getElementById('gameover-sound');

    // Variables du jeu
    let snake = [];
    let food = {};
    let specialFood = null;
    let direction = 'right';
    let nextDirection = 'right';
    let gameSpeed = 150;
    let gridSize = 20;
    let tileCount = 20;
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    let gameLoop;
    let isPaused = false;
    let isGameOver = false;
    let gameStarted = false;
    let specialFoodTimer = null;

    // Initialisation du jeu
    function initGame() {
        // Ajuster la taille du canvas
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mettre à jour le high score
        highScoreElement.textContent = highScore;

        // Écouteurs d'événements
        startButton.addEventListener('click', startGame);
        restartButton.addEventListener('click', startGame);
        pauseButton.addEventListener('click', togglePause);

        // Contrôles tactiles
        Object.keys(directionButtons).forEach(dir => {
            directionButtons[dir].addEventListener('click', () => changeDirection(dir));
        });

        // Contrôles clavier
        document.addEventListener('keydown', handleKeyPress);

        // Paramètres
        settings.theme.addEventListener('change', updateTheme);
        settings.snakeSkin.addEventListener('change', drawGame);
        settings.difficulty.addEventListener('change', updateDifficulty);
        settings.gridSize.addEventListener('change', updateGridSize);
        settings.sound.addEventListener('change', () => {
            eatSound.muted = !settings.sound.checked;
            gameoverSound.muted = !settings.sound.checked;
        });

        // Appliquer le thème initial
        updateTheme();
    }

    function resizeCanvas() {
        const container = canvas.parentElement;
        const size = Math.min(container.clientWidth, container.clientHeight);
        canvas.width = size;
        canvas.height = size;
        
        // Recalculer la taille des tuiles en fonction de la nouvelle taille du canvas
        tileCount = parseInt(settings.gridSize.value === 'small' ? 30 : 
                     settings.gridSize.value === 'medium' ? 20 : 15);
        gridSize = Math.floor(canvas.width / tileCount);
        
        if (gameStarted) {
            drawGame();
        }
    }

    function updateTheme() {
        document.body.setAttribute('data-theme', settings.theme.value);
    }

    function updateDifficulty() {
        switch(settings.difficulty.value) {
            case 'easy': gameSpeed = 150; break;
            case 'medium': gameSpeed = 100; break;
            case 'hard': gameSpeed = 70; break;
        }
        
        if (gameStarted && !isPaused && !isGameOver) {
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
    }

    function updateGridSize() {
        resizeCanvas();
    }

    function startGame() {
        // Réinitialiser l'état du jeu
        snake = [];
        for (let i = 3; i >= 0; i--) {
            snake.push({ x: i, y: 0 });
        }
        
        direction = 'right';
        nextDirection = 'right';
        score = 0;
        scoreElement.textContent = score;
        isGameOver = false;
        isPaused = false;
        gameStarted = true;
        
        // Générer de la nourriture
        generateFood();
        
        // Cacher les écrans d'overlay
        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        
        // Démarrer la boucle de jeu
        clearInterval(gameLoop);
        gameLoop = setInterval(gameStep, gameSpeed);
        
        // Mettre à jour la vitesse en fonction de la difficulté
        updateDifficulty();
    }

    function gameStep() {
        if (isPaused || isGameOver) return;
        
        moveSnake();
        checkCollision();
        drawGame();
    }

    function moveSnake() {
        // Mettre à jour la direction
        direction = nextDirection;
        
        // Déplacer la tête
        const head = { x: snake[0].x, y: snake[0].y };
        
        switch(direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        // Vérifier les bordures (passage à travers les murs)
        if (head.x >= tileCount) head.x = 0;
        if (head.x < 0) head.x = tileCount - 1;
        if (head.y >= tileCount) head.y = 0;
        if (head.y < 0) head.y = tileCount - 1;
        
        // Ajouter la nouvelle tête
        snake.unshift(head);
        
        // Vérifier si le serpent mange de la nourriture
        if (head.x === food.x && head.y === food.y) {
            // Jouer le son
            if (settings.sound.checked) {
                eatSound.currentTime = 0;
                eatSound.play();
            }
            
            // Augmenter le score
            score += 10;
            scoreElement.textContent = score;
            
            // Générer une nouvelle nourriture
            generateFood();
            
            // 20% de chance de faire apparaître une nourriture spéciale
            if (Math.random() < 0.2 && !specialFood) {
                generateSpecialFood();
            }
        } else if (specialFood && head.x === specialFood.x && head.y === specialFood.y) {
            // Jouer le son
            if (settings.sound.checked) {
                eatSound.currentTime = 0;
                eatSound.play();
            }
            
            // Augmenter le score plus significativement
            score += 50;
            scoreElement.textContent = score;
            
            // Supprimer la nourriture spéciale
            specialFood = null;
            clearTimeout(specialFoodTimer);
            
            // Générer une nouvelle nourriture normale
            generateFood();
        } else {
            // Retirer la queue si aucune nourriture n'a été mangée
            snake.pop();
        }
    }

    function checkCollision() {
        // Vérifier la collision avec soi-même
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                gameOver();
                return;
            }
        }
    }

    function gameOver() {
        isGameOver = true;
        clearInterval(gameLoop);
        
        // Mettre à jour le high score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
            highScoreElement.textContent = highScore;
        }
        
        // Afficher l'écran de fin de jeu
        finalScoreElement.textContent = `Score: ${score}`;
        gameOverScreen.style.display = 'flex';
        
        // Jouer le son de game over
        if (settings.sound.checked) {
            gameoverSound.currentTime = 0;
            gameoverSound.play();
        }
    }

    function togglePause() {
        isPaused = !isPaused;
        pauseButton.innerHTML = isPaused ? 
            '<i class="fas fa-play"></i> Reprendre' : 
            '<i class="fas fa-pause"></i> Pause';
    }

    function generateFood() {
        let validPosition = false;
        let foodX, foodY;
        
        while (!validPosition) {
            foodX = Math.floor(Math.random() * tileCount);
            foodY = Math.floor(Math.random() * tileCount);
            
            // Vérifier que la nourriture ne s'affiche pas sur le serpent
            validPosition = true;
            for (let segment of snake) {
                if (segment.x === foodX && segment.y === foodY) {
                    validPosition = false;
                    break;
                }
            }
        }
        
        food = { x: foodX, y: foodY };
    }

    function generateSpecialFood() {
        let validPosition = false;
        let foodX, foodY;
        
        while (!validPosition) {
            foodX = Math.floor(Math.random() * tileCount);
            foodY = Math.floor(Math.random() * tileCount);
            
            // Vérifier que la nourriture spéciale ne s'affiche pas sur le serpent ou la nourriture normale
            validPosition = true;
            for (let segment of snake) {
                if (segment.x === foodX && segment.y === foodY) {
                    validPosition = false;
                    break;
                }
            }
            
            if (food.x === foodX && food.y === foodY) {
                validPosition = false;
            }
        }
        
        specialFood = { x: foodX, y: foodY };
        
        // La nourriture spéciale disparaît après 5 secondes
        specialFoodTimer = setTimeout(() => {
            specialFood = null;
            drawGame();
        }, 5000);
    }

    function drawGame() {
        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner la grille (optionnel)
        if (settings.theme.value !== 'dark') {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < tileCount; i++) {
                ctx.beginPath();
                ctx.moveTo(i * gridSize, 0);
                ctx.lineTo(i * gridSize, canvas.height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * gridSize);
                ctx.lineTo(canvas.width, i * gridSize);
                ctx.stroke();
            }
        }
        
        // Dessiner le serpent
        drawSnake();
        
        // Dessiner la nourriture
        drawFood();
        
        // Dessiner la nourriture spéciale si elle existe
        if (specialFood) {
            drawSpecialFood();
        }
    }

    function drawSnake() {
        const skin = settings.snakeSkin.value;
        
        for (let i = 0; i < snake.length; i++) {
            const segment = snake[i];
            const x = segment.x * gridSize;
            const y = segment.y * gridSize;
            
            // Dessiner différemment selon le skin choisi
            switch(skin) {
                case 'classic':
                    ctx.fillStyle = i === 0 ? '#2e7d32' : '#4caf50';
                    ctx.fillRect(x, y, gridSize, gridSize);
                    break;
                    
                case 'gradient':
                    const gradient = ctx.createLinearGradient(x, y, x + gridSize, y + gridSize);
                    gradient.addColorStop(0, '#2e7d32');
                    gradient.addColorStop(1, '#8bc34a');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(x, y, gridSize, gridSize);
                    break;
                    
                case 'stripes':
                    ctx.fillStyle = i === 0 ? '#2e7d32' : '#4caf50';
                    ctx.fillRect(x, y, gridSize, gridSize);
                    
                    // Ajouter des rayures
                    ctx.strokeStyle = '#a5d6a7';
                    ctx.lineWidth = 2;
                    if (i % 2 === 0) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + gridSize, y + gridSize);
                        ctx.stroke();
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(x + gridSize, y);
                        ctx.lineTo(x, y + gridSize);
                        ctx.stroke();
                    }
                    break;
                    
                case 'neon':
                    ctx.fillStyle = i === 0 ? '#00e676' : '#00c853';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#00e676';
                    ctx.fillRect(x, y, gridSize, gridSize);
                    ctx.shadowBlur = 0;
                    break;
            }
            
            // Ajouter des yeux à la tête
            if (i === 0) {
                const eyeSize = gridSize / 5;
                const eyeOffset = gridSize / 4;
                
                ctx.fillStyle = 'white';
                
                // Position des yeux en fonction de la direction
                if (direction === 'right') {
                    ctx.fillRect(x + gridSize - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(x + gridSize - eyeOffset - eyeSize, y + gridSize - eyeOffset * 2, eyeSize, eyeSize);
                } else if (direction === 'left') {
                    ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(x + eyeOffset, y + gridSize - eyeOffset * 2, eyeSize, eyeSize);
                } else if (direction === 'up') {
                    ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(x + gridSize - eyeOffset * 2, y + eyeOffset, eyeSize, eyeSize);
                } else if (direction === 'down') {
                    ctx.fillRect(x + eyeOffset, y + gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                    ctx.fillRect(x + gridSize - eyeOffset * 2, y + gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                }
            }
        }
    }

    function drawFood() {
        const x = food.x * gridSize;
        const y = food.y * gridSize;
        
        // Dessiner la nourriture avec un effet de pomme
        ctx.fillStyle = '#d32f2f';
        ctx.beginPath();
        ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Tige
        ctx.strokeStyle = '#5d4037';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + gridSize/2, y + 2);
        ctx.lineTo(x + gridSize/2 - 3, y - 3);
        ctx.stroke();
        
        // Feuille
        ctx.fillStyle = '#7cb342';
        ctx.beginPath();
        ctx.moveTo(x + gridSize/2 - 2, y - 2);
        ctx.quadraticCurveTo(x + gridSize/2 - 6, y - 6, x + gridSize/2 - 8, y - 2);
        ctx.quadraticCurveTo(x + gridSize/2 - 6, y + 2, x + gridSize/2 - 2, y - 2);
        ctx.fill();
    }

    function drawSpecialFood() {
        const x = specialFood.x * gridSize;
        const y = specialFood.y * gridSize;
        
        // Dessiner la nourriture spéciale avec un effet d'étoile
        ctx.fillStyle = '#ffeb3b';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffeb3b';
        
        // Animation clignotante
        const blink = Math.sin(Date.now() / 200) > 0;
        if (blink) {
            ctx.beginPath();
            ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Dessiner une étoile
            drawStar(ctx, x + gridSize/2, y + gridSize/2, 5, gridSize/3, gridSize/6, '#ffc107');
        }
        
        ctx.shadowBlur = 0;
    }

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
        let rot = Math.PI/2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        
        for(let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    function handleKeyPress(e) {
        if (!gameStarted || isPaused) return;
        
        // Empêcher le défilement de la page avec les touches fléchées
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
        
        switch(e.key) {
            case 'ArrowUp':
            case 'z':
            case 'Z':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
            case 'q':
            case 'Q':
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (direction !== 'left') nextDirection = 'right';
                break;
            case ' ':
                togglePause();
                break;
        }
    }

    function changeDirection(newDirection) {
        if (!gameStarted || isPaused) return;
        
        // Empêcher les mouvements inverses
        if ((direction === 'up' && newDirection === 'down') ||
            (direction === 'down' && newDirection === 'up') ||
            (direction === 'left' && newDirection === 'right') ||
            (direction === 'right' && newDirection === 'left')) {
            return;
        }
        
        nextDirection = newDirection;
    }

    // Démarrer le jeu
    initGame();
});