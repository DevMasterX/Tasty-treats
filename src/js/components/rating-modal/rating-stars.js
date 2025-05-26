// let checkedStarIdx = null;
function initRatingStars(btn, modalContent) {
  const starsList = modalContent.querySelector('.js-modal-rating-list');
  const ratingNumber = document.querySelector('.js-modal-rating-number');
  const stars = modalContent.querySelector('.js-modal-rating-list').children;
  const handleMouseLeave = createMouseLeaveHandler(stars);
  const sendBtn = modalContent.querySelector('.rating-send-btn');
  starsList.addEventListener('mouseleave', handleMouseLeave);

  [...stars].forEach((star, idx) => {
    star.addEventListener('mouseenter', () => {
      highlightStarsUpTo(stars, idx);
    });

    star.addEventListener('mouseleave', () => {
      console.log('leave');
      clearHighlightedStars(stars, idx);
    });

    star.addEventListener('click', () => {
      onStarClick(stars, star, idx, ratingNumber, sendBtn);
      // starsList.removeEventListener('mouseleave', handleMouseLeave);
    });
  });

  function createMouseLeaveHandler(stars) {
    return function handleMouseLeave() {
      clearHighlightedStars(stars);
    };
  }
}

function highlightStarsUpTo(stars, hoverIdx) {
  [...stars].forEach((star, idx) => {
    if (idx <= hoverIdx) {
      star.classList.add('highlighted-light');
    } else if (idx > hoverIdx) {
      star.classList.remove('highlighted-light');
    }
  });
}

function clearHighlightedStars(stars, mouseleaveIdx = null) {
  if (mouseleaveIdx) {
    [...stars].forEach((star, idx) => {
      if (idx > mouseleaveIdx) {
        star.classList.remove('highlighted-light');
      }
    });
    return;
  }

  [...stars].forEach(star => {
    if (star.classList.contains('highlighted-light')) {
      star.classList.remove('highlighted-light');
    }
  });
}

function onStarClick(stars, star, clickIdx, ratingNumber, sendBtn) {
  const rating = Number(star.dataset.rating).toFixed(1);
  const ratingAttributeValue = star.dataset.rating;
  ratingNumber.textContent = rating;
  ratingNumber.classList.add('is-animate');
  star.classList.add('is-animate');
  sendBtn.setAttribute('data-rating', ratingAttributeValue);

  [...stars].forEach((star, idx) => {
    if (idx <= clickIdx) {
      star.classList.add('highlighted');
    } else if (idx > clickIdx) {
      star.classList.remove('highlighted');
    }
  });

  setTimeout(() => {
    star.classList.remove('is-animate');
    ratingNumber.classList.remove('is-animate');
  }, 650);
}

export { initRatingStars };
