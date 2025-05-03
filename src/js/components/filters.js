import Choices from 'choices.js';
import { fetchAreaList } from '../services/area';
import { fetchIngredients } from '../services/ingredients';
import { recipesApiService } from '../services/recipes-api-service';
import { initMainGallery } from './main-gallery';
import { checkSavedCategory } from './current-category';

const selects = document.querySelectorAll('.filters-item__select');
const input = document.querySelector('.js-filters-item__input');
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
  console.log(ingredientsList);
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

  input.addEventListener('input', e => {
    const inputValue = e.currentTarget.value.toLowerCase().trim();
    recipesApiService.updateParams(input.name, inputValue);
    initMainGallery();
    // updateFilterParams(input.name, inputValue);

    //   console.log(inputValue);
    //   try {
    //     const filterFn = item => item.title.toLowerCase().includes(inputValue);
    //     console.log('🚀 condition:', filterFn);
    //     initMainGallery(filterFn);
    //     // const response = await recipesApiService.fetchRecipes();
    //     // console.log(response.results);
    //   } catch (error) {}
  });
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

// function updateFilterParams(key, value) {
//   filterParams[key] = value;
// }

export { initFilters };
