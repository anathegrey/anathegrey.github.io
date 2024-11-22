// Get the canvas and its context
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Constants
const lambdaSymbol = "λ"; // Lambda symbol
const fontSize = 200; // Font size for the lambda
const blurDuration = 2000; // Blur phase duration in milliseconds
const pixelationDuration = 2000; // Pixelation phase duration in milliseconds
const pixelationStep = 40; // Starting size for pixelation
let pixelSize = pixelationStep;

// Lambda center position
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Phase management
let phase = "blur"; // Current animation phase
let startTime = Date.now(); // Start time of the animation

// Set up initial canvas context
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = `${fontSize}px monospace`;

// Draw the blur effect
function drawBlur() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create a radial gradient to simulate blur
  const gradient = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 200);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, "black");

  // Fill the canvas with the gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Check if blur phase is done
  if (Date.now() - startTime >= blurDuration) {
    phase = "pixelation"; // Move to the next phase
    startTime = Date.now(); // Reset the timer
  }
}

// Draw the pixelated lambda effect
function drawPixelatedLambda() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the lambda symbol as a series of pixels
  for (let x = -fontSize / 2; x < fontSize / 2; x += pixelSize) {
    for (let y = -fontSize / 2; y < fontSize / 2; y += pixelSize) {
      if (Math.random() > 0.5) {
        ctx.fillStyle = "white";
        ctx.fillText(lambdaSymbol, centerX + x, centerY + y);
      }
    }
  }

  // Gradually reduce pixel size to make the lambda clearer
  pixelSize -= 2;
  if (pixelSize <= 2) {
    phase = "clearLambda"; // Transition to the clear lambda phase
    startTime = Date.now(); // Reset the timer
    pixelSize = pixelationStep; // Reset pixel size for any future runs
  }
}

// Draw the clear lambda
function drawClearLambda() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the fully clear lambda symbol
  ctx.fillStyle = "white";
  ctx.fillText(lambdaSymbol, centerX, centerY);

  // Transition to the name display phase after a short delay
  if (Date.now() - startTime >= 1000) {
    phase = "name";
    document.getElementById("nameText").classList.remove("hidden");
    document.getElementById("nameText").style.animation = "noiseEffect 0.5s infinite";
  }
}

// Main animation loop
function animate() {
  switch (phase) {
    case "blur":
      drawBlur();
      break;
    case "pixelation":
      drawPixelatedLambda();
      break;
    case "clearLambda":
      drawClearLambda();
      break;
  }

  // Continue the animation loop
  requestAnimationFrame(animate);
}

// Handle window resizing
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start the animation
animate();
