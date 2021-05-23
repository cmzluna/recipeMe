import { elements } from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}
 

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}
 
const renderRecipe = recipe => {
    const markup = `
    <li> 
        <a class="results__link results__link--active" href="#${recipe.id}">
            <figure class="results__fig">
               <img src="${recipe.image}" alt="${recipe.title}">
             </figure>
             <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                 <p class="results__author">(Author blank)</p>
            </div>
        </a>
    </li> 
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);  // inserts in exact position one after the previous 
}

// type: prev or next
// data-goto is a DATA ATTRIBUTE in html5
// I'll use it later in the eventHandlers to move to the page requested
// Instead of reading from the DOM text embedded Ex: 'Page 2', I can now read the data from the data property. Much easier! 
const createButton = (page, type) => `   
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1 }>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right' }"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1 }</span>
        </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if(page === 1 && pages > 1 ) {
        // only button to go to next pages
        button = createButton(page,'next');
    } else if (page < pages) {
        // render both buttons
        button = `
            ${createButton(page,'prev')}
            ${createButton(page,'next')}
        `;

    } else if (page === pages) {
        // only button to go to prev page
        button = createButton(page,'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
     
}

export const renderResults = (recipes, page = 2, resPerPage = 10) => {
    const start =  (page - 1) * resPerPage;    // start of results
    const end = page * resPerPage;
 
    // because slice's end does not include the end itself setting resPerPage = 10 it will copy up to index 9
    recipes.slice(start, end).forEach(renderRecipe); // is the same as writing:    el => renderRecipe(el)

    // render pagination buttons
    let numResults = recipes.length - 1;   // check if length is correct!
    renderButtons(page, numResults, resPerPage);
};