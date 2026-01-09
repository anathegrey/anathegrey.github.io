const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Center helpers
function centerX() {
  return canvas.width / 2;
}

function centerY() {
  return canvas.height / 2;
}

const lambdaStrokes = [
  { x1: 50, y1: 60, x2: -30,  y2: -100 },   // left
  { x1: -40,   y1: 60,  x2: 0, y2: -40 }  // right
];


function createStartStrokes() {
  const w = canvas.width;
  const h = canvas.height;

  const offsets = [
    { dx: -w / 2 - 200, dy: -h / 2 - 200 }, // top-left
    { dx:  w / 2 + 200, dy: -h / 2 - 200 }, // top-right
  ];

  return lambdaStrokes.map((s, i) => ({
    x1: s.x1 + offsets[i].dx,
    y1: s.y1 + offsets[i].dy,
    x2: s.x2 + offsets[i].dx,
    y2: s.y2 + offsets[i].dy
  }));
}

let startStrokes = createStartStrokes();

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

let startTime = null;
const buildDuration = 2800; // ms

function buildLambda(timestamp) {
  if (!startTime) startTime = timestamp;

  const elapsed = timestamp - startTime;
  const t = Math.min(elapsed / buildDuration, 1);
  const eased = easeOutCubic(t);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#cfcfcf";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";

  const cx = centerX();
  const cy = centerY();

  lambdaStrokes.forEach((finalStroke, i) => {
    const startStroke = startStrokes[i];

    const x1 = lerp(startStroke.x1, finalStroke.x1, eased);
    const y1 = lerp(startStroke.y1, finalStroke.y1, eased);
    const x2 = lerp(startStroke.x2, finalStroke.x2, eased);
    const y2 = lerp(startStroke.y2, finalStroke.y2, eased);

    ctx.beginPath();
    ctx.moveTo(cx + x1, cy + y1);
    ctx.lineTo(cx + x2, cy + y2);
    ctx.stroke();
  });

  // Continue animation until fully assembled
  if (t < 1) {
    requestAnimationFrame(buildLambda);
  } else {
    // Lock final strokes for one clean frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lambdaStrokes.forEach(s => {
	  ctx.beginPath();
	  ctx.moveTo(cx + s.x1, cy + s.y1);
	  ctx.lineTo(cx + s.x2, cy + s.y2);
	  ctx.stroke();
      });
      if (t < 1) {
	  requestAnimationFrame(buildLambda);
      } else {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  lambdaStrokes.forEach(s => {
	      ctx.beginPath();
	      ctx.moveTo(cx + s.x1, cy + s.y1);
	      ctx.lineTo(cx + s.x2, cy + s.y2);
	      ctx.stroke();
	  });
	  showName();
      }

  }
}

function showName() {
  const nameText = document.getElementById("nameText");
  if (nameText) {
    nameText.style.opacity = "1";
  }
}

startStrokes = createStartStrokes();
requestAnimationFrame(buildLambda);

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

document.addEventListener("DOMContentLoaded", () => {
  const infoWindow = document.getElementById("infoWindow");
  const infoCloseFolder = document.getElementById("infoCloseFolder");

  const pubWindow = document.getElementById("pubWindow");
  const pubCloseFolder = document.getElementById("pubCloseFolder");
    
  const teachWindow = document.getElementById("teachWindow");
  const teachCloseFolder = document.getElementById("teachCloseFolder");

  const infoLink = document.getElementById("infoLink");
  const publicationsLink = document.getElementById("publicationsLink");
  const teachingLink = document.getElementById("teachingLink");

  infoLink.addEventListener("click", () => {
    infoWindow.style.display = "block";
  });

  infoCloseFolder.addEventListener("click", () => {
    infoWindow.style.display = "none";
  });

  publicationsLink.addEventListener("click", () => {
    pubWindow.style.left = "200px";
    pubWindow.style.top = "100px";
    pubWindow.style.display = "block";
  });

  pubCloseFolder.addEventListener("click", () => {
    pubWindow.style.display = "none";
  });
    
  teachingLink.addEventListener("click", () => {
    teachWindow.style.left = "300px";
    teachWindow.style.top = "200px";
    teachWindow.style.display = "block";
  });

  teachCloseFolder.addEventListener("click", () => {
    teachWindow.style.display = "none";
  });

  makeDraggable(infoWindow);
  makeDraggable(pubWindow);
  makeDraggable(teachWindow);
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('publications.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('pubContent').innerHTML = data;
    })
    .catch(error => console.error('Error loading publications:', error));
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('teaching.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('teachContent').innerHTML = data;
    })
    .catch(error => console.error('Error loading teaching:', error));
});

let highestZ = 30;

function bringToFront(element) {
  highestZ++;
  element.style.zIndex = highestZ;
}

document.querySelectorAll('#infoWindow, #pubWindow, #teachWindow').forEach(win => {
  win.addEventListener('mousedown', () => bringToFront(win));
});

function openWindow(id) {
  const win = document.getElementById(id);
  win.style.display = "block";
  bringToFront(win);
}

document.getElementById("infoLink").addEventListener("click", () => {
  openWindow("infoWindow");
});

document.getElementById("publicationsLink").addEventListener("click", () => {
  openWindow("pubWindow");
});

document.getElementById("teachingLink").addEventListener("click", () => {
  openWindow("teachWindow");
});
