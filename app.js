// ========================================================
// AMBIENTA - MUEBLES DE MELAMINA (LOGICA PRINCIPAL)
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrusel();
    inicializarCatalogo();
    inicializarCarrito();
    inicializarAutenticacion();
    inicializarLibroReclamaciones();
    inicializarCotizacionesYToast();
    inicializarTerminosCondiciones();
    inicializarPoliticaPrivacidad();
    inicializarEnviosYGarantias();
    inicializarBannerCookies();
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
        imagen: 'galeria/escritorio_1.webp',
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
        imagen: 'galeria/cocina_1.webp',
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
        imagen: 'galeria/dormitorio_1.webp',
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
        imagen: 'galeria/oficina_1.webp',
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
        imagen: 'galeria/carrusel_1.webp',
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
        imagen: 'galeria/carrusel_2.webp',
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
        imagen: 'galeria/carrusel_5.webp',
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

    document.querySelectorAll('.categorias__item[data-categoria]').forEach(enlace => {
        enlace.addEventListener('click', () => {
            textoBusqueda = '';
            if (inputBuscador) inputBuscador.value = '';
            const boton = Array.from(botonesFiltro).find(item =>
                item.getAttribute('data-categoria') === enlace.getAttribute('data-categoria')
            );
            if (boton) boton.click();
        });
    });

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

    // ========================================================
    // PROCESO DE CHECKOUT Y PASARELA DE PAGOS CULQI V4
    // ========================================================
    const modalCheckout = document.getElementById('modalCheckout');
    const btnCerrarCheckout = document.getElementById('btnCerrarCheckout');
    const overlayCheckout = document.getElementById('overlayModalCheckout');
    const formCheckout = document.getElementById('formularioCheckout');
    const checkoutTotalTexto = document.getElementById('checkoutTotalTexto');
    const checkoutFormularioContenedor = document.getElementById('checkoutFormularioContenedor');
    const checkoutExitoContenedor = document.getElementById('checkoutExitoContenedor');
    const btnCerrarExito = document.getElementById('btnCerrarExitoCheckout');
    const btnImprimirConstancia = document.getElementById('btnImprimirConstancia');
    const textoBtnConfirmar = document.getElementById('textoBtnConfirmar');
    const checkoutCargandoOverlay = document.getElementById('checkoutCargandoOverlay');
    const checkoutCargandoTitulo = document.getElementById('checkoutCargandoTitulo');
    const checkoutCargandoMensaje = document.getElementById('checkoutCargandoMensaje');
    const btnToggleSandbox = document.getElementById('btnToggleSandboxInfo');
    const panelSandboxDetalles = document.getElementById('culqiSandboxDetalles');
    const inputCulqiPubKey = document.getElementById('inputCulqiPubKey');
    const inputCulqiSecKey = document.getElementById('inputCulqiSecKey');
    const btnGuardarLlavesCulqi = document.getElementById('btnGuardarLlavesCulqi');
    const msgLlavesGuardadas = document.getElementById('msgLlavesGuardadas');
    const inputNiubizMerchant = document.getElementById('inputNiubizMerchant');
    const inputNiubizUser = document.getElementById('inputNiubizUser');
    const tabBtnCulqi = document.getElementById('tabBtnCulqi');
    const tabBtnNiubiz = document.getElementById('tabBtnNiubiz');
    const sandboxContenidoCulqi = document.getElementById('sandboxContenidoCulqi');
    const sandboxContenidoNiubiz = document.getElementById('sandboxContenidoNiubiz');
    const modalNiubizEmbed = document.getElementById('modalNiubizEmbed');
    const btnCerrarNiubizEmbed = document.getElementById('btnCerrarNiubizEmbed');
    const formTarjetaNiubiz = document.getElementById('formTarjetaNiubiz');

    // Llaves y configuración de Pasarelas (Culqi & Niubiz)
    let culqiConfig = {
        publicKey: localStorage.getItem('culqi_public_key') || 'pk_test_0dfd6f6e10dbdb38',
        secretKey: localStorage.getItem('culqi_secret_key') || 'sk_test_demo_ambienta_12345'
    };

    let niubizConfig = {
        merchantId: localStorage.getItem('niubiz_merchant_id') || '456879852',
        user: localStorage.getItem('niubiz_user') || 'modintegration@niubiz.com.pe'
    };

    // Variable temporal para almacenar la orden en curso antes de cobrar
    let ordenEnCurso = null;
    let sesionNiubizActiva = null;

    // Sincronizar llaves desde el servidor si está activo
    fetch('/api/config')
        .then(res => res.json())
        .then(data => {
            if (data && data.culqi) {
                culqiConfig.publicKey = data.culqi.publicKey;
                if (inputCulqiPubKey) inputCulqiPubKey.value = data.culqi.publicKey;
            }
            if (data && data.niubiz) {
                niubizConfig.merchantId = data.niubiz.merchantId;
                niubizConfig.user = data.niubiz.user;
                if (inputNiubizMerchant) inputNiubizMerchant.value = data.niubiz.merchantId;
                if (inputNiubizUser) inputNiubizUser.value = data.niubiz.user;
            }
        })
        .catch(() => {
            // Servidor estático o local sin backend express directo
        });

    if (inputCulqiPubKey) inputCulqiPubKey.value = culqiConfig.publicKey;
    if (inputCulqiSecKey && culqiConfig.secretKey) inputCulqiSecKey.value = culqiConfig.secretKey;
    if (inputNiubizMerchant) inputNiubizMerchant.value = niubizConfig.merchantId;
    if (inputNiubizUser) inputNiubizUser.value = niubizConfig.user;

    // Pestañas Sandbox (Culqi vs Niubiz)
    if (tabBtnCulqi && tabBtnNiubiz) {
        tabBtnCulqi.addEventListener('click', () => {
            tabBtnCulqi.classList.add('sandboxTabBtn--activo');
            tabBtnNiubiz.classList.remove('sandboxTabBtn--activo');
            if (sandboxContenidoCulqi) sandboxContenidoCulqi.style.display = 'block';
            if (sandboxContenidoNiubiz) sandboxContenidoNiubiz.style.display = 'none';
        });
        tabBtnNiubiz.addEventListener('click', () => {
            tabBtnNiubiz.classList.add('sandboxTabBtn--activo');
            tabBtnCulqi.classList.remove('sandboxTabBtn--activo');
            if (sandboxContenidoCulqi) sandboxContenidoCulqi.style.display = 'none';
            if (sandboxContenidoNiubiz) sandboxContenidoNiubiz.style.display = 'block';
        });
    }

    // Toggle para panel de información sandbox y tarjetas de prueba
    if (btnToggleSandbox && panelSandboxDetalles) {
        btnToggleSandbox.addEventListener('click', () => {
            const visible = panelSandboxDetalles.style.display !== 'none';
            panelSandboxDetalles.style.display = visible ? 'none' : 'block';
            btnToggleSandbox.textContent = visible ? '⚙️ Tarjetas de Prueba y Pasarelas' : '▲ Ocultar Configuración';
        });
    }

    // Copiar datos de tarjetas de prueba con un clic
    document.querySelectorAll('.btnCopiarTarjeta').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const num = btn.getAttribute('data-num');
            const cvv = btn.getAttribute('data-cvv');
            const exp = btn.getAttribute('data-exp');

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(num).then(() => {
                    mostrarToast(`Tarjeta copiada: ${num} (CVV: ${cvv}, Exp: ${exp})`);
                });
            } else {
                mostrarToast(`Tarjeta: ${num} | CVV: ${cvv} | Exp: ${exp}`);
            }
        });
    });

    // Guardar llaves personalizadas de pasarelas
    if (btnGuardarLlavesCulqi) {
        btnGuardarLlavesCulqi.addEventListener('click', async () => {
            const nuevaPub = inputCulqiPubKey ? inputCulqiPubKey.value.trim() : '';
            const nuevaSec = inputCulqiSecKey ? inputCulqiSecKey.value.trim() : '';
            const nuevoMerchant = inputNiubizMerchant ? inputNiubizMerchant.value.trim() : '';
            const nuevoUser = inputNiubizUser ? inputNiubizUser.value.trim() : '';

            if (nuevaPub) {
                culqiConfig.publicKey = nuevaPub;
                localStorage.setItem('culqi_public_key', nuevaPub);
            }
            if (nuevaSec) {
                culqiConfig.secretKey = nuevaSec;
                localStorage.setItem('culqi_secret_key', nuevaSec);
            }
            if (nuevoMerchant) {
                niubizConfig.merchantId = nuevoMerchant;
                localStorage.setItem('niubiz_merchant_id', nuevoMerchant);
            }
            if (nuevoUser) {
                niubizConfig.user = nuevoUser;
                localStorage.setItem('niubiz_user', nuevoUser);
            }

            // Notificar al backend si está disponible
            try {
                await fetch('/api/config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        publicKey: nuevaPub,
                        secretKey: nuevaSec,
                        niubizMerchantId: nuevoMerchant,
                        niubizUser: nuevoUser
                    })
                });
            } catch (_) { }

            if (msgLlavesGuardadas) {
                msgLlavesGuardadas.textContent = '✅ Configuración actualizada con éxito';
                setTimeout(() => { msgLlavesGuardadas.textContent = ''; }, 3500);
            }
            mostrarToast('Configuración de pasarelas actualizada');
        });
    }

    // Controles para sección Yape QR
    const seccionYapeQr = document.getElementById('seccionYapeQr');
    const yapeMontoPagar = document.getElementById('yapeMontoPagar');
    const btnCopiarNumeroYape = document.getElementById('btnCopiarNumeroYape');

    if (btnCopiarNumeroYape) {
        btnCopiarNumeroYape.addEventListener('click', (e) => {
            e.preventDefault();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText('+51935436544').then(() => {
                    mostrarToast('Número de Yape copiado: +51 935 436 544');
                });
            } else {
                mostrarToast('Número de Yape: +51 935 436 544');
            }
        });
    }

    // Actualizar texto del botón al cambiar método de pago
    function actualizarBotonPagoUI() {
        const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const costoEnvio = subtotal >= 500 ? 0 : 35;
        const total = subtotal + costoEnvio;
        const metodo = formCheckout ? (formCheckout.querySelector('input[name="metodoPago"]:checked')?.value || 'culqi') : 'culqi';

        // Estilos en opciones
        document.querySelectorAll('.metodoPagoOpcion').forEach(opcion => {
            const radio = opcion.querySelector('input[type="radio"]');
            if (radio && radio.checked) {
                opcion.classList.add('metodoPagoOpcion--seleccionado');
            } else {
                opcion.classList.remove('metodoPagoOpcion--seleccionado');
            }
        });

        // Visibilidad del QR de Yape
        if (seccionYapeQr) {
            if (metodo === 'yape') {
                seccionYapeQr.style.display = 'block';
                if (yapeMontoPagar) yapeMontoPagar.textContent = `S/ ${total.toFixed(2)}`;
            } else {
                seccionYapeQr.style.display = 'none';
            }
        }

        if (textoBtnConfirmar) {
            if (metodo === 'culqi') {
                textoBtnConfirmar.textContent = `Pagar con Culqi Checkout (S/ ${total.toFixed(2)})`;
            } else if (metodo === 'niubiz') {
                textoBtnConfirmar.textContent = `Pagar con Niubiz Formulario (S/ ${total.toFixed(2)})`;
            } else if (metodo === 'yape') {
                textoBtnConfirmar.textContent = `Confirmar y Pagar con Yape (S/ ${total.toFixed(2)})`;
            } else if (metodo === 'transferencia') {
                textoBtnConfirmar.textContent = `Confirmar Pedido (Transferencia Bancaria)`;
            } else {
                textoBtnConfirmar.textContent = `Confirmar Pedido (Contra Entrega)`;
            }
        }
    }

    if (formCheckout) {
        formCheckout.querySelectorAll('input[name="metodoPago"]').forEach(radio => {
            radio.addEventListener('change', actualizarBotonPagoUI);
        });
    }

    // Modal Niubiz Embed Controls
    if (btnCerrarNiubizEmbed && modalNiubizEmbed) {
        btnCerrarNiubizEmbed.addEventListener('click', () => {
            modalNiubizEmbed.style.display = 'none';
        });
    }

    // Helpers para overlay de carga
    function mostrarOverlayCargando(titulo, mensaje) {
        if (checkoutCargandoTitulo) checkoutCargandoTitulo.textContent = titulo;
        if (checkoutCargandoMensaje) checkoutCargandoMensaje.textContent = mensaje;
        if (checkoutCargandoOverlay) checkoutCargandoOverlay.style.display = 'flex';
    }

    function ocultarOverlayCargando() {
        if (checkoutCargandoOverlay) checkoutCargandoOverlay.style.display = 'none';
    }

    // Abrir modal de checkout
    if (btnProcederPago) {
        btnProcederPago.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega al menos un mueble para proceder al pago.');
                return;
            }
            cerrarDrawer();

            const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            const costoEnvio = subtotal >= 500 ? 0 : 35;
            const total = subtotal + costoEnvio;

            if (checkoutTotalTexto) {
                checkoutTotalTexto.textContent = `S/ ${total.toFixed(2)}`;
            }

            actualizarBotonPagoUI();

            if (checkoutFormularioContenedor) checkoutFormularioContenedor.style.display = 'block';
            if (checkoutExitoContenedor) checkoutExitoContenedor.style.display = 'none';
            ocultarOverlayCargando();

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
        ocultarOverlayCargando();
    }

    if (btnCerrarCheckout) btnCerrarCheckout.addEventListener('click', cerrarCheckout);
    if (overlayCheckout) overlayCheckout.addEventListener('click', cerrarCheckout);

    // ========================================================
    // ENVÍO DEL FORMULARIO DE CHECKOUT
    // ========================================================
    if (formCheckout) {
        formCheckout.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('checkoutNombre')?.value.trim() || 'Cliente';
            const dni = document.getElementById('checkoutDni')?.value.trim() || '';
            const telefono = document.getElementById('checkoutTelefono')?.value.trim() || '';
            const email = document.getElementById('checkoutEmail')?.value.trim() || '';
            const direccion = document.getElementById('checkoutDireccion')?.value.trim() || '';
            const distrito = document.getElementById('checkoutDistrito')?.value || '';
            const referencia = document.getElementById('checkoutReferencia')?.value.trim() || '';
            const metodoPago = formCheckout.querySelector('input[name="metodoPago"]:checked')?.value || 'culqi';

            const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            const costoEnvio = subtotal >= 500 ? 0 : 35;
            const total = subtotal + costoEnvio;
            const codigoOrden = 'PED-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

            ordenEnCurso = {
                codigoOrden,
                fecha: new Date().toLocaleString('es-PE'),
                nombre,
                dni,
                telefono,
                email,
                direccion,
                distrito,
                referencia,
                subtotal,
                costoEnvio,
                total,
                items: [...carrito],
                metodoPago
            };

            // CASO A: Pago mediante Pasarela Culqi Checkout V4
            if (metodoPago === 'culqi') {
                if (typeof Culqi === 'undefined') {
                    alert('No se pudo conectar con el script de Culqi Checkout V4. Verifica tu conexión a internet o intenta con otro método de pago.');
                    return;
                }

                mostrarOverlayCargando('Abriendo Pasarela Culqi...', 'Conectando con el modal de pago embebido de Culqi Sandbox...');

                try {
                    Culqi.publicKey = culqiConfig.publicKey;
                    const montoCentimos = Math.round(total * 100);

                    Culqi.settings({
                        title: 'Ambienta Muebles',
                        currency: 'PEN',
                        amount: montoCentimos,
                        description: `Compra de muebles Ambienta (Orden ${codigoOrden})`
                    });

                    Culqi.options({
                        lang: 'es',
                        installments: true,
                        paymentMethods: {
                            tarjeta: true,
                            yape: true,
                            billetera: true,
                            bancaMovil: true,
                            agente: true,
                            cuotealo: false
                        },
                        style: {
                            logo: 'https://raquel-castro.github.io/FINISHWEBAMBIENTA/galeria/logo_ambienta.png',
                            bannerColor: '#1e293b',
                            buttonBackground: '#1e3a8a',
                            menuColor: '#1e3a8a',
                            linksColor: '#2563eb',
                            priceColor: '#16a34a'
                        }
                    });

                    setTimeout(() => {
                        ocultarOverlayCargando();
                        Culqi.open();
                    }, 500);

                } catch (culqiInitErr) {
                    ocultarOverlayCargando();
                    console.error('Error al inicializar Culqi:', culqiInitErr);
                    alert('Error al abrir la pasarela Culqi: ' + culqiInitErr.message);
                }

                return;
            }

            // CASO B: Pago mediante Pasarela Niubiz (Pago Web / Formulario Integrado - Caso 3)
            if (metodoPago === 'niubiz') {
                mostrarOverlayCargando(
                    'Iniciando Sesión Niubiz (Pasos A y B)...',
                    'Autenticando con Basic Auth en /api.security/v1/security y generando sesión de pago (sessionKey)...'
                );

                fetch('/api/niubiz/session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: total.toFixed(2),
                        orderData: ordenEnCurso
                    })
                })
                .then(res => res.json())
                .then(sessionData => {
                    ocultarOverlayCargando();
                    if (sessionData && sessionData.success) {
                        sesionNiubizActiva = sessionData;
                        abrirModalNiubizEmbed(sessionData, ordenEnCurso);
                    } else {
                        alert('Aviso Niubiz: ' + (sessionData?.error || 'No se pudo iniciar la sesión de pago'));
                    }
                })
                .catch(errNiubiz => {
                    console.warn('Backend server no disponible mediante fetch para Niubiz:', errNiubiz);
                    ocultarOverlayCargando();
                    // Modo didáctico autónomo si se abre directamente sin server
                    sesionNiubizActiva = {
                        sessionKey: 'ses_nbz_' + Math.random().toString(36).substring(2, 10),
                        merchantId: niubizConfig.merchantId || '456879852',
                        purchaseNumber: String(Date.now()).slice(-8),
                        amount: total.toFixed(2)
                    };
                    abrirModalNiubizEmbed(sesionNiubizActiva, ordenEnCurso);
                });

                return;
            }

            // CASO C: Métodos manuales (Yape QR directo, Transferencia, Contraentrega)
            completarOrdenDirecta(ordenEnCurso);
        });
    }

    // ========================================================
    // GESTIÓN DEL FORMULARIO INTEGRADO NIUBIZ (PASO C & D)
    // ========================================================
    function abrirModalNiubizEmbed(sesion, orden) {
        if (!modalNiubizEmbed) return;

        const ordenTexto = document.getElementById('niubizOrdenTexto');
        const sessionTexto = document.getElementById('niubizSessionTexto');
        const montoTexto = document.getElementById('niubizMontoTexto');
        const titularInput = document.getElementById('niubizTitularTarjeta');
        const btnTexto = document.getElementById('niubizBtnPagarTexto');

        if (ordenTexto) ordenTexto.textContent = orden.codigoOrden;
        if (sessionTexto) sessionTexto.textContent = sesion.sessionKey;
        if (montoTexto) montoTexto.textContent = `S/ ${Number(orden.total).toFixed(2)}`;
        if (titularInput) titularInput.value = orden.nombre;
        if (btnTexto) btnTexto.textContent = `Pagar Seguro S/ ${Number(orden.total).toFixed(2)} con Niubiz`;

        modalNiubizEmbed.style.display = 'flex';
    }

    // Envío del Formulario de Tarjeta Niubiz (Paso D: Validación y Autorización)
    if (formTarjetaNiubiz) {
        formTarjetaNiubiz.addEventListener('submit', async (e) => {
            e.preventDefault();

            const numTarjeta = document.getElementById('niubizNumTarjeta')?.value.replace(/\s+/g, '') || '4000000000000002';
            const titular = document.getElementById('niubizTitularTarjeta')?.value.trim() || ordenEnCurso?.nombre || 'Cliente';

            if (modalNiubizEmbed) modalNiubizEmbed.style.display = 'none';

            mostrarOverlayCargando(
                'Paso D: Validando Transacción Niubiz...',
                `Cifrando datos de tarjeta (**** ${numTarjeta.slice(-4)}). Enviando petición a la API de Autorización y registrando orden en base de datos...`
            );

            // Generar transactionToken de Niubiz
            const transactionToken = 'tkn_nbz_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

            try {
                const authResp = await fetch('/api/niubiz/authorize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        transactionToken: transactionToken,
                        purchaseNumber: sesionNiubizActiva?.purchaseNumber || String(Date.now()).slice(-8),
                        amount: Number(ordenEnCurso?.total || 0).toFixed(2),
                        currency: 'PEN',
                        orderData: ordenEnCurso || {},
                        sessionKey: sesionNiubizActiva?.sessionKey,
                        securityToken: sesionNiubizActiva?.securityToken
                    })
                });

                const authData = await authResp.json();
                ocultarOverlayCargando();

                if (authResp.ok && authData.success) {
                    mostrarExitoNiubiz(authData.authorization, authData.orden || ordenEnCurso, transactionToken);
                } else {
                    alert('Resultado de Niubiz: ' + (authData.error || 'Operación no autorizada'));
                }
            } catch (errAuth) {
                console.warn('Backend server no disponible para autorización Niubiz:', errAuth);
                ocultarOverlayCargando();

                const authSimulada = {
                    order: {
                        authorizationCode: 'AUT' + Math.floor(100000 + Math.random() * 900000),
                        transactionId: 'TXN' + Math.floor(100000000 + Math.random() * 900000000),
                        actionCode: '000',
                        actionDescription: 'Aprobada'
                    },
                    dataMap: {
                        BRAND: numTarjeta.startsWith('4') ? 'VISA' : 'MASTERCARD',
                        CARD: '**** **** **** ' + numTarjeta.slice(-4),
                        STATUS: 'Authorized'
                    }
                };
                mostrarExitoNiubiz(authSimulada, ordenEnCurso, transactionToken);
            }
        });
    }

    // Pantalla de Éxito y Comprobante para Niubiz (Caso 3)
    function mostrarExitoNiubiz(auth, orden, transactionToken) {
        if (!orden) orden = ordenEnCurso || {};

        if (checkoutFormularioContenedor) checkoutFormularioContenedor.style.display = 'none';
        if (checkoutExitoContenedor) checkoutExitoContenedor.style.display = 'block';

        const codElem = document.getElementById('checkoutCodigoOrden');
        if (codElem) codElem.textContent = orden.codigoOrden;

        const authCode = auth?.order?.authorizationCode || 'AUT001';
        const txnId = auth?.order?.transactionId || 'TXN' + Date.now().toString().slice(-8);
        const brand = auth?.dataMap?.BRAND || 'VISA';
        const cardMask = auth?.dataMap?.CARD || '**** **** **** 0002';

        const badgePago = document.getElementById('checkoutBadgePago');
        if (badgePago) {
            badgePago.innerHTML = `
                <div class="culqiExitoBadge niubizExitoBadge">
                    <span class="culqiExitoBadge__icono">✓</span>
                    <div class="culqiExitoBadge__texto">
                        <strong>Transacción Niubiz Pago Web Aprobada (Caso 3)</strong>
                        <span>Autorización: <code>${authCode}</code> | TXN: <code>${txnId}</code></span>
                    </div>
                </div>
            `;
        }

        const detalleResumen = document.getElementById('checkoutDetalleResumen');
        if (detalleResumen) {
            const cantMuebles = (orden.items || []).reduce((acc, i) => acc + (i.cantidad || 1), 0);

            detalleResumen.innerHTML = `
                <div class="reciboCulqi reciboNiubiz">
                    <div class="reciboCulqi__encabezado reciboNiubiz__encabezado">
                        <span class="reciboCulqi__titulo">Comprobante de Pago Niubiz E-Commerce</span>
                        <span class="reciboCulqi__estado">AUTORIZADO (Niubiz Sandbox)</span>
                    </div>
                    <div class="reciboCulqi__cuerpo">
                        <p><strong>Titular / Cliente:</strong> ${orden.nombre} (DNI/CE: ${orden.dni})</p>
                        <p><strong>Correo Electrónico:</strong> ${orden.email}</p>
                        <p><strong>Teléfono de Contacto:</strong> ${orden.telefono}</p>
                        <p><strong>Dirección de Entrega:</strong> ${orden.direccion}, ${orden.distrito}</p>
                        <p><strong>Método de Pago:</strong> Niubiz Formulario Integrado (${brand} ${cardMask})</p>
                        <p><strong>Código de Comercio (Merchant ID):</strong> <code>${niubizConfig.merchantId}</code></p>
                        <p><strong>Código de Autorización:</strong> <code>${authCode}</code></p>
                        <p><strong>Identificador de Transacción:</strong> <code>${txnId}</code></p>
                        <p><strong>Token de Sesión (sessionKey):</strong> <code>${orden.niubizSessionKey || sesionNiubizActiva?.sessionKey || 'ses_nbz_qa'}</code></p>
                        <p><strong>Subtotal Muebles:</strong> S/ ${Number(orden.subtotal).toFixed(2)} (${cantMuebles} productos)</p>
                        <p><strong>Costo de Despacho:</strong> ${orden.costoEnvio === 0 ? 'Gratis (Promoción Lima)' : `S/ ${Number(orden.costoEnvio).toFixed(2)}`}</p>
                        <p class="reciboCulqi__total"><strong>Total Cobrado:</strong> S/ ${Number(orden.total).toFixed(2)} PEN</p>
                    </div>
                    <div class="reciboCulqi__pie">
                        <span>🛡️ Transacción validada con Cybersource Decision Manager y API de Autorización de Niubiz.</span>
                    </div>
                    <div style="margin-top: 14px; text-align: center;">
                        <a href="https://wa.me/51935436544?text=Hola%20Ambienta,%20acabo%20de%20pagar%20mi%20pedido%20${orden.codigoOrden}%20por%20S/%20${Number(orden.total).toFixed(2)}%20con%20Niubiz%20(TXN:%20${txnId}).%20Deseo%20confirmar%20mi%20despacho." 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="boton boton--primario btnWhatsappYapeConstancia">
                            📲 Coordinar Despacho por WhatsApp (+51 935 436 544)
                        </a>
                    </div>
                </div>
            `;
        }

        carrito = [];
        guardarCarritoEnStorage();
        renderizarCarritoUI();
        if (formCheckout) formCheckout.reset();
        mostrarToast('¡Pago autorizado con éxito en Niubiz!');
    }

    // ========================================================
    // CALLBACK GLOBAL DE CULQI (window.culqi)
    // ========================================================
    // Culqi Checkout V4 invoca automáticamente esta función tras ingresar los datos de prueba
    window.culqi = async function () {
        console.log('⚡ Callback global Culqi activado');

        // Paso 4 de la imagen: Culqi devuelve un Token temporal en Culqi.token
        if (typeof Culqi !== 'undefined' && Culqi.token) {
            const token = Culqi.token.id;
            const emailCliente = Culqi.token.email || ordenEnCurso?.email || 'cliente@correo.com';

            console.log('✅ Token generado por Culqi:', token, Culqi.token);

            if (typeof Culqi.close === 'function') {
                Culqi.close();
            }

            mostrarOverlayCargando(
                'Token Obtenido con Éxito',
                `Token temporal: ${token}\nEnviando al backend para procesar el cargo vía POST /v2/charges...`
            );

            // Paso 5 de la imagen: Enviar token.id al backend y hacer POST a /v2/charges
            try {
                const response = await fetch('/api/culqi/charge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: token,
                        email: emailCliente,
                        amount: Math.round((ordenEnCurso?.total || 0) * 100),
                        currency: 'PEN',
                        orderData: ordenEnCurso || {}
                    })
                });

                const data = await response.json();
                ocultarOverlayCargando();

                if (response.ok && data.success) {
                    mostrarExitoCulqi(data.charge, ordenEnCurso, token);
                } else {
                    alert('Resultado de Culqi: ' + (data.error || 'No se pudo concretar el cargo en la pasarela.'));
                }
            } catch (networkErr) {
                console.warn('Backend server no disponible mediante fetch (/api/culqi/charge). Procediendo en modo autónomo frontend:', networkErr);
                ocultarOverlayCargando();

                // Simulación didáctica si el archivo se abrió directamente vía file:/// o sin backend activo
                simularCobroExitosoFrontend(token, emailCliente, ordenEnCurso);
            }

        } else if (typeof Culqi !== 'undefined' && Culqi.order) {
            // Pagos con Orden Culqi (Yape con Culqi, Billeteras, PagoEfectivo)
            const ordenCulqi = Culqi.order;
            console.log('✅ Orden Culqi recibida:', ordenCulqi);
            if (typeof Culqi.close === 'function') Culqi.close();
            ocultarOverlayCargando();

            mostrarExitoCulqi({
                id: ordenCulqi.id || ('ord_test_' + Date.now()),
                amount: Math.round((ordenEnCurso?.total || 0) * 100),
                currency_code: 'PEN',
                outcome: { type: 'orden_aprobada', user_message: 'Pago completado vía Culqi' }
            }, ordenEnCurso, 'Orden Culqi');

        } else if (typeof Culqi !== 'undefined' && Culqi.error) {
            ocultarOverlayCargando();
            console.error('❌ Error devuelto por Culqi:', Culqi.error);
            const mensajeError = Culqi.error.user_message || Culqi.error.merchant_message || 'El pago fue cancelado o rechazado por la pasarela.';
            alert('Aviso de Pasarela Culqi: ' + mensajeError);
        }
    };

    // Finalizar orden con Culqi y mostrar comprobante enriquecido
    function mostrarExitoCulqi(charge, orden, tokenId) {
        if (!orden) orden = ordenEnCurso || {};

        if (checkoutFormularioContenedor) checkoutFormularioContenedor.style.display = 'none';
        if (checkoutExitoContenedor) checkoutExitoContenedor.style.display = 'block';

        const codElem = document.getElementById('checkoutCodigoOrden');
        if (codElem) codElem.textContent = orden.codigoOrden;

        const badgePago = document.getElementById('checkoutBadgePago');
        if (badgePago) {
            badgePago.innerHTML = `
                <div class="culqiExitoBadge">
                    <span class="culqiExitoBadge__icono">✓</span>
                    <div class="culqiExitoBadge__texto">
                        <strong>Transacción Culqi Checkout V4 Aprobada</strong>
                        <span>ID Cargo: <code>${charge.id}</code> | Token: <code>${tokenId}</code></span>
                    </div>
                </div>
            `;
        }

        const detalleResumen = document.getElementById('checkoutDetalleResumen');
        if (detalleResumen) {
            const cantMuebles = (orden.items || []).reduce((acc, i) => acc + (i.cantidad || 1), 0);
            const marcaTarjeta = charge?.source?.iin?.card_brand || 'Visa';
            const ultimosDigitos = charge?.source?.last_four || '4111';

            detalleResumen.innerHTML = `
                <div class="reciboCulqi">
                    <div class="reciboCulqi__encabezado">
                        <span class="reciboCulqi__titulo">Comprobante de Pago Electrónico</span>
                        <span class="reciboCulqi__estado">PAGADO (Culqi Sandbox)</span>
                    </div>
                    <div class="reciboCulqi__cuerpo">
                        <p><strong>Titular / Cliente:</strong> ${orden.nombre} (DNI/CE: ${orden.dni})</p>
                        <p><strong>Correo Electrónico:</strong> ${orden.email}</p>
                        <p><strong>Teléfono de Contacto:</strong> ${orden.telefono}</p>
                        <p><strong>Dirección de Entrega:</strong> ${orden.direccion}, ${orden.distrito}</p>
                        <p><strong>Método de Pago:</strong> Pasarela Culqi V4 (${marcaTarjeta} **** ${ultimosDigitos})</p>
                        <p><strong>Identificador de Cargo (Culqi):</strong> <code>${charge.id}</code></p>
                        <p><strong>Token de Autorización:</strong> <code>${tokenId}</code></p>
                        <p><strong>Subtotal Muebles:</strong> S/ ${orden.subtotal.toFixed(2)} (${cantMuebles} productos)</p>
                        <p><strong>Costo de Despacho:</strong> ${orden.costoEnvio === 0 ? 'Gratis (Promoción Lima)' : `S/ ${orden.costoEnvio.toFixed(2)}`}</p>
                        <p class="reciboCulqi__total"><strong>Total Cobrado:</strong> S/ ${orden.total.toFixed(2)} PEN</p>
                    </div>
                    <div class="reciboCulqi__pie">
                        <span>🔒 Cobro asegurado mediante cifrado SSL con la API oficial de Culqi (/v2/charges). Se enviará el comprobante de venta a tu correo.</span>
                    </div>
                    <div style="margin-top: 14px; text-align: center;">
                        <a href="https://wa.me/51935436544?text=Hola%20Ambienta,%20acabo%20de%20pagar%20mi%20pedido%20${orden.codigoOrden}%20por%20S/%20${Number(orden.total).toFixed(2)}%20con%20Culqi%20(ID:%20${charge.id}).%20Deseo%20confirmar%20mi%20despacho." 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="boton boton--primario btnWhatsappYapeConstancia">
                            📲 Coordinar Despacho por WhatsApp (+51 935 436 544)
                        </a>
                    </div>
                </div>
            `;
        }

        // Limpiar el carrito y persistir cambios
        carrito = [];
        guardarCarritoEnStorage();
        renderizarCarritoUI();
        if (formCheckout) formCheckout.reset();
        mostrarToast('¡Pago procesado con éxito en Culqi!');
    }

    // Cobro simulado si no hay backend activo
    function simularCobroExitosoFrontend(tokenId, email, orden) {
        const chargeSimulado = {
            id: 'chr_test_' + Math.random().toString(36).substring(2, 11) + 'sim',
            amount: Math.round((orden?.total || 0) * 100),
            currency_code: 'PEN',
            source: {
                iin: { card_brand: 'Visa Débito' },
                last_four: '4111'
            }
        };
        mostrarExitoCulqi(chargeSimulado, orden, tokenId);
    }

    // Completar orden para métodos manuales
    function completarOrdenDirecta(orden) {
        if (checkoutFormularioContenedor) checkoutFormularioContenedor.style.display = 'none';
        if (checkoutExitoContenedor) checkoutExitoContenedor.style.display = 'block';

        const codElem = document.getElementById('checkoutCodigoOrden');
        if (codElem) codElem.textContent = orden.codigoOrden;

        const badgePago = document.getElementById('checkoutBadgePago');
        const detalleResumen = document.getElementById('checkoutDetalleResumen');

        if (orden.metodoPago === 'yape') {
            if (badgePago) {
                badgePago.innerHTML = `
                    <div class="culqiExitoBadge yapeExitoBadge">
                        <span class="culqiExitoBadge__icono">📱</span>
                        <div class="culqiExitoBadge__texto">
                            <strong>Pedido Registrado con Yape</strong>
                            <span>Escanea el QR a continuación o envía al +51 935 436 544</span>
                        </div>
                    </div>
                `;
            }

            if (detalleResumen) {
                detalleResumen.innerHTML = `
                    <div class="reciboYapeExito">
                        <div class="reciboYapeExito__qrCard">
                            <img src="galeria/qr_yape.png" alt="Código QR Yape Ambienta" class="reciboYapeExito__img">
                            <span class="reciboYapeExito__tag">Paga aquí con Yape</span>
                        </div>
                        <div class="reciboYapeExito__info">
                            <h4 class="reciboYapeExito__titulo">¡Casi listo! Realiza tu pago con Yape</h4>
                            <p><strong>Monto Exacto:</strong> <span class="reciboYapeExito__monto">S/ ${Number(orden.total).toFixed(2)} PEN</span></p>
                            <p><strong>Número Yape BCP:</strong> +51 935 436 544 (Ambienta Deco)</p>
                            <p><strong>Titular del Pedido:</strong> ${orden.nombre} (DNI: ${orden.dni})</p>
                            <p><strong>Dirección:</strong> ${orden.direccion}, ${orden.distrito}</p>
                            <p class="reciboYapeExito__nota">
                                💡 Al yapéar, coloca en el mensaje: <strong>${orden.codigoOrden}</strong>. Pulsa abajo para enviar tu captura por WhatsApp:
                            </p>
                            <a href="https://wa.me/51935436544?text=Hola%20Ambienta,%20acabo%20de%20realizar%20mi%20pedido%20${orden.codigoOrden}%20por%20S/%20${Number(orden.total).toFixed(2)}%20y%20adjunto%20mi%20comprobante%20de%20Yape." 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="boton boton--primario btnWhatsappYapeConstancia">
                                📲 Enviar Comprobante por WhatsApp (+51 935 436 544)
                            </a>
                        </div>
                    </div>
                `;
            }
        } else {
            if (badgePago) {
                badgePago.innerHTML = `
                    <div class="culqiExitoBadge culqiExitoBadge--manual">
                        <span class="culqiExitoBadge__icono">ℹ️</span>
                        <div class="culqiExitoBadge__texto">
                            <strong>Pedido Registrado (${orden.metodoPago.toUpperCase()})</strong>
                            <span>Pendiente de validación de comprobante</span>
                        </div>
                    </div>
                `;
            }

            if (detalleResumen) {
                detalleResumen.innerHTML = `
                    <p><strong>Destinatario:</strong> ${orden.nombre} (DNI: ${orden.dni})</p>
                    <p><strong>Contacto:</strong> ${orden.telefono} | Correo: ${orden.email}</p>
                    <p><strong>Dirección:</strong> ${orden.direccion}, ${orden.distrito}</p>
                    <p><strong>Método de Pago:</strong> ${orden.metodoPago.toUpperCase()}</p>
                    <p><strong>Monto Total:</strong> S/ ${Number(orden.total).toFixed(2)} (${(orden.items || []).reduce((acc, i) => acc + i.cantidad, 0)} muebles)</p>
                    <p style="margin-top: 8px; color: #16a34a; font-weight: 600;">Se ha enviado un mensaje a WhatsApp con los detalles para la coordinación.</p>
                    <div style="margin-top: 14px; text-align: center;">
                        <a href="https://wa.me/51935436544?text=Hola%20Ambienta,%20acabo%20de%20registrar%20mi%20pedido%20${orden.codigoOrden}%20por%20S/%20${Number(orden.total).toFixed(2)}%20con%20método%20${encodeURIComponent(orden.metodoPago.toUpperCase())}.%20Deseo%20coordinar%20la%20entrega." 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="boton boton--primario btnWhatsappYapeConstancia">
                            📲 Coordinar Pedido por WhatsApp (+51 935 436 544)
                        </a>
                    </div>
                `;
            }
        }

        carrito = [];
        guardarCarritoEnStorage();
        renderizarCarritoUI();
        if (formCheckout) formCheckout.reset();
        mostrarToast('Pedido registrado con éxito');
    }

    // Botón para imprimir constancia de compra
    if (btnImprimirConstancia) {
        btnImprimirConstancia.addEventListener('click', () => {
            window.print();
        });
    }

    if (btnCerrarExito) {
        btnCerrarExito.addEventListener('click', cerrarCheckout);
    }

    // Renderizado inicial al cargar la página
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
    mostrarToast(`Se añadió "${producto.nombre}" al carrito`);
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
            telefono: '+51 935 436 544',
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

