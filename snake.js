// Neon Snake Game - JavaScript Implementation
class NeonSnakeGame {
    constructor() {
        // Canvas and context setup
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game configuration
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Game state
        this.snake = [
            {x: 10, y: 10}
        ];
        this.dx = 0;
        this.dy = 0;
        this.food = this.generateFood();
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('neonSnakeHighScore') || '0');
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Timer and speed
        this.gameSpeed = 150; // milliseconds
        this.gameLoop = null;
        
        // DOM elements
        this.currentScoreEl = document.getElementById('currentScore');
        this.highScoreEl = document.getElementById('highScore');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.wasdInput = document.getElementById('wasdInput');
        this.gameOverEl = document.getElementById('gameOver');
        this.finalScoreEl = document.getElementById('finalScore');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        // Initialize the game
        this.init();
    }
    
    init() {
        this.updateScore();
        this.drawGame();
        this.setupEventListeners();
        this.startGame();
    }
    
    setupEventListeners() {
        // Arrow button controls
        document.querySelectorAll('.arrow-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const direction = btn.getAttribute('data-direction');
                this.changeDirection(direction);
            });
        });
        
        // WASD input controls
        this.wasdInput.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            switch(key) {
                case 'w': this.changeDirection('up'); break;
                case 'a': this.changeDirection('left'); break;
                case 's': this.changeDirection('down'); break;
                case 'd': this.changeDirection('right'); break;
            }
            // Clear the input after processing
            setTimeout(() => this.wasdInput.value = '', 100);
        });
        
        // Focus management for WASD input
        this.wasdInput.addEventListener('focus', () => {
            this.wasdInput.select();
        });
        
        // Keyboard controls (fallback for regular keyboard input)
        document.addEventListener('keydown', (e) => {
            if (document.activeElement !== this.wasdInput) {
                switch(e.key) {
                    case 'ArrowUp':
                    case 'w':
                    case 'W':
                        e.preventDefault();
                        this.changeDirection('up');
                        break;
                    case 'ArrowDown':
                    case 's':
                    case 'S':
                        e.preventDefault();
                        this.changeDirection('down');
                        break;
                    case 'ArrowLeft':
                    case 'a':
                    case 'A':
                        e.preventDefault();
                        this.changeDirection('left');
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        e.preventDefault();
                        this.changeDirection('right');
                        break;
                    case ' ':
                        e.preventDefault();
                        this.togglePause();
                        break;
                }
            }
        });
        
        // Game control buttons
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
    }
    
    changeDirection(newDirection) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const isHorizontal = (this.dx !== 0);
        const isVertical = (this.dy !== 0);
        
        switch(newDirection) {
            case 'up':
                if (!isVertical || this.dy === 1) {
                    this.dx = 0;
                    this.dy = -1;
                }
                break;
            case 'down':
                if (!isVertical || this.dy === -1) {
                    this.dx = 0;
                    this.dy = 1;
                }
                break;
            case 'left':
                if (!isHorizontal || this.dx === 1) {
                    this.dx = -1;
                    this.dy = 0;
                }
                break;
            case 'right':
                if (!isHorizontal || this.dx === -1) {
                    this.dx = 1;
                    this.dy = 0;
                }
                break;
        }
    }
    
    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        return newFood;
    }
    
    moveSnake() {
        if (this.dx === 0 && this.dy === 0) return;
        
        const head = {
            x: this.snake[0].x + this.dx,
            y: this.snake[0].y + this.dy
        };
        
        this.snake.unshift(head);
        
        // Check if food is eaten
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();
            
            // Increase speed slightly as score increases
            if (this.score % 50 === 0 && this.gameSpeed > 80) {
                this.gameSpeed -= 5;
                this.restartGameLoop();
            }
        } else {
            this.snake.pop();
        }
    }
    
    checkCollisions() {
        const head = this.snake[0];
        
        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return true;
        }
        
        // Self collision
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    drawGame() {
        // Clear canvas with neon background
        this.ctx.fillStyle = '#000011';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid lines (subtle neon effect)
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.tileCount; i++) {
            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            
            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }
        
        // Draw snake with neon glow effect
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.gridSize;
            const y = segment.y * this.gridSize;
            
            // Snake head - brighter cyan
            if (index === 0) {
                // Glow effect
                this.ctx.shadowColor = '#00ffff';
                this.ctx.shadowBlur = 20;
                
                this.ctx.fillStyle = '#00ffff';
                this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
                
                // Inner bright core
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(x + 6, y + 6, this.gridSize - 12, this.gridSize - 12);
            } else {
                // Snake body - green with gradient effect
                const intensity = Math.max(0.3, 1 - (index * 0.1));
                this.ctx.shadowColor = '#00ff00';
                this.ctx.shadowBlur = 15;
                
                this.ctx.fillStyle = `rgba(0, 255, 0, ${intensity})`;
                this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
            }
        });
        
        // Draw food with pulsating neon effect
        const foodX = this.food.x * this.gridSize;
        const foodY = this.food.y * this.gridSize;
        
        this.ctx.shadowColor = '#ff0099';
        this.ctx.shadowBlur = 25;
        
        // Outer glow
        this.ctx.fillStyle = '#ff0099';
        this.ctx.fillRect(foodX, foodY, this.gridSize, this.gridSize);
        
        // Inner bright core
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(foodX + 4, foodY + 4, this.gridSize - 8, this.gridSize - 8);
        
        // Reset shadow for next frame
        this.ctx.shadowBlur = 0;
    }
    
    updateScore() {
        this.currentScoreEl.textContent = this.score;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('neonSnakeHighScore', this.highScore.toString());
        }
        
        this.highScoreEl.textContent = this.highScore;
    }
    
    gameStep() {
        if (!this.gameRunning || this.gamePaused) return;
        
        this.moveSnake();
        
        if (this.checkCollisions()) {
            this.gameOver();
            return;
        }
        
        this.drawGame();
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.pauseBtn.textContent = 'Pause';
        this.gameOverEl.style.display = 'none';
        
        this.gameLoop = setInterval(() => {
            this.gameStep();
        }, this.gameSpeed);
        
        this.drawGame();
    }
    
    restartGameLoop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        if (this.gameRunning && !this.gamePaused) {
            this.gameLoop = setInterval(() => {
                this.gameStep();
            }, this.gameSpeed);
        }
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        
        if (this.gamePaused) {
            this.pauseBtn.textContent = 'Resume';
            clearInterval(this.gameLoop);
        } else {
            this.pauseBtn.textContent = 'Pause';
            this.gameLoop = setInterval(() => {
                this.gameStep();
            }, this.gameSpeed);
        }
    }
    
    resetGame() {
        // Stop current game
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        // Reset game state
        this.snake = [{x: 10, y: 10}];
        this.dx = 0;
        this.dy = 0;
        this.food = this.generateFood();
        this.score = 0;
        this.gameSpeed = 150;
        this.gamePaused = false;
        this.gameRunning = false;
        
        // Update UI
        this.updateScore();
        this.pauseBtn.textContent = 'Pause';
        this.gameOverEl.style.display = 'none';
        
        // Restart the game
        this.startGame();
    }
    
    gameOver() {
        this.gameRunning = false;
        
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        // Show game over screen
        this.finalScoreEl.textContent = this.score;
        this.gameOverEl.style.display = 'block';
        
        // Add visual effect to the game over
        setTimeout(() => {
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }, 100);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NeonSnakeGame();
});