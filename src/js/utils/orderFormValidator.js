import { closeModal } from '../components/modal';
import { ORDER_FORM_KEY } from './formStorage';

const validationConfig = {
  username: {
    required: true,
    errorMessage: 'Please enter your name',
  },
  phone_number: {
    required: true,
    pattern: /^[\d\s+()-]{7,20}$/,
    errorMessage: 'Enter a valid phone number',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: 'Enter a valid email address',
  },
};

function initOrderFormValidation(form) {
  // const form = document.querySelector('.js-order-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm(form);
    checkBeforeSubmit(form);
    formSubmit(form);
  });
}

function validateForm(form) {
  [...form.elements].forEach(input => {
    validateField(input);
    attachInputListener(input);
  });
}

export { initOrderFormValidation };

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
  const invalidInput = [...form.elements].find(input =>
    input.classList.contains('is-invalid')
  );

  if (invalidInput) {
    invalidInput.focus();
    return;
  }

  resetValidationState(form);
  closeModal();
}

function resetValidationState(form) {
  [...form.elements].forEach(input => {
    input.classList.remove('is-valid', 'is-invalid');
    delete input.dataset.listenerAdded;

    const errorEl = getErrorElement(input);

    if (errorEl) errorEl.textContent = '';
  });
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

function clearFormStorage(storageKey) {
  localStorage.removeItem(storageKey);
}

function formSubmit(form) {
  form.reset();

  clearFormStorage(ORDER_FORM_KEY);
  console.log('success');
}

function getErrorElement(input) {
  return input.closest('label')?.querySelector('.order-form__error-message');
}
