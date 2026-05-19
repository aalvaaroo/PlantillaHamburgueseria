const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll("[data-reveal]");
const heroVisual = document.querySelector(".hero-visual");
const parallaxItems = document.querySelectorAll("[data-depth]");

const toggleHeader = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const revealOnScroll = () => {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const enableParallax = () => {
  if (!heroVisual || window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  heroVisual.addEventListener("mousemove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    parallaxItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 0);
      const moveX = offsetX * depth;
      const moveY = offsetY * depth;
      item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  heroVisual.addEventListener("mouseleave", () => {
    parallaxItems.forEach((item) => {
      item.style.transform = "";
    });
  });
};

toggleHeader();
revealOnScroll();
enableParallax();

window.addEventListener("scroll", toggleHeader, { passive: true });
