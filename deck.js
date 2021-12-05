//declare variables

//access local storage to pull card img
var pokeCard = function (cards) {
    var cardApi = 'https://api.pokemontcg.io/v2/cards?q=name:' + pokemonSearch;
    fetch(cardApi)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log('card API called')
                console.log(response);
                response.json().then(function (card) {
                    pokemonId = card.data[0].id
                    pokemonName = card.data[0].name
                    console.log(pokemonId, pokemonName)
                    console.log("this is the card", card.data[0].id);
                    return displayCard(card.data);
                });
            } else {
                console.log('Else triggered: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to bring up pokemon card');

        });
};
var displayCard = function (cardImg) {
    //for (var i = 0; i < cardImg.length; i++) {
    console.log("card img", cardImg[0].images.large)
    // }
    var pokeCardImg = document.createElement('img');
    pokeCardImg.src = (cardImg[0].images.large);
    tradingCard.appendChild(pokeCardImg);
    console.log(cardImg[0]);
    saveButton();
}

// go back button

// clear deck button 
pokeCard();
