// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                const navMenu = document.getElementById('navMenu');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (navMenu) navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        }
    });
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===== Close Warning Banner =====
function closeWarning() {
    const banner = document.getElementById('warningBanner');
    banner.style.display = 'none';
    // Save to localStorage so it doesn't show again in this session
    localStorage.setItem('warningClosed', 'true');
}

// Check if warning was already closed
window.addEventListener('load', () => {
    const warningClosed = localStorage.getItem('warningClosed');
    if (warningClosed === 'true') {
        const banner = document.getElementById('warningBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== Gallery Image Popup (Optional Enhancement) =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        openImagePopup(imgSrc);
    });
});

function openImagePopup(imgSrc) {
    // Create popup overlay
    const popup = document.createElement('div');
    popup.className = 'image-popup';
    popup.innerHTML = `
        <div class="popup-overlay" onclick="closeImagePopup()"></div>
        <div class="popup-content">
            <button class="popup-close" onclick="closeImagePopup()">&times;</button>
            <img src="${imgSrc}" alt="Gallery Image">
        </div>
    `;
    
    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
}

function closeImagePopup() {
    const popup = document.querySelector('.image-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Add ESC key to close popup
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImagePopup();
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.menu-item, .gallery-item, .info-card, .about-text, .about-images'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ===== Form Validation (if you add a booking form later) =====
function validateBookingForm(formData) {
    const { name, phone, date, guests } = formData;
    
    if (!name || name.trim().length < 2) {
        return { valid: false, message: 'Vui lòng nhập tên hợp lệ' };
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
        return { valid: false, message: 'Vui lòng nhập số điện thoại hợp lệ' };
    }
    
    if (!date) {
        return { valid: false, message: 'Vui lòng chọn ngày' };
    }
    
    if (!guests || guests < 1) {
        return { valid: false, message: 'Vui lòng nhập số người' };
    }
    
    return { valid: true, message: 'Thành công' };
}

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===== Console Welcome Message =====
console.log('%cNhà hàng Hoàng Cung', 'color: #c8a97e; font-size: 24px; font-weight: bold;');
console.log('%cKiến trúc Huế độc đáo tại Osaka Village Đà Lạt', 'color: #8b4513; font-size: 14px;');
console.log('%cHotline: 0366 650 897', 'color: #333; font-size: 12px;');