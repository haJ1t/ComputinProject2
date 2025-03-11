document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const dots = document.querySelectorAll(".dot");

    let currentIndex = 0;

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    updateCarousel();
});