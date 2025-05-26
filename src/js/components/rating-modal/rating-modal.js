function renderRatingModal(btn, modalContainer) {
  modalContainer.innerHTML = createRatingModalMarkup(btn);
}

function createRatingModalMarkup(btn) {
  const id = btn.dataset.id;
  return `
  <form class="rating-form" name="rating-form" >
    <h3 class="rating__title">Rating</h3>
    
<div class="recipe-info__rating-wrapper modal-rating-wrapper">
  <p class="recipe-info__rating-number js-modal-rating-number">0.0</p>
  

          <ul class="rating-list js-modal-rating-list">
            <li class="rating-list__item modal-rating-item" data-rating="1">
             <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item modal-rating-item" data-rating="2">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item modal-rating-item" data-rating="3">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item modal-rating-item" data-rating="4">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
            <li class="rating-list__item modal-rating-item" data-rating="5">
            <svg class="rating-list__star-icon">
                <use href="#icon-star"></use>
              </svg>
            </li>
          </ul>
  </div>
<div class="rating__input-wrapper">
<input type="email" name="email" class="rating__input" autocomplete="email" placeholder="Enter email">
</div>
<button class="rating-send-btn" type="submit" aria-label="Send rating button" data-id="${id}">Send</button>
</form>
    `;
}

export { renderRatingModal };
