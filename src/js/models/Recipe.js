import axios from 'axios'; 
import {key} from '../config';


/*
The Model cares about data. In client-side JavaScript, this means Ajax.
The model in this design pattern cares only about JSON or objects that come from the server.

The model, for example, must not care about HTML. The view must not care about Ajax. The controller must serve as the mediator without worrying about implementation details.

CARE ABOUT EMPHASIS!
feature concerns are not the same as functional concerns.

*/
export default class Recipe {
    // when creating a new recipe I pass in the ID
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            // Spoonacular API: in 'Get Recipe Information' DOC section
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=false`);
            console.log(res);
            this.title = res.data.title;
            this.vegan = res.data.vegan;
            this.vegetarian = res.data.vegetarian;
            this.image = res.data.image;
            this.summary = res.data.summary;
            this.instructions = res.data.instructions;
            this.ingredients = res.data.extendedIngredients;
            this.time = res.data.readyInMinutes;
            this.servings = res.data.servings;
        } catch {
            console.log(error);
            alert('Something went wrong!');
        }
    }
 
    // standarize quantities (this API spoonacular provides standarized info already! So no need to do this in fact)
    parseIngredients() {
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) uniform units
            let ingredient = el.original.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // 2) remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            // if there is a unit in the string and where it's located 
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if(unitIndex > -1) {
                // there is a unit (cup, oz, etc)
                // ex 4 1/2 cups, arrCount is [4,1/2]
                // 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);  // "4 1/2 cups" take the 2 first positions up to the unit 
                 
                let count;
                if(arrCount.length === 1) {
                    count = arrIng[0];
                } else {  // two or > units
                    count = eval(arrIng.slice(0, unitIndex).join('+')) // '4+1/2' eval will take this string as a Javascript code. 
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ') // all the array except the first elements
                }
            } else if (parseInt(arrIng[0], 10)){  
                // if it says '1 bread' // no unit but there is a number and text 
                objIng = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ') // all the array except the first element  
                }

            } else if(unitIndex === -1) {
                // no unit
                objIng = {
                    count: 1,  // there is no use of this because there is an amount key in the result
                    unit: '',
                    ingredient
                }
            } 

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {          // type: increase or decrease
        //servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
       

        //ingredients
        this.ingredients.forEach(ing => {
             ing.count *= (newServings / this.servings)
        })
        this.servings = newServings;
    
    } 
}



