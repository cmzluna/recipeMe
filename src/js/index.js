import Search from './models/Search';
import * as searchView from './views/searchView'; // imports all of the functions as an object searchView
import { elements } from './views/base';

// index.js is the Controller
//////////////// MVC model controller   https://www.sitepoint.com/mvc-design-pattern-javascript/

const state = {}
/* Global State of the APP ( We have everything in one easily accesible place ) :
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/ 

const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();
    console.log(query);

    if(query) {
    // 2) new search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results

    // 4) search for recipes
    await state.search.getResults();

    // 5) render results on UI
     console.log(state.search.result);
    searchView.renderResults(state.search.result);

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // to prevent that page reloads when clicked
    controlSearch();
});

 