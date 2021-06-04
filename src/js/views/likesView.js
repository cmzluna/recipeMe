import { elements } from "./base";

export const toggleLikeButton = (isLiked) => {
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${iconString}`);
};

export const renderLike = (currentID, title, img) => {
  const markup = `
        <a class="likes__link" href="#${currentID}">
            <figure class="likes__fig">
                <img src="${img}" alt="Test">
            </figure>
            <div class="likes__data">
            <h4 class="likes__name">${title} ...</h4>
                <p class="likes__author">The Pioneer Woman</p>
            </div>
        </a>
        `;

  elements.likes.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[href="#${id}"]`); // get the element with specific ID from data attribute
  if (item) item.parentElement.removeChild(item);
};
