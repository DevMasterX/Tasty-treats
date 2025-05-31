import { recipesApiService } from '../../services/recipes-api-service';
import { initMainGallery } from '../main-gallery';

function initHomePagination() {
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
  recipesApiService.updateParams('page', 1);
  initMainGallery();
}
function onPrevPageBtnClick() {
  const { currentPage, existingPageBtns } = initVars();
  const prevPage = currentPage - 1;

  // existingPageBtns.forEach(btn => {
  //   btn.classList.toggle('active', Number(btn.dataset.page) === prevPage);
  // });
  recipesApiService.updateParams('page', prevPage);
  initMainGallery();
}

async function onPrevPagesBtnClick(e) {
  onDotsBtnClick(e);

  const { firstBtnPageNumber } = initVars();
  recipesApiService.updateParams('page', firstBtnPageNumber);
  await initMainGallery();
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

function onLastPageBtnClick() {
  const { totalPages: lastPage } = initVars();
  recipesApiService.updateParams('page', lastPage);
  initMainGallery();
}

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

  // lastPageBtn=
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
    firstPageBtn,
    nextPagesBtn,
    prevPagesBtn,
    // totalPages,
    // isLastBtns,
    currentPage,
    existingPageBtns,
    pageBtnsAmount,
  } = initVars();

  if (e.currentTarget === nextPagesBtn) {
    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = `${
        Number(existingPageBtns[i].dataset.page) + pageBtnsAmount
      }`;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
      if (!firstPageBtn.classList.contains('active')) {
        existingPageBtns[i].classList.remove('active');
      }
      // if(){}
      // existingPageBtns[i].classList.remove('active');
      // existingPageBtns[i].classList.toggle(
      //   'active',
      //   Number(existingPageBtns[i].dataset.page) === currentPage
      // );
    }
  } else if (e.currentTarget === prevPagesBtn) {
    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = `${
        Number(existingPageBtns[i].dataset.page) - pageBtnsAmount
      }`;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
      if (!firstPageBtn.classList.contains('active')) {
        existingPageBtns[i].classList.remove('active');
      }
    }
  }
}

function updatePaginationBtns(page, totalPages) {
  const {
    pageBtnsAmount,
    firstPageBtn,
    prevPageBtn,
    existingPageBtns,
    prevPagesBtn,
    nextPagesBtn,
    nextPageBtn,
    lastPageBtn,

    currentPage,
    firstBtnPageNumber,
    lastBtnPageNumber,
  } = initVars();

  existingPageBtns.forEach(btn => {
    console.log('before', btn.dataset.page);
  });
  console.log('🚀 currentPage:', currentPage);

  if (lastBtnPageNumber < page) {
    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page = page + i;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
    }
  } else if (page < firstBtnPageNumber) {
    for (let i = 0; i < pageBtnsAmount; i++) {
      existingPageBtns[i].dataset.page =
        existingPageBtns[i].dataset.page - page;
      existingPageBtns[i].textContent = existingPageBtns[i].dataset.page;
    }
  }

  existingPageBtns.forEach(btn => {
    console.log('after', btn.dataset.page);
  });

  const { isLastBtns, isFirstBtns } = initVars();

  existingPageBtns.forEach(btn => {
    btn.classList.toggle('visually-hidden', btn.dataset.page > totalPages);
    btn.classList.toggle('active', Number(btn.dataset.page) === page);
  });
  firstPageBtn.classList.toggle('disabled', page === 1);
  prevPageBtn.classList.toggle('disabled', page === 1);
  prevPagesBtn.classList.toggle('visually-hidden', isFirstBtns);
  nextPagesBtn.classList.toggle('visually-hidden', isLastBtns);
  nextPageBtn.classList.toggle('disabled', page === totalPages);
  lastPageBtn.classList.toggle('disabled', page === totalPages);
}

export { initHomePagination, updatePaginationBtns };
