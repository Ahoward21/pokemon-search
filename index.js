var charactersEl = document.getElementById('characters');
var publicKey = "7debcfe3-0404-4f51-b968-3b753a387c92";
var userFormEl = document.querySelector('#character-form');
var nameInputEl = document.querySelector('#character');
var characterContainerEl = document.querySelector('#character-container');
var pokemonSearchTerm = document.querySelector('#pokemon-search');
var pokemonSearch = "";
var tradingCard = document.querySelector('#trading-card-container');
var pokemonId
var pokemonName
var gameCard
var saveButton = document.querySelector('#save-card');
var viewDeck = document.querySelector('#view-saved-cards');

var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();
    // get value from input element
    pokemonSearch = nameInputEl.value.trim();
    if (pokemonSearch) {
        tradingCard.innerHTML = "";
        getPokemon(pokemonSearch.toLowerCase());
        // clear old content
        characterContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        var modalBtn = $("#modalBtn");
        modalBtn.trigger("click");
        document.querySelector("#modalMessage").textContent = "Please Fill in the Search Box!";
}};

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
                var modalBtn = $("#modalBtn");
                modalBtn.trigger("click");
                document.querySelector("#modalMessage").textContent = "Please Enter the Correct Spelling!";
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to pokemon');
        });
};
var displayPokemon = function (poke, searchTerm) {
    var pokemonName = document.createElement('span');
    pokemonName.textContent = (searchTerm.toUpperCase());
    characterContainerEl.appendChild(pokemonName)
    for (var i = 0; i < poke.stats.length; i++) {
        var statsEl = document.createElement('div');
        statsEl.textContent = `${poke.stats[i].stat.name}: ${poke.stats[i].base_stat}`;
        characterContainerEl.appendChild(statsEl)
    }
    pokeCard()
}

// This is the fetch call to the pokemon trading card game API
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

let pokemonInfo;

var displayCard = function (cardImg) {
    
    console.log("card img", cardImg[0].images.large)
    
    var pokeCardImg = document.createElement('img');
        pokeCardImg.setAttribute("id", "card-img");
        pokeCardImg.setAttribute("class", "shadow-lg");
    pokeCardImg.src = (cardImg[0].images.large);
    tradingCard.appendChild(pokeCardImg);

    pokemonInfo = {
        id: cardImg[0].id,
        name: cardImg[0].name,
        imageUrl: cardImg[0].images.large
    }

    console.log(cardImg[0])
}

var saveButton = function (pokemonInfo) {
    const existingPokemon = JSON.parse(localStorage.getItem("pokemonDeck")) || [];

    // make sure that we don't add any duplicate cards to the page where we view all saved cards
    const existingCard = existingPokemon.find(currentPokemon => currentPokemon.id === pokemonInfo.id);
    if (existingCard) { return;}
    existingPokemon.push(pokemonInfo);
    localStorage.setItem("pokemonDeck", JSON.stringify(existingPokemon));

}

// view deck button
viewDeck.addEventListener("click", function () {
    window.location.replace("./deck.html");
});

 
// add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);

document.getElementById("save-card").addEventListener("click", function(){saveButton(pokemonInfo)});
