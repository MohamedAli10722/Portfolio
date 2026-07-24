// === Keep --header-h in sync with the real, rendered header height ===
// (the header can wrap to 2-3 lines on narrow screens, so a fixed
// pixel guess in CSS isn't reliable — measure it instead)
const headerEl = document.querySelector('header');

function updateHeaderHeightVar() {
    if (!headerEl) return;
    document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
}

updateHeaderHeightVar();
window.addEventListener('load', updateHeaderHeightVar);
window.addEventListener('resize', updateHeaderHeightVar);
window.addEventListener('orientationchange', updateHeaderHeightVar);
if ('fonts' in document) {
    document.fonts.ready.then(updateHeaderHeightVar); // web font swap can change header height
}

function toggleDetails(card) {
    // Collapse any other expanded cards
    document.querySelectorAll('.project-card.expanded').forEach(c => {
        if (c !== card) c.classList.remove('expanded');
    });
    // Toggle the clicked one
    card.classList.toggle('expanded');

    // Bring the expanded card into view (CSS scroll-margin-top on
    // .project-card keeps it clear of the fixed header)
    if (card.classList.contains('expanded')) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Collapse when clicking outside any project card
document.addEventListener('click', (e) => {
    if (!e.target.closest('.project-card')) {
        document.querySelectorAll('.project-card.expanded')
                .forEach(c => c.classList.remove('expanded'));
    }
});

// === Scroll-to-Top Button ===
const span = document.querySelector(".up");
const footer = document.querySelector(".footer");

window.addEventListener("scroll", () => {
    // Show when scrolling down
    if (window.scrollY >= 200) {
        span.classList.add("show");
    } else {
        span.classList.remove("show");
    }

    // Hide when reaching the footer
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight - 100) {
        span.classList.add("hide");
    } else {
        span.classList.remove("hide");
    }
});

// Scroll smoothly to top
span.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// === Subtle scroll reveal (skipped entirely if reduced motion is preferred) ===
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(
        ".timeline-item, .skill-group, .project-card, .about-content li, .edu-card"
    );

    revealTargets.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
}