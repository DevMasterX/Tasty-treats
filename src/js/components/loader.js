import 'spinkit/spinkit.min.css';

function showLoader(container, opacityElement = null) {
  const loader = container.querySelector('.js-loader');
  if (!loader || !container) return;
  if (opacityElement) {
    opacityElement.style.opacity = 0.1;
  }
  loader.style.display = 'block';
}

function hideLoader(container, opacityElement = null) {
  const loader = container.querySelector('.js-loader');
  console.log('🚀 container:', container);
  console.log('🚀 loader:', loader);

  if (!loader || !container) return;

  loader.style.display = 'none';

  if (opacityElement) {
    opacityElement.style.opacity = 1;
  }
}

export { showLoader, hideLoader };
