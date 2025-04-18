// const themeSwitcherInput = document.querySelector('.js-theme-switcher__input');
// const DARK = 'dark-theme';
// const THEME = 'theme';

// initTheme();

// themeSwitcherInput.addEventListener('change', onSwitherInputChange);

// function onSwitherInputChange() {
//   document.body.classList.toggle(DARK);

//   if (document.body.classList.contains(DARK)) {
//     localStorage.setItem(THEME, DARK);
//   } else {
//     localStorage.removeItem(THEME);
//   }
// }

// function initTheme() {
//   try {
//     const savedTheme = localStorage.getItem(THEME);

//     if (!savedTheme) {
//       return;
//     }
//     document.body.classList.add(savedTheme);
//     themeSwitcherInput.checked = true;
//   } catch (error) {
//     console.error('ERROR! Can not find saved theme in local storage', error);
//   }
// }
const THEME_KEY = 'theme';
const DARK_CLASS = 'dark-theme';

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
