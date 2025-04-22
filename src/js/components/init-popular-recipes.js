import { fetchPopularRecipes } from '../services/popular-recipes';

const popularRecipesList = document.querySelector('.popular-recipes__list');
if (!popularRecipesList) return;

async function initPopularRecipes() {
  const recipes = await fetchPopularRecipes();
  console.log(recipes);

  renderPopularRecipes(recipes);
}

function renderPopularRecipes(recipes) {
  popularRecipesList.innerHTML = recipes
    .map(
      ({ description, preview, title }) => `
      
        <li class="popular-recipes__item">
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

export { initPopularRecipes };
