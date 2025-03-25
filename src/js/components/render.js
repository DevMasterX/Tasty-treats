// Инициализация темной темы
import { initTheme } from './modules/theme.js';

// Инициализация мобильного меню
import { setupMobileMenu } from './modules/mobileMenu.js';

// Работа с API
import { fetchPosts, fetchUser } from './modules/api.js';

// Рендеринг
import { renderPosts } from './modules/renderPosts.js';
import { renderUser } from './modules/renderUser.js';

document.addEventListener('DOMContentLoaded', async () => {
  // UI-функции
  initTheme();
  setupMobileMenu();

  try {
    // Получение данных
    const [posts, user] = await Promise.all([fetchPosts(), fetchUser()]);

    // Рендеринг
    renderPosts(posts);
    renderUser(user);
  } catch (error) {
    console.error('Ошибка при инициализации приложения:', error);
    // тут можно показать сообщение об ошибке на UI
  }
});
