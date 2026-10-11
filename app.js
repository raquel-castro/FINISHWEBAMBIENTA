// ========================================================
// AMBIENTA - MUEBLES DE MELAMINA (LOGICA PRINCIPAL)
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrusel();
    inicializarCatalogo();
    inicializarCarrito();
    inicializarAutenticacion();
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

// --------------------------------------------------------
// 3. CARRITO DE COMPRAS Y PROCESO DE CHECKOUT
// --------------------------------------------------------
const CLAVE_CARRITO_STORAGE = 'ambienta_carrito_compras';
let carrito = [];

function cargarCarritoDeStorage() {
    try {
        const datos = localStorage.getItem(CLAVE_CARRITO_STORAGE);
        return datos ? JSON.parse(datos) : [];
    } catch (e) {
        return [];
    }
}

function guardarCarritoEnStorage() {
    try {
        localStorage.setItem(CLAVE_CARRITO_STORAGE, JSON.stringify(carrito));
    } catch (e) {
        console.error('Error al guardar carrito:', e);
    }
}

function inicializarCarrito() {
    carrito = cargarCarritoDeStorage();

    const btnAbrir = document.getElementById('btnAbrirCarrito');
    const btnCerrar = document.getElementById('btnCerrarCarrito');
    const btnSeguirComprando = document.getElementById('btnSeguirComprando');
    const btnVaciar = document.getElementById('btnVaciarCarrito');
    const btnProcederPago = document.getElementById('btnProcederPago');
    const drawer = document.getElementById('drawerCarrito');
    const overlay = document.getElementById('overlayCarrito');

    function abrirDrawer() {
        if (!drawer) return;
        renderizarCarritoUI();
        drawer.classList.add('carritoDrawer--activo');
        drawer.setAttribute('aria-hidden', 'false');
    }

    function cerrarDrawer() {
        if (!drawer) return;
        drawer.classList.remove('carritoDrawer--activo');
        drawer.setAttribute('aria-hidden', 'true');
    }

    if (btnAbrir) btnAbrir.addEventListener('click', abrirDrawer);
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarDrawer);
    if (overlay) overlay.addEventListener('click', cerrarDrawer);
    if (btnSeguirComprando) btnSeguirComprando.addEventListener('click', cerrarDrawer);

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            if (carrito.length === 0) return;
            if (confirm('¿Deseas vaciar todos los muebles del carrito?')) {
                carrito = [];
                guardarCarritoEnStorage();
                renderizarCarritoUI();
            }
        });
    }

    // Delegacion de eventos para agregar al carrito
    document.addEventListener('click', (e) => {
        const btnAgregar = e.target.closest('.btnAgregarCarrito');
        if (btnAgregar) {
            const id = btnAgregar.getAttribute('data-id');
            const nombre = btnAgregar.getAttribute('data-nombre');
            const precio = parseFloat(btnAgregar.getAttribute('data-precio') || '0');
            const imagen = btnAgregar.getAttribute('data-imagen');
            const categoria = btnAgregar.getAttribute('data-categoria') || 'Muebles';

            agregarProductoAlCarrito({ id, nombre, precio, imagen, categoria });
            abrirDrawer();
        }
    });

    // Delegacion de controles dentro del drawer (incrementar, decrementar, eliminar)
    const listaItems = document.getElementById('listaItemsCarrito');
    if (listaItems) {
        listaItems.addEventListener('click', (e) => {
            const btnSumar = e.target.closest('.btnSumarCantidad');
            const btnRestar = e.target.closest('.btnRestarCantidad');
            const btnEliminar = e.target.closest('.btnEliminarItem');

            if (btnSumar) {
                const id = btnSumar.getAttribute('data-id');
                cambiarCantidadItem(id, 1);
            } else if (btnRestar) {
                const id = btnRestar.getAttribute('data-id');
                cambiarCantidadItem(id, -1);
            } else if (btnEliminar) {
                const id = btnEliminar.getAttribute('data-id');
                eliminarItem(id);
            }
        });
    }

    // Proceso de Checkout
    const modalCheckout = document.getElementById('modalCheckout');
    const btnCerrarCheckout = document.getElementById('btnCerrarCheckout');
    const overlayCheckout = document.getElementById('overlayModalCheckout');
    const formCheckout = document.getElementById('formularioCheckout');
    const checkoutTotalTexto = document.getElementById('checkoutTotalTexto');
    const checkoutFormularioContenedor = document.getElementById('checkoutFormularioContenedor');
    const checkoutExitoContenedor = document.getElementById('checkoutExitoContenedor');
    const btnCerrarExito = document.getElementById('btnCerrarExitoCheckout');

    if (btnProcederPago) {
        btnProcederPago.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega al menos un mueble para proceder al pago.');
                return;
            }
            cerrarDrawer();

            // Calcular total a mostrar en checkout
            const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            const costoEnvio = subtotal >= 500 ? 0 : 35;
            const total = subtotal + costoEnvio;

            if (checkoutTotalTexto) {
                checkoutTotalTexto.textContent = `S/ ${total.toFixed(2)}`;
            }

            if (checkoutFormularioContenedor) checkoutFormularioContenedor.style.display = 'block';
            if (checkoutExitoContenedor) checkoutExitoContenedor.style.display = 'none';

            if (modalCheckout) {
                modalCheckout.classList.add('modalContenedor--activo');
                modalCheckout.setAttribute('aria-hidden', 'false');
            }
        });
    }

    function cerrarCheckout() {
        if (!modalCheckout) return;
        modalCheckout.classList.remove('modalContenedor--activo');
        modalCheckout.setAttribute('aria-hidden', 'true');
    }

    if (btnCerrarCheckout) btnCerrarCheckout.addEventListener('click', cerrarCheckout);
    if (overlayCheckout) overlayCheckout.addEventListener('click', cerrarCheckout);

    if (formCheckout) {
        formCheckout.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('checkoutNombre')?.value || 'Cliente';
            const dni = document.getElementById('checkoutDni')?.value || '';
            const telefono = document.getElementById('checkoutTelefono')?.value || '';
            const direccion = document.getElementById('checkoutDireccion')?.value || '';
            const distrito = document.getElementById('checkoutDistrito')?.value || '';
            const metodoPago = formCheckout.querySelector('input[name="metodoPago"]:checked')?.value || 'yape';

            const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            const costoEnvio = subtotal >= 500 ? 0 : 35;
            const total = subtotal + costoEnvio;

            const codigoOrden = 'PED-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

            // Mostrar pantalla de exito
            if (checkoutFormularioContenedor) checkoutFormularioContenedor.style.display = 'none';
            if (checkoutExitoContenedor) checkoutExitoContenedor.style.display = 'block';

            const codElem = document.getElementById('checkoutCodigoOrden');
            if (codElem) codElem.textContent = codigoOrden;

            const detalleResumen = document.getElementById('checkoutDetalleResumen');
            if (detalleResumen) {
                detalleResumen.innerHTML = `
                    <p><strong>Destinatario:</strong> ${nombre} (DNI: ${dni})</p>
                    <p><strong>Contacto:</strong> ${telefono}</p>
                    <p><strong>Dirección:</strong> ${direccion}, ${distrito}</p>
                    <p><strong>Método de Pago:</strong> ${metodoPago.toUpperCase()}</p>
                    <p><strong>Monto Total:</strong> S/ ${total.toFixed(2)} (${carrito.reduce((acc, i) => acc + i.cantidad, 0)} muebles)</p>
                    <p style="margin-top: 8px; color: #16a34a; font-weight: 600;">Se ha enviado un correo con la confirmación de la orden.</p>
                `;
            }

            // Vaciar carrito tras concretar pedido
            carrito = [];
            guardarCarritoEnStorage();
            renderizarCarritoUI();
            formCheckout.reset();
        });
    }

    if (btnCerrarExito) {
        btnCerrarExito.addEventListener('click', cerrarCheckout);
    }

    // Renderizado inicial al cargar la pagina
    renderizarCarritoUI();
}

