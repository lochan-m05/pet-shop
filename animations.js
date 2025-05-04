// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Page-wide animations
const pageAnimations = {
    init() {
        // Hero section animations
        this.heroAnimations();
        // Why Choose Us animations
        this.whyChooseUsAnimations();
        // Scroll animations
        this.scrollAnimations();
        // Floating elements
        this.floatingElements();
        // Cursor effects
        this.customCursor();
        // Loading animation
        this.loadingScreen();
    },

    heroAnimations() {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tl.from(".hero-text h1", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2
        })
        .from(".hero-text p", {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, "-=0.8")
        .from(".hero-buttons", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".achievement-cards", {
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        }, "-=0.4")
        .from(".hero-image", {
            scale: 0.8,
            opacity: 0,
            duration: 1
        }, "-=1");
    },

    whyChooseUsAnimations() {
        // Animate the section title
        gsap.from(".why-choose-us h2", {
            scrollTrigger: {
                trigger: ".why-choose-us",
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Animate feature cards with stagger
        gsap.from(".feature-card", {
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Animate feature icons with rotation
        gsap.from(".feature-icon", {
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            },
            rotate: 360,
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });

        // Add hover animations for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(card.querySelector('.feature-icon'), {
                    rotate: 360,
                    duration: 0.6,
                    ease: "power1.inOut"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(card.querySelector('.feature-icon'), {
                    rotate: 0,
                    duration: 0.6,
                    ease: "power1.inOut"
                });
            });
        });
    },

    scrollAnimations() {
        // Animate sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Animate cards with stagger
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2
            });
        });
    },

    floatingElements() {
        // Continuous floating animation for specific elements
        gsap.to(".floating-card", {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    },

    customCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });

        // Scale cursor on clickable elements
        document.querySelectorAll('button, a').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 1.5,
                    duration: 0.3
                });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    },

    loadingScreen() {
        const tl = gsap.timeline();
        
        tl.to('.loading-screen', {
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
            onComplete: () => {
                document.querySelector('.loading-screen').style.display = 'none';
            }
        });
    }
};

// Initialize animations
pageAnimations.init(); 