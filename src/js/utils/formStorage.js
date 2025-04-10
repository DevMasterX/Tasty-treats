function initFormStorage(form) {
  // restoreFormStateFromLocalStorage();
  saveFormStateToLocalStorage(form);
}

// function restoreFormStateFromLocalStorage() {
//   const formData = localStorage.getItem();

//   const form = document.querySelector('.js-order-form');

//   try {
//   } catch (error) {}
// }

function saveFormStateToLocalStorage(form) {
  if (!form) return;

  const ORDER_FORM_KEY = 'order-form-data';

  form.addEventListener('focusout', e => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      )
    ) {
      return;
    }

    const formDataKey = e.target.name;
    const formDataValue = e.target.value;

    if (!formDataKey) return;

    const formData = JSON.parse(localStorage.getItem(ORDER_FORM_KEY || '{}'));

    formData[formDataKey] = formDataValue;

    localStorage.setItem(ORDER_FORM_KEY, JSON.stringify(formData));
  });
}

export { initFormStorage };
