import { ICONS_PATH } from '../config/paths.js';

function createGalleryMarkup(arr) {
  return arr
    .map(
      ({ preview, title, description, rating }) => `
     <li class="gallery-item">
     <img class="gallery-item__img" src="${preview}" alt="${title}" loading="lazy">

      <button class="gallery-item__favorite-btn">
        <svg class="favorite-btn__icon">
          <use href="${ICONS_PATH}#icon-heart"></use>
        </svg>
        Heart
      </button>

      <h3 class="gallery-item__title">${title}</h3>
      <p class="gallery-item__text">${description}</p>
      <div class="rating-and-btn-wrapper">
        <div class="rating-wrapper">
          <p class="rating-number">${rating}</p>
          <ul class="rating-list">
            <li class="rating-list__item"></li>
            <li class="rating-list__item"></li>
            <li class="rating-list__item"></li>
            <li class="rating-list__item"></li>
            <li class="rating-list__item"></li>
          </ul>
        </div>
        <button class="gallery-item__see-recipe-btn">See recipe</button>
      </div>
    </li>
    `
    )
    .join('');
}

export { createGalleryMarkup };
