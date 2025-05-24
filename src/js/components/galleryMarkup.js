const notFoundImage = new URL('../../img/not-found.png', import.meta.url).href;
function createGalleryMarkup(arr) {
  if (arr.length === 0) {
    return ` 
    <li class='nothing-found-item'><img class='nothing-found-img'
    src="${notFoundImage}"
  alt="Nothing found"
/> </li>
`;
  }

  return arr
    .map(({ preview, title, description, rating, _id }) => {
      const paintedStarsWidth = (rating / 5) * 100;

      return `
     <li class="gallery-item">
<a href="${preview}" class="gallery-lightbox"  data-width="700px"
  data-height="auto" data-zoomable="true" data-type="image"
  data-effect="fade">
 <img class="gallery-item__img" src="${preview}" alt="${title}" loading="lazy">
</a>
      <button class="gallery-item__favorite-btn" data-id="${_id}">
        <svg class="favorite-btn__icon" data-id="${_id}">
          <use href="#icon-heart"></use>
        </svg>
      </button>
      <div class="gallery-item__content-wrapper">
      <h3 class="gallery-item__title">${title}</h3>
      <p class="gallery-item__text">${description}</p>
      <div class="rating-and-btn-wrapper">
        <div class="rating-wrapper">
          <p class="rating-number">${rating}</p>
          
          <div class="stars-list-wrapper">
          <ul class="rating-list">
            <li class="rating-list__item">
             <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
          </ul>

 <ul class="rating-list painted" style="width: ${paintedStarsWidth}%;">
            <li class="rating-list__item">
             <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
          </ul>
           </div>


        </div>
        <button class="gallery-item__see-recipe-btn" aria-label="See recipe button" data-modal-open  data-modal-type="recipe"   data-id="${_id}" >See recipe</button>
      </div>
      </div>



     <div class="loader js-loader" aria-label="Loading..." role="status">
     <div class="sk-circle">
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
       <div class="sk-circle-dot"></div>
     </div>
   </div>
    </li>


    
    `;
    })
    .join('');
}

export { createGalleryMarkup };
