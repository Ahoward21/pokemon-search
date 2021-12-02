var charactersEl = document.getElementById('characters');
var publicKey = "e140afae-ca63-4ba4-b4ef-3ef664f9e105";
var userFormEl = document.querySelector('#character-form');
var nameInputEl = document.querySelector('#character');
var characterContainerEl = document.querySelector('#character-container');
var pokemonSearchTerm = document.querySelector('#pokemon-search');

/// -------------
var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var pokemonSearch = nameInputEl.value.trim();

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

var displayPokemon = function(poke, searchTerm) {
    for (var i = 0; i < poke.stats.length; i++) {
        var statsEl = document.createElement('div')
        statsEl.textContent = `${poke.stats[i].stat.name}: ${poke.stats[i].base_stat}`
        
        

        document.getElementById('character-container').appendChild(statsEl)
        

    } 
}


  //// -------------------------------------------------------------

var pokeCard = function (cards) {
    var cardApi = 'https://api.pokemontcg.io/v2/cards';

fetch(cardApi)
    .then(function (response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayPokemon(data, user);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to GitHub');
    });
};

// add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);