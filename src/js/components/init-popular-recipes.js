import { fetchPopularRecipes } from '../services/popular-recipes';
import { hideLoader, showLoader } from './loader';

const loaderContainer = document.querySelector('.popular-recipes-section');
showLoader(loaderContainer);

const popularRecipesList = document.querySelector('.popular-recipes__list');
if (!popularRecipesList) return;

async function initPopularRecipes() {
  try {
    const recipes = await fetchPopularRecipes();
    // console.log('🚀 recipes:', recipes);

    renderPopularRecipes(recipes);
    // [...popularRecipesList.children].forEach(item => item.addEventListener);
    // setEventListeners(popularRecipesList);
  } catch (error) {
    console.error('Error loading popular recipes:', error);
    throw error;
  } finally {
    hideLoader(loaderContainer);
  }
}

function renderPopularRecipes(recipes) {
  popularRecipesList.innerHTML = recipes
    .map(
      ({ description, preview, title, _id }) => `
      
        <li class="popular-recipes__item" data-modal-open data-id="${_id}" data-modal-type="popular-recipe" aria-label="See popular-recipe">
<div class="popular-recipes__img-wrapper">
  <img class="popular-recipes__img" src="${preview}" alt="${title}"  />
</div>
<div class="popular-recipes__text-wrapper">
  <h3 class="popular-recipes__item-title">${title}</h3>
  <p class="popular-recipes__item-text">${description}</p>
  </div>
</li> 
  
    `
    )
    .join('');
}

// function setEventListeners(list) {
//   list.forEach(item => console.log(item));
// }

export { initPopularRecipes };
