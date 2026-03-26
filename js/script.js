// Toggle mobile menu
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const footer = document.querySelector('footer');

// Mobile menu toggle
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close menu on nav link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Initial load animations
window.addEventListener('DOMContentLoaded', checkAnimations);

// Scroll handler
window.addEventListener('scroll', () => {
    checkAnimations();
    handleHeader();
    handleFooter();
});

function checkAnimations() {
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;

        sec.classList.toggle('show-animate', inView);

        if (inView) {
            const id = sec.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href').includes(id));
            });
        }
    });
}

function handleHeader() {
    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
    header.classList.toggle('sticky', !isAtBottom && window.scrollY > 100);
}

function handleFooter() {
    const footerRect = footer.getBoundingClientRect();
    footer.classList.toggle('show-animate', footerRect.top < window.innerHeight);
}

// Dynamic skill bars
document.querySelectorAll('.progress').forEach((progress) => {
    const percentSpan = progress.querySelector('h3 span');
    const bar = progress.querySelector('.bar span');

    const percent = percentSpan.dataset.percent ||
        parseFloat(percentSpan.textContent.replace('%', ''));

    percentSpan.textContent = `${percent}%`;
    bar.style.setProperty('--skill-percent', `${percent}%`);
});

// Contact Form Submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const serviceID = 'service_q8zxxsv';
    const templateID = 'template_qyxfvnf';

    emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
            alert('Message sent successfully!');
            form.reset();
        })
        .catch((error) => {
            alert('Failed to send message: ' + error.text);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        });
});

// Name translation animation
const nameElement = document.getElementById("name");
const names = [
    "Parth Dangaria",
    "Парт Дангария",
    "파르트 당가리아",
    "पार्थ डांगरीया",
];
let nameIndex = 0;
function changeName() {
    nameIndex = (nameIndex + 1) % names.length;
    nameElement.textContent = names[nameIndex];
}
setInterval(changeName, 4000);


// ── PROJECTS CAROUSEL ──
(function () {
    const carousel = document.getElementById('projectsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const wrapper = document.querySelector('.projects-carousel-wrapper');

    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll('.project-card'));
    const totalCards = cards.length;
    const visibleCount = 3; // cards visible at once
    let currentIndex = 0;
    let autoScrollTimer = null;
    let isPaused = false;

    // ── Build dots ──
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-dots');
    const maxDots = totalCards - visibleCount + 1;
    for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    }
    wrapper.after(dotsContainer);

    function getCardWidth() {
        const card = cards[0];
        const style = window.getComputedStyle(card);
        return card.offsetWidth + parseInt(style.marginRight || 0) + 30; // 30 = gap
    }

    function updateDots() {
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goTo(index) {
        const max = totalCards - visibleCount;
        currentIndex = Math.max(0, Math.min(index, max));
        const offset = currentIndex * getCardWidth();
        carousel.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }

    function goNext() {
        const max = totalCards - visibleCount;
        goTo(currentIndex < max ? currentIndex + 1 : 0);
    }

    function goPrev() {
        const max = totalCards - visibleCount;
        goTo(currentIndex > 0 ? currentIndex - 1 : max);
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollTimer = setInterval(() => {
            if (!isPaused) goNext();
        }, 5000);
    }

    function stopAutoScroll() {
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
            autoScrollTimer = null;
        }
    }

    // Arrow buttons
    nextBtn.addEventListener('click', () => { goNext(); startAutoScroll(); });
    prevBtn.addEventListener('click', () => { goPrev(); startAutoScroll(); });

    // Pause on hover over any card
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => { isPaused = true; });
        card.addEventListener('mouseleave', () => { isPaused = false; });
    });

    // Start
    startAutoScroll();

    // Recalculate on resize
    window.addEventListener('resize', () => goTo(currentIndex));
})();
