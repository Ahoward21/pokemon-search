var charactersEl = document.getElementById('characters');
var publicKey = "7debcfe3-0404-4f51-b968-3b753a387c92";
var userFormEl = document.querySelector('#character-form');
var nameInputEl = document.querySelector('#character');
var characterContainerEl = document.querySelector('#character-container');
var pokemonSearchTerm = document.querySelector('#pokemon-search');
var pokemonSearch = "";


/// -------------
var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    pokemonSearch = nameInputEl.value.trim();

    if (pokemonSearch) {
        getPokemon(pokemonSearch);

        // clear old content
        characterContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        alert('Please enter pokemon');
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
                    displayPokemon(data, pokemon);
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
    //  console.log("this ran")
    //console.log(cardImg[i])

    // }
    console.log(cardImg[0])


}



// add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);
;