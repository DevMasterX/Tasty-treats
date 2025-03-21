const themeSwitcherInput = document.querySelector('.js-theme-switcher__input');
console.log('🚀 themeSwitcherInput:', themeSwitcherInput);

themeSwitcherInput.addEventListener('change', onSwitherInputChange);

function onSwitherInputChange() {
  document.body.classList.toggle('dark-theme');
}
