$(document).ready(function () {
    myfunction();
    createmodalInfo();
    $("#cardContent").on("click", ".card", function() {
        const generationIndex = $(this).data("index");  // Obtener el índice de la generación
        populateModal(generationIndex);  // Llamar a populateModal para mostrar el modal con los datos de la generación
        getPokemonAnalytics(generationIndex); 
        getTypeAnalytics(generationIndex)
    });
});


async function myfunction() {
    try {
        const jsonDatos = await getGenerations();
        const generaciones = jsonDatos.results;

        const cardContent = $("#cardContent");

        for (let generacion of generaciones) {
            const nameGeneration = generacion.name;
            const imgGen = '../gen1.gif'

            // Crear una tarjeta por cada generación
            const card = createCard(nameGeneration, imgGen);

            // Agregar el evento click para abrir el modal
            card.on("click", function () {
                const index = generaciones.indexOf(generacion) + 1; 
                populateModal(index);
            });

            cardContent.append(card);
        }
    } catch (err) {
        console.error("Error al obtener los datos: " + err);
    }
}


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

function createmodalInfo() {
    // Crear el contenedor del modal
    const modal = document.createElement("div");
    modal.id = "infoModal";
    modal.classList.add("modal", "fade");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "infoModalLabel");
    modal.setAttribute("aria-hidden", "true");

    // Crear el diálogo del modal
    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog", "modal-lg");

    // Crear el contenido del modal
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "bg-dark");

    // Header del modal
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const modalTitle = document.createElement("h5");
    modalTitle.id = "infoModalLabel";
    modalTitle.classList.add("modal-title", "text-white");
    modalTitle.textContent = "Información de la Generación";

    const closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    // Body del modal
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body", "text-white");

    // Sección de ataques
    const attacksHeader = document.createElement("h5");
    attacksHeader.textContent = "Ataques Destacados";
    modalBody.appendChild(attacksHeader);

    const attacksList = document.createElement("ul");
    attacksList.id = "attacksList";
    attacksList.classList.add("list-group", "mb-4");
    modalBody.appendChild(attacksList);

    // Sección de Pokémon destacados
    const pokemonHeader = document.createElement("h5");
    pokemonHeader.textContent = "Pokémon Destacados";
    modalBody.appendChild(pokemonHeader);

    const pokemonList = document.createElement("div");
    pokemonList.id = "pokemonList";
    pokemonList.classList.add("d-flex", "justify-content-around", "flex-wrap", "mb-4");
    modalBody.appendChild(pokemonList);

    // Sección de analíticas
    const analyticsHeader = document.createElement("h5");
    analyticsHeader.textContent = "Analíticas de Especies y Juegos";
    modalBody.appendChild(analyticsHeader);

    // Usamos un grid para mostrar las dos gráficas en columnas
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("row", "mb-4");

    // Gráfico 1: Especies por tipo
    const chartColumn1 = document.createElement("div");
    chartColumn1.classList.add("col-md-6");

    const chartContainer1 = document.createElement("div");
    chartContainer1.classList.add("chart-container");
    chartContainer1.style.height = "400px";

    const chartCanvas1 = document.createElement("canvas");
    chartCanvas1.id = "analyticsChart1";
    chartContainer1.appendChild(chartCanvas1);

    chartColumn1.appendChild(chartContainer1);

    // Gráfico 2: Otra analítica
    const chartColumn2 = document.createElement("div");
    chartColumn2.classList.add("col-md-6");

    const chartContainer2 = document.createElement("div");
    chartContainer2.classList.add("chart-container");
    chartContainer2.style.height = "400px";

    const chartCanvas2 = document.createElement("canvas");
    chartCanvas2.id = "analyticsChart2";
    chartContainer2.appendChild(chartCanvas2);

    chartColumn2.appendChild(chartContainer2);

    // Añadimos las columnas de los gráficos al grid
    gridContainer.appendChild(chartColumn1);
    gridContainer.appendChild(chartColumn2);

    modalBody.appendChild(gridContainer);

    // Pie del modal
    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");

    const closeModalButton = document.createElement("button");
    closeModalButton.classList.add("btn", "btn-secondary");
    closeModalButton.setAttribute("type", "button");
    closeModalButton.setAttribute("data-bs-dismiss", "modal");
    closeModalButton.textContent = "Cerrar";

    modalFooter.appendChild(closeModalButton);

    // Ensamblar todo
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // Agregar el modal al body
    document.body.appendChild(modal);
}


