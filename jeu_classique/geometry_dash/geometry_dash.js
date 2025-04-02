// Configuration du jeu
const config = {
    width: 800,
    height: 600,
    gravity: 0.8,
    jumpForce: -12,
    speed: 5,
    bgColor: '#000033',
    playerColor: '#00FFFF',
    volume: 70,
    graphics: 'medium',
    controls: 'space',
    particles: true,
    coins: 0,
    highScore: 0
};

// Éléments du DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const mainMenu = document.getElementById('mainMenu');
const optionsMenu = document.getElementById('optionsMenu');
const gameUI = document.getElementById('gameUI');
const pauseMenu = document.getElementById('pauseMenu');
const gameOverMenu = document.getElementById('gameOverMenu');
const scoreDisplay = document.getElementById('score');
const coinsDisplay = document.getElementById('coins');
const fpsDisplay = document.getElementById('fps');
const finalScoreDisplay = document.getElementById('finalScore');
const finalCoinsDisplay = document.getElementById('finalCoins');
const highScoreDisplay = document.getElementById('highScore');

// Boutons
document.getElementById('playBtn').addEventListener('click', startGame);
document.getElementById('optionsBtn').addEventListener('click', showOptions);
document.getElementById('backBtn').addEventListener('click', hideOptions);
document.getElementById('resumeBtn').addEventListener('click', resumeGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);
document.getElementById('exitBtn').addEventListener('click', exitToMenu);
document.getElementById('retryBtn').addEventListener('click', restartGame);
document.getElementById('menuBtn').addEventListener('click', exitToMenu);

// Options
document.getElementById('volume').addEventListener('input', (e) => {
    config.volume = e.target.value;
});
document.getElementById('graphics').addEventListener('change', (e) => {
    config.graphics = e.target.value;
});
document.getElementById('playerColor').addEventListener('input', (e) => {
    config.playerColor = e.target.value;
});
document.getElementById('bgColor').addEventListener('input', (e) => {
    config.bgColor = e.target.value;
    canvas.style.backgroundColor = config.bgColor;
});
document.getElementById('controls').addEventListener('change', (e) => {
    config.controls = e.target.value;
});
document.getElementById('particles').addEventListener('change', (e) => {
    config.particles = e.target.checked;
});

// Initialisation du canvas
canvas.width = config.width;
canvas.height = config.height;
canvas.style.backgroundColor = config.bgColor;

// Variables du jeu
let gameRunning = false;
let score = 0;
let coins = 0;
let obstacles = [];
let coinsList = [];
let particles = [];
let lastTime = 0;
let fps = 0;
let frameCount = 0;
let lastFpsUpdate = 0;
let gameSpeed = config.speed;
let isPaused = false;

// Joueur
const player = {
    x: 100,
    y: 300,
    width: 30,
    height: 30,
    velocityY: 0,
    isJumping: false,
    rotation: 0,
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = config.playerColor;
        
        // Dessin du joueur avec des effets selon la qualité graphique
        if (config.graphics === 'ultra') {
            ctx.shadowColor = config.playerColor;
            ctx.shadowBlur = 15;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            
            // Effet de bordure
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        } else if (config.graphics === 'high') {
            ctx.shadowColor = config.playerColor;
            ctx.shadowBlur = 10;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        }
        
        ctx.restore();
        
        // Traînée pour les qualités élevées
        if (config.graphics === 'high' || config.graphics === 'ultra') {
            for (let i = 0; i < 3; i++) {
                ctx.fillStyle = `${config.playerColor}${10 + i * 10}`;
                ctx.fillRect(this.x - i * 5, this.y, this.width, this.height);
            }
        }
    },
    update() {
        this.velocityY += config.gravity;
        this.y += this.velocityY;
        this.rotation += 5;
        
        // Limites de l'écran
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = 0;
        }
    },
    jump() {
        if (!this.isJumping) {
            this.velocityY = config.jumpForce;
            this.isJumping = true;
            
            // Effet de particules
            if (config.particles) {
                createParticles(this.x + this.width / 2, this.y + this.height, 10, config.playerColor);
            }
        }
    }
};

