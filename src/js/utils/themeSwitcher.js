const themeSwitcherInput = document.querySelector('.js-theme-switcher__input');
const DARK = 'dark-theme';
const THEME = 'theme';

initTheme();

themeSwitcherInput.addEventListener('change', onSwitherInputChange);

function onSwitherInputChange() {
  document.body.classList.toggle(DARK);

  if (document.body.classList.contains(DARK)) {
    localStorage.setItem(THEME, DARK);
  } else {
    localStorage.removeItem(THEME);
  }
}

function initTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME);

    if (!savedTheme) {
      return;
    }
    document.body.classList.add(savedTheme);
    themeSwitcherInput.checked = true;
  } catch (error) {
    console.error('ERROR! Can not find saved theme in local storage', error);
  }
}
