import { renderOrderForm } from './renderOrderForm';
import { initFormStorage } from '../utils/formStorage';
import { initOrderFormValidation } from '../utils/orderFormValidator';

function initOrderForm(modalContent) {
  renderOrderForm(modalContent);
  const form = document.querySelector('.js-order-form');
  initFormStorage(form);
  initOrderFormValidation(form);
}

export { initOrderForm };
