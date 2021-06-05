import { elements } from "./base";

export const toggleLikeButton = (isLiked) => {
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${iconString}`);
};

export const renderLike = (like) => {
  const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="Test">
                </figure>
                <div class="likes__data">
                <h4 class="likes__name">${like.title} ...</h4>
                    <p class="likes__author">The Pioneer Woman</p>
                </div>
            </a>
        </li>
        `;

  elements.likes.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  const item = document.querySelector(
    `.likes__link[href="#${id}"]`
  ).parentElement; // get the element with specific ID from data attribute
  if (item) item.parentElement.removeChild(item);
};

export const toggleLikeMenu = (numLikes) => {
  elements.likesMenu.style.visibility = numLikes === 0 ? "hidden" : "visible";
};
