const mobileMenuBtn = document.querySelector('.js-mobile-menu-btn');
const mobileMenu = document.querySelector('.js-mobile-menu');
const header = document.querySelector('header');
const themeSwitcher = document.querySelector('.js-theme-switcher');
const mobileMenuCloseBtn = document.querySelector('.js-close-btn');

// Проверяем наличие элементов перед добавлением обработчиков
if (mobileMenuBtn && mobileMenuCloseBtn) {
  mobileMenuBtn.addEventListener('click', onMobileMenuBtnClick);
  mobileMenuCloseBtn.addEventListener('click', onMobileMenuCloseBtnClick);
}

function onMobileMenuBtnClick() {
  onOpenMenu();
}

function onMobileMenuCloseBtnClick() {
  onCloseMenu();
}

function onOpenMenu() {
  if (mobileMenu && header) {
    mobileMenu.classList.add('open');
    header.classList.add('menu-opened');
    // Добавляем обработчик клика по документу при открытии меню
    document.addEventListener('click', onDocumentClick);
  }
}

function onCloseMenu() {
  if (mobileMenu && header) {
    mobileMenu.classList.remove('open');
    header.classList.remove('menu-opened');
    // Удаляем обработчик клика при закрытии меню
    document.removeEventListener('click', onDocumentClick);
  }
}

function onDocumentClick(e) {
  // Проверяем, был ли клик вне меню и не по кнопке открытия
  const clickInsideMenu = mobileMenu.contains(e.target);
  const clickOnButton = mobileMenuBtn.contains(e.target);
  const clickOnThemeSwitcher = themeSwitcher.contains(e.target);

  if (!clickInsideMenu && !clickOnButton && !clickOnThemeSwitcher) {
    onCloseMenu();
  }
}