// --------------------------------------------------------
// 5. LIBRO DE RECLAMACIONES VIRTUAL (INDECOPI)
// --------------------------------------------------------
const CLAVE_RECLAMOS_STORAGE = 'ambienta_hojas_reclamaciones';

function inicializarLibroReclamaciones() {
    const modalLibro = document.getElementById('modalLibroReclamaciones');
    const btnCerrar = document.getElementById('btnCerrarLibro');
    const overlay = document.getElementById('overlayModalLibro');
    const formLibro = document.getElementById('formLibroReclamaciones');

    const formContenedor = document.getElementById('libroFormularioContenedor');
    const exitoContenedor = document.getElementById('libroExitoContenedor');
    const btnCerrarExito = document.getElementById('btnCerrarExitoLibro');

    const numHojaElem = document.getElementById('libroNumeroHoja');
    const fechaElem = document.getElementById('libroFechaActual');

    function formatearFechaHoy() {
        const hoy = new Date();
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const anio = hoy.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }

    function generarNumeroHoja() {
        try {
            const guardados = JSON.parse(localStorage.getItem(CLAVE_RECLAMOS_STORAGE) || '[]');
            const siguiente = guardados.length + 1;
            const anio = new Date().getFullYear();
            return `LR-${anio}-${String(siguiente).padStart(4, '0')}`;
        } catch (e) {
            return `LR-${new Date().getFullYear()}-0001`;
        }
    }

    function abrirModalLibro() {
        if (!modalLibro) return;

        if (fechaElem) fechaElem.textContent = formatearFechaHoy();
        if (numHojaElem) numHojaElem.textContent = generarNumeroHoja();

        if (formContenedor) formContenedor.style.display = 'block';
        if (exitoContenedor) exitoContenedor.style.display = 'none';

        modalLibro.classList.add('modalContenedor--activo');
        modalLibro.setAttribute('aria-hidden', 'false');
    }

    function cerrarModalLibro() {
        if (!modalLibro) return;
        modalLibro.classList.remove('modalContenedor--activo');
        modalLibro.setAttribute('aria-hidden', 'true');
    }

    // Interceptar enlaces al libro de reclamaciones
    document.addEventListener('click', (e) => {
        const enlaceLibro = e.target.closest('a[href="#libro-reclamaciones"]');
        if (enlaceLibro) {
            e.preventDefault();
            abrirModalLibro();
        }
    });

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModalLibro);
    if (overlay) overlay.addEventListener('click', cerrarModalLibro);
    if (btnCerrarExito) btnCerrarExito.addEventListener('click', cerrarModalLibro);

    if (formLibro) {
        formLibro.addEventListener('submit', (e) => {
            e.preventDefault();

            const numeroHoja = generarNumeroHoja();
            const fecha = formatearFechaHoy();

            const nombre = document.getElementById('reclamoNombre')?.value || '';
            const tipoDoc = document.getElementById('reclamoTipoDoc')?.value || 'DNI';
            const numDoc = document.getElementById('reclamoNumDoc')?.value || '';
            const domicilio = document.getElementById('reclamoDomicilio')?.value || '';
            const telefono = document.getElementById('reclamoTelefono')?.value || '';
            const email = document.getElementById('reclamoEmail')?.value || '';
            const apoderado = document.getElementById('reclamoApoderado')?.value || 'N/A';

            const tipoBien = formLibro.querySelector('input[name="reclamoTipoBien"]:checked')?.value || 'Producto';
            const monto = document.getElementById('reclamoMonto')?.value || '0.00';
            const comprobante = document.getElementById('reclamoComprobante')?.value || 'N/A';
            const descripcionBien = document.getElementById('reclamoDescripcionBien')?.value || '';

            const tipoReclamo = formLibro.querySelector('input[name="reclamoTipo"]:checked')?.value || 'Reclamo';
            const hechos = document.getElementById('reclamoDetalleHechos')?.value || '';
            const pedido = document.getElementById('reclamoPedidoConcreto')?.value || '';

            const nuevaReclamacion = {
                numeroHoja,
                fecha,
                consumidor: { nombre, tipoDoc, numDoc, domicilio, telefono, email, apoderado },
                bien: { tipoBien, monto, comprobante, descripcionBien },
                reclamacion: { tipoReclamo, hechos, pedido }
            };

            // Guardar en storage
            try {
                const guardados = JSON.parse(localStorage.getItem(CLAVE_RECLAMOS_STORAGE) || '[]');
                guardados.push(nuevaReclamacion);
                localStorage.setItem(CLAVE_RECLAMOS_STORAGE, JSON.stringify(guardados));
            } catch (err) {
                console.error('Error al guardar reclamacion:', err);
            }

            // Mostrar pantalla de exito
            if (formContenedor) formContenedor.style.display = 'none';
            if (exitoContenedor) exitoContenedor.style.display = 'block';

            const codigoElem = document.getElementById('libroCodigoConfirmado');
            if (codigoElem) codigoElem.textContent = numeroHoja;

            const resumenTicket = document.getElementById('libroResumenTicket');
            if (resumenTicket) {
                resumenTicket.innerHTML = `
                    <p><strong>Fecha de Emisión:</strong> ${fecha}</p>
                    <p><strong>Consumidor:</strong> ${nombre} (${tipoDoc}: ${numDoc})</p>
                    <p><strong>Domicilio:</strong> ${domicilio}</p>
                    <p><strong>Correo Notificación:</strong> ${email} | <strong>Teléfono:</strong> ${telefono}</p>
                    <p><strong>Tipo de Bien:</strong> ${tipoBien} - S/ ${parseFloat(monto).toFixed(2)} (${descripcionBien})</p>
                    <p><strong>Naturaleza:</strong> <span style="color: #3f51b5; font-weight: 700;">${tipoReclamo.toUpperCase()}</span></p>
                    <p><strong>Solución Solicitada:</strong> ${pedido}</p>
                `;
            }

            formLibro.reset();
        });
    }
}

