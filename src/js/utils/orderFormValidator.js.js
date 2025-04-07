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

  //   const usernameInput = form.querySelector('[name="username"]');
  //   const phoneInput = form.querySelector('[name="phone_number"]');
  //   const emailInput = form.querySelector('[name="email"]');

  //   form
  //     .querySelectorAll('.order-form__input')
  //     .forEach(el => console.log(validationConfig[el.name]));

  //   const phonePattern = /^[\d\s+()-]{7,20}$/;
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm(form);
  });
}

function validateForm(form) {
  [...form.elements].forEach(input => {
    // console.log(input.name);
    validateField(input);
  });
}

export { initOrderFormValidation };

// -----------------------------------------------------

function validateField(inputElement) {
  const config = validationConfig[inputElement.name];
  console.log('🚀 config:', config);

  if (!config) return;

  const configKeys = Object.keys(validationConfig);

  configKeys.forEach(key => {
    if (key === inputElement.name) {
      const required = validationConfig[key].required;
      const pattern = validationConfig[key].pattern;
      const errorMessage = validationConfig[key].errorMessage;
      const errorEl = inputElement
        .closest('label')
        ?.querySelector('.order-form__error-essage');
      // console.log(inputElement.name);
      // console.log('🚀 required:', required);
      // console.log('🚀 errorMessage:', errorMessage);
      // console.log('🚀 pattern:', pattern);
      // console.log(inputElement.value);
      // console.log(pattern.test());
      // console.log('pattern test', pattern.test(inputElement.value.trim()));
      if (required && inputElement.value.trim() === '') {
        showError(errorEl, errorMessage, inputElement);
      } else if (pattern && !pattern.test(inputElement.value.trim())) {
        showError(errorEl, errorMessage, inputElement);
      }
    }
  });
}

function showError(errorElement, message, inputElement) {
  if (!errorElement || !inputElement) return;

  if (errorElement.textContent !== message) {
    errorElement.textContent = message;
  }

  inputElement.classList.add('is-invalid');
}

function clearError() {}

// function validateField(inputElement) {
//   clearError(inputElement); // 🧼 Сброс перед проверкой

//   const config = validationConfig[inputElement.name];
//   if (!config) return;

//   const { required, pattern, errorMessage } = config;
//   const value = inputElement.value.trim();
//   const errorEl = inputElement
//     .closest('label')
//     ?.querySelector('.order-form__error-essage');

//   if (required && value === '') {
//     showError(errorEl, errorMessage, inputElement);
//   } else if (pattern && !pattern.test(value)) {
//     showError(errorEl, errorMessage, inputElement);
//   }
// }
