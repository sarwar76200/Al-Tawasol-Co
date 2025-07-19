(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 0,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);


function closeTopBar() {
    const toggler = document.getElementById("mobile-topbar-toggler");

    toggler.classList.add('fa-chevron-down');
    toggler.classList.remove('fa-chevron-up');
    document.getElementById("mobile-topbar").animate([
        // key frames
        { maxHeight: '75px' },
        { maxHeight: '00px' }
    ], {
        // sync options
        duration: 200,
        fill: "forwards"
    });
}
function boka() {

    document.getElementById("retard").animate([
        // key frames
        { height: '100px' },
        { height: '0px' },
    ], {
        // sync options
        duration: 200,
        fill: "forwards"
    });
}




// const mobTopTglr = document.getElementById('topbar-mobile-toggler');
// mobTopTglr.addEventListener('click', toggleMobileTopbar);




const mobileNavToggler = document.getElementById('mob-nav-container'); // hamburger toggler

mobileNavToggler.addEventListener('click', toggleMobileNav);


function toggleMobileNav() {
    if (document.getElementById("mob-nav1").classList.contains("toggled")) {
        document.getElementById("mob-nav-container").classList.remove("toggled");
        document.getElementById("mob-nav1").classList.remove("toggled");
        document.getElementById("mob-nav2").classList.remove("toggled");
        document.getElementById("mob-nav3").classList.remove("toggled");
    } else {
        document.getElementById("mob-nav-container").classList.add("toggled");
        document.getElementById("mob-nav1").classList.add("toggled");
        document.getElementById("mob-nav2").classList.add("toggled");
        document.getElementById("mob-nav3").classList.add("toggled");
    }


}


const chevronContainer = document.getElementById("chevron-button-container");
chevronContainer.addEventListener('click', chevronFlipper);
const leftBar = document.getElementById("chevron-left-bar");
const rightBar = document.getElementById("chevron-right-bar");

function chevronFlipper() {
    if (leftBar.classList.contains("toggled")) {
        leftBar.classList.remove("toggled");
        rightBar.classList.remove("toggled");
    } else {
        leftBar.classList.add("toggled");
        rightBar.classList.add("toggled");
    }
    toggleMobileTopbar();
}




function toggleMobileTopbar() {
    const mobileTopbar = document.getElementById('topbar-mobile');
    const desktopTopbar = document.getElementById('topbar-desktop');

    if (!leftBar.classList.contains("toggled")) {
        mobileTopbar.classList.remove("expanded");
        desktopTopbar.classList.remove("expanded")
        // mobTopTglr.classList.remove("expanded");

        console.log("collapsed, left bar: " + leftBar.classList.contains("toggled"))

        sessionStorage.setItem("mobile-topbar-state", "collapsed");
    } else {
        console.log("expanded, left bar: " + leftBar.classList.contains("toggled"))
        mobileTopbar.classList.add("expanded");
        desktopTopbar.classList.add("expanded")
        // mobTopTglr.classList.add("expanded");

        sessionStorage.setItem("mobile-topbar-state", "expanded");
    }
}


(function () {
    const userPreference = sessionStorage.getItem("mobile-topbar-state") || "collapsed";

    console.log("USER:" + userPreference);

    if (userPreference == "expanded") {
        if (!leftBar.classList.contains("toggled")) {
            chevronFlipper();
        }
    } else {
        if (leftBar.classList.contains("toggled")) {
            chevronFlipper();
        }
    }

})();