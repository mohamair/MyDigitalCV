/**
 * DIGITAL CV & PORTFOLIO - MOHAMAD ALIF IRFAN
 * Software Engineer | Full Stack Developer | System Analyst
 * Features: Dynamic Typing, Project Filters, Interactive Modals,
 * Contact Form Validation, Toast System, Theme Switcher & Scroll-Spy.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initNavbarScrollSpy();
  initMobileMenu();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initCVDownload();
});

/* ==========================================================================
   1. THEME TOGGLE (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio-theme') || (prefersDark ? 'dark' : 'dark');

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  if (iconSun && iconMoon) {
    if (theme === 'light') {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    } else {
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    }
  }
}

/* ==========================================================================
   2. DYNAMIC TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'Enterprise ERP & Kinetic Specialist',
    'System & Business Analyst',
    'IoT & Cloud Integrator'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1900; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 380; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVBAR SCROLL SPY & SCROLL ELEVATION
   ========================================================================== */
function initNavbarScrollSpy() {
  const navbar = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar shadow on scroll
    if (scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy active class
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. MOBILE HAMBURGER MENU
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');

  if (!hamburgerBtn || !navLinks) return;

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking nav items
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ==========================================================================
   5. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. PROJECT DETAILS MODAL (MOHAMAD ALIF IRFAN'S PROJECTS)
   ========================================================================== */
const projectData = {
  'ipak5-platform': {
    title: 'iPAK5 Platform (PWA, iOS, Android, Huawei)',
    subtitle: 'Industrial Mobile Ecosystem & Raspberry Pi Edge Telemetry to AWS',
    category: 'IoT, Cloud & Cross-Platform Mobile',
    stats: '⚡ Real-time machine status monitoring & offline-first sync',
    overview: 'Developed a responsive PWA and native mobile applications (iOS/Android/Huawei) utilizing C#, ASP.NET, Java, Swift, Python, and Tailwind CSS. Integrated QR scanning for instant film specification lookup and built edge telemetry features with Raspberry Pi for real-time machine status monitoring. Built an integrated AI chat assistant for machine diagnostics and deployed data pipelines across AWS (EC2, S3, RDS) with offline-first synchronization.',
    features: [
      'Cross-Platform Mobile Ecosystem: Responsive PWA and native apps (iOS/Android/Huawei) using C#, ASP.NET, Java, Swift, Python, and Tailwind CSS',
      'IoT & Camera Integration: Integrated QR scanning for instant film specification lookup',
      'Edge Telemetry: Raspberry Pi edge devices running Linux for real-time machine status monitoring',
      'AI & Cloud Infrastructure: Integrated AI chat assistant for machine diagnostics and AWS (EC2, S3, RDS) data pipelines with offline-first sync'
    ],
    tech: ['C#', 'ASP.NET', 'Java', 'Swift', 'Python', 'Tailwind CSS', 'Raspberry Pi', 'AWS (EC2, S3, RDS)', 'Linux'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'nexfusion-portal': {
    title: 'NexFusion Customer Portal (PWA)',
    subtitle: 'ERP & Machine Data Aggregation Self-Service Portal',
    category: 'Enterprise ERP & PWA',
    stats: '💼 Real-time product specs, order fulfillment & automated invoices',
    overview: 'Architected a unified PWA linking Epicor/Kinetic ERP APIs and ESTL machine databases into a single customer-facing portal. Enabled client visibility into real-time product specs, order fulfillment, job telemetry, firm test results, and automated invoice downloads. Built backend REST services using C# and ASP.NET with a responsive Tailwind CSS and JavaScript frontend.',
    features: [
      'ERP & Machine Data Aggregation: Unified PWA linking Epicor/Kinetic ERP APIs and ESTL machine databases',
      'Self-Service Analytics: Client visibility into real-time product specs, order fulfillment, job telemetry, firm test results',
      'Automated Invoicing: Automated invoice downloads and customer account reconciliation',
      'Modern Stack: Built backend REST services using C# and ASP.NET with responsive Tailwind CSS & JavaScript'
    ],
    tech: ['C#', 'ASP.NET', 'Kinetic ERP API', 'ESTL Database', 'Tailwind CSS', 'JavaScript', 'REST API'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'tgx-ninja': {
    title: 'TGxNinja (PWA) - TGPT',
    subtitle: 'Automated Courier Form Submission Integrating NinjaVan, SiteGiant & Kinetic APIs',
    category: 'Logistics Automation & APIs',
    stats: '📦 Eliminates manual data entry & minimizes courier processing time',
    overview: 'Automates courier form submission by integrating NinjaVan, SiteGiant, and Kinetic APIs. Auto-retrieves customer and shipment details, eliminating manual data entry. Reduces processing time and minimizes dispatch errors. Built with Asp.Net, C#, Javascript, Tailwind CSS, Node.js, Visual Studio, and REST API.',
    features: [
      'Automates courier form submission by integrating NinjaVan, SiteGiant, and Kinetic APIs',
      'Auto-retrieves customer and shipment details, eliminating manual data entry',
      'Reduces processing time and minimizes dispatch errors',
      'Built with Asp.Net, C#, Javascript, Tailwind CSS, Node.js, Visual Studio, REST API'
    ],
    tech: ['ASP.NET', 'C#', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Visual Studio', 'REST API', 'NinjaVan API', 'SiteGiant API'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'firm-performance': {
    title: 'Firm Performance Test (PWA) - TGPT',
    subtitle: 'QR Code Shopfloor Diagnostic Tool with ESTL & Kinetic APIs',
    category: 'Manufacturing IoT & PWA',
    stats: '📱 Quick mobile access on the production floor with trend graphs',
    overview: 'Retrieves machine data and firm test results by scanning QR codes. Integrated with ESTL API and Kinetic API. Displays graphs, trends, and historical performance data. Enables quick mobile access on the production floor. Built with Asp.Net, C#, Javascript, Tailwind CSS, Node.js, Visual Studio, and REST API.',
    features: [
      'Retrieves machine data and firm test results by scanning QR codes',
      'Integrated with ESTL Machine API and Kinetic ERP API',
      'Displays graphs, trends, and historical performance data',
      'Enables quick mobile access on the production floor',
      'Built with Asp.Net, C#, Javascript, Tailwind CSS, Node.js, Visual Studio, REST API'
    ],
    tech: ['ASP.NET', 'C#', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Visual Studio', 'REST API', 'ESTL API', 'Kinetic API'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'courier-requisition': {
    title: 'Courier Service Requisition System (PWA) - TGPT',
    subtitle: 'Digitized Courier Request, Real-time Tracking & Approval System',
    category: 'Logistics & Enterprise PWA',
    stats: '🚚 Role-based access, automated notifications & live courier tracking',
    overview: 'Digitized courier request and approval process. Real-time shipment tracking via courier API integration. Role-based access and automated notifications. Built with Asp.Net, C#, Javascript, Tailwind CSS, Node.js, Visual Studio, and REST API.',
    features: [
      'Digitized courier request and multi-tier approval workflow',
      'Real-time shipment tracking via courier API integration',
      'Role-based access control (RBAC) and automated dispatch notifications',
      'Built with Asp.Net, C#, Javascript, Tailwind CSS, Node.js, Visual Studio, REST API'
    ],
    tech: ['ASP.NET', 'C#', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Visual Studio', 'REST API'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'ar-payment-portal': {
    title: 'Automated Accounts Receivable & Payment Gateway Portal (PWA)',
    subtitle: 'Maybank Payment Gateway API & Kinetic ERP OData Integration',
    category: 'Financial Integration & ERP Automation',
    stats: '⏱️ Reduces payment posting cycles by 90%',
    overview: 'Financial API Integration: Integrated Maybank Payment Gateway APIs with Kinetic ERP OData REST APIs using ASP.NET in PWA mode to automate customer payment reconciliation. Automated ERP Cash Entry: Engineered a single-click workflow that verifies customer bank transfers in real time and automatically posts matched Cash Receipt Entries directly into Kinetic ERP, eliminating manual financial data entry and reducing payment posting cycles by 90%.',
    features: [
      'Financial API Integration: Maybank Payment Gateway APIs integrated with Kinetic ERP OData REST APIs in PWA mode',
      'Automated ERP Cash Entry: Single-click workflow verifying customer bank transfers in real time',
      'Auto-posts matched Cash Receipt Entries directly into Kinetic ERP',
      'Eliminates manual financial data entry and cuts payment posting cycles by 90%'
    ],
    tech: ['ASP.NET', 'C#', 'Kinetic ERP OData', 'Maybank Gateway API', 'MS SQL Server', 'PWA', 'REST API'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'epicor-kinetic-migration': {
    title: 'Migration Epicor to Kinetic (ERP System) - TGPT',
    subtitle: 'Enterprise-Wide ERP Upgrade, SSRS Report Conversion & Validation',
    category: 'Enterprise ERP Migration',
    stats: '🏆 Appreciation Award for successful migration with zero downtime',
    overview: 'Assisted in migrating ERP from Epicor to Kinetic. Managed data transfer, SSRS report path updates, and configuration changes. Performed validation and testing for seamless continuity. Received Appreciation Award for successful migration. Converted SSRS Reports to Live.',
    features: [
      'Assisted in migrating ERP from legacy Epicor to modern Kinetic',
      'Managed data transfer, SSRS report path updates, and configuration changes',
      'Performed rigorous validation and user testing for seamless operational continuity',
      'Received Appreciation Award for successful zero-downtime migration',
      'Converted SSRS Reports to Live production systems'
    ],
    tech: ['Epicor ERP', 'Kinetic ERP', 'SSRS Reports', 'BAQ / BPM', 'SQL Server', 'Data Migration'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'jabil-chamber': {
    title: 'Chamber Utilization System and Connect with Raspberry PI - Jabil P2',
    subtitle: 'Electricity Tariff Surveillance via Modbus/RS485 & Power BI Visualizer',
    category: 'Embedded IoT & Power Surveillance',
    stats: '💡 Helped reduce energy costs by 15% - 20%',
    overview: 'Raspberry Pi monitors electricity tariffs during peak/non-peak hours. Data collected via Modbus/RS485 and stored in MySQL. Power BI dashboards visualize usage and energy costs. Helped reduce energy costs by 15–20%. Built with C#, SQL Server, VB.Net, Visual Studio, RaspberryPi, Linux, Python.',
    features: [
      'Raspberry Pi monitors electricity tariffs during peak/non-peak hours',
      'Data collected via Modbus/RS485 hardware sensors and stored in MySQL',
      'Power BI dashboards visualize real-time power usage and energy costs',
      'Helped reduce test facility energy costs by 15% to 20%',
      'Built with C#, SQL Server, VB.Net, Visual Studio, RaspberryPi, Linux, Python'
    ],
    tech: ['C#', 'SQL Server', 'VB.Net', 'Visual Studio', 'RaspberryPi', 'Linux', 'Python', 'Modbus / RS485', 'Power BI'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'cisco-npi': {
    title: 'NPI Project - Jabil P1',
    subtitle: 'Cisco Systems NPI Hardware Validation: Vigor LS, Vigor LS SE, La Corsa',
    category: 'Hardware Automation & CI/CD',
    stats: '🎯 Maintained >95% production yield for Cisco Systems',
    overview: 'Led NPI testing for 3 Cisco projects: Vigor LS, Vigor LS SE, La Corsa. Defined test strategies, performed hardware validation, and managed risks. Maintained >95% production yield. Ensured mass production readiness. Built with Python, Linux Shell Scripting, Bitbucket, PyCharm, Jenkins, Apollo GUI, BOM, MobaXTerm.',
    features: [
      'Led NPI testing for 3 Cisco projects: Vigor LS, Vigor LS SE, La Corsa',
      'Defined test strategies, performed hardware validation, and managed risks',
      'Maintained >95% production yield throughout prototype and validation cycles',
      'Ensured mass production readiness according to strict Cisco specifications',
      'Built with Python, Linux Shell Scripting, Bitbucket, PyCharm, Jenkins, Apollo GUI, BOM, MobaXTerm'
    ],
    tech: ['Python', 'Linux Shell Scripting', 'Bitbucket', 'PyCharm', 'Jenkins', 'Apollo GUI', 'BOM', 'MobaXTerm'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  },
  'hctm-esb': {
    title: 'Emergency Surgery Booking System (ESB) & OTIS - HCTM UKM',
    subtitle: 'Native Android Mobile App with Camera-Based MRN Optical Scanning',
    category: 'Healthcare & Mobile Full-Stack',
    stats: '🏥 Eliminated manual data entry errors during emergency surgical triage',
    overview: 'Native Android mobile application using Java, Android Studio, and RESTful APIs, enabling emergency ward clinicians to capture real-time patient status and prioritize surgical cases. Implemented camera-based Medical Record Number (MRN) scanning features to dynamically query and populate patient profiles, eliminating manual data entry errors. Integrated OTIS web platform with ESB mobile application with automated conflict detection.',
    features: [
      'Native Android mobile development using Java, Android Studio, and RESTful APIs',
      'Camera-based Medical Record Number (MRN) scanning to eliminate triage entry errors',
      'Automated clinical triage criteria into decision-support logic for operating theatres',
      'Integrated OTIS web platform with ESB mobile app with slot conflict detection'
    ],
    tech: ['Java', 'Android Studio', 'ASP.NET', 'MySQL', 'SQL Server Profiler', 'REST APIs'],
    demoUrl: 'https://www.linkedin.com/in/alifirfanz/',
    repoUrl: 'https://www.linkedin.com/in/alifirfanz/'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-detail-content');

  if (!modal || !modalClose || !modalBody) return;

  // Open modal when clicking details
  document.querySelectorAll('[data-project-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-trigger');
      const project = projectData[projectId];

      if (project) {
        modalBody.innerHTML = `
          <div class="modal-header-section" style="margin-bottom: 1.5rem;">
            <div class="section-tag" style="margin-bottom: 0.75rem;">${project.category}</div>
            <h2 style="font-size: 1.85rem; margin-bottom: 0.35rem; color: var(--text-primary);">${project.title}</h2>
            <p style="color: var(--accent-cyan); font-weight: 500;">${project.subtitle}</p>
          </div>

          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-weight: 600; color: var(--accent-emerald);">
            ${project.stats}
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-primary);">System Architecture & Business Impact</h4>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${project.overview}</p>
          </div>

          <div style="margin-bottom: 1.75rem;">
            <h4 style="font-size: 1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Key Engineering Deliverables</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; padding-left: 0;">
              ${project.features.map(f => `
                <li style="position: relative; padding-left: 1.4rem; color: var(--text-secondary); font-size: 0.925rem;">
                  <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">▹</span> ${f}
                </li>
              `).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Tech Stack & Infrastructure</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${project.tech.map(t => `<span class="tech-tag" style="background: rgba(0, 242, 254, 0.08); border-color: rgba(0, 242, 254, 0.3); color: var(--accent-cyan);">${t}</span>`).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
            <a href="https://www.linkedin.com/in/alifirfanz/" target="_blank" rel="noopener" class="btn btn-primary" style="flex: 1;">
              Connect on LinkedIn
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:alifirfn99@gmail.com" class="btn btn-secondary" style="flex: 1;">
              Inquire via Email
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   7. CV DOWNLOAD & PRINT INTEGRATION
   ========================================================================== */
function initCVDownload() {
  const downloadBtns = document.querySelectorAll('.cv-download-trigger');
  downloadBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const link = document.createElement('a');
      link.href = 'files/Resume_Alif_2027.pdf';
      link.download = 'Resume_Ts_Mohamad_Alif_Irfan.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();

      showToast('Downloading Ts. Mohamad Alif Irfan\'s CV...', 'success');
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION & HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields (Name, Email, Message)', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please provide a valid email address', 'error');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin" style="width: 18px; height: 18px; animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0110 10" />
      </svg>
      Sending Transmission...
    `;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast(`Thank you ${name}! Your transmission has been sent to alifirfn99@gmail.com. Alif will reply promptly.`, 'success');
    }, 1100);
  });
}

/* ==========================================================================
   9. QUICK EMAIL COPY BUTTON
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = 'alifirfn99@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailText).then(() => {
        showToast('alifirfn99@gmail.com copied to clipboard!', 'success');
      }).catch(() => {
        fallbackCopyText(emailText);
      });
    } else {
      fallbackCopyText(emailText);
    }
  });
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('alifirfn99@gmail.com copied to clipboard!', 'success');
  } catch (err) {
    showToast('Email: ' + text, 'info');
  }
  document.body.removeChild(textArea);
}

/* ==========================================================================
   10. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}
