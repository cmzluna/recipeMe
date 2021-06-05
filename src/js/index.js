import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView"; // imports all of the functions as an object searchView
import * as likesView from "./views/likesView";
import * as listView from "./views/listView";

import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";

//////////////// MVC model controller   https://www.sitepoint.com/mvc-design-pattern-javascript/
/* The Controller handles events and is the mediator between the view and model.
 we have in the controller all the eventListeners
The controller is the entry point for events and the only mediator between the view and data.
*/
const state = {};
window.state = state;
/* Global State of the APP ( We save everything in one easily accesible place ) :
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/

/* ///////////// SEARCH CONTROLLER
 */ /////////////////////////////////
const controlSearch = async () => {
  // 1) get query from view
  const query = searchView.getInput();
  console.log("Results of the query: " + query);

  if (query) {
    // 2) new search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults(); // clear results from the search so they don't add to the previous ones
    // load the spinner
    renderLoader(elements.searchRes);

    // 4) search for recipes
    await state.search.getResults();

    // 5) render results on UI
    clearLoader();
    console.log(state.search.result);
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // to prevent that page reloads when clicked
  controlSearch();
});

//TESTING PORPUSES
// window.addEventListener('load', e => {
//     e.preventDefault(); // to prevent that page reloads when clicked
//     controlSearch();
// });

// because the pagination buttons are not present when the page is first loaded, I have to use event delegation to propagate and see which element (target) fires the call (the click event)
// I select the parent which is 'results__pages'
// https://javascript.info/event-delegation
elements.searchResPages.addEventListener("click", (e) => {
  // Because clicking in the elements inside the button will trigger different responses (depending on zone of click I have to find the parent element of the button and use closest method)
  //The method elem.closest(selector) returns the nearest ancestor that matches the selector.
  const btn = e.target.closest(".btn-inline");

  console.log(btn); //to see where the event actually happened and handle it.
  if (btn) {
    // read the gotopage (from data attribute)
    const goToPage = parseInt(btn.dataset.goto, 10); // I then convert to number in base 10
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// when clicked on each recipe
elements.searchResList.addEventListener("click", (e) => {
  // same as previous event listener
  const btn = e.target.closest(".results__link");
  let id = btn.getAttribute("href");
  id = id.replace("#", "");
  //

  console.log(btn);
  //console.log(' attribute is ' + attr);
  if (btn) {
    // console.log('recipe clicked');
    controlRecipe(id);
  }
});

/* ///////////// RECIPE CONTROLLER
 */ /////////////////////////////////
// const r = new Recipe(647124);
// r.getRecipe();

const controlRecipe = async (id) => {
  //get ID from URL

  //const id = window.location.hash.replace('#', '');
  console.log("ID of recipe to fetch next is: " + id);

  if (id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    // highlight selected recipe
    console.log(id);
    searchView.highlightSelected(id);

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe and parse Ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // render recipe
      clearLoader();

      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      console.log(err);
      alert("Error processing recipe!");
    }
  }
};

/* ///////////// LIST CONTROLLER
 */ /////////////////////////////////
const controlList = () => {
  // create a new list if there is none yet
  if (!state.list) state.list = new List();

  // add each ingredient to the List and UI
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

// handle delete and update list items events
elements.shopping.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;
  // handle delete button
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    //delete from state
    state.list.deleteItem(id);
    //delete from UI
    listView.deleteItem(id);
  } else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value, 10); // I need to get the value of the elemnt that's been clicked
    state.list.updateCount(id, val);
  }
});

/* ///////////// LIKE CONTROLLER
 */ //////////////////////////////

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  if (!state.likes.isLiked(currentID)) {
    // recipe is not liked, I have to add it to the underlying model and UI
    // add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.image
    );
    // toggle like button
    likesView.toggleLikeButton(true);

    // add like to UI list
    likesView.renderLike(newLike);
  } else {
    // recipe was already liked
    // remove like from the state
    state.likes.deleteLike(currentID);

    // toggle like button

    // remove like from UI list
    console.log(state.likes);
    likesView.deleteItem(currentID);
    likesView.toggleLikeButton(false);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// on page load
window.addEventListener("load", (e) => {
  state.likes = new Likes();

  // Restore liked recipes on page load
  state.likes.readStorage();
  // toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // render existing likes
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

elements.recipe.addEventListener("click", (e) => {
  // this handles **ALL** the events that come from the Recipe
  // we have to select different elements
  // we use matches method instead of closest
  // because we must test what was clicked and then act accordingly.

  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // by using this line , it will match the 'svg' or 'use' element as well   -- any child elements
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});

window.l = new List();
