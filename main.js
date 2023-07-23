/* 
=======================================
Mobile menu functionality
=======================================
*/

$(".open-burger").on("click", function () {
  $("#myNav").css("width", "100%");
});

$(".close-burger").on("click", function () {
  $("#myNav").css("width", "0%");
});

/* 
=======================================
Quote slider
=======================================
*/

var slideIndex = 1;
var galleryIndex = 1;

showSlides(slideIndex, false);
showSlides(galleryIndex, true);

function plusSlides(n, gallery) {
  if (gallery) {
    showSlides((galleryIndex += n), true);
  } else {
    showSlides((slideIndex += n), false);
  }
}

function currentSlide(n, gallery) {
  if (gallery) {
    showSlides((galleryIndex = n), true);
    console.log(n);
  } else {
    showSlides((slideIndex = n), false);
  }
}

function showSlides(n, gallery) {
  if (gallery) {
    let i;
    let slides = document.getElementsByClassName("myGalSlides");
    let dots = document.getElementsByClassName("galDot");
    if (n > slides.length) {
      galleryIndex = 1;
    }
    if (n < 1) {
      galleryIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[galleryIndex - 1].style.display = "block";
    dots[galleryIndex - 1].className += " active";
  } else {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
}

/* 
=======================================
Scroll to anchor id's
=======================================
*/

// Select all links with hashes

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

function formatPhoneNumber() {
  let value = $("#number").val();
  value = value.replace(/\D/g, "");

  if (value.length >= 10) {
    value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }

  $("#number").val(value);
}
$("#number").on("input", formatPhoneNumber);

function emailOrNumber() {
  const phoneNumber = $("#number").val();
  const email = $("#email").val();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (phoneNumber.length !== 14 && !isEmail.test(email)) {
    $("#number").attr("required", true);
    $("#email").attr("required", true);
  } else {
    $("#number").attr("required", false);
    $("#email").attr("required", false);
  }
}

$("form").on("input", emailOrNumber);

$("form").on("submit", async function sendForm(event) {
  await event.preventDefault();
  $(".mybtn").attr("disabled", true);

  await $.ajax({
    method: "POST",
    url: "https://formsubmit.co/ajax/landryandrewsk8@gmail.com",
    dataType: "json",
    accepts: "application/json",
    data: {
      name: $("#name").val(),
      email: $("#email").val(),
      phone_number: $("#number").val() || "N/A",
      message: $("#message").val() || "N/A",
      _subject: "New submission from Steelworx.com!",
    },
    success: () => $("#modal-container").css("display", "flex"),
    error: (err) => console.log(err),
  });
  $("#name").val("");
  $("#email").val("");
  $("#number").val("");
  $("#message").val("");
  $(".mybtn").attr("disabled", false);

  // $("#modal-container").show();
});

$("#close-modal").click(function () {
  $("#modal-container").css("display", "none");
});