// Fonctions du jeu
function startGame() {
    mainMenu.classList.add('hidden');
    gameUI.classList.remove('hidden');
    gameRunning = true;
    score = 0;
    coins = 0;
    obstacles = [];
    coinsList = [];
    player.y = 300;
    player.velocityY = 0;
    player.isJumping = false;
    gameSpeed = config.speed;
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

function showOptions() {
    mainMenu.classList.add('hidden');
    optionsMenu.classList.remove('hidden');
}

function hideOptions() {
    optionsMenu.classList.add('hidden');
    mainMenu.classList.remove('hidden');
    // Sauvegarder les options
    localStorage.setItem('geometryDashConfig', JSON.stringify(config));
}

function pauseGame() {
    isPaused = true;
    pauseMenu.classList.remove('hidden');
}

function resumeGame() {
    isPaused = false;
    pauseMenu.classList.add('hidden');
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

function restartGame() {
    gameOverMenu.classList.add('hidden');
    startGame();
}

function exitToMenu() {
    gameRunning = false;
    gameOverMenu.classList.add('hidden');
    pauseMenu.classList.add('hidden');
    gameUI.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}

function gameOver() {
    gameRunning = false;
    gameUI.classList.add('hidden');
    gameOverMenu.classList.remove('hidden');
    
    finalScoreDisplay.textContent = score;
    finalCoinsDisplay.textContent = coins;
    
    if (score > config.highScore) {
        config.highScore = score;
        highScoreDisplay.textContent = score;
        localStorage.setItem('highScore', score);
    } else {
        highScoreDisplay.textContent = config.highScore;
    }
    
    // Effet de particules
    if (config.particles) {
        for (let i = 0; i < 50; i++) {
            createParticles(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                3,
                `hsl(${Math.random() * 360}, 100%, 50%)`
            );
        }
    }
}

function createObstacle() {
    const gap = 150 + Math.random() * 100;
    const topHeight = 50 + Math.random() * (canvas.height - gap - 150);
    
    obstacles.push({
        x: canvas.width,
        y: 0,
        width: 50,
        height: topHeight,
        passed: false
    });
    
    obstacles.push({
        x: canvas.width,
        y: topHeight + gap,
        width: 50,
        height: canvas.height - topHeight - gap,
        passed: false
    });
    
    // Créer une pièce dans l'écart
    if (Math.random() > 0.3) {
        coinsList.push({
            x: canvas.width + 25,
            y: topHeight + gap / 2 - 15,
            width: 20,
            height: 20,
            collected: false,
            animation: 0
        });
    }
}

function createParticles(x, y, count, color) {
    if (!config.particles) return;
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            size: 2 + Math.random() * 4,
            color: color || `hsl(${Math.random() * 360}, 100%, 50%)`,
            velocityX: -2 + Math.random() * 4,
            velocityY: -2 + Math.random() * 4,
            life: 30 + Math.random() * 50,
            opacity: 1
        });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.life--;
        p.opacity = p.life / 100;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        
        if (config.graphics === 'ultra') {
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        }
        
        ctx.globalAlpha = 1;
    });
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
    
    // Augmenter la difficulté
    if (score % 100 === 0) {
        gameSpeed += 0.5;
    }
}

function updateCoins() {
    coinsDisplay.textContent = coins;
}

