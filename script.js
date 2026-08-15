const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const spacing = 40;
let offset = 0;

function drawGrid() {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;

  for (let x = -spacing + (offset % spacing); x < w; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = -spacing + (offset % spacing); y < h; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  for (let x = -spacing + (offset % spacing); x < w; x += spacing) {
    for (let y = -spacing + (offset % spacing); y < h; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  offset += 0.15;
  requestAnimationFrame(drawGrid);
}

drawGrid();

const storyPinned = document.querySelector('.story-pinned');
const storyTrack = document.getElementById('storyTrack');
const bgNum = document.getElementById('bgNum');
const countCurrent = document.getElementById('countCurrent');
const storyLabel = document.getElementById('storyLabel');

const labels = ['STRUCTURE', 'CRAFT', 'MOTION'];
const numbers = ['01', '02', '03'];

function updateStory() {
  const rect = storyPinned.getBoundingClientRect();
  const total = storyPinned.offsetHeight - window.innerHeight;
  let progress = -rect.top / total;
  progress = Math.min(Math.max(progress, 0), 0.999);

  const rawIndex = progress * 3;
  const index = Math.floor(rawIndex);

  storyTrack.style.transform = `translateX(-${(rawIndex / 3) * 100}%)`;

  bgNum.textContent = numbers[index];
  countCurrent.textContent = numbers[index];
  storyLabel.textContent = labels[index];
}

window.addEventListener('scroll', updateStory);
updateStory();

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxStory = document.getElementById('lightboxStory');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.img;
    lightboxStory.textContent = item.dataset.story;
    lightbox.classList.add('open');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
  }
});