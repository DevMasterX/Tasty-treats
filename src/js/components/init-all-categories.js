import { fetchAllCategoriesList } from '../services/all-categories';

const allCategoriesList = document.querySelector('.all-categories__list');
if (!allCategoriesList) return;

async function initAllCategories() {
  try {
    const categories = await fetchAllCategoriesList();
    renderCategories(allCategoriesList, categories);
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
  [...list.children]
    .find(element => element.textContent.trim() === targetName)
    ?.classList.add('current');
}

export { initAllCategories };
