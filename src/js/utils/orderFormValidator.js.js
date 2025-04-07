import { closeModal } from '../components/modal';

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

function initOrderFormValidation() {
  const form = document.querySelector('.js-order-form');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm(form);
    checkBeforeSubmit(form);
  });
}

function validateForm(form) {
  [...form.elements].forEach(input => {
    validateField(input);

    if (
      input.classList.contains('is-invalid') &&
      !input.dataset.listenerAdded
    ) {
      input.addEventListener('input', () => {
        validateField(input);
      });
      input.dataset.listenerAdded = 'true';
    }
  });
}

export { initOrderFormValidation };

// -----------------------------------------------------

function validateField(inputElement) {
  const config = validationConfig[inputElement.name];

  if (!config) return;

  const { required, pattern, errorMessage } = config;
  const value = inputElement.value.trim();
  const errorEl = inputElement
    .closest('label')
    ?.querySelector('.order-form__error-essage');

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
  const hasInvalidFields = [...form.elements].some(input => {
    return input.classList.contains('is-invalid');
  });

  if (!hasInvalidFields) {
    form.reset();
    resetValidationState(form);

    closeModal();
    console.log('success');
  }
}

function resetValidationState(form) {
  [...form.elements].forEach(input => {
    input.classList.remove('is-valid', 'is-invalid');
    delete input.dataset.listenerAdded;

    const errorEl = input
      .closest('label')
      ?.querySelector('.order-form__error-essage');

    if (errorEl) errorEl.textContent = '';
  });
}
