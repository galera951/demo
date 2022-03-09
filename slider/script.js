let slides = document.getElementsByClassName("slide"),
    slider = document.getElementById("slider"),
    cursor = 0,
    slideWidth = 0,
    topHeight = 0,
    slideCount = slides.length;

function calculateTallestSlide() {
    for (let i = 0; i < slideCount; i++) {
        if (slides[i].offsetHeight > topHeight) {
            topHeight = slides[i].offsetHeight;
        }
    }

    slider.style.height = topHeight + "px";
}

function moveSlides(direction) {
    for (let j = 0; j < slideCount; j++) {
        if (direction === "backward") {
            slides[j].style.left = +slides[j].style.left.replace(/[^-\d.]/g, '') + slideWidth + "px";
        } else if (direction === "forward") {
            slides[j].style.left = +slides[j].style.left.replace(/[^-\d.]/g, '') - slideWidth + "px";
        }
    }
}

if (slideCount > 0) {
    slideWidth = slides[0].offsetWidth;

    for (let i = 0; i < slideCount; i++) {
        slides[i].style.left = slideWidth * i + "px";
    }

    calculateTallestSlide();

    for (let i = 0; i < slideCount; i++) {
        slides[i].classList.add("animated");
    }

    document.getElementById("next").addEventListener("click", function (event) {
        event.preventDefault();

        if (cursor < slideCount - 1) {
            moveSlides("forward");
            cursor++;
        }
    });

    document.getElementById("prev").addEventListener("click", function (event) {
        event.preventDefault();

        if (cursor > 0) {
            moveSlides("backward");
            cursor--;
        }
    })

    window.addEventListener("resize", function () {
        slideWidth = slides[0].offsetWidth;

        for (let i = 0; i < slideCount; i++) {
            if (i <= cursor) {
                slides[i].style.left = "-" + slideWidth * (cursor - i) + "px";
            } else {
                slides[i].style.left = slideWidth * (i - cursor) + "px";
            }
        }

        calculateTallestSlide();
    })
}