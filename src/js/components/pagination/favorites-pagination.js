// import { recipesApiService } from '../../services/recipes-api-service';
import {
  initFavoritesGallery,
  getCurrentPage,
  getTotalPages,
} from '../favorites-gallery';

function initFavoritesPagination() {
  setupButtonsEventListeners();
}

function setupButtonsEventListeners() {
  const {
    firstPageBtn,
    prevPageBtn,
    nextPagesBtn,
    lastPageBtn,
    nextPageBtn,
    prevPagesBtn,
    firstBtn,
    secondBtn,
    thirdBtn,
  } = initVars();

  firstPageBtn?.addEventListener('click', onFirstPageBtnClick);
  prevPageBtn?.addEventListener('click', onPrevPageBtnClick);
  prevPagesBtn?.addEventListener('click', onPrevPagesBtnClick);
  firstBtn?.addEventListener('click', onFirstBtnClick);
  secondBtn?.addEventListener('click', onSecondBtnClick);
  thirdBtn?.addEventListener('click', onThirdBtnClick);
  nextPagesBtn?.addEventListener('click', onNextPagesBtnClick);
  nextPageBtn?.addEventListener('click', onNextPageBtnClick);
  lastPageBtn?.addEventListener('click', onLastPageBtnClick);
}

function onFirstPageBtnClick() {
  console.log('onFirstPageBtnClick');

  initFavoritesGallery();
  //   initMainGallery();
}
async function onPrevPageBtnClick() {
  const { currentPage } = initVars();
  console.log('🚀 currentPage:', currentPage);
  const prevPage = currentPage - 1;

  await initFavoritesGallery(prevPage);
}

async function onPrevPagesBtnClick(e) {
  onDotsBtnClick(e);

  const { firstBtnPageNumber } = initVars();
  await initFavoritesGallery(firstBtnPageNumber);
}

function onFirstBtnClick(e) {
  handlePaginationClick(e);
}

function onSecondBtnClick(e) {
  handlePaginationClick(e);
}

function onThirdBtnClick(e) {
  handlePaginationClick(e);
}

async function onNextPagesBtnClick(e) {
  onDotsBtnClick(e);

  const { firstBtnPageNumber } = initVars();
  await initFavoritesGallery(firstBtnPageNumber);
}

async function onNextPageBtnClick() {
  const { currentPage, existingPageBtns } = initVars();
  const nextPage = currentPage + 1;
  console.log('🚀 nextPage:', nextPage);

  existingPageBtns.forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.page) === nextPage);
  });
  await initFavoritesGallery(nextPage);
}

async function onLastPageBtnClick() {
  const { totalPages: lastPage } = initVars();
  //   recipesApiService.updateParams('page', lastPage);
  console.log('🚀 lastPage:', lastPage);
  await initFavoritesGallery(lastPage);
}

async function handlePaginationClick(e) {
  //   console.log(e.target);
  const { existingPageBtns, currentPage } = initVars();
  //   console.log('🚀 existingPageBtns:', existingPageBtns);
  //   console.log('🚀 currentPage:', currentPage);

  const button = e.currentTarget;
  const btnPageNumber = Number(button.dataset.page);
  //   console.log('🚀 btnPageNumber:', btnPageNumber);

  if (btnPageNumber !== currentPage) {
    existingPageBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    await initFavoritesGallery(btnPageNumber);
  }
}

function initVars() {
  const pagination = document.querySelector('.home-pagination');

  const firstPageBtn = pagination.querySelector('.js-first-page-btn');
  const prevPageBtn = pagination.querySelector('.js-prev-page-btn');
  const prevPagesBtn = pagination.querySelector(
    '.js-pagination-prev-pages-btn'
  );
  const firstBtn = pagination.querySelector('.js-pagination-first-btn');
  const secondBtn = pagination.querySelector('.js-pagination-second-btn');
  const thirdBtn = pagination.querySelector('.js-pagination-third-btn');
  const nextPagesBtn = pagination.querySelector(
    '.js-pagination-next-pages-btn'
  );
  const nextPageBtn = pagination.querySelector('.js-pagination-next-page-btn');
  const lastPageBtn = pagination.querySelector('.js-pagination-last-page-btn');

  const pageBtnsContainer = pagination.querySelector(
    '.js-pagination__center-btns-wrapper'
  );
  const totalPages = getTotalPages();
  const currentPage = getCurrentPage();

  const existingPageBtns = [...pageBtnsContainer.children].filter(
    btn => btn.dataset.page
  );
  const firstBtnPageNumber = Number(existingPageBtns[0].dataset.page);
  const pageBtnsAmount = existingPageBtns.length;
  const lastBtnPageNumber = Number(
    existingPageBtns[existingPageBtns.length - 1].dataset.page
  );
  // -------------------------------------------

  const isLastBtns = lastBtnPageNumber >= totalPages;
  //   const isFirstBtns = firstBtnPageNumber < pageBtnsAmount;
  const isFirstBtns = firstBtnPageNumber === 1;

  return {
    firstPageBtn,
    prevPageBtn,
    prevPagesBtn,
    firstBtn,
    secondBtn,
    thirdBtn,
    nextPagesBtn,
    nextPageBtn,
    lastPageBtn,
    pageBtnsContainer,
    totalPages,
    existingPageBtns,
    pageBtnsAmount,
    firstBtnPageNumber,
    lastBtnPageNumber,
    isLastBtns,
    isFirstBtns,
    currentPage,
  };
}

