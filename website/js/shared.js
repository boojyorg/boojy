/**
 * Boojy - Shared JavaScript
 * Navigation, scroll effects, animations
 */

// ===================================
// Navigation Menu Toggle (Mobile)
// ===================================
const navToggle = document.querySelector('.nav-toggle');
const navMobileMenu = document.querySelector('.nav-mobile-menu');
const navMobileLinks = document.querySelectorAll('.nav-mobile-link');

if (navToggle && navMobileMenu) {
    navToggle.addEventListener('click', () => {
        navMobileMenu.classList.toggle('active');

        const spans = navToggle.querySelectorAll('span');
        if (navMobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    navMobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMobileMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Background on Scroll
// ===================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===================================
// Intersection Observer for Animations
// ===================================
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

const animatedElements = document.querySelectorAll('.app-card, .feature-card, .value-card, .pricing-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// FAQ Accordion
// ===================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}

// ===================================
// Hero Glow Color Transition
// ===================================
(function () {
    const COLOR_KEY = 'boojy-glow-from';
    const OPACITY_KEY = 'boojy-glow-opacity-from';
    const DURATION = 2500;

    const glow = document.querySelector('.hub-hero-glow, .notes-hero-glow, .audio-hero-glow');
    if (!glow) return;

    // Read target color and opacity from CSS custom properties
    const computed = getComputedStyle(glow);
    const targetStr = computed.getPropertyValue('--glow-color').trim();
    const target = targetStr.split(',').map(Number);
    if (target.length !== 3) return;

    const targetOpacity = parseFloat(computed.getPropertyValue('--glow-opacity')) || 0.75;

    // Animate from stored previous values if present
    const fromStr = sessionStorage.getItem(COLOR_KEY);
    const fromOpacityStr = sessionStorage.getItem(OPACITY_KEY);
    sessionStorage.removeItem(COLOR_KEY);
    sessionStorage.removeItem(OPACITY_KEY);

    if (fromStr) {
        const from = fromStr.split(',').map(Number);
        const fromOpacity = fromOpacityStr ? parseFloat(fromOpacityStr) : targetOpacity;
        const colorChanged = from.length === 3 && from.some((v, i) => v !== target[i]);
        const opacityChanged = Math.abs(fromOpacity - targetOpacity) > 0.001;

        if (colorChanged || opacityChanged) {
            const start = performance.now();
            function tick(now) {
                const t = Math.min((now - start) / DURATION, 1);
                const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
                const r = Math.round(from[0] + (target[0] - from[0]) * ease);
                const g = Math.round(from[1] + (target[1] - from[1]) * ease);
                const b = Math.round(from[2] + (target[2] - from[2]) * ease);
                const o = fromOpacity + (targetOpacity - fromOpacity) * ease;
                glow.style.opacity = o;
                glow.style.background = `radial-gradient(ellipse, rgba(${r},${g},${b}, 0.25) 0%, rgba(${r},${g},${b}, 0.12) 40%, transparent 70%)`;
                if (t < 1) requestAnimationFrame(tick);
                else { glow.style.background = ''; glow.style.opacity = ''; }
            }
            requestAnimationFrame(tick);
        }
    }

    // Store current glow values before navigating to another internal page
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (href && href.startsWith('/')) {
            sessionStorage.setItem(COLOR_KEY, targetStr);
            sessionStorage.setItem(OPACITY_KEY, String(targetOpacity));
        }
    });
})();

// ===================================
// Platform Detection & Icons
// ===================================
const PLATFORM_ICONS = {
    apple: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
    windows: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>`
};

function detectPlatform() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform || navigator.userAgentData?.platform || '';

    if (platform.includes('Mac') || userAgent.includes('Mac')) {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    if (renderer.includes('Apple M') || renderer.includes('Apple GPU')) {
                        return 'mac-arm64';
                    }
                }
            }
        } catch (e) {}

        if (navigator.userAgentData && navigator.userAgentData.platform === 'macOS') {
            return 'mac-arm64';
        }

        return 'mac-x64';
    }

    if (platform.includes('Win') || userAgent.includes('Windows')) {
        if (userAgent.includes('ARM') || userAgent.includes('Qualcomm')) {
            return 'windows-arm64';
        }
        return 'windows-x64';
    }

    return null;
}

// ===================================
// Other Platforms Panel Toggle
// ===================================
const platformsToggle = document.querySelector('.other-platforms-link');
const platformsPanel = document.querySelector('.platforms-panel');
if (platformsToggle && platformsPanel) {
    function closePlatforms() {
        if (!platformsPanel.classList.contains('open')) return;
        platformsPanel.classList.remove('open');
        platformsPanel.classList.add('closing');
        platformsPanel.addEventListener('animationend', () => {
            platformsPanel.classList.remove('closing');
        }, { once: true });
    }
    platformsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (platformsPanel.classList.contains('open') || platformsPanel.classList.contains('closing')) {
            closePlatforms();
        } else {
            platformsPanel.classList.remove('closing');
            platformsPanel.classList.add('open');
        }
    });
    document.addEventListener('click', (e) => {
        if (!platformsPanel.contains(e.target) && !platformsToggle.contains(e.target)) {
            closePlatforms();
        }
    });

    // Platform item click → update download button + label + selected state
    platformsPanel.querySelectorAll('.platform-item[data-href]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('download-btn');
            const iconEl = document.getElementById('download-icon');
            if (btn && iconEl) {
                btn.href = item.dataset.href;
                const svg = item.querySelector('.platform-icon');
                if (svg) iconEl.innerHTML = svg.outerHTML;
            }
            const platformLabel = document.getElementById('platform-label');
            if (platformLabel && item.dataset.label) platformLabel.textContent = item.dataset.label;
            platformsPanel.querySelectorAll('.platform-item').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            closePlatforms();
        });
    });
}

// Set download icon + platform label + selected state from detected OS
(function () {
    const iconEl = document.getElementById('download-icon');
    if (!iconEl) return;
    const detected = detectPlatform();
    if (detected && detected.startsWith('mac')) {
        iconEl.innerHTML = PLATFORM_ICONS.apple;
    } else if (detected && detected.startsWith('win')) {
        iconEl.innerHTML = PLATFORM_ICONS.windows;
    }
    if (detected) {
        const platformLabel = document.getElementById('platform-label');
        const matchingItem = document.querySelector(`.platform-item[data-platform="${detected}"]`);
        if (matchingItem && !matchingItem.classList.contains('platform-disabled')) {
            matchingItem.classList.add('selected');
            if (platformLabel && matchingItem.dataset.label) {
                platformLabel.textContent = matchingItem.dataset.label;
            }
        }
    }
})();

// ===================================
// Performance: Debounce Utility
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
