// Helper function to determine the relative path prefix based on the current page location
function getPathPrefix() {
  const path = window.location.pathname;
  if (path.includes("/pages/auth/")) return "../../";
  if (path.includes("/pages/")) return "../";
  return "";
}

const pathPrefix = getPathPrefix();

// Function to load shared components (Header/Footer)
async function loadComponent(id, url) {
  try {
    // Prepend prefix to the component URL (removing leading slash if present)
    const fetchUrl = pathPrefix + url.replace(/^\//, "");
    const response = await fetch(fetchUrl);
    const html = await response.text();
    const container = document.getElementById(id);
    container.innerHTML = html;

    // Fix absolute-style paths (starting with /) in the injected content for GitHub Pages compatibility
    container.querySelectorAll("a, img").forEach((el) => {
      const attr = el.tagName === "A" ? "href" : "src";
      const val = el.getAttribute(attr);
      if (val && val.startsWith("/")) {
        el.setAttribute(attr, pathPrefix + val.substring(1));
      }
    });

    // Re-run observer for newly injected content to fix visibility/animation issues
    container.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Update active navigation link if the header was loaded
    if (id === "header-placeholder") setActiveNavLink();
  } catch (error) {
    console.error(`Error loading ${url}:`, error);
  }
}

// Magic Cursor Logic
const cursor = document.getElementById("magic-cursor");

// Only enable magic cursor on desktop devices with a fine pointer (mouse)
if (cursor && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
  });

  document.addEventListener("mousedown", () => {
    cursor.style.transform += " scale(0.8)";
    cursor.style.background = "rgba(0, 240, 255, 0.6)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform += " scale(1)";
    cursor.style.background = "rgba(0, 240, 255, 0.3)";
  });
} else if (cursor) {
  cursor.style.display = "none";
}

// Intersection Observer for reveal animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Global Link Handler: Redirect placeholder links to 404 or provide smooth scrolling for hashes
document.addEventListener("click", (e) => {
  const anchor = e.target.closest("a");
  if (!anchor) return;

  const href = anchor.getAttribute("href");

  // 1. Handle missing, empty, or placeholder '#' links
  if (
    !href ||
    href.trim() === "" ||
    href.trim() === "#" ||
    href === "javascript:void(0)"
  ) {
    e.preventDefault();
    window.location.href = pathPrefix + "pages/components/404.html";
    return;
  }
  // 2. Smooth Scroll for valid internal hash links (e.g., #services)
  if (href.startsWith("#") && href.length > 1) {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// Use absolute paths for loading components to ensure consistency across all pages
loadComponent("header-placeholder", "/pages/components/header.html");
loadComponent("footer-placeholder", "/pages/components/footer.html");

// Navbar Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".custom-navbar");
  if (navbar && window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else if (navbar) {
    navbar.classList.remove("scrolled");
  }
});

function toggleNavbar() {
  const navbar = document.querySelector(".custom-navbar");
  if (navbar && window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else if (navbar) {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", toggleNavbar);
window.addEventListener("load", toggleNavbar);

// Function to set the active class on the current page's nav link
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".custom-navbar .nav-link");

  navLinks.forEach((link) => {
    const rawHref = link.getAttribute("href");

    // Reset active state
    link.classList.remove("active");

    // Skip placeholders like '#', '', or 'javascript:void(0)' as they resolve to the current page path
    if (!rawHref || rawHref === "#" || rawHref === "javascript:void(0)") return;

    // link.pathname resolves relative URLs to absolute paths automatically
    const linkPath = link.pathname;

    // Normalize both paths by removing trailing slashes and 'index.html' for a clean comparison
    const normalize = (p) =>
      p.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";

    if (normalize(currentPath) === normalize(linkPath)) {
      link.classList.add("active");
    }
  });
}

// Scroll to Top Button Logic
window.addEventListener("scroll", () => {
  const scrollTopBtn = document.getElementById("scroll-to-top");
  if (scrollTopBtn) {
    window.scrollY > 400
      ? scrollTopBtn.classList.add("visible")
      : scrollTopBtn.classList.remove("visible");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest("#scroll-to-top")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

/* ==================================================
   LOGIN
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializePasswordToggle();
  initializeInputInteractions();
  initializeLoginForm();
  initializeKeyboardEnhancements();
  initializeContactForm(); // Initialize the contact form handler
  initializeButtonEffects();
});

/* ==================================================
   PASSWORD TOGGLE
================================================== */

function togglePassword(id = "password") {
  const passwordInput = document.getElementById(id);
  // Support both 'eye-icon' (Login pattern) and 'id-toggle-icon' (Register pattern)
  const eyeIcon =
    document.getElementById(id + "-toggle-icon") ||
    document.getElementById("eye-icon");

  if (!passwordInput || !eyeIcon) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    if (eyeIcon) eyeIcon.textContent = "visibility_off";
  } else {
    passwordInput.type = "password";
    if (eyeIcon) eyeIcon.textContent = "visibility";
  }
}

function initializePasswordToggle() {
  const passwordInput = document.getElementById("password");

  if (!passwordInput) return;

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      passwordInput.type = "password";

      const eyeIcon = document.getElementById("eye-icon");

      if (eyeIcon) {
        eyeIcon.textContent = "visibility";
      }
    }
  });
}

/* ==================================================
   INPUT MICRO INTERACTIONS
================================================== */

function initializeInputInteractions() {
  const formElements = document.querySelectorAll(
    ".custom-input, .form-control, .form-select",
  );

  formElements.forEach((element) => {
    const wrapper =
      element.closest(".mb-4") ||
      element.closest(".position-relative") ||
      element.parentElement;

    element.addEventListener("focus", () => {
      if (wrapper) {
        wrapper.classList.add("form-focus");
      }
    });

    element.addEventListener("blur", () => {
      if (wrapper) {
        wrapper.classList.remove("form-focus");
      }
    });

    element.addEventListener("input", () => {
      if (element.value.trim() !== "") {
        element.classList.add("has-value");
      } else {
        element.classList.remove("has-value");
      }
    });
  });
}

/* ==================================================
   LOGIN FORM SUBMIT
================================================== */

function initializeLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;
  loginForm.addEventListener("submit", handleLoginSubmit);
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');

  if (!submitButton) return;

  if (!validateForm(form)) {
    return;
  }

  startAuthenticationAnimation(submitButton);
  setTimeout(() => {
    showSuccessState(submitButton);
  }, 1500);
}

/* ==================================================
   VALIDATION
================================================== */

function validateForm(form) {
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = document.getElementById("password");
  const roleSelect = form.querySelector("select");

  if (roleSelect && roleSelect.selectedIndex === 0) {
    roleSelect.focus();
    shakeElement(roleSelect);
    return false;
  }

  if (emailInput && emailInput.value.trim() === "") {
    emailInput.focus();
    shakeElement(emailInput);
    return false;
  }

  if (passwordInput && passwordInput.value.trim() === "") {
    passwordInput.focus();
    shakeElement(passwordInput);
    return false;
  }

  return true;
}

/* ==================================================
   AUTHENTICATION ANIMATION
================================================== */

function startAuthenticationAnimation(button) {
  button.disabled = true;
  button.innerHTML = `
    <span class="material-symbols-outlined spin">
      progress_activity
    </span>
    Authenticating...
  `;
}

/* ==================================================
   SUCCESS STATE
================================================== */

function showSuccessState(button) {
  button.innerHTML = `
    <span class="material-symbols-outlined">
      verified_user
    </span>
    Access Granted
  `;
  button.style.background = "#d5e3fd";
  button.style.color = "#0d1c2f";
  button.style.boxShadow = "0 0 25px rgba(213,227,253,.4)";
  button.classList.add("success-state");

  createSuccessPulse(button);

  setTimeout(() => {
    // window.location.href = pathPrefix + "pages/dashboard/dashboard.html";
    window.location.href = pathPrefix + "index.html";
  }, 1500);
}

/* ==================================================
   CONTACT FORM SUBMIT
================================================== */

function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    // Redirect to the 404 page
    window.location.href = pathPrefix + "pages/components/404.html";
  });
}

