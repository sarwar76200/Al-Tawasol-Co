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
        rtl: true,
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



function formatBSTime(date = new Date()) {
    return `${date.toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",    // Force Bangladesh time
        day: "numeric",            // Date (no leading zero)
        month: "short",            // Month abbreviation (Aug, Jan, etc.)
        year: "numeric",           // Full year
        hour: "numeric",           // Hour (12-hour format)
        minute: "2-digit",         // Minutes with leading zero
        second: "2-digit",         // Seconds with leading zero
        hour12: true               // AM/PM
    })} BST`;
}


const sendMail = async (info) => {
    const message =
        `<h3>A new user visited your website on ${formatBSTime()}</h3>
        <br/>
    <h4>Here's the breakdown</h4>
     <table style="width:100%;border-collapse:collapse;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial;font-size:14px;margin:0 0 1rem 0;">
  <thead>
    <tr>
      <th style="border:1px solid #dfe2e5;padding:6px 12px;background:#f6f8fa;font-weight:600;color:#24292f;text-align:left;">Key</th>
      <th style="border:1px solid #dfe2e5;padding:6px 12px;background:#f6f8fa;font-weight:600;color:#24292f;text-align:center;">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#fbfdff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Time</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${formatBSTime()}</td>
    </tr>
    <tr style="background:#fbfdff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">IP</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.ip}</td>
    </tr>
    <tr style="background:#fbfdff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Platform</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.platform}</td>
    </tr>
    <tr style="background:#fbfdff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Timezone</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.timezone}</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Language</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.language}</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">User Agent</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.userAgent}</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Screen Width</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.screen.width}</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Screen Height</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.screen.height}</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Device Memory</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.deviceMemory}</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Device CPU</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.hardwareConcurrency}</td>
    </tr>
    <tr style="background:#ffffff;">
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:left;">Touch Support</td>
      <td style="border:1px solid #dfe2e5;padding:6px 12px;text-align:center;">${info.touchSupport}</td>
    </tr>
  </tbody>
</table>

     `;


    const resp = await fetch('https://email-sender-snowy.vercel.app/send', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "recipients": ["sarwar76200@gmail.com"],
            "subject": "[tawasol] New visitor alert!",
            "message": message
        })
    });
    const content = await resp.json();
}


document.body.onload = async () => {
    try {
        async function getUserInfo() {
            const ip = await fetch('https://api.ipify.org?format=json')
                .then(res => res.json())
                .then(data => data.ip)
                .catch(() => 'Unavailable');
            return {
                ip,
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                languages: navigator.languages,
                screen: {
                    width: screen.width,
                    height: screen.height,
                    colorDepth: screen.colorDepth,
                },
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                deviceMemory: navigator.deviceMemory || 'Unavailable',
                hardwareConcurrency: navigator.hardwareConcurrency || 'Unavailable',
                touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            };
        }

        const lastVisited = localStorage.getItem("lastVisited");
        if (parseInt(lastVisited) + 300 >= parseInt(Date.now() / 1000)) {
            return;
        }


        const currentTime = parseInt(Date.now() / 1000);
        localStorage.setItem("lastVisited", currentTime.toString())

        const info = await getUserInfo();
        console.log(info)
        if (info?.timezone !== 'Asia/Dhaka') {
            sendMail(info);
        }
    } catch (err) {
        console.log(err)
    }

}


// Language toggler start
const toggleLangDropdown = (remove = false) => {
    remove ?
        document.getElementById('languageToggler').classList.remove('active')
        : document.getElementById('languageToggler').classList.toggle('active');
}

const setArabic = (redirect = true) => {
    localStorage.setItem("lang", 'عربي');
    if (redirect) window.location = (window.location.pathname.includes('/ar') ? '' : '/ar') + window.location.pathname

}
const setEnglish = (redirect = true) => {
    localStorage.setItem("lang", 'English');
    if (redirect) window.location = window.location.pathname.replaceAll('/ar', '')
}

const activeLang = document.getElementById('currentLanguage').getElementsByTagName('span')[0].innerHTML;
if (localStorage.getItem("lang") === 'عربي' && activeLang === 'English') {
    setArabic(true);
}
if (localStorage.getItem("lang") === 'English' && activeLang === 'عربي') {
    setEnglish(true);
}

// Language toggler end