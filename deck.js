//declare variables
var deckContainer = document.getElementById("trading-card-container");
var names = []

const existingPokemon = JSON.parse(localStorage.getItem("pokemonDeck")) || [];

for (let i = 0; i < existingPokemon.length; i++) {
    const pokemon = existingPokemon[i];
    const container = document.querySelector("#trading-card-container");
    const image = document.createElement("img");
        image.setAttribute("display", "flex-wrap");
        //image.setAttribute("width", "25%");
    image.src = pokemon.imageUrl
    container.appendChild(image)
    
}


//access local storage to pull card img
var getCards = function () {
    var localValues = JSON.stringify(localStorage.getItem(names));
    console.log(names);
    
}



// Go back button
var goBack = document.getElementById("go-back");

goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

// clear deck button 
getCards();


