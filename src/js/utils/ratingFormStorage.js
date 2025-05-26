import { STORAGE_KEYS } from '../../constants/constants';
import { loadFromStorage, saveToStorage } from './localStorage';
import { STORAGE_KEYS } from '../../constants/constants';
const ratingEmailKey = STORAGE_KEYS.RATING_EMAIL_KEY;

function initRatingFormStorage(modalContent) {
  //   console.log(ratingEmailValue);
  let ratingEmailValue = loadFromStorage(ratingEmailKey) || null;
  const form = modalContent.querySelector('.rating-form');
  const input = form.querySelector('.rating__input');

  if (ratingEmailValue) {
    input.value = ratingEmailValue;
  }
  input.addEventListener('focusout', () => {
    if (input) {
      saveToStorage(ratingEmailKey, input.value.trim());
    }
  });
}

export { initRatingFormStorage };
