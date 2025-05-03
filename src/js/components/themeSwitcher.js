import { STORAGE_KEYS, DARK_CLASS } from '../../constants/constants';

const THEME_KEY = STORAGE_KEYS.THEME_KEY;

function initTheme() {
  const themeSwitcherInput = document.querySelector(
    '.js-theme-switcher__input'
  );

  if (!themeSwitcherInput) {
    console.warn('Theme switcher not found: .js-theme-switcher__input');
    return;
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  const isDark = savedTheme === DARK_CLASS;

  if (isDark) {
    document.body.classList.add(DARK_CLASS);
    themeSwitcherInput.checked = true;
  }
  themeSwitcherInput.addEventListener('change', () => {
    const shouldEnableDark = themeSwitcherInput.checked;

    document.body.classList.toggle(DARK_CLASS, shouldEnableDark);

    if (shouldEnableDark) {
      localStorage.setItem(THEME_KEY, DARK_CLASS);
    } else {
      localStorage.removeItem(THEME_KEY);
    }
  });
}

export { initTheme };
