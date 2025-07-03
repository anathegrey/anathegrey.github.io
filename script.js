// Get references to canvas and context
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Lambda symbol and font settings
const lambdaSymbol = "λ";
const fontSize = 200; 
const initialPixelSize = 20;
let pixelSize = initialPixelSize; 
let pixelInterval; 
let pixelOpacity = 0.1;
let phase = "pixelation";

// Lambda position
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;


// Initialize animation parameters
let transitionProgress = 0; 

// Adjust pixelizeLambda to smoothly transition to lambda shape
function pixelizeLambda() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gradually reveal the lambda shape
  const easedProgress = easeInOut(transitionProgress); 
  /*pixelMap.forEach(({ x: targetX, y: targetY }) => {
    // Calculate current pixel position based on progress
    const randomX = Math.random() * canvas.width;
    const randomY = Math.random() * canvas.height;
    const currentX = randomX + easedProgress * (targetX - randomX);
    const currentY = randomY + easedProgress * (targetY - randomY);

    ctx.fillStyle = "white";
    ctx.fillRect(currentX - pixelSize / 2, currentY - pixelSize / 2, pixelSize, pixelSize);
  });*/
  for (let x = centerX - 100; x <= centerX + 100; x += pixelSize) {
    for (let y = centerY - 100; y <= centerY + 100; y += pixelSize) {
      // Randomly decide whether to "light up" a pixel
      if (Math.random() < 0.5) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  }

  // Gradually decrease pixel size and increase transition progress
  pixelSize -= 1.5;
  transitionProgress += 0.01;

  // If the transition is complete, stop the animation
  if (pixelSize <= 0.3) {
    clearInterval(pixelInterval);
    drawClearLambda(); // Draw final lambda
    setTimeout(showName, 5000); // Show name after delay
  }
}

// Smooth easing function
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Draw the final clear lambda symbol
function drawClearLambda() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText(lambdaSymbol, centerX, centerY);
}

// Start pixelation effect
pixelInterval = setInterval(pixelizeLambda, 100);

// Display the name with glitch effect
function showName() {
  const nameText = document.getElementById("nameText");
  nameText.style.opacity = "1"; // Fade-in animation
}

// Select the folder and window elements
const folderContainer = document.getElementById('folderContainer');
const folderWindow = document.getElementById('folderWindow');
const closeFolderButton = document.getElementById('closeFolder');

// Open the folder window when the folder is clicked
folderContainer.addEventListener('click', () => {
  console.log('Folder clicked!');
  folderWindow.style.display = 'block'; 
});

// Close the folder window when the "X" button is clicked
closeFolderButton.addEventListener('click', () => {
  console.log('Close button clicked!');
  folderWindow.style.display = 'none'; 
});

setTimeout(() => {
  document.getElementById('folderContainer').style.opacity = '1';
  document.getElementById('toolbar').style.opacity = '1';
}, 1000); 

// Make an element draggable
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

// Initialize draggable elements
/*document.addEventListener("DOMContentLoaded", () => {
  const folderWindow = document.getElementById("folderWindow");
  const nestedFolderWindow = document.getElementById("nestedFolderWindow");

  makeDraggable(folderWindow);
  makeDraggable(nestedFolderWindow);
});*/

document.addEventListener("DOMContentLoaded", () => {
  const folderIcon = document.getElementById("folderIcon");
  const folderWindow = document.getElementById("folderWindow");
  const closeFolder = document.getElementById("closeFolder");

  const publicationsFolder = document.getElementById("publicationsFolder");
  const nestedFolderWindow = document.getElementById("nestedFolderWindow");
  const nestedCloseFolder = document.getElementById("nestedCloseFolder");

  // Toggle Info Folder
  folderIcon.addEventListener("click", () => {
      folderWindow.style.display = "block";
  });

  closeFolder.addEventListener("click", () => {
      folderWindow.style.display = "none";
  });

  // Toggle Publications Folder
  publicationsFolder.addEventListener("click", () => {
    const infoWindowRect = folderWindow.getBoundingClientRect();

    nestedFolderWindow.style.left = `${infoWindowRect.right - 350}px`; 
    nestedFolderWindow.style.top = `${infoWindowRect.top + 50}px`; 

    // Display the Publications folder window
    nestedFolderWindow.style.display = "block";
});

  nestedCloseFolder.addEventListener("click", () => {
      nestedFolderWindow.style.display = "none";
  });

  makeDraggable(folderWindow);
  makeDraggable(nestedFolderWindow);
});

// Load publications.html into the nestedFolderContent div
document.addEventListener("DOMContentLoaded", () => {
  fetch('publications.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('nestedFolderContent').innerHTML = data;
    })
    .catch(error => console.error('Error loading publications:', error));
});
