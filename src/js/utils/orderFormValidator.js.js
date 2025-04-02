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

  form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm(e.currentTarget);
  });

  let isValid = true;
}

function validateForm(form) {
  // console.log(form.elements);
  [...form.elements].forEach(input => {
    // console.log(input.name);
    validateField(input);
  });
}

export { initOrderFormValidation };

// -----------------------------------------------------

function validateField(inputElement) {
  const configKeys = Object.keys(validationConfig);
  // console.log('🚀 configKeys:', configKeys);
  configKeys.forEach(key => {
    if (key === inputElement.name) {
      const required = validationConfig[key].required;
      const pattern = validationConfig[key].pattern;
      const errorMessage = validationConfig[key].errorMessage;
      // console.log(inputElement.name);
      // console.log('🚀 required:', required);
      // console.log('🚀 errorMessage:', errorMessage);
      // console.log('🚀 pattern:', pattern);
      // console.log(inputElement.value);
      // console.log(pattern.test());
      // console.log('pattern test', pattern.test(inputElement.value.trim()));
      if (required && inputElement.value.trim() === '') {
        showError(errorMessage);
      } else if (pattern && !pattern.test(inputElement.value.trim())) {
        showError(errorMessage);
      }
    }
  });
}

function showError(message) {}

function clearError() {}