async function populateModal(index) {
    try {
        // Obtener datos de la generación específica
        const generationData = await getSpecificGeneration(index);

        // Obtener 5 ataques al azar
        const moves = generationData.moves.slice(0, 5);

        // Obtener 5 Pokémon al azar
        const pokemons = generationData.pokemon_species.slice(0, 5);

        // Limpiar contenido previo en el modal
        $("#attacksList").empty();
        $("#pokemonList").empty();

        // Mostrar los ataques
        moves.forEach((move) => {
            const attackItem = $("<li>")
                .addClass("list-group-item bg-dark text-white")
                .text(move.name);
            $("#attacksList").append(attackItem);
        });

        // Mostrar los Pokémon
        pokemons.forEach((pokemon) => {
            const pokemonCard = $("<div>")
                .addClass("card bg-secondary text-white mb-3")
                .css({ width: "150px" });

            const pokemonBody = $("<div>").addClass("card-body text-center");

            const pokemonName = $("<h6>")
                .addClass("card-title")
                .text(pokemon.name);

            pokemonBody.append(pokemonName);
            pokemonCard.append(pokemonBody);
            $("#pokemonList").append(pokemonCard);
        });

        // Llamar a la función para obtener y mostrar las analíticas
        await getPokemonAnalytics(index);  // Pasamos el índice de la generación
        await getTypeAnalytics(index)

        // Mostrar el modal
        $("#infoModal").modal("show");
    } catch (error) {
        console.error("Error al obtener datos de la generación:", error);
    }
}

async function getPokemonAnalytics(index) {
    try {
        // Obtener los detalles de la generación específica
        const generationData = await getSpecificGeneration(index);

        const pokemonSpecies = generationData.pokemon_species;

        // Contamos la cantidad de Pokémon en esta generación
        const numberOfSpecies = pokemonSpecies.length;

        // Mostramos la cantidad de especies de Pokémon en la consola o en el gráfico
        console.log(`Número de especies de Pokémon en la generación ${index}: ${numberOfSpecies}`);

        const labels = [`Generación ${index}`];
        const data = [numberOfSpecies];

        createPieChart(labels, data);  // Llamamos a la función para crear el gráfico

    } catch (error) {
        console.error("Error al obtener los datos de analíticas:", error);
    }
}

async function getTypeAnalytics(index) {
    try {
        const genData = await getSpecificGeneration(index);

        const pokemonType = genData.types;
        let typeCount = {};  // Usamos un objeto para contar cuántos Pokémon hay de cada tipo

        // Iterar sobre los tipos de Pokémon y contar cuántos hay de cada tipo
        for (let i = 0; i < pokemonType.length; i++) {
            const typeName = pokemonType[i].name;

            // Si el tipo ya existe, incrementamos el contador
            if (typeCount[typeName]) {
                typeCount[typeName]++;
            } else {
                typeCount[typeName] = 1;  // Si no existe, inicializamos el contador
            }
        }

        // Crear etiquetas (tipos) y datos (cantidad de Pokémon por tipo)
        const labels = Object.keys(typeCount);  // Los nombres de los tipos
        const data = Object.values(typeCount);  // Las cantidades de Pokémon por tipo

        // Generar colores aleatorios para cada tipo
        const colors = generateColors(labels.length);

        // Crear el gráfico de barras con colores diferentes para cada tipo
        createBarChart(labels, data, colors);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

function generateColors(num) {
    const colors = [];
    for (let i = 0; i < num; i++) {
        // Generamos un color en formato hexadecimal
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        colors.push(color);
    }
    return colors;
}

function createBarChart(labels, data, colors) {
    const ctx = document.getElementById('analyticsChart1').getContext('2d');
    
    // Destruir el gráfico anterior si existe
    if (window.chart) {
        window.chart.destroy();
    }

    // Crear el gráfico de barras con los colores proporcionados
    window.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tipos de pokemon',
                data: data,
                backgroundColor: colors, // Asignar los colores generados
                borderColor: colors,     // Usar los mismos colores para los bordes
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' Pokémon';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para crear el gráfico de pastel
function createPieChart(labels, data) {
    const ctx = document.getElementById('analyticsChart2').getContext('2d');
    
    // Verificar si ya existe un gráfico, si es así, destruirlo
    if (window.chart1) {
        window.chart1.destroy();
    }

    // Crear el gráfico de pastel
    window.chart1 = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de Pokémon por Generación',
                data: data,
                backgroundColor: ['#36a2eb'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' Pokémon';
                        }
                    }
                }
            }
        }
    });
}


function getGenerations () {
    return $.ajax({
        url: 'https://pokeapi.co/api/v2/generation/',
        method: 'GET',
        dataType: "json"
    });
}

async function getSpecificGeneration (index) {
    const response = $.ajax({
        url: `https://pokeapi.co/api/v2/generation/${index}`,
        method: 'GET',
        dataType: "json"
    });
    return response;
}


function getVersionGroups () {
    return $.ajax({
        url: 'https://pokeapi.co/api/v2/version-group/?offset=0&limit=27',
        method: 'GET',
        dataType: 'json'
    })
}

function getPokedexDetails(id) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokedex/${id}/`,
        method: 'GET',
        dataType: 'json'
    });
}



