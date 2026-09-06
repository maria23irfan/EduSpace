/* =========================================================
   EDUSPACE
   JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
        });


        // Close menu after clicking a navigation link

        const navigationItems = navLinks.querySelectorAll("a");

        navigationItems.forEach((item) => {

            item.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });

        });

    }


    /* =====================================================
       02. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a[href^='#']");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navItems.forEach((item) => {

            item.classList.remove("active");

            const target = item.getAttribute("href");

            if (target === `#${currentSection}`) {
                item.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =====================================================
       03. HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       04. REVEAL ELEMENTS WHEN SCROLLING
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".subject-card, .resource-card, .feature-card, .explore-image, .explore-content, .stat"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       05. SMOOTH SCROLL
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID = link.getAttribute("href");
            const targetElement = document.querySelector(targetID);

            if (!targetElement) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       06. IMAGE LOADING EFFECT
    ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

        // Handle cached images
        if (image.complete) {
            image.classList.add("loaded");
        }

    });


    /* =====================================================
       07. CARD TILT EFFECT
       Subtle movement on desktop
    ===================================================== */

    const cards = document.querySelectorAll(
        ".subject-card, .feature-card"
    );

    const desktopScreen = window.matchMedia("(min-width: 900px)");

    if (desktopScreen.matches) {

        cards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                card.style.transform =
                    `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       08. HERO PARALLAX
    ===================================================== */

    const heroBackground =
        document.querySelector(".hero-background");

    if (heroBackground) {

        window.addEventListener("scroll", () => {

            if (window.scrollY < window.innerHeight) {

                const movement =
                    window.scrollY * 0.18;

                heroBackground.style.transform =
                    `translateY(${movement}px)`;

            }

        });

    }


    /* =====================================================
       09. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const ripple =
                document.createElement("span");

            const rect =
                button.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            const x =
                event.clientX - rect.left - size / 2;

            const y =
                event.clientY - rect.top - size / 2;

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            ripple.classList.add("ripple");

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* =====================================================
       10. CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(".footer-bottom p");

    if (footerYear) {

        const currentYear =
            new Date().getFullYear();

        footerYear.innerHTML =
            `© ${currentYear} EduSpace. Built for curious minds.`;

    }


    /* =====================================================
       11. ESC KEY CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navLinks) {
                navLinks.classList.remove("open");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }

    });


    /* =====================================================
       12. PAGE LOADED
    ===================================================== */

    document.body.classList.add("page-loaded");

});
