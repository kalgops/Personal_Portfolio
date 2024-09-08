document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to My Portfolio!');

    const toggleSwitch = document.getElementById('darkModeToggle');
    const waterEffect = document.getElementById('water-effect');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleSwitch.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggleSwitch.addEventListener('click', function(e) {
        const rect = toggleSwitch.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;

        waterEffect.style.setProperty('--x', `${x}px`);
        waterEffect.style.setProperty('--y', `${y}px`);
        waterEffect.classList.add('active');

        setTimeout(() => {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                toggleSwitch.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.add('dark-mode');
                toggleSwitch.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        }, 500);

        setTimeout(() => {
            waterEffect.classList.remove('active');
        }, 1100);
    });

    // Function to show project details in modal
    window.showProjectDetails = function(title, description) {
        const modalTitle = document.getElementById('projectModalLabel');
        const modalBody = document.querySelector('#projectModal .modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = `<p>${description}</p>`;
    };

    // Smooth Scrolling
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Fade-in effect on scroll
    const faders = document.querySelectorAll('.fade-in');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, options);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Dynamic Content for "More Info" Button
    const moreInfoButton = document.getElementById('more-info-btn');
    if (moreInfoButton) {
        moreInfoButton.addEventListener('click', () => {
            const aboutSection = document.getElementById('dynamic-content');
            if (aboutSection) {
                aboutSection.innerHTML = `
                    <h4>More About Me</h4>
                    <p>Over the past decade, I have worked on numerous projects that span various industries, including tech, healthcare, and finance. I thrive on solving complex problems and am passionate about leveraging technology to create meaningful solutions.</p>
                    <ul>
                        <li>Experienced in JavaScript, Python, and Java</li>
                        <li>Skilled in front-end and back-end development</li>
                        <li>Committed to continuous learning and improvement</li>
                    </ul>
                `;
                aboutSection.classList.add('show-content');
                moreInfoButton.disabled = true;
                moreInfoButton.textContent = 'Information Added';
            }
        });
    }

    // Portfolio Page - Project Details
    window.showMoreInfo = function(projectId) {
        const projectDetails = document.getElementById(`project-details-${projectId}`);
        if (projectDetails) {
            projectDetails.innerHTML = `
                <p>Detailed information about Project ${projectId}. This project was a cornerstone of my development journey, involving the use of cutting-edge technology and innovative solutions.</p>
                <ul>
                    <li>Technology 1</li>
                    <li>Technology 2</li>
                    <li>Technology 3</li>
                </ul>
            `;
            projectDetails.classList.add('show-content');
        }
    };

    // Contact Page - Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                alert('Thank you for reaching out! I will get back to you soon.');
                contactForm.reset();
            }
            contactForm.classList.add('was-validated');
        });
    }

    // Report Page - Learning More
    const learningMoreBtn = document.getElementById('learning-more-btn');
    if (learningMoreBtn) {
        learningMoreBtn.addEventListener('click', () => {
            const learningContent = document.getElementById('learning-dynamic-content');
            if (learningContent) {
                learningContent.innerHTML = `
                    <h4>More About Learning</h4>
                    <p>This project taught me invaluable lessons in both technical skills and soft skills. I delved deeper into JavaScript for dynamic content manipulation and improved my ability to manage time effectively.</p>
                    <ul>
                        <li>Enhanced problem-solving skills through complex projects</li>
                        <li>Learned modern web development frameworks</li>
                        <li>Improved project management techniques</li>
                    </ul>
                `;
                learningContent.classList.add('show-content');
                learningMoreBtn.disabled = true;
                learningMoreBtn.textContent = 'Information Added';
            }
        });
    }
});
