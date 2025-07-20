import Notiflix from 'notiflix';

import { closeModal } from '../components/modal';
import { STORAGE_KEYS } from '../../constants/constants';
import { removeFromStorage } from './localStorage';
import { sendRatingFormData } from '../services/rating-form';

const ratingEmailKey = STORAGE_KEYS.RATING_EMAIL_KEY;

const validationConfig = {
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    errorMessage: 'Enter a valid Gmail address (@gmail.com)',
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

  errorElement.classList.add('animate__animated', 'animate__headShake');
  errorElement.addEventListener('animationend', () => {
    errorElement.classList.remove('animate__bounceIn');
  });

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
  const sendRatigBtn = form.querySelector('.rating-send-btn');
  const rating = sendRatigBtn.dataset.rating;
  const invalidInput = form.querySelector('.is-invalid');
  const input = form.querySelector('.rating__input');

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

async function formSubmit(form) {
  const sendBtn = form.querySelector('.rating-send-btn');
  const id = sendBtn.dataset.id;
  console.log('🚀 id:', id);

  const data = {
    rate: Number(formData.rating),
    email: formData.email,
  };
  console.log('🚀 data:', data);

  try {
    await sendRatingFormData(id, data);
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
  } catch (error) {
    Notiflix.Report.failure(
      'Error',
      // 'Something went wrong. Please try again.',
      `${error?.response?.data.message}`,
      'Close',
      {
        width: '360px',
        svgSize: '180px',
      }
    );
  }
}

function getErrorElement(input) {
  return input
    .closest('.rating__input-wrapper')
    ?.querySelector('.order-form__error-message.rating__input-error-message');
}

export { initRatingFormValidation };
