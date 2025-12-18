document.addEventListener("DOMContentLoaded", function () {
  // ===================== 1. MOBILE MENU TOGGLE =====================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      this.innerHTML = navLinks.classList.contains("active")
        ? "&times;"
        : "&#9776;";
    });
  } // ===================== 2. MOBILE DROPDOWN TOGGLE =====================

  const navItems = document.querySelectorAll(".nav-item.dropdown");
  if (navItems.length > 0) {
    navItems.forEach((item) => {
      const link = item.querySelector(".nav-link");
      const dropdownMenu = item.querySelector(".dropdown-menu");

      if (link && dropdownMenu) {
        link.addEventListener("click", function (e) {
          if (window.getComputedStyle(menuToggle).display !== "none") {
            e.preventDefault();
            e.stopPropagation(); // Close other open dropdowns

            navItems.forEach((i) => {
              if (i !== item) {
                const otherMenu = i.querySelector(".dropdown-menu");
                if (otherMenu) otherMenu.classList.remove("active");
              }
            });

            dropdownMenu.classList.toggle("active");
          }
        });
      }
    });
  } // ===================== 3. CLOSE MENU WHEN LINK CLICKED =====================

  const navLinksAll = document.querySelectorAll(".nav-links a");
  navLinksAll.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.getComputedStyle(menuToggle).display !== "none") {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = "&#9776;";
      }
    });
  }); // ===================== 7. AUTO-SCROLL SERVICES GRID =====================

  const servicesGrid = document.querySelector(".services-grid");
  if (servicesGrid) {
    let scrollPos = 0;
    let direction = 1;
    const speed = 0.5;

    function autoScroll() {
      const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
      if (maxScroll <= 0) return;

      scrollPos += speed * direction;
      if (scrollPos >= maxScroll) direction = -1;
      else if (scrollPos <= 0) direction = 1;

      servicesGrid.scrollLeft = scrollPos;
      requestAnimationFrame(autoScroll);
    }

    if (servicesGrid.scrollWidth > servicesGrid.clientWidth) autoScroll();
  } // ===================== 8. BOOTSTRAP CAROUSEL =====================

  const carouselEl = document.querySelector("#flooringGalleryCarousel");
  if (carouselEl && typeof bootstrap !== "undefined") {
    new bootstrap.Carousel(carouselEl, {
      interval: 3500,
      wrap: true,
      pause: false,
    });
  } // ===================== 9. NAVBAR SCROLL EFFECT =====================

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(47, 51, 58, 0.95)";
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
      } else {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        navbar.style.boxShadow = "none";
      }
    });
  } // ===================== 10. METALLIC MONO CHROME SERIES =====================

  const finishSets = Array.from(document.querySelectorAll(".finish-set"));
  const finishNext = document.querySelector(".finish-next");
  const finishPrev = document.querySelector(".finish-prev");

  if (finishSets.length > 0) {
    let finishIndex = finishSets.findIndex((set) =>
      set.classList.contains("active")
    );
    if (finishIndex === -1) finishIndex = 0;

    function updateFinishSet(i) {
      finishSets.forEach((set, idx) => {
        if (idx === i) {
          set.classList.add("active");
          set.style.display = "flex";
        } else {
          set.classList.remove("active");
          set.style.display = "none";
        }
      });
    }

    updateFinishSet(finishIndex);

    if (finishNext) {
      finishNext.addEventListener("click", function () {
        finishIndex = (finishIndex + 1) % finishSets.length;
        updateFinishSet(finishIndex);
      });
    }

    if (finishPrev) {
      finishPrev.addEventListener("click", function () {
        finishIndex = (finishIndex - 1 + finishSets.length) % finishSets.length;
        updateFinishSet(finishIndex);
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        finishIndex = (finishIndex + 1) % finishSets.length;
        updateFinishSet(finishIndex);
      } else if (e.key === "ArrowLeft") {
        finishIndex = (finishIndex - 1 + finishSets.length) % finishSets.length;
        updateFinishSet(finishIndex);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero-section");
  const layers = document.querySelectorAll(".layered-images img");
  const dots = document.querySelectorAll(".slider-nav-dots .dot");

  if (!heroSection || layers.length === 0 || dots.length === 0) return;

  let currentSlide = 0;
  const slideIntervalTime = 4500;
  let sliderTimer;

  function resetSlides() {
    layers.forEach(img => {
      img.style.opacity = "0";
      img.style.transform = "scale(1.05)";
      img.style.transition = "opacity 1s ease, transform 1s ease";
      img.style.zIndex = "1";
    });

    dots.forEach(dot => dot.classList.remove("active"));
  }

  function showSlide(index) {
    resetSlides();

    if (index >= layers.length) index = 0;
    if (index < 0) index = layers.length - 1;

    const activeImg = layers[index];
    const imgSrc = activeImg.getAttribute("src");

    heroSection.style.background = `url('${imgSrc}') no-repeat center / cover`;
    heroSection.style.transition = "background 0.8s ease-in-out";

    activeImg.style.opacity = "1";
    activeImg.style.transform = "scale(1)";
    activeImg.style.zIndex = "5";

    dots[index].classList.add("active");
    currentSlide = index;
  }

  function startAutoSlide() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => {
      currentSlide = (currentSlide + 1) % layers.length;
      showSlide(currentSlide);
    }, slideIntervalTime);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(sliderTimer);
      showSlide(index);
      startAutoSlide();
    });
  });

  showSlide(0);
  startAutoSlide();
});


document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("YOUR_PUBLIC_KEY"); // 🟡 Replace with your EmailJS public key

  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector('input[placeholder="Your Email"]').value;
    const subject = document.querySelector('input[placeholder="Subject"]').value;
    const phone = document.querySelector('input[placeholder="Phone"]').value;
    const message = document.querySelector('textarea[placeholder="Your Message"]').value;

    // ✅ Send Email via EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        subject: subject,
        phone: phone,
        message: message,
        to_email: "darshanvarma419@gmail.com"
    })
    .then(() => {
        alert("✅ Your message was sent successfully!");
    })
    .catch((err) => {
        console.error(err);
        alert("❌ Failed to send email. Please try again later.");
    });

    // ✅ Send WhatsApp Message (opens automatically)
    const whatsappNumber = "918886450629";
    const whatsappMsg = `New Contact Message:
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}`;
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMsg)}`;

    window.open(whatsappURL, "_blank");
  });
});
