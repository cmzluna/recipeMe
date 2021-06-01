import { elements } from './base';
import { Fraction } from 'fractional';  // to convert units from 1.5 cups to 1 1/2 cups


/* In MVC, no other part cares about changing the DOM except for the view.
The view can attach user events but leaves event handling concerns to the controller.
The view’s prime directive is to change the state of what the user sees on the screen.
*/
const formatCount = count => {
    if(count) {
        // count = 2.5 -> 2 1/2
        // count = .5 -> 1/2
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));  // separates integer and decimal parts into new array 
        
        if(!dec) return count;

        if(int === 0 ) {
            const fr = new Fraction(count);
            return `${fr.numerator} / ${fr.denominator}`;
        } else {
            // ex : count = 2.5
            // I want to create a fraction of .5 because 2.5 complete would return a fraction of 5/2
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator} / ${fr.denominator}`;
        }
    }
    return '?';
}

const createIngredient = ingredient => `
                <li class="recipe__item">
                    <svg class="recipe__icon">
                        <use href="img/icons.svg#icon-check"></use>
                    </svg>
                    <div class="recipe__count">${formatCount(ingredient.count)}</div>
                    <div class="recipe__ingredient">
                        <span class="recipe__unit">${ingredient.unit}</span>
                        ${ingredient.ingredient}
                    </div>
                </li>
                `;

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

export const renderRecipe = recipe => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}

            </ul>

            <button class="btn-small recipe__btn">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
                <span>Directions</span>

                -+
                -+
                -
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', markup); 
}

export const updateServingsIngredients = recipe => {


}