import { recipesApiService } from '../../services/recipes-api-service';
import { initMainGallery } from '../main-gallery';
// import { initMainGallery } from './main-gallery';
// console.log('🚀 initMainGallery:', initMainGallery);
// console.log('🚀 recipesApiService:', recipesApiService);
// let buttonsIterator = 0;
let dataPage = 1;
function initHomePagination() {
  setupButtonsEventListeners();
}

function setupButtonsEventListeners() {
  const pagination = document.querySelector('.home-pagination');
  if (!pagination) return;
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

function onFirstPageBtnClick() {}
function onPrevPageBtnClick(e) {}

async function onPrevPagesBtnClick(e) {
  updateButtons(e);

  const { firstBtnPageNumber } = initVars(e);

  recipesApiService.updateParams('page', firstBtnPageNumber);
  await initMainGallery();
  console.log(recipesApiService.getQueryParams());
}

function onFirstBtnClick(e) {
  // recipesApiService.resetFilterQueryParams();
  handlePaginationClick(e);
}

function onSecondBtnClick(e) {
  handlePaginationClick(e);
}

function onThirdBtnClick(e) {
  handlePaginationClick(e);
}

async function onNextPagesBtnClick(e) {
  console.log('click');
  updateButtons(e);

  const { firstBtnPageNumber } = initVars(e);
  recipesApiService.updateParams('page', firstBtnPageNumber);
  await initMainGallery();
  console.log(recipesApiService.getQueryParams());
}

function onNextPageBtnClick() {}
function onLastPageBtnClick() {}

async function handlePaginationClick(e) {
  const btn = e.currentTarget;
  const btnPageNumber = Number(btn.dataset.page);
  const paramPage = recipesApiService.getQueryParams().page;

  if (btnPageNumber !== paramPage) {
    recipesApiService.updateParams('page', btnPageNumber);
    await initMainGallery();
  }
}

function initVars(e) {
  const nextPagesBtn = e.currentTarget
    .closest('.js-pagination__center-btns-wrapper')
    .querySelector('.js-pagination-next-pages-btn');
  const prevPagesBtn = e.currentTarget
    .closest('.js-pagination__center-btns-wrapper')
    .querySelector('.js-pagination-prev-pages-btn');
  const pageBtnsContainer = e.currentTarget.closest(
    '.js-pagination__center-btns-wrapper'
  );
  const totalPages = recipesApiService.getQueryParams().totalPages;
  const existingPageBtns = [...pageBtnsContainer.children].filter(
    btn => btn.dataset.page
  );
  const pageBtnsAmount = existingPageBtns.length;
  const firstBtnPageNumber = Number(existingPageBtns[0].dataset.page);
  const lastBtnPageNumber = Number(
    existingPageBtns[existingPageBtns.length - 1].dataset.page
  );
  const isLastBtns = lastBtnPageNumber >= totalPages;
  const isFirstBtns = firstBtnPageNumber < pageBtnsAmount;

  return {
    nextPagesBtn,
    prevPagesBtn,
    pageBtnsContainer,
    totalPages,
    existingPageBtns,
    pageBtnsAmount,
    firstBtnPageNumber,
    lastBtnPageNumber,
    isLastBtns,
    isFirstBtns,
  };
}

function updateButtons(e) {
  console.log('zhmak');
  const {
    nextPagesBtn,
    prevPagesBtn,
    totalPages,
    existingPageBtns,
    pageBtnsAmount,
  } = initVars(e);

  if (e.currentTarget === nextPagesBtn) {
    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = `${
        Number(existingPageBtns[i].dataset.page) + pageBtnsAmount
      }`;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;

      existingPageBtns[i].dataset.page > totalPages
        ? (existingPageBtns[i].style.display = 'none')
        : (existingPageBtns[i].style.display = 'block');
    }

    const { isLastBtns, isFirstBtns } = initVars(e);

    isLastBtns
      ? nextPagesBtn.classList.add('visually-hidden')
      : nextPagesBtn.classList.remove('visually-hidden');

    isFirstBtns
      ? prevPagesBtn.classList.add('visually-hidden')
      : prevPagesBtn.classList.remove('visually-hidden');
  } else if (e.currentTarget === prevPagesBtn) {
    console.log('🚀 prevPagesBtn:', prevPagesBtn);

    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = `${
        Number(existingPageBtns[i].dataset.page) - pageBtnsAmount
      }`;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;

      existingPageBtns[i].dataset.page > totalPages
        ? (existingPageBtns[i].style.display = 'none')
        : (existingPageBtns[i].style.display = 'block');
    }

    const { isLastBtns, isFirstBtns } = initVars(e);

    // isLastBtns
    //   ? (nextPagesBtn.style.display = 'none')
    //   : (nextPagesBtn.style.display = 'block');

    // !isFirstBtns
    //   ? (prevPagesBtn.style.display = 'none')
    //   : (prevPagesBtn.style.display = 'block');

    isLastBtns
      ? nextPagesBtn.classList.add('visually-hidden')
      : nextPagesBtn.classList.remove('visually-hidden');

    isFirstBtns
      ? prevPagesBtn.classList.add('visually-hidden')
      : prevPagesBtn.classList.remove('visually-hidden');
  }
}

export { initHomePagination };
