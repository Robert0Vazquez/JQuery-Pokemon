$(document).ready(function () {
    myfunction();
    loadFilters();
    createBerrieModal(); // Crear el modal al cargar la página
});

// Crear el modal de Berrie con JavaScript
function createBerrieModal() {
    const modal = document.createElement("div");
    modal.id = "berrieModal";
    modal.classList.add("modal", "fade");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "berrieModalLabel");
    modal.setAttribute("aria-hidden", "true");

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "bg-dark");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title", "text-white");
    modalTitle.id = "berrieModalLabel";
    modalTitle.textContent = "Detalles de la Berrie";

    const closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    const berrieName = document.createElement("h3");
    berrieName.classList.add("text-center", "text-white");
    berrieName.id = "berrieName";

    const berrieImg = document.createElement("div");
    berrieImg.id = "berrieImgModal";
    berrieImg.classList.add("d-flex", "justify-content-center", "mb-4", "text-white");

    const statsHeader = document.createElement("h5");
    statsHeader.classList.add("text-center", "text-white");
    statsHeader.textContent = "Estadísticas";

    const radarChartCanvas = document.createElement("canvas");
    radarChartCanvas.id = "statRadarChart";

    modalBody.appendChild(berrieName);
    modalBody.appendChild(berrieImg);
    modalBody.appendChild(statsHeader);
    modalBody.appendChild(radarChartCanvas);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // Agregar el modal al body de la página
    document.body.appendChild(modal);
}

// Crear el gráfico de radar con las estadísticas del berrie
// function createRadarChart(stats) {
//     const labels = stats.map(stat => stat.flavor.name);
//     const values = stats.map(stat => stat.potency);

//     const ctx = document.getElementById('statRadarChart').getContext('2d');

//     // Si ya existe un gráfico, destrúyelo
//     if (window.berrieRadarChart) {
//         window.berrieRadarChart.destroy();
//     }

