document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll para âncoras
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // FAQ Accordion com acessibilidade aprimorada
    document.querySelectorAll(".faq-question").forEach(item => {
        item.addEventListener("click", event => {
            const faqItem = item.parentNode;
            const answer = faqItem.querySelector(".faq-answer");
            const isActive = faqItem.classList.contains("active");

            // Fecha todos os outros FAQs abertos
            document.querySelectorAll(".faq-item.active").forEach(activeItem => {
                if (activeItem !== faqItem) {
                    activeItem.classList.remove("active");
                    activeItem.querySelector(".faq-answer").classList.remove("show");
                    activeItem.querySelector(".faq-answer").style.maxHeight = null;
                    activeItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
                }
            });

            // Alterna o FAQ clicado
            if (!isActive) {
                faqItem.classList.add("active");
                answer.classList.add("show");
                answer.style.maxHeight = answer.scrollHeight + "px";
                item.setAttribute("aria-expanded", "true");
            } else {
                faqItem.classList.remove("active");
                answer.classList.remove("show");
                answer.style.maxHeight = null;
                item.setAttribute("aria-expanded", "false");
            }
        });

        // Adiciona suporte para teclado no FAQ
        item.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Scroll Reveal Animation para seções
    const fadeSections = document.querySelectorAll(".fade-in-section");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Ajuste conforme a necessidade para quando a seção deve aparecer
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeSections.forEach(section => {
        observer.observe(section);
    });
});
