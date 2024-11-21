// Get the canvas and the context
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Lambda symbol and constants
const lambdaSymbol = "λ"; // Symbol to display
const fontSize = 200; // Font size for the lambda
let pixelSize = 40; // Starting pixel size for pixelation
const pixelationSpeed = 100; // Speed of pixelation in milliseconds
const pixelationThreshold = 2; // Minimum pixel size before clearing

// Animation Phases
let pixelationComplete = false; // Track if pixelation is done

// Center coordinates
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Set up the canvas
function setupCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
}

// Draw the pixelated lambda
function drawLambdaPixelated() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through the canvas in chunks of `pixelSize`
    for (let x = 0; x < canvas.width; x += pixelSize) {
        for (let y = 0; y < canvas.height; y += pixelSize) {
            if (Math.random() < 0.5) { // Randomly decide to draw this pixel
                ctx.fillStyle = "white";
                ctx.fillText(lambdaSymbol, centerX + x - canvas.width / 2, centerY + y - canvas.height / 2);
            }
        }
    }

    // Gradually reduce the pixel size
    pixelSize -= 2;
    if (pixelSize <= pixelationThreshold) {
        clearInterval(pixelInterval); // Stop the pixelation animation
        pixelationComplete = true;
        drawLambdaClear(); // Transition to the clear lambda
    }
}

// Draw the clear lambda symbol
function drawLambdaClear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText(lambdaSymbol, centerX, centerY);

    // After a delay, show the name text
    setTimeout(() => {
        showNameText();
    }, 1000); // 1-second delay before showing the name
}

// Show the name text with noise effect
function showNameText() {
    const nameText = document.getElementById("nameText");
    nameText.classList.remove("hidden"); // Reveal the text
    nameText.style.opacity = "1"; // Ensure it's visible
}

// Handle window resizing
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setupCanvas();

    if (pixelationComplete) {
        drawLambdaClear(); // Redraw the clear lambda if pixelation is done
    }
});

// Start the pixelation process
setupCanvas();
const pixelInterval = setInterval(drawLambdaPixelated, pixelationSpeed);
