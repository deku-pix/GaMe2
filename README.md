# Neon Snake Game 🐍

A stunning neon-styled Snake game built with HTML5, CSS3, and JavaScript. Features a dark theme with vibrant neon colors, smooth animations, and multiple control methods.

![Neon Snake Game](https://github.com/user-attachments/assets/285d51d6-d542-41b5-822c-49771b0e6006)

## 🎮 Features

- **Grid-based Movement**: Classic Snake gameplay with smooth grid-based movement
- **Neon Visual Theme**: Dark background with glowing neon colors (cyan, green, pink, yellow)
- **Multiple Control Methods**:
  - WASD input via textbox
  - On-screen arrow buttons
  - Keyboard arrow keys
- **Game Controls**:
  - Pause/Resume functionality
  - Reset game button
  - Play Again after game over
- **Scoring System**:
  - Live score tracking
  - Persistent high score (saved in localStorage)
- **Timer-driven Game Loop**: Smooth 60fps gameplay with increasing speed
- **Collision Detection**: Wall and self-collision detection
- **Food System**: Random food generation with growth mechanics
- **Responsive Design**: Works on desktop and mobile devices

## 🕹️ How to Play

1. **Start**: The game begins automatically when loaded
2. **Movement**: 
   - Use WASD keys in the yellow input box
   - Click the cyan arrow buttons
   - Use keyboard arrow keys
3. **Objective**: Guide the cyan snake to eat the pink food
4. **Growth**: Each food consumed makes the snake longer and increases score
5. **Game Over**: Hitting walls or the snake's own body ends the game
6. **Controls**:
   - **Pause**: Pause/Resume the game
   - **Reset**: Start a new game immediately
   - **Space**: Pause/Resume (keyboard shortcut)

## 🚀 Deployment

### Hugging Face Spaces

This game is designed for deployment to Hugging Face Spaces as a Static HTML app:

1. Create a new Space on Hugging Face
2. Select "Static" as the Space type
3. Upload the following files:
   - `index.html` (main game file)
   - `snake.js` (game logic)
   - `requirements.txt` (deployment config)

### Local Development

To run locally:

```bash
# Clone the repository
git clone https://github.com/deku-pix/GaMe2.git
cd GaMe2

# Start a local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## 🎨 Visual Design

- **Typography**: Orbitron font for futuristic feel
- **Color Scheme**:
  - Background: Deep black with radial gradient
  - Snake Head: Bright cyan (#00ffff)
  - Snake Body: Gradient green (#00ff00)
  - Food: Pulsating pink (#ff0099)
  - Score: Green (#00ff00)
  - High Score: Magenta (#ff00ff)
  - Controls: Yellow (#ffff00)
- **Effects**: Box shadows, text shadows, and glowing animations
- **Layout**: Centered container with neon border effects

## 🔧 Technical Details

- **Pure JavaScript**: No external libraries required
- **Canvas Rendering**: HTML5 Canvas for smooth graphics
- **LocalStorage**: Persistent high score storage
- **CSS Animations**: Smooth glowing effects
- **Responsive Design**: Mobile-friendly interface
- **Timer-based Loop**: `setInterval` for consistent gameplay

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 Files Structure

```
├── index.html          # Main HTML file with styling
├── snake.js           # Game logic and functionality
├── requirements.txt   # Deployment configuration
├── .gitignore        # Git ignore file
└── README.md         # This documentation
```

## 🎯 Game Mechanics

- **Grid Size**: 20x20 tiles (400x400 pixels)
- **Initial Speed**: 150ms per move
- **Speed Increase**: Every 50 points, speed increases by 5ms
- **Scoring**: +10 points per food consumed
- **Snake Growth**: +1 segment per food consumed
- **Collision Types**: Wall collision, self collision

## 🛠️ Customization

The game can be easily customized by modifying:
- Colors in the CSS `:root` variables
- Grid size by changing `gridSize` variable
- Game speed by modifying `gameSpeed`
- Scoring system in the `moveSnake()` function

---

*Built with ❤️ for retro gaming enthusiasts*