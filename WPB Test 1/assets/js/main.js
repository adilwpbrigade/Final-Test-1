$(document).ready(function () {

    // Hamburger toggle for mobile devices
    function toggleSecondaryNav() {
        if ($(window).width() <= 767) {
            $(".secondary-nav").hide();
        } else {
            $(".secondary-nav").show();
        }
    }

    // Run on page load and window resize
    toggleSecondaryNav();
    $(window).resize(toggleSecondaryNav);

    // Hamburger click event to show/hide mobile nav
    $(".hamburger").click(function () {
        if ($(window).width() <= 767) {
            $(".secondary-nav").slideToggle(300);

            // Reset submenus when hamburger is clicked
            $(".sub-menu, .sub-sub-menu").slideUp(0).removeClass("open").removeAttr("style");
            $(".submenu-toggle, .subsubmenu-toggle").removeClass("active");
        }
    });

    // Mobile submenu handlers
    (function () {
        const mq = window.matchMedia("(max-width: 767px)");

        function bindMobileHandlers() {
            removeMobileHandlers();

            // Toggle main submenus
            $(document).on("click.mobileMenu", ".submenu-toggle", function (e) {
                e.preventDefault();
                const $this = $(this);
                const $submenu = $this.next(".sub-menu");

                $this.parent().siblings().find(".sub-menu").slideUp(300).removeClass("open");
                $this.parent().siblings().find(".submenu-toggle").removeClass("active");

                $submenu.slideToggle(300).toggleClass("open");
                $this.toggleClass("active");
            });

            // Toggle sub-submenus
            $(document).on("click.mobileMenu", ".subsubmenu-toggle", function (e) {
                e.preventDefault();
                const $this = $(this);
                const $subSub = $this.next(".sub-sub-menu");

                $this.parent().siblings().find(".sub-sub-menu").slideUp(300).removeClass("open");
                $this.parent().siblings().find(".subsubmenu-toggle").removeClass("active");

                $subSub.slideToggle(300).toggleClass("open");
                $this.toggleClass("active");
            });
        }

        // Remove mobile menu click handlers
        function removeMobileHandlers() {
            $(document).off(".mobileMenu");
        }

        // Apply or remove handlers depending on screen size
        function syncHandlers() {
            if (mq.matches) {
                bindMobileHandlers();
            } else {
                removeMobileHandlers();
                $(".sub-menu, .sub-sub-menu").removeAttr("style").removeClass("open");
                $(".submenu-toggle, .subsubmenu-toggle").removeClass("active");
            }
        }

        syncHandlers();

        // Listen for screen size changes
        if (mq.addEventListener) mq.addEventListener("change", syncHandlers);
        else if (mq.addListener) mq.addListener(syncHandlers);
    })();

    // Top bar close button
    $(".close-btn").click(function () {
        $(".top-bar").slideUp(300);
    });

    // Swiper slider for main section
    var swiper = new Swiper(".main-section-slider", {
        spaceBetween: 28,
        loop: true,
        pagination: { el: ".main-section-pagination", clickable: true },
        navigation: { nextEl: ".main-section-next", prevEl: ".main-section-prev" },
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
            0: { slidesPerView: 1, slidesPerGroup: 1, navigation: { enabled: false } },
            500: { slidesPerView: 2, slidesPerGroup: 1, navigation: { enabled: false } },
            768: { slidesPerView: 3, slidesPerGroup: 1, navigation: { enabled: false }, spaceBetween: 31 },
            1024: { slidesPerView: 4, slidesPerGroup: 1, navigation: { enabled: true } },
        },
    });

    // Swiper slider for hero section
    var mainswiper = new Swiper(".hero-section-Swiper", {
        slidesPerView: 1,
        loop: true,
        pagination: { el: ".hero-section-pagination", clickable: true },
        navigation: { nextEl: ".hero-section-next", prevEl: ".hero-section-prev" },
    });

    // Tabs functionality
    $(".tabcontent").hide();
    $(".tabcontent:first").show();
    $(".tablinks:first").addClass("active");

    $(".tablinks").click(function (e) {
        e.preventDefault();
        $(".tablinks").removeClass("active");
        $(this).addClass("active");

        var target = $(this).data("target");
        $(".tabcontent").hide();
        $("#" + target).show();
    });

    // Accordion functionality
    var $accordion = $(".accordion");
    var $headers = $accordion.find(".accordion-header");
    var $contents = $accordion.find(".accordion-content");

    // Add arrows if not present
    $headers.each(function () {
        if ($(this).find(".accordion-arrow").length === 0) {
            $(this).append('<span class="accordion-arrow"></span>');
        }
    });

    // Initialize accordion state
    $contents.hide().removeClass("open");
    $contents.first().addClass("open").slideDown(200);
    $headers.removeClass("active");
    $headers.first().addClass("active");

    // Accordion toggle click event
    $headers.on("click", function () {
        var $h = $(this);
        var $c = $h.next(".accordion-content");

        if ($c.hasClass("open")) {
            $c.stop(true, true).removeClass("open").slideUp(200);
            $h.removeClass("active");
        } else {
            $contents.stop(true, true).removeClass("open").slideUp(200);
            $headers.removeClass("active");

            $c.stop(true, true).addClass("open").slideDown(200);
            $h.addClass("active");
        }
    });

    // ------------------------------
    // Video Popup for YouTube (works with youtu.be, watch?v, embed)
    // ------------------------------

    // Function to convert any YouTube URL to embed URL
    function convertToEmbed(url) {
        let videoId = "";

        if (url.includes("youtu.be/")) { // Short URL
            videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
        } else if (url.includes("youtube.com/watch?v=")) { // Watch URL
            videoId = url.split("v=")[1].split(/[?&]/)[0];
        } else if (url.includes("youtube.com/embed/")) { // Already embed
            return url;
        }

        return "https://www.youtube.com/embed/" + videoId;
    }

    // Open popup on play button click
    $(".play-btn").on("click", function () {
        const popup = $(".video-popup");
        const videoURL = $(this).data("video");
        const embedURL = convertToEmbed(videoURL) + "?autoplay=1";

        popup.fadeIn(300);
        popup.find("iframe").attr("src", embedURL);
        $("body").css("overflow", "hidden");
    });

    // Close popup when clicking overlay or close button
    $(".video-popup, .close-video").on("click", function (e) {
        if (!$(e.target).closest("iframe").length) {
            const popup = $(".video-popup");
            popup.fadeOut(300);
            popup.find("iframe").attr("src", ""); // stop video
            $("body").css("overflow", "");
        }
    });

    // Prevent closing when clicking inside iframe
    $(".video-popup iframe").on("click", function (e) {
        e.stopPropagation();
    });

});
