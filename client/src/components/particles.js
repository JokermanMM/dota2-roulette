export function createParticles(container, count = 30) {
  const colors = ['#dc3545', '#ffd700', '#00d4aa', '#8b5cf6', '#3b82f6'];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'auth-page__particle';
    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(particle);
  }
}

export function createConfetti(container, count = 50) {
  const colors = ['#dc3545', '#ffd700', '#00d4aa', '#8b5cf6', '#ff4757', '#ff6b81'];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 2;

    confetti.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size * 1.5}px;
      background: ${color};
      left: ${left}%;
      top: -20px;
      z-index: 9999;
      pointer-events: none;
      animation: confetti-fall ${2 + Math.random() * 2}s ease-out ${delay}s forwards;
      transform: rotate(${Math.random() * 360}deg);
      border-radius: 2px;
    `;

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }

  // Inject confetti keyframe if not present
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}
