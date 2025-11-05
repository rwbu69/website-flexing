// ===================================
// GLOBAL VARIABLES
// ===================================
let counter = 0;
let notificationId = 0;

// ===================================
// HERO TEXT CHANGER
// ===================================
function changeHeroText() {
    const titles = [
        'Sebastian Vay Yosafat Pardamean Hutagalung',
        'Frontend Developer',
        'Pengangguran dengan gaya',
        'JavaScript Enthusiast',
        'Creative Coder'
    ];
    
    const subtitles = [
        'Pengangguran dengan gaya',
        'Frontend Developer',
        'Building Amazing Experiences',
        'Crafting Beautiful Interfaces',
        'Bringing Ideas to Life'
    ];
    
    const titleElement = document.getElementById('heroTitle');
    const subtitleElement = document.getElementById('heroSubtitle');
    
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomSubtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
    
    titleElement.style.animation = 'none';
    subtitleElement.style.animation = 'none';
    
    setTimeout(() => {
        titleElement.textContent = randomTitle;
        subtitleElement.textContent = randomSubtitle;
        titleElement.style.animation = 'fadeInScale 0.5s ease';
        subtitleElement.style.animation = 'fadeInUp 0.5s ease';
    }, 50);
}

// ===================================
// ALERT DEMOS
// ===================================
function showAlert() {
    alert('This is a JavaScript alert! 🎉\n\nJavaScript can show messages to users.');
}

function showConfirm() {
    const result = confirm('Do you like JavaScript?\n\nClick OK for Yes, Cancel for No');
    const message = document.getElementById('messageDisplay');
    message.style.display = 'block';
    
    if (result) {
        message.innerHTML = '<strong style="color: #28a745;">✓ Great!</strong> JavaScript is awesome for creating interactive experiences!';
    } else {
        message.innerHTML = '<strong style="color: #dc3545;">✗ Oh no!</strong> Give JavaScript a chance - it can do amazing things!';
    }
    message.classList.add('show');
}

function changeBackgroundColor() {
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector('.js-hero').style.background = randomColor;
    
    showNotification('Background changed! 🎨', 'success');
}

function showPrompt() {
    const name = prompt('What\'s your name?', 'Your name here');
    const message = document.getElementById('messageDisplay');
    message.style.display = 'block';
    
    if (name && name.trim() !== '') {
        message.innerHTML = `<strong style="color: #667eea;">Hello, ${name}! 👋</strong><br>JavaScript can collect and use user input dynamically!`;
    } else {
        message.innerHTML = '<strong style="color: #999;">No name entered.</strong> Try again!';
    }
    message.classList.add('show');
}

// ===================================
// COUNTER FUNCTIONS
// ===================================
function incrementCounter() {
    counter++;
    updateCounterDisplay();
}

function decrementCounter() {
    counter--;
    updateCounterDisplay();
}

function resetCounter() {
    counter = 0;
    updateCounterDisplay();
    showNotification('Counter reset! ↺', 'info');
}

function updateCounterDisplay() {
    const display = document.getElementById('counterDisplay');
    display.textContent = counter;
    display.style.animation = 'none';
    setTimeout(() => {
        display.style.animation = 'pulseAnim 0.3s ease';
    }, 10);
}

// ===================================
// ANIMATION CONTROLS
// ===================================
function animateBox(animationType) {
    const box = document.getElementById('animatedBox');
    
    // Remove all animation classes
    box.classList.remove('bounce', 'spin', 'shake', 'pulse');
    
    // Force reflow to restart animation
    void box.offsetWidth;
    
    // Add the selected animation
    box.classList.add(animationType);
}

function stopAnimation() {
    const box = document.getElementById('animatedBox');
    box.classList.remove('bounce', 'spin', 'shake', 'pulse');
}

// ===================================
// FORM VALIDATION
// ===================================
function validateForm(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const message = document.getElementById('formMessage');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    message.style.display = 'block';
    
    // Validate name
    if (name.length < 3) {
        message.innerHTML = '<strong style="color: #dc3545;">✗ Error:</strong> Name must be at least 3 characters long!';
        message.style.borderLeft = '5px solid #dc3545';
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.innerHTML = '<strong style="color: #dc3545;">✗ Error:</strong> Please enter a valid email address!';
        message.style.borderLeft = '5px solid #dc3545';
        return false;
    }
    
    // Success
    message.innerHTML = `<strong style="color: #28a745;">✓ Success!</strong> Form validated successfully!<br>Name: ${name}<br>Email: ${email}`;
    message.style.borderLeft = '5px solid #28a745';
    message.classList.add('show');
    
    // Clear form
    nameInput.value = '';
    emailInput.value = '';
    
    showNotification('Form submitted successfully! ✓', 'success');
    
    return false;
}

