const modal = document.querySelector('.modal');
const overlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');

function openModal() {
  modal.classList.toggle('is-hidden');
}
function closeModal() {}

function setModalContent(htmlString) {}

function initModal() {
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', openModal);
  });
}
