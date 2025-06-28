console.log('Agriculture Landing Page JS loaded.');

function createClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;
    clock.innerHTML = '';
    const face = document.createElement('div');
    face.className = 'clock-face';
    // Create ticks
    for (let i = 0; i < 12; i++) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        tick.style.transform = `rotate(${i * 30}deg)`;
        face.appendChild(tick);
        // Create pointy sticks
        const stick = document.createElement('div');
        stick.className = 'pointy-stick';
        stick.style.transform = `rotate(${i * 30}deg)`;
        face.appendChild(stick);
    }
    // Create hands
    const hourHand = document.createElement('div');
    hourHand.className = 'hand hour';
    const minuteHand = document.createElement('div');
    minuteHand.className = 'hand minute';
    const secondHand = document.createElement('div');
    secondHand.className = 'hand second';
    face.appendChild(hourHand);
    face.appendChild(minuteHand);
    face.appendChild(secondHand);
    clock.appendChild(face);

    function updateClock() {
        const now = new Date();
        const sec = now.getSeconds();
        const min = now.getMinutes();
        const hr = now.getHours() % 12;
        const secDeg = sec * 6;
        const minDeg = min * 6 + sec * 0.1;
        const hrDeg = hr * 30 + min * 0.5;
        hourHand.style.transform = `translate(-50%, 0) rotate(${hrDeg}deg)`;
        minuteHand.style.transform = `translate(-50%, 0) rotate(${minDeg}deg)`;
        secondHand.style.transform = `translate(-50%, 0) rotate(${secDeg}deg)`;
    }
    updateClock();
    setInterval(updateClock, 1000);
}

function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    if (!bubblesContainer) return;
    const bubbleCount = 30;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 40 + 20; // 20px to 60px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${8 + Math.random() * 8}s`;
        bubble.style.animationDelay = `${Math.random() * 12}s`;
        bubblesContainer.appendChild(bubble);
    }
}

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function animateBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    const bubbleData = [];
    bubbles.forEach((bubble, i) => {
        // Assign random properties if not already set
        if (!bubble._bubbleData) {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            bubble._bubbleData = {
                x: randomBetween(0, vw),
                y: randomBetween(0, vh),
                dx: randomBetween(-2.5, 2.5),
                dy: randomBetween(-2.5, 2.5), // allow all directions
                size: parseFloat(bubble.style.width),
                drift: randomBetween(-0.3, 0.3)
            };
        }
        let d = bubble._bubbleData;
        d.x += d.dx + d.drift * Math.sin(Date.now() / 1000 + d.x);
        d.y += d.dy;
        // Wrap around screen
        if (d.x < -d.size) d.x = window.innerWidth + d.size;
        if (d.x > window.innerWidth + d.size) d.x = -d.size;
        if (d.y < -d.size) d.y = window.innerHeight + d.size;
        if (d.y > window.innerHeight + d.size) d.y = -d.size;
        bubbleData[i] = d;
    });
    // Collision detection and response
    for (let i = 0; i < bubbleData.length; i++) {
        for (let j = i + 1; j < bubbleData.length; j++) {
            const a = bubbleData[i];
            const b = bubbleData[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (a.size + b.size) / 2) {
                // Simple elastic collision: swap velocities
                const tempDx = a.dx;
                const tempDy = a.dy;
                a.dx = b.dx;
                a.dy = b.dy;
                b.dx = tempDx;
                b.dy = tempDy;
                // Move them apart to prevent sticking
                const overlap = (a.size + b.size) / 2 - dist;
                const angle = Math.atan2(dy, dx);
                a.x += Math.cos(angle) * (overlap / 2);
                a.y += Math.sin(angle) * (overlap / 2);
                b.x -= Math.cos(angle) * (overlap / 2);
                b.y -= Math.sin(angle) * (overlap / 2);
            }
        }
    }
    bubbles.forEach((bubble, i) => {
        const d = bubbleData[i];
        bubble.style.left = `${d.x}px`;
        bubble.style.top = `${d.y}px`;
    });
    requestAnimationFrame(animateBubbles);
}

function createHeaderClouds() {
    const container = document.querySelector('.header-cloudy-gradient');
    if (!container) return;
    const cloudCount = 8 + Math.floor(Math.random() * 4); // 8-11 clouds
    const headerHeight = container.offsetHeight || 200;
    const headerWidth = container.offsetWidth || window.innerWidth;
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud-shape';
        const size = 120 + Math.random() * 180; // 120-300px
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size * (0.5 + Math.random() * 0.7)}px`;
        cloud.style.left = `${Math.random() * (headerWidth - size)}px`;
        cloud.style.top = `${Math.random() * (headerHeight * 0.7)}px`;
        cloud.style.opacity = 0.10 + Math.random() * 0.18;
        cloud.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(cloud);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createClock();
    createBubbles();
    animateBubbles();
    createHeaderClouds();
});
