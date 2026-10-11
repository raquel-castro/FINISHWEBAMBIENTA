// ========================================================
// AMBIENTA - MUEBLES DE MELAMINA (LOGICA PRINCIPAL)
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrusel();
    inicializarCatalogo();
});

// --------------------------------------------------------
// 1. GESTION DEL CARRUSEL HERO
// --------------------------------------------------------
function inicializarCarrusel() {
    const slides = document.querySelectorAll('.hero__slide');
    const puntos = document.querySelectorAll('.hero__punto');
    const btnPrev = document.getElementById('carruselPrev');
    const btnNext = document.getElementById('carruselNext');
    const contenedor = document.getElementById('heroCarousel');

    if (!slides.length) return;

    let slideActual = 0;
    let temporizador = null;
    const duracionSlide = 5500; // Mas lento y pausado para apreciar las imagenes

    function cambiarSlide(indice) {
        slides[slideActual].classList.remove('hero__slide--activo');
        if (puntos[slideActual]) {
            puntos[slideActual].classList.remove('hero__punto--activo');
        }

        // Bucle infinito sin saltos ni pantalla negra
        slideActual = (indice + slides.length) % slides.length;

        slides[slideActual].classList.add('hero__slide--activo');
        if (puntos[slideActual]) {
            puntos[slideActual].classList.add('hero__punto--activo');
        }
    }

    function siguienteSlide() {
        cambiarSlide(slideActual + 1);
    }

    function anteriorSlide() {
        cambiarSlide(slideActual - 1);
    }

    function iniciarAutoplay() {
        detenerAutoplay();
        temporizador = setInterval(siguienteSlide, duracionSlide);
    }

    function detenerAutoplay() {
        if (temporizador) {
            clearInterval(temporizador);
            temporizador = null;
        }
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            siguienteSlide();
            iniciarAutoplay();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            anteriorSlide();
            iniciarAutoplay();
        });
    }

    puntos.forEach((punto, index) => {
        punto.addEventListener('click', () => {
            cambiarSlide(index);
            iniciarAutoplay();
        });
    });

    if (contenedor) {
        contenedor.addEventListener('mouseenter', detenerAutoplay);
        contenedor.addEventListener('mouseleave', iniciarAutoplay);
    }

    // Iniciar rotacion automatica suave
    iniciarAutoplay();
}

