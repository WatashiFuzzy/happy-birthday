const CONFIG = {
  recipient: 'Chị yêu',
  dateISO: '2025-09-07T00:00:00+07:00',
  author: 'Fuzzy',
  music: 'happy.mp3',
  message: `Chúc mừng sinh nhật, người chị tuyệt vời của em!\n\n
Cảm ơn chị vì đã luôn là điểm tựa, là tấm gương và là người bạn lớn của em.\n
Chúc chị tuổi mới thật nhiều sức khoẻ, bình an, công việc thuận lợi, và luôn hạnh phúc với những điều chị chọn.\n
Dù bận đến đâu em vẫn luôn tự hào vì có chị.\n
Yêu chị rất nhiều! 💖`,
  quotes: [
    { t: '“Sinh nhật vui vẻ nhé chị yêu của em. May mắn sẽ đến với chị yêu của em.”' },
    { t: '“Thêm một tuổi, thêm một ước mơ – và em tin chị sẽ làm được.”' },
    { t: '“Chúc chị gái yêu của em một ngày sinh nhật thật nhiều niềm vui, may mắn và có thật nhiều hoa nhé! ”' },
  ],
  gallery: [
    { src: './images/chi1.jpg', alt: 'Khoảnh khắc 1' },
    { src: './images/chi2.jpg', alt: 'Khoảnh khắc 2' },
    { src: './images/chi3.jpg', alt: 'Khoảnh khắc 3' },
  ]
};

// Helpers
const $ = (s, r = document) => r.querySelector(s);

// Gán text
$('#recipient').textContent = CONFIG.recipient;
$('#author').textContent = CONFIG.author;
const d = new Date(CONFIG.dateISO);
$('#dateLabel').textContent = d.toLocaleDateString('vi-VN');

// Countdown
function updateCountdown(){
  const now = new Date();
  const target = new Date(CONFIG.dateISO);
  const diff = target - now;
  if (diff <= 0) {
    $('#countdown').textContent = 'Chúc mừng sinh nhật! 🎂';
    return;
  }
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (3600*24));
  const hours = Math.floor((sec % (3600*24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  $('#countdown').textContent = `${days} ngày ${hours}:${minutes}:${seconds}`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Typewriter
const span = document.createElement('span');
$('#typed').appendChild(span);
let i = 0;
(function type(){
  if (i <= CONFIG.message.length){
    span.textContent = CONFIG.message.slice(0, i++);
    setTimeout(type, 18);
  }
})();

// Quotes
CONFIG.quotes.forEach(q => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<p class="text-white/80">${q.t}</p>`;
  $('#quotes').appendChild(card);
});

// Gallery
CONFIG.gallery.forEach(g => {
  const fig = document.createElement('figure');
  const img = document.createElement('img');
  img.src = g.src;
  img.alt = g.alt;
  fig.appendChild(img);
  $('#gallery').appendChild(fig);
});

// Music
const player = $('#player');
const playBtn = $('#playBtn');
if(CONFIG.music){
  player.src = CONFIG.music;
  // tự động phát khi load
  player.muted = false;
  player.play().catch(()=>{}); 
}

// Confetti
$('#confettiBtn').addEventListener('click', () => {
  if (window.confetti) {
    const end = Date.now() + 700;
    (function frame(){
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
});
window.addEventListener('load', () => {
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
});

