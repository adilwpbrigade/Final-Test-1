$(document).ready(function () {
  $(".hamburger").click(function () {
    if ($(window).width() <= 767) { // mobile only
      $(".secondary-nav").slideToggle(300);
    }
  });

  // Optional: reset nav when resizing back to desktop
  $(window).resize(function () {
    if ($(window).width() > 767) {
      $(".secondary-nav").show(); // always visible on desktop
    } else {
      $(".secondary-nav").hide(); // keep hidden on mobile until toggled
    }
  }).resize(); // run once on load to set correct state
    
 $(function () {
  const mq = window.matchMedia("(max-width: 767px)"); // adjust breakpoint

  function bindMobileHandlers() {
    removeMobileHandlers();

    // Submenu toggle (arrow image)
    $(document).on("click.mobileMenu", ".submenu-toggle", function (e) {
      e.preventDefault();

      const $this = $(this);
      const $submenu = $this.next(".sub-menu");

      // close siblings
      $this.parent().siblings().find(".sub-menu").slideUp(300).removeClass("open");
      $this.parent().siblings().find(".submenu-toggle").removeClass("active");

      // toggle current
      $submenu.slideToggle(300).toggleClass("open");
      $this.toggleClass("active");
    });

    // Sub-sub-menu toggle (arrow image inside sub-menu li)
    $(document).on("click.mobileMenu", ".subsubmenu-toggle", function (e) {
      e.preventDefault();

      const $this = $(this);
      const $subSub = $this.next(".sub-sub-menu");

      // close siblings
      $this.parent().siblings().find(".sub-sub-menu").slideUp(300).removeClass("open");
      $this.parent().siblings().find(".subsubmenu-toggle").removeClass("active");

      // toggle current
      $subSub.slideToggle(300).toggleClass("open");
      $this.toggleClass("active");
    });

    // Reset on hamburger click
    $(document).on("click.mobileMenu", ".hamburger", function () {
      $(".sub-menu, .sub-sub-menu")
        .slideUp(0)
        .removeClass("open")
        .removeAttr("style");
      $(".submenu-toggle, .subsubmenu-toggle").removeClass("active");
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
    }
  }

  syncHandlers();

  if (mq.addEventListener) {
    mq.addEventListener("change", syncHandlers);
  } else if (mq.addListener) {
    mq.addListener(syncHandlers); // older Safari
  }
});
$(".close-btn").click(function () {
  $(".top-bar").slideUp(300, function () {
    $(".primary-nav").css("top", "0");
    $(".secondary-nav").css("top", "60px"); // only height of primary-nav
    $("body").css("padding-top", "122px"); // adjust content push

     if ($(window).width() < 768){
            $("body").css("padding-top", "0px");
    }


  });
});

// ------------------------Swiper slider -------------------------------
var swiper = new Swiper(".main-section-slider", {
  spaceBetween: 28,
  loop: true, // keep looping

  pagination: {
    el: ".main-section-pagination", // ✅ scoped
    clickable: true,
  },

  navigation: {
    nextEl: ".main-section-next", // ✅ scoped
    prevEl: ".main-section-prev", // ✅ scoped
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      navigation: {
        enabled: false, // ✅ no nav on mobile
      },
    },
        500: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      navigation: {
        enabled: false, // ✅ no nav on mobile
      },
    },
    768: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      navigation: {
        enabled: false, // ✅ still off on tablet
      },
      spaceBetween: 31,
       
    },
    1024: {
      slidesPerView: 4,
      slidesPerGroup: 1,
      navigation: {
        enabled: true, // ✅ re-enable on desktop
      },
    },
  },
});


var mainswiper = new Swiper(".hero-section-Swiper", {
  slidesPerView: 1,
  loop: true,

  pagination: {
    el: ".hero-section-pagination", 
    clickable: true,
  },
  navigation: {
    nextEl: ".hero-section-next",  
    prevEl: ".hero-section-prev",  
  },
});


// ---------------------------------------- Tab -----------------------------------


  $(".tabcontent").hide();

  // Open the first tab by default
  $(".tabcontent:first").show();
  $(".tablinks:first").addClass("active");

  // On click tab button
  $(".tablinks").click(function (e) {
    e.preventDefault();

    // Remove active class from all
    $(".tablinks").removeClass("active");
    // Add active to clicked
    $(this).addClass("active");

    // Get target id from button's inner onclick attr OR define data attr
    var target = $(this).attr("onclick").match(/'([^']+)'/)[1];

    // Hide all and show the target
    $(".tabcontent").hide();
    $("#" + target).show();
  });

// Always keep first accordion open on load
var $accordion = $(".accordion");
var $headers = $accordion.find(".accordion-header");
var $contents = $accordion.find(".accordion-content");

// Ensure each header has an arrow span
$headers.each(function() {
  if ($(this).find(".accordion-arrow").length === 0) {
    $(this).append('<span class="accordion-arrow"></span>');
  }
});

// Close all, then open the first one by default
$contents.hide().removeClass("open");
$contents.first().addClass("open").slideDown(200);
$headers.removeClass("active");
$headers.first().addClass("active");

// Click behaviour - allow toggle
$headers.on("click", function () {
  var $h = $(this);
  var $c = $h.next(".accordion-content");

  if ($c.hasClass("open")) {
    // If already open → close it (so all can be closed)
    $c.stop(true, true).removeClass("open").slideUp(200);
    $h.removeClass("active");
  } else {
    // Close others
    $contents.stop(true, true).removeClass("open").slideUp(200);
    $headers.removeClass("active");

    // Open clicked one
    $c.stop(true, true).addClass("open").slideDown(200);
    $h.addClass("active");
  }
});

});



