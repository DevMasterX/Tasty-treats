import { ICONS_PATH } from '../config/paths.js';

export function initSvgIcons() {
  const svgElements = document.querySelectorAll('use[href^="./img/icons.svg"]');
  svgElements.forEach(element => {
    const iconId = element.getAttribute('href').split('#')[1];
    element.setAttribute('href', `${ICONS_PATH}#${iconId}`);
  });
}
