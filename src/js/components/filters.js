import Choices from 'choices.js';
import { initSimpleBar } from '../utils/simplebar';
import debounce from 'lodash.debounce';
import { fetchAreaList } from '../services/area';
import { fetchIngredients } from '../services/ingredients';
import { recipesApiService } from '../services/recipes-api-service';
import { initMainGallery } from './main-gallery';
import { INPUT_DEBOUNCE_DELAY } from '../../constants/constants';
import { startTypeEffect, stopTypeEffect } from './typing-effect';

const selects = document.querySelectorAll('.filters-item__select');
const input = document.querySelector('.js-filters-item__input');
const placeholder = input.placeholder;
const inputClearBtn = document.querySelector('.filter-input__clear-btn');
const resetBtn = document.querySelector('.reset-filter-btn');

const choicesInstances = [];
const choicesOptions = {
  shouldSort: false,
  searchEnabled: false,
  itemSelectText: '',
  placeholder: false,
  renderSelectedChoices: 'always',
  allowHTML: true,

  classNames: {
    containerOuter: ['choices'],
    containerInner: ['choices__inner'],
    input: ['choices__input'],
    inputCloned: ['choices__input--cloned'],
    list: ['choices__list'],
    listItems: ['choices__list--multiple'],
    listSingle: ['choices__list--single'],
    listDropdown: ['choices__list--dropdown'],
    item: ['choices__item'],
    itemSelectable: ['choices__item--selectable'],
    itemDisabled: ['choices__item--disabled'],
    itemChoice: ['choices__item--choice'],
    description: ['choices__description'],
    placeholder: ['choices__placeholder'],
    group: ['choices__group'],
    groupHeading: ['choices__heading'],
    button: ['choices__button'],
    activeState: ['is-active'],
    focusState: ['is-focused'],
    openState: ['is-open'],
    disabledState: ['is-disabled'],
    highlightedState: ['is-highlighted'],
    selectedState: ['is-selected'],
    flippedState: ['is-flipped'],
    loadingState: ['is-loading'],
    notice: ['choices__notice'],
    addChoice: ['choices__item--selectable', 'add-choice'],
    noResults: ['has-no-results'],
    noChoices: ['has-no-choices'],
  },
};

inputClearBtn.addEventListener('click', () => {
  input.value = '';
  hideClearBtn();
  recipesApiService.updateParams(input.name, input.value);
  initMainGallery();
});

resetBtn.addEventListener('click', () => {
  recipesApiService.resetFilterQueryParams();

  input.value = '';
  hideClearBtn();

  choicesInstances.forEach(instance => {
    instance.setChoiceByValue('');
  });

  initMainGallery();
});

startTypeEffect(placeholder, input);
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
    initSimpleBar(instance.dropdown.element.firstChild);
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
    recipesApiService.updateParams('page', 1);
    initMainGallery();
  }, INPUT_DEBOUNCE_DELAY);

  input.addEventListener('input', onInput);
}

function initSelectsEventListener(selects) {
  selects.forEach(select => {
    select.addEventListener('change', () => {
      recipesApiService.updateParams(select.name, select.value);
      recipesApiService.updateParams('page', 1);
      initMainGallery();
    });
  });
}

function toggleClearBtn(inputValue) {
  inputValue.length === 0 ? hideClearBtn() : showClearBtn();
}

function showClearBtn() {
  inputClearBtn.classList.remove('is-hidden');
}

function hideClearBtn() {
  inputClearBtn.classList.add('is-hidden');
}

export { initFilters };
