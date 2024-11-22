// Get references to canvas and context
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Lambda symbol and font settings
const lambdaSymbol = "λ";
const fontSize = 200; // Customize size
const pixelSize = 20; // Pixelation size
let pixelInterval;
let noiseInterval;

// Initialize lambda drawing position
const centerX = canvas.width / 2;
const centerY = canvas.height / 2 - fontSize / 2;

// Draw blurred lambda
function drawBlurredLambda() {
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";

  for (let i = 0; i < 10; i++) {
    ctx.fillText(lambdaSymbol, centerX, centerY);
  }
}

// Pixelize the lambda gradually
function pixelizeLambda() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = centerX - 100; x <= centerX + 100; x += pixelSize) {
    for (let y = centerY - 100; y <= centerY + 100; y += pixelSize) {
      if (Math.random() < 0.5) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  }

  pixelSize -= 2; // Gradually refine the resolution
  if (pixelSize <= 2) {
    clearInterval(pixelInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(lambdaSymbol, centerX, centerY);
    showName(); // Reveal name after pixelation
  }
}

// Display the name with a noise fade-in effect
function showName() {
  const nameText = document.getElementById("nameText");
  nameText.style.opacity = "1"; // Trigger fade-in animation
}

// Event listeners and initialization
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBlurredLambda();
});

// Start the animation
drawBlurredLambda();
pixelInterval = setInterval(pixelizeLambda, 100);
