const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const heroCarousel = document.querySelector(".hero-carousel");
const heroTrack = document.querySelector(".hero-track");
const heroSlides = heroTrack ? Array.from(heroTrack.querySelectorAll(".hero-slide")) : [];
const heroPagination = heroCarousel ? Array.from(heroCarousel.querySelectorAll("[data-hero-index]")) : [];

if (heroCarousel && heroTrack && heroSlides.length === 2 && heroPagination.length === 2) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const firstSlideClone = heroSlides[0].cloneNode(true);
  let physicalIndex = 0;
  let autoTimer = null;
  let isTransitioning = false;
  let interactionPaused = false;

  firstSlideClone.setAttribute("aria-hidden", "true");
  firstSlideClone.setAttribute("inert", "");
  firstSlideClone.removeAttribute("data-hero-slide");
  firstSlideClone.querySelectorAll("a, button").forEach((element) => {
    element.setAttribute("tabindex", "-1");
  });
  heroTrack.append(firstSlideClone);

  const updatePagination = (logicalIndex) => {
    heroPagination.forEach((button, index) => {
      const isActive = index === logicalIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", String(isActive));
    });
  };

  const moveTrack = (index, animate = true) => {
    isTransitioning = animate;
    heroTrack.style.transition = animate ? "" : "none";
    heroTrack.style.transform = `translateX(-${index * 100}%)`;
    if (!animate) {
      heroTrack.getBoundingClientRect();
      heroTrack.style.transition = "";
    }
  };

  const showSlide = (logicalIndex) => {
    if (isTransitioning || logicalIndex === physicalIndex) {
      return;
    }

    if (physicalIndex === 1 && logicalIndex === 0) {
      physicalIndex = 2;
      moveTrack(physicalIndex);
    } else {
      physicalIndex = logicalIndex;
      moveTrack(physicalIndex);
    }
    updatePagination(logicalIndex);
  };

  const advanceSlide = () => {
    if (isTransitioning || document.hidden) {
      return;
    }
    if (physicalIndex === 0) {
      physicalIndex = 1;
      moveTrack(physicalIndex);
      updatePagination(1);
    } else {
      physicalIndex = 2;
      moveTrack(physicalIndex);
      updatePagination(0);
    }
  };

  const stopAutoPlay = () => {
    window.clearInterval(autoTimer);
    autoTimer = null;
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    if (!reduceMotion.matches && !interactionPaused && !isTransitioning) {
      autoTimer = window.setTimeout(() => {
        autoTimer = null;
        advanceSlide();
      }, 3000);
    }
  };

  heroTrack.addEventListener("transitionend", (event) => {
    if (event.propertyName !== "transform") {
      return;
    }
    isTransitioning = false;
    if (physicalIndex === 2) {
      physicalIndex = 0;
      moveTrack(0, false);
    }
    startAutoPlay();
  });

  heroPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const targetIndex = Number(button.dataset.heroIndex);
      stopAutoPlay();
      showSlide(targetIndex);
      if (!isTransitioning) {
        startAutoPlay();
      }
    });
  });

  heroCarousel.addEventListener("mouseenter", () => {
    interactionPaused = true;
    stopAutoPlay();
  });
  heroCarousel.addEventListener("mouseleave", () => {
    interactionPaused = false;
    startAutoPlay();
  });
  heroCarousel.addEventListener("focusin", () => {
    interactionPaused = true;
    stopAutoPlay();
  });
  heroCarousel.addEventListener("focusout", (event) => {
    if (!heroCarousel.contains(event.relatedTarget)) {
      interactionPaused = false;
      startAutoPlay();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });
  reduceMotion.addEventListener("change", startAutoPlay);

  updatePagination(0);
  startAutoPlay();
}