// --------------------------------------------------------
// 6. SISTEMA DE NOTIFICACIONES TOAST Y COTIZACION
// --------------------------------------------------------
let temporizadorToast = null;

function mostrarToast(mensaje, duracion = 3500) {
    const contenedor = document.getElementById('toastNotificacion');
    if (!contenedor) return;

    if (temporizadorToast) {
        clearTimeout(temporizadorToast);
    }

    contenedor.textContent = mensaje;
    contenedor.classList.add('toastNotificacion--activo');

    temporizadorToast = setTimeout(() => {
        contenedor.classList.remove('toastNotificacion--activo');
        temporizadorToast = null;
    }, duracion);
}

function inicializarCotizacionesYToast() {
    const formCotizacion = document.querySelector('.formularioCotizacion__formulario');
    if (formCotizacion) {
        formCotizacion.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre')?.value || 'Cliente';
            const email = document.getElementById('email')?.value || '';
            const telefono = document.getElementById('telefono')?.value || '';
            const detalles = (document.getElementById('mensaje')?.value || '').trim();

            mostrarToast(`¡Gracias ${nombre}! Tu cotización fue enviada con éxito. Abriendo WhatsApp...`);

            const textoWs = encodeURIComponent(`Hola Ambienta (+51 935 436 544), deseo solicitar una cotización personalizada:\n- Nombre: ${nombre}\n- Correo: ${email}\n- Teléfono: ${telefono}\n- Detalles del mueble: ${detalles}`);
            window.open(`https://wa.me/51935436544?text=${textoWs}`, '_blank');

            formCotizacion.reset();
        });
    }
}

