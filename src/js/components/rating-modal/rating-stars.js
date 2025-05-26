function initRatingStars(btn, modalContent) {
  const stars = modalContent.querySelector('.js-modal-rating-list').children;
  console.log('🚀 stars:', stars);

  [...stars].forEach(star => {
    star.addEventListener('mouseenter', () => {
      console.log('enter');
    });
    star.addEventListener('mouseleave', () => {
      console.log('leave');
    });

    star.addEventListener('click', () => {
      console.log('click');
    });
  });
  //   stars.forEach(star);
}

export { initRatingStars };
