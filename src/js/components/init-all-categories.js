import { initSimpleBar } from '../utils/simplebar';
import { fetchAllCategoriesList } from '../services/all-categories';

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

  // current?.classList.add('current');

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

export { initAllCategories };
