import { recipesApiService } from '../../services/recipes-api-service';
import { initMainGallery } from '../main-gallery';
// import { initMainGallery } from './main-gallery';
// console.log('🚀 initMainGallery:', initMainGallery);
// console.log('🚀 recipesApiService:', recipesApiService);
// let buttonsIterator = 0;
// let pagination;
// let pageBtnsContainer;
// let existingPageBtns;
// let pageBtnsAmount;
// let firstPageBtn;
// let prevPageBtn;
// let prevPagesBtn;
// let firstBtn;
// let secondBtn;
// let thirdBtn;
// let nextPagesBtn;
// let nextPageBtn;
// let lastPageBtn;

function initHomePagination() {
  // pagination = document.querySelector('.home-pagination');
  // if (!pagination) return;
  // pageBtnsContainer = document.querySelector(
  //   '.js-pagination__center-btns-wrapper'
  // );

  // existingPageBtns = [...pageBtnsContainer.children].filter(
  //   btn => btn.dataset.page
  // );
  // pageBtnsAmount = existingPageBtns.length;
  // firstPageBtn = pagination.querySelector('.js-first-page-btn');
  // prevPageBtn = pagination.querySelector('.js-prev-page-btn');
  // prevPagesBtn = pagination.querySelector('.js-pagination-prev-pages-btn');
  // firstBtn = pagination.querySelector('.js-pagination-first-btn');
  // secondBtn = pagination.querySelector('.js-pagination-second-btn');
  // thirdBtn = pagination.querySelector('.js-pagination-third-btn');
  // nextPagesBtn = pagination.querySelector('.js-pagination-next-pages-btn');
  // nextPageBtn = pagination.querySelector('.js-pagination-next-page-btn');
  // lastPageBtn = pagination.querySelector('.js-pagination-last-page-btn');

  setupButtonsEventListeners();
}

function setupButtonsEventListeners() {
  // const pagination = document.querySelector('.home-pagination');
  // if (!pagination) return;
  // const firstPageBtn = pagination.querySelector('.js-first-page-btn');
  // const prevPageBtn = pagination.querySelector('.js-prev-page-btn');
  // const prevPagesBtn = pagination.querySelector(
  //   '.js-pagination-prev-pages-btn'
  // );
  // const firstBtn = pagination.querySelector('.js-pagination-first-btn');
  // const secondBtn = pagination.querySelector('.js-pagination-second-btn');
  // const thirdBtn = pagination.querySelector('.js-pagination-third-btn');
  // const nextPagesBtn = pagination.querySelector(
  //   '.js-pagination-next-pages-btn'
  // );
  // const nextPageBtn = pagination.querySelector('.js-pagination-next-page-btn');
  // const lastPageBtn = pagination.querySelector('.js-pagination-last-page-btn');
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

function onFirstPageBtnClick() {}
function onPrevPageBtnClick(e) {}

async function onPrevPagesBtnClick(e) {
  onPaginationBtnClick(e);

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

function onNextPagesBtnClick(e) {
  onDotsBtnClick(e);

  const { firstBtnPageNumber } = initVars();
  recipesApiService.updateParams('page', firstBtnPageNumber);
  initMainGallery();
}

function onNextPageBtnClick() {
  const { currentPage, existingPageBtns } = initVars();
  const nextPage = currentPage + 1;

  existingPageBtns.forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.page) === nextPage);
  });
  recipesApiService.updateParams('page', nextPage);
  initMainGallery();
  // existingPageBtns.forEach(btn => btn.classList.remove('active'));
}

function onLastPageBtnClick() {}

function handlePaginationClick(e) {
  const { existingPageBtns } = initVars();
  const button = e.currentTarget;
  const btnPageNumber = Number(button.dataset.page);
  const currentPage = recipesApiService.getQueryParams().page;

  if (btnPageNumber !== currentPage) {
    existingPageBtns.forEach(btn => {
      console.log(btn);
      btn.classList.remove('active');
    });
    button.classList.add('active');
    recipesApiService.updateParams('page', btnPageNumber);
    initMainGallery();
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
  const totalPages = recipesApiService.getTotalPages();
  const currentPage = recipesApiService.getQueryParams().page;
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
    nextPagesBtn,
    prevPagesBtn,
    // totalPages,
    // isLastBtns,
    // isFirstBtns,
    existingPageBtns,
    pageBtnsAmount,
  } = initVars();

  if (e.currentTarget === nextPagesBtn) {
    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = `${
        Number(existingPageBtns[i].dataset.page) + pageBtnsAmount
      }`;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;

      // existingPageBtns[i].classList.toggle(
      //   'visually-hidden',
      //   existingPageBtns[i].dataset.page > totalPages
      // );

      // existingPageBtns[i].dataset.page > totalPages
      //   ? (existingPageBtns[i].style.display = 'none')
      //   : (existingPageBtns[i].style.display = 'block');
    }

    // const { isLastBtns, isFirstBtns } = initVars();

    // isLastBtns
    //   ? nextPagesBtn.classList.add('visually-hidden')
    //   : nextPagesBtn.classList.remove('visually-hidden');

    // isFirstBtns
    //   ? prevPagesBtn.classList.add('visually-hidden')
    //   : prevPagesBtn.classList.remove('visually-hidden');
  } else if (e.currentTarget === prevPagesBtn) {
    console.log('🚀 prevPagesBtn:', prevPagesBtn);

    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = `${
        Number(existingPageBtns[i].dataset.page) - pageBtnsAmount
      }`;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;

      //   existingPageBtns[i].dataset.page > totalPages
      //     ? (existingPageBtns[i].style.display = 'none')
      //     : (existingPageBtns[i].style.display = 'block');
      // }

      // const { isLastBtns, isFirstBtns } = initVars(e);

      // isLastBtns
      //   ? (nextPagesBtn.style.display = 'none')
      //   : (nextPagesBtn.style.display = 'block');

      // !isFirstBtns
      //   ? (prevPagesBtn.style.display = 'none')
      //   : (prevPagesBtn.style.display = 'block');

      // isLastBtns
      //   ? nextPagesBtn.classList.add('visually-hidden')
      //   : nextPagesBtn.classList.remove('visually-hidden');

      // isFirstBtns
      //   ? prevPagesBtn.classList.add('visually-hidden')
      //   : prevPagesBtn.classList.remove('visually-hidden');
    }
  }
}

function updatePaginationBtns(totalPages) {
  const {
    firstPageBtn,
    prevPageBtn,
    existingPageBtns,
    prevPagesBtn,
    nextPagesBtn,
    nextPageBtn,
    lastPageBtn,
    isLastBtns,
    isFirstBtns,
    currentPage,
  } = initVars();
  console.log('🚀 currentPage:', currentPage);

  existingPageBtns.forEach(btn => {
    btn.classList.toggle('visually-hidden', btn.dataset.page > totalPages);
  });
  firstPageBtn.classList.toggle('disabled', currentPage === 1);
  prevPageBtn.classList.toggle('disabled', isFirstBtns);
  prevPagesBtn.classList.toggle('visually-hidden', isFirstBtns);
  nextPagesBtn.classList.toggle('visually-hidden', isLastBtns);
  nextPageBtn.classList.toggle('disabled', isLastBtns);
  lastPageBtn.classList.toggle('disabled', currentPage === totalPages);
}

export { initHomePagination, updatePaginationBtns };
