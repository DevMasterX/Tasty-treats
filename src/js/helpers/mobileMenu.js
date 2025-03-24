const mobileMenuBtn = document.querySelector('.js-mobile-menu-btn');
const mobileMenu = document.querySelector('.js-mobile-menu');
const header = document.querySelector('header');
const mobileMenuCloseBtn = document.querySelector('.js-close-btn');

mobileMenuBtn.addEventListener('click', onMobileMenuBtnClick);
mobileMenuCloseBtn.addEventListener('click', onMobileMenuCloseBtnClick);
function onMobileMenuBtnClick() {
  mobileMenu.classList.add('open');
  header.classList.add('menu-opened');
}

function onMobileMenuCloseBtnClick() {
  mobileMenu.classList.remove('open');
  header.classList.remove('menu-opened');
}
