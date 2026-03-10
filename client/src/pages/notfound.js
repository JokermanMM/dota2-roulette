import { HEROES } from '../data/heroes.js';

export function renderNotFound(container) {
  container.innerHTML = '';

  const page = document.createElement('div');
  page.className = 'notfound-page';

  // Floating hero portraits background
  const heroesContainer = document.createElement('div');
  heroesContainer.className = 'notfound-heroes';

  const randomHeroes = [...HEROES].sort(() => Math.random() - 0.5).slice(0, 15);
  randomHeroes.forEach((hero, i) => {
    const img = document.createElement('img');
    img.className = 'notfound-hero-float';
    img.src = hero.img;
    img.alt = hero.locName;
    img.style.cssText = `
      left: ${Math.random() * 90}%;
      animation-duration: ${12 + Math.random() * 10}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    img.onerror = () => img.style.display = 'none';
    heroesContainer.appendChild(img);
  });
  page.appendChild(heroesContainer);

  // Content
  const content = document.createElement('div');
  content.style.cssText = 'position: relative; z-index: 1;';
  content.innerHTML = `
    <div class="notfound-page__code">404</div>
    <h1 class="notfound-page__title">Тебя Glimpse'нуло не туда!</h1>
    <p class="notfound-page__desc">
      Похоже, Disruptor закинул тебя в другое измерение. 
      Эта страница не существует — как и твой ММР после серии поражений. 😅
    </p>
    <a class="btn btn--primary btn--large" data-link href="/setup">
      🏠 Вернуться на базу
    </a>
  `;

  page.appendChild(content);
  container.appendChild(page);
}
