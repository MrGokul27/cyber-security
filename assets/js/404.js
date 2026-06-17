document.addEventListener("DOMContentLoaded", () => {
  initTimestamp();
  initParallaxShield();
  initNavbarScrollEffect();
  initButtonEffects();
  initCardHoverEffects();
});

/* ==================================================
   LIVE TIMESTAMP
================================================== */

function initTimestamp() {
  const timestampElement = document.getElementById("live-timestamp");

  if (!timestampElement) return;

  function updateTimestamp() {
    const now = new Date();

    const pad = (value) => String(value).padStart(2, "0");

    const timestamp =
      `${pad(now.getHours())}:` +
      `${pad(now.getMinutes())}:` +
      `${pad(now.getSeconds())}:` +
      `${String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0")}`;

    timestampElement.textContent = timestamp;

    requestAnimationFrame(updateTimestamp);
  }

  updateTimestamp();
}

/* ==================================================
   PARALLAX SHIELD EFFECT
================================================== */

function initParallaxShield() {
  const shield =
    document.querySelector(".shield-card") ||
    document.querySelector(".glass-card");

  if (!shield) return;

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 992;

  if (isTouchDevice) {
    startFloatingAnimation(shield);
    return;
  }

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = (window.innerWidth / 2 - event.clientX) / 40;
    mouseY = (window.innerHeight / 2 - event.clientY) / 40;
  });

  function animateShield() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    shield.style.transform = `translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(animateShield);
  }

  animateShield();
}

/* ==================================================
   MOBILE FLOATING ANIMATION
================================================== */

function startFloatingAnimation(element) {
  let start = null;

  function float(timestamp) {
    if (!start) start = timestamp;

    const progress = (timestamp - start) / 1000;

    const y = Math.sin(progress) * 6;

    element.style.transform = `translateY(${y}px)`;

    requestAnimationFrame(float);
  }

  requestAnimationFrame(float);
}

/* ==================================================
   NAVBAR SCROLL EFFECT
================================================== */

function initNavbarScrollEffect() {
  const navbar = document.querySelector(".cypher-navbar");

  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 30) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, {
    passive: true,
  });
}

/* ==================================================
   BUTTON INTERACTIONS
================================================== */

function initButtonEffects() {
  const buttons = document.querySelectorAll(".btn-cyan, .btn-outline-cyan");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
    });

    button.addEventListener("mousedown", () => {
      button.style.transform = "translateY(1px) scale(0.98)";
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "translateY(-2px)";
    });

    // Handle "Go back" button click
    if (button.classList.contains("btn-outline-cyan")) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = "../../index.html";
        }
      });
    }
  });
}

/* ==================================================
   GLASS CARD MICRO INTERACTIONS
================================================== */

function initCardHoverEffects() {
  const cards = document.querySelectorAll(".glass-card");

  if (!cards.length) return;

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) return;

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform .35s ease, box-shadow .35s ease";

      card.style.boxShadow =
        "0 0 40px rgba(0,240,255,.12), inset 0 0 20px rgba(0,240,255,.05)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";

      card.style.boxShadow = "";
    });
  });
}

/* ==================================================
   BOOTSTRAP TOOLTIP SUPPORT
================================================== */

function initBootstrapTooltips() {
  if (typeof bootstrap === "undefined") return;

  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  );

  tooltipTriggerList.map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
  );
}

initBootstrapTooltips();

/* ==================================================
   PERFORMANCE OPTIMIZATION
================================================== */

let resizeTimer;

window.addEventListener(
  "resize",
  () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      document.body.classList.add("resized");

      setTimeout(() => {
        document.body.classList.remove("resized");
      }, 200);
    }, 100);
  },
  { passive: true },
);

/* ==================================================
   REDUCE MOTION SUPPORT
================================================== */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reduceMotion.matches) {
  document.documentElement.classList.add("reduce-motion");
}