// --------------------------------------------------------
// 2. FILTRADO, BUSQUEDA Y DETALLES DEL CATALOGO
// --------------------------------------------------------
const datosProductos = {
    'PROD-01': {
        id: 'PROD-01',
        nombre: 'Clóset Moderno "Minimal"',
        categoria: 'Dormitorio',
        precio: 2450,
        imagen: 'galeria/ropero_1.webp',
        descripcion: 'Diseño integral con 6 puertas batientes fabricado en melamina Pelíkano de 18mm con acabado antibacteriano. Incluye zapatera corrediza, 4 cajones internos con correderas telescópicas pesadas y barras de colgar cromadas.',
        detalles: [
            'Material: Tablero de melamina 18mm de alta densidad',
            'Tapacanto: Grueso de 3mm termofusionado al calor',
            'Medidas: 2.10m alto x 2.00m ancho x 0.55m profundidad',
            'Herrajes: Bisagras cangrejo con freno hidráulico cierre suave',
            'Garantía: 24 meses por defectos de fábrica',
            'Tiempo de entrega: 4 a 6 días hábiles (incluye armado en Lima)'
        ]
    },
    'PROD-02': {
        id: 'PROD-02',
        nombre: 'Escritorio Ejecutivo "Home Office"',
        categoria: 'Oficina',
        precio: 890,
        imagen: 'galeria/escritorio_1.jpg',
        descripcion: 'Estación de trabajo ergonómica creada para jornadas continuas. Cuenta con pasacables de aluminio anodizado, cajón con cerradura de seguridad y repisa inferior para estabilizador o PC.',
        detalles: [
            'Material: Melamina 18mm resistente al calor y rayaduras',
            'Medidas: 1.20m ancho x 0.75m alto x 0.60m fondo',
            'Seguridad: Llave frontal con duplicado',
            'Acabado: Tono madera natural combinado con blanco mate',
            'Capacidad de carga: Soporta hasta 90 kg repartidos'
        ]
    },
    'PROD-03': {
        id: 'PROD-03',
        nombre: 'Cocina Integral "Milán"',
        categoria: 'Cocina',
        precio: 3200,
        imagen: 'galeria/cocina_1.jpg',
        descripcion: 'Conjunto completo de reposteros altos y bajos con tablero hidrófugo RH anti-humedad y grasa. Distribución inteligente con condimentero metálico extraíble y organizador de ollas.',
        detalles: [
            'Material: Melamina Tropical RH de 18mm resistente al agua',
            'Medidas: 2.40m de longitud frontal total',
            'Tiradores: Perfil gola oculto en aluminio anodizado',
            'Cajonería: Correderas ocultas con sistema push-open',
            'Instalación: Incluye anclaje profesional a pared'
        ]
    },
    'PROD-04': {
        id: 'PROD-04',
        nombre: 'Juego de Dormitorio "Nordic"',
        categoria: 'Dormitorio',
        precio: 1850,
        imagen: 'galeria/dormitorio_1.jpg',
        descripcion: 'Cama tarima Queen size con 4 amplios cajones organizadores inferiores para ropa de cama y almohadas. Viene acompañada de 2 mesas de noche suspendidas de diseño flotante.',
        detalles: [
            'Compatibilidad: Colchón Queen estándar (1.60m x 2.00m)',
            'Estructura: Travesaños internos de madera tornillo maciza reforzada',
            'Veladores: 2 unidades con 1 cajón y nicho abierto',
            'Acabado: Textura roble veteado con cantos sellados'
        ]
    },
    'PROD-05': {
        id: 'PROD-05',
        nombre: 'Estación en "L" "Corporate"',
        categoria: 'Oficina',
        precio: 1420,
        imagen: 'galeria/oficina_1.jpg',
        descripcion: 'Módulo esquinero corporativo amplio. Brinda amplio espacio para doble monitor, laptop y documentos. Incluye credenza auxiliar con archivador de carpetas colgantes.',
        detalles: [
            'Medidas: 1.60m lateral principal x 1.40m lateral retorno x 0.75m alto',
            'Archivador: 3 gavetas con rieles de extracción total',
            'Niveladores: Regatones regulables para pisos irregulares'
        ]
    },
    'PROD-06': {
        id: 'PROD-06',
        nombre: 'Centro de Entretenimiento "Viena"',
        categoria: 'Salas y TV',
        precio: 1290,
        imagen: 'galeria/carrusel_1.jpg',
        descripcion: 'Panel flotante decorativo para Smart TV de hasta 75 pulgadas con sistema de gestión de cables oculto, repisa superior y mueble inferior de 2 puertas rebatibles.',
        detalles: [
            'Medidas: 1.90m ancho x 1.70m alto x 0.35m fondo',
            'Capacidad: Admite pantallas LED/OLED de hasta 75"',
            'Iluminación: Compatible con tira LED perimetral cálida'
        ]
    },
    'PROD-07': {
        id: 'PROD-07',
        nombre: 'Repostero Aéreo "Chef Pro"',
        categoria: 'Cocina',
        precio: 1650,
        imagen: 'galeria/carrusel_2.jpg',
        descripcion: 'Módulo aéreo de alta capacidad con 4 puertas de elevación vertical mediante pistones hidráulicos italianos. Incluye platera de acero inoxidable y especiero integrado.',
        detalles: [
            'Medidas: 1.80m largo x 0.65m alto x 0.35m fondo',
            'Herrajes: Pistones a gas de 100N con apertura suave',
            'Material: Melamina RH 18mm blanco polar y madera cálida'
        ]
    },
    'PROD-08': {
        id: 'PROD-08',
        nombre: 'Estantería Modular "Cube"',
        categoria: 'Salas y TV',
        precio: 780,
        imagen: 'galeria/carrusel_5.jpg',
        descripcion: 'Librero multifuncional de diseño asimétrico compuesto por 12 nichos reforzados. Perfecto como divisor de ambientes en departamentos o como organizador de libros y adornos.',
        detalles: [
            'Medidas: 1.80m alto x 1.10m ancho x 0.30m fondo',
            'Espesor: Melamina reforzada de 18mm con soporte de 20 kg por nicho',
            'Versatilidad: Puede ubicarse en posición vertical u horizontal'
        ]
    }
};

