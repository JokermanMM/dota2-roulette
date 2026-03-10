import { HEROES } from '../data/heroes.js';

// Sound effect generator using Web Audio API
function createSpinSound(ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 800 + Math.random() * 400;
  gain.gain.value = 0.05;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.03);
}

function createRevealSound(ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
}

export class HeroSpinner {
  constructor(container, options = {}) {
    this.container = container;
    this.targetHero = options.targetHero;
    this.duration = options.duration || 4000;
    this.onComplete = options.onComplete || (() => {});
    this.itemHeight = 80;
    this.audioCtx = null;

    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) {
      // Audio not available
    }

    // Build the strip with repeated heroes
    this.heroes = this._buildStrip();
    this._render();
  }

  _buildStrip() {
    const shuffled = [...HEROES].sort(() => Math.random() - 0.5);
    const strip = [];
    // Add ~50 random heroes, then the target hero at the end
    for (let i = 0; i < 50; i++) {
      strip.push(shuffled[i % shuffled.length]);
    }
    // Place target at a specific position (position 47 out of 50)
    const targetIdx = 47;
    strip[targetIdx] = this.targetHero;
    this.targetIndex = targetIdx;
    return strip;
  }

  _render() {
    this.container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'spinner-container';

    const highlight = document.createElement('div');
    highlight.className = 'spinner-highlight';
    wrapper.appendChild(highlight);

    this.strip = document.createElement('div');
    this.strip.className = 'spinner-strip';

    this.heroes.forEach(hero => {
      const item = document.createElement('div');
      item.className = 'spinner-hero-item';
      item.innerHTML = `
        <img src="${hero.img}" alt="${hero.locName}" loading="lazy" 
             onerror="this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'60\\' height=\\'60\\'><rect fill=\\'%23333\\' width=\\'60\\' height=\\'60\\'/><text x=\\'50%25\\' y=\\'50%25\\' fill=\\'%23888\\' text-anchor=\\'middle\\' dy=\\'.3em\\' font-size=\\'12\\'>${hero.locName.charAt(0)}</text></svg>'" />
        <span>${hero.locName}</span>
      `;
      this.strip.appendChild(item);
    });

    wrapper.appendChild(this.strip);
    this.container.appendChild(wrapper);
  }

  spin() {
    const containerHeight = 300;
    const centerOffset = (containerHeight / 2) - (this.itemHeight / 2);
    const targetPosition = -(this.targetIndex * this.itemHeight) + centerOffset;

    const startTime = performance.now();
    const totalDistance = Math.abs(targetPosition);
    let lastTickIndex = -1;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // Easing: cubic-bezier-like deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentPosition = targetPosition * eased;

      this.strip.style.transform = `translateY(${currentPosition}px)`;

      // Tick sound
      const currentTickIndex = Math.floor(Math.abs(currentPosition) / this.itemHeight);
      if (currentTickIndex !== lastTickIndex && this.audioCtx) {
        lastTickIndex = currentTickIndex;
        if (progress < 0.9) {
          createSpinSound(this.audioCtx);
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Final reveal
        if (this.audioCtx) {
          createRevealSound(this.audioCtx);
        }
        this._showBurst();
        setTimeout(() => this.onComplete(), 500);
      }
    };

    requestAnimationFrame(animate);
  }

  _showBurst() {
    const burst = document.createElement('div');
    burst.className = 'hero-reveal-burst';
    burst.innerHTML = '<div class="burst-ring"></div>';
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);
  }
}
