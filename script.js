// Get references to canvas and context
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Lambda symbol and font settings
const lambdaSymbol = "λ";
const fontSize = 200; // Customize size
const initialPixelSize = 20; // Initial pixel size
let pixelSize = initialPixelSize; // Current pixelation size
let pixelInterval; // Interval for pixelation effect
let phase = "blur";

// Initialize lambda drawing position
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Draw blurred lambda (initial state)
function drawBlurredLambda() {
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";

  for (let i = 0; i < 10; i++) {
      ctx.fillText(lambdaSymbol, centerX, centerY);
  }
  phase = "pixelation";
}

// Pixelize the lambda gradually
function pixelizeLambda() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the pixelated lambda
  for (let x = centerX - 100; x <= centerX + 100; x += pixelSize) {
    for (let y = centerY - 100; y <= centerY + 100; y += pixelSize) {
      if (Math.random() < 0.5) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  }
  // Gradually refine the resolution
  pixelSize -= 2;
    if (pixelSize <= 2) {
	phase = "clearLambda";
	// Clear pixelation interval
	clearInterval(pixelInterval);
	
	// Finalize by drawing the clear lambda
	drawClearLambda();

	// Reveal the name after lambda is clear
	setTimeout(showName, 500); // Small delay before name appears
    }
}

// Draw the final, clear lambda symbol
function drawClearLambda() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText(lambdaSymbol, centerX, centerY);
}

// Display the name with a noise fade-in effect
function showName() {
  const nameText = document.getElementById("nameText");
  nameText.style.opacity = "1"; // Trigger fade-in animation
}

// Main animation loop
function animate() {
  switch (phase) {
    case "blur":
      drawBlurredLambda();
      break;
    case "pixelation":
      pixelizeLambda();
      break;
    case "clearLambda":
      drawClearLambda();
      break;
  }

  // Continue the animation loop
  requestAnimationFrame(animate);
}

// Event listeners and initialization
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start the animation
drawBlurredLambda();
pixelInterval = setInterval(pixelizeLambda, 100);
