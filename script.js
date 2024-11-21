const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lambdaSymbol = "λ"; // Customize this if you want a different symbol
const fontSize = 200; // Adjust size as needed
const noiseDuration = 5000; // Duration for visual noise effect in milliseconds

// Lambda Pixelation Effect
let pixelSize = 20;
let pixelInterval = setInterval(drawLambdaPixelated, 100);

function drawLambdaPixelated() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // Draw lambda with pixel effect
    for (let i = 0; i < canvas.width; i += pixelSize) {
        for (let j = 0; j < canvas.height; j += pixelSize) {
            if (Math.random() < 0.5) { // Randomly pixelate
                ctx.fillText(lambdaSymbol, x + i - canvas.width / 2, y + j - canvas.height / 2);
            }
        }
    }

    pixelSize -= 2;
    if (pixelSize <= 2) {
        clearInterval(pixelInterval);
        drawLambdaClear();
    }
}

function drawLambdaClear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(lambdaSymbol, canvas.width / 2, canvas.height / 2);
    addNoiseEffect();
}

// Noise Effect for the Text
function addNoiseEffect() {
    const noiseText = document.getElementById("noiseText");
    let noiseInterval = setInterval(() => {
        noiseText.style.opacity = Math.random() < 0.5 ? "1" : "0.5";
    }, 50);

    setTimeout(() => {
        clearInterval(noiseInterval);
        noiseText.style.opacity = "1";
    }, noiseDuration);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawLambdaClear();
});
