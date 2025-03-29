import { renderOrderForm } from './renderOrderForm';

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

function setupOpenButtons() {
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', openModal);
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

function openModal(e) {
  if (!modal) return;

  setModalContent(e.currentTarget.dataset.modalType);
  modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  if (!modal) return;
  modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  modalContent.innerHTML = '';
}

function setModalContent(modalType) {
  if (!modalContent || !modalType) return;

  switch (modalType) {
    case 'order':
      modalContent.innerHTML = renderOrderForm();
      break;

    default:
      console.log('error');
  }
}

export { initModal };
