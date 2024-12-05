$(document).ready(function () {
    // Crear elementos principales del menú
    let $nav = $('<nav>', { class: 'navbar navbar-expand-lg navbar-dark  navbar-custom' }); // Se añade la clase personalizada navbar-custom
    let $container = $('<div>', { class: 'container-fluid' });
    let $logoLink = $('<a>', { class: 'navbar-brand', href: '../index.html' });
    let $logoImg = $('<img>', { width: 100, height: 50, alt: 'Logo' });
    let $ul = $('<ul>', { class: 'navbar-nav ms-auto' }); // Alinear a la derecha

    // Agregar los elementos al DOM
    $logoLink.append($logoImg);
    $container.append($logoLink, $ul);
    $nav.append($container);
    $('body').prepend($nav);

    // Obtener la ruta actual
    let path = window.location.pathname;

    // Configuración según la página
    if (path.includes("pokemones.html")) {
        $logoImg.attr('src', '../logoBueno.png');
        agregarBotones($ul, [
            { texto: "Inicio", ruta: "../index.html" },
            { texto: "Evoluciones", ruta: "evoluciones.html" },
            { texto: "Juegos", ruta: "juegos.html" },
            { texto: "Berries", ruta: "berries.html" },
        ]);
    } else if (path.includes("evoluciones.html")) {
        $logoImg.attr('src', '../logoBueno.png');
        agregarBotones($ul, [
            { texto: "Inicio", ruta: "../index.html" },
            { texto: "Pokémons", ruta: "pokemones.html" },
            { texto: "Juegos", ruta: "juegos.html" },
            { texto: "Berries", ruta: "berries.html" },
        ]);
    } else if (path.includes("juegos.html")) {
        $logoImg.attr('src', '../logoBueno.png');
        agregarBotones($ul, [
            { texto: "Inicio", ruta: "../index.html" },
            { texto: "Pokémons", ruta: "pokemones.html" },
            { texto: "Evoluciones", ruta: "evoluciones.html" },
            { texto: "Berries", ruta: "berries.html" },
        ]);
    } else if (path.includes("berries.html")) {
        $logoImg.attr('src', '../logoBueno.png');
        agregarBotones($ul, [
            { texto: "Inicio", ruta: "../index.html" },
            { texto: "Pokémons", ruta: "pokemones.html" },
            { texto: "Evoluciones", ruta: "evoluciones.html" },
            { texto: "Juegos", ruta: "juegos.html" },
        ]);
    } else {
        $logoImg.attr('src', 'logoBueno.png');
        agregarBotones($ul, [
            { texto: "Pokémons", ruta: "html/pokemones.html" },
            { texto: "Evoluciones", ruta: "html/evoluciones.html" },
            { texto: "Juegos", ruta: "html/juegos.html" },
            { texto: "Berries", ruta: "html/berries.html" },
        ]);
    }

    /**
     * Función para agregar botones al menú
     * @param {jQuery} $ulElement - Elemento ul donde agregar los botones
     * @param {Array} botones - Lista de botones con texto y ruta
     */
    function agregarBotones($ulElement, botones) {
        botones.forEach(function (boton) {
            let $li = $('<li>', { class: 'nav-item' });
            let $a = $('<a>', { class: 'nav-link', text: boton.texto, href: boton.ruta });
            $li.append($a);
            $ulElement.append($li);
        });
    }
});
