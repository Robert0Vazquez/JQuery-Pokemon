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

    const statsHeader = document.createElement("h5");
    statsHeader.classList.add("text-center", "text-white");
    statsHeader.textContent = "Estadísticas";

    const radarChartCanvas = document.createElement("canvas");
    radarChartCanvas.id = "statRadarChart";

    modalBody.appendChild(berrieName);
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
function createRadarChart(stats) {
    const labels = stats.map(stat => stat.stat.name);
    const values = stats.map(stat => stat.base_stat);

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
function showBerrieDetails(name, stats) {
    // Mostrar el nombre de la Berrie en el modal
    $("#berrieName").text(name);

    // Crear el gráfico de radar con las estadísticas
    createRadarChart(stats);

    // Mostrar el modal
    $('#berrieModal').modal('show');
}

async function myfunction() {
    try {
        const jsonDatos = await getBerries();
        const berries = jsonDatos.results;
        console.log(berries);
        const cardContent = $("#cardContent");

        for (let berrie of berries) {
            // Peticiones para obtener detalles de las berries
            const berrieDetails = await getDetailsBerries(berrie.url);
            const berrieName = berrieDetails.name;
            const berrieImgUrl = berrieDetails.item.url;
            const berrieImgDetails = await getImgBerries(berrieImgUrl);
            const berrieImg = berrieImgDetails.sprites.default;
            const berrieStats = berrieDetails.stats;

            // Crear una tarjeta por cada berrie
            const card = createCard(berrieName, berrieImg);
            card.click(() => showBerrieDetails(berrieName, berrieStats));
            cardContent.append(card);
        }
    } catch (err) {
        console.error("Error al obtener los datos: " + err);
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
