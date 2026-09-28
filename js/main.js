document.addEventListener('DOMContentLoaded', () => {
    // 설정 파일(config.js)의 데이터로 메인 텍스트 업데이트
    if (typeof PORTFOLIO_DATA !== 'undefined') {
        // 공통 정보
        if (PORTFOLIO_DATA.site && document.querySelector('.site-logo')) {
            document.querySelector('.site-logo').innerHTML = PORTFOLIO_DATA.site.logo;
        }

        // Hero 섹션
        if (PORTFOLIO_DATA.hero) {
            document.querySelector('.greeting').innerHTML = PORTFOLIO_DATA.hero.greeting;
            document.querySelector('.main-title').innerHTML = PORTFOLIO_DATA.hero.title;
            document.querySelector('.subtitle').innerHTML = PORTFOLIO_DATA.hero.subtitle;
        }

        // About 섹션
        if (PORTFOLIO_DATA.about) {
            document.querySelector('.about-name').innerHTML = `${PORTFOLIO_DATA.about.name} <span style="font-size: 0.9em; color: var(--text-secondary);">(${PORTFOLIO_DATA.about.birthYear})</span>`;
            document.querySelector('.about-desc').innerHTML = PORTFOLIO_DATA.about.description;
        }

        // Projects (Video) 섹션
        if (PORTFOLIO_DATA.projects && PORTFOLIO_DATA.projects.length > 0) {
            const container = document.getElementById('projects-container');
            if (container) {
                container.innerHTML = ''; // 기본값 비우기
                PORTFOLIO_DATA.projects.forEach((proj, index) => {
                    let embedUrl = proj.videoUrl;
                    try {
                        if (embedUrl.includes('youtube.com/watch')) {
                            const urlObj = new URL(embedUrl.startsWith('http') ? embedUrl : `https://${embedUrl}`);
                            const videoId = urlObj.searchParams.get('v');
                            embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        } else if (embedUrl.includes('youtu.be/')) {
                            const videoId = embedUrl.split('youtu.be/')[1].split('?')[0];
                            embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        } else if (embedUrl.includes('vimeo.com/') && !embedUrl.includes('player.vimeo.com')) {
                            const videoId = embedUrl.split('vimeo.com/')[1].split('/')[0].split('?')[0];
                            embedUrl = `https://player.vimeo.com/video/${videoId}`;
                        }
                    } catch(e) { console.error("URL 파싱 에러", e); }

                    const delay = (index + 1) * 0.1;
                    const card = document.createElement('div');
                    card.className = 'glass-card project-card reveal';
                    card.style.setProperty('--delay', `${delay}s`);
                    
                    card.innerHTML = `
                        <div class="project-image">
                            <iframe title="${proj.title}" src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="project-info">
                            <h3>${proj.title}</h3>
                            <p>${proj.description}</p>
                        </div>
                    `;
                    container.appendChild(card);
                    if (proj.videoUrl.includes('bvdrne2KpY0')) {
                        const featured = card.querySelector('iframe').cloneNode(true);
                        featured.title = '대표 작업 영상';
                        const video = new URL(featured.src);
                        const id = video.pathname.split('/').pop();
                        video.searchParams.set('autoplay', '1');
                        video.searchParams.set('mute', '1');
                        video.searchParams.set('loop', '1');
                        video.searchParams.set('playlist', id);
                        video.searchParams.set('playsinline', '1');
                        featured.src = video.toString();
                        document.getElementById('hero-film').replaceChildren(featured);
                    }
                });
            }
        }

        // Contact 섹션
        if (PORTFOLIO_DATA.contact) {
            const contactMsg = document.querySelector('.contact-message');
            if (contactMsg) contactMsg.innerHTML = PORTFOLIO_DATA.contact.message;
            
            const contactBtn = document.querySelector('.contact-btn');
            if (contactBtn) contactBtn.href = `mailto:${PORTFOLIO_DATA.contact.email}`;
            
            const contactPhone = document.querySelector('.contact-phone');
            if (contactPhone) contactPhone.innerHTML = `📞 <a href="tel:${PORTFOLIO_DATA.contact.phone.replace(/ /g, '')}" style="color:var(--text-primary); text-decoration:none;">${PORTFOLIO_DATA.contact.phone}</a>`;
            
            const contactEmail = document.querySelector('.contact-email');
            if (contactEmail) contactEmail.innerHTML = `✉️ <a href="mailto:${PORTFOLIO_DATA.contact.email}" style="color:var(--text-primary); text-decoration:none;">${PORTFOLIO_DATA.contact.email}</a>`;
        }
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

});

// Typography grows toward the viewport center and shrinks toward either edge.
document.addEventListener('DOMContentLoaded', () => {
    const elements = [...document.querySelectorAll('.hero-content .greeting, .hero-content .main-title, .hero-content .subtitle, .about .eyebrow, .about .section-title, .experience, .about-card, .skills-card, .projects .eyebrow, .projects .section-title, .project-card, .contact .eyebrow, .contact .section-title, .contact-card')];
    elements.forEach(el => el.classList.add('scroll-scale'));
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let pending = false;
    function render() {
        pending = false;
        elements.forEach(el => {
            el.style.transform = 'none';
            el.style.opacity = '1';
            if (motion.matches) return;
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const proximity = Math.max(0, 1 - Math.abs(center - innerHeight / 2) / (innerHeight * 0.6));
            const eased = proximity * proximity * (3 - 2 * proximity);
            el.style.transform = `scale(${0.7 + 0.3 * eased})`;
            el.style.opacity = String(0.45 + 0.55 * eased);
        });
    }
    function schedule() {
        if (!pending) { pending = true; requestAnimationFrame(render); }
    }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    document.fonts.ready.then(schedule);
    render();
});

document.addEventListener('DOMContentLoaded', () => {
    const railLinks = [...document.querySelectorAll('.rail-link')];
    const rail = document.querySelector('.scroll-rail');
    let hideTimer;
    addEventListener('pointermove', event => {
        rail.classList.toggle('is-near', event.clientX <= 200);
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => rail.classList.remove('is-near'));
    function showDuringScroll() {
        rail.classList.add('is-scrolling');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => rail.classList.remove('is-scrolling'), 850);
    }
    let queued = false;
    function updateRail() {
        queued = false;
        let current = railLinks[0];
        railLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section.getBoundingClientRect().top <= innerHeight * 0.5) current = link;
        });
        const centers = railLinks.map(link => {
            const section = document.querySelector(link.getAttribute('href'));
            return section.getBoundingClientRect().top + scrollY;
        });
        const position = scrollY;
        let fractionalIndex = 0;
        for (let i = 0; i < centers.length - 1; i++) {
            if (position >= centers[i]) {
                fractionalIndex = i + Math.max(0, Math.min(1, (position - centers[i]) / (centers[i + 1] - centers[i])));
            }
        }
        current = railLinks[Math.round(fractionalIndex)];
        const radius = innerHeight * 1.25;
        railLinks.forEach((link, index) => {
            const angle = (index - fractionalIndex) * 0.105;
            const x = 112 - radius * (1 - Math.cos(angle));
            const y = innerHeight / 2 + radius * Math.sin(angle);
            const distance = Math.abs(y - innerHeight / 2) / (innerHeight * 0.46);
            const opacity = Math.max(0.5, 1 - distance * 0.55);
            const focus = Math.max(0, 1 - Math.abs(index - fractionalIndex));
            const scale = 0.85 + 0.4 * focus * focus * (3 - 2 * focus);
            link.style.setProperty('--dial-scale', String(scale));
            link.style.left = `${x}px`;
            link.style.top = `${y}px`;
            link.style.setProperty('--dial-opacity', String(opacity));
            link.classList.toggle('active', link === current);
            if (link === current) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    function scheduleRail() {
        if (!queued) { queued = true; requestAnimationFrame(updateRail); }
    }
    addEventListener('scroll', () => {
        showDuringScroll();
        scheduleRail();
    }, { passive: true });
    addEventListener('resize', scheduleRail);
    updateRail();
});
