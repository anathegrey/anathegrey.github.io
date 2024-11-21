// Get the canvas and set up the context
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define constants
const lambdaSymbol = "λ"; // The character to display
const fontSize = 200; // Size of the lambda symbol
const pixelationSpeed = 100; // Speed of pixelation in milliseconds
let pixelSize = 40; // Starting size for pixel blocks
const pixelationThreshold = 2; // Minimum size for pixel blocks before stopping
const noiseDuration = 5000; // Noise effect duration in milliseconds

// Set up the canvas for rendering
function setupCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
}

// Draw the lambda symbol pixelated
function drawLambdaPixelated() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Loop through the canvas area in chunks of `pixelSize`
    for (let x = 0; x < canvas.width; x += pixelSize) {
        for (let y = 0; y < canvas.height; y += pixelSize) {
            // Randomly decide whether to draw this pixel
            if (Math.random() < 0.5) {
                ctx.fillStyle = "white";
                ctx.fillText(lambdaSymbol, centerX + x - canvas.width / 2, centerY + y - canvas.height / 2);
            }
        }
    }

    // Gradually reduce pixel size
    pixelSize -= 2;
    if (pixelSize <= pixelationThreshold) {
        clearInterval(pixelInterval); // Stop the pixelation process
        drawLambdaClear(); // Show the clear lambda symbol
    }
}

// Draw the clear lambda symbol after pixelation completes
function drawLambdaClear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText(lambdaSymbol, canvas.width / 2, canvas.height / 2);
    addNoiseEffect(); // Add the visual noise effect to the text
}

// Add the noise effect to the "Your Name" text
function addNoiseEffect() {
    const noiseText = document.getElementById("noiseText");

    // Flicker effect
    let noiseInterval = setInterval(() => {
        noiseText.style.opacity = Math.random() < 0.5 ? "0.3" : "1";
    }, 50);

    // Stop the flicker effect after a certain duration
    setTimeout(() => {
        clearInterval(noiseInterval);
        noiseText.style.opacity = "1"; // Ensure final opacity is fully visible
    }, noiseDuration);
}

// Handle resizing of the window
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setupCanvas();
    drawLambdaClear(); // Redraw the clear lambda symbol after resize
});

// Start the pixelation process
setupCanvas();
const pixelInterval = setInterval(drawLambdaPixelated, pixelationSpeed);
