const GameContent = document.getElementById("game-content");

class FlappyBird {
  constructor() {
    this.flappyBirdSprite = document.createElement("img");
    this.flappyBirdSprite.src = "../images/flappy-bird.png";
    this.flappyBirdSprite.style.width = "80px";
    this.flappyBirdSprite.style.height = "55px";
    this.y = 200;
    this.velocityY = 0;
    this.gravity = 0.2;
  }

  // Update the bird's position
  update() {
    if (
      this.y >=
      parseInt(window.getComputedStyle(GameContent).height) -
        parseInt(this.flappyBirdSprite.style.height)
    ) {
      return;
    } else {
      this.velocityY += this.gravity;
      this.y += this.velocityY;
      this.flappyBirdSprite.style.transform = `translateY(${this.y}px)`; // Use transform to move the bird
    }
  }

  // Reset the bird data
  reset() {
    this.y = 200;
    this.velocityY = 0;
    this.gravity = 0.2;
  }

  // Handle jumping
  jump() {
    if (this.y - parseInt(this.flappyBirdSprite.style.width) > 0) {
      this.velocityY = -5;
    }
  }

  getSprite() {
    return this.flappyBirdSprite;
  }
}

const flappyBirdSprite = new FlappyBird();

// Render's all objects to the screen
function Render() {
  if (!GameContent) {
    console.error("Failed to find 'game-content' element");
    return;
  }

  GameContent.appendChild(flappyBirdSprite.getSprite());

  // Initialize the game loop
  function gameLoop() {
    flappyBirdSprite.update();

    // Clear the game content
    GameContent.innerHTML = "";

    // Render the updated game state
    GameContent.appendChild(flappyBirdSprite.getSprite());

    // Request the next frame
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
}

// Setup the game on load
document.addEventListener("DOMContentLoaded", () => {
  Render();
});

// Handle key presses
document.addEventListener("keypress", (event) => {
  if (event.key === " ") {
    flappyBirdSprite.jump();
  } else if (event.key === "r") {
    flappyBirdSprite.reset();
  }
});