function agregarProductoAlCarrito(producto) {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria,
            cantidad: 1
        });
    }
    guardarCarritoEnStorage();
    renderizarCarritoUI();
}

function cambiarCantidadItem(id, delta) {
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        eliminarItem(id);
        return;
    }
    guardarCarritoEnStorage();
    renderizarCarritoUI();
}

function eliminarItem(id) {
    carrito = carrito.filter(i => i.id !== id);
    guardarCarritoEnStorage();
    renderizarCarritoUI();
}

function renderizarCarritoUI() {
    const contadorEncabezado = document.getElementById('contadorCarrito');
    const drawerContador = document.getElementById('drawerContadorItems');
    const contenedorLista = document.getElementById('listaItemsCarrito');
    const elemSubtotal = document.getElementById('cartSubtotal');
    const elemIgv = document.getElementById('cartIgv');
    const elemEnvio = document.getElementById('cartEnvio');
    const elemTotal = document.getElementById('cartTotal');

    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    if (contadorEncabezado) contadorEncabezado.textContent = totalCantidad;
    if (drawerContador) drawerContador.textContent = `(${totalCantidad})`;

    if (!contenedorLista) return;

    if (carrito.length === 0) {
        contenedorLista.innerHTML = `
            <div class="carritoVacio">
                <svg class="carritoVacio__icono" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h4 class="carritoVacio__titulo">Tu carrito está vacío</h4>
                <p class="carritoVacio__texto">Aún no has seleccionado muebles de melamina. Revisa nuestro catálogo y añade tus favoritos.</p>
                <a href="#catalogo" class="boton boton--primario" onclick="document.getElementById('drawerCarrito')?.classList.remove('carritoDrawer--activo')">Ver Catálogo</a>
            </div>
        `;

        if (elemSubtotal) elemSubtotal.textContent = 'S/ 0.00';
        if (elemIgv) elemIgv.textContent = 'S/ 0.00';
        if (elemEnvio) elemEnvio.textContent = 'S/ 0.00';
        if (elemTotal) elemTotal.textContent = 'S/ 0.00';
        return;
    }

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    // IGV del 18% incluido
    const igv = subtotal - (subtotal / 1.18);
    const costoEnvio = subtotal >= 500 ? 0 : 35;
    const total = subtotal + costoEnvio;

    contenedorLista.innerHTML = carrito.map(item => `
        <div class="itemCarrito">
            <img src="${item.imagen}" alt="${item.nombre}" class="itemCarrito__imagen">
            <div class="itemCarrito__detalles">
                <h4 class="itemCarrito__nombre">${item.nombre}</h4>
                <div class="itemCarrito__precio">S/ ${(item.precio * item.cantidad).toFixed(2)}</div>
                <div class="itemCarrito__controles">
                    <button type="button" class="itemCarrito__btnCantidad btnRestarCantidad" data-id="${item.id}" aria-label="Disminuir">-</button>
                    <span class="itemCarrito__cantidad">${item.cantidad}</span>
                    <button type="button" class="itemCarrito__btnCantidad btnSumarCantidad" data-id="${item.id}" aria-label="Aumentar">+</button>
                </div>
            </div>
            <button type="button" class="itemCarrito__btnEliminar btnEliminarItem" data-id="${item.id}" aria-label="Eliminar producto" title="Eliminar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>
    `).join('');

    if (elemSubtotal) elemSubtotal.textContent = `S/ ${subtotal.toFixed(2)}`;
    if (elemIgv) elemIgv.textContent = `S/ ${igv.toFixed(2)}`;
    if (elemEnvio) elemEnvio.textContent = costoEnvio === 0 ? 'Gratis' : `S/ ${costoEnvio.toFixed(2)}`;
    if (elemTotal) elemTotal.textContent = `S/ ${total.toFixed(2)}`;
}

