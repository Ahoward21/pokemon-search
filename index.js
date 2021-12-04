var charactersEl = document.getElementById('characters');
var publicKey = "7debcfe3-0404-4f51-b968-3b753a387c92";
var userFormEl = document.querySelector('#character-form');
var nameInputEl = document.querySelector('#character');
var characterContainerEl = document.querySelector('#character-container');
var pokemonSearchTerm = document.querySelector('#pokemon-search');
var pokemonSearch = "";
var tradingCard = document.querySelector('#trading-card-container')
var pokemonId
var pokemonName 
/// -------------
var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();
    // get value from input element
    pokemonSearch = nameInputEl.value.trim();
    if (pokemonSearch) {
        tradingCard.innerHTML = "";
        getPokemon(pokemonSearch);
        // clear old content
        characterContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        // alert('Please enter pokemon'); 
    }
};
///// ---------------------------------------------------------------
var getPokemon = function (pokemon) {
    var pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemon + "/";
    fetch(pokeApiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log("Poke API called");
                response.json().then(function (data) {
                    console.log(data);
                    pokemonId = data.id
                    pokemonName = data.name
                    console.log(pokemonId, pokemonName)
                    displayPokemon(data, pokemon);
                    savedCard()
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to to pokemon');
        });
};
var displayPokemon = function (poke, searchTerm) {
    var pokemonName = document.createElement('span');
    pokemonName.textContent = (searchTerm)
    characterContainerEl.appendChild(pokemonName)
    for (var i = 0; i < poke.stats.length; i++) {
        var statsEl = document.createElement('div');
        statsEl.textContent = `${poke.stats[i].stat.name}: ${poke.stats[i].base_stat}`;
        characterContainerEl.appendChild(statsEl)
    }
    pokeCard()
}
//// -------------------------------------------------------------
var pokeCard = function (cards) {
    var cardApi = 'https://api.pokemontcg.io/v2/cards?q=name:' + pokemonSearch;
    fetch(cardApi)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log('card API called')
                console.log(response);
                response.json().then(function (card) {
                    console.log("this is the card", card);
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
    console.log("this ran")
    console.log("card img", cardImg[2].images.large)
    // }
    var pokeCardImg = document.createElement('img');
    pokeCardImg.src = (cardImg[2].images.large);
    tradingCard.appendChild(pokeCardImg);
    console.log(cardImg[2])
    /// create a href for link to image
    ///
}

var savedCard = function () {
    localStorage.setItem(pokemonName, pokemonId);
}

 
// add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);