import { api } from '../utils/api.js';
import { navigateTo } from '../router.js';
import { getRoleById } from '../data/combos.js';

export async function renderHistory(container) {
  container.innerHTML = '';

  const page = document.createElement('div');
  page.className = 'history-page';

  page.innerHTML = `
    <h1 class="page__title">📜 История роллов</h1>
    <p class="page__subtitle">Все ваши прошлые выборы героев</p>
    <div id="historyContent">
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">⏳ Загрузка...</div>
    </div>
    <div class="history-pagination" id="pagination"></div>
  `;

  container.appendChild(page);

  let currentPage = 1;

  async function loadHistory(pageNum) {
    const content = page.querySelector('#historyContent');
    const pagination = page.querySelector('#pagination');

    try {
      const data = await api.getHistory(pageNum);
      currentPage = data.page;

      if (data.rolls.length === 0) {
        content.innerHTML = `
          <div class="history-empty glass-card">
            <span class="history-empty__icon">🎰</span>
            <div class="history-empty__text">Пока нет ни одного ролла</div>
            <a class="btn btn--primary" data-link href="/setup">🎮 Сделать первый ролл</a>
          </div>
        `;
        pagination.innerHTML = '';
        return;
      }

      content.innerHTML = '<div class="history-list"></div>';
      const list = content.querySelector('.history-list');

      data.rolls.forEach((roll, idx) => {
        const entry = document.createElement('div');
        entry.className = 'history-entry glass-card';
        entry.style.animationDelay = `${idx * 0.1}s`;
        entry.style.animation = 'fadeSlideUp 0.3s ease forwards';

        const date = new Date(roll.created_at + 'Z');
        const dateStr = date.toLocaleDateString('ru-RU', {
          day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });

        const modeClass = roll.mode === 'lane' ? 'lane' : roll.mode === 'fun' ? 'fun' : 'meta';
        const modeNames = { lane: '🛡️ Линия', fun: '🎉 Комбо', meta: '🏆 Мета' };

        let playersHtml = '';
        for (let i = 0; i < roll.players.length; i++) {
          const hero = roll.heroes[i];
          const role = getRoleById(roll.roles[i]);
          playersHtml += `
            <div class="history-player-chip">
              <img src="${hero.img}" alt="${hero.locName}" 
                   onerror="this.style.display='none'" />
              <div class="history-player-chip__info">
                <span class="history-player-chip__name">${roll.players[i]} · ${role?.icon || ''} ${role?.nameRu || roll.roles[i]}</span>
                <span class="history-player-chip__hero">${hero.locName}</span>
              </div>
            </div>
          `;
        }

        entry.innerHTML = `
          <div class="history-entry__header">
            <span class="history-entry__date">📅 ${dateStr}</span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="history-entry__mode history-entry__mode--${modeClass}">
                ${modeNames[roll.mode] || roll.mode}
              </span>
              <button class="history-entry__delete" data-id="${roll.id}" title="Удалить">🗑️</button>
            </div>
          </div>
          <div class="history-entry__players">${playersHtml}</div>
        `;

        list.appendChild(entry);
      });

      // Delete buttons
      list.querySelectorAll('.history-entry__delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (!confirm('Удалить этот ролл?')) return;
          try {
            await api.deleteRoll(btn.dataset.id);
            loadHistory(currentPage);
          } catch (err) {
            alert('Ошибка удаления: ' + err.message);
          }
        });
      });

      // Pagination
      if (data.pages > 1) {
        pagination.innerHTML = '';
        for (let p = 1; p <= data.pages; p++) {
          const btn = document.createElement('button');
          btn.className = `btn btn--small ${p === currentPage ? 'btn--primary' : 'btn--secondary'}`;
          btn.textContent = p;
          btn.addEventListener('click', () => loadHistory(p));
          pagination.appendChild(btn);
        }
      } else {
        pagination.innerHTML = '';
      }

    } catch (err) {
      content.innerHTML = `
        <div class="history-empty glass-card">
          <span class="history-empty__icon">⚠️</span>
          <div class="history-empty__text">Ошибка загрузки: ${err.message}</div>
          <button class="btn btn--secondary" onclick="location.reload()">🔄 Обновить</button>
        </div>
      `;
    }
  }

  loadHistory(1);
}