// --------------------------------------------------------
// 4. AUTENTICACION (REGISTRO, LOGIN Y PERFIL)
// --------------------------------------------------------
const CLAVE_USUARIOS_STORAGE = 'ambienta_usuarios_registrados';
const CLAVE_SESION_STORAGE = 'ambienta_sesion_activa';

function obtenerUsuariosRegistrados() {
    try {
        const datos = localStorage.getItem(CLAVE_USUARIOS_STORAGE);
        if (datos) return JSON.parse(datos);
    } catch (e) {}

    // Usuario demo inicial
    const iniciales = [
        {
            nombre: 'Cliente Demo',
            email: 'cliente@ambienta.pe',
            telefono: '994333225',
            password: 'password123'
        }
    ];
    localStorage.setItem(CLAVE_USUARIOS_STORAGE, JSON.stringify(iniciales));
    return iniciales;
}

function guardarUsuariosRegistrados(usuarios) {
    try {
        localStorage.setItem(CLAVE_USUARIOS_STORAGE, JSON.stringify(usuarios));
    } catch (e) {
        console.error('Error al guardar usuarios:', e);
    }
}

function obtenerUsuarioActivo() {
    try {
        const datos = localStorage.getItem(CLAVE_SESION_STORAGE);
        return datos ? JSON.parse(datos) : null;
    } catch (e) {
        return null;
    }
}

