// ==========================
// Countdown Timer for Monday at 10 AM AST
// ==========================
function getNextMondayAt10AMAST() {
    const now = new Date();

    // Set to Monday at 10 AM AST
    const nextMonday = new Date();
    nextMonday.setDate(now.getDate() + (1 + 7 - now.getDay()) % 7);
    nextMonday.setHours(10, 0, 0, 0);  // Monday at 10 AM

    // Convert to AST (UTC-4)
    const astOffset = -4 * 60;  // AST is UTC-4
    const localOffset = now.getTimezoneOffset();  // Local offset
    const timeDiff = (localOffset - astOffset) * 60 * 1000;

    return new Date(nextMonday.getTime() + timeDiff);
}

function updateCountdown() {
    const targetDate = getNextMondayAt10AMAST();
    const now = new Date();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        document.getElementById('countdown').innerText = "The next game is now live!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerText =
        `${days}d ${hours}h ${minutes}m ${seconds}s until the next game`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ==========================
// Game Logic
// ==========================
const images = ['ai1.png', 'real1.png', 'real2.png', 'real3.png'];
let correctImage = '';
let gameOver = false;

function shuffleImages() {
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }

    correctImage = images.find(img => img.startsWith('ai'));
}

function displayImages() {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';

    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = `images/${img}`;
        imgElement.classList.add('game-image');
        imgElement.onclick = () => handleGuess(img);
        imageContainer.appendChild(imgElement);
    });
}

function handleGuess(selectedImage) {
    if (gameOver) return;

    const messageElement = document.getElementById('message');
    const allImages = document.querySelectorAll('.game-image');

    if (selectedImage === correctImage) {
        messageElement.innerHTML = `✅ Correct! The AI image was highlighted.`;
    } else {
        messageElement.innerHTML = `❌ Wrong! The correct image is highlighted.`;
    }

    allImages.forEach(img => {
        img.classList.remove('highlight-correct', 'highlight-wrong');
        if (img.src.includes(correctImage)) {
            img.classList.add('highlight-correct');
        } else {
            img.classList.add('highlight-wrong');
        }
    });

    gameOver = true;
    setTimeout(() => showCountdown(), 10000);
}

function showCountdown() {
    document.getElementById('image-container').style.display = 'none';
    document.getElementById('countdown-container').style.display = 'block';
}

// Initialize Game
shuffleImages();
displayImages();
