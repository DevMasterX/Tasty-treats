function setHeroMarginTop() {
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero-section');
  if (!header || !hero) return;

  function adjustHeroMarginTop() {
    const totalHeight = header.offsetHeight + hero.offsetHeight;

    const viewportHeight = window.innerHeight;

    const rawMargin = viewportHeight - totalHeight - 10;
    const heroMarginTop = Math.min(Math.max(rawMargin, 70), 180);
    hero.style.marginTop = `${heroMarginTop}px`;
  }
  adjustHeroMarginTop();

  window.addEventListener('resize', adjustHeroMarginTop);

  const resizeObserver = new ResizeObserver(adjustHeroMarginTop);
  resizeObserver.observe(header);
  resizeObserver.observe(hero);
}

export { setHeroMarginTop };
