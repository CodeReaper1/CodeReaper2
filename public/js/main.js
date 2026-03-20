window.ApexThemeInit = function ($) {

    "use strict";

    /***************************
                                                at start
            !----SWUP Configuration----!

    ***************************/
    // const options = {
    //     containers: ['#swupMain', '#swupMenu'],
    //     animateHistoryBrowsing: true,
    //     linkSelector: 'a:not([data-no-swup])',
    //     animationSelector: '[class="mil-main-transition"]'
    // };
    // const swup = new Swup(options);

    /***************************
                                             at start
    register gsap plugins

    ***************************/
    function initGsapPlugins() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    }
    initGsapPlugins();

    /***************************

    color variables

    ***************************/
    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************
                                             at start
    preloader
    
    ***************************/
    function initPreloader() {
        if (!$('.mil-preloader').length) return;

        var timeline = gsap.timeline();

        timeline.to(".mil-preloader-animation", {
            opacity: 1,
        });

        if ($('.mil-animation-1 .mil-h3').length) {
            timeline.fromTo(
                ".mil-animation-1 .mil-h3", {
                y: "30px",
                opacity: 0
            }, {
                y: "0px",
                opacity: 1,
                stagger: 0.4
            });

            timeline.to(".mil-animation-1 .mil-h3", {
                opacity: 0,
                y: '-30',
            }, "+=.3");
        }

        if ($('.mil-reveal-box').length) {
            timeline.fromTo(".mil-reveal-box", 0.1, {
                opacity: 0,
            }, {
                opacity: 1,
                x: '-30',
            });

            timeline.to(".mil-reveal-box", 0.45, {
                width: "100%",
                x: 0,
            }, "+=.1");
            timeline.to(".mil-reveal-box", {
                right: "0"
            });
            timeline.to(".mil-reveal-box", 0.3, {
                width: "0%"
            });
        }

        if ($('.mil-animation-2 .mil-h3').length) {
            timeline.fromTo(".mil-animation-2 .mil-h3", {
                opacity: 0,
            }, {
                opacity: 1,
            }, "-=.5");
            timeline.to(".mil-animation-2 .mil-h3", 0.6, {
                opacity: 0,
                y: '-30'
            }, "+=.5");
        }

        timeline.to(".mil-preloader", 0.8, {
            opacity: 0,
            ease: 'sine',
        }, "+=.2");

        if ($('.mil-up').length) {
            timeline.fromTo(".mil-up", 0.8, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                onComplete: function () {
                    $('.mil-preloader').addClass("mil-hidden");
                },
            }, "-=1");
        } else {
            timeline.call(function () {
                $('.mil-preloader').addClass("mil-hidden");
            });
        }
    }

    // Add a slight delay to allow Nuxt/Vue to fully mount DOM nodes
    setTimeout(() => {
        initPreloader();
    }, 100);

    /***************************
    
    anchor scroll

    ***************************/
    function initAnchorScroll() {
        $(document).on('click', 'a[href^="#"]', function (event) {
            event.preventDefault();

            var target = $($.attr(this, 'href'));
            var offset = 0;

            if ($(window).width() < 1200) {
                offset = 90;
            }

            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 400);
        });
    }
    initAnchorScroll();

    /***************************

    append

    ***************************/
    // Global flag to track initialization
    let isInitialized = false;

    function cleanupElements() {
        $(".mil-arrow-place .mil-arrow").remove();
        $(".mil-animation .mil-dodecahedron").remove();
        $(".mil-lines-place .mil-lines").remove();
    }

    function appendElements() {
        if (!$(".mil-arrow-place").find(".mil-arrow").length) {
            let arrow = $(".mil-arrow").first().clone();
            $(".mil-arrow-place").append(arrow);
        }

        if (!$(".mil-animation").find(".mil-dodecahedron").length) {
            let dodecahedron = $(".mil-dodecahedron").first().clone();
            $(".mil-animation").append(dodecahedron);
        }

        if (!$(".mil-lines-place").find(".mil-lines").length) {
            let lines = $(".mil-lines").first().clone();
            $(".mil-lines-place").append(lines);
        }
    }

    window.initAppend = function () {
        if (isInitialized) return;

        $(document).ready(function () {


            cleanupElements();
            appendElements();
            isInitialized = true;
        });
    };

    window.reinitAppend = function () {
        isInitialized = false; // Reset the flag on page transition

        $(document).ready(function () {
            cleanupElements();
            appendElements();
            isInitialized = true;
        });
    };

    // Add a cleanup function for SWUP before content replacement
    document.addEventListener("swup:willReplaceContent", function () {
        isInitialized = false;
        cleanupElements();
    });

    // Delay initialization to avoid Vue hydration mismatch
    setTimeout(() => {
        if (window.initAppend) window.initAppend();
    }, 100);

    /***************************

    accordion

    ***************************/
    window.initAccordion = function () {
        let groups = gsap.utils.toArray(".mil-accordion-group");
        let menus = gsap.utils.toArray(".mil-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".mil-accordion-menu");
            let box = element.querySelector(".mil-accordion-content");
            let symbol = element.querySelector(".mil-symbol");
            let minusElement = element.querySelector(".mil-minus");
            let plusElement = element.querySelector(".mil-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }
    }
    if (window.initAccordion) window.initAccordion();

    /***************************

    back to top

    ***************************/
    function initBackToTop() {
        const btt = document.querySelector(".mil-back-to-top .mil-link");
        if (!btt) return;

        gsap.set(btt, {
            x: -30,
            opacity: 0,
        });

        gsap.to(btt, {
            x: 0,
            opacity: 1,
            ease: 'sine',
            scrollTrigger: {
                trigger: "body",
                start: "top -40%",
                end: "top -40%",
                toggleActions: "play none reverse none"
            }
        });
    }
    setTimeout(() => {
        initBackToTop();
    }, 100);

    /***************************
                                             at start
    cursor

    ***************************/
    const cursor = document.querySelector('.mil-ball');

    function initCursor() {
        const cursor = document.querySelector('.mil-ball');
        if (!cursor) return;

        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
        });

        document.addEventListener('pointermove', movecursor);

        function movecursor(e) {
            gsap.to(cursor, {
                duration: 0.6,
                ease: 'sine',
                x: e.clientX,
                y: e.clientY,
            });
        }

        $('.mil-drag, .mil-more, .mil-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.mil-drag, .mil-more, .mil-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.mil-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('mil-accent');
        });

        $('.mil-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('mil-accent');
        });

        $('.mil-drag').mouseover(function () {
            if ($('.mil-ball .mil-icon-1').length) {
                gsap.to($('.mil-ball .mil-icon-1'), .2, {
                    scale: '1',
                    ease: 'sine',
                });
            }
        });

        $('.mil-drag').mouseleave(function () {
            if ($('.mil-ball .mil-icon-1').length) {
                gsap.to($('.mil-ball .mil-icon-1'), .2, {
                    scale: '0',
                    ease: 'sine',
                });
            }
        });

        $('.mil-more').mouseover(function () {
            if ($('.mil-ball .mil-more-text').length) {
                gsap.to($('.mil-ball .mil-more-text'), .2, {
                    scale: '1',
                    ease: 'sine',
                });
            }
        });

        $('.mil-more').mouseleave(function () {
            if ($('.mil-ball .mil-more-text').length) {
                gsap.to($('.mil-ball .mil-more-text'), .2, {
                    scale: '0',
                    ease: 'sine',
                });
            }
        });

        $('.mil-choose').mouseover(function () {
            if ($('.mil-ball .mil-choose-text').length) {
                gsap.to($('.mil-ball .mil-choose-text'), .2, {
                    scale: '1',
                    ease: 'sine',
                });
            }
        });

        $('.mil-choose').mouseleave(function () {
            if ($('.mil-ball .mil-choose-text').length) {
                gsap.to($('.mil-ball .mil-choose-text'), .2, {
                    scale: '0',
                    ease: 'sine',
                });
            }
        });

        $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            if ($('.mil-ball svg').length) {
                gsap.to($('.mil-ball svg'), .2, {
                    scale: 0,
                });
            }
        });

        $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            if ($('.mil-ball svg').length) {
                gsap.to($('.mil-ball svg'), .2, {
                    scale: 1,
                });
            }
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
    }

    setTimeout(() => {
        initCursor();
    }, 100);

    /***************************

     menu

    ***************************/
    function initMenu() {
        $('.mil-menu-btn').on("click", function () {
            $('.mil-menu-btn').toggleClass('mil-active');
            $('.mil-menu').toggleClass('mil-active');
            $('.mil-menu-frame').toggleClass('mil-active');
        });
    }
    initMenu();

    /***************************

    main menu

    ***************************/
    function initMainMenu() {
        $('.mil-has-children a').on('click', function () {
            $('.mil-has-children ul').removeClass('mil-active');
            $('.mil-has-children a').removeClass('mil-active');
            $(this).toggleClass('mil-active');
            $(this).next().toggleClass('mil-active');
        });
    }
    initMainMenu();

    /***************************

    progressbar

    ***************************/
    function initProgressbar() {
        if ($('.mil-progress').length) {
            gsap.to('.mil-progress', {
                height: '100%',
                ease: 'sine',
                scrollTrigger: {
                    scrub: 0.3
                }
            });
        }
    }

    setTimeout(() => {
        initProgressbar();
    }, 100);

    /***************************

    scroll animations

    ***************************/
    window.initScrollAnimations = function () {
        // Add necessary CSS for mil-up transitions with higher specificity
        if (!document.getElementById('mil-up-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'mil-up-styles';
            styleEl.textContent = `
                /* Use higher specificity by adding html prefix */
                html body .mil-up {
                    opacity: 0 !important;
                    transform: translate3d(0, 40px, 0) scale(0.98) !important;
                    transition: opacity 0.4s ease, transform 0.4s ease !important;
                }
                
                html body .mil-up.is-visible {
                    opacity: 1 !important;
                    transform: translate3d(0, 0, 0) scale(1) !important;
                }
                
                html body .mil-up.is-hidden {
                    opacity: 0 !important;
                    transform: translate3d(0, 40px, 0) scale(0.98) !important;
                }
            `;
            document.head.appendChild(styleEl);
        }

        // Replace mil-up animations with IntersectionObserver
        const appearance = document.querySelectorAll(".mil-up");

        if ('IntersectionObserver' in window) {
            // Disconnect old observer if it exists from a previous page route
            if (window.milUpObserver) {
                window.milUpObserver.disconnect();
            }

            // Create the observer instance
            const appearanceObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add visible class and remove hidden class with a slight delay
                        // to ensure the transition animation works
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                            entry.target.classList.remove('is-hidden');
                        }, 10);
                    } else {
                        // Only apply reverse animation if it was visible before
                        if (entry.target.classList.contains('is-visible')) {
                            entry.target.classList.remove('is-visible');
                            entry.target.classList.add('is-hidden');
                        }
                    }
                });
            }, {
                threshold: 0.1,  // Trigger when at least 10% of the element is visible
                rootMargin: '0px 0px -10% 0px' // Adjusts the trigger point
            });

            // Apply observer to all mil-up elements
            appearance.forEach(section => {
                // Reset elements to correct starting state on re-init
                section.classList.remove('is-visible');
                section.classList.add('is-hidden');
                appearanceObserver.observe(section);
            });

            // Store the observer in window so it can be accessed later if needed
            window.milUpObserver = appearanceObserver;
        } else {
            // Fallback to GSAP for browsers that don't support IntersectionObserver
            appearance.forEach((section) => {
                gsap.fromTo(section, {
                    opacity: 0,
                    y: 40,
                    scale: .98,
                    ease: 'sine',
                }, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: .4,
                    scrollTrigger: {
                        trigger: section,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        // The rest of the animations remain unchanged with GSAP

        // Scale animations (unchanged)
        const scaleImage = document.querySelectorAll(".mil-scale");
        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,
            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        // Parallax animations (unchanged)
        const parallaxImage = document.querySelectorAll(".mil-parallax");
        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,
                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        // Rotate animations (unchanged)
        const rotate = document.querySelectorAll(".mil-rotate");
        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,
            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    // Helper function to refresh animations after content changes
    window.refreshScrollAnimations = function () {
        // Refresh GSAP ScrollTriggers
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }

        // Re-initialize all animations
        window.initScrollAnimations();
    };

    setTimeout(() => {
        if (window.initScrollAnimations) window.initScrollAnimations();
    }, 100);
    /***************************

    fancybox

    ***************************/
    function initFancybox() {
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
                "slideShow",
                "zoom",
                "fullScreen",
                "close"
            ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
    }
    initFancybox();

    /***************************

    reviews slider

    ***************************/
    function initReviewsSlider() {
        var menu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>']
        var mySwiper = new Swiper('.mil-reviews-slider', {
            // If we need pagination
            pagination: {
                el: '.mil-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (menu[index]) + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.mil-revi-next',
                prevEl: '.mil-revi-prev',
            },
        })
    }
    initReviewsSlider();

    /***************************

    infinite slider

    ***************************/
    window.initInfiniteSlider = function () {
        var swiper = new Swiper('.mil-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });
    }
    if (window.initInfiniteSlider) window.initInfiniteSlider();

    /***************************

    portfolio slider

    ***************************/
    window.initPortfolioSlider = function () {
        var swiper = new Swiper('.mil-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            preventClicks: false,
            preventClicksPropagation: false,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
    };
    if (window.initPortfolioSlider) window.initPortfolioSlider();

    /***************************

    1 item slider

    ***************************/
    window.initItemSlider1 = function () {
        var swiper = new Swiper('.mil-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
    }
    initItemSlider1();

    /***************************

    2 item slider

    ***************************/
    window.initItemSlider2 = function () {
        var swiper = new Swiper('.mil-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });
    }
    initItemSlider2();
    /*----------------------------------------------------------
    ------------------------------------------------------------
    
    REINIT
    
    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        function reinitScrollTop() {
            $('html, body').animate({
                scrollTop: 0,
            }, 0);
        }
        reinitScrollTop();

        window.reinitProgressBar = function () {
            gsap.to('.mil-progress', {
                height: 0,
                ease: 'sine',
                onComplete: () => {
                    ScrollTrigger.refresh()
                },
            });
        }
        reinitProgressBar();

        /***************************
    
         menu
    
        ***************************/
        function reinitMenu() {
            $('.mil-menu-btn').removeClass('mil-active');
            $('.mil-menu').removeClass('mil-active');
            $('.mil-menu-frame').removeClass('mil-active');
        }
        reinitMenu();

        /***************************
    
        append
    
        ***************************/
        reinitAppend();

        /***************************
    
        accordion
    
        ***************************/
        function reinitAccordion() {
            let groups = gsap.utils.toArray(".mil-accordion-group");
            let menus = gsap.utils.toArray(".mil-accordion-menu");
            let menuToggles = groups.map(createAnimation);

            menus.forEach((menu) => {
                menu.addEventListener("click", () => toggleMenu(menu));
            });

            function toggleMenu(clickedMenu) {
                menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
            }

            function createAnimation(element) {
                let menu = element.querySelector(".mil-accordion-menu");
                let box = element.querySelector(".mil-accordion-content");
                let symbol = element.querySelector(".mil-symbol");
                let minusElement = element.querySelector(".mil-minus");
                let plusElement = element.querySelector(".mil-plus");

                gsap.set(box, {
                    height: "auto",
                });

                let animation = gsap
                    .timeline()
                    .from(box, {
                        height: 0,
                        duration: 0.4,
                        ease: "sine"
                    })
                    .from(minusElement, {
                        duration: 0.4,
                        autoAlpha: 0,
                        ease: "none",
                    }, 0)
                    .to(plusElement, {
                        duration: 0.4,
                        autoAlpha: 0,
                        ease: "none",
                    }, 0)
                    .to(symbol, {
                        background: accent,
                        ease: "none",
                    }, 0)
                    .reverse();

                return function (clickedMenu) {
                    if (clickedMenu === menu) {
                        animation.reversed(!animation.reversed());
                    } else {
                        animation.reverse();
                    }
                };
            }
        }
        reinitAccordion();

        /***************************
    
        cursor
    
        ***************************/
        window.reinitCursor = function () {
            $('.mil-drag, .mil-more, .mil-choose').mouseover(function () {
                gsap.to($(cursor), .2, {
                    width: 90,
                    height: 90,
                    opacity: 1,
                    ease: 'sine',
                });
            });

            $('.mil-drag, .mil-more, .mil-choose').mouseleave(function () {
                gsap.to($(cursor), .2, {
                    width: 20,
                    height: 20,
                    opacity: .1,
                    ease: 'sine',
                });
            });

            $('.mil-accent-cursor').mouseover(function () {
                gsap.to($(cursor), .2, {
                    background: accent,
                    ease: 'sine',
                });
                $(cursor).addClass('mil-accent');
            });

            $('.mil-accent-cursor').mouseleave(function () {
                gsap.to($(cursor), .2, {
                    background: dark,
                    ease: 'sine',
                });
                $(cursor).removeClass('mil-accent');
            });

            $('.mil-drag').mouseover(function () {
                gsap.to($('.mil-ball .mil-icon-1'), .2, {
                    scale: '1',
                    ease: 'sine',
                });
            });

            $('.mil-drag').mouseleave(function () {
                gsap.to($('.mil-ball .mil-icon-1'), .2, {
                    scale: '0',
                    ease: 'sine',
                });
            });

            $('.mil-more').mouseover(function () {
                gsap.to($('.mil-ball .mil-more-text'), .2, {
                    scale: '1',
                    ease: 'sine',
                });
            });

            $('.mil-more').mouseleave(function () {
                gsap.to($('.mil-ball .mil-more-text'), .2, {
                    scale: '0',
                    ease: 'sine',
                });
            });

            $('.mil-choose').mouseover(function () {
                gsap.to($('.mil-ball .mil-choose-text'), .2, {
                    scale: '1',
                    ease: 'sine',
                });
            });

            $('.mil-choose').mouseleave(function () {
                gsap.to($('.mil-ball .mil-choose-text'), .2, {
                    scale: '0',
                    ease: 'sine',
                });
            });

            $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu').mouseover(function () {
                gsap.to($(cursor), .2, {
                    scale: 0,
                    ease: 'sine',
                });
                gsap.to($('.mil-ball svg'), .2, {
                    scale: 0,
                });
            });

            $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu').mouseleave(function () {
                gsap.to($(cursor), .2, {
                    scale: 1,
                    ease: 'sine',
                });

                gsap.to($('.mil-ball svg'), .2, {
                    scale: 1,
                });
            });

            $('body').mousedown(function () {
                gsap.to($(cursor), .2, {
                    scale: .1,
                    ease: 'sine',
                });
            });
            $('body').mouseup(function () {
                gsap.to($(cursor), .2, {
                    scale: 1,
                    ease: 'sine',
                });
            });
        }
        reinitCursor();

        /***************************
    
        main menu
    
        ***************************/
        function reinitMainMenu() {
            $('.mil-has-children a').on('click', function () {
                $('.mil-has-children ul').removeClass('mil-active');
                $('.mil-has-children a').removeClass('mil-active');
                $(this).toggleClass('mil-active');
                $(this).next().toggleClass('mil-active');
            });
        }
        reinitMainMenu();

        /***************************
    
        scroll animations
    
        ***************************/
        initScrollAnimations()

        /***************************
    
        fancybox
    
        ***************************/
        function reinitFancybox() {
            $('[data-fancybox="gallery"]').fancybox({
                buttons: [
                    "slideShow",
                    "zoom",
                    "fullScreen",
                    "close"
                ],
                loop: false,
                protect: true
            });
            $.fancybox.defaults.hash = false;
        }
        reinitFancybox();

        /***************************
    
        reviews slider
    
        ***************************/
        function reinitReviewsSlider() {
            var menu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>']
            var mySwiper = new Swiper('.mil-reviews-slider', {
                // If we need pagination
                pagination: {
                    el: '.mil-revi-pagination',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (menu[index]) + '</span>';
                    },
                },
                speed: 800,
                effect: 'fade',
                parallax: true,
                navigation: {
                    nextEl: '.mil-revi-next',
                    prevEl: '.mil-revi-prev',
                },
            })
        }
        reinitReviewsSlider();

        /***************************
    
        infinite slider
    
        ***************************/
        function reinitInfiniteSlider() {
            var swiper = new Swiper('.mil-infinite-show', {
                slidesPerView: 2,
                spaceBetween: 30,
                speed: 5000,
                autoplay: true,
                autoplay: {
                    delay: 0,
                },
                loop: true,
                freeMode: true,
                breakpoints: {
                    992: {
                        slidesPerView: 4,
                    },
                },
            });
        }
        reinitInfiniteSlider();

        /***************************
    
        portfolio slider
    
        ***************************/
        function reinitPortfolioSlider() {
            var swiper = new Swiper('.mil-portfolio-slider', {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                parallax: true,
                mousewheel: {
                    enable: true
                },
                navigation: {
                    nextEl: '.mil-portfolio-next',
                    prevEl: '.mil-portfolio-prev',
                },
                pagination: {
                    el: '.swiper-portfolio-pagination',
                    type: 'fraction',
                },
            });
        }
        reinitPortfolioSlider();

        /***************************
    
        1 item slider
    
        ***************************/
        function reinitItemSlider1() {
            var swiper = new Swiper('.mil-1-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 800,
                parallax: true,
                navigation: {
                    nextEl: '.mil-portfolio-next',
                    prevEl: '.mil-portfolio-prev',
                },
                pagination: {
                    el: '.swiper-portfolio-pagination',
                    type: 'fraction',
                },
            });
        }
        reinitItemSlider1();

        /***************************
    
        2 item slider
    
        ***************************/
        function reinitItemSlider2() {
            var swiper = new Swiper('.mil-2-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 800,
                parallax: true,
                navigation: {
                    nextEl: '.mil-portfolio-next',
                    prevEl: '.mil-portfolio-prev',
                },
                pagination: {
                    el: '.swiper-portfolio-pagination',
                    type: 'fraction',
                },
                breakpoints: {
                    992: {
                        slidesPerView: 2,
                    },
                },
            });
        }
        reinitItemSlider2();

    });

    // Footer mutation observer
    const footerObserver = new MutationObserver(function (mutations) {
        const footers = document.querySelectorAll('footer.mil-dark-bg');
        if (footers.length > 1) {
            // Keep only the first footer, remove others
            Array.from(footers).slice(1).forEach(footer => footer.remove());
        }
    });

    // Configure and start the footer observer
    document.addEventListener('DOMContentLoaded', function () {
        const config = {
            childList: true,
            subtree: true
        };
        footerObserver.observe(document.body, config);
    });

    // Also check for footer duplicates during SWUP transitions
    document.addEventListener("swup:contentReplaced", function () {
        const footers = document.querySelectorAll('footer.mil-dark-bg');
        if (footers.length > 1) {
            Array.from(footers).slice(1).forEach(footer => footer.remove());
        }
    });

    // Cleanup observer when needed
    document.addEventListener("swup:willReplaceContent", function () {
        const footers = document.querySelectorAll('footer.mil-dark-bg');
        if (footers.length > 1) {
            Array.from(footers).slice(1).forEach(footer => footer.remove());
        }
    });


};