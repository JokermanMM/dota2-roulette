const BASE = '';

async function request(url, options = {}) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  async login(username, provider) {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, provider })
    });
  },

  async logout() {
    return request('/api/auth/logout', { method: 'POST' });
  },

  async getUser() {
    try {
      const data = await request('/api/auth/me');
      return data.user;
    } catch {
      return null;
    }
  },

  async getHistory(page = 1) {
    return request(`/api/history?page=${page}`);
  },

  async saveRoll(players, roles, heroes, mode) {
    return request('/api/history', {
      method: 'POST',
      body: JSON.stringify({ players, roles, heroes, mode })
    });
  },

  async deleteRoll(id) {
    return request(`/api/history/${id}`, { method: 'DELETE' });
  }
};
