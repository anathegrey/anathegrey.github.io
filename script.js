// Background animation
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lambdaSymbol = "λ";
const fontSize = 200;
let pixelSize = 20;
let pixelInterval;
let transitionProgress = 0;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

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

  pixelSize -= 1.5;
  transitionProgress += 0.01;

  if (pixelSize <= 0.3) {
    clearInterval(pixelInterval);
    drawClearLambda();
    setTimeout(showName, 5000);
  }
}

function drawClearLambda() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText(lambdaSymbol, centerX, centerY);
}

pixelInterval = setInterval(pixelizeLambda, 100);

function showName() {
  const nameText = document.getElementById("nameText");
  nameText.style.opacity = "1";
}

// Draggable windows
function makeDraggable(draggableElement) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  draggableElement.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - draggableElement.offsetLeft;
    offsetY = e.clientY - draggableElement.offsetTop;

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", stopDragging);
  });

  function moveElement(e) {
    if (!isDragging) return;
    draggableElement.style.left = `${e.clientX - offsetX}px`;
    draggableElement.style.top = `${e.clientY - offsetY}px`;
  }

  function stopDragging() {
    isDragging = false;
    document.removeEventListener("mousemove", moveElement);
    document.removeEventListener("mouseup", stopDragging);
  }
}

// Window logic
document.addEventListener("DOMContentLoaded", () => {
  const folderWindow = document.getElementById("folderWindow");
  const closeFolder = document.getElementById("closeFolder");

  const nestedFolderWindow = document.getElementById("nestedFolderWindow");
  const nestedCloseFolder = document.getElementById("nestedCloseFolder");

  const infoLink = document.getElementById("infoLink");
  const publicationsLink = document.getElementById("publicationsLink");

  infoLink.addEventListener("click", () => {
    folderWindow.style.display = "block";
  });

  closeFolder.addEventListener("click", () => {
    folderWindow.style.display = "none";
  });

  publicationsLink.addEventListener("click", () => {
    nestedFolderWindow.style.left = "200px";
    nestedFolderWindow.style.top = "100px";
    nestedFolderWindow.style.display = "block";
  });

  nestedCloseFolder.addEventListener("click", () => {
    nestedFolderWindow.style.display = "none";
  });

  makeDraggable(folderWindow);
  makeDraggable(nestedFolderWindow);
});

// Load publications dynamically
document.addEventListener("DOMContentLoaded", () => {
  fetch('publications.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('nestedFolderContent').innerHTML = data;
    })
    .catch(error => console.error('Error loading publications:', error));
});

