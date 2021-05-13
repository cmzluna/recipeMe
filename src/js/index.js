import axios from 'axios'

// axios library to make AJAX requests
async function getResults(query) {
    const key = '0169652c09574bf5bd9bd3d9101aefec';
/*
    try {
        const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&includeNutrition=true&query=${query}&number=50`);
        // this is going to return a promise
        const recipes = res.data.results;
        console.log(recipes);
    } catch(error) {
        alert('error');
    }
    */
}

getResults('pasta');

// API KEY
// 0169652c09574bf5bd9bd3d9101aefec 
// https://api.spoonacular.com/recipes/complexSearch

