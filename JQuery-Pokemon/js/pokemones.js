$(document).ready(function () {
    myfunction();
    loadFilters(); // Cargar los filtros al iniciar
});

async function myfunction() {
    try {
        const jsonDatos = await getDatos();
        const pokemones = jsonDatos.results;
        const cardContent = $("#cardContent");

        for (let pokemon of pokemones) {
            const pokemonDetails = await getImgPokemon(pokemon.name);
            const pokemonImg = pokemonDetails.sprites.front_default;

            // Crear una tarjeta por cada Pokémon
            const card = createCard(pokemon.name, pokemonImg);
            cardContent.append(card);
        }
    } catch (err) {
        console.error("Error al obtener los datos: " + err);
    }
}

// Crear una función para cargar filtros
async function loadFilters() {
    try {
        const filterData = await getFilterData(); // Simula obtener los datos de filtros
        const dropdownMenu = $("#dropdownMenu"); // Contenedor del menú desplegable

        for (let filter of filterData.results) {
            const dropdownItem = $(`<a class="dropdown-item text-white" href="#">${filter.name}</a>`);
            dropdownItem.click(() => applyFilter(filter.url)); // Asociar evento de clic
            dropdownMenu.append(dropdownItem);
        }
    } catch (err) {
        console.error("Error al cargar filtros: " + err);
    }
}

// Función para aplicar el filtro
async function applyFilter(url) {
    try {
        const filterResponse = await getFiltroByUrl(url);
        const pokemonesFiltrados = filterResponse.pokemon.map(p => p.pokemon);

        const cardContent = $("#cardContent");
        cardContent.empty(); // Limpiar las cartas actuales

        for (let pokemon of pokemonesFiltrados) {
            const pokemonDetails = await getImgPokemon(pokemon.name);
            const pokemonImg = pokemonDetails.sprites.front_default;

            // Crear y agregar la nueva tarjeta
            const card = createCard(pokemon.name, pokemonImg);
            cardContent.append(card);
        }
    } catch (err) {
        console.error("Error al aplicar el filtro: " + err);
    }
}

// Obtener datos de filtros (simulado con tu JSON)
function getFilterData() {
    return new Promise((resolve) => {
        const filterData = {
            results: [
                { "name": "normal", "url": "https://pokeapi.co/api/v2/type/1/" },
                { "name": "fighting", "url": "https://pokeapi.co/api/v2/type/2/" },
                { "name": "flying", "url": "https://pokeapi.co/api/v2/type/3/" },
                { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" },
                { "name": "ground", "url": "https://pokeapi.co/api/v2/type/5/" },
                { "name": "rock", "url": "https://pokeapi.co/api/v2/type/6/" },
                { "name": "bug", "url": "https://pokeapi.co/api/v2/type/7/" },
                { "name": "ghost", "url": "https://pokeapi.co/api/v2/type/8/" },
                { "name": "steel", "url": "https://pokeapi.co/api/v2/type/9/" },
                { "name": "fire", "url": "https://pokeapi.co/api/v2/type/10/" },
                { "name": "water", "url": "https://pokeapi.co/api/v2/type/11/" },
                { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" },
                { "name": "electric", "url": "https://pokeapi.co/api/v2/type/13/" },
                { "name": "psychic", "url": "https://pokeapi.co/api/v2/type/14/" },
                { "name": "ice", "url": "https://pokeapi.co/api/v2/type/15/" },
                { "name": "dragon", "url": "https://pokeapi.co/api/v2/type/16/" },
                { "name": "dark", "url": "https://pokeapi.co/api/v2/type/17/" },
                { "name": "fairy", "url": "https://pokeapi.co/api/v2/type/18/" },
                { "name": "unknown", "url": "https://pokeapi.co/api/v2/type/10001/" },
                { "name": "shadow", "url": "https://pokeapi.co/api/v2/type/10002/" }
            ]
        };
        resolve(filterData);
    });
}

// Obtener datos del filtro por URL
function getFiltroByUrl(url) {
    return $.ajax({
        url: url,
        method: "GET",
        dataType: "json"
    });
}

// Crear una tarjeta
function createCard(name, imgUrl) {
    return $(`
        <div class="card mb-4 g-4 bg-dark custom-card" style="width: 20rem; margin:5px;">
            <div class="card-body bg-dark text-center">
                <h5 class="card-title text-center my-4">${name}</h5>
                <img src="${imgUrl}" alt="Imagen de ${name}" class="card-img-top">
            </div>
        </div>
    `);
}

function getDatos() {
    return $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100",
        method: "GET",
        dataType: "json"
    });
}

function getImgPokemon(name) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon-form/${name}/`,
        method: "GET",
        dataType: "json"
    });
}

function getFiltro(id) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/type/${id}/`,
        method: "GET",
        dataType: "json"
    });
}
