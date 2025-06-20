// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Галерея
const galleryItems = document.querySelectorAll('.gallery-item');
const modalOverlay = document.getElementById('modalOverlay');
const modalImg = modalOverlay.querySelector('img');

function openModal(src) {
    modalImg.src = src;
    modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

galleryItems.forEach(item => {
    const img = item.querySelector('img');
    item.addEventListener('click', () => {
        openModal(img.src);
    });
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Слайдер отзывов
const reviewsSlider = document.getElementById('reviewsSlider');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
let currentSlide = 0;

function showSlide(index) {
    reviewsSlider.scrollTo({
        left: index * reviewsSlider.offsetWidth,
        behavior: 'smooth'
    });
    currentSlide = index;
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < reviewsSlider.children.length - 1) {
        showSlide(currentSlide + 1);
    }
});

// Кнопка "Наверх"
const toTopBtn = document.getElementById('toTopBtn');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        toTopBtn.style.display = 'flex';
    } else {
        toTopBtn.style.display = 'none';
    }
}

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Валидация формы
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!name) {
        alert('Пожалуйста, введите ваше имя.');
        return false;
    }
    
    if (!phone) {
        alert('Пожалуйста, введите ваш телефон.');
        return false;
    }
    
    if (!email) {
        alert('Пожалуйста, введите ваш email.');
        return false;
    }
    
    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email адрес.');
        return false;
    }
    
    alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
    document.getElementById('contactForm').reset();
    return false; // Для демонстрации, в реальном проекте здесь была бы отправка формы
}

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню после клика
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});