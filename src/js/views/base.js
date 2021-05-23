// base :  styles that other stuff being reused throughout across the project

// this contains all the elements that we select from the DOM in one central place 
export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector(".results__list"),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'), 
    recipe: document.querySelector('.recipe')
}  

// if I would ever change the loader name in CSS for some reason, I could change it here and it would work automatically in all the methods instead of hardcoding. This is good for reusability and maintainability.
export const elementStrings = {
    loader: 'loader'
}


// loader spinner
// reusability: le paso el parent y engancho el child a la seccion que llama el spinner: sea la lista de recetas o bien la receta en si (en secccion del medio)
export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}
