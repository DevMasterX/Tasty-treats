// import { renderOrderForm } from './renderOrderForm.js';
import { initOrderForm } from './initOrderForm.js';
import { renderRecipeToModal } from './render-recipe-to-modal.js';
import { renderRatingModal } from './rating-modal.js';
// import { initOrderFormValidation } from '../utils/orderFormValidator.js';
// import { initFormStorage } from '../utils/formStorage.js';

let modal, overlay, modalContent;

function initModal() {
  modal = document.querySelector('.modal');
  overlay = document.querySelector('.modal-overlay');
  modalContent = document.querySelector('.modal-content');

  if (!modal || !overlay || !modalContent) {
    console.warn('Modal: one of the elements not found');
    return;
  }

  setupOpenButtons();
  setupCloseButtons();
  handleOverlayClick();
  handleEscapeKey();
}

// function setupOpenButtons() {
//   document.addEventListener('click', e => {
//     const openBtn = e.target.closest('[data-modal-open]');
//     if (!openBtn) return;

//     openModal(e);
//   });

//   // document.querySelectorAll('[data-modal-open]').forEach(btn => {
//   //   btn.addEventListener('click', openModal);
//   // });
// }

function setupOpenButtons() {
  document.addEventListener('click', e => {
    const openBtn = e.target.closest('[data-modal-open]');
    if (!openBtn) return;

    openModal(openBtn); // ← передаём именно кнопку
  });
}

function setupCloseButtons() {
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
}

function handleOverlayClick() {
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  }
}

function handleEscapeKey() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('is-hidden')) {
      closeModal();
    }
  });
}

async function openModal(triggerElement) {
  if (!modal || !triggerElement?.dataset?.modalType) return;

  await setModalContent(triggerElement);
  modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  if (!modal) return;
  modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  modalContent.innerHTML = '';
}

async function setModalContent(currentTarget) {
  const modalType = currentTarget.dataset.modalType;
  if (!modalContent || !modalType) return;

  switch (modalType) {
    case 'order':
      initOrderForm(modalContent);
      break;

    case 'recipe':
      await renderRecipeToModal(currentTarget, modalContent);
      break;

    case 'popular-recipe':
      await renderRecipeToModal(currentTarget, modalContent);
      break;

    case 'rating':
      renderRatingModal(currentTarget, modalContent);
      break;

    default:
      console.log('error');
  }
}

export { initModal, closeModal };
