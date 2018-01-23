function reInit(target){



    /************** Navigation Scripts **************/

    // Shrink nav on scroll

    // Mobile Toggle Control

    $(target+' .mobile-toggle').click(function () {
        $(target+' nav').toggleClass('open-nav');
    });

    $(target+' .has-dropdown').click(function () {
        if ($(target+' .mobile-toggle').is(":visible")) {
            if ($(this).children('.subnav').hasClass('open-nav')) {
                $(this).children('.subnav').removeClass('open-nav');
            } else {
                $(target+' .subnav').removeClass('open-nav');
                $(this).children('.subnav').addClass('open-nav');
            }
        }
    });


    // Inner links

    if ($(target+' .off-screen').length) {
        $(target+' .inner-link').smoothScroll({
            speed: 900
        });
    } else {
        $(target+' .inner-link').smoothScroll({
            speed: 900,
            offset: -68
        });
    }



    // Disable default behaviour on href='#' links

    $(target+' a').click(function () {
        if ($(this).attr('href') === '#') {
            return false;
        }
    });

    // Fix nav to top

    $(window).scroll(function () {
        if (window.scrollY > 500) {
            $(target+' .nav-overlay').addClass('fixed-nav');
        } else {
            $(target+' .nav-overlay').removeClass('fixed-nav');
        }

        if (window.scrollY > $(target+' nav').outerHeight()) {
            $(target+' .nav-overlay').css('top', -200);
        } else {
            $(target+' .nav-overlay').css('top', 0);
        }
    });

    // Offscreen nav



    $(target+' .off-screen .nav-toggle').click(function () {
        $(target+' .off-screen').toggleClass('reveal-nav');
        $(target+' .main-container').toggleClass('move-content');
        $(target+' .footer-container').toggleClass('move-content');
    });

    $(target+' .main-container').click(function () {
        if ($(this).hasClass('move-content')) {
            $(this).removeClass('move-content');
            $(target+' .off-screen').removeClass('reveal-nav');
            $(target+' .footer-container').toggleClass('move-content');
        }
    });

    // Logo center nav on mobile

    $(target+' .logo-center .nav-toggle').click(function () {
        $(target+' .logo-center').toggleClass('open-nav');
    });

    /************** Slider Scripts **************/

    // Initialize Sliders

    $(target+' .hero-slider').flexslider({
        slideshow: false
    });

    $(target+' .testimonials-slider').flexslider({
        directionNav: false,
        controlNav: false
    });

    $(target+' .gallery-slider').flexslider({});

    $(target+' .slider').flexslider({
        directionNav: false
    });



    // Adjust slide height for .slider-fullscreen sliders

    $(target+' .slider-fullscreen .slides li').each(function () {
        if ($(target+' .top-bar').is(':visible')) {
            var slideHeight = $(window).height() - $(target+' .top-bar').outerHeight() + 10;
            $(this).css('height', slideHeight);


        } else {
            $(this).css('height', $(window).height());
        }
    });

    $(window).resize(function () {
        $(target+' .slider-fullscreen .slides li').each(function () {
            if ($(target+' .top-bar').is(':visible')) {
                var slideHeight = $(window).height() - $(target+' .top-bar').outerHeight();
                console.log(slideHeight);
                $(this).css('height', slideHeight + '!important');


            } else {
                $(this).css('height', $(window).height());
            }
        });
    });

    $(target+' .slides li').each(function () {

        // Append background-image <img>'s as li item CSS background for better responsive performance

        if ($(this).children('.background-image').length) {
            var imgSrc = jQuery(this).children('.background-image').attr('src');
            jQuery(this).css('background', 'url("' + imgSrc + '")');
            jQuery(this).children('.background-image').hide();
            $(this).css('background-position', '50% 0%');
            // Check if the slider has a color scheme attached, if so, apply it to the slider nav

        }

        // Center Slide Content vertically

        if ($(target+' .overlay-nav').length && !$(target+' nav').hasClass('nav-transparent')) {
            $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2) + $(target+' .overlay-nav').height());
        } else {
            $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2));
        }

    });

    $(window).resize(function () {

        $(target+' .slides li').each(function () {
            if ($(target+' .overlay-nav').length && !$(target+' nav').hasClass('nav-transparent')) {
                $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2) + $(target+' .overlay-nav').height());
            } else {
                $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2));
            }

        });
    });


    /************** Divider Scripts **************/

    $(target+' .background-image-holder').each(function () {

        // Append background-image <img>'s as li item CSS background for better responsive performance
        var imgSrc = $(this).children('.background-image').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('.background-image').hide();
        $(this).css('background-position', '50% 0%');
        // Check if the slider has a color scheme attached, if so, apply it to the slider nav
    });


    /************** Video Dividers Scripts **************/

    // Set the videos height at the wrappers width so it takes up the whole space of the divider

    $(target+' .video-wrapper').each(function () {
        var height = $(this).width();
        $(this).css('height', height);

        if ($(this).width() < $(target+' .row').width()) {
            $(this).css('width', height * 2);
        }

        if ($(this).width() > $(target+' .row').width()) {
            $(this).css('width', height * 1.5);
        }
    });

    // and do this on resize!

    $(window).resize(function () {
        $(target+' .video-wrapper').each(function () {
            var height = $(this).width();
            $(this).css('height', height);
        });
    });


    /************** Parallax Scripts **************/

    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isChrome = !!window.chrome;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var prefix;

    if (isFirefox) {
        prefix = '-moz-';
    } else if (isIE) {

    } else if (isChrome || isSafari) {
        prefix = '-webkit-';
    }

    $(target+' .main-container section:first-child').addClass('first-child');

    $(target+' .parallax-background').each(function () {

        if ($(this).closest('section').hasClass('first-child') && !$(this).closest('section').hasClass('slider-fullscreen')) {
            $(this).attr('data-top', prefix + 'transform: translate3d(0px,0px, 0px)');
            $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,200px, 0px)');

        } else {

            $(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-200px, 0px)');
            $(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
            $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,200px, 0px)');

        }

    });


    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
    }

    /************** Tabbed Menu Scripts **************/

    $(target+' .menu-filters li').click(function () {
        $(target+' .menu-filters li').removeClass('active');
        $(this).addClass('active');
        var menuType = $(this).attr('data-menu-type');

        $(this).closest('.tabbed-menu').find('.narrow-menu').removeClass('active');
        $(this).closest('.tabbed-menu').find("[data-menu-type='" + menuType + "']").addClass('active');

    });

    /************** OpenTable form Scripts **************/

    $(target+' #OT_defList dt').each(function () {
        $(this).html('');
    });

    $(target+' .open-table-button').click(function () {
        $(target+' #ism').submit();
        return false;
    });

    $(target+' .open-table-container').each(function () {
        var restaurantID = $(this).attr('data-restaurant-id');
        $(this).find('.OT_hidden[name="RestaurantID"]').attr('value', restaurantID);
    });

    $(target+' .datepicker').datepicker({
        onSelect: function (selectedDate) {
            // custom callback logic here
            $(this).attr('value', selectedDate);
        }
    });


    /************** Map Scripts **************/

    $(target+' .map .overlay').click(function () {
        $(this).hide();
    });

    $(window).scroll(function () {
        $(target+' .map .overlay').show();
    });


    /************** Instagram Scripts **************/

    jQuery.fn.spectragram.accessData = {
        accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
        clientID: 'fedaafacf224447e8aef74872d3820a1'
    };

    $(target+' .instafeed').each(function () {
        $(this).children('ul').spectragram('getUserFeed', {
            query: $(this).attr('data-user-name')
        });

    });

    /************** Video Dividers Scripts **************/

    // Set the videos height at the wrappers width so it takes up the whole space of the divider

    $(target+' .video-wrapper').each(function () {
        var height = $(this).width();
        $(this).css('height', height);

        if ($(this).width() < $(target+' .row').width()) {
            $(this).css('width', height * 2);
        }

        if ($(this).width() > $(target+' .row').width()) {
            $(this).css('width', height * 1.5);
        }
    });

    // and do this on resize!

    $(window).resize(function () {
        $(target+' .video-wrapper').each(function () {
            var height = $(this).width();
            $(this).css('height', height);
        });
    });


    /************** Contact Form Scripts **************/

    jQuery('.form-contact .button').click(function () {

        event.preventDefault(); // cancel default behavior

        var name = jQuery('#form-name').val();
        var email = jQuery('#form-email').val();
        var message = jQuery('#form-msg').val();
        var error = 0;

        if (name === '' || email === '' || message === '') {
            error = 1;
            jQuery('#details-error').fadeIn(200);
        } else {
            jQuery('#details-error').fadeOut(200);
        }

        if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
            jQuery('#details-error').fadeIn(200);
            error = 1;
        }

        var dataString = 'name=' + name + '&email=' + email + '&text=' + message;

        if (error === 0) {
            jQuery.ajax({
                type: "POST",
                url: "mail.php",
                data: dataString,
                success: function () {
                    jQuery('#details-error').fadeOut(1000);
                    jQuery('#form-sent').fadeIn(1000);
                }
            });
            return false;
        }

    });




}