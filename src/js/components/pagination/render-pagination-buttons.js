// import { recipesApiService } from '../../services/recipes-api-service';

function renderPaginationButtons() {
  const centerBtnsContainer = document.querySelector(
    '.js-pagination__center-btns-wrapper'
  );

  centerBtnsContainer.innerHTML = createPaginationBtnsMarkup();
  // console.log('🚀 centerBtnsContainer:', centerBtnsContainer);
  // const totalPages = recipesApiService.getQueryParams().totalPages;
  // console.log(3);
  // const totalPages = recipesApiService.getQueryParams().totalPages;
  // console.log('🚀 totalPages:', totalPages);
  // console.log('🚀 totalP:', totalP);

  // const existingPageBtns = [...centerBtnsContainer.children].filter(
  //   btn => btn.dataset.page
  // );

  // const nextPagesBtn = centerBtnsContainer.querySelector(
  //   '.js-pagination-next-pages-btn'
  // );

  // existingPageBtns.forEach(btn => {

  //   if (btn.dataset.page > totalPages) {
  //     btn.classList.add('visually-hidden');
  //     nextPagesBtn.classList.add('visually-hidden');
  //   } else if (btn.dataset.page <= totalPages) {
  //     btn.classList.remove('visually-hidden');
  //     nextPagesBtn.classList.remove('visually-hidden');
  //   }
  // });
  console.log('pagination buttons rendered', centerBtnsContainer);
}

function createPaginationBtnsMarkup() {
  if (window.innerWidth < 768) {
    return `
    <button
        class="pagination__btn transparent pagination__prev-pages-btn js-pagination-prev-pages-btn visually-hidden"
        aria-label="Previous pages button"
      >
        ...
      </button>

     <button
        class="pagination__btn transparent active js-pagination-first-btn"
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
        class="pagination__btn transparent pagination__prev-pages-btn js-pagination-prev-pages-btn visually-hidden"
        aria-label="Previous pages button"
      >
        ...
      </button>

     <button
        class="pagination__btn transparent active js-pagination-first-btn"
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
