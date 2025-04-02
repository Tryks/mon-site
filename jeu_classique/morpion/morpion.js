document.addEventListener('DOMContentLoaded', () => {
    // Éléments du DOM
    const board = document.getElementById('board');
    const cells = [];
    const currentPlayerDisplay = document.getElementById('current-player');
    const playerXScoreDisplay = document.getElementById('playerX-score');
    const playerOScoreDisplay = document.getElementById('playerO-score');
    const newGameBtn = document.getElementById('new-game');
    const resetScoreBtn = document.getElementById('reset-score');
    const themeSelect = document.getElementById('theme-select');
    const aiDifficultySelect = document.getElementById('ai-difficulty');
    const soundToggle = document.getElementById('sound-toggle');
    const animationToggle = document.getElementById('animation-toggle');
    const aiToggle = document.getElementById('ai-toggle');
    const resultModal = document.getElementById('result-modal');
    const resultMessage = document.getElementById('result-message');
    const closeModalBtn = document.getElementById('close-modal');
    const clickSound = document.getElementById('click-sound');
    const winSound = document.getElementById('win-sound');
    const drawSound = document.getElementById('draw-sound');

    // Variables du jeu
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let scores = { X: 0, O: 0 };
    let vsAI = false;
    let aiDifficulty = 'medium';

    // Initialisation du plateau
    function initializeBoard() {
        board.innerHTML = '';
        cells.length = 0;
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
            cells.push(cell);
        }
        
        resetBoardState();
    }

    // Réinitialiser l'état du plateau
    function resetBoardState() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        currentPlayerDisplay.textContent = currentPlayer;
        currentPlayerDisplay.className = '';
        
        // Supprimer toutes les classes et styles spéciaux
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'win');
            cell.style.backgroundColor = '';
            
            // Supprimer les lignes de victoire s'il y en a
            const winLine = cell.querySelector('.win-line');
            if (winLine) {
                cell.removeChild(winLine);
            }
        });
    }

    // Gérer le clic sur une cellule
    function handleCellClick(index) {
        if (!gameActive || boardState[index] !== '') return;
        
        // Jouer le son si activé
        if (soundToggle.checked) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        
        // Mettre à jour le plateau et l'interface
        makeMove(index, currentPlayer);
        
        // Vérifier s'il y a un gagnant ou un match nul
        const winner = checkWinner();
        if (winner) {
            handleGameEnd(winner);
            return;
        }
        
        // Changer de joueur
        switchPlayer();
        
        // Si c'est le tour de l'IA et qu'on joue contre elle
        if (vsAI && currentPlayer === 'O' && gameActive) {
            setTimeout(() => aiMove(), 500);
        }
    }

    // Effectuer un mouvement
    function makeMove(index, player) {
        boardState[index] = player;
        cells[index].textContent = player;
        cells[index].classList.add(player.toLowerCase());
        
        // Animation si activée
        if (animationToggle.checked) {
            cells[index].style.transform = 'scale(0)';
            setTimeout(() => {
                cells[index].style.transform = 'scale(1)';
            }, 100);
        }
    }

    // Changer de joueur
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer;
        currentPlayerDisplay.className = currentPlayer === 'X' ? '' : 'o-turn';
    }

    // Vérifier s'il y a un gagnant
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
            [0, 4, 8], [2, 4, 6]             // diagonales
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                // Marquer les cellules gagnantes
                if (animationToggle.checked) {
                    cells[a].classList.add('win');
                    cells[b].classList.add('win');
                    cells[c].classList.add('win');
                    
                    // Dessiner la ligne de victoire
                    drawWinLine(pattern);
                }
                
                return boardState[a]; // Retourner le gagnant (X ou O)
            }
        }

        // Vérifier s'il y a match nul
        if (!boardState.includes('')) {
            return 'draw';
        }

        return null;
    }

    // Dessiner la ligne de victoire
    function drawWinLine(pattern) {
        const [a, b, c] = pattern;
        const cellSize = cells[0].offsetWidth;
        const boardRect = board.getBoundingClientRect();
        
        // Coordonnées des centres des cellules
        const coords = pattern.map(index => {
            const cell = cells[index];
            const rect = cell.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2 - boardRect.left,
                y: rect.top + rect.height / 2 - boardRect.top
            };
        });
        
        // Créer la ligne
        const line = document.createElement('div');
        line.classList.add('win-line');
        
        // Déterminer l'angle et la longueur de la ligne
        const angle = Math.atan2(coords[2].y - coords[0].y, coords[2].x - coords[0].x) * 180 / Math.PI;
        const length = Math.sqrt(
            Math.pow(coords[2].x - coords[0].x, 2) + 
            Math.pow(coords[2].y - coords[0].y, 2)
        );
        
        // Positionner et styliser la ligne
        line.style.width = `${length}px`;
        line.style.height = '8px';
        line.style.position = 'absolute';
        line.style.left = `${coords[0].x}px`;
        line.style.top = `${coords[0].y}px`;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angle}deg)`;
        
        // Ajouter la ligne au plateau
        board.appendChild(line);
    }

    // Gérer la fin du jeu
    function handleGameEnd(winner) {
        gameActive = false;
        
        if (winner === 'draw') {
            resultMessage.textContent = 'Match nul !';
            if (soundToggle.checked) {
                drawSound.currentTime = 0;
                drawSound.play();
            }
        } else {
            resultMessage.textContent = `Le joueur ${winner} a gagné !`;
            scores[winner]++;
            updateScores();
            
            if (soundToggle.checked) {
                winSound.currentTime = 0;
                winSound.play();
            }
        }
        
        // Afficher le modal de résultat
        resultModal.style.display = 'flex';
    }

    // Mettre à jour les scores
    function updateScores() {
        playerXScoreDisplay.textContent = scores.X;
        playerOScoreDisplay.textContent = scores.O;
    }

    // Mouvement de l'IA
    function aiMove() {
        if (!gameActive) return;
        
        let move;
        
        switch (aiDifficulty) {
            case 'easy':
                move = getRandomMove();
                break;
            case 'medium':
                // 50% de chance de faire un mouvement intelligent, 50% aléatoire
                move = Math.random() < 0.5 ? getSmartMove() : getRandomMove();
                break;
            case 'hard':
                move = getSmartMove() || getRandomMove();
                break;
            default:
                move = getRandomMove();
        }
        
        if (move !== null) {
            setTimeout(() => {
                makeMove(move, 'O');
                
                const winner = checkWinner();
                if (winner) {
                    handleGameEnd(winner);
                } else {
                    switchPlayer();
                }
            }, 500);
        }
    }

    // Obtenir un mouvement aléatoire
    function getRandomMove() {
        const emptyCells = boardState.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);
        
        if (emptyCells.length === 0) return null;
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Obtenir un mouvement intelligent (essaie de gagner ou de bloquer)
    function getSmartMove() {
        // Vérifier si l'IA peut gagner
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === '') {
                boardState[i] = 'O';
                if (checkWinner() === 'O') {
                    boardState[i] = '';
                    return i;
                }
                boardState[i] = '';
            }
        }
        
        // Vérifier si le joueur peut gagner au prochain tour et le bloquer
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === '') {
                boardState[i] = 'X';
                if (checkWinner() === 'X') {
                    boardState[i] = '';
                    return i;
                }
                boardState[i] = '';
            }
        }
        
        // Prendre le centre si disponible
        if (boardState[4] === '') return 4;
        
        // Prendre un coin si disponible
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => boardState[i] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        // Prendre n'importe quel côté disponible
        const sides = [1, 3, 5, 7];
        const availableSides = sides.filter(i => boardState[i] === '');
        if (availableSides.length > 0) {
            return availableSides[Math.floor(Math.random() * availableSides.length)];
        }
        
        return null;
    }

    // Écouteurs d'événements
    newGameBtn.addEventListener('click', resetBoardState);
    
    resetScoreBtn.addEventListener('click', () => {
        scores = { X: 0, O: 0 };
        updateScores();
        resetBoardState();
    });
    
    closeModalBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
    });
    
    themeSelect.addEventListener('change', () => {
        document.body.className = `${themeSelect.value}-theme`;
    });
    
    aiToggle.addEventListener('change', (e) => {
        vsAI = e.target.checked;
        resetBoardState();
    });
    
    aiDifficultySelect.addEventListener('change', (e) => {
        aiDifficulty = e.target.value;
    });

    // Initialiser le jeu
    initializeBoard();
    updateScores();
});