/* ==================================================
   SHAKE EFFECT
================================================== */

function shakeElement(element) {
  element.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-5px)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(-5px)" },
      { transform: "translateX(0)" },
    ],
    {
      duration: 300,
      easing: "ease",
    },
  );
}

/* ==================================================
   SUCCESS PULSE
================================================== */

function createSuccessPulse(button) {
  button.animate(
    [
      {
        transform: "scale(1)",
      },
      {
        transform: "scale(1.03)",
      },
      {
        transform: "scale(1)",
      },
    ],
    {
      duration: 700,
      easing: "ease-out",
    },
  );
}

/* ==================================================
   KEYBOARD SHORTCUTS
================================================== */

function initializeKeyboardEnhancements() {
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      document.activeElement &&
      document.activeElement.tagName === "INPUT"
    ) {
      const form = document.getElementById("loginForm");

      if (form) {
        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton && !submitButton.disabled) {
          submitButton.classList.add("keyboard-submit");

          setTimeout(() => {
            submitButton.classList.remove("keyboard-submit");
          }, 300);
        }
      }
    }
  });
}

/* ==================================================
   BUTTON HOVER ENHANCEMENTS
================================================== */

function initializeButtonEffects() {
  const loginButton = document.getElementById("loginBtn");

  if (!loginButton) return;

  loginButton.addEventListener("mouseenter", () => {
    loginButton.animate(
      [
        {
          transform: "translateY(0px)",
        },
        {
          transform: "translateY(-2px)",
        },
      ],
      {
        duration: 200,
        fill: "forwards",
      },
    );
  });

  loginButton.addEventListener("mouseleave", () => {
    loginButton.animate(
      [
        {
          transform: "translateY(-2px)",
        },
        {
          transform: "translateY(0px)",
        },
      ],
      {
        duration: 200,
        fill: "forwards",
      },
    );
  });
}

/* ==================================================
   GLOBAL ACCESS
================================================== */

