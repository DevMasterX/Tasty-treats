import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination.min.css';

import { apiClient } from '../../api/axios';

async function initSwiper() {
  const data = await getSwiperData();
  renderSlides(data);
  initSwiperInstance();
}

async function getSwiperData() {
  try {
    const res = await apiClient.get('/events');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error loading data for slider:', error);
    return [];
  }
}

function renderSlides(data) {
  const swiperContainer = document.querySelector('.swiper-wrapper');

  if (!swiperContainer) {
    console.warn('Swiper wrapper not found in DOM');
    return;
  }

  swiperContainer.innerHTML = data
    .map(
      item => `
   <div class="swiper-slide">
    <div class="swiper-slide__cook-img-container">
      <img  class="swiper-lazy" src="${item.cook.imgWebpUrl}" alt="${item.cook.name}" />
    </div>
    <div class="swiper-slide__main-img-container">
      <img  class="swiper-lazy" src="${item.topic.previewWebpUrl}" alt="${item.topic.name}" />
      <div class="swiper-title-wrapper">
        <h3 class="swiper-title">${item.topic.name}</h3>
        <p class="swiper-text">${item.topic.area}</p>
      </div>
    </div>
    <div class="swiper-slide__big-img-container">
      <img  class="swiper-lazy" src="${item.topic.previewWebpUrl}" alt="${item.topic.name}" />
    </div>
  </div>
   
    `
    )
    .join('');
}

function initSwiperInstance() {
  const swiper = new Swiper('.swiper', {
    // spaceBetween: 100,
    // effect: 'cards',
    // centerInsufficientSlides: true,
    modules: [Pagination, Autoplay],
    speed: 1500,
    autoplay: {
      delay: 500,
    },
    pagination: {
      el: '.swiper-pagination',
      // type: 'bullets',
      clickable: true,
    },
    grabCursor: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    lazy: {
      loadOnTransitionStart: true,
      loadPrevNext: true,
      lazyPreloadPrevNext: 2,
    },
    loop: true,

    // parallax: true,
    // effect: 'cube',
    // cubeEffect: {
    //   slideShadows: true,
    // },
  });
}

export { initSwiper };