function inicializarCatalogo() {
    const botonesFiltro = document.querySelectorAll('.filtroBoton');
    const inputBuscador = document.getElementById('buscadorProductos');
    const tarjetas = document.querySelectorAll('.tarjetaProducto');
    const conteo = document.getElementById('conteoProductos');

    let categoriaActiva = 'todos';
    let textoBusqueda = '';

    function aplicarFiltros() {
        let visibles = 0;

        tarjetas.forEach(tarjeta => {
            const categoriaTarjeta = tarjeta.getAttribute('data-categoria') || '';
            const nombreTarjeta = (tarjeta.getAttribute('data-nombre') || '').toLowerCase();

            const coincideCategoria = (categoriaActiva === 'todos') || (categoriaTarjeta === categoriaActiva);
            const coincideTexto = textoBusqueda === '' || nombreTarjeta.includes(textoBusqueda);

            if (coincideCategoria && coincideTexto) {
                tarjeta.style.display = 'flex';
                visibles++;
            } else {
                tarjeta.style.display = 'none';
            }
        });

        if (conteo) {
            conteo.textContent = `Mostrando ${visibles} ${visibles === 1 ? 'producto' : 'productos'}`;
        }
    }

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('filtroBoton--activo'));
            boton.classList.add('filtroBoton--activo');
            categoriaActiva = boton.getAttribute('data-categoria') || 'todos';
            aplicarFiltros();
        });
    });

    if (inputBuscador) {
        inputBuscador.addEventListener('input', (e) => {
            textoBusqueda = e.target.value.trim().toLowerCase();
            aplicarFiltros();
        });
    }

    // Modal de vista rapida / ficha tecnica
    const modal = document.getElementById('modalProductoDetalle');
    const modalContenido = document.getElementById('contenidoDetalleProducto');
    const btnCerrar = document.getElementById('btnCerrarModalProducto');
    const overlay = document.getElementById('overlayModalProducto');

    function abrirDetalle(id) {
        const prod = datosProductos[id];
        if (!prod || !modalContenido) return;

        modalContenido.innerHTML = `
            <div>
                <img src="${prod.imagen}" alt="${prod.nombre}" class="detalleProductoModal__imagen">
            </div>
            <div>
                <span class="detalleProductoModal__categoria">${prod.categoria}</span>
                <h3 class="detalleProductoModal__titulo">${prod.nombre}</h3>
                <div class="detalleProductoModal__precio">S/ ${prod.precio.toFixed(2)}</div>
                <p class="detalleProductoModal__descripcion">${prod.descripcion}</p>
                <h4 style="font-size: 0.95rem; margin-bottom: 8px; color: #1e293b; font-weight: 700;">Especificaciones Técnicas:</h4>
                <ul class="detalleProductoModal__lista">
                    ${prod.detalles.map(d => `<li>${d}</li>`).join('')}
                </ul>
                <button type="button" class="boton boton--secundario btnAgregarCarrito" style="width: 100%;"
                    data-id="${prod.id}"
                    data-nombre="${prod.nombre}"
                    data-precio="${prod.precio}"
                    data-imagen="${prod.imagen}"
                    data-categoria="${prod.categoria}">
                    Añadir al Carrito
                </button>
            </div>
        `;

        modal.classList.add('modalContenedor--activo');
        modal.setAttribute('aria-hidden', 'false');
    }

    function cerrarDetalle() {
        if (!modal) return;
        modal.classList.remove('modalContenedor--activo');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('click', (e) => {
        const botonDetalle = e.target.closest('[data-accion="ver-detalle"]');
        if (botonDetalle) {
            const id = botonDetalle.getAttribute('data-id');
            abrirDetalle(id);
        }
    });

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarDetalle);
    if (overlay) overlay.addEventListener('click', cerrarDetalle);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('modalContenedor--activo')) {
            cerrarDetalle();
        }
    });
}

