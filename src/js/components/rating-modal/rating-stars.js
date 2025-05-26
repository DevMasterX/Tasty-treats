function initRatingStars(btn, modalContent) {
  const starsList = modalContent.querySelector('.js-modal-rating-list');
  const ratingNumber = document.querySelector('.js-modal-rating-number');
  const stars = modalContent.querySelector('.js-modal-rating-list').children;
  console.log('🚀 stars:', stars);
  [...stars].forEach((star, idx) => {
    star.addEventListener('mouseenter', () => {
      console.log('enter', idx);
      highlightStarsUpTo(stars, idx);
    });

    star.addEventListener('mouseleave', () => {
      console.log('leave');
      clearHighlightedStars(stars, idx);
    });

    // starsList.addEventListener('mouseleave', () => {
    //   clearHighlightedStars(stars);
    // });

    const handleMouseLeave = createMouseLeaveHandler(stars);
    starsList.addEventListener('mouseleave', handleMouseLeave);

    star.addEventListener('click', () => {
      console.log('click');
      onStarClick(stars, star, idx, ratingNumber);
      starsList.removeEventListener('mouseleave', handleMouseLeave);
    });
  });

  function createMouseLeaveHandler(stars) {
    return function handleMouseLeave() {
      clearHighlightedStars(stars);
    };
  }

  //   stars.forEach(star);
}

function highlightStarsUpTo(stars, hoverIdx) {
  [...stars].forEach((star, idx) => {
    if (idx <= hoverIdx) {
      star.classList.add('highlighted');
    } else if (idx > hoverIdx) {
      star.classList.remove('highlighted');
    }
  });
}

function clearHighlightedStars(stars, mouseleaveIdx = null) {
  if (mouseleaveIdx) {
    [...stars].forEach((star, idx) => {
      if (idx > mouseleaveIdx) {
        star.classList.remove('highlighted');
      }
    });
    return;
  }

  [...stars].forEach(star => {
    if (star.classList.contains('highlighted')) {
      star.classList.remove('highlighted');
    }
    //   star.classList.remove('highlighted');
  });
}

function onStarClick(stars, star, clickIdx, ratingNumber) {
  const rating = Number(star.dataset.rating).toFixed(1);
  ratingNumber.textContent = rating;
  star.classList.add('is-animate');

  [...stars].forEach((star, idx) => {
    if (idx <= clickIdx) {
      star.classList.add('highlighted');
    }
  });

  setTimeout(() => {
    star.classList.remove('is-animate');
  }, 1000);
}

function handleMouseLeave() {
  clearHighlightedStars(stars);
}

export { initRatingStars };
