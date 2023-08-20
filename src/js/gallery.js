class Gallery {
    constructor(galleryElement) {
        this.galleryElement = galleryElement;
    }

    static createMarkupCard({ results }) {
        const markupCard = results.map(({ description, preview, rating, title }) => {
            return ` <li class="filter-gallery-item">
            <img class="filter-gallery-item-photo" src="${preview}" alt="${title}" width="250" height="287">
            <div class="filter-gallery-item-content">
                <button type="button" class="filter-gallery-item-favorit-btn">
                    <svg class="filter-gallery-item-favorit-btn-icon">
                        <use href="./images/forcard.svg#icon-heart" width ="22" height="22"></use>
                    </svg>
                </button>
                <h3 class="filter-gallery-item-tittle" >${title}</h3>
                <p class="filter-gallery-item-description">${description}</p>
                <div class="filter-gallery-item-bottom">
                <div class="filter-gallery-item-rating-wrap">
                    <p class="filter-gallery-item-rating-value">${rating}</p>
                    <div class="filter-gallery-item-rating-icons">&#9734; &#9734; &#9734; &#9734; &#9734;</div>
                </div>
                <button class="filter-gallery-item-btn" type="button">See recipe</button>
            </div>
            </div>
        </li>`
        }).join("");

        return markupCard;
    }


    static appendMarkupToGallery(galleryElement, marcup) {
        galleryElement.innerHTML = marcup;
    }

    static appendMarkupBeforeGallery(galleryElement, marcup) {
        galleryElement.insertAdjacentHTML("beforebegin", marcup);
    }

}


//ЯК ВИКОРИСТУВАВАТИ
// const results = твої результати з сервера

//  Створи розмітку карточок за допомогою  createMarkupCard
// const marcup = Gallery.createMarkupCard({ results });

//  Додай розмітку до галереї за допомогою appendMarkupToGallery
// Gallery.appendMarkupBeforeGallery(yourGalleryElement, marcup);


export default Gallery;