//     // Crear un nuevo gráfico de radar
//     window.berrieRadarChart = new Chart(ctx, {
//         type: 'radar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Estadísticas',
//                 data: values,
//                 fill: true,
//                 backgroundColor: 'rgba(34, 193, 195, 0.2)',
//                 borderColor: 'rgba(34, 193, 195, 1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 r: {
//                     grid: {
//                         color: 'rgba(255, 255, 255, 0.1)',
//                     },
//                     angleLines: {
//                         color: 'rgba(255, 255, 255, 0.1)',
//                     },
//                     ticks: {
//                         color: 'white'
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     labels: {
//                         color: 'white'
//                     }
//                 }
//             }
//         }
//     });
// }

function createRadarChart(stats) {
    const labels = stats.map(stat => stat.flavor.name);  // Acceder al nombre de cada flavor
    const values = stats.map(stat => stat.potency);  // Acceder a la potencia de cada flavor

    const ctx = document.getElementById('statRadarChart').getContext('2d');

    // Si ya existe un gráfico, destrúyelo
    if (window.berrieRadarChart) {
        window.berrieRadarChart.destroy();
    }

    // Crear un nuevo gráfico de radar
    window.berrieRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Estadísticas',
                data: values,
                fill: true,
                backgroundColor: 'rgba(34, 193, 195, 0.2)',
                borderColor: 'rgba(34, 193, 195, 1)',
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
                    ticks: {
                        color: 'white'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}


// Mostrar los detalles y estadísticas en el modal
function showBerrieDetails(name, stats, img) {
    // Mostrar el nombre de la Berrie en el modal
    $("#berrieName").text(name);
    $("#berrieImgModal").empty();

    const imgCard = `
        <div class="evolution-card text-center" style="width: 150px; margin: 10px;">
            <h6>${name}</h6>
            <img src="${img}" alt="${name}" style="width: 100px;">
        </div>
    `;

    $("#berrieImgModal").append(imgCard);

    // Crear el gráfico de radar con las estadísticas
    createRadarChart(stats);

    // Mostrar el modal
    $('#berrieModal').modal('show');
}

async function myfunction() {
    try {
        const jsonDatos = await getBerries();
        const berries = jsonDatos.results;
        //console.log(berries);
        const cardContent = $("#cardContent");

        for (let berrie of berries) {
            // Peticiones para obtener detalles de las berries
            const berrieDetails = await getDetailsBerries(berrie.url);
            const berrieName = berrieDetails.name;
            const berrieImgUrl = berrieDetails.item.url;
            const berrieImgDetails = await getImgBerries(berrieImgUrl);
            const berrieImg = berrieImgDetails.sprites.default;
            const berrieStats = berrieDetails.flavors;
            console.log(berrieStats);

            // Crear una tarjeta por cada berrie
            const card = createCard(berrieName, berrieImg);
            card.click(() => showBerrieDetails(berrieName, berrieStats, berrieImg));
            cardContent.append(card);
        }
    } catch (err) {
        console.error("Error al obtener los datos: " + err);
    }
}

async function loadFilters() {
    try {
        const filterData = await getFilterData(); // Simula obtener los datos de filtros
        const dropdownMenu = $("#dropdownMenu"); // Contenedor del menú desplegable

        for (let filter of filterData.results) {
            const dropdownItem = $(`<a class="dropdown-item text-white" href="#">${filter.name}</a>`);
            dropdownItem.click(() => applyFilter(filter.url)); // Asociar evento de clic
            dropdownMenu.append(dropdownItem);
        }
    } catch (error) {

    }
}

// Obtener datos de filtros 
function getFilterData() {
    return new Promise((resolve) => {
        const filterData = {
            results: [
                { name: "stat-boosts", url: "https://pokeapi.co/api/v2/item-category/1/" },
                { name: "effort-drop", url: "https://pokeapi.co/api/v2/item-category/2/" },
                { name: "medicine", url: "https://pokeapi.co/api/v2/item-category/3/" },
                { name: "other", url: "https://pokeapi.co/api/v2/item-category/4/" },
                { name: "in-a-pinch", url: "https://pokeapi.co/api/v2/item-category/5/" },
                { name: "picky-healing", url: "https://pokeapi.co/api/v2/item-category/6/" },
                { name: "type-protection", url: "https://pokeapi.co/api/v2/item-category/7/" },
                { name: "baking-only", url: "https://pokeapi.co/api/v2/item-category/8/" },
                { name: "collectibles", url: "https://pokeapi.co/api/v2/item-category/9/" },
                { name: "evolution", url: "https://pokeapi.co/api/v2/item-category/10/" },
                { name: "spelunking", url: "https://pokeapi.co/api/v2/item-category/11/" },
                { name: "held-items", url: "https://pokeapi.co/api/v2/item-category/12/" },
                { name: "choice", url: "https://pokeapi.co/api/v2/item-category/13/" },
                { name: "effort-training", url: "https://pokeapi.co/api/v2/item-category/14/" },
                { name: "bad-held-items", url: "https://pokeapi.co/api/v2/item-category/15/" },
                { name: "training", url: "https://pokeapi.co/api/v2/item-category/16/" },
                { name: "plates", url: "https://pokeapi.co/api/v2/item-category/17/" },
                { name: "species-specific", url: "https://pokeapi.co/api/v2/item-category/18/" },
                { name: "type-enhancement", url: "https://pokeapi.co/api/v2/item-category/19/" },
                { name: "event-items", url: "https://pokeapi.co/api/v2/item-category/20/" }
            ]
        };
        resolve(filterData);
    });
}

// Función para aplicar el filtro
async function applyFilter(url) {
    try {
        const filterResponse = await getFiltroByUrl(url);

        // Obtenemos los ítems del filtro
        const filteredItems = filterResponse.items;

        // Limpiar las cartas actuales
        const cardContent = $("#cardContent");
        cardContent.empty();

        // Iterar sobre los ítems filtrados y renderizar las tarjetas
        for (let item of filteredItems) {
            const itemDetails = await getDetailsBerries(item.url);
            const itemName = itemDetails.name;
            const itemImgDetails = await getImgBerries(item.url);
            const itemImg = itemImgDetails.sprites.default;

            // Crear y agregar la nueva tarjeta
            const card = createCard(itemName, itemImg);
            cardContent.append(card);
        }
    } catch (err) {
        console.error("Error al aplicar el filtro: " + err);
    }
}

// Crear una tarjeta
function createCard(name, imgUrl) {
    return $(`
        <div class="card mb-4 g-4 bg-dark custom-card" style="width: 20rem; margin:5px; cursor: pointer;">
            <div class="card-body bg-dark text-center">
                <h5 class="card-title text-center my-4">${name}</h5>
                <img src="${imgUrl}" alt="Imagen de ${name}" class="card-img">
            </div>
        </div>
    `);
}

function getBerries() {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/berry/?offset=0&limit=64`,
        method: "GET",
        dataType: "json"
    });
}

function getDetailsBerries(id) {
    return $.ajax({
        url: `${id}`,
        method: "GET",
        dataType: "json"
    });
}

function getImgBerries(urlBerrie) {
    return $.ajax({
        url: `${urlBerrie}`,
        method: "GET",
        dataType: "json"
    });
}

function getFiltroByUrl(url) {
    return $.ajax({
        url: url, // Usa la URL del filtro seleccionado
        method: "GET",
        dataType: "json"
    });
}

// Funcion para filtrar Berrie por nombre
$(document).ready(function () {
    // Al escribir en el campo de busqueda
    $('#searchBerrie').on('input', function () {
        const searchText = $(this).val().toLowerCase(); // Obtener el texto de busqueda
        filterBerrieByName(searchText); //Llamar a la funcion para filtrar
    });
});

function filterBerrieByName(searchText) {
    // Filtrar las tarjetas basadas en el hombre
    $('#cardContent .card').each(function () {
        const berrieName = $(this).find('.card-title').text().toLowerCase();
        if (berrieName.includes(searchText)) {
            $(this).show();  // Mostrar la tarjeta si el nombre coincide
        } else {
            $(this).hide();  // Ocultar la tarjeta si no coincide
        }
    })
}