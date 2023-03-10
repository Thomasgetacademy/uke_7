/* --------------------------------------------------- Model ------------------------------------------------------------*/

/* Id's */
const mainDiv = document.getElementById('app');
const catchButton = document.getElementsByClassName("exploreButton2");
const pokemon = document.getElementsByClassName("explorePokemon");
const myBar = document.getElementsByClassName("myBar"); /* Pokemon hp bar in grass View */



/* Global Variables */
const pokemonArray = [
    {
        name: 'Bulbasaur',
        attack: 'Vine Whip'
    },
    {
        name: 'Ivysaur',
        attack: 'Razor Leaf'
    },
    {
        name: 'Chikorita',
        attack: 'Razor Leaf'
    },
    {
        name: 'Treecko',
        attack: 'Bullet Seed'
    },
    {
        name: 'Turtwig',
        attack: 'Razor Leaf'
    },
    {
        name: 'Snivy',
        attack: 'Vine Whip'
    },
    {
        name: 'Chespin',
        attack: 'Seed Bomb'
    },
    {
        name: 'Rowlet',
        attack: 'Leafage'
    },
    {
        name: 'Bellsprout',
        attack: 'Vine Whip'
    },
    {
        name: 'Sunflora',
        attack: 'Razor Leaf'
    }
];

let catchedPokemons = [{
    name: 'Bulbasaur',
    attack: 'Vine Whip'
},
];


let trainerArray = ['Brock', 'Janine', 'Morty', 'Surge'];
let randomIndex;
let html; /* Created here to be able to access it in multiple views */
let hpBarIndex = 0;
let width = 100;
let playTrainerAnimation = false;
let playerHP = 100;
let trainerHP = 100;
let trainerChosenPokemon = '';

// grassView();
// mainView();
trainerView();

/* --------------------------------------------------- View -------------------------------------------------------------*/

// This is the main view and shows the two options you got, either go to the grassview to catch pokemons or go to the trainerView to battle a trainer.
function mainView() {
    html = /* HTML */`
        <div class='mainDiv'>
            <h1>Welcome to Pokemon Scuffed!</h1>
            <h6>Scuffed - Of poor standards or low quality, Referring to something broken / not working as intended</h6>
            <img class='mainImg blueSky' src='images/grass.png' onclick='grassView()'>
            <h2 class='mainDiv'><----- Explore | Fight Trainer -----></h1>
            <img class='mainImg' src='images/trainerImg/pokeTrainer.png' onclick='trainerView()'>
        </div>
    `;
    mainDiv.innerHTML = html;
}

/* This is the main view for the capture of pokemons */
function grassView() {
    let countOfPokemonsLeft = pokemonArray.length - catchedPokemons.length;
    if (countOfPokemonsLeft <= 0) {
        mainView();
    } else if (randomEvent() > 0.2) { /* 20% chance to get a pokemon encounter or a text based encounter. should say 0.2 */
        width = 20;
        randomIndex = randomPokemonIndex(randomIndex);
        let pokeName = pokemonArray[randomIndex].name;
        hpBarIndex = 0;
        html = /* HTML */`

            <div class="myProgress">
                <div class="myBar">100%</div>
            </div>

            <h2>${pokemonArray[randomIndex].name}</h2>
            <img class="explorePokemon" src='images/pokemonImg/${pokeName}.png' alt="${pokeName} img"> <br>
    
            <button class="exploreButton1" onclick="pokemonHpBar(randomIndex)">Attack</button>
            <button class="exploreButton2" style="display: none;" onclick="style='display: none', catchPokemon(${randomIndex})">Catch!</button>
            <button class="exploreButton3" onclick="mainView()">Go back</button>
        `;
    } else {
        html = /* HTML */`
            <h2 class="exploreTxt">${textArray[randomText()]}<h2> <br>
            <button class="exploreButton3" onclick="mainView()">Go back</button>
        `;
    }
    mainDiv.innerHTML = html;

}
/* This view shows after you press the catch button on pokemon, it will either show a sucessfull catch og that it escaped */
function pokemonEscapedOrCapturedView(pokeIndex, escapedOrCaptured) {
    if (escapedOrCaptured === 1) { /* 1 === Escaped */

        mainDiv.innerHTML = /* HTML */`
        <h1>${pokemonArray[pokeIndex].name} escaped!</h1>
        <h2>You might need to lower the pokemons HP more before trying to catch!</h2>
        <button class="exploreButton3" onclick="mainView()">Go back</button>
    `;
    } else if (catchedPokemons.includes(pokemonArray[pokeIndex].name)) {

        mainDiv.innerHTML = /* HTML */`
            <h1>${pokemonArray[pokeIndex].name} escaped!</h1>
            <h2>You might have caught this pokemon already, they don't take to tindly to their own kind.</h2>
            <button class="exploreButton3" onclick="mainView()">Go back</button>
        `;
    } else {
        catchedPokemons.push(pokemonArray[pokeIndex].name);
        // console.log(catchedPokemons);
        let countOfPokemonsLeft = pokemonArray.length - catchedPokemons.length;

        html = /* HTML */`
        <h1>You captured ${pokemonArray[pokeIndex].name}!</h1>
        <button class="exploreButton3" onclick="mainView()">Go back</button>`;
        if (catchedPokemons.length === 1) {
            html += '<h2>You caught your first pokemon! You can now challenge a trainer.</h2>';
        } else {
            html += `<h2>You caught another pokemon! <br> You got ${countOfPokemonsLeft} different left to catch!</h2>`;
        }
        mainDiv.innerHTML = html;
    }
}

