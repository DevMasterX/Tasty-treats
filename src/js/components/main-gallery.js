import { createGalleryMarkup } from './galleryMarkup';
import { renderGallery } from './renderGallery';
import { recipesApiService } from '../services/recipes-api-service';
import { hideLoader, showLoader } from './loader';
import { initModal } from './modal';

async function initMainGallery() {
  const container = document.querySelector('.main-gallery-container');
  const loaderContainer = document.querySelector('.main-gallery');
  showLoader(loaderContainer, container);

  try {
    const data = await recipesApiService.fetchRecipes();
    console.log(data.results);
    const markup = createGalleryMarkup(data.results);
    // hideLoader(loaderContainer);
    renderGallery(container, markup);
    initModal();
  } catch (error) {
    console.error('Error loading recipes on the client:', error);
    throw error;
  } finally {
    hideLoader(loaderContainer, container);
  }
}

export { initMainGallery };
