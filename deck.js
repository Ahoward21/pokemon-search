//declare variables
var deckContainer = document.getElementById("trading-card-container");
var names = []

const pokemon = [
    {
        id: 1,
        imageUrl: "#"
    },
    {
        id: 2,
        imageUrl: "#"
    }
];

localStorage.getItem

for (let i = 0; i < pokemon.length; i++) {
    const pokemon = pokemon[index];
    const container = document.querySelector("trading-card-container")
    const image = document.createElement("img");
    image.src = pokemon.imageUrl
    container.appendChild(image)
    
}

var goBack = document.getElementById("go-back");

//access local storage to pull card img
var getCards = function () {
    var localValues = JSON.stringify(localStorage.getItem(names));
    console.log(names);
    
}



// Go back button
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

// clear deck button 
getCards();


