import Choices from 'choices.js';
import debounce from 'lodash.debounce';
import { fetchAreaList } from '../services/area';
import { fetchIngredients } from '../services/ingredients';
import { recipesApiService } from '../services/recipes-api-service';
import { initMainGallery } from './main-gallery';
import { INPUT_DEBOUNCE_DELAY } from '../../constants/constants';
// import { checkSavedCategory } from './current-category';

const selects = document.querySelectorAll('.filters-item__select');
const input = document.querySelector('.js-filters-item__input');
const inputClearBtn = document.querySelector('.filter-input__clear-btn');
const resetBtn = document.querySelector('.reset-filter-btn');

const choicesInstances = [];
const choicesOptions = {
  shouldSort: false,
  searchEnabled: false,
  itemSelectText: '',

  renderSelectedChoices: 'always',
  allowHTML: true,
};

// let filterParams = {
//   title: null,
//   time: null,
//   area: null,
//   ingredients: null,
// };

inputClearBtn.addEventListener('click', () => {
  input.value = '';
  hideClearBtn();
  recipesApiService.updateParams(input.name, input.value);
  initMainGallery();
});

resetBtn.addEventListener('click', () => {
  recipesApiService.resetFilterQueryParams();
  // checkSavedCategory();
  input.value = '';

  choicesInstances.forEach(instance => {
    instance.setChoiceByValue('');
  });

  initMainGallery();
});
async function initFilters() {
  await Promise.all([initAreaList(), initIngredientsList()]);

  initChoices();

  initInputEventListener(input);
  initSelectsEventListener(selects);
}

function initChoices() {
  const selectElements = document.querySelectorAll('.js-choice');
  selectElements.forEach(element => {
    const instance = new Choices(element, choicesOptions);
    choicesInstances.push(instance);
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
  const container = document.querySelector('[name="ingredient"]');
  const listMarkup = createIngredientsListMarkup(list);
  container.insertAdjacentHTML('beforeend', listMarkup);
}

function createIngredientsListMarkup(list) {
  return list
    .map(
      ({ _id, name }) =>
        `
    <option value="${_id}">${name}</option>
    `
    )
    .join('');
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

function initInputEventListener(input) {
  if (!input) return;

  const onInput = debounce(e => {
    const inputValue = e.target.value.toLowerCase().trim();
    toggleClearBtn(inputValue);
    recipesApiService.updateParams(input.name, inputValue);
    initMainGallery();
  }, INPUT_DEBOUNCE_DELAY);

  input.addEventListener('input', onInput);
}

function initSelectsEventListener(selects) {
  selects.forEach(select => {
    select.addEventListener('change', () => {
      recipesApiService.updateParams(select.name, select.value);
      console.log(select.name);
      console.log(select.value);

      initMainGallery();
    });
  });
}

function toggleClearBtn(inputValue) {
  inputValue.length === 0 ? hideClearBtn() : showClearBtn();
}

function showClearBtn() {
  inputClearBtn.style.display = 'block';

  setTimeout(() => {
    inputClearBtn.style.opacity = 1;
  }, 200);
  // inputClearBtn.style.display = 'block';
}

function hideClearBtn() {
  setTimeout(() => {
    inputClearBtn.style.display = 'none';
  }, 200);

  inputClearBtn.style.opacity = 0;
}
// function updateFilterParams(key, value) {
//   filterParams[key] = value;
// }

export { initFilters };
