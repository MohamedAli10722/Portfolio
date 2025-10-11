function toggleDetails(card) {
    // Collapse any other expanded cards
    document.querySelectorAll('.project-card.expanded').forEach(c => {
        if (c !== card) c.classList.remove('expanded');
    });
    // Toggle the clicked one
    card.classList.toggle('expanded');
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

