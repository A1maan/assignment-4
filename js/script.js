// Project data with categories (would normally come from API)
const projectsData = [
    {
        id: 1,
        title: "Rukn - AI Mental Health Platform",
        description: "Real-time Arabic-first mental health helpline monitoring dashboard for NCMH (National Center for Mental Health Promotion). Detects distress spikes, operational issues, and enables rapid response with human-in-the-loop approval using fine-tuned MARBERT models.",
        icon: "🧠",
        category: "ai",
        tags: ["TypeScript", "FastAPI", "NLP", "MARBERT", "Next.js"],
        github: "https://github.com/A1maan/rukn",
        demo: "#"
    },
    {
        id: 2,
        title: "Dyslexia Detection - IEEE Access Publication",
        description: "Feature-efficient and interpretable dyslexia detection via soft voting ensemble learning. Enhanced performance by more than 2% across all metrics compared to baseline models. Published in IEEE Access 2025. Engineered the novel approach, project code, and evaluation plots.",
        icon: "📊",
        category: "research",
        tags: ["PyTorch", "Python", "Machine Learning", "Ensemble Methods", "mRMR"],
        github: "https://github.com/A1maan",
        demo: "#"
    },
    {
        id: 3,
        title: "Jarir AI Salesman - LangGraph Agent",
        description: "Intelligent chatbot assistant for Jarir Bookstore with tool-based reasoning. Engineered an agentic system using LangGraph to autonomously access and search product data. Developed during KAUST Academy AI Summer School with personalized recommendations.",
        icon: "🤖",
        category: "ai-agents",
        tags: ["LangChain", "LangGraph", "Python", "NLP", "Agents"],
        github: "https://github.com/A1maan/jarir-nlp",
        demo: "#"
    },
    {
        id: 4,
        title: "MSGU-Net - Medical Image Segmentation",
        description: "Lightweight deep learning framework for medical image segmentation, specifically designed for skin lesion detection. Published framework with comprehensive documentation and benchmarks on standard medical imaging datasets.",
        icon: "🏥",
        category: "deep-learning",
        tags: ["PyTorch", "Deep Learning", "Computer Vision", "Medical AI"],
        github: "https://github.com/A1maan/msgu-net",
        demo: "https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2024.1480055/full"
    },
    {
        id: 5,
        title: "Class Imbalance in Object Detection",
        description: "Research project addressing technical challenges of class imbalance and rare object detection in multi-class scenarios. Developing novel approaches to improve detection performance on underrepresented classes.",
        icon: "🎯",
        category: "computer-vision",
        tags: ["Object Detection", "Deep Learning", "PyTorch", "Computer Vision"],
        github: "https://github.com/A1maan/long-tail-imbalance-handling",
        demo: "#"
    },
    {
        id: 6,
        title: "Interactive Portfolio Website",
        description: "Responsive, modern portfolio with dynamic project filtering, real-time search, enhanced form validation, and smooth animations. Features dark mode, GitHub API integration, and LocalStorage persistence. Built with vanilla JavaScript for optimal performance.",
        icon: "🌐",
        category: "web",
        tags: ["HTML5", "CSS3", "JavaScript", "API Integration", "UX/UI"],
        github: "https://github.com/A1maan/assignment-2",
        demo: "#"
    }
];

