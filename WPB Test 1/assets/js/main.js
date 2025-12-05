$(document).ready(function () {

    // ============================================================
    //  MOBILE NAV TOGGLE (Hamburger + Secondary Nav)
    // ============================================================

    function toggleSecondaryNav() {
        if ($(window).width() <= 767) {
            $(".secondary-nav").hide();
        } else {
            $(".secondary-nav").show();
        }
    }

    toggleSecondaryNav();
    $(window).on("resize", toggleSecondaryNav);

    $(".hamburger").on("click", function () {
        if ($(window).width() <= 767) {

            $(".secondary-nav").slideToggle(300, function () {
                $("body").css("overflow", $(this).is(":visible") ? "hidden" : "");
            });

            $(".sub-menu, .sub-sub-menu")
                .slideUp(0)
                .removeClass("open")
                .removeAttr("style");

            $(".submenu-toggle, .subsubmenu-toggle").removeClass("active");
        }
    });

    // ============================================================
    //  MOBILE SUBMENU LOGIC
    // ============================================================

    function isMobile() {
        return $(window).width() <= 767;
    }

    function bindMobileMenus() {
        removeMobileMenus();

        $(document).on("click.mobileMenu", ".submenu-toggle", function (e) {
            e.preventDefault();
            let $this = $(this);
            let $submenu = $this.next(".sub-menu");

            $this.parent().siblings().find(".sub-menu").slideUp(300).removeClass("open");
            $this.parent().siblings().find(".submenu-toggle").removeClass("active");

            $this.parent().siblings().find(".sub-sub-menu")
                .slideUp(0).removeClass("open").removeAttr("style");

            $this.parent().siblings().find(".subsubmenu-toggle").removeClass("active");

            $submenu.slideToggle(300).toggleClass("open");
            $this.toggleClass("active");

            if (!$submenu.hasClass("open")) {
                $submenu.find(".sub-sub-menu").slideUp(300).removeClass("open").removeAttr("style");
                $submenu.find(".subsubmenu-toggle").removeClass("active");
            }
        });

        $(document).on("click.mobileMenu", ".subsubmenu-toggle", function (e) {
            e.preventDefault();
            let $this = $(this);
            let $inner = $this.next(".sub-sub-menu");

            $this.parent().siblings().find(".sub-sub-menu").slideUp(300).removeClass("open");
            $this.parent().siblings().find(".subsubmenu-toggle").removeClass("active");

            $inner.slideToggle(300).toggleClass("open");
            $this.toggleClass("active");
        });
    }

    function removeMobileMenus() {
        $(document).off(".mobileMenu");
    }

    function syncMenuHandlers() {
        if (isMobile()) {
            bindMobileMenus();
        } else {
            removeMobileMenus();
            $(".sub-menu, .sub-sub-menu").removeClass("open").removeAttr("style");
            $(".submenu-toggle, .subsubmenu-toggle").removeClass("active");
            $(".secondary-nav").show();
            $("body").css("overflow", "");
        }
    }

    syncMenuHandlers();
    $(window).on("resize", syncMenuHandlers);

    // ============================================================
    //  TOP BAR CLOSE
    // ============================================================
    $(".close-btn").on("click", function () {
        $(".top-bar").slideUp(300);
    });

    // ============================================================
    //  SWIPERS
    // ============================================================
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
            1024: { slidesPerView: 4, navigation: { enabled: true } }
        }
    });

    var mainswiper = new Swiper(".hero-section-Swiper", {
        slidesPerView: 1,
        loop: true,
        autoHeight: true,
        spaceBetween: 20,
        pagination: { el: ".hero-section-pagination", clickable: true },
        navigation: { nextEl: ".hero-section-next", prevEl: ".hero-section-prev" }
    });

    // ============================================================
    //  TABS
    // ============================================================
    $(".tabcontent").hide().first().show();
    $(".tablinks").first().addClass("active");

    $(".tablinks").on("click", function (e) {
        e.preventDefault();
        $(".tablinks").removeClass("active");
        $(this).addClass("active");

        let t = $(this).data("target");
        $(".tabcontent").hide();
        $("#" + t).show();
    });

    // ============================================================
    //  SMOOTH ACCORDION  ⭐ (UPDATED SECTION)
    // ============================================================
  $('.accordion-item').removeClass('active');
    $('.accordion-content').hide();

    // -----------------------
    // ACCORDION (Smooth Expand)
    // -----------------------
  $('.accordion-header').on('click', function () {
        const item = $(this).closest('.accordion-item');
        const content = item.find('.accordion-content');

        // Close all others
        item.siblings('.accordion-item')
            .removeClass('active')
            .find('.accordion-content')
            .stop(true, true)
            .slideUp(300);

        // Toggle current
        if (item.hasClass('active')) {
            item.removeClass('active');
            content.stop(true, true).slideUp(300);
        } else {
            item.addClass('active');
            content.stop(true, true).slideDown(300);
        }
    });

    // OPEN FIRST ACCORDION ON LOAD
    const firstItem = $('.accordion-item').first();
    firstItem.addClass('active');
    firstItem.find('.accordion-content').slideDown(300);
   
    // ============================================================
    //  VIDEO POPUP
    // ============================================================

    function convertToEmbed(url) {
        let videoId = "";

        if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
        } else if (url.includes("watch?v=")) {
            videoId = url.split("v=")[1].split(/[?&]/)[0];
        } else if (url.includes("embed/")) {
            return url;
        }

        return "https://www.youtube.com/embed/" + videoId;
    }

    $(".play-btn").on("click", function () {
        let popup = $(".video-popup");
        let embedURL = convertToEmbed($(this).data("video")) + "?autoplay=1";

        popup.fadeIn(300).find("iframe").attr("src", embedURL);
        $("body").css("overflow", "hidden");
    });

    $(".video-popup, .close-video").on("click", function (e) {
        if (!$(e.target).closest("iframe").length) {
            let popup = $(".video-popup");
            popup.fadeOut(300).find("iframe").attr("src", "");
            $("body").css("overflow", "");
        }
    });

    $(".video-popup iframe").on("click", function (e) {
        e.stopPropagation();
    });

    // ============================================================
    //  AUTO YEAR
    // ============================================================
    $("#year").text(new Date().getUTCFullYear());

});
