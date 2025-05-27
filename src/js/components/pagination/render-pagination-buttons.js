function renderPaginationButtons() {
  const container = document.querySelector(
    '.js-pagination__center-btns-wrapper'
  );

  container.innerHTML = createPaginationBtnsMarkup();
}

function createPaginationBtnsMarkup() {
  if (window.innerWidth < 768) {
    return `
    <button
        class="pagination__btn transparent pagination__prev-pages-btn js-pagination-prev-pages-btn"
        aria-label="Previous pages button"
      >
        ...
      </button>

     <button
        class="pagination__btn active js-pagination-first-btn"
        data-page="1"
      >
        1
      </button>
      <button
        class="pagination__btn transparent js-pagination-second-btn"
        data-page="2"
      >
        2
      </button>
      
      <button
        class="pagination__btn transparent js-pagination-next-pages-btn"
        aria-label="Next pages"
      >
        ...
      </button>
    
      `;
  }

  return `
    
<button
        class="pagination__btn transparent pagination__prev-pages-btn js-pagination-prev-pages-btn"
        aria-label="Previous pages button"
      >
        ...
      </button>

     <button
        class="pagination__btn active js-pagination-first-btn"
        data-page="1"
      >
        1
      </button>
      <button
        class="pagination__btn transparent js-pagination-second-btn"
        data-page="2"
      >
        2
      </button>
      <button
        class="pagination__btn third transparent js-pagination-third-btn"
        data-page="3"
      >
        3
      </button>
      <button
        class="pagination__btn transparent js-pagination-next-pages-btn"
        aria-label="Next pages"
      >
        ...
      </button>
    
    `;
}

export { renderPaginationButtons };