function pokemonFaintedView(pokemonIndex) {
    myBar[0].style.backgroundColor = "red";
    mainDiv.innerHTML = /* HTML */`
        <div class="myProgress">
            <div class="myBar" style="width: 100; background-color: red;">0%</div>
        </div>
        <h1>${pokemonArray[pokemonIndex.name]} Fainted!</h1>
        <h2>Go for another exploration in the grass to find another pokemon!</h2>
        <button class="exploreButton3" onclick=" mainView()">Go back</button>
        `;
}

/* * Trainer Battle */

function noPokemonsView() {
    mainDiv.innerHTML = /* HTML */`
        <h1>You got no pokemons. 😭</h1> <br>
        <h2>Go catch one and try again! 😁</h2>
        <button class="exploreButton3" onclick="mainView()">Go back</button>
     `;
}

/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Xurrent>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

function trainerView() {
    let playerChoice = true;

    trainerChosenPokemon === '' ? trainerChosenPokemon = choosePokemon() : '';
    catchedPokemons.length === 0 ? noPokemonsView() : playerChosenPokemon = choosePokemon(playerChoice);

    /* Animation view */
    if (playTrainerAnimation && catchedPokemons.length != 0) {
        let html = /* HTML */`
        <div class='pokemonBattleDiv'>
            <div class='trainerDiv'>
                <img class='trainerImg' src='images/trainerImg/${trainerChosenPokemon.name}.png'>
            </div>
            <img class='trainerPokeball'src='images/pokeball.png'>

            <img class='playerImg' src='images/trainerImg/Player.png'>
            <img class='playerPokeball' src='images/pokeball.png'>
        </div>
        `;
        mainDiv.innerHTML = html;
        playTrainerAnimation = false;
        setTimeout(trainerView, 6000);
    } else { /* Battle View */

        let html = /* HTML */`
        <div class='pokemonBattleDiv'>
            <div class='trainerPokemon'>

                <div class="myProgress"> 
                    <div id="trainerBar">${trainerHP}%</div>
                </div>

                <img src='images/pokemonImg/${trainerChosenPokemon.name}.png'>
            </div>
            
            <div class='playerPokemon'>

                <div class="myProgress"> 
                    <div id="playerBar">${playerHP}%</div>
                </div>

                <img  src='images/pokemonImg/${playerChosenPokemon.name}.png'>
                <button style='font-size: 30px;' onclick=battleDamage()>Attack!</button>
            </div>
        </div>
        `;
        mainDiv.innerHTML = html;
    }
}

function battleViewWon(whoWon) {
    if (whoWon === 'trainer') {
        html = /* HTML */`
        <div class='pokemonBattleDiv'>
            <div class='trainerPokemon'>
                <img src='images/pokemonImg/${test}.png'>
            </div>

            <div class='playerPokemon'>
                <img  src='images/pokemonImg/${playerChosenPokemon.name}.png'>
        `
    }
    mainDiv.innerHTML = html;
}

/* --------------------------------------------------- CONTROLLER -------------------------------------------------------*/

