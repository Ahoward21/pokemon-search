//declare variables
var deckContainer = document.getElementById("trading-card-container");
var names = []

var goBack = document.getElementById("go-back");

//access local storage to pull card img
var getCards = function () {
    var localValues = JSON.stringify(localStorage.getItem())
    console.log();
    
}



// Go back button
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

// clear deck button 
getCards();
pokeCard()

