document.addEventListener('DOMContentLoaded', function () {
    function initCarousel(carouselContainer) {
        const carousel = carouselContainer.querySelector('.carousel-inner');
        const dots = carouselContainer.querySelectorAll('.carousel-dot');
        const prevBtn = carouselContainer.querySelector('.carousel-btn.prev');
        const nextBtn = carouselContainer.querySelector('.carousel-btn.next');
        const video = carouselContainer.querySelector('iframe');
        let currentSlide = 0;
        let autoplayInterval;
        let isVideoPlaying = false;

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 50}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            if (!isVideoPlaying) {
                currentSlide = (currentSlide + 1) % 2;
                updateCarousel();
            }
        }

        function prevSlide() {
            if (!isVideoPlaying) {
                currentSlide = (currentSlide - 1 + 2) % 2;
                updateCarousel();
            }
        }

        function startAutoplay() {
            stopAutoplay(); // Limpia cualquier intervalo existente
            if (!isVideoPlaying) {
                autoplayInterval = setInterval(nextSlide, 5000);
            }
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        // Video event listeners
        if (video) {
            // Cargar API de YouTube
            let tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = function () {
                new YT.Player(video, {
                    events: {
                        'onStateChange': function (event) {
                            // event.data == 1 significa que el video está reproduciéndose
                            isVideoPlaying = event.data === 1;
                            if (isVideoPlaying) {
                                stopAutoplay();
                            } else {
                                startAutoplay();
                            }
                        }
                    }
                });
            };
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (!isVideoPlaying) {
                    currentSlide = index;
                    updateCarousel();
                }
            });
        });

        // Iniciar autoplay
        startAutoplay();
    }

    // Inicializar todos los carruseles
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => initCarousel(carousel));


});

//Contacto por WhatsApp

function enviarWhatsApp(event) {
    event.preventDefault();

    // Obtener valores
    const nombre = document.getElementById('username').value.trim();
    const email = document.getElementById('hash').value.trim();
    const comentarios = document.getElementById('comments').value.trim();

    // Validar campos requeridos
    if (!nombre || !email || !comentarios) {
        alert('Por favor complete todos los campos');
        return false;
    }

    // Crear mensaje
    mensaje = `https://api.whatsapp.com/send?phone=573117618411&text=*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Mensaje:* ${comentarios}`;

    // Abrir WhatsApp
    window.open(mensaje, '_blank');

    // Limpiar formulario
    document.getElementById('contactForm').reset();

    return false;
}