// Boucle de jeu
function gameLoop(timestamp) {
    if (!gameRunning || isPaused) return;
    
    // Calcul du FPS
    frameCount++;
    if (timestamp >= lastFpsUpdate + 1000) {
        fps = Math.round((frameCount * 1000) / (timestamp - lastFpsUpdate));
        fpsDisplay.textContent = fps;
        frameCount = 0;
        lastFpsUpdate = timestamp;
    }
    
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner le fond
    ctx.fillStyle = config.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ajouter des obstacles
    if (Math.random() < 0.01 * gameSpeed / config.speed) {
        createObstacle();
    }
    
    // Mettre à jour et dessiner les obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.x -= gameSpeed;
        
        // Dessiner l'obstacle
        ctx.fillStyle = '#FF5555';
        
        if (config.graphics === 'ultra') {
            ctx.shadowColor = '#FF0000';
            ctx.shadowBlur = 10;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            ctx.shadowBlur = 0;
            
            // Effet 3D
            ctx.fillStyle = '#FF3333';
            ctx.fillRect(obstacle.x - 5, obstacle.y, 5, obstacle.height);
            ctx.fillRect(obstacle.x, obstacle.y - 5, obstacle.width, 5);
        } else if (config.graphics === 'high') {
            ctx.shadowColor = '#FF0000';
            ctx.shadowBlur = 5;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            ctx.shadowBlur = 0;
        } else {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
        
        // Vérifier si le joueur a passé l'obstacle
        if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
            obstacle.passed = true;
            updateScore();
        }
        
        // Supprimer les obstacles hors écran
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
        }
        
        // Vérifier les collisions
        if (checkCollision(player, obstacle)) {
            gameOver();
            return;
        }
    }
    
    // Mettre à jour et dessiner les pièces
    for (let i = coinsList.length - 1; i >= 0; i--) {
        const coin = coinsList[i];
        coin.x -= gameSpeed;
        coin.animation += 0.1;
        
        if (!coin.collected) {
            const animY = coin.y + Math.sin(coin.animation) * 10;
            
            // Dessiner la pièce
            ctx.save();
            ctx.translate(coin.x + coin.width / 2, animY + coin.height / 2);
            ctx.rotate(coin.animation * 2);
            
            if (config.graphics === 'ultra') {
                ctx.shadowColor = 'gold';
                ctx.shadowBlur = 10;
                ctx.fillStyle = 'gold';
                ctx.beginPath();
                ctx.arc(0, 0, coin.width / 2, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = 'orange';
                ctx.beginPath();
                ctx.arc(0, 0, coin.width / 3, 0, Math.PI * 2);
                ctx.fill();
            } else if (config.graphics === 'high') {
                ctx.shadowColor = 'gold';
                ctx.shadowBlur = 5;
                ctx.fillStyle = 'gold';
                ctx.beginPath();
                ctx.arc(0, 0, coin.width / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = 'gold';
                ctx.beginPath();
                ctx.arc(0, 0, coin.width / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
            
            // Vérifier la collision avec le joueur
            const coinRect = {
                x: coin.x,
                y: animY,
                width: coin.width,
                height: coin.height
            };
            
            if (checkCollision(player, coinRect)) {
                coin.collected = true;
                coins++;
                updateCoins();
                
                // Effet de collection
                if (config.particles) {
                    createParticles(coin.x + coin.width / 2, animY + coin.height / 2, 15, 'gold');
                }
            }
        }
        
        // Supprimer les pièces hors écran
        if (coin.x + coin.width < 0) {
            coinsList.splice(i, 1);
        }
    }
    
    // Mettre à jour et dessiner les particules
    updateParticles();
    drawParticles();
    
    // Mettre à jour et dessiner le joueur
    player.update();
    player.draw();
    
    requestAnimationFrame(gameLoop);
}

// Contrôles
function setupControls() {
    const controlMap = {
        'space': ' ',
        'up': 'ArrowUp',
        'click': 'click'
    };
    
    const controlKey = controlMap[config.controls] || ' ';
    
    if (controlKey === 'click') {
        canvas.addEventListener('click', () => {
            if (gameRunning && !isPaused) player.jump();
        });
        
        // Supprimer les autres écouteurs
        document.removeEventListener('keydown', handleKeyDown);
    } else {
        document.addEventListener('keydown', handleKeyDown);
        
        function handleKeyDown(e) {
            if (e.key === controlKey && gameRunning && !isPaused) {
                player.jump();
            }
            
            // Pause avec la touche Escape
            if (e.key === 'Escape' && gameRunning) {
                if (isPaused) {
                    resumeGame();
                } else {
                    pauseGame();
                }
            }
        }
    }
}

// Charger les options sauvegardées
function loadConfig() {
    const savedConfig = localStorage.getItem('geometryDashConfig');
    if (savedConfig) {
        Object.assign(config, JSON.parse(savedConfig));
        
        // Mettre à jour les éléments UI
        document.getElementById('volume').value = config.volume;
        document.getElementById('graphics').value = config.graphics;
        document.getElementById('playerColor').value = config.playerColor;
        document.getElementById('bgColor').value = config.bgColor;
        document.getElementById('controls').value = config.controls;
        document.getElementById('particles').checked = config.particles;
    }
    
    // Charger le meilleur score
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
        config.highScore = parseInt(savedHighScore);
        highScoreDisplay.textContent = config.highScore;
    }
}

// Initialisation
loadConfig();
setupControls();