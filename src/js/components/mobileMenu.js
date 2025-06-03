function initMobileMenu() {
  let touchStartX = 0;
  let touchEndX = 0;
  // let currentX = 0;
  // let isDragging = false;
  const mobileMenuBtn = document.querySelector('.js-mobile-menu-btn');
  const mobileMenuCloseBtn = document.querySelector('.js-close-btn');
  const mobileMenu = document.querySelector('.js-mobile-menu');
  const header = document.querySelector('header');
  const themeSwitcher = document.querySelector('.js-theme-switcher');

  if (!mobileMenuBtn || !mobileMenu || !header || !mobileMenuCloseBtn) {
    console.warn('Mobile menu: один или несколько элементов не найдены');
    return;
  }

  mobileMenu.addEventListener('touchstart', handleTouchStart, {
    passive: true,
  });
  // mobileMenu.addEventListener('touchmove', handleTouchMove, { passive: false });
  mobileMenu.addEventListener('touchend', handleTouchEnd);

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

  function handleTouchStart(e) {
    // console.log(e);
    // console.log(e.changedTouches[0].clientX);
    touchStartX = e.touches[0].clientX;
    // isDragging = true;
  }

  // function handleTouchMove(e) {
  //   currentX = e.touches[0].clientX;
  //   const deltaX = currentX - touchStartX;
  //   console.log('🚀 deltaX:', deltaX);
  //   // console.log('🚀 currentX:', currentX);
  //   const screenWidth = window.innerWidth;
  //   const maxMobileMenuWidth = screenWidth * 0.65;
  //   const movePercentToRight = (currentX / screenWidth) * 100;
  //   console.log('🚀 movePercent:', movePercentToRight);
  //   // console.log('🚀 mobileMenuWidth:', mobileMenuWidth);
  //   if (maxMobileMenuWidth <= maxMobileMenuWidth) {
  //     mobileMenu.style.transform = `translateX(${deltaX}px)`;
  //   }
  //   mobileMenu.style.transform = `translateX(${deltaX}px)`;

  //   // console.log('🚀 screenWidth:', screenWidth);
  //   e.preventDefault();
  // }

  function handleTouchEnd(e) {
    // isDragging = false;
    // console.log(e);
    // console.log(e.changedTouches[0].clientX);
    touchEndX = e.changedTouches[0].clientX;

    handleSwipeGesture();
  }

  function handleSwipeGesture() {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance < 50) {
      onCloseMenu();
    }
  }
}

export { initMobileMenu };
// if (deltaX < swipeThreshold) {
//   // Прячем меню
//   menu.style.transform = 'translateX(-100%)';
// } else {
//   // Возвращаем меню на место
//   menu.style.transform = 'translateX(0)';
// }
