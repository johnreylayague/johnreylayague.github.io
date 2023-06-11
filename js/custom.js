// WOW Initialized
new WOW().init();

var typed = new Typed("#typed", {
  stringsElement: "#typed-strings",
  typeSpeed: 50,
});

// var owl = $(".owl-carousel");

// owl.owlCarousel({
//   margin: 37,
//   dotsEach: true,
//   loop: false,
//   responsive: {
//     0: {
//       items: 1,
//     },
//     600: {
//       items: 2,
//     },
//     1000: {
//       items: 3,
//     },
//   },
// });
const owl_portfolio = $("#owl-carousel-portfolio");
function initializeCarousel() {
  owl_portfolio.trigger("destroy.owl.carousel"); // Destroy the carousel
  owl_portfolio.owlCarousel({
    loop: false,
    nav: false,
    lazyLoad: true,
    responsive: {
      0: {
        margin: 15,
        items: 1,
        dots: true,
        mouseDrag: true,
      },
      576: {
        margin: 15,
        items: 2,
        dots: true,
        mouseDrag: true,
      },
      768: {
        margin: 15,
        items: 3,
        dots: false,
        mouseDrag: false,
      },
    },
  });
}

initializeCarousel();

// Window resize event
$(window).on("resize", function () {
  initializeCarousel();
});

$("#owl-carousel-testimonial").owlCarousel({
  loop: false,
  nav: false,
  dots: true,
  lazyLoad: true,
  responsive: {
    0: {
      margin: 15,
      items: 1,
    },
    576: {
      margin: 15,
      items: 2,
    },
    768: {
      margin: 15,
      items: 3,
    },
  },
});

// function checkOwlItems() {
//   var itemCount = owl_portfolio.find(".owl-item").length;
//   if (itemCount > 3) {
//     $("#portfolio-owl-prev").show();
//     $("#portfolio-owl-next").show();
//   } else {
//     $("#portfolio-owl-prev").hide();
//     $("#portfolio-owl-next").hide();
//   }
//   if (owl_portfolio.find(".owl-item.active").first().index() == 0) {
//     $("#portfolio-owl-prev")
//       .prop("disabled", true)
//       .css({ cursor: "not-allowed" });
//   } else {
//     $("#portfolio-owl-next").prop("disabled", false).css({ cursor: "pointer" });
//   }
// }

// $("#portfolio-owl-prev").click(function () {
//   $("#owl-carousel-portfolio.owl-carousel").trigger("prev.owl.carousel");
//   if (owl_portfolio.find(".owl-item.active").first().index() == 0) {
//     $("#portfolio-owl-prev")
//       .prop("disabled", true)
//       .css({ cursor: "not-allowed" });
//   }
//   $("#portfolio-owl-next").prop("disabled", false).css({ cursor: "pointer" });
// });
// $("#portfolio-owl-next").click(function () {
//   $("#owl-carousel-portfolio.owl-carousel").trigger("next.owl.carousel");
//   // Check if current item is the last item

//   if (
//     owl_portfolio.find(".owl-item.active").last().index() ==
//     owl_portfolio.find(".owl-item").length - 1
//   ) {
//     $("#portfolio-owl-next")
//       .prop("disabled", true)
//       .css({ cursor: "not-allowed" });
//   }
//   $("#portfolio-owl-prev").prop("disabled", false).css({ cursor: "pointer" });
// });

// button prev and next
$("#portfolio-owl-prev").click(function () {
  $("#owl-carousel-portfolio.owl-carousel").trigger("prev.owl.carousel");
});

$("#portfolio-owl-next").click(function () {
  $("#owl-carousel-portfolio.owl-carousel").trigger("next.owl.carousel");
});
// button prev and next

// owl_portfolio.on("mousewheel", ".owl-stage", function (e) {
//   if (e.deltaY > 0) {
//     owl_portfolio.trigger("next.owl");
//   } else {
//     owl_portfolio.trigger("prev.owl");
//   }
//   e.preventDefault();
// });

