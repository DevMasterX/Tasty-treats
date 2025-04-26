import Choices from 'choices.js';
import { fetchAreaList } from '../services/area';
import { fetchIngredients } from '../services/ingredients';

const choicesOptions = {
  shouldSort: false,
  searchEnabled: false,
  itemSelectText: '',
};
async function initFilters() {
  await initAreaList();
  await initIngredientsList();

  initChoices();
}

function initChoices() {
  const selectElements = document.querySelectorAll('.js-choice');
  selectElements.forEach(element => {
    new Choices(element, choicesOptions);
  });
}

async function initAreaList() {
  const areaList = await fetchAreaList();
  renderAreaList(areaList);
}
async function initIngredientsList() {
  const ingredientsList = await fetchIngredients();
  renderIngredientsList(ingredientsList);
}

function renderAreaList(list) {
  const container = document.querySelector('[name="area"]');
  const listMarkup = createListMarkup(list);
  container.insertAdjacentHTML('beforeend', listMarkup);
}

function renderIngredientsList(list) {
  const container = document.querySelector('[name="ingredients"]');
  const listMarkup = createListMarkup(list);
  container.insertAdjacentHTML('beforeend', listMarkup);
}

function createListMarkup(list) {
  return list
    .map(
      ({ name }) =>
        `
    <option value="${name}">${name}</option>
    `
    )
    .join('');
}

export { initFilters };
