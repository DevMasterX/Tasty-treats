const mobileMenuBtn = document.querySelector('.js-mobile-menu-btn');
const mobileMenu = document.querySelector('.js-mobile-menu');
const header = document.querySelector('header');
const mobileMenuCloseBtn = document.querySelector('.js-close-btn');

mobileMenuBtn.addEventListener('click', onMobileMenuBtnClick);
mobileMenuCloseBtn.addEventListener('click', onMobileMenuCloseBtnClick);

function onMobileMenuBtnClick() {
  onOpenMenu();
}

function onMobileMenuCloseBtnClick() {
  onCloseMenu();
}

function onOpenMenu() {
  mobileMenu.classList.add('open');
  header.classList.add('menu-opened');
}
function onCloseMenu() {
  mobileMenu.classList.remove('open');
  header.classList.remove('menu-opened');
}

function onDocumentClick(e) {
  const clickInsideMenu = mobileMenu.contains(e.target);
  console.log('🚀 clickInsideMenu:', clickInsideMenu);
}