function battleDamage() {
    if (hpBarIndex === 0) {
        let trainerBar = document.getElementById("trainerBar"); /* Trainer hp bar in Battle View */
        const playerBar = document.getElementById("playerBar"); /* Player pokemon hp bar in Battle view */

        let trainerBarStyle = trainerBar.style;
        let playerBarStyle = playerBar.style;

        let trainerDamage = randomDmg(); /* Amount of damage done is a random number between 1 and 20 */
        let playerDamage = randomDmg(); /* Amount of damage done is a random number between 1 and 20 */

        let newTrainerWidth = trainerHP - trainerDamage; /* The "width" the progress bar should stop at */
        let newPlayerWidth = playerHP - playerDamage; /* The "width" the progress bar should stop at */

        let trainerId = setInterval(frame, 10);
        function frame() {
            if (trainerHP <= newTrainerWidth) { /* Change width number to where the progress should stop */
                clearInterval(trainerId);
            } else {
                trainerHP--;
                trainerBarStyle.width = trainerHP + "%";
                
                /* If width(progressbar) is at 0, then the program will pokemonFaintedView function will be called */
                trainerHP <= 0 ? (hpBarIndex = 1, battleViewWon('trainer')) : trainerBar.innerHTML = trainerHP + "%";
                if (trainerHP <= 0) {
                } else if (trainerHP < 30) {
                    trainerBarStyle.backgroundColor = "red";
                } else if (trainerHP < 60) {
                    trainerBarStyle.backgroundColor = "yellow";
                }
            }
        }
    }
}

function choosePokemon(playerChoice) { /* Should be a view for the user to choose what pokemon the user wants to bring into battle, and give the opponent a random pokemon */
    if (playerChoice) {
        return catchedPokemons[0];
    } else {
        randomIndex = Math.floor(Math.random() * pokemonArray.length);
        console.log(pokemonArray[randomIndex]);
        return pokemonArray[randomIndex];
    }

}

function randomEvent() { /* Returns a number between 0 and 1, this chooses what event in the grassView is going to happen */
    return Math.random();
}

function randomText() { /* chooses a random txt from the textArray.js file */
    return Math.floor(Math.random() * (textArray.length - 0));
}

function randomPokemonIndex(randomIndex) { /* Makes a random number between 0 and 9, the same number can't be generated twise */
    let randomNum = Math.floor(Math.random() * pokemonArray.length);
    while (randomNum == randomIndex) {
        randomNum = Math.floor(Math.random() * pokemonArray.length);
    }
    return randomNum;
}

function pokemonHpBar(pokemonIndex) {
    if (hpBarIndex === 0) {

        let damage = randomDmg(); /* Amount of damage done is a random number between 1 and 20 */
        let newWidth = width - damage; /* The "width" the progress bar should stop at */

        let id = setInterval(frame, 10);
        function frame() {
            if (width <= newWidth) { /* Change width number to where the progress should stop */
                clearInterval(id);
            } else {
                width--;
                myBar[0].style.width = width + "%";

                /* If width(progressbar) is at 0, then the program will pokemonFaintedView function will be called */
                width <= 0 ? (pokemonFainted = true, pokemonFaintedView(pokemonIndex)) : myBar[0].innerHTML = width + "%";
                if (width <= 0) {
                } else if (width < 30) {
                    myBar[0].style.backgroundColor = "red";
                    catchButton[0].style.display = 'block';
                } else if (width < 60) {
                    myBar[0].style.backgroundColor = "yellow";
                }
            }
        }
    }
}

function randomDmg() {
    return Math.floor(Math.random() * 20 + 1);
}

function catchPokemon(pokeIndex) {

    pokemon[0].src = "images/pokeball.png";
    pokemon[0].classList.add("pokeball");

    if (width > 15) { /* If width is over 15 when trying to catch the pokemon it will escape and the escape view will be called  */
        setTimeout(pokemonEscapedOrCapturedView, 4000, pokeIndex, 1); /* 1 === Escaped */
    } else {
        setTimeout(pokemonEscapedOrCapturedView, 4000, pokeIndex);
    }
}



// TODO: create a "efficiencyTxt" variable and show how much damage has been dealt (Attack was Super effective!, Attack was not effective.)
// TODO: A way to see all your captures pokemons - pokedex; (is another task in Modul 2) // Need a list over caught pokemons, this could be shown on all pages in grassView and the views under grass view.
// TODO: When you click catch on a pokemon, the other buttons should dissapear.
// TODO: When you got no pokemons left to catch you cant click the grass anymore from the mainView, but there is no indicator that tells you why you cant click it.
// TODO:

// Ideas
// pokeballs?
