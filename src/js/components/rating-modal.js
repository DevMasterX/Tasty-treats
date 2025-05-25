function renderRatingModal(btn, modalContainer) {
  modalContainer.innerHTML = createRatingModalMarkup();
}

function createRatingModalMarkup() {
  return `
  <form class="rating-form" name="rating-form" >
    <h3>Rating</h3>
    
<div class="recipe-info__rating-wrapper">
  <p class="recipe-info-rating-number">0</p>
  

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
  </div>
<div class="rating__input-wrapper">
<input type="email" name="email" class="rating__input" autocomplete="email" placeholder="Enter email">
</div>
<button class="rating-send-btn" type="submit" aria-label="Send rating button">Send</button>
</form>
    `;
}

export { renderRatingModal };