/* ==================================================
   Register
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeUsernameFilter();
  initializeRegistrationPasswordValidation();
  initializeTiltEffect();
  initializeRegistrationForm();
});

// Consolidated togglePassword function is defined at the top

function initializeUsernameFilter() {
  const username = document.getElementById("username");
  const operatorName = document.getElementById("operatorName");

  [username, operatorName].forEach((input) => {
    if (input) {
      input.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
      });
    }
  });
}

function initializeTiltEffect() {
  const card = document.querySelector(".register-panel");

  if (!card) return;

  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 992) return;

    const x = (window.innerWidth / 2 - e.pageX) / 60;

    const y = (window.innerHeight / 2 - e.pageY) / 60;

    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

/* ==================================================
   REGISTRATION PASSWORD VALIDATION
================================================== */

function validateRegistrationPassword(passwordInput) {
  const password = passwordInput.value;
  let errorMessage = "";

  // Minimum length
  if (password.length < 8) {
    errorMessage += "Password must be at least 8 characters long.\n";
  }
  // Uppercase letter
  if (!/[A-Z]/.test(password)) {
    errorMessage += "Password must contain at least one uppercase letter.\n";
  }
  // Lowercase letter
  if (!/[a-z]/.test(password)) {
    errorMessage += "Password must contain at least one lowercase letter.\n";
  }
  // Number
  if (!/[0-9]/.test(password)) {
    errorMessage += "Password must contain at least one number.\n";
  }
  // Special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
    errorMessage += "Password must contain at least one special character.\n";
  }

  passwordInput.setCustomValidity(errorMessage);

  const feedback = document.getElementById("password-feedback");
  if (feedback) {
    feedback.textContent = errorMessage;
  }

  return errorMessage === "";
}

function initializeRegistrationForm() {
  const form = document.getElementById("registrationForm");

  if (!form) return;

  const passwordInput = document.getElementById("password");
  const confirm = document.getElementById("confirm-password");
  if (confirm) {
    // Clear the custom validity error as the user types
    // This allows the browser to permit the 'submit' event to fire again
    confirm.addEventListener("input", () => confirm.setCustomValidity(""));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate password strength first
    if (passwordInput && !validateRegistrationPassword(passwordInput)) {
      passwordInput.reportValidity();
      return;
    }

    if (passwordInput && confirm && passwordInput.value !== confirm.value) {
      confirm.setCustomValidity("Passwords do not match");
      confirm.reportValidity();

      return;
    }

    confirm.setCustomValidity("");

    const btn = document.getElementById("registerBtn");

    btn.disabled = true;

    btn.innerHTML = `
        <span class="material-symbols-outlined spin">
          progress_activity
        </span>
        SECURING...
      `;

    setTimeout(() => {
      btn.innerHTML = `
          <span class="material-symbols-outlined">
            check_circle
          </span>
          PROTOCOL ACTIVATED
        `;

      btn.style.background = "#22c55e";

      btn.style.color = "#ffffff";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    }, 2000);
  });
}

function initializeRegistrationPasswordValidation() {
  const passwordInput = document.getElementById("password");
  const isRegistrationPage = document.getElementById("registrationForm");

  if (passwordInput && isRegistrationPage) {
    passwordInput.addEventListener("input", () => {
      validateRegistrationPassword(passwordInput);
    });
  }
}

/* ==================================================
   VIDEO PLAYER
================================================== */

function initializeVideoPlayer() {
  const video = document.getElementById("metricsVideo");
  const playBtn = document.getElementById("playVideoBtn");
  const overlay = document.querySelector(".play-overlay");

  if (!video || !playBtn) return;

  playBtn.addEventListener("click", () => {
    video.play();
    if (overlay) overlay.style.opacity = "0";
    if (overlay) overlay.style.pointerEvents = "none";
  });

  video.addEventListener("ended", () => {
    if (overlay) overlay.style.opacity = "1";
    if (overlay) overlay.style.pointerEvents = "auto";
    video.load(); // Reset to show poster
  });
}

document.addEventListener("DOMContentLoaded", initializeVideoPlayer);

/* ==================================================
   PRICING TOGGLE
================================================== */

function initializePricingToggle() {
  const pricingToggle = document.querySelector(".pricing-toggle");
  if (!pricingToggle) return;

  const buttons = pricingToggle.querySelectorAll(".btn");
  const priceElements = document.querySelectorAll(".pricing-card .price");
  const durationElements = document.querySelectorAll(".pricing-card .duration");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active-plan"));
      btn.classList.add("active-plan");

      const isYearly = btn.classList.contains("yearly-plan");
      priceElements.forEach((el) => {
        el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
      });
      durationElements.forEach((el) => {
        el.textContent = isYearly ? "/yr" : "/mo";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initializePricingToggle);

// Home Page Loader Logic
function initializeHomeLoader() {
  const loader = document.getElementById("initial-loader");
  if (!loader) return;

  document.body.classList.add("loading");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    document.body.classList.remove("loading");
    setTimeout(() => loader.remove(), 600);
  }, 2000);
}

document.addEventListener("DOMContentLoaded", initializeHomeLoader);
window.togglePassword = togglePassword;
