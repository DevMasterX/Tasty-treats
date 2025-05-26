import Notiflix from 'notiflix';

import { closeModal } from '../components/modal';
import { STORAGE_KEYS } from '../../constants/constants';
import { removeFromStorage } from './localStorage';

const ratingEmailKey = STORAGE_KEYS.RATING_EMAIL_KEY;
// import { ORDER_FORM_KEY } from './formStorage';

// const STORAGE_KEYS = {
//   CURRENT_CATEGORY: 'current-category',
//   THEME_KEY: 'theme',
//   FAVORITES_KEY: 'favorites',
//   RATING_EMAIL_KEY: 'rating-email';
// };

const validationConfig = {
  // username: {
  //   required: true,
  //   errorMessage: 'Please enter your name',
  // },
  // phone_number: {
  //   required: true,
  //   pattern: /^[\d\s+()-]{7,20}$/,
  //   errorMessage: 'Enter a valid phone number',
  // },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: 'Enter a valid email address',
  },
};

let formData = {};

function initRatingFormValidation(modalContent) {
  const form = modalContent.querySelector('.rating-form');
  const sendRatigBtn = form.querySelector('.rating-send-btn');
  sendRatigBtn.classList.add('disabled');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm(form);
    checkBeforeSubmit(form);
  });
}

function validateForm(form) {
  const input = form.querySelector('.rating__input');
  validateField(input);
  attachInputListener(input);
}

// -----------------------------------------------------

function validateField(inputElement) {
  const config = validationConfig[inputElement.name];

  if (!config) return;

  const { required, pattern, errorMessage } = config;
  const value = inputElement.value.trim();
  const errorEl = getErrorElement(inputElement);

  if (required && value === '') {
    showError(errorEl, errorMessage, inputElement);
  } else if (pattern && !pattern.test(value)) {
    showError(errorEl, errorMessage, inputElement);
  } else {
    clearError(inputElement, errorEl);
  }
}

function showError(errorElement, message, inputElement) {
  if (!errorElement || !inputElement) return;

  if (errorElement.textContent !== message) {
    errorElement.textContent = message;
  }

  inputElement.classList.add('is-invalid');
  inputElement.classList.remove('is-valid');
}

function clearError(inputElement, errorEl) {
  inputElement.classList.remove('is-invalid');
  inputElement.classList.add('is-valid');
  if (errorEl) {
    errorEl.textContent = '';
  }
}

function checkBeforeSubmit(form) {
  // const invalidInput = [...form.elements].find(input =>
  //   input.classList.contains('is-invalid')
  // );
  const sendRatigBtn = form.querySelector('.rating-send-btn');
  const rating = sendRatigBtn.dataset.rating;
  const invalidInput = form.querySelector('.is-invalid');
  const input = form.querySelector('.rating__input');
  // const errorEl = getErrorElement(input);

  // if (rating) {
  // }

  if (invalidInput) {
    invalidInput.focus();
    return;
  }

  formData = {
    rating: rating,
    email: input.value,
  };

  resetValidationState(form);
  formSubmit(form);
}

function resetValidationState(form) {
  const input = form.querySelector('.rating__input');
  input.classList.remove('is-valid', 'is-invalid');
  delete input.dataset.listenerAdded;
  const errorEl = getErrorElement(input);

  if (errorEl) errorEl.textContent = '';

  // [...form.elements].forEach(input => {
  //   input.classList.remove('is-valid', 'is-invalid');
  //   delete input.dataset.listenerAdded;

  //   const errorEl = getErrorElement(input);

  //   if (errorEl) errorEl.textContent = '';
  // });
}

function attachInputListener(input) {
  if (
    !input.name ||
    input.dataset.listenerAdded ||
    !validationConfig[input.name]
  )
    return;

  input.addEventListener('input', () => {
    validateField(input);
  });
  input.dataset.listenerAdded = 'true';
}

// function clearFormStorage(storageKey) {
//   localStorage.removeItem(storageKey);
// }

function formSubmit(form) {
  console.log('formData:', formData);
  form.reset();
  removeFromStorage(ratingEmailKey);
  closeModal();

  Notiflix.Report.success(
    'SUCCESS',
    'Thank you! Your rating has been sent.',
    'Close',

    {
      width: '360px',
      svgSize: '180px',
    }
  );
}

function getErrorElement(input) {
  return input
    .closest('.rating__input-wrapper')
    ?.querySelector('.order-form__error-message.rating__input-error-message');
}

export { initRatingFormValidation };
