import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

function initSimpleBar(element) {
  // new SimpleBar(element);

  if (!element || element.dataset.simplebarInited) return;

  new SimpleBar(element);
  element.dataset.simplebarInited = 'true';
  console.log('inside', element);
}

export { initSimpleBar };