// ===================================
// DYNAMIC LIST MANAGEMENT
// ===================================
function addListItem() {
    const input = document.getElementById('listInput');
    const list = document.getElementById('dynamicList');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter something first!');
        return;
    }
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button onclick="removeListItem(this)">Delete</button>
    `;
    
    list.appendChild(li);
    input.value = '';
    
    showNotification('Item added! ✓', 'success');
}

function removeListItem(button) {
    button.parentElement.remove();
    showNotification('Item removed! ✓', 'info');
}

function clearList() {
    const list = document.getElementById('dynamicList');
    if (list.children.length === 0) {
        alert('List is already empty!');
        return;
    }
    
    if (confirm('Are you sure you want to clear all items?')) {
        list.innerHTML = '';
        showNotification('List cleared! ✓', 'info');
    }
}

// ===================================
// THEME SWITCHER
// ===================================
function changeTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('light-theme', 'dark-theme', 'purple-theme', 'pink-theme');
    
    // Add the selected theme
    document.body.classList.add(`${theme}-theme`);
    
    // Update current theme display
    const themeDisplay = document.getElementById('currentTheme');
    if (themeDisplay) {
        themeDisplay.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('preferredTheme', theme);
    
    const emoji = theme === 'dark' ? '🌙' : '☀️';
    showNotification(`${emoji} ${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied!`, 'success');
}

// ===================================
// MODAL FUNCTIONS
// ===================================
function showModal() {
    const modal = document.getElementById('customModal');
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('customModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('customModal');
    if (event.target === modal) {
        closeModal();
    }
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<strong>${message}</strong>`;
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function showDataExample() {
    const data = Math.floor(Math.random() * 100);
    showNotification(`Random data: ${data}% 📊`, 'info');
}

// ===================================
// SCROLL PROGRESS BAR
// ===================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// ===================================
// PAGE LOAD ANIMATIONS
// ===================================
window.addEventListener('load', () => {
    console.log('🚀 JavaScript loaded successfully!');
    console.log('This page demonstrates the power of JavaScript for interactivity and animations.');
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
        document.body.classList.add(`${savedTheme}-theme`);
        const themeDisplay = document.getElementById('currentTheme');
        if (themeDisplay) {
            themeDisplay.textContent = savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1);
        }
    } else {
        // Default to light theme
        document.body.classList.add('light-theme');
    }
    
    // Show welcome notification after a short delay
    setTimeout(() => {
        if (document.getElementById('notificationContainer')) {
            showNotification('Welcome! Try out the interactive demos below! 👇', 'info');
        }
    }, 1000);
});

// ===================================
// KEYBOARD SHORTCUTS (Easter Egg)
// ===================================
document.addEventListener('keydown', (event) => {
    // Press 'c' to increment counter
    if (event.key === 'c' && document.getElementById('counterDisplay')) {
        incrementCounter();
    }
    
    // Press 'r' to reset counter
    if (event.key === 'r' && document.getElementById('counterDisplay')) {
        resetCounter();
    }
    
    // Press 'Escape' to close modal
    if (event.key === 'Escape') {
        closeModal();
    }
});

console.log('💡 Tip: Press "c" to increment counter, "r" to reset counter!');

// ===================================
// ANIME.JS ANIMATIONS
// ===================================

// Path Animation
function animatePath() {
    const path = anime.path('#motionPath');
    
    anime({
        targets: '#movingCircle',
        translateX: path('x'),
        translateY: path('y'),
        easing: 'easeInOutQuad',
        duration: 2000,
        loop: false
    });
}

// Staggered Animation
function animateStagger() {
    anime({
        targets: '.stagger-box',
        translateY: [
            { value: -60, duration: 500 },
            { value: 0, duration: 500 }
        ],
        scale: [
            { value: 1.2, duration: 500 },
            { value: 1, duration: 500 }
        ],
        rotate: [
            { value: 360, duration: 1000 }
        ],
        backgroundColor: [
            { value: '#764ba2' },
            { value: '#667eea' }
        ],
        delay: anime.stagger(100), // delay starts at 100ms and increases for each element
        loop: false,
        easing: 'easeInOutQuad'
    });
}