// wait for the dom to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    
    function updateTimeGreeting() {
        const greetingEl = document.getElementById('time-greeting');
        if (!greetingEl) return;
        
        const hour = new Date().getHours();
        let greeting = '';
        let emoji = '';
        
        if (hour < 12) {
            greeting = 'Good morning!';
            emoji = '🌅';
        } else if (hour < 18) {
            greeting = 'Good afternoon!';
            emoji = '☀️';
        } else {
            greeting = 'Good evening!';
            emoji = '🌙';
        }
        
        greetingEl.textContent = `${emoji} ${greeting}`;
    }
    
    // Update greeting on page load and every minute
    updateTimeGreeting();
    setInterval(updateTimeGreeting, 60000);
    
    
    const sectionNavBtns = document.querySelectorAll('.section-nav-btn');
    sectionNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Update active state
            sectionNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetElement = document.getElementById(section);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update section nav active state on scroll
    window.addEventListener('scroll', function() {
        const sections = ['about', 'projects', 'github-repos', 'contact'];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const btn = document.querySelector(`[data-section="${sectionId}"]`);
            
            if (section && btn) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const scrollPosition = window.scrollY;
                
                if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
                    sectionNavBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            }
        });
    });
    
    // mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // mobile menu should be closed when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // dark mode 
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // quick check to see if user has any mode preferences (cuz some people seem to like light mode apparently)
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    } else {
        // light mode preference (why just why lol)
        body.classList.remove('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = '🌙';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // update button icon to opposite mode and save user's preference
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
            
            updateNavbarTheme();
        });
    }
    
    // func to update navbar colr
    function updateNavbarTheme() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (body.classList.contains('dark-mode')) {
                navbar.style.backgroundColor = window.scrollY > 50 ? '#1e293b' : '#334155';
            } else {
                navbar.style.backgroundColor = '#ffffff';
            }
        }
    }
    
    // smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // Use event delegation to handle expand/collapse - ONE listener for all cards
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.addEventListener('click', function(e) {
            // Check if click is on expand button
            const expandBtn = e.target.closest('.project-expand-btn');
            if (expandBtn) {
                e.stopPropagation();
                
                const card = expandBtn.closest('.project-card');
                const icon = expandBtn.querySelector('.expand-icon');
                
                if (!card || !icon) return;
                
                // Close all other cards first
                document.querySelectorAll('.project-card').forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                        const otherIcon = otherCard.querySelector('.expand-icon');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
                icon.style.transform = card.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0deg)';
                return;
            }
            
            // Check if click is on project header (but not on button or links)
            const header = e.target.closest('.project-header');
            if (header && !e.target.closest('.project-expand-btn') && !e.target.closest('a')) {
                const card = header.closest('.project-card');
                const icon = card.querySelector('.expand-icon');
                
                if (!card || !icon) return;
                
                // Close all other cards first
                document.querySelectorAll('.project-card').forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                        const otherIcon = otherCard.querySelector('.expand-icon');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
                icon.style.transform = card.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }
    
    
    let allProjects = [];
    let filteredProjects = [];
    let currentFilter = 'all';
    
    // Load projects
    function loadProjects() {
        const loadingState = document.getElementById('projects-loading');
        const errorState = document.getElementById('projects-error');
        const projectsGrid = document.querySelector('.projects-grid');
        
        // Simulate API call with delay
        setTimeout(() => {
            try {
                allProjects = [...projectsData];
                filteredProjects = [...projectsData];
                
                // Hide loading, show projects
                if (loadingState) loadingState.style.display = 'none';
                
                renderProjects(filteredProjects);
                
                // Try to fetch GitHub repos (optional enhancement)
                fetchGitHubRepos();
                
            } catch (error) {
                console.error('Error loading projects:', error);
                if (loadingState) loadingState.style.display = 'none';
                if (errorState) errorState.style.display = 'block';
            }
        }, 1000);
    }
    
    // Render projects to DOM
    function renderProjects(projects) {
        const projectsGrid = document.querySelector('.projects-grid');
        const emptyState = document.getElementById('projects-empty');
        
        if (!projectsGrid) return;
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }
        
        if (emptyState) emptyState.style.display = 'none';
        
        projectsGrid.innerHTML = projects.map((project, index) => `
            <div class="project-card" style="animation-delay: ${index * 0.1}s" data-category="${project.category}" data-project-id="${project.id}">
                <div class="project-header">
                    <div class="project-image">
                        <div class="project-placeholder">${project.icon}</div>
                    </div>
                    <div class="project-header-content">
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-category-badge">${project.category}</span>
                    </div>
                    <button class="project-expand-btn" aria-label="Toggle project details">
                        <span class="expand-icon">▼</span>
                    </button>
                </div>
                
                <div class="project-content">
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.demo && project.demo !== '#' ? `<a href="${project.demo}" class="project-link demo-link" target="_blank">
                            <span>View Project</span>
                            <span class="external-icon">↗</span>
                        </a>` : ''}
                        ${project.github && project.github !== '#' ? `<a href="${project.github}" class="project-link github-link" target="_blank">
                            <span>GitHub Repo</span>
                            <span class="external-icon">↗</span>
                        </a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Filter projects by category
    function filterProjects(category) {
        currentFilter = category;
        
        if (category === 'all') {
            filteredProjects = [...allProjects];
        } else {
            filteredProjects = allProjects.filter(project => project.category === category);
        }
        
        // Apply search if active
        const searchInput = document.getElementById('project-search');
        if (searchInput && searchInput.value.trim()) {
            searchProjects(searchInput.value);
        } else {
            renderProjects(filteredProjects);
        }
    }
    
    // Search projects
    function searchProjects(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            renderProjects(filteredProjects);
            return;
        }
        
        const results = filteredProjects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            // project.description.toLowerCase().includes(searchTerm) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        renderProjects(results);
    }
    
    // Set up filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    // Set up search input
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchProjects(e.target.value);
        });
    }
    
    // Initialize projects
    loadProjects();
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submit-btn');
        
        // Real-time validation
        function validateField(input, errorId, validator) {
            const errorElement = document.getElementById(errorId);
            const error = validator(input.value);
            
            if (error) {
                errorElement.textContent = error;
                input.style.borderColor = '#dc2626';
                return false;
            } else {
                errorElement.textContent = '';
                input.style.borderColor = '#10b981';
                return true;
            }
        }
        
        // Validators
        const validators = {
            name: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return null;
            },
            email: (value) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return null;
            },
            message: (value) => {
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return null;
            }
        };
        
        // Add real-time validation
        nameInput.addEventListener('blur', () => validateField(nameInput, 'name-error', validators.name));
        emailInput.addEventListener('blur', () => validateField(emailInput, 'email-error', validators.email));
        messageInput.addEventListener('blur', () => validateField(messageInput, 'message-error', validators.message));
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateField(nameInput, 'name-error', validators.name);
            const isEmailValid = validateField(emailInput, 'email-error', validators.email);
            const isMessageValid = validateField(messageInput, 'message-error', validators.message);
            
            if (!isNameValid || !isEmailValid || !isMessageValid) {
                return;
            }
            
            // Show loading state
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Store submission in localStorage
            const submission = {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
                timestamp: new Date().toISOString()
            };
            
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Show success message
            const successMessage = document.getElementById('form-success');
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Reset field borders
            [nameInput, emailInput, messageInput].forEach(input => {
                input.style.borderColor = '#e5e7eb';
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // extra small thing (this part will greet the user based on the time of day)
    function displayGreeting() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const now = new Date();
        const hour = now.getHours();
        let greeting;
        
        if (hour < 12) {
            greeting = "Good Morning! I'm";
        } else if (hour < 17) {
            greeting = "Good Afternoon! I'm";
        } else {
            greeting = "Good Evening! I'm";
        }
        
        heroTitle.innerHTML = `${greeting} <span class="highlight">Almaan Khan</span>`;
    }
    
    displayGreeting();
    
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            updateNavbarTheme();
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // fade-in animation to sections when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // hero section should be visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
    
    // typing effect for hero subtitle 
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        // typing using a short delay to replicate real human typing
        setTimeout(type, 1000);
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }

    
    // Trigger scroll animations when sections come into view
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Fade in sections
                    if (entry.target.tagName === 'SECTION') {
                        entry.target.classList.add('visible');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                    
                    // Fade in scroll-reveal elements
                    if (entry.target.classList.contains('scroll-reveal')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize scroll animations when page loads
    initScrollAnimations();
    
    // Initialize GitHub API integration
    fetchGitHubRepos();
    
    // Initialize Quotes API integration
    fetchInspirationalQuote();
});