function onDotsBtnClick(e) {
  const {
    //   firstPageBtn,
    firstBtn,
    nextPagesBtn,
    prevPagesBtn,
    existingPageBtns,
    pageBtnsAmount,
    lastBtnPageNumber,
    firstBtnPageNumber,
    totalPages,
  } = initVars();

  if (e.currentTarget === nextPagesBtn) {
    if (lastBtnPageNumber + pageBtnsAmount > totalPages) {
      for (
        let i = pageBtnsAmount - 1, j = 0;
        i >= 0, j < pageBtnsAmount;
        i--, j++
      ) {
        existingPageBtns[i].dataset.page = totalPages - j;
        existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
        if (!firstBtn.classList.contains('active')) {
          existingPageBtns[i].classList.remove('active');
        }
      }

      if (!firstBtn.classList.contains('active')) {
        firstBtn.classList.add('active');
      }
      return;
    }

    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = `${
        Number(existingPageBtns[i].dataset.page) + pageBtnsAmount
      }`;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
      if (!firstBtn.classList.contains('active')) {
        existingPageBtns[i].classList.remove('active');
      }
    }
    if (!firstBtn.classList.contains('active')) {
      firstBtn.classList.add('active');
    }
  } else if (e.currentTarget === prevPagesBtn) {
    if (firstBtnPageNumber - pageBtnsAmount < 1) {
      //   firstPageBtn.classList.add('active');
      //   console.log('kiya');

      for (let i = 0; i < pageBtnsAmount; i++) {
        existingPageBtns[i].dataset.page = i + 1;
        existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
        if (!firstBtn.classList.contains('active')) {
          existingPageBtns[i].classList.remove('active');
        }
      }
      if (!firstBtn.classList.contains('active')) {
        firstBtn.classList.add('active');
      }
      //   console.log('kiya-2');
      return;
    }

    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = `${
        Number(existingPageBtns[i].dataset.page) - pageBtnsAmount
      }`;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
      if (!firstPageBtn.classList.contains('active')) {
        existingPageBtns[i].classList.remove('active');
      }
    }
    if (!firstBtn.classList.contains('active')) {
      firstBtn.classList.add('active');
    }
    // firstPageBtn.classList.add('active');
  }
}

function updateFavPaginationBtns(page, totalPages) {
  const {
    pageBtnsAmount,
    firstPageBtn,
    prevPageBtn,
    existingPageBtns,
    prevPagesBtn,
    nextPagesBtn,
    nextPageBtn,
    lastPageBtn,
    firstBtnPageNumber,
    lastBtnPageNumber,
  } = initVars();

  if (page === 1) {
    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = page + i;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
    }
  } else if (page === totalPages) {
    for (
      let i = pageBtnsAmount - 1, j = 0;
      i >= 0, j < pageBtnsAmount;
      i--, j++
    ) {
      existingPageBtns[i].dataset.page = page - j;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
      existingPageBtns[i].classList.toggle(
        'visually-hidden',
        Number(existingPageBtns[i].dataset.page) === 0
      );
    }
  } else if (page > lastBtnPageNumber) {
    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = page + i;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
    }
  } else if (page < firstBtnPageNumber) {
    for (
      let i = pageBtnsAmount - 1, j = 0;
      i >= 0, j < pageBtnsAmount;
      i--, j++
    ) {
      existingPageBtns[i].dataset.page = page - j;

      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
    }
  }

  const { isLastBtns, isFirstBtns } = initVars();

  existingPageBtns.forEach(btn => {
    const pageNumber = Number(btn.dataset.page);
    if (!pageNumber) return;
    btn.classList.toggle(
      'visually-hidden',
      pageNumber > totalPages || pageNumber === 0
    );

    btn.classList.toggle('active', Number(btn.dataset.page) === page);
  });
  firstPageBtn.classList.toggle('disabled', page === 1);
  prevPageBtn.classList.toggle('disabled', page === 1);
  // prevPagesBtn.classList.toggle('visually-hidden', isFirstBtns);
  // nextPagesBtn.classList.toggle('visually-hidden', isLastBtns);
  //   prevPagesBtn.classList.toggle('disabled', page <= pageBtnsAmount);
  prevPagesBtn.classList.toggle('disabled', isFirstBtns);
  nextPagesBtn.classList.toggle('disabled', isLastBtns);

  nextPageBtn.classList.toggle('disabled', page === totalPages);
  lastPageBtn.classList.toggle('disabled', page === totalPages);
}

export { initFavoritesPagination, updateFavPaginationBtns };