$(".career_list > ul > li > a").click(function (e) {
  e.preventDefault();
  let id = e.currentTarget.id;

  let container = $(".career_description");
  let scrollTo = $("section#" + id + "");

  // Calculating new position of scrollbar
  let position =
    scrollTo.offset().top - container.offset().top + container.scrollTop();

  // $(".career_description").css({ height: divHeight.height() });
  $(".career_list>ul>li>a").removeClass("selected");
  $("#" + id + "").addClass("selected");

  // Setting the value of scrollbar
  container.scrollTop(position);

  localStorage.setItem("career_id", id);
});

// let container = $(".career_description");
// const elementData = [];

// $(".career_list > ul > li")
//   .find("a")
//   .each(function () {
//     var element = this;
//     var elementId = element.id;

//     let scrollTo = $("section#" + elementId + "");
//     let position =
//       scrollTo.offset().top - container.offset().top + container.scrollTop();

//     if (elementId) {
//       elementData.push({
//         id: elementId,
//         value: position,
//       });
//     }
//   });

// here
$(".career_description").scroll(function () {
  let container = $(".career_description");
  let career_list = $(".career_list > ul > li").find("a");
  const elementData = [];

  career_list.each(function () {
    var element = this;
    var elementId = element.id;

    let scrollTo = $("section#" + elementId + "");
    let position =
      scrollTo.offset().top - container.offset().top + container.scrollTop();

    if (elementId) {
      elementData.push({
        id: elementId,
        value: position,
      });
    }
  });

  let scroll = container.scrollTop() + 60;
  let scrollHeight = $(this).prop("scrollHeight");
  let containerHeight = $(this).height();
  let scrollTop = $(this).scrollTop() + containerHeight;

  let lastElement = $(elementData).last().get(0);
  career_list.each(function () {
    var element = this;
    $("#" + element.id + "").removeClass("selected");
  });

  for (let i = 0; i < elementData.length; i++) {
    y = i + 1;
    if (elementData.length != y) {
      if (scroll < elementData[y].value) {
        $("#" + elementData[i].id + "").addClass("selected");
        localStorage.setItem("career_id", elementData[i].id);
        break;
      }
    }
  }

  if (scrollTop >= scrollHeight) {
    career_list.each(function () {
      var element = this;
      $("#" + element.id + "").removeClass("selected");
    });

    $("#" + lastElement.id + "").addClass("selected");
    localStorage.setItem("career_id", lastElement.id);
  }
});

$(window).on("resize", function (e) {
  let id = $(".career_list > ul > li > a.selected").attr("id");
  $("#" + id + "").click();
});

$(window).on("load", function () {
  let divHeight = $("section#" + localStorage.career_id + "");
  let i = false;
  let scroll_height = $(window).scrollTop();

  if (scroll_height != 0) {
    $("#header").addClass("shadow");
  }

  $(".career_list > ul > li > a").each(function (key, value) {
    if (localStorage.career_id != "" && localStorage.career_id == value.id) {
      i = true;
    }
  });

  if (i == true) {
    $("#" + localStorage.getItem("career_id") + "").addClass("selected");
  } else {
    $(".career_list > ul > li").first().find("a").click();
  }

  if (localStorage.career_id != "") {
    $(".career_description").css({ height: divHeight.height() });
    $("#" + localStorage.getItem("career_id") + "").addClass("selected");
    $("#" + localStorage.career_id + "").click();
  } else {
    $(".career_list > ul > li").first().find("a").addClass("selected");
    $(".career_list > ul > li")
      .first()
      .find("a")
      .css({ height: divHeight.height() });
    localStorage.setItem(
      "career_id",
      $(".career_list > ul > li").first().find("a").attr("id")
    );
    $(".career_list > ul > li").first().find("a").attr("id").click();
  }
  // theme changed onload page
  if (localStorage.getItem("theme_style") == "dark") {
    $("body").removeClass("light").addClass("dark");
    $("#theme-change")
      .find("span")
      .removeClass("moon-icon")
      .addClass("sun-icon");
    $("#profile-logo").attr("src", function (i, src) {
      var currentFileName = src.split("/").pop();
      var newPath = src.replace(currentFileName, "portfolio-logo-dark.svg");
      $(this).attr("src", newPath);
    });
  } else if (localStorage.getItem("theme_style") == "light") {
    $("body").removeClass("dark").addClass("light");
    $("#theme-change")
      .find("span")
      .removeClass("sun-icon")
      .addClass("moon-icon");
    $("#profile-logo").attr("src", function (i, src) {
      var currentFileName = src.split("/").pop();
      var newPath = src.replace(currentFileName, "portfolio-logo.svg");
      $(this).attr("src", newPath);
    });
  }
});
function SwitchTheme() {
  if ($("body").hasClass("light")) {
    $("body").removeClass("light").addClass("dark");
    $("#theme-change")
      .find("span")
      .removeClass("moon-icon")
      .addClass("sun-icon");
    localStorage.setItem("theme_style", "dark");

    $("#profile-logo").attr("src", function (i, src) {
      var currentFileName = src.split("/").pop();
      var newPath = src.replace(currentFileName, "portfolio-logo-dark.svg");
      $(this).attr("src", newPath);
    });
  } else {
    $("body").removeClass("dark").addClass("light");
    $("#theme-change")
      .find("span")
      .removeClass("sun-icon")
      .addClass("moon-icon");
    localStorage.setItem("theme_style", "light");

    $("#profile-logo").attr("src", function (i, src) {
      var currentFileName = src.split("/").pop();
      var newPath = src.replace(currentFileName, "portfolio-logo.svg");
      $(this).attr("src", newPath);
    });
  }
}
$("#theme-change").click(function (e) {
  e.preventDefault();
  SwitchTheme();
});
$(".mobile_nav_list > #theme-change").click(function (e) {
  e.preventDefault();
  SwitchTheme();
});

