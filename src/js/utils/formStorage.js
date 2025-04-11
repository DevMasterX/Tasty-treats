const ORDER_FORM_KEY = 'order-form-data';

function initFormStorage(form) {
  restoreFormStateFromLocalStorage(form);
  saveFormStateToLocalStorage(form);
}

function restoreFormStateFromLocalStorage(form) {
  const formData = JSON.parse(localStorage.getItem(ORDER_FORM_KEY));
  console.log('🚀 formData:', formData);

  if (!formData) return;
}

function saveFormStateToLocalStorage(form) {
  if (!form) return;

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

    const formData = JSON.parse(localStorage.getItem(ORDER_FORM_KEY) || '{}');
    console.log(formData);

    formData[formDataKey] = formDataValue;

    localStorage.setItem(ORDER_FORM_KEY, JSON.stringify(formData));
  });
}

export { initFormStorage, ORDER_FORM_KEY };
