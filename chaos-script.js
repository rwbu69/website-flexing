// ===================================
// CHAOS MODE - ANIMATION MADNESS!
// ===================================

let animationCount = 0;
let chaosLevel = 0;
let trailColor = 'gradient1';
let pathAnimation = null;

// Update stats
function updateStats() {
    document.getElementById('animCount').textContent = animationCount;
    document.getElementById('chaosLevel').textContent = chaosLevel + '%';
}

// ===================================
// PARTICLE SYSTEM
// ===================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            hue: Math.random() * 360
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            p.hue = (p.hue + 1) % 360;
            
            ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// START CHAOS
// ===================================
function startChaos() {
    createFlyingObjects();
    chaosLevel = Math.min(chaosLevel + 10, 100);
    updateStats();
    
    anime({
        targets: '.chaos-btn',
        scale: [1, 1.3, 1],
        rotate: [0, 360],
        duration: 600,
        easing: 'easeInOutQuad'
    });
}

// ===================================
// FLYING OBJECTS
// ===================================
function createFlyingObjects() {
    const container = document.getElementById('flyingObjects');
    const emojis = ['🚀', '⭐', '💫', '🌟', '✨', '🎨', '🎭', '🎪', '🎢', '🎡'];
    
    for (let i = 0; i < 10; i++) {
        const obj = document.createElement('div');
        obj.className = 'flying-object';
        obj.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        obj.style.left = Math.random() * 100 + '%';
        obj.style.top = Math.random() * 100 + '%';
        container.appendChild(obj);
        
        anime({
            targets: obj,
            translateX: () => anime.random(-300, 300),
            translateY: () => anime.random(-300, 300),
            rotate: () => anime.random(-720, 720),
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            duration: 3000,
            easing: 'easeInOutQuad',
            complete: () => obj.remove()
        });
    }
    
    animationCount += 10;
    updateStats();
}

// ===================================
// RUNNING LETTERS
// ===================================
function initRunningLetters() {
    const playground = document.getElementById('letterPlayground');
    const letters = playground.querySelectorAll('.running-letter');
    
    playground.addEventListener('mousemove', (e) => {
        const rect = playground.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        letters.forEach(letter => {
            const letterRect = letter.getBoundingClientRect();
            const letterX = letterRect.left - rect.left + letterRect.width / 2;
            const letterY = letterRect.top - rect.top + letterRect.height / 2;
            
            const dx = letterX - mouseX;
            const dy = letterY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 2;
                const moveX = Math.cos(angle) * force;
                const moveY = Math.sin(angle) * force;
                
                anime({
                    targets: letter,
                    translateX: moveX,
                    translateY: moveY,
                    scale: 1.5,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            } else {
                anime({
                    targets: letter,
                    translateX: 0,
                    translateY: 0,
                    scale: 1,
                    duration: 500,
                    easing: 'easeOutElastic(1, .6)'
                });
            }
        });
    });
}

// ===================================
// SPINNING WORDS
// ===================================
function spinAllWords() {
    anime({
        targets: '.spinning-word',
        rotate: '+=720',
        scale: [1, 1.5, 1],
        duration: 2000,
        easing: 'easeInOutElastic(1, .6)',
        delay: anime.stagger(100)
    });
    
    animationCount++;
    chaosLevel = Math.min(chaosLevel + 5, 100);
    updateStats();
}

function explodeWords() {
    anime({
        targets: '.spinning-word',
        translateX: () => anime.random(-300, 300),
        translateY: () => anime.random(-300, 300),
        scale: [1, 2, 0.5],
        rotate: () => anime.random(-180, 180),
        duration: 1000,
        easing: 'easeOutExpo',
        complete: () => {
            anime({
                targets: '.spinning-word',
                translateX: 0,
                translateY: 0,
                scale: 1,
                rotate: 0,
                duration: 800,
                easing: 'easeInOutBack'
            });
        }
    });
    
    animationCount++;
    chaosLevel = Math.min(chaosLevel + 10, 100);
    updateStats();
}

function waveWords() {
    const words = document.querySelectorAll('.spinning-word');
    words.forEach((word, index) => {
        anime({
            targets: word,
            translateY: [
                { value: -50, duration: 500 },
                { value: 0, duration: 500 }
            ],
            easing: 'easeInOutSine',
            delay: index * 100,
            loop: 3
        });
    });
    
    animationCount++;
    updateStats();
}

// ===================================
// MORPHING SHAPES
// ===================================
const shapes = {
    circle: 'M 200,200 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0',
    square: 'M 100,100 L 300,100 L 300,300 L 100,300 Z',
    star: 'M 200,80 L 230,170 L 320,170 L 250,230 L 280,320 L 200,260 L 120,320 L 150,230 L 80,170 L 170,170 Z',
    heart: 'M 200,280 C 200,280 100,220 100,160 C 100,120 120,100 150,100 C 170,100 190,110 200,130 C 210,110 230,100 250,100 C 280,100 300,120 300,160 C 300,220 200,280 200,280 Z'
};

function morphShape(shapeName) {
    const path = document.getElementById('morphPath');
    
    anime({
        targets: path,
        d: shapes[shapeName],
        duration: 1000,
        easing: 'easeInOutQuad'
    });
    
    anime({
        targets: '#morphingSVG',
        rotate: '+=360',
        duration: 1000,
        easing: 'easeInOutQuad'
    });
    
    animationCount++;
    updateStats();
}

// Initialize with circle
window.addEventListener('DOMContentLoaded', () => {
    const path = document.getElementById('morphPath');
    if (path) {
        path.setAttribute('d', shapes.circle);
    }
});

// ===================================
// BOUNCING BALLS
// ===================================
function createBouncingBalls() {
    const container = document.getElementById('bouncingBalls');
    container.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const ball = document.createElement('div');
        ball.className = 'bouncing-ball';
        ball.style.left = Math.random() * 90 + '%';
        ball.style.top = '10%';
        ball.style.background = `radial-gradient(circle at 30% 30%, #fff, hsl(${Math.random() * 360}, 100%, 50%))`;
        container.appendChild(ball);
        
        anime({
            targets: ball,
            translateY: [
                { value: 350, duration: 1000, easing: 'easeInQuad' },
                { value: 0, duration: 1000, easing: 'easeOutQuad' }
            ],
            translateX: () => anime.random(-50, 50),
            loop: true
        });
    }
    
    animationCount += 15;
    chaosLevel = Math.min(chaosLevel + 8, 100);
    updateStats();
}

