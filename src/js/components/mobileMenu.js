function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.js-mobile-menu-btn');
  const mobileMenuCloseBtn = document.querySelector('.js-close-btn');
  const mobileMenu = document.querySelector('.js-mobile-menu');
  const header = document.querySelector('header');
  const themeSwitcher = document.querySelector('.js-theme-switcher');

  if (!mobileMenuBtn || !mobileMenu || !header || !mobileMenuCloseBtn) {
    console.warn('Mobile menu: один или несколько элементов не найдены');
    return;
  }

  mobileMenuBtn.addEventListener('click', onOpenMenu);
  mobileMenuCloseBtn.addEventListener('click', onCloseMenu);

  function onOpenMenu() {
    mobileMenu.classList.add('open');
    header.classList.add('menu-opened');
    document.body.classList.add('no-scroll');
    document.addEventListener('click', onDocumentClick);
  }

  function onCloseMenu() {
    mobileMenu.classList.remove('open');
    header.classList.remove('menu-opened');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentClick(e) {
    const clickInsideMenu = mobileMenu.contains(e.target);
    const clickOnButton = mobileMenuBtn.contains(e.target);
    // const clickOnThemeSwitcher =
    //   themeSwitcher && themeSwitcher.contains(e.target);
    const clickOnThemeSwitcher = themeSwitcher?.contains(e.target);

    if (!clickInsideMenu && !clickOnButton && !clickOnThemeSwitcher) {
      onCloseMenu();
    }
  }
}

export { initMobileMenu };
