import { elements } from './base';

export const renderItem = item => {
    const markup = `
                <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    `;

    // data-itemid=${item.id}   is used for later select the element in order to be able to delete it
    // shopping__count-value    to select the input to update later on
    elements.shopping.insertAdjacentHTML('beforeend', markup);
}

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`); // get the element with specific ID from data attribute
    if (item) item.parentElement.removeChild(item);
}