// ===================================
// TEXT EXPLOSION
// ===================================
function explodeText() {
    const text = document.getElementById('explodableText');
    const area = document.getElementById('explosionArea');
    const letters = text.textContent.split('');
    
    text.style.display = 'none';
    
    letters.forEach((letter, index) => {
        if (letter === ' ') return;
        
        const span = document.createElement('div');
        span.className = 'exploded-letter';
        span.textContent = letter;
        span.style.left = '50%';
        span.style.top = '50%';
        area.appendChild(span);
        
        const angle = (360 / letters.length) * index;
        const radius = 300;
        
        anime({
            targets: span,
            translateX: Math.cos(angle * Math.PI / 180) * radius,
            translateY: Math.sin(angle * Math.PI / 180) * radius,
            rotate: anime.random(-720, 720),
            scale: [1, 2, 0],
            opacity: [1, 1, 0],
            duration: 2000,
            easing: 'easeOutExpo',
            complete: () => span.remove()
        });
    });
    
    animationCount++;
    chaosLevel = Math.min(chaosLevel + 15, 100);
    updateStats();
}

function resetExplosion() {
    const text = document.getElementById('explodableText');
    text.style.display = 'block';
    
    anime({
        targets: text,
        scale: [0, 1.2, 1],
        rotate: [180, 0],
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
    });
}

// ===================================
// GRAVITY LETTERS
// ===================================
function dropLetters() {
    const container = document.getElementById('gravityText');
    const text = container.textContent;
    container.innerHTML = '';
    
    text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.className = 'gravity-letter';
        span.textContent = letter;
        container.appendChild(span);
        
        anime({
            targets: span,
            translateY: [
                { value: 0, duration: 0 },
                { value: 300, duration: 1000, easing: 'easeInQuad' },
                { value: 0, duration: 800, easing: 'easeOutBounce' }
            ],
            rotate: () => anime.random(-360, 360),
            delay: index * 50
        });
    });
    
    animationCount++;
    chaosLevel = Math.min(chaosLevel + 7, 100);
    updateStats();
}

// ===================================
// PATH ANIMATION
// ===================================
function animatePath() {
    const path = anime.path('#motionPath');
    
    if (pathAnimation) {
        pathAnimation.pause();
    }
    
    pathAnimation = anime({
        targets: ['#pathBall', '#pathText'],
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        duration: 3000,
        easing: 'linear',
        loop: true
    });
    
    animationCount++;
    updateStats();
}

