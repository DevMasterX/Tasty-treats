import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

let lightbox;

function renderGallery(container, markup) {
  if (!container) {
    console.error('Gallery container not found');
    return;
  }

  container.innerHTML = markup;

  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = GLightbox({
    selector: '.gallery-lightbox',
    loop: true,
  });
}

export { renderGallery };
