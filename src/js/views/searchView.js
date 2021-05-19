import { elements } from './base';

export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {

    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.id}">
            <figure class="results__fig">
               <img src="${recipe.image}" alt="${recipe.title}">
             </figure>
             <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                 <p class="results__author">The Pioneer Woman</p>
            </div>
        </a>
    </li> 
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);  // inserts in exact position one after the previous 

}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe); // is the same as writing:    el => renderRecipe(el)
}