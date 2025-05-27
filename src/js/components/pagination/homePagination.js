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
function onPrevPageBtnClick() {}

function onPrevPagesBtnClick() {}

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

function onNextPagesBtnClick(e) {
  const prevPagesBtn = e.currentTarget
    .closest('.js-pagination__center-btns-wrapper')
    .querySelector('.js-pagination-prev-pages-btn');
  // console.log('🚀 prevPagesBtn:', prevPagesBtn);
  prevPagesBtn.style.display = 'block';

  const pageBtnsContainer = e.currentTarget.closest(
    '.js-pagination__center-btns-wrapper'
  );

  const existingPageBtns = [...pageBtnsContainer.children].filter(
    btn => btn.dataset.page
  );

  const pageBtnsAmount = existingPageBtns.length;

  for (let i = 0; i < pageBtnsAmount; i++) {
    console.log(existingPageBtns[i]);
    existingPageBtns[i].dataset.page = `${
      Number(existingPageBtns[i].dataset.page) + pageBtnsAmount
    }`;
    existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
  }

  // existingPageBtns.forEach(btn => {
  //   console.log(Number(btn.dataset.page));
  // });
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

export { initHomePagination };
