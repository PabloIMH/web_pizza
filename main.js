// Parallax effect
        // Parallax y rotación en scroll
        window.addEventListener('DOMContentLoaded', function () {
            // Botón de scroll al inicio
            const scrollToTopBtn = document.getElementById('scroll-to-top');
            
            // Mostrar/ocultar botón según la posición del scroll
            window.addEventListener('scroll', function() {
                // Mostrar el botón cuando se ha desplazado más de 500px
                if (window.scrollY > 500) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });
            
            // Función para volver al inicio al hacer clic en el botón
            scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            const bgElement = document.querySelector('.bg-element');
            const floralElement = document.querySelector('.floral-element');
            const stoneElement = document.querySelector('.stone-element');
            const header = document.querySelector('.header');

            window.addEventListener('scroll', function () {
                const scrollValue = window.scrollY;

                // Ajustes de rotación
                const rotationIntensity = 0.1;
                const floralRotation = -15 + scrollY * 0.03;
                const stoneRotation = 15 - scrollY * 0.025;


                // Aplicar transformaciones si los elementos existen
                if (bgElement) {
                    bgElement.style.transform = `translateZ(-15px) scale(2.5) translateY(${scrollValue * 0.1}px)`;
                }

                if (floralElement) {
                    floralElement.style.transform = `translateZ(-5px) scale(1.5) rotate(${floralRotation}deg) translateY(${scrollValue * 0.05}px)`;
                }

                if (stoneElement) {
                    stoneElement.style.transform = `translateZ(-10px) scale(2) rotate(${stoneRotation}deg) translateY(${scrollValue * 0.08}px)`;
                }

                // Estilo dinámico del header
                if (header) {
                    if (scrollValue > 100) {
                        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                        header.style.backdropFilter = 'blur(15px)';
                    } else {
                        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                        header.style.backdropFilter = 'blur(10px)';
                    }
                }
            });
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // Add to cart functionality (basic)
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const item = this.closest('.menu-item').querySelector('.menu-item-title').textContent;
                alert(`${item} añadido al carrito`);

                // Animation for button
                this.textContent = "¡Añadido!";
                this.style.backgroundColor = "var(--white-1)";
                this.style.color = "var(--black-1)";

                setTimeout(() => {
                    this.textContent = "Añadir al carrito";
                    this.style.backgroundColor = "transparent";
                    this.style.color = "var(--white-1)";
                }, 2000);
            });
        });

        // Enhanced scroll animations with different directions
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;

                if (entry.isIntersecting) {
                    // Element is entering viewport - show with entrance animation

                    // Remove any exit animations first
                    element.classList.remove('fade-out', 'slide-out-left', 'slide-out-right', 'slide-out-top', 'scale-out');

                    if (element.classList.contains('menu-item')) {
                        const menuItems = document.querySelectorAll('.menu-item');
                        const index = Array.from(menuItems).indexOf(element);

                        // Alternate animations based on position
                        switch (index % 4) {
                            case 0:
                                element.classList.add('slide-in-left');
                                break;
                            case 1:
                                element.classList.add('slide-in-right');
                                break;
                            case 2:
                                element.classList.add('scale-in');
                                break;
                            case 3:
                                element.classList.add('slide-in-bottom');
                                break;
                        }

                        // Add staggered delay
                        element.style.animationDelay = `${(index % 3) * 0.2}s`;

                    } else if (element.classList.contains('section-title')) {
                        element.classList.add('slide-in-bottom');

                    } else if (element.classList.contains('section-subtitle')) {
                        element.classList.add('fade-in');
                        element.style.animationDelay = '0.3s';

                    } else if (element.classList.contains('testimonial-content')) {
                        element.classList.add('scale-in');

                    } else if (element.classList.contains('about-content')) {
                        element.classList.add('fade-in');
                    }

                } else {
                    // Element is leaving viewport - hide with exit animation

                    // Remove entrance animations first
                    element.classList.remove('fade-in', 'slide-in-left', 'slide-in-right', 'slide-in-bottom', 'scale-in');

                    if (element.classList.contains('menu-item')) {
                        const menuItems = document.querySelectorAll('.menu-item');
                        const index = Array.from(menuItems).indexOf(element);

                        // Alternate exit animations based on position (reverse of entrance)
                        switch (index % 4) {
                            case 0:
                                element.classList.add('slide-out-left');
                                break;
                            case 1:
                                element.classList.add('slide-out-right');
                                break;
                            case 2:
                                element.classList.add('scale-out');
                                break;
                            case 3:
                                element.classList.add('slide-out-top');
                                break;
                        }

                        // Add staggered delay for exit animations too
                        element.style.animationDelay = `${(index % 3) * 0.1}s`;

                    } else if (element.classList.contains('section-title')) {
                        element.classList.add('slide-out-top');

                    } else if (element.classList.contains('section-subtitle')) {
                        element.classList.add('fade-out');
                        element.style.animationDelay = '0.1s';

                    } else if (element.classList.contains('testimonial-content')) {
                        element.classList.add('scale-out');

                    } else if (element.classList.contains('about-content')) {
                        element.classList.add('fade-out');
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements that need animation
        document.querySelectorAll('.menu-item, .section-title, .section-subtitle, .testimonial-content, .about-content').forEach(item => {
            scrollObserver.observe(item);
        });

        // Additional observer for elements that appear later with bidirectional animation
        const additionalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('fade-out');
                    entry.target.classList.add('fade-in');
                } else {
                    entry.target.classList.remove('fade-in');
                    entry.target.classList.add('fade-out');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe additional elements
        document.querySelectorAll('.testimonial-quote, .testimonial-author, .about-text').forEach(item => {
            additionalObserver.observe(item);
        });