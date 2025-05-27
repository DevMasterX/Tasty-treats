import { recipesApiService } from '../services/recipes-api-service';
import { initMainGallery } from './main-gallery';
// import { initMainGallery } from './main-gallery';
// console.log('🚀 initMainGallery:', initMainGallery);
// console.log('🚀 recipesApiService:', recipesApiService);
function initHomePagination() {
  setupButtonsEventListeners();
}

function setupButtonsEventListeners() {
  const pagination = document.querySelector('.home-pagination');
  if (!pagination) return;
  const firstPageBtn = pagination.querySelector('.js-first-page-btn');
  const prevPageBtn = pagination.querySelector('.js-prev-page-btn');
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
  firstBtn?.addEventListener('click', onFirstBtnClick);
  secondBtn?.addEventListener('click', onSecondBtnClick);
  thirdBtn?.addEventListener('click', onThirdBtnClick);
  nextPagesBtn?.addEventListener('click', onNextPagesBtnClick);
  nextPageBtn?.addEventListener('click', onNextPageBtnClick);
  lastPageBtn?.addEventListener('click', onLastPageBtnClick);
}

function onFirstPageBtnClick() {}
function onPrevPageBtnClick() {}
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
function onNextPagesBtnClick() {}
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
