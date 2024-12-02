/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature
$(function() {
    $('.smooth-scroll').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    if($('.navbar-toggle').is(':visible')) {
        $('.navbar-collapse').collapse('hide');
    }
});

// Add this after your existing code
$(document).ready(function() {
    // Proper modal initialization
    $('.portfolio-modal').modal({
        backdrop: true,
        keyboard: true,
        show: false
    });

    // Show close button
    $('.close-modal').show();

    // Ensure modal close button works
    $('[data-dismiss="modal"]').on('click', function() {
        $(this).closest('.modal').modal('hide');
        history.pushState(null, null, window.location.pathname);
    });

    // Handle modal closing on backdrop click
    $('.modal').on('click', function(e) {
        if ($(e.target).hasClass('modal')) {
            $(this).modal('hide');
            history.pushState(null, null, window.location.pathname);
        }
    });

    // Handle keyboard escape
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.modal').modal('hide');
            history.pushState(null, null, window.location.pathname);
        }
    });

    // Initialize Bootstrap navbar toggle with proper event handling
    $('.navbar-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.navbar-collapse').toggleClass('in');
    });

    // Close menu when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.navbar-collapse').length && 
            !$(event.target).is('.navbar-toggle') && 
            $('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').removeClass('in');
        }
    });

    // Prevent menu from closing when clicking inside
    $('.navbar-collapse').on('click', function(e) {
        e.stopPropagation();
    });

    // Mobile menu functionality
    $('.mobile-menu-btn').on('click', function() {
        $(this).find('i').toggleClass('fa-bars fa-times');
        $('.nav-menu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Close mobile menu when clicking a link
    $('.nav-link').on('click', function() {
        $('.mobile-menu-btn').find('i').removeClass('fa-times').addClass('fa-bars');
        $('.nav-menu').removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Disable particles.js on mobile
    function handleParticles() {
        if (window.innerWidth <= 768) {
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.fn.vendors.destroypJS();
                window.pJSDom = [];
            }
            $('.particle-container').hide();
        } else {
            if (!window.pJSDom || !window.pJSDom[0]) {
                // Proper particles configuration for desktop
                particlesJS("particle-container", {
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#ffffff"
                        },
                        "shape": {
                            "type": "circle"
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false
                        },
                        "size": {
                            "value": 3,
                            "random": true
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 6,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        }
                    },
                    "retina_detect": true
                });
                $('.particle-container').show();
            }
        }
    }

    // Handle particles on load and resize
    $(window).on('load', handleParticles);
    $(window).on('resize', handleParticles);
});
