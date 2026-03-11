(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// For index page js

function scrollCategories(value) {
  document
    .getElementById("filters")
    .scrollBy({ left: value, behavior: "smooth" });
}

let NewToggle = document.querySelector("#taxToggle");

if (NewToggle) {
  NewToggle.addEventListener("change", () => {
    document.querySelectorAll(".listingPrice").forEach((priceEl) => {
      let base = Number(priceEl.dataset.price);
      let final;
      if (NewToggle.checked) {
        final = base * 1.1;
        priceEl.innerHTML = `₹ ${Math.floor(final).toLocaleString("en-IN")} / Night  (Include taxes)`;
      } else {
        final = base;
        priceEl.innerHTML = `₹ ${Math.floor(final).toLocaleString("en-IN")} / Night`;
      }
    });
  });
}

// collapsebar
const menuBtn = document.getElementById("menuBtn");
const menu = document.querySelector(".collapsebar");
const closeBtn = document.querySelector(".close-menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
  });
}

if (closeBtn && menu) {
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
  });
}

if (menu) {
  menu.addEventListener("click", (e) => {
    if (e.target === menu) {
      menu.classList.remove("active");
    }
  });
}

// Image showall and colse
function openGallery() {
  document.getElementById("galleryModal").style.display = "block";
}

function closeGallery() {
  document.getElementById("galleryModal").style.display = "none";
}

// Login-signup-closebtn
const closeLogin = document.querySelector(".close-login");
const loginOuter = document.querySelector(".login-outer");

if (closeLogin) {
  closeLogin.addEventListener("click", () => {
    loginOuter.style.display = "none";
  });
}

// laoder
const formsWithLoader = document.querySelectorAll("form");

formsWithLoader.forEach((form) => {
  form.addEventListener("submit", function () {
    const btn = form.querySelector(".action-btn");
    const btn2 = form.querySelector(".action-btn2");

    if (btn) {
      btn.disabled = true;

      btn.innerHTML = `
      <span class="spinner-border spinner-border-sm"></span>
      Processing...
      `;
    }
    if (btn2) {
      btn2.disabled = true;
    }
  });
});

//page loader
window.addEventListener("load", function () {
  const loader = document.getElementById("pageLoader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 400);
  }
});
