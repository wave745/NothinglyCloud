// Track time in the void
let startTime = Date.now();
const voidLevels = [
    { time: 0, title: "Impatient Normie" },
    { time: 10, title: "Novice Nihilist" },
    { time: 30, title: "Zen Lurker" },
    { time: 120, title: "Void Contemplator" },
    { time: 300, title: "Enlightened Nothingist" }
];

// Background gets darker over time
function darkenVoid() {
    const minutes = (Date.now() - startTime) / 60000;
    // Fixed the syntax error in the original code
    const darkness = Math.min(20, Math.floor(minutes * 2));
    document.body.style.backgroundColor = `rgb(${20 - darkness}, ${20 - darkness}, ${20 - darkness})`;
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

// Sound toggle with Tone.js
const soundBtn = document.getElementById("sound-btn");
let soundPlaying = false;

// Create ambient sound using Tone.js
const ambientSound = {
    synth: null,
    noise: null,
    
    initialize: function() {
        // Create a synth for deep hum
        this.synth = new Tone.FMSynth({
            harmonicity: 0.5,
            modulationIndex: 10,
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 1,
                decay: 0.2,
                sustain: 0.8,
                release: 1.5
            },
            modulation: {
                type: "sine"
            },
            modulationEnvelope: {
                attack: 0.5,
                decay: 0,
                sustain: 1,
                release: 0.5
            }
        }).toDestination();
        
        // Create a noise generator for ambient texture
        this.noise = new Tone.Noise({
            type: "brown",
            volume: -35
        }).toDestination();
        
        // Add effects
        const reverb = new Tone.Reverb({
            decay: 5,
            wet: 0.6
        }).toDestination();
        
        this.synth.connect(reverb);
        this.noise.connect(reverb);
    },
    
    start: function() {
        // Start audio context on user interaction
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        
        // Start ambient sound
        this.synth.triggerAttack("C1");
        this.noise.start();
        
        // Set up a low note every 8 seconds for variation
        Tone.Transport.scheduleRepeat((time) => {
            this.synth.setNote("G0", time);
            setTimeout(() => {
                this.synth.setNote("C1");
            }, 3000);
        }, "8n");
        
        Tone.Transport.start();
    },
    
    stop: function() {
        this.synth.triggerRelease();
        this.noise.stop();
        Tone.Transport.stop();
    }
};

// Initialize ambient sound
ambientSound.initialize();

soundBtn.addEventListener("click", () => {
    if (!soundPlaying) {
        ambientSound.start();
        soundBtn.textContent = "🔊 Disable Nothingscape";
        soundPlaying = true;
    } else {
        ambientSound.stop();
        soundBtn.textContent = "🔇 Enable Nothingscape";
        soundPlaying = false;
    }
});

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

// Update every second
setInterval(() => {
    darkenVoid();
    updateLevel();
}, 1000);

// Add a subtle fade-in effect on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 2s ease-in';
        document.body.style.opacity = 1;
    }, 100);
});
