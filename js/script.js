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
    
    // Get percentage from data attribute or text
    const percent = percentSpan.dataset.percent || 
                    parseFloat(percentSpan.textContent.replace('%', ''));
    
    // Update both text and bar
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

    // Replace these with your actual IDs
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

const nameElement = document.getElementById("name");

// List of translations for "Parth Dangaria"
const names = [
    "Parth Dangaria",
    //"帕斯丹加里亞",       // Chinese
    "Парт Дангария",       // Russian
    "파르트 당가리아",       // Korean
    // "パース・ダンガリア",       // Japanese
    "पार्थ डांगरीया",       // Hindi
    // "પાર્થ ડાંગરીયા",      // Gujarati
];

let index = 0;

// Function to change name every 2 seconds
function changeName() {
    index = (index + 1) % names.length;
    nameElement.textContent = names[index];
}

// Set interval to update the name
setInterval(changeName, 4000);