// =========================
// NAVBAR FETCH (common navbar loader)
// =========================
document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error("Navbar file not found");
      return response.text();
    })
    .then((data) => {
      // ✅ Insert navbar at top of body
      document.body.insertAdjacentHTML("afterbegin", data);

      // Once navbar is loaded, attach menu logic
      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("navMenu");

      if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
          navMenu.classList.toggle("active");
          hamburger.classList.toggle("active");
        });

        // Close menu when link clicked
        document.querySelectorAll(".nav-menu a").forEach((link) => {
          link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
          });
        });
      }

      // Dropdown toggle for mobile
      document.querySelectorAll(".dropdown > a").forEach((drop) => {
        drop.addEventListener("click", (e) => {
          e.preventDefault();
          const menu = drop.nextElementSibling;
          menu.classList.toggle("active");
        });
      });

      // ✅ Initialize other features only AFTER navbar is ready
      initSmoothScroll();
      initKnowMorePopup();
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

// =========================
// SCROLL + LINK LOGIC
// =========================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) navbar.style.transform = "translateY(0)";
});

// =========================
// Smooth scrolling function
// =========================
function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// =========================
// KNOW MORE SIDE PANEL
// =========================
function initKnowMorePopup() {
  const knowMoreBtn = document.querySelector(".know-more-btn");
  if (!knowMoreBtn) return;

  knowMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "about.html";

    // Create overlay
    let overlay = document.querySelector(".popup-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "popup-overlay";
      document.body.appendChild(overlay);
    }

    // Create popup
    let popup = document.querySelector(".popup-box");
    if (!popup) {
      popup = document.createElement("div");
      popup.className = "popup-box";
      popup.innerHTML = `
        <h2>Falling Weight Deflectometer (FWD)</h2>
        <img src="fwd_image.jpg" alt="FWD Equipment" style="width:100%; border-radius:10px; margin-bottom:15px;">
        <p>
          A Falling Weight Deflectometer (FWD) is a non-destructive pavement testing
          device that simulates the loading of a moving wheel (like a truck axle) on
          the road surface. It helps engineers measure how pavement layers respond
          to dynamic loads, so they can evaluate the structural capacity and
          remaining life of the pavement.
        </p>
        <h3>Principle of Operation</h3>
        <p>
          A known weight (mass) is dropped from a specified height onto a loading plate
          resting on the pavement. The drop generates a short-duration impact force (~25–150 ms),
          which mimics the pressure exerted by a passing vehicle tire. The force is transferred
          through a circular plate. Deflection sensors placed at various radial distances from the load
          record the pavement’s vertical movement. The deflection profile (called a deflection bowl)
          is analyzed to estimate pavement stiffness, layer moduli, and load-bearing capacity.
        </p>
        <button class="close-popup">Close</button>
      `;
      document.body.appendChild(popup);
    }

    // Activate popup
    overlay.classList.add("active");
    popup.classList.add("active");

    // Close logic
    const closePopup = () => {
      popup.classList.remove("active");
      overlay.classList.remove("active");
    };
    popup.querySelector(".close-popup").onclick = closePopup;
    overlay.onclick = closePopup;
  });
}
const section = document.querySelector('.leadership-container');
window.addEventListener('scroll', () => {
  const top = section.getBoundingClientRect().top;
  if(top < window.innerHeight - 100) section.classList.add('show');
});
