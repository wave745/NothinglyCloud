// Track time in the void
let startTime = Date.now();
const voidLevels = [
    { time: 0, title: "Impatient Normie" },
    { time: 10, title: "Novice Nihilist" },
    { time: 30, title: "Zen Lurker" },
    { time: 120, title: "Void Contemplator" },
    { time: 300, title: "Enlightened Nothingist" }
];

// Background gets darker over time - faster transition
function darkenVoid() {
    const seconds = (Date.now() - startTime) / 1000;
    // Make transition much faster - use seconds instead of minutes
    const brightness = Math.max(0, 255 - Math.floor(seconds * 25)); // Faster darkening
    document.body.style.backgroundColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
    
    // Also transition text color as background darkens
    const textBrightness = Math.min(255, Math.floor(seconds * 25));
    document.body.style.color = `rgb(${textBrightness}, ${textBrightness}, ${textBrightness})`;
}

// Update nothingness level
function updateLevel() {
    const seconds = (Date.now() - startTime) / 1000;
    let currentLevel = voidLevels[0].title;
    
    for (const level of voidLevels) {
        if (seconds >= level.time) currentLevel = level.title;
    }
    
    document.getElementById("nothingness").textContent = 
        `Level of Nothingness: ${currentLevel}`;
}

// Check for refresh (performance API)
if (performance.navigation && performance.navigation.type === 1) {
    alert("You broke the Nothing.\nPlease wait 24 hours to re-enter the Void.");
} else if (window.performance) {
    // Modern browsers
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
        alert("You broke the Nothing.\nPlease wait 24 hours to re-enter the Void.");
    }
}

// Update more frequently for faster transition
setInterval(() => {
    darkenVoid();
    updateLevel();
}, 100); // Update every 100ms for smoother transition

// Add a quick fade-in effect on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = 1;
    }, 100);
});