// func just to get the current time in string format
function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

// same thing but for date
function getCurrentDate() {
    return new Date().toLocaleDateString();
}
// GitHub API Integration
async function fetchGitHubRepos() {
    const username = 'A1maan';
    const loadingEl = document.getElementById('github-loading');
    const errorEl = document.getElementById('github-error');
    const gridEl = document.querySelector('.github-grid');
    
    console.log('Fetching pinned GitHub repos via berrysauce API for:', username);
    console.log('Elements found:', { loadingEl, errorEl, gridEl });
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const response = await fetch(`https://pinned.berrysauce.dev/get/${username}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const message = `Failed to fetch pinned repositories: ${response.status}`;
            throw new Error(message);
        }
        
        const repos = await response.json();
        if (!Array.isArray(repos) || repos.length === 0) {
            throw new Error('No pinned repositories found.');
        }
        console.log('✓ Successfully fetched pinned GitHub repos:', repos.length);
        
        if (loadingEl) {
            loadingEl.style.display = 'none';
            console.log('✓ Loading spinner hidden');
        }
        if (errorEl) {
            errorEl.style.display = 'none';
        }
        
        const normalizedRepos = repos.map(repo => ({
            name: repo.name,
            html_url: `https://github.com/${repo.author}/${repo.name}`,
            description: repo.description || '',
            stargazers_count: typeof repo.stars === 'number' ? repo.stars : 0,
            forks_count: typeof repo.forks === 'number' ? repo.forks : 0,
            language: repo.language || ''
        }));
        
        localStorage.setItem('githubRepos', JSON.stringify(normalizedRepos));
        localStorage.setItem('githubReposFetchTime', Date.now().toString());
        
        displayGitHubRepos(normalizedRepos);
        console.log('✓ displayGitHubRepos() called with berrysauce pinned repos');
        
    } catch (error) {
        console.error('Error fetching pinned GitHub repos:', error);
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) {
            errorEl.style.display = 'flex';
            const errorText = errorEl.querySelector('p');
            if (errorText) errorText.textContent = error.message;
        }
    }
}

