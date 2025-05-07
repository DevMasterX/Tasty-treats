import { createGalleryMarkup } from './galleryMarkup';
import { renderGallery } from './renderGallery';
import { recipesApiService } from '../services/recipes-api-service';

async function initMainGallery(filterFn = null) {
  const container = document.querySelector('.main-gallery-container');

  try {
    // if (filterFn) {
    //   const data = await recipesApiService.fetchRecipes();
    //   const filteredData = data.results.filter(filterFn);
    //   console.log('🚀 filteredData:', filteredData);

    //   const markup = createGalleryMarkup(filteredData);
    //   renderGallery(container, markup);
    //   return;
    // }

    const data = await recipesApiService.fetchRecipes();
    console.log('res', data);
    const markup = createGalleryMarkup(data.results);
    console.log(data);
    renderGallery(container, markup);
  } catch (error) {
    console.error('Error loading recipes on the client:', error);
    throw error;
  }
}

export { initMainGallery };
