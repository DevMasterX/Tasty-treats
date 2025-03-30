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

  form.addEventListener('submit', onFormSubmit);

  function onFormSubmit(e) {
    e.preventDefault;
  }

  let isValid = true;
}

export { initOrderFormValidation };

// -----------------------------------------------------

function validateField(inputElement) {}

function showError() {}

function clearError() {}
