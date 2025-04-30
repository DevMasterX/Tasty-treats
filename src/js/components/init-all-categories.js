import { initSimpleBar } from '../utils/simplebar';
import { fetchAllCategoriesList } from '../services/all-categories';

const allCategoriesSection = document.querySelector('.all-categories');
const allCategoriesBtn = document.querySelector('.all-categories__button');
const allCategoriesList = document.querySelector('.all-categories__list');
const allCategoriesListWrapper = document.querySelector(
  '.all-categories__list-wrapper'
);
if (!allCategoriesList || !allCategoriesListWrapper) return;

async function initAllCategories() {
  try {
    const categories = await fetchAllCategoriesList();
    renderCategories(allCategoriesList, categories);

    initSimpleBar(allCategoriesListWrapper);
    initCurrentItem(allCategoriesList);
    initEventListeners(allCategoriesSection, allCategoriesBtn);
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}
function renderCategories(element, list) {
  element.innerHTML = list
    .map(
      ({ name }) => `
    <li class="all-categories__item">${name}</li>
        `
    )
    .join('');
}

function initCurrentItem(list) {
  let current = [...list.children].find(element =>
    element.classList.contains('current')
  );

  [...list.children].forEach(item =>
    item.addEventListener('click', () => {
      if (current) {
        current.classList.remove('current');
      }
      item.classList.add('current');
      current = item;
    })
  );
}

function initEventListeners(section, btn) {
  section.addEventListener('click', e => {
    // const categoryItem = document.querySelector.classList.contains(
    //   'all-categories__item'
    // );

    if (e.target === btn) {
      console.log('btn');
    } else if (e.target.classList.contains('all-categories__item')) {
      console.log(e.target.textContent);
    }
  });
}

export { initAllCategories };
