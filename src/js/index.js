import Search from './models/Search';
// index.js is the Controller
//////////////// MVC model controller   https://www.sitepoint.com/mvc-design-pattern-javascript/

/* Global State of the APP:
- Search object
- Current recipe object
- Shopping list object
- Liked recipes

We have everything in one place easily accesible
*/

const state = {}

document.querySelector('.search').addEventListener('submit', e => {

});

const search = new Search('pizza');
console.log(search);
search.getResults();