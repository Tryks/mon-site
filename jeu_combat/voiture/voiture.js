
//  mauvais js, aller récupérer dans le bureau


// Variables d'état du jeu
let board = Array(9).fill().map(() => Array(9).fill(0));
let solution = Array(9).fill().map(() => Array(9).fill(0));
let errors = 0;
let hintsUsed = 0;
let startTime = null;
let timerInterval = null;
let selectedCell = null;
let difficulty = 'easy';
let numberUsage = Array(9).fill(0);

// Initialisation du jeu
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    generateNewPuzzle(difficulty);
});

function initGame() {
    // Gestion des boutons de difficulté
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            difficulty = this.dataset.diff;
            generateNewPuzzle(difficulty);
        });
    });

    // Bouton nouvelle partie
    document.getElementById('newGameBtn').addEventListener('click', () => {
        generateNewPuzzle(difficulty);
    });

    // Bouton vérifier
    document.getElementById('checkBtn').addEventListener('click', () => {
        if (isBoardComplete()) {
            checkBoard(true);
        } else {
            checkBoard(false);
        }
    });

    // Bouton indice
    document.getElementById('hintBtn').addEventListener('click', giveHint);

    // Boutons numériques
    document.querySelectorAll('.num-btn').forEach(btn => {
        if (btn.id !== 'eraseBtn') {
            btn.addEventListener('click', () => {
                fillCell(parseInt(btn.dataset.number));
            });
        }
    });

    // Bouton effacer
    document.getElementById('eraseBtn').addEventListener('click', eraseCell);

    // Boutons modaux
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        document.getElementById('winModal').style.display = 'none';
        generateNewPuzzle(difficulty);
    });

    document.getElementById('tryAgainBtn').addEventListener('click', () => {
        document.getElementById('loseModal').style.display = 'none';
        generateNewPuzzle(difficulty);
    });

    document.getElementById('helpBtn').addEventListener('click', () => {
        document.getElementById('helpModal').style.display = 'flex';
    });

    document.getElementById('closeHelpBtn').addEventListener('click', () => {
        document.getElementById('helpModal').style.display = 'none';
    });

    // Gestion du thème
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('#themeToggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

function generateNewPuzzle(diff) {
    resetGame();
    
    let emptyCells;
    switch(diff) {
        case 'easy': emptyCells = 30; break;
        case 'medium': emptyCells = 40; break;
        case 'hard': emptyCells = 50; break;
        default: emptyCells = 40;
    }
    
    // Générer une grille résolue
    solution = generateSolvedBoard();
    
    // Créer la grille jouable
    board = JSON.parse(JSON.stringify(solution));
    removeNumbers(board, emptyCells);
    
    renderBoard();
    startTimer();
    updateNumberUsage();
}

function generateSolvedBoard() {
    const grid = Array(9).fill().map(() => Array(9).fill(0));
    
    // Remplir la diagonale avec des sous-grilles valides
    for (let box = 0; box < 9; box += 3) {
        fillBox(grid, box, box);
    }
    
    // Résoudre le reste
    solveSudoku(grid);
    return grid;
}

function fillBox(grid, row, col) {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(nums);
    
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[row + i][col + j] = nums[index++];
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function removeNumbers(grid, count) {
    while (count > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        
        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            count--;
        }
    }
}

function solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        
                        if (solveSudoku(grid)) {
                            return true;
                        }
                        
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(grid, row, col, num) {
    // Vérifie la ligne
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
    }
    
    // Vérifie la colonne
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
    }
    
    // Vérifie la boîte 3x3
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[boxRow + i][boxCol + j] === num) return false;
        }
    }
    
    return true;
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            if (board[i][j] !== 0) {
                cell.textContent = board[i][j];
                cell.classList.add('fixed');
            }
            
            cell.addEventListener('click', () => selectCell(i, j));
            boardElement.appendChild(cell);
        }
    }
}

function selectCell(row, col) {
    // Ne pas sélectionner les cellules fixes
    if (board[row][col] !== 0 && !document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).classList.contains('user-input')) {
        return;
    }
    
    // Désélectionner la cellule précédente
    if (selectedCell) {
        document.querySelector(`.cell[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`)
            .classList.remove('highlighted');
    }
    
    // Sélectionner la nouvelle cellule
    selectedCell = { row, col };
    document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
        .classList.add('highlighted');
}