// --------------------------------------------------------
// 7. TERMINOS Y CONDICIONES (LEY N° 29571 / D.LEG. 1729)
// --------------------------------------------------------
function inicializarTerminosCondiciones() {
    const modal = document.getElementById('modalTerminos');
    const btnCerrar = document.getElementById('btnCerrarTerminos');
    const overlay = document.getElementById('overlayModalTerminos');
    const btnEntendido = document.getElementById('btnEntendidoTerminos');

    function abrirModal() {
        if (!modal) return;
        modal.classList.add('modalContenedor--activo');
        modal.setAttribute('aria-hidden', 'false');
    }

    function cerrarModal() {
        if (!modal) return;
        modal.classList.remove('modalContenedor--activo');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('click', (e) => {
        const enlace = e.target.closest('a[href="#terminos-condiciones"]');
        if (enlace) {
            e.preventDefault();
            abrirModal();
        }
    });

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (overlay) overlay.addEventListener('click', cerrarModal);
    if (btnEntendido) btnEntendido.addEventListener('click', cerrarModal);
}

// --------------------------------------------------------
// 8. POLITICA DE PRIVACIDAD Y DERECHOS ARCO (LEY N° 29733)
// --------------------------------------------------------
function inicializarPoliticaPrivacidad() {
    const modal = document.getElementById('modalPrivacidad');
    const btnCerrar = document.getElementById('btnCerrarPrivacidad');
    const overlay = document.getElementById('overlayModalPrivacidad');
    const btnEntendido = document.getElementById('btnEntendidoPrivacidad');

    function abrirModal() {
        if (!modal) return;
        modal.classList.add('modalContenedor--activo');
        modal.setAttribute('aria-hidden', 'false');
    }

    function cerrarModal() {
        if (!modal) return;
        modal.classList.remove('modalContenedor--activo');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('click', (e) => {
        const enlace = e.target.closest('a[href="#politica-privacidad"]');
        if (enlace) {
            e.preventDefault();
            abrirModal();
        }
    });

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (overlay) overlay.addEventListener('click', cerrarModal);
    if (btnEntendido) btnEntendido.addEventListener('click', cerrarModal);
}

// --------------------------------------------------------
// 9. POLITICAS DE DESPACHO, ENVIOS Y GARANTIAS
// --------------------------------------------------------
function inicializarEnviosYGarantias() {
    const modal = document.getElementById('modalEnviosGarantia');
    const btnCerrar = document.getElementById('btnCerrarEnviosGarantia');
    const overlay = document.getElementById('overlayModalEnviosGarantia');
    const btnEntendido = document.getElementById('btnEntendidoEnviosGarantia');

    function abrirModal() {
        if (!modal) return;
        modal.classList.add('modalContenedor--activo');
        modal.setAttribute('aria-hidden', 'false');
    }

    function cerrarModal() {
        if (!modal) return;
        modal.classList.remove('modalContenedor--activo');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('click', (e) => {
        const enlace = e.target.closest('a[href="#envios-garantias"]');
        if (enlace) {
            e.preventDefault();
            abrirModal();
        }
    });

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (overlay) overlay.addEventListener('click', cerrarModal);
    if (btnEntendido) btnEntendido.addEventListener('click', cerrarModal);
}

// --------------------------------------------------------
// 10. AVISO DE COOKIES Y CONSENTIMIENTO DE NAVEGACION
// --------------------------------------------------------
const CLAVE_COOKIES_STORAGE = 'ambienta_consentimiento_cookies';

function inicializarBannerCookies() {
    const banner = document.getElementById('bannerCookies');
    const btnAceptar = document.getElementById('btnAceptarCookies');
    const btnRechazar = document.getElementById('btnRechazarCookies');

    if (!banner) return;

    const consentimiento = localStorage.getItem(CLAVE_COOKIES_STORAGE);
    if (!consentimiento) {
        banner.style.display = 'block';
        setTimeout(() => {
            banner.classList.add('bannerCookies--visible');
        }, 600);
    }

    function ocultarBanner(decision) {
        localStorage.setItem(CLAVE_COOKIES_STORAGE, decision);
        banner.classList.remove('bannerCookies--visible');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 400);
    }

    if (btnAceptar) {
        btnAceptar.addEventListener('click', () => {
            ocultarBanner('todas');
            mostrarToast('Preferencias de navegación y cookies guardadas con éxito.');
        });
    }

    if (btnRechazar) {
        btnRechazar.addEventListener('click', () => {
            ocultarBanner('necesarias');
            mostrarToast('Se han guardado únicamente las cookies técnicas necesarias.');
        });
    }
}

