document.addEventListener('DOMContentLoaded', () => {
    // 설정 파일(config.js)의 데이터로 메인 텍스트 업데이트
    if (typeof PORTFOLIO_DATA !== 'undefined') {
        document.querySelector('.greeting').innerHTML = PORTFOLIO_DATA.hero.greeting;
        document.querySelector('.main-title').innerHTML = PORTFOLIO_DATA.hero.title;
        document.querySelector('.subtitle').innerHTML = PORTFOLIO_DATA.hero.subtitle;
    }

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Active Navigation Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Mobile Menu Toggle (Basic)
    const mobileBtn = document.querySelector('.mobile-menu-btn');

    mobileBtn.addEventListener('click', () => {
        alert('모바일 메뉴가 클릭되었습니다. (확장 구현 필요)');
    });
});
