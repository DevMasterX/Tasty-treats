async function initFavCategories(favRecipes) {
  const favCategoriesContainer = document.querySelector(
    '.fav-categories-btn-wrapper'
  );
  if (!favCategoriesContainer) return;
  try {
    const favCategoriesList = [
      ...new Set(favRecipes.map(category => category.category)),
    ];

    favCategoriesContainer.innerHTML =
      createFavCategoriesMarkup(favCategoriesList);
    scrollHint(favCategoriesContainer);
    initButtonsListeners(favCategoriesList, favRecipes);
  } catch (error) {
    console.error('Error fetching favorites recipes:', error);
    throw error;
  }
}

function createFavCategoriesMarkup(categoriesList) {
  return categoriesList
    .map(
      category => `
        <button class="fav-btn" type="button" aria-label="${category} category button">${category}</button>
        `
    )
    .join('');
}

function scrollHint(el) {
  //   const el = document.querySelector('.fav-categories-btn-wrapper');
  if (window.innerWidth >= 1024) {
    el.scrollLeft = 250;
    setTimeout(() => (el.scrollLeft = 0), 500);
  }
}

function initButtonsListeners(favCategoriesList, favRecipes) {
  if (!favCategoriesList || !favRecipes) return;
  console.log('🚀 favRecipes:', favRecipes);
  console.log('🚀 favCategoriesList:', favCategoriesList);
}

export { initFavCategories };
