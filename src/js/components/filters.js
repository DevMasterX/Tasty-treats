import Choices from 'choices.js';

const choicesOptions = {
  shouldSort: false,
  searchEnabled: false,
  itemSelectText: '',
};
function initFilters() {
  const selectElements = document.querySelectorAll('.js-choice');
  selectElements.forEach(element => {
    new Choices(element, choicesOptions);
  });
}

export { initFilters };
