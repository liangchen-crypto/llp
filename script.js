document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a, .scroll-down').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation background change on scroll
    const nav = document.querySelector('.architect-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve if you only want the animation to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial load animations for Hero Section
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-text').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Observe elements to reveal on scroll
    document.querySelectorAll('.reveal-up, .section .reveal-text').forEach(el => {
        revealObserver.observe(el);
    });

    // Simple Parallax Effect for Hero Background
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            // Move background slightly to create parallax
            heroBg.style.transform = `translate3d(0, ${scrollPosition * 0.4}px, 0)`;
        }
    });

    // Close modal when clicking outside
    const modalOverlay = document.getElementById('service-modal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeServiceModal();
            }
        });
    }
});

// Modal Logic
const serviceData = {
    enterprise: {
        title: '企业出海执行',
        price: '人民币12万元起',
        services: [
            '海外机构的设置',
            '年度运营维护',
            '合规咨询'
        ]
    },
    channel: {
        title: '海外渠道拓展',
        price: '人民币7万元起',
        services: [
            '品牌呈现',
            '需求对接',
            '大客户开发'
        ]
    },
    trade: {
        title: '品牌增效交易',
        price: '人民币45万元起',
        services: [
            '战略合作',
            '企业并购',
            '股权融资'
        ]
    }
};

window.openServiceModal = function(type) {
    const data = serviceData[type];
    if (!data) return;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h3 class="modal-header">${data.title}</h3>
        <ul class="modal-services">
            ${data.services.map(s => `<li>${s}</li>`).join('')}
        </ul>
        <div class="modal-price" style="margin-top: 1.5rem;">服务报价：${data.price}</div>
    `;

    const modal = document.getElementById('service-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
};

window.closeServiceModal = function() {
    const modal = document.getElementById('service-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
};
