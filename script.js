/* ==========================================
   FAQ RENDERING
========================================== */

async function initializeFAQ() {
    const faqContainer =
        document.getElementById("faqGrid");

    if (!faqContainer) return;

    try {
        const response =
            await fetch("faq.json");

        if (!response.ok) {
            throw new Error(
                `HTTP Error ${response.status}`
            );
        }

        const faqItems =
            await response.json();

        if (!Array.isArray(faqItems)) {
            throw new Error(
                "faq.json must contain an array"
            );
        }

        faqContainer.innerHTML = "";

        faqItems.forEach((item) => {
            const card =
                document.createElement("article");

            card.className =
                "faq-card";

            card.tabIndex = 0;

            const title =
                document.createElement("h3");

            title.textContent =
                item.title;

            card.appendChild(title);

            card.addEventListener(
                "click",
                () => {
                    openModal(
                        item.title,
                        item.content
                    );
                }
            );

            card.addEventListener(
                "keydown",
                (event) => {
                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {
                        event.preventDefault();

                        openModal(
                            item.title,
                            item.content
                        );
                    }
                }
            );

            faqContainer.appendChild(
                card
            );
        });
    } catch (error) {
        console.error(
            "Failed to load FAQ:",
            error
        );

        faqContainer.innerHTML = `
            <div class="card">
                <h3>שגיאה בטעינת המידע</h3>
                <p>לא ניתן לטעון את השאלות כרגע.</p>
            </div>
        `;
    }
}

/* ==========================================
   MODAL
========================================== */

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalContent =
    document.getElementById(
        "modalContent"
    );

const pageContent =
    document.getElementById(
        "pageContent"
    );

function openModal(
    title,
    content
) {
    if (
        !modalOverlay ||
        !modalTitle ||
        !modalContent
    ) {
        return;
    }

    modalTitle.textContent =
        title;

    // Preserve line breaks safely
    modalContent.innerHTML =
        String(content).replace(
            /\n/g,
            "<br>"
        );

    modalOverlay.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

    if (pageContent) {
        pageContent.classList.add(
            "blur"
        );
    }
}

function closeModal() {
    if (!modalOverlay) return;

    modalOverlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

    if (pageContent) {
        pageContent.classList.remove(
            "blur"
        );
    }
}

/* ==========================================
   EVENTS
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        initializeFAQ();

        const closeButton =
            document.getElementById(
                "closeModal"
            );

        if (closeButton) {
            closeButton.addEventListener(
                "click",
                closeModal
            );
        }

        if (modalOverlay) {
            modalOverlay.addEventListener(
                "click",
                (event) => {
                    if (
                        event.target ===
                        modalOverlay
                    ) {
                        closeModal();
                    }
                }
            );
        }

        document.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key ===
                    "Escape"
                ) {
                    closeModal();
                }
            }
        );
    }
);

/* ==========================================
   REVEAL ANIMATIONS
========================================== */

const observer =
    new IntersectionObserver(
        (entries) => {
            entries.forEach(
                (entry) => {
                    if (
                        entry.isIntersecting
                    ) {
                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );
        },
        {
            threshold: 0.15
        }
    );

document.addEventListener(
    "DOMContentLoaded",
    () => {
        document
            .querySelectorAll(
                ".reveal"
            )
            .forEach((element) => {
                observer.observe(
                    element
                );
            });
    }
);

/* ==========================================
   UTILITY
========================================== */

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}