function createGalleryMarkup(arr) {
  return arr
    .map(
      ({ preview, title, description, rating }) => `
     <li class="gallery-item">
<a href="${preview}" class="gallery-lightbox"  data-width="900px"
  data-height="auto" data-zoomable="true" data-type="image"
  data-effect="fade">
 <img class="gallery-item__img" src="${preview}" alt="${title}" loading="lazy">
</a>
      <button class="gallery-item__favorite-btn">
        <svg class="favorite-btn__icon">
          <use href="#icon-heart"></use>
        </svg>
      </button>
      <div class="gallery-item__content-wrapper">
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
      </div>
    </li>
    
    `
    )
    .join('');
}

export { createGalleryMarkup };
