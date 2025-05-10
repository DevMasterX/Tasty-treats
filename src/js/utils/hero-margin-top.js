function adjustHeroMarginTop() {
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero-section');
  //   const isMobile = window.innerWidth;
  //   console.log('🚀 isMobile:', isMobile);
  if (!header || !hero) return;
  const totalHeight = header.offsetHeight + hero.offsetHeight;

  const viewportHeight = window.innerHeight;
  //   const heroMarginTop = Math.max(
  //     60,
  //     Math.max(viewportHeight - totalHeight - 10, 96)
  //   );
  const rawMargin = viewportHeight - totalHeight - 10;
  const heroMarginTop = Math.min(Math.max(rawMargin, 70), 96);
  hero.style.marginTop = `${heroMarginTop}px`;
}

export { adjustHeroMarginTop };
