document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. Theme Initialization & Toggle with LocalStorage Persistence
    // ==========================================================================
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("anandh-portfolio-theme") || "dark";
    
    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        if (themeToggle) {
            const icon = themeToggle.querySelector("i");
            if (icon) {
                icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
            }
        }
        localStorage.setItem("anandh-portfolio-theme", theme);
    }
    
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(newTheme);
        });
    }

    // ==========================================================================
    // 2. Initialize Typed.js for Hero Section (Natural Student Stage Titles)
    // ==========================================================================
    const typedTarget = document.getElementById("typed-text");
    if (typedTarget && typeof Typed !== "undefined") {
        new Typed('#typed-text', {
            strings: [
                'Computer Science Student.',
                'Java Programmer.',
                'Full-Stack Developer.',
                'Problem Solver.'
            ],
            typeSpeed: 45,
            backSpeed: 28,
            backDelay: 2200,
            loop: true
        });
    }

    // ==========================================================================
    // 3. Initialize Particles.js (Subtle Network Constellation)
    // ==========================================================================
    if (typeof particlesJS !== "undefined" && document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 45, density: { enable: true, value_area: 850 } },
                color: { value: "#38bdf8" },
                opacity: { value: 0.18, random: true },
                size: { value: 2.5, random: true },
                line_linked: {
                    enable: true,
                    distance: 140,
                    color: "#2563eb",
                    opacity: 0.12,
                    width: 1
                },
                move: { enable: true, speed: 1.2, direction: "none", random: true }
            },
            interactivity: {
                events: { 
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: false }
                }
            }
        });
    }

    // ==========================================================================
    // 4. Mouse Glow Follower
    // ==========================================================================
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow) {
        window.addEventListener("mousemove", (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // ==========================================================================
    // 5. GSAP Staggered Scroll Animations (Preserved, Non-Destructive, Respects Reduced Motion)
    // ==========================================================================
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!prefersReducedMotion) {
            const sections = document.querySelectorAll('.section-padding');
            sections.forEach(section => {
                const cards = section.querySelectorAll('.glass-card');
                if (cards.length > 0) {
                    gsap.fromTo(cards,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: "power2.out",
                            clearProps: "transform,opacity",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                                toggleActions: "play none none none",
                                once: true
                            }
                        }
                    );
                }
            });

            // Recalculate ScrollTrigger markers once images and web fonts finish loading
            window.addEventListener("load", () => {
                ScrollTrigger.refresh();
            });

            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    ScrollTrigger.refresh();
                });
            }
        }
    }

    // ==========================================================================
    // 6. Magnetic Button Physics Effect
    // ==========================================================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ==========================================================================
    // 7. Mobile Navigation Toggle & Accessible Drawer
    // ==========================================================================
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
                icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
                const icon = mobileMenuBtn.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            });
        });

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
                const icon = mobileMenuBtn.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            }
        });
    }

    // ==========================================================================
    // 8. Authentic Seven-Project Case Studies Data (Verified & Technically Exact)
    // ==========================================================================
    const projectData = {
        gallerycloud: {
            title: "Gallery Cloud",
            subtitle: "Cloud-Based Photo Gallery & In-Browser EXIF Parser",
            category: "Main Software Application",
            heroImg: "",
            hasHeroImg: false,
            fallbackIcon: "fa-solid fa-cloud-arrow-up",
            fallbackColor: "var(--royal-blue)",
            problem: "Managing personal media often requires costly cloud subscriptions, leaves users vulnerable to platform lock-in, and lacks private, client-side control over sensitive EXIF camera metadata.",
            objective: "Build a responsive web application providing user-isolated photo storage, client-side binary EXIF metadata parsing, chronological browsing, and two-phase deletion recovery.",
            architecture: "React 19 single-page application integrating Firebase Authentication for user accounts, Cloud Firestore for user-isolated metadata enforced via security rules, Cloudinary CDN for responsive media delivery, and serverless deletion endpoints.",
            modules: [
                "In-Browser Binary EXIF Parser: Pure JavaScript TIFF/IFD parser extracting camera model, lens, ISO, aperture, shutter speed, and focal length directly in the browser.",
                "Two-Phase Recycle Bin: Implements soft deletion (isDeleted: true) to allow safe one-click restoration before permanent deletion.",
                "Chronological Timeline: Groups images by Year, Month, and Day, featuring an 'On This Day' anniversary memories view.",
                "Client-Side Preference Storage: Persists grid density presets (Comfortable, Standard, Compact) and sorting options in localStorage without triggering Firestore reads.",
                "Slideshow & Lightbox: Automated sequential photo presentation with configurable delay intervals and keyboard navigation."
            ],
            contribution: "Designed and built the full frontend in React 19, authored the custom binary EXIF parser from scratch in JavaScript, and configured Firestore security rules for user isolation.",
            challenges: "Parsing binary EXIF tags across various camera file formats without external libraries; resolved by implementing a lightweight byte-stream parser for Little-Endian and Big-Endian TIFF structures.",
            tags: ["React 19", "Firebase Auth", "Cloud Firestore", "Cloudinary", "Binary EXIF", "Vite"],
            github: "https://github.com/anandh113/GalleryCloud",
            demo: ""
        },
        karigarai: {
            title: "KarigarAI",
            subtitle: "Virtual Business Management Application for Traditional Artisans",
            category: "Main Software Application",
            heroImg: "assets/karigarai_hero.jpg",
            hasHeroImg: true,
            fallbackIcon: "fa-solid fa-wand-magic-sparkles",
            fallbackColor: "var(--purple)",
            problem: "Traditional Indian artisans produce quality handcrafted goods but face challenges in writing structured product descriptions, cataloging inventory, and determining fair market prices.",
            objective: "Develop a virtual business management platform enabling artisans to upload smartphone photos, provide brief inputs, and generate structured e-commerce product catalogs with smart pricing guidance.",
            architecture: "React 19 TypeScript frontend with role-specific views (ShopOwnerApp and AdminApp), an Express.js REST backend, MySQL relational database for products and vendors, Cloudinary for image hosting, and Google Gemini API for multimodal vision and natural language processing.",
            modules: [
                "Multimodal AI Catalog Generator: Uses Google Gemini Vision API to analyze product photos and voice/text prompts, extracting crafting materials, technique details, and dimensions.",
                "Smart Pricing Advisor: Calculates suggested retail pricing based on estimated crafting labor hours, raw material costs, and standard craft margins.",
                "AI Image Enhancement Pipeline: Adjusts lighting and contrast on raw smartphone photos to improve digital catalog presentation.",
                "Role-Based Portals: Distinct views for artisans to manage their inventory and administrators to oversee catalog entries.",
                "Secure REST API: Node.js and Express backend implementing JWT authentication, bcrypt password hashing, Helmet headers, and rate limiting."
            ],
            contribution: "Implemented full-stack architecture, integrated the Google Gemini API with custom parsing logic, designed normalized MySQL schemas, and engineered the responsive artisan interface.",
            challenges: "Ensuring consistent structured JSON output from multimodal AI responses; addressed by applying strict system prompts and fallback parsing heuristics.",
            tags: ["React 19", "TypeScript", "Node.js", "Express", "MySQL", "Google Gemini API", "Cloudinary"],
            github: "https://github.com/anandh113/KarigarAI",
            demo: ""
        },
        hostelabsence: {
            title: "Hostel Absence Management System",
            subtitle: "Role-Based Student Absence & Attendance Workflow",
            category: "Main Software Application",
            heroImg: "",
            hasHeroImg: false,
            fallbackIcon: "fa-solid fa-building-user",
            fallbackColor: "var(--electric-cyan)",
            problem: "Communication delays between classroom faculty and hostel administration can cause unauthorized hostel student absences to go unnoticed during college hours.",
            objective: "Create an integrated, role-guarded attendance workflow that identifies hostel student absences immediately upon classroom attendance submission and facilitates physical hostel verification.",
            architecture: "Single-page web application featuring 4 role-guarded portals (Administrator, Faculty, HOD, Warden), client-side state architecture with audit invariants, SheetJS spreadsheet parsing, and EmailJS notification alerts, integrated with a Java Spring Boot enterprise backend, Flyway database migrations, and MySQL relational storage.",
            modules: [
                "Hourly Attendance Marking: Faculty record period attendance with duplicate session prevention (same date, hour, department, subject).",
                "Automated Warden Absence Alerting: Marking a hostel student absent instantly logs an alert in the Warden Verification Queue.",
                "Physical Room Verification & Email Dispatch: Wardens verify student physical presence in hostel rooms and dispatch parental notifications via EmailJS.",
                "Audit Invariant: Guarantees that subsequent attendance rectifications by HODs do not erase the Warden's physical inspection record.",
                "Administrative Bulk Import & Backend: SheetJS Excel/CSV parsing for batch student rosters, Chart.js summaries, and Java Spring Boot MySQL relational schema."
            ],
            contribution: "Architected the role-based routing flow, defined the attendance state invariants, integrated SheetJS spreadsheet parsing, and implemented EmailJS notification triggers.",
            challenges: "Maintaining reliable audit history across multiple role workflows without a dedicated remote database; achieved through robust structured local state schemas and validation tests.",
            tags: ["React 18", "Java Spring Boot", "MySQL", "Flyway", "Chart.js", "SheetJS (xlsx)", "EmailJS"],
            github: "", // Private/local codebase - hidden per instructions
            demo: ""
        },
        safenav: {
            title: "SafeNav – Collision Detection & Warning",
            subtitle: "Smartphone Sensor-Based Vehicle Collision Warning System",
            category: "Main Software Application",
            heroImg: "assets/safenav_icon.png",
            hasHeroImg: true,
            fallbackIcon: "fa-solid fa-car-burst",
            fallbackColor: "var(--amber)",
            problem: "Dedicated automotive collision warning hardware and specialized external proximity sensors are expensive and unavailable on most everyday commuter vehicles and two-wheelers.",
            objective: "Develop a low-cost, mobile-first collision detection application that utilizes smartphone hardware sensors and direct vehicle-to-vehicle (V2V) communication to provide advance visual, audio, and vibration alerts.",
            architecture: "Flutter cross-platform mobile client with background sensor polling, noise filtering algorithms, WebSocket vehicle-to-vehicle communication, and kinematic collision estimation models.",
            modules: [
                "Smartphone Sensor Processing: Samples onboard GPS/GNSS, accelerometer, gyroscope, and magnetometer APIs at regular intervals.",
                "Filtering & Blending: Uses complementary filtering, accuracy-weighted sensor blending, IIR gravity separation, and dead reckoning to estimate vehicle motion and suppress road vibration noise.",
                "V2V Telemetry Communication: Exchanges location, speed, and heading coordinates between nearby devices via WebSocket.",
                "Collision Risk Assessment: Computes relative velocity, Time-to-Collision (TTC), Time of Closest Approach (TCA), and Distance at Closest Approach (DCA).",
                "Multi-Modal Alerts: Displays a tactical 360° proximity interface with color-coded risk levels (Safe, Warning, Critical) paired with audio tones and device vibration.",
                "Diagnostics View: Real-time telemetry monitor showing GPS fix quality, sensor values, and peer latency."
            ],
            contribution: "Academic Mini-Project team member at Paavai Engineering College. Implemented sensor data structures, kinematic collision calculation logic, and tactical alert UI widgets.",
            challenges: "Handling irregular GPS refresh rates and motion noise on smartphones; addressed using complementary filtering and dead reckoning between GPS readings.",
            tags: ["Flutter", "Dart", "Android SDK", "Smartphone Sensors", "WebSocket", "V2V Telemetry", "Kinematics"],
            github: "", // Academic codebase - hidden per instructions
            demo: ""
        },
        ecofit: {
            title: "EcoFit — Sustainable Materials Website",
            subtitle: "Client Project — Designed and Developed Sustainable Products Platform",
            category: "Client Project",
            heroImg: "assets/logo.png",
            hasHeroImg: true,
            fallbackIcon: "fa-solid fa-leaf",
            fallbackColor: "var(--neon-green)",
            problem: "A client required a dedicated digital web presence and interactive product catalog to showcase eco-friendly construction materials manufactured from recycled industrial and agricultural waste.",
            objective: "Design and develop a clean, responsive client-requested website presenting sustainable construction products, material specifications, and customer inquiry channels.",
            architecture: "Semantic HTML5, responsive CSS3 grid system, and Vanilla JavaScript client architecture with interactive FAQ accordion components, product specification cards, and mobile navigation drawer.",
            modules: [
                "Sustainable Product Showcase: Highlights client-specified building products (foundry bricks, sand pavers, biomanure) with technical properties.",
                "Interactive FAQ Accordion: Dynamic client-side component answering questions regarding product durability and sustainability standards.",
                "Client Inquiry & Contact Section: Direct inquiry form routing client procurement requests and customer messages.",
                "Responsive Multi-Device Layout: Mobile-first navigation drawer and fluid grid layout ensuring optimal rendering on all screen sizes."
            ],
            contribution: "Client Project — Solely designed and developed the entire website according to client specifications, implementing semantic markup, responsive stylesheets, interactive accordions, and mobile navigation.",
            challenges: "Structuring diverse recycled material categories cleanly without visual clutter; addressed through modular specification cards and consistent responsive grid alignment.",
            tags: ["HTML5", "CSS3", "JavaScript", "Client Project", "Responsive Design"],
            github: "", // Client project codebase - hidden per instructions
            demo: ""
        },
        sqltracker: {
            title: "SQL Study Tracker",
            subtitle: "7-Day Structured SQL Learning Schedule with Sequential Unlocking",
            category: "Websites and Practical Tools",
            heroImg: "assets/sql_tracker_hero.png",
            hasHeroImg: true,
            fallbackIcon: "fa-solid fa-database",
            fallbackColor: "var(--royal-blue)",
            problem: "Peer study groups frequently face inconsistent pacing and lack of accountability when preparing relational database topics without structured tracking.",
            objective: "Build a collaborative study tracker for 4 engineering peers covering 138 curated SQL topics over a 7-day schedule with server-enforced progression.",
            architecture: "React 19 TypeScript frontend communicating with a Node.js/Express backend that derives all completion counts and day unlock states directly inside MySQL via parameterized queries.",
            modules: [
                "138-Topic Structured Roadmap: Organizes fundamental DDL/DML, joins, grouping, subqueries, window functions, and indexing across 7 days.",
                "Authoritative Server Logic: Progress percentages and day access states are calculated dynamically in MySQL, preventing client-side bypass.",
                "Sequential Day Unlocking: Day N becomes accessible only when all topics in Day N-1 are marked complete.",
                "Dynamic Re-Locking: Unchecking a previous topic dynamically re-locks subsequent days to reinforce thorough concept mastery.",
                "Friends Overview: Read-only visibility into peer progress without competitive rank pressure.",
                "Automated Database Seeding: Idempotent migration script ensuring zero data inconsistency during setup."
            ],
            contribution: "Built the full-stack application, authored MySQL schemas and queries, implemented sequential unlock derivation logic, and designed the responsive UI.",
            challenges: "Managing state consistency during concurrent uncheck actions; resolved by computing unlock states dynamically via SQL queries rather than storing mutable boolean flags.",
            tags: ["React 19", "TypeScript", "Node.js", "Express", "MySQL", "Vite"],
            github: "https://github.com/anandh113/SQL-PROGRESS-TRACKER",
            demo: ""
        },
        portfoliobattle: {
            title: "24-Hour Portfolio Battle",
            subtitle: "Timed Portfolio Challenge Platform with Server-Authoritative Logic",
            category: "Websites and Practical Tools",
            heroImg: "",
            hasHeroImg: false,
            fallbackIcon: "fa-solid fa-trophy",
            fallbackColor: "var(--amber)",
            problem: "Hackathons and timed development sprints often experience synchronization disputes and unverified submission timestamps across different devices.",
            objective: "Build a real-time challenge tracking platform for 3 developers building portfolios within a shared 24-hour countdown, featuring 3D visuals and server-side ranking.",
            architecture: "Full-stack competitive challenge platform built with React 19, TypeScript, Vite, Tailwind CSS, Three.js 3D WebGL cyber scene, and Supabase PostgreSQL with Supabase Realtime subscriptions and Deno Edge Functions (start-challenge, submit-portfolio, reset-challenge).",
            modules: [
                "Interactive 3D Centerpiece: Three.js WebGL scene featuring rotating geometric core, particle fields, energy rings, and graceful 2D canvas fallback.",
                "Server-Authoritative Countdown: Centralized UTC deadline engine surviving client clock changes and browser reloads.",
                "Participant Submission Workflow: Submission modal with strict URL validation and live leaderboard updates.",
                "Supabase Edge Functions & Schema: Serverless Deno functions for atomic challenge starts, portfolio submissions, and administrative resets.",
                "Automated Test Coverage: 17 passed Vitest unit and mock backend lifecycle tests (distinguishing verified local mock behavior from live production Supabase deployment)."
            ],
            contribution: "Lead frontend developer and 3D WebGL implementer. Designed Supabase database procedures, real-time event subscriptions, and responsive UI.",
            challenges: "Preventing race conditions during near-simultaneous URL submissions; resolved with unique PostgreSQL constraints and transaction locking.",
            tags: ["React 19", "TypeScript", "Three.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Vitest"],
            github: "", // Local codebase - hidden per instructions
            demo: ""
        }
    };

    // Modal Elements
    const projectModal = document.getElementById("projectModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalHeroImg = document.getElementById("modalHeroImg");
    const modalGraphic = document.getElementById("modalGraphic");
    const modalProblem = document.getElementById("modalProblem");
    const modalObjective = document.getElementById("modalObjective");
    const modalArchitecture = document.getElementById("modalArchitecture");
    const modalModules = document.getElementById("modalModules");
    const modalContribution = document.getElementById("modalContribution");
    const modalChallenges = document.getElementById("modalChallenges");
    const modalTags = document.getElementById("modalTags");
    const modalGithubBtn = document.getElementById("modalGithubBtn");
    const modalDemoBtn = document.getElementById("modalDemoBtn");

    function openProjectModal(projectId) {
        const data = projectData[projectId];
        if (!data || !projectModal) return;

        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalCategory.textContent = data.category;
        
        if (data.hasHeroImg && data.heroImg) {
            modalHeroImg.src = data.heroImg;
            modalHeroImg.alt = `${data.title} Screenshot`;
            modalHeroImg.style.display = "block";
            modalGraphic.style.display = "none";
        } else {
            modalHeroImg.style.display = "none";
            modalGraphic.style.display = "flex";
            const icon = modalGraphic.querySelector("i");
            const title = modalGraphic.querySelector("span");
            if (icon) {
                icon.className = `${data.fallbackIcon} project-graphic-icon`;
                icon.style.color = data.fallbackColor;
            }
            if (title) title.textContent = data.title;
        }

        modalProblem.textContent = data.problem;
        modalObjective.textContent = data.objective;
        modalArchitecture.textContent = data.architecture;
        modalContribution.textContent = data.contribution;
        modalChallenges.textContent = data.challenges;

        modalModules.innerHTML = "";
        data.modules.forEach(mod => {
            const li = document.createElement("li");
            li.textContent = mod;
            modalModules.appendChild(li);
        });

        modalTags.innerHTML = "";
        data.tags.forEach(t => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = t;
            modalTags.appendChild(span);
        });

        // Hide GitHub button if repository is unverified or private
        if (data.github && data.github.trim() !== "") {
            modalGithubBtn.href = data.github;
            modalGithubBtn.style.display = "inline-flex";
        } else {
            modalGithubBtn.style.display = "none";
        }

        // Hide Live Demo button if no genuine live deployment
        if (data.demo && data.demo.trim() !== "") {
            modalDemoBtn.href = data.demo;
            modalDemoBtn.style.display = "inline-flex";
        } else {
            modalDemoBtn.style.display = "none";
        }

        projectModal.classList.add("active");
        document.body.style.overflow = "hidden";
        if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-project-target]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const target = btn.getAttribute("data-project-target");
            openProjectModal(target);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }

    // ==========================================================================
    // 9. Certificate Viewer Modal (Images & Previews)
    // ==========================================================================
    const certModal = document.getElementById("certModal");
    const certCloseBtn = document.getElementById("certCloseBtn");
    const certViewerImg = document.getElementById("certViewerImg");
    const certViewerTitle = document.getElementById("certViewerTitle");
    const certViewerIssuer = document.getElementById("certViewerIssuer");

    function openCertModal(imgSrc, title, issuer) {
        if (!certModal) return;
        certViewerImg.src = imgSrc;
        certViewerImg.alt = `${title} Certificate`;
        certViewerTitle.textContent = title;
        certViewerIssuer.textContent = issuer;
        certModal.classList.add("active");
        document.body.style.overflow = "hidden";
        if (certCloseBtn) certCloseBtn.focus();
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-cert-view]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const imgSrc = btn.getAttribute("data-cert-img");
            const title = btn.getAttribute("data-cert-title") || "Certificate";
            const issuer = btn.getAttribute("data-cert-issuer") || "Issuing Organization";
            openCertModal(imgSrc, title, issuer);
        });
    });

    if (certCloseBtn) certCloseBtn.addEventListener("click", closeCertModal);
    if (certModal) {
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) closeCertModal();
        });
    }

    // Close any active modal with Escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProjectModal();
            closeCertModal();
        }
    });

    // ==========================================================================
    // 10. Contact Form Integration (Official EmailJS Browser SDK)
    // Vite-compatible environment variables
    // ==========================================================================
    const EMAILJS_SERVICE_ID = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID) || "";
    const EMAILJS_TEMPLATE_ID = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID) || "";
    const EMAILJS_PUBLIC_KEY = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY) || "";

    // Helper to check whether all required EmailJS configuration variables are provided
    function isEmailJSConfigured() {
        return Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
    }

    // Initialize EmailJS Browser SDK if public key is configured
    if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY) {
        try {
            emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        } catch (e) {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }
    }

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatusMessage");
    let isSubmitting = false;

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Prevent duplicate submissions
            if (isSubmitting) return;

            // Honeypot spam check (silently absorbs bot submissions without wasting EmailJS quota)
            const honeypot = document.getElementById("contactHoneypot");
            if (honeypot && honeypot.value.trim().length > 0) {
                contactForm.reset();
                showFormStatus("Thank you! Your message has been sent successfully.", "success");
                return;
            }

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const subjectInput = document.getElementById("subject");
            const messageInput = document.getElementById("message");
            const submitBtn = contactForm.querySelector('button[type="submit"]') || document.getElementById("contactSubmitBtn");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const subject = (subjectInput && subjectInput.value.trim()) || `Portfolio Message from ${name}`;
            const message = messageInput ? messageInput.value.trim() : "";

            // 1. Validate required fields
            if (name.length < 2) {
                showFormStatus("Please enter your name (minimum 2 characters).", "error");
                if (nameInput) nameInput.focus();
                return;
            }

            // 2. Validate visitor email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus("Please enter a valid email address.", "error");
                if (emailInput) emailInput.focus();
                return;
            }

            if (message.length < 10) {
                showFormStatus("Please enter a message with at least 10 characters.", "error");
                if (messageInput) messageInput.focus();
                return;
            }

            // Verify required EmailJS environment variables are configured
            if (!isEmailJSConfigured()) {
                console.error(
                    "EmailJS Configuration Error: Required environment variables are missing.\n" +
                    `  VITE_EMAILJS_SERVICE_ID: ${EMAILJS_SERVICE_ID ? "configured" : "MISSING"}\n` +
                    `  VITE_EMAILJS_TEMPLATE_ID: ${EMAILJS_TEMPLATE_ID ? "configured" : "MISSING"}\n` +
                    `  VITE_EMAILJS_PUBLIC_KEY: ${EMAILJS_PUBLIC_KEY ? "configured" : "MISSING"}\n` +
                    "Please ensure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY are set in your Vercel Project Settings or local .env file."
                );
                showFormStatus("Contact service is not configured (missing environment variables). Please reach out directly to anandhvenkatesh123@gmail.com.", "error");
                return;
            }

            // Verify EmailJS SDK is available
            if (typeof emailjs === "undefined") {
                showFormStatus("Email service is temporarily unavailable. Please reach out directly to anandhvenkatesh123@gmail.com.", "error");
                return;
            }

            // 3. UI Loading State & Prevent Duplicate Submissions
            isSubmitting = true;
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
            showFormStatus("Sending your message...", "loading");

            // 4. Map existing form fields to exact template parameters
            const templateParams = {
                from_name: name,
                reply_to: email,
                subject: subject,
                message: message
            };

            // 5. Send via EmailJS SDK
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
                .then(() => {
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                    contactForm.reset();
                    showFormStatus("Thank you! Your message has been sent successfully to Anandh.", "success");
                })
                .catch((error) => {
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                    const errorMsg = (error && (error.text || error.message)) ? ` (${error.text || error.message})` : "";
                    showFormStatus(`Unable to send message${errorMsg}. Please try again or reach out directly to anandhvenkatesh123@gmail.com.`, "error");
                });
        });
    }

    function showFormStatus(msg, type) {
        if (!formStatus) return;
        formStatus.textContent = msg;
        formStatus.className = `form-status-message ${type}`;
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

});