// Text Animation
function animateText() {
    anime.timeline({loop: false})
        .add({
            targets: '.letter',
            scale: [0, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 1000,
            delay: (el, i) => 70 * i
        })
        .add({
            targets: '.letter',
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            easing: "easeInOutQuad",
            duration: 800,
            delay: (el, i) => 50 * i
        });
}

// Timeline Animation
function animateTimeline() {
    const timeline = anime.timeline({
        easing: 'easeInOutQuad',
        duration: 500
    });
    
    timeline
        .add({
            targets: '.box1',
            translateX: 250,
            scale: 1.5,
            backgroundColor: '#f093fb'
        })
        .add({
            targets: '.box2',
            translateY: -50,
            rotate: 180,
            backgroundColor: '#43e97b'
        })
        .add({
            targets: '.box3',
            translateX: -250,
            scale: 0.5,
            backgroundColor: '#4facfe'
        })
        .add({
            targets: '.timeline-box',
            translateX: 0,
            translateY: 0,
            rotate: 0,
            scale: 1,
            backgroundColor: (el, i) => {
                return i === 0 ? '#667eea' : i === 1 ? '#764ba2' : '#f093fb';
            }
        });
}

// ===================================
// CHART.JS VARIABLES
// ===================================
let chartjsInstance = null;
let chartData = [65, 59, 80, 81, 56, 55, 40];
const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ===================================
// VANILLA JS CHART
// ===================================
function drawVanillaChart() {
    const canvas = document.getElementById('vanillaChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = chartWidth / chartData.length;
    const maxValue = Math.max(...chartData);
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw bars
    chartData.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barWidth * 0.1;
        const y = canvas.height - padding - barHeight;
        const width = barWidth * 0.8;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height - padding);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, barHeight);
        
        // Draw value on top
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value, x + width / 2, y - 5);
        
        // Draw labels
        ctx.fillText(chartLabels[index], x + width / 2, canvas.height - padding + 20);
    });
    
    // Draw title
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Weekly Activity (Vanilla JS)', canvas.width / 2, 20);
    
    showNotification('Vanilla chart drawn! All done with pure Canvas API 🎨', 'success');
}

// ===================================
// CHART.JS CHART
// ===================================
function drawChartJS() {
    const canvas = document.getElementById('chartjsChart');
    
    // Destroy existing chart if it exists
    if (chartjsInstance) {
        chartjsInstance.destroy();
    }
    
    chartjsInstance = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Weekly Activity',
                data: chartData,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(240, 147, 251, 0.8)',
                    'rgba(67, 233, 123, 0.8)',
                    'rgba(79, 172, 254, 0.8)',
                    'rgba(250, 112, 154, 0.8)',
                    'rgba(254, 225, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(240, 147, 251, 1)',
                    'rgba(67, 233, 123, 1)',
                    'rgba(79, 172, 254, 1)',
                    'rgba(250, 112, 154, 1)',
                    'rgba(254, 225, 64, 1)'
                ],
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Weekly Activity (Chart.js)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#667eea'
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(102, 126, 234, 0.9)',
                    padding: 12,
                    borderColor: '#764ba2',
                    borderWidth: 2
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    showNotification('Chart.js chart created! Notice the smooth animation and tooltips 🚀', 'success');
}

// ===================================
// CHART DATA CONTROLS
// ===================================
function randomizeData() {
    chartData = chartData.map(() => Math.floor(Math.random() * 100) + 20);
    
    // Redraw both charts
    drawVanillaChart();
    drawChartJS();
    
    showNotification('Data randomized! Both charts updated 🎲', 'info');
}

function resetCharts() {
    chartData = [65, 59, 80, 81, 56, 55, 40];
    
    // Clear vanilla chart
    const vanillaCanvas = document.getElementById('vanillaChart');
    const ctx = vanillaCanvas.getContext('2d');
    ctx.clearRect(0, 0, vanillaCanvas.width, vanillaCanvas.height);
    
    // Destroy Chart.js instance
    if (chartjsInstance) {
        chartjsInstance.destroy();
        chartjsInstance = null;
    }
    
    showNotification('Charts reset! Click the buttons to draw them again ↺', 'info');
}
