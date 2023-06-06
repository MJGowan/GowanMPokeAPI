import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from "./localStorage.js";

let pokeNameNum = document.getElementById("pokeNameNum");
let typeOne = document.getElementById("typeOne");
let typeTwo = document.getElementById("typeTwo");
let enterLocation = document.getElementById("location");
let evolutionOne = document.getElementById("evolutionOne");
let evolutionTwo = document.getElementById("evolutionTwo");
let ab1 = document.getElementById("ab1");
let ab2 = document.getElementById("ab2");
let ab3 = document.getElementById("ab3");
let moveList = document.getElementById("moveList");
let rndBtn = document.getElementById("rndBtn");
let input = document.getElementById("input");
let submitBtn = document.getElementById("submitBtn");
let pokeSprite = document.getElementById("pokeSprite");
let shinySprite = document.getElementById("shinySprite");
// let addBtn = document.getElementById("addBtn");
// let favHere = document.getElementById("favHere");

let pokeApi;

rndBtn.addEventListener("click", function () {
    RandomPokemon();
})

submitBtn.addEventListener("click", function () {
    GetPokemon();
})

function RandomPokemon() {
    let rnd = parseInt(Math.random() * 649);
    if(rnd === 0){
        rnd = parseInt(Math.random() * 649);
    }
    input.value = rnd;
    GetPokemon();
}

async function GetPokemon() {
    pokeApi = await fetch("https://pokeapi.co/api/v2/pokemon/" + input.value);
    let data = await pokeApi.json();

    //# and name
    pokeNameNum.innerHTML = "#" + data.id + " " + data.name;

    //type 1
    typeOne.innerHTML = data.types[0].type.name;

    //type 2
    if ((data.types).length > 1) {
        typeTwo.innerHTML = data.types[1].type.name;
    } else {
        typeTwo.innerHTML = "N/A"
    }

    //location
    let areaApi = await fetch("https://pokeapi.co/api/v2/pokemon/" + input.value + "/encounters")
    let areaData = await areaApi.json();
    if ((areaData[0] != undefined)) {
        let location = areaData[0].location_area.name.split('-').join(' ');
        enterLocation.innerHTML = location;
    } else {
        enterLocation.innerHTML = "N/A";
    }

    //evolutions
    let evoApi = await fetch(data.species.url);
    let moreData = await evoApi.json();

    let evoTwoApi = await fetch(moreData.evolution_chain.url)
    let evoData = await evoTwoApi.json();


    let firstEvo = evoData.chain.species.name;
    let firstSprite = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + firstEvo);
    let doubleData = await firstSprite.json();
    evolutionOne.src = doubleData.sprites.front_default;

    if (evoData.chain.evolves_to[0] != undefined) {
        let secondEvo = evoData.chain.evolves_to[0].species.name;
        let secondSprite = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + secondEvo);
        let evenMoreData = await secondSprite.json();
        evolutionTwo.src = evenMoreData.sprites.front_default;

        if (evoData.chain.evolves_to[0].evolves_to[0] != undefined) {
            let thirdEvo = evoData.chain.evolves_to[0].evolves_to[0].species.name;
            let thirdSprite = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + thirdEvo);
            let soMuchData = await thirdSprite.json();
            evolutionThree.src = soMuchData.sprites.front_default;
        } else {
            evolutionThree.src = "";
        }
    } else {
        evolutionTwo.src = "";
        evolutionThree.src = "";
    }

    //sprite + shiny
    let sprite = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + data.name)
    let spriteData = await sprite.json();
    pokeSprite.src = spriteData.sprites.front_default;
    shinySprite.src = spriteData.sprites.front_shiny;


    //abilities
    ab1.innerHTML = data.abilities[0].ability.name;
    if ((data.abilities).length == 1) {
        ab2.innerHTML = "";
        ab3.innerHTML = "";
    } else if ((data.abilities).length == 2) {
        ab2.innerHTML = data.abilities[1].ability.name;
        ab3.innerHTML = "";
    } else if ((data.abilities).length == 3) {
        ab2.innerHTML = data.abilities[1].ability.name;
        ab3.innerHTML = data.abilities[2].ability.name;
    }

    //moves
    const getMoves = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.name}`);
            const movedata = await response.json();
            const moves = movedata.moves.map(move => move.move.name);
            moveList.innerHTML = moves.join(', ');
        } catch (error) {
            console.error(error);
        }
    };
    getMoves();

    //favorites
    // addBtn.addEventListener("click", function () {
    //     console.log(data.name);
    //     saveToLocalStorageByName(data.name);
    //     let localStorageData = getLocalStorage();
    //     console.log(localStorageData);
    //     Favorites();
    // })


    // function Favorites() {
    //     let favorites = getLocalStorage();

    //     favorites.map(poke => {
    //         let p = document.createElement('p');
    //         p.textContent = poke;

    //         let deleteBtn = document.createElement('button');
    //         deleteBtn.className = 'btn';
    //         deleteBtn.textContent = 'Delete';
    //         deleteBtn.type = 'button';

    //         deleteBtn.addEventListener("click", function () {
    //             removeFromLocalStorage(poke);
    //             p = "";
    //             deleteBtn = "";
    //         })

    //         favHere.appendChild(p);
    //         favHere.appendChild(deleteBtn);
    //     });
    // }
}




