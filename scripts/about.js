document.addEventListener("scroll", function() {
    const conductSection = document.querySelector(".code-of-conduct");
    const position = conductSection.getBoundingClientRect().top;

    if (position < window.innerHeight) {
        conductSection.style.opacity = "1";
        conductSection.style.transform = "translateY(0)";
    }
});