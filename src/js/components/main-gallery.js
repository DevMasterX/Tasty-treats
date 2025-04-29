import { createGalleryMarkup } from './galleryMarkup';
import { renderGallery } from './renderGallery';
import { recipesApiService } from '../services/recipes-api-service';

async function initMainGallery() {
  const container = document.querySelector('.main-gallery-container');

  try {
    const data = await recipesApiService.fetchRecipes();
    const markup = createGalleryMarkup(data.results);
    renderGallery(container, markup);
  } catch (error) {
    console.error('Error loading recipes on the client:', error);
    throw error;
  }
}

export { initMainGallery };
