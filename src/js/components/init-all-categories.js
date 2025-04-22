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
    initCurrentItem(allCategoriesList, 'Breakfast');
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

function initCurrentItem(list, targetName = 'Breakfast') {
  let current = [...list.children].find(
    element => element.textContent.trim() === targetName
  );

  current?.classList.add('current');

  [...list.children].forEach(item =>
    item.addEventListener('click', () => {
      current.classList.remove('current');
      item.classList.add('current');
      current = item;
    })
  );
}

export { initAllCategories };
