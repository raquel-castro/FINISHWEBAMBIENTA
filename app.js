// ========================================================
// AMBIENTA - MUEBLES DE MELAMINA (LOGICA PRINCIPAL)
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrusel();
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
