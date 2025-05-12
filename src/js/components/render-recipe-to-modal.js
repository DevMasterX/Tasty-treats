import { fetchRecipeInfo } from '../services/recipe-info';
import { hideLoader, showLoader } from './loader';

async function renderRecipeToModal(btn, modalContent) {
  const loaderContainer = btn.closest('.gallery-item');
  showLoader(loaderContainer, loaderContainer);

  try {
    const recipeId = btn.dataset.id;
    const recipeInfo = await fetchRecipeInfo(recipeId);

    const markup = createRecipeInfoMarkup(recipeInfo);

    modalContent.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.error('Error rendering recipe iformation to madal', error);
    throw error;
  } finally {
    hideLoader(loaderContainer, loaderContainer);
  }
}

function createRecipeInfoMarkup({
  title,
  instructions,
  time,
  rating,
  ingredients,
  tags,
  youtube,
}) {
  // const tagsList = tags
  //   .map(tag => `<li class="tags-list-item">#${tag}</li>`)
  //   .join('');
  let tagsList;
  tags.length === 0
    ? (tagsList = '')
    : (tagsList = tags
        .map(tag => `<li class="tags-list-item">#${tag}</li>`)
        .join(''));

  const ingredientslist = ingredients
    .map(
      ({ name, measure }) => `
  <li class="ingredients-list__item">
  <p class="ingredients-list__item-name">${name}</p>
 <p class="ingredients-list__item-measure">${measure}</p>
  </li>
  `
    )
    .join('');

  if (window.innerWidth < 768) {
    return `
    <div class="recipe-info-wrapper">
    <div class="video-container">
    <iframe
    src="${getYouTubeEmbedUrl(youtube)}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    ></iframe>
    </div>
    
    <h3 class="recipe-info-title">${title}</h3>



  <div class="recipe-info__rating-time-wrapper">
  
  <div class="recipe-info__rating-wrapper">
  <p class="recipe-info-rating-number">${rating}</p>
  
  </div>
  
  
  <p class="recipe-info-time">${time} min</p>
  </div>


  
  <ul class="ingredients-list">
  ${ingredientslist}
  </ul>

  <ul class="tags-list">
  ${tagsList}
  </ul>
  
  <p class="instructions-text">${instructions}</p>

  <div class="recipe-info__btn-wrapper"> 
  <button class="add-to-favorite-btn">Add to favorite</button>
  <button class="give-rating-btn">Give a rating</button>
  </div>
 
  </div>
    `;
  }

  return `
  <div class="recipe-info-wrapper">
  <h3 class="recipe-info-title">${title}</h3>
<div class="video-container">
  <iframe
    src="${getYouTubeEmbedUrl(youtube)}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

<div class="tags-rating-time-wrapper">
<ul class="tags-list">
${tagsList}
</ul>

<div class="recipe-info__rating-time-wrapper">
<p class="recipe-info-rating-number">${rating}</p>

<p class="recipe-info-time">${time} min</p>
</div>

</div>

<ul class="ingredients-list">
${ingredientslist}
</ul>

<p class="instructions-text">${instructions}</p>

<div class="recipe-info__btn-wrapper"> 
  <button class="add-to-favorite-btn">Add to favorite</button>
  <button class="give-rating-btn">Give a rating</button>
  </div>
</div>
  `;
}

function getYouTubeEmbedUrl(url) {
  try {
    const videoId = new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    console.error('Invalid YouTube URL:', url);
    return '';
  }
}

export { renderRecipeToModal };
