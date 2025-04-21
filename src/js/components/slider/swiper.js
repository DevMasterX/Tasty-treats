import Swiper from 'swiper';
import { Pagination, Autoplay, EffectCube, Parallax } from 'swiper/modules';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination.min.css';
import 'swiper/modules/effect-cube.min.css';
import 'swiper/modules/parallax.min.css';

import { apiClient } from '../../api/axios';

async function initSwiper() {
  const data = await getSwiperData();
  console.log('🚀 data:', data);

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
   <div class="swiper-slide" >
    <div class="swiper-slide__cook-img-container">
      <img   src="${item.cook.imgWebpUrl}" alt="${item.cook.name}" data-swiper-parallax="60%" />
      
    </div>
    <div class="swiper-slide__main-img-container">
      <img   src="${item.topic.previewWebpUrl}" alt="${item.topic.name}" data-swiper-parallax-scale="0" />
      
      <div class="swiper-title-wrapper">
        <h3 class="swiper-title" data-swiper-parallax-y="-150%" >${item.topic.name}</h3>
        <p class="swiper-location-text" data-swiper-parallax-y="-600%"  >${item.topic.area}</p>
      </div>
    </div>
    <div class="swiper-slide__big-img-container">
      <img   src="${item.topic.previewWebpUrl}" alt="${item.topic.name}" data-swiper-parallax-scale="0" />
      
    </div>
  </div>
   
    `
    )
    .join('');
}

function initSwiperInstance() {
  const swiper = new Swiper('.swiper', {
    spaceBetween: 50,

    modules: [Pagination, Autoplay, EffectCube, Parallax],
    speed: 2000,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      // type: 'bullets',
      clickable: true,
      type: 'bullets',
    },
    grabCursor: true,
    effect: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    loop: true,
    parallax: true,
  });
}

export { initSwiper };
