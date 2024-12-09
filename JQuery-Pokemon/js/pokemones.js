$(document).ready(function () {
    myfunction();
    loadFilters(); // Cargar los filtros al iniciar
    createPokemonModal(); // Crear el modal al cargar la página
});

// Crear el modal de Pokémon con JavaScript
function createPokemonModal() {
    const modal = document.createElement("div");
    modal.id = "pokemonModal";
    modal.classList.add("modal", "fade");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "pokemonModalLabel");
    modal.setAttribute("aria-hidden", "true");

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "bg-dark");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title", "text-white");
    modalTitle.id = "pokemonModalLabel";
    modalTitle.textContent = "Detalles del Pokémon";

    const closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    const pokemonName = document.createElement("h3");
    pokemonName.classList.add("text-center", "text-white");
    pokemonName.id = "pokemonName";

    const evolutionHeader = document.createElement("h5");
    evolutionHeader.classList.add("text-center", "text-white");
    evolutionHeader.textContent = "Evoluciones";

    const evolutionContainer = document.createElement("div");
    evolutionContainer.id = "evolutionContainer";
    evolutionContainer.classList.add("d-flex", "justify-content-center", "mb-4", "text-white");

    const statsHeader = document.createElement("h5");
    statsHeader.classList.add("text-center", "text-white");
    statsHeader.textContent = "Estadísticas";

    const radarChartCanvas = document.createElement("canvas");
    radarChartCanvas.id = "statRadarChart";

    modalBody.appendChild(pokemonName);
    modalBody.appendChild(evolutionHeader);
    modalBody.appendChild(evolutionContainer);
    modalBody.appendChild(statsHeader);
    modalBody.appendChild(radarChartCanvas);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // Agregar el modal al body de la página
    document.body.appendChild(modal);
}

// Cargar los datos de los Pokémon
async function myfunction() {
    try {
        const jsonDatos = await getDatos();
        const pokemones = jsonDatos.results;
        const cardContent = $("#cardContent");

        for (let pokemon of pokemones) {
            const pokemonDetails = await getPokemonDetails(pokemon.name);
            const pokemonImg = pokemonDetails.sprites.front_default;

            // Crear una tarjeta por cada Pokémon
            const card = createCard(pokemon.name, pokemonImg);
            cardContent.append(card);

            // Evento para mostrar el modal con las estadísticas
            card.click(() => showPokemonDetails(pokemon.name));
        }
    } catch (err) {
        console.error("Error al obtener los datos: " + err);
    }
}

// Obtener los detalles del Pokémon (incluyendo sus estadísticas)
async function getPokemonDetails(name) {
    const response = await $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        method: "GET",
        dataType: "json"
    });
    return response;
}

// Mostrar los detalles y estadísticas en el modal
function showPokemonDetails(name) {
    getPokemonDetails(name).then(data => {
        // Mostrar el nombre del Pokémon en el modal
        $("#pokemonName").text(data.name);

        //Mostrar las evoluciones
        displayEvolutions(data.id),

        // Llamar a la función para crear el gráfico de radar
        createRadarChart(data.stats);
        
        // Mostrar el modal
        $('#pokemonModal').modal('show');
    });
}

// Función para mostrar las evoluciones
async function displayEvolutions(pokemonId) {
    try {
        const speciesResponse = await $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
            method: "GET",
            dataType: "json"
        });

        const evolutionChainUrl = speciesResponse.evolution_chain.url;
        const evolutionData = await $.ajax({
            url: evolutionChainUrl,
            method: "GET",
            dataType: "json"
        });

        const evolutions = getEvolutions(evolutionData.chain);
        const evolutionContainer = $("#evolutionContainer");
        evolutionContainer.empty();  // Limpiar evoluciones anteriores

        for (let evo of evolutions) {
            const evoImage = await getPokemonImage(evo.name);
            const evoCard = `
                <div class="evolution-card text-center" style="width: 150px; margin: 10px;">
                    <h6>${evo.name}</h6>
                    <img src="${evoImage}" alt="${evo.name}" style="width: 100px;">
                </div>
            `;
            evolutionContainer.append(evoCard);
        }

    } catch (err) {
        console.error("Error al obtener evoluciones: " + err);
    }
}

// Función para obtener las evoluciones de la cadena
function getEvolutions(chain) {
    let evolutions = [];
    let currentChain = chain;

    // Recorrer la cadena evolutiva
    while (currentChain) {
        evolutions.push({ name: currentChain.species.name });
        currentChain = currentChain.evolves_to[0];
    }

    return evolutions;
}

// Función para obtener la imagen de un Pokémon
async function getPokemonImage(name) {
    const response = await $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        method: "GET",
        dataType: "json"
    });
    return response.sprites.front_default;
}

// Crear el gráfico de radar con las estadísticas del Pokémon
function createRadarChart(stats) {
    const labels = stats.map(stat => stat.stat.name);
    const values = stats.map(stat => stat.base_stat);
    
    const ctx = document.getElementById('statRadarChart').getContext('2d');
    
    // Si ya existe un gráfico, destrúyelo
    if (window.pokemonRadarChart) {
        window.pokemonRadarChart.destroy();
    }

    // Crear un nuevo gráfico de radar
    window.pokemonRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Estadísticas',
                data: values,
                fill: true,
                backgroundColor: 'rgba(34, 193, 195, 0.2)',
                borderColor: 'rgba(34, 193, 195, 1)',
                fontColor: 'white',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                r: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    },

                }
            }
        }
    });

    // Ajustar el tamaño del canvas usando CSS
    $('#statRadarChart').css({
        'width': '300px',
        'height': '300px',
    });
}


// Crear una tarjeta de Pokémon
function createCard(name, imgUrl) {
    return $(`
        <div class="card mb-4 g-4 bg-dark custom-card" style="width: 20rem; margin:5px;">
            <div class="card-body bg-dark text-center">
                <h5 class="card-title text-center my-4" id="cardTitle">${name}</h5>
                <img src="${imgUrl}" alt="Imagen de ${name}" class="card-img-top" id="cardImage">
            </div>
        </div>
    `);
}

// Funciones adicionales para obtener los datos de los Pokémon y filtros (como antes)
function getDatos() {
    return $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=200",
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


function getFiltro(id) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/type/${id}/`,
        method: "GET",
        dataType: "json"
    });
}

// Función para filtrar Pokémon por nombre
$(document).ready(function() {
    // Al escribir en el campo de búsqueda
    $('#searchPokemon').on('input', function() {
        const searchText = $(this).val().toLowerCase();  // Obtener el texto de búsqueda
        filterPokemonsByName(searchText);  // Llamar a la función para filtrar
    });
});

// Filtrar las tarjetas de Pokémon por nombre
function filterPokemonsByName(searchText) {
    // Filtrar las tarjetas basadas en el nombre
    $('#cardContent .card').each(function() {
        const pokemonName = $(this).find('.card-title').text().toLowerCase();
        if (pokemonName.includes(searchText)) {
            $(this).show();  // Mostrar la tarjeta si el nombre coincide
        } else {
            $(this).hide();  // Ocultar la tarjeta si no coincide
        }
    });
}

$(document).ready(function () {
    $('#jqueryMethodsBtn').click(function () {
        // Obtener el valor del input
        const inputValue = $('#searchPokemon').val();
        const title = $('#cardTitle').text();
        const imageHTML = $('#cardTitle').html();

        // Mostrar en alerta el valor actual
        alert("Busqueda: " + inputValue);
        alert("Título de la tarjeta: " + title);
        alert("Título de la tarjeta en HTML: " + imageHTML);

    });
});