function displayGitHubRepos(repos) {
    const gridEl = document.querySelector('.github-grid');
    
    console.log('Displaying repos:', repos);
    console.log('Grid element:', gridEl);
    
    if (!gridEl) {
        console.error('Grid element not found!');
        return;
    }
    
    if (!repos || repos.length === 0) {
        gridEl.innerHTML = '<p>No repositories found.</p>';
        return;
    }
    
    // language-to-color mapping
    const languageColors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C': '#555555',
        'Jupyter Notebook': '#DA5B0B',
        'Shell': '#89e051',
        'Vue': '#41b883',
        'React': '#61dafb'
    };
    
    gridEl.innerHTML = repos.map(repo => {
        const languageColor = repo.languageColor || languageColors[repo.language] || '#858585';
        
        return `
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card">
                <div class="repo-header">
                    <span class="repo-icon">📁</span>
                    <h3 class="repo-name">${repo.name}</h3>
                </div>
                ${repo.description ? `<p class="repo-description">${repo.description}</p>` : '<p class="repo-description" style="opacity: 0.5;">No description available</p>'}
                <div class="repo-stats">
                    <span class="repo-stat">
                        <span>⭐</span>
                        <span>${repo.stargazers_count}</span>
                    </span>
                    <span class="repo-stat">
                        <span>🔀</span>
                        <span>${repo.forks_count}</span>
                    </span>
                    ${repo.language ? `
                        <span class="repo-stat">
                            <span class="language-dot" style="background-color: ${languageColor}"></span>
                            <span>${repo.language}</span>
                        </span>
                    ` : ''}
                </div>
            </a>
        `;
    }).join('');
}

// Quotes API Integration
async function fetchInspirationalQuote() {
    const loadingEl = document.getElementById('quote-loading');
    const errorEl = document.getElementById('quote-error');
    const displayEl = document.getElementById('quote-display');
    const quoteText = displayEl.querySelector('.quote-text');
    const quoteAuthor = displayEl.querySelector('.quote-author');
    
    // Programming/Coding/AI focused quotes
    const fallbackQuotes = [
        { content: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
        { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { content: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
        { content: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
        { content: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
        { content: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
        { content: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
        { content: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
        { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { content: "Make it work, make it right, make it fast.", author: "Kent Beck" },
        { content: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
        { content: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupery" },
        { content: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
        { content: "Artificial intelligence is the new electricity.", author: "Andrew Ng" },
        { content: "Machine learning is the last invention that humanity will ever need to make.", author: "Nick Bostrom" },
        { content: "Data is the new oil, but unlike oil, data is reusable.", author: "Clive Humby" },
        { content: "AI is not going to replace humans, but humans with AI are going to replace humans without AI.", author: "Kai-Fu Lee" },
        { content: "The goal is to turn data into information, and information into insight.", author: "Carly Fiorina" },
        { content: "Deep learning is a superpower. With it you can make a computer see, synthesize novel art, translate languages, render a medical diagnosis, or build pieces of a car that can drive itself.", author: "Andrew Ng" }
    ];
    
    try {
        // Using Real Inspire API (free, open source, supports CORS)
        const response = await fetch('https://api.realinspire.live/v1/quotes/random?maxLength=200');
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        
        // Hide loading state
        loadingEl.style.display = 'none';
        
        // Display quote (API returns array, get first item)
        const quote = Array.isArray(data) ? data[0] : data;
        quoteText.textContent = `"${quote.content}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
        displayEl.style.display = 'block';
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        // Use fallback quote
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        loadingEl.style.display = 'none';
        quoteText.textContent = `"${randomQuote.content}"`;
        quoteAuthor.textContent = `— ${randomQuote.author}`;
        displayEl.style.display = 'block';
    }
}