function reversePathAnimation() {
    if (pathAnimation) {
        pathAnimation.reverse();
        pathAnimation.play();
    }
}

// ===================================
// STAGGER GRID
// ===================================
function createStaggerGrid() {
    const grid = document.getElementById('staggerGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 48; i++) {
        const item = document.createElement('div');
        item.className = 'stagger-item';
        item.textContent = i + 1;
        grid.appendChild(item);
    }
}

function staggerGridIn() {
    anime({
        targets: '.stagger-item',
        scale: [0, 1],
        opacity: [0, 1],
        translateY: [-50, 0],
        rotate: [180, 0],
        delay: anime.stagger(50, { grid: [8, 6], from: 'center' }),
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
    });
    
    animationCount++;
    updateStats();
}

function staggerGridOut() {
    anime({
        targets: '.stagger-item',
        scale: [1, 0],
        opacity: [1, 0],
        translateY: [0, 50],
        rotate: [0, -180],
        delay: anime.stagger(50, { grid: [8, 6], from: 'center' }),
        duration: 800,
        easing: 'easeInBack'
    });
    
    animationCount++;
    updateStats();
}

function chaosGrid() {
    anime({
        targets: '.stagger-item',
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        rotate: () => anime.random(-360, 360),
        scale: () => anime.random(0.5, 2),
        backgroundColor: () => {
            const hue = Math.random() * 360;
            return `hsl(${hue}, 70%, 60%)`;
        },
        delay: anime.stagger(30),
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
            anime({
                targets: '.stagger-item',
                translateX: 0,
                translateY: 0,
                rotate: 0,
                scale: 1,
                duration: 1000,
                delay: anime.stagger(30),
                easing: 'easeInOutBack'
            });
        }
    });
    
    animationCount++;
    chaosLevel = Math.min(chaosLevel + 12, 100);
    updateStats();
}

// ===================================
// MOUSE TRAIL
// ===================================
function initMouseTrail() {
    const playground = document.getElementById('trailPlayground');
    let dots = [];
    
    playground.addEventListener('mousemove', (e) => {
        const rect = playground.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dot = document.createElement('div');
        dot.className = `trail-dot trail-${trailColor}`;
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        playground.appendChild(dot);
        dots.push(dot);
        
        anime({
            targets: dot,
            scale: [0, 2, 0],
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeOutQuad',
            complete: () => {
                dot.remove();
                dots = dots.filter(d => d !== dot);
            }
        });
        
        if (dots.length > 50) {
            const oldDot = dots.shift();
            if (oldDot && oldDot.parentNode) {
                oldDot.remove();
            }
        }
    });
}

function changeTrailColor(color) {
    trailColor = color;
}

function clearTrail() {
    const playground = document.getElementById('trailPlayground');
    const dots = playground.querySelectorAll('.trail-dot');
    dots.forEach(dot => dot.remove());
}

// ===================================
// ULTIMATE CHAOS FUNCTIONS
// ===================================
function shakeEverything() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('mega-shake');
        setTimeout(() => section.classList.remove('mega-shake'), 1000);
    });
    
    chaosLevel = 100;
    updateStats();
}

function rainbowEverything() {
    document.body.classList.toggle('rainbow-mode');
    chaosLevel = Math.min(chaosLevel + 20, 100);
    updateStats();
}

function rotateAllSections() {
    anime({
        targets: 'section',
        rotate: '+=360',
        duration: 2000,
        easing: 'easeInOutQuad',
        delay: anime.stagger(200)
    });
    
    animationCount++;
    chaosLevel = Math.min(chaosLevel + 25, 100);
    updateStats();
}

function resetEverything() {
    // Stop all animations
    anime.remove('*');
    
    // Remove classes
    document.body.classList.remove('rainbow-mode');
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('mega-shake');
        section.style.transform = '';
    });
    
    // Reset chaos level
    chaosLevel = 0;
    animationCount = 0;
    updateStats();
    
    // Reinitialize
    setTimeout(() => {
        initRunningLetters();
        initMouseTrail();
        createStaggerGrid();
    }, 100);
}

// ===================================
// INITIALIZATION
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initRunningLetters();
    initMouseTrail();
    createStaggerGrid();
    updateStats();
    
    // Auto-create some flying objects on load
    setTimeout(createFlyingObjects, 1000);
});
