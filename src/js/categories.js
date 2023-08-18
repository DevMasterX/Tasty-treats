import { Notify } from "notiflix";
import { getCategories, getFilteredRecipes } from "./api"
import { clearFilters, createMurcupGallery } from "./filter";



const allCategoriesBtn = document.querySelector(".categories-btn");
const categoriesList = document.querySelector(".categories-list");
const buttons = [];


allCategoriesBtn.addEventListener("click", handlerAllCategoriesBtn);

categoriesList.addEventListener("click", handlerSpecificCategoriesBtn)

async function createCategoriesList() {
    try {
        const getCategoriesData = await getCategories();


        const marcupCategories = getCategoriesData.map((category) => {
            const { name, _id: idCategory } = category;

            return `  
        <li class="js-categories-item">
          <button class="js-categories-item-btn" type="submit" id="${idCategory}" value="${name}">${name}</button>
        </li>`;
        }).join("");

        categoriesList.innerHTML = marcupCategories;


    } catch (error) {
        console.error(error);
    }
}
createCategoriesList();

console.log(buttons);

async function handlerAllCategoriesBtn(evt) {
    evt.preventDefault();
    clearFilters()


    try {
        const recipes = await getFilteredRecipes();
        createMurcupGallery(recipes);

        if (!results.length) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        console.log(recipes);

    } catch (err) {
        Notify.failure(err.message);
    }
}

async function handlerSpecificCategoriesBtn(evt) {
    evt.preventDefault();
    const buttons = Array.from(document.querySelectorAll(".js-categories-item-btn"));

    // disactivBtn(buttons);
    buttons.forEach(btn => {
        btn.classList.remove("active");
    })
    currentBtn = evt.target;
    currentBtn.classList.add("active")

    const params = {
        "category": currentBtn.value
    }

    try {

        const recipes = await getFilteredRecipes(params);
        const { results } = recipes;
        gallery.innerHTML = createMurcupGallery(recipes);

        if (!results.length) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

    } catch (err) {
        Notify.failure(err.message);
    }
}