function fillCell(number) {
    if (!selectedCell || board[selectedCell.row][selectedCell.col] !== 0) return;
    
    const { row, col } = selectedCell;
    
    // Vérifier si le nombre est déjà utilisé au maximum
    if (numberUsage[number - 1] >= 9) return;
    
    // Mettre à jour le tableau et l'affichage
    board[row][col] = number;
    const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cellElement.textContent = number;
    cellElement.classList.add('user-input');
    
    // Mettre à jour l'utilisation des nombres
    updateNumberUsage();
    
    // Vérifier si la grille est complète
    if (isBoardComplete()) {
        checkBoard(true);
    }
}

function eraseCell() {
    if (!selectedCell || board[selectedCell.row][selectedCell.col] === 0) return;
    
    const { row, col } = selectedCell;
    const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    
    // Ne pas effacer les nombres fixes
    if (!cellElement.classList.contains('user-input')) return;
    
    // Mettre à jour le tableau et l'affichage
    board[row][col] = 0;
    cellElement.textContent = '';
    cellElement.classList.remove('user-input', 'error');
    
    // Mettre à jour l'utilisation des nombres
    updateNumberUsage();
}

function updateNumberUsage() {
    numberUsage = Array(9).fill(0);
    
    // Compter l'utilisation de chaque nombre
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0) {
                numberUsage[board[i][j] - 1]++;
            }
        }
    }
    
    // Mettre à jour l'affichage des boutons numériques
    document.querySelectorAll('.num-btn').forEach(btn => {
        if (btn.id !== 'eraseBtn') {
            const num = parseInt(btn.dataset.number);
            if (numberUsage[num - 1] >= 9) {
                btn.classList.add('max-used');
            } else {
                btn.classList.remove('max-used');
            }
        }
    });
}

function checkBoard(isCompleteCheck) {
    let hasErrors = false;
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cellElement = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
            
            // Ignorer les cellules vides
            if (board[i][j] === 0) continue;
            
            // Vérifier si la valeur est correcte
            if (board[i][j] !== solution[i][j]) {
                cellElement.classList.add('error');
                hasErrors = true;
                
                if (!isCompleteCheck) {
                    errors++;
                    document.getElementById('errorCount').textContent = errors;
                    
                    if (errors >= 3) {
                        gameLost();
                        return;
                    }
                }
            } else {
                cellElement.classList.remove('error');
            }
        }
    }
    
    if (isCompleteCheck && !hasErrors) {
        gameWon();
    }
}

function giveHint() {
    if (!selectedCell || board[selectedCell.row][selectedCell.col] !== 0) return;
    
    const { row, col } = selectedCell;
    board[row][col] = solution[row][col];
    
    const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cellElement.textContent = solution[row][col];
    cellElement.classList.add('fixed');
    cellElement.classList.remove('highlighted', 'user-input');
    
    updateNumberUsage();
    
    // Vérifier si la grille est complète
    if (isBoardComplete()) {
        checkBoard(true);
    }
}

function isBoardComplete() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    return true;
}

function gameWon() {
    stopTimer();
    document.getElementById('finalTime').textContent = document.getElementById('timeDisplay').textContent;
    document.getElementById('winModal').style.display = 'flex';
}

function gameLost() {
    stopTimer();
    document.getElementById('loseModal').style.display = 'flex';
}

function resetGame() {
    board = Array(9).fill().map(() => Array(9).fill(0));
    solution = Array(9).fill().map(() => Array(9).fill(0));
    errors = 0;
    hintsUsed = 0;
    numberUsage = Array(9).fill(0);
    selectedCell = null;
    
    document.getElementById('errorCount').textContent = errors;
    document.getElementById('hintCount').textContent = hintsUsed;
    stopTimer();
    document.getElementById('timeDisplay').textContent = '00:00';
}

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    const currentTime = new Date();
    const elapsed = new Date(currentTime - startTime);
    
    const minutes = elapsed.getUTCMinutes().toString().padStart(2, '0');
    const seconds = elapsed.getUTCSeconds().toString().padStart(2, '0');
    
    document.getElementById('timeDisplay').textContent = `${minutes}:${seconds}`;
}