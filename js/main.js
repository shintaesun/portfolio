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

        // Experience 섹션
        if (PORTFOLIO_DATA.experience && PORTFOLIO_DATA.experience.length > 0) {
            const expContainer = document.getElementById('experience-container');
            if (expContainer) {
                expContainer.innerHTML = '';
                PORTFOLIO_DATA.experience.forEach((exp, index) => {
                    const delay = (index + 1) * 0.1;
                    const item = document.createElement('div');
                    item.className = 'experience-item reveal';
                    item.style.setProperty('--delay', `${delay}s`);
                    
                    let detailsHtml = '';
                    if (exp.details && exp.details.length > 0) {
                        detailsHtml = '<ul class="exp-details">' + exp.details.map(d => `<li>${d}</li>`).join('') + '</ul>';
                    }

                    item.innerHTML = `
                        <div class="exp-header">
                            <div>
                                <h3 class="exp-company">${exp.company}</h3>
                                <div class="exp-role">${exp.role}</div>
                            </div>
                            <div class="exp-period">${exp.period}</div>
                        </div>
                        ${detailsHtml}
                    `;
                    expContainer.appendChild(item);
                });
            }
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
                            <iframe src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="project-info">
                            <h3>${proj.title}</h3>
                            <p>${proj.description}</p>
                        </div>
                    `;
                    container.appendChild(card);
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

    // Mobile Menu Toggle (Basic)
    const mobileBtn = document.querySelector('.mobile-menu-btn');

    mobileBtn.addEventListener('click', () => {
        alert('모바일 메뉴가 클릭되었습니다. (확장 구현 필요)');
    });
});
