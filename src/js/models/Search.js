import axios from 'axios'; 
import {key} from '../config';
// axios library to make AJAX requests
// Axios works on all browsers unlike Fetch()
// it automatically returns Jason Object 
// with Fetch ()  we had to wait for the data and then convert to JASON 
// With axios its not neeeded 

// Note: models are written UpperCase
 

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {   // it's an async method
        

        try {
            const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&includeNutrition=true&query=${this.query}&number=50`);
            // this is going to return a promise
            this.result = res.data.results;  // store the search in object
            
        } catch (error) {
            alert('error');
        }
    }
}



//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises