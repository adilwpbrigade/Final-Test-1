$(document).ready(function () {

    // ------------------------------
    // Hamburger toggle for mobile devices
    // ------------------------------

    function toggleSecondaryNav() {
        if ($(window).width() <= 767) {
            $(".secondary-nav").hide();
        } else {
            $(".secondary-nav").show();
        }
    }

    toggleSecondaryNav();
    $(window).resize(toggleSecondaryNav);

    // Hamburger click event
    $(".hamburger").click(function () {
        if ($(window).width() <= 767) {

            $(".secondary-nav").slideToggle(300, function () {
                if ($(".secondary-nav").is(":visible")) {
                    $("body").css("overflow", "hidden"); // disable scroll
                } else {
                    $("body").css("overflow", ""); // enable scroll
                }
            });

            // Reset all menus when hamburger opens/closes
            $(".sub-menu, .sub-sub-menu").slideUp(0).removeClass("open").removeAttr("style");
            $(".submenu-toggle, .subsubmenu-toggle").removeClass("active");
        }
    });

    // ------------------------------
    // Mobile submenu logic
    // ------------------------------

    (function () {
        const mq = window.matchMedia("(max-width: 767px)");

        function bindMobileHandlers() {
            removeMobileHandlers();

            // Toggle main sub-menu
            $(document).on("click.mobileMenu", ".submenu-toggle", function (e) {
                e.preventDefault();
                const $this = $(this);
                const $submenu = $this.next(".sub-menu");

                // CLOSE other main submenu
                $this.parent().siblings().find(".sub-menu")
                    .slideUp(300).removeClass("open");

                $this.parent().siblings().find(".submenu-toggle").removeClass("active");

                // CLOSE all sub-submenus when parent menu closes
                $this.parent().siblings().find(".sub-sub-menu")
                    .slideUp(0).removeClass("open").removeAttr("style");

                $this.parent().siblings().find(".subsubmenu-toggle").removeClass("active");

                // Toggle this submenu
                $submenu.slideToggle(300).toggleClass("open");
                $this.toggleClass("active");

                // If submenu closed → close its sub-submenus too
                if (!$submenu.hasClass("open")) {
                    $submenu.find(".sub-sub-menu").slideUp(300).removeClass("open").removeAttr("style");
                    $submenu.find(".subsubmenu-toggle").removeClass("active");
                }
            });

            // Toggle sub-sub-menu
            $(document).on("click.mobileMenu", ".subsubmenu-toggle", function (e) {
                e.preventDefault();
                const $this = $(this);
                const $subSub = $this.next(".sub-sub-menu");

                // Close sibling sub-submenus
                $this.parent().siblings().find(".sub-sub-menu").slideUp(300).removeClass("open");
                $this.parent().siblings().find(".subsubmenu-toggle").removeClass("active");

                // Toggle current one
                $subSub.slideToggle(300).toggleClass("open");
                $this.toggleClass("active");
            });
        }

        function removeMobileHandlers() {
            $(document).off(".mobileMenu");
        }

        function syncHandlers() {
            if (mq.matches) {
                bindMobileHandlers();
            } else {
                removeMobileHandlers();

                $(".sub-menu, .sub-sub-menu").removeAttr("style").removeClass("open");
                $(".submenu-toggle, .subsubmenu-toggle").removeClass("active");

                $(".secondary-nav").show();
                $("body").css("overflow", ""); // enable scroll on desktop
            }
        }

        syncHandlers();

        if (mq.addEventListener) mq.addEventListener("change", syncHandlers);
        else if (mq.addListener) mq.addListener(syncHandlers);
    })();

    // ------------------------------
    // Top bar close
    // ------------------------------
    $(".close-btn").click(function () {
        $(".top-bar").slideUp(300);
    });

    // ------------------------------
    // Swipers
    // ------------------------------
    var swiper = new Swiper(".main-section-slider", {
        spaceBetween: 28,
        loop: true,
        pagination: { el: ".main-section-pagination", clickable: true },
        navigation: { nextEl: ".main-section-next", prevEl: ".main-section-prev" },
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
            0: { slidesPerView: 1, navigation: { enabled: false } },
            500: { slidesPerView: 2, navigation: { enabled: false } },
            768: { slidesPerView: 3, navigation: { enabled: false }, spaceBetween: 31 },
            1024: { slidesPerView: 4, navigation: { enabled: true } },
        },
    });

    var mainswiper = new Swiper(".hero-section-Swiper", {
        slidesPerView: 1,
        loop: true,
        pagination: { el: ".hero-section-pagination", clickable: true },
        navigation: { nextEl: ".hero-section-next", prevEl: ".hero-section-prev" },
    });

    // ------------------------------
    // Tabs
    // ------------------------------
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

    // ------------------------------
    // Accordion
    // ------------------------------
    var $accordion = $(".accordion");
    var $headers = $accordion.find(".accordion-header");
    var $contents = $accordion.find(".accordion-content");

    $headers.each(function () {
        if ($(this).find(".accordion-arrow").length === 0) {
            $(this).append('<span class="accordion-arrow"></span>');
        }
    });

    $contents.hide().removeClass("open");
    $contents.first().addClass("open").slideDown(200);
    $headers.removeClass("active");
    $headers.first().addClass("active");

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
    // Video Popup
    // ------------------------------
    function convertToEmbed(url) {
        let videoId = "";
        if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
        else if (url.includes("watch?v=")) videoId = url.split("v=")[1].split(/[?&]/)[0];
        else if (url.includes("embed/")) return url;

        return "https://www.youtube.com/embed/" + videoId;
    }

    $(".play-btn").on("click", function () {
        const popup = $(".video-popup");
        const videoURL = $(this).data("video");
        const embedURL = convertToEmbed(videoURL) + "?autoplay=1";

        popup.fadeIn(300);
        popup.find("iframe").attr("src", embedURL);
        $("body").css("overflow", "hidden");
    });

    $(".video-popup, .close-video").on("click", function (e) {
        if (!$(e.target).closest("iframe").length) {
            const popup = $(".video-popup");
            popup.fadeOut(300);
            popup.find("iframe").attr("src", "");
            $("body").css("overflow", "");
        }
    });

    $(".video-popup iframe").on("click", function (e) {
        e.stopPropagation();
    });
       $("#year").text(new Date().getUTCFullYear());

});
