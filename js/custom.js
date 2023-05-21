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
  let divHeight = $("section#" + id + "");

  // Calculating new position of scrollbar
  let position =
    scrollTo.offset().top - container.offset().top + container.scrollTop();

  $(".career_description").css({ height: divHeight.height() });
  $(".career_list>ul>li>a").removeClass("selected");
  $("#" + id + "").addClass("selected");

  // Setting the value of scrollbar
  container.scrollTop(position);

  localStorage.setItem("career_id", id);
});

$(window).on("resize", function (e) {
  let id = $(".career_list > ul > li > a.selected").attr("id");
  $("#" + id + "").click();
});

$(window).on("load", function () {
  let divHeight = $("section#" + localStorage.career_id + "");
  let i = false;

  $(".career_list > ul > li > a").each(function (key, value) {
    if (localStorage.career_id != "" && localStorage.career_id == value.id) {
      i = true;
    }
  });

  if (i == true) {
    $("#" + localStorage.getItem("career_id") + "").addClass("selected");
  } else {
    $(".career_list > ul > li").first().find("a").click();
    console.log("true");
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
  } else if (localStorage.getItem("theme_style") == "light") {
    $("body").removeClass("dark").addClass("light");
    $("#theme-change")
      .find("span")
      .removeClass("sun-icon")
      .addClass("moon-icon");
  }
});

$("#theme-change").click(function (e) {
  e.preventDefault();

  if ($("body").hasClass("light")) {
    $("body").removeClass("light").addClass("dark");
    $("#theme-change")
      .find("span")
      .removeClass("moon-icon")
      .addClass("sun-icon");
    localStorage.setItem("theme_style", "dark");
  } else {
    $("body").removeClass("dark").addClass("light");
    $("#theme-change")
      .find("span")
      .removeClass("sun-icon")
      .addClass("moon-icon");
    localStorage.setItem("theme_style", "light");
  }
});