const height = $("#header").height();

$("#nav_portfolio,#mobile_nav_portfolio").click(function (e) {
  e.preventDefault();
  $("html, body").animate(
    { scrollTop: $("#portfolio").offset().top - height },
    1000
  );
});

$("#nav_home,#mobile_nav_home").click(function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 1000);
});

$("#nav_testimonial,#mobile_nav_testimonial").click(function (e) {
  e.preventDefault();

  $("html, body").animate(
    { scrollTop: $("#testimonial").offset().top - height },
    1000
  );
});

$("#nav_edu_skills,#mobile_nav_edu_skills").click(function (e) {
  e.preventDefault();

  $("html, body").animate(
    { scrollTop: $("#education-and-skills").offset().top - height },
    1000
  );
});

$("#nav_contact_us,#mobile_nav_contact_us").click(function (e) {
  e.preventDefault();

  $("html, body").animate(
    { scrollTop: $("#contact").offset().top - height },
    1000
  );
});

$("#nav_experience,#mobile_nav_experience").click(function (e) {
  e.preventDefault();

  $("html, body").animate(
    { scrollTop: $("#career-path").offset().top - height },
    1000
  );
});

$("#nav_experience,#mobile_nav_experience").click(function (e) {
  e.preventDefault();

  $("html, body").animate(
    { scrollTop: $("#career-path").offset().top - height },
    1000
  );
});

$("#three-bar").click(function (e) {
  e.preventDefault();
  $(".mobile_nav_list > ul").addClass("is-open");
  $("#sideBarLayer").addClass("show");
  $("body").addClass("onscroll");

  if ($("#sideBarLayer").css("display") == "block") {
    $("#sideBarLayer").removeClass("opacity-0").addClass("opacity-1");
  }
});

$("#mobile_nav_bar,#sideBarLayer").click(function (e) {
  e.preventDefault();
  $(".mobile_nav_list > ul").removeClass("is-open");
  $("#sideBarLayer").removeClass("opacity-1").addClass("opacity-0");

  $(".opacity-0").on(
    "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
    function () {
      // Transition has ended, do something here

      $(".mobile_nav_list > ul").removeClass("is-open");
      $("#sideBarLayer").removeClass("show");
      $("body").removeClass("onscroll");
      // Remove the event handler if needed
      $(".opacity-0").off(
        "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
      );
    }
  );
});

$(document).on("scroll", function () {
  let get_height = $("#header").offset().top;
  let scroll_height = $(window).scrollTop();
  let sidebar = $(".mobile_nav_list > ul").is(".is-open");

  if (scroll_height > get_height || scroll_height != 0) {
    $("#header").addClass("shadow");
  } else {
    $("#header").removeClass("shadow");
  }
});
