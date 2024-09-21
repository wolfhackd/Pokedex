/* Observações
=> para criação de li definir if para tipo de pokemom
-->
=> um span de class number com if de correção de digitos #0000
=> um span de class name 

=>criação de div de class detail
--> uma ol de class types
um if para tipos
---> uma li de class type
uma li de class com seu outro tipo caso existente
*/

async function gettingInfo(pokemonName) {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName + "/");
        if (!response.ok) {
            throw new Error("Erro ao buscar dados do Pokémon: " + response.status);
        }
        let data = await response.json();
        cardCreate(data);
    } catch (error) {
        console.log(error);
    }
}

function cardCreate(data) {

    let geralType = data.types[0].type.name;

    let li = document.createElement('li');
    li.classList.add("pokemon", geralType);

    let number = document.createElement('span');
    number.classList.add("number");
    number.textContent = data.id;

    let name = document.createElement('span');
    name.classList.add("name");
    name.textContent = data.name;

    let detail = document.createElement('div');
    detail.classList.add("detail");

    let img = document.createElement('img');
    img.src = data.sprites.front_default;

    detail.appendChild(img);
    li.append(number, name, detail);
    document.querySelector("#pokemonList").append(li);
    
}

//função para pegar informaçoes de todos os pokemons

async function getPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10000");
        if (!response.ok) {
            throw new Error("Erro ao buscar a lista de Pokémons: " + response.status);
        }
        const pokemons = await response.json();

        for (let i = 0; i < pokemons.results.length; i++) {
            gettingInfo(pokemons.results[i].name);
        }
    } catch (error) {
        console.error(error);
    }
}


getPokemons();