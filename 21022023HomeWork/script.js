//Q1

// function getPosts() {
//     return fetch('https://jsonplaceholder.typicode.com/posts')
//         .then((response)=>response.json())
// }
//
// function getUsers() {
//     return fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response)=>response.json())
// }
//
// function getComments() {
//     return fetch('https://jsonplaceholder.typicode.com/comments')
//         .then((response)=>response.json())
// }
//
// async function getData() {
//     let posts = await getPosts();
//     console.log(posts);
//     let users = await getUsers();
//     console.log(users);
//     let comments = await getComments();
//     console.log(comments);
// }
//
// getData();


//Q2

// function btcToUsd(){
//     return fetch('https://data.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
//         .then(response => response.json())
// }
//
// function usdToIls(){
//     return fetch('https://api.exchangerate.host/latest?base=USD&symbols=ILS')
//         .then(response => response.json())
// }
//
// async function getConversionRates() {
//         let btc = await btcToUsd();
//         let usd = await usdToIls();
//
//         let btcToIlsRate = btc.lastPrice * usd.rates.ILS;
//         console.log(`Bitcoin price in ILS: ${btcToIlsRate}`);
//
//         setTimeout(getConversionRates, 15000);
// }
//
// getConversionRates();


//Q3

async function getCocktailData() {
    let randomCocktail = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then((response) => response.json());
    let cocktail = randomCocktail.drinks[0];
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
        let ingredient = cocktail[`strIngredient${i}`];
        if (ingredient != null) {
            ingredients.push(ingredient);
        }
    }
    let ingredientData = [];
    for (let i = 0; i < ingredients.length; i++) {
        ingredientData.push(await IngredientInfo(ingredients[i]));
    }
    console.log(cocktail.strDrink, ingredients, ingredientData);
}

async function IngredientInfo(ingredientName) {
    let info = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`).then((response) => response.json());
    let ingredientInfo = info.ingredients[0];
    return {
        name: ingredientName,
        description: ingredientInfo.strDescription,
        type: ingredientInfo.strType
    };
}

getCocktailData();