function guardarUsuarioActivo(usuario) {
    try {
        if (usuario) {
            localStorage.setItem(CLAVE_SESION_STORAGE, JSON.stringify(usuario));
        } else {
            localStorage.removeItem(CLAVE_SESION_STORAGE);
        }
    } catch (e) {
        console.error('Error al guardar sesion:', e);
    }
}

function inicializarAutenticacion() {
    const btnAbrirAuth = document.getElementById('btnAbrirAuth');
    const modalAuth = document.getElementById('modalAuth');
    const btnCerrarAuth = document.getElementById('btnCerrarAuth');
    const overlayAuth = document.getElementById('overlayModalAuth');

    const pestanaLogin = document.getElementById('pestanaLogin');
    const pestanaRegistro = document.getElementById('pestanaRegistro');
    const formLogin = document.getElementById('formLogin');
    const formRegistro = document.getElementById('formRegistro');

    const authVistasFormularios = document.getElementById('authVistasFormularios');
    const authVistaPerfil = document.getElementById('authVistaPerfil');
    const perfilNombre = document.getElementById('perfilNombre');
    const perfilEmail = document.getElementById('perfilEmail');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    const etiquetaUsuario = document.getElementById('etiquetaUsuario');

    const loginError = document.getElementById('loginMensajeError');
    const regError = document.getElementById('regMensajeError');

    function actualizarCabeceraUsuario() {
        const usuario = obtenerUsuarioActivo();
        if (etiquetaUsuario) {
            if (usuario) {
                const primerNombre = usuario.nombre.split(' ')[0];
                etiquetaUsuario.textContent = primerNombre;
            } else {
                etiquetaUsuario.textContent = 'Mi Cuenta';
            }
        }
    }

    function abrirModalAuth() {
        if (!modalAuth) return;
        const usuario = obtenerUsuarioActivo();

        if (usuario) {
            if (authVistasFormularios) authVistasFormularios.style.display = 'none';
            if (authVistaPerfil) authVistaPerfil.style.display = 'block';
            if (perfilNombre) perfilNombre.textContent = usuario.nombre;
            if (perfilEmail) perfilEmail.textContent = usuario.email;
        } else {
            if (authVistasFormularios) authVistasFormularios.style.display = 'block';
            if (authVistaPerfil) authVistaPerfil.style.display = 'none';
            mostrarPestana('login');
        }

        modalAuth.classList.add('modalContenedor--activo');
        modalAuth.setAttribute('aria-hidden', 'false');
    }

    function cerrarModalAuth() {
        if (!modalAuth) return;
        modalAuth.classList.remove('modalContenedor--activo');
        modalAuth.setAttribute('aria-hidden', 'true');
        if (loginError) loginError.style.display = 'none';
        if (regError) regError.style.display = 'none';
    }

    function mostrarPestana(tipo) {
        if (tipo === 'login') {
            pestanaLogin?.classList.add('authPestana--activa');
            pestanaRegistro?.classList.remove('authPestana--activa');
            if (formLogin) formLogin.style.display = 'flex';
            if (formRegistro) formRegistro.style.display = 'none';
        } else {
            pestanaRegistro?.classList.add('authPestana--activa');
            pestanaLogin?.classList.remove('authPestana--activa');
            if (formLogin) formLogin.style.display = 'none';
            if (formRegistro) formRegistro.style.display = 'flex';
        }
    }

    if (btnAbrirAuth) btnAbrirAuth.addEventListener('click', abrirModalAuth);
    if (btnCerrarAuth) btnCerrarAuth.addEventListener('click', cerrarModalAuth);
    if (overlayAuth) overlayAuth.addEventListener('click', cerrarModalAuth);

    if (pestanaLogin) pestanaLogin.addEventListener('click', () => mostrarPestana('login'));
    if (pestanaRegistro) pestanaRegistro.addEventListener('click', () => mostrarPestana('registro'));

    // Submit Login
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = (document.getElementById('loginEmail')?.value || '').trim().toLowerCase();
            const password = document.getElementById('loginPassword')?.value || '';

            const usuarios = obtenerUsuariosRegistrados();
            const usuarioEncontrado = usuarios.find(u => u.email.toLowerCase() === email && u.password === password);

            if (usuarioEncontrado) {
                guardarUsuarioActivo(usuarioEncontrado);
                actualizarCabeceraUsuario();
                cerrarModalAuth();
                formLogin.reset();
            } else {
                if (loginError) {
                    loginError.textContent = 'Correo electrónico o contraseña incorrectos. Por favor verifique sus datos.';
                    loginError.style.display = 'block';
                }
            }
        });
    }

    // Submit Registro
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = (document.getElementById('regNombre')?.value || '').trim();
            const email = (document.getElementById('regEmail')?.value || '').trim().toLowerCase();
            const telefono = (document.getElementById('regTelefono')?.value || '').trim();
            const password = document.getElementById('regPassword')?.value || '';
            const confirmPassword = document.getElementById('regConfirmPassword')?.value || '';

            if (password !== confirmPassword) {
                if (regError) {
                    regError.textContent = 'Las contraseñas no coinciden. Verifíquelas e intente nuevamente.';
                    regError.style.display = 'block';
                }
                return;
            }

            const usuarios = obtenerUsuariosRegistrados();
            const existe = usuarios.some(u => u.email.toLowerCase() === email);

            if (existe) {
                if (regError) {
                    regError.textContent = 'Este correo electrónico ya se encuentra registrado. Utilice Iniciar Sesión.';
                    regError.style.display = 'block';
                }
                return;
            }

            const nuevoUsuario = { nombre, email, telefono, password };
            usuarios.push(nuevoUsuario);
            guardarUsuariosRegistrados(usuarios);
            guardarUsuarioActivo(nuevoUsuario);

            actualizarCabeceraUsuario();
            cerrarModalAuth();
            formRegistro.reset();
        });
    }

    // Cerrar Sesion
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            guardarUsuarioActivo(null);
            actualizarCabeceraUsuario();
            cerrarModalAuth();
        });
    }

    // Enlace Olvido de contraseña
    const enlaceOlvidoPass = document.getElementById('enlaceOlvidoPass');
    if (enlaceOlvidoPass) {
        enlaceOlvidoPass.addEventListener('click', (e) => {
            e.preventDefault();
            const correo = prompt('Ingresa tu correo electrónico para restablecer tu contraseña:');
            if (correo) {
                alert(`Si el correo ${correo} existe en nuestra base de datos, te hemos enviado las instrucciones para restablecer tu contraseña.`);
            }
        });
    }

    // Estado inicial en cabecera
    actualizarCabeceraUsuario();
}



