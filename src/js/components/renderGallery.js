import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

// const lightbox = GLightbox({
//   selector: '.gallery-lightbox',
// });
let lightbox;

function renderGallery(container, markup) {
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
