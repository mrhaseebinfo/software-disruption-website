/* ============================================================
   build.js — Static site generator (dev tool only; output is
   plain HTML/CSS/JS). Run: node tools/build.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const icon = require("./icons");
const { url, MAP } = require("./paths");
const ROOT = path.join(__dirname, "..");

const P = "assets/img/";
const SH = "assets/img/shapes/";


/* Renders header and rewrites any root-relative .html links inside `body`
   so they work from nested folders (about/index.html etc). */
function headerWithFix(active, sub, body, depth) {
  let out = body;
  const lvl = depth || (sub ? 1 : 0);
  const px = lvl === 2 ? "../../" : lvl === 1 ? "../" : "";
  if (px) {
    // Fix only root-relative links (skip ones already starting with ../ or ../../)
    out = out.replace(/href="(?!\.\.\/)(?!http)(?!mailto:)(?!tel:)(?!#)([^"]+)"/g, function (m, u) {
      if (u.charAt(0) === "/") return m;               // absolute — leave
      if (u.slice(0, 3) === "../" || u.slice(0, 6) === "../../") return m; // already fixed
      if (u.indexOf(":") !== -1) return m;             // scheme
      return 'href="' + px + u + '"';
    });
    out = out.replace(/src="assets\//g, 'src="' + px + 'assets/');
  }
  return header(active, sub, depth) + out;
}


/* ---------------- Shared header ---------------- */
function header(active, sub, depth) {
  const A = (k) => (active === k ? " active" : "");
  const d = depth || (sub ? 1 : 0);
  const HP = depth === 2 ? "../../assets/img/" : sub ? "../assets/img/" : "assets/img/";
  const L = (k, label, act) => `<li><a href="${url(k, d)}" class="nav-link${act || ""}">${label}</a></li>`;
  const M = (k, label) => `<a href="${url(k, d)}">${label}</a>`;
  return `<div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-left">
        <span class="tb-item">${icon("map-pin", 14)} IFZA Business Park, Dubai, UAE</span>
        <span class="tb-sep"></span>
        <a class="tb-item" href="tel:+971557529787">${icon("phone", 14)} +971-557529787</a>
      </div>
      <div class="topbar-right">
        <span class="tb-item">${icon("clock", 14)} Sun–Thu: 9:00–18:00 GST</span>
        <span class="tb-sep"></span>
        <a class="tb-item tb-in" href="https://www.linkedin.com/company/software-disruption/" target="_blank" rel="noopener">${icon("linkedin", 14)} LinkedIn</a>
      </div>
    </div>
  </div>
  <header class="header" id="header">
    <div class="container header-inner">
      <a class="logo" href="${url("home", d)}">
        <img src="${HP}loggo.png" alt="Software Disruption logo" width="42" height="42">
        <span class="logo-text">Software<em>Disruption</em></span>
      </a>
      <nav class="nav" id="nav" aria-label="Main navigation">
        <div class="nav-head">
          <img src="${HP}loggo.png" alt="" width="34" height="34">
          <span>Menu</span>
          <button class="nav-close" id="navClose" aria-label="Close menu">&#10005;</button>
        </div>
        <ul class="nav-list">
          ${L("home", "Home", A("home"))}
          <li class="nav-item has-dropdown">
            <a href="${url("services", d)}" class="nav-link${A("services")}">Services <span class="caret"><svg class="ico" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span></a>
            <div class="dropdown mega">
              <div class="mega-grid">
                ${M("data-engineering", icon("data-engineering", 18) + "<span>Data Engineering</span>")}
                ${M("data-science-services", icon("data-science", 18) + "<span>Data Science</span>")}
                ${M("ai-machine-learning-services", icon("ai", 18) + "<span>AI &amp; Machine Learning</span>")}
                ${M("product-management-services", icon("product", 18) + "<span>Product Management</span>")}
                ${M("software-consulting-services", icon("consulting", 18) + "<span>Software Consulting</span>")}
                ${M("resource-augmentation-services", icon("team", 18) + "<span>Resource Augmentation</span>")}
                ${M("devops-cloud-services", icon("cloud", 18) + "<span>DevOps &amp; Cloud</span>")}
                ${M("digital-transformation-services", icon("rocket", 18) + "<span>Digital Transformation</span>")}
                ${M("odoo-partner", icon("puzzle", 18) + "<span>Odoo Partner</span>")}
              </div>
              <div class="mega-foot">
                <p>Not sure what you need? Book a free consultation.</p>
                <a class="link-more" href="${url("contact", d)}">Talk to an expert ${icon("arrow-right", 14)}</a>
              </div>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a href="${url("industries", d)}" class="nav-link${A("industries")}">Industries <span class="caret"><svg class="ico" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span></a>
            <div class="dropdown">
              <ul class="drop-list">
                <li><a href="${url("industries", d)}">All Industries</a></li>
                ${["business-accounting","disaster-relief","energy-utilities","government","healthcare","higher-education","hotel-management","logistics","livestock","manufacturing","real-estate","retail-ecommerce","telecom-media"].map(k => `<li><a href="${url("industries", d).replace("industries/index.html", "industries/" + k + "/index.html")}">${({"business-accounting":"Business Accounting","disaster-relief":"Disaster Relief","energy-utilities":"Energy &amp; Utilities","government":"Government &amp; Public Sector","healthcare":"Healthcare","higher-education":"Higher Education","hotel-management":"Hotel Management","logistics":"Logistics &amp; Supply Chain","livestock":"Livestock &amp; Animal Health","manufacturing":"Manufacturing","real-estate":"Real Estate &amp; Construction","retail-ecommerce":"Retail &amp; E-Commerce","telecom-media":"Telecom &amp; Media"})[k]}</a></li>`).join("")}
              </ul>
            </div>
          </li>
          ${L("about", "About Us", A("about"))}
          ${L("testimonials", "Testimonials", A("testimonials"))}
          ${L("why", "Why Us", A("why"))}
        </ul>
        <a class="btn btn-primary nav-cta" href="${url("contact", d)}">Contact Us</a>
      </nav>
      <div class="header-actions">
        <button class="search-btn" id="searchBtn" aria-label="Search">
          <svg class="ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </button>
        <a class="btn btn-primary header-cta" href="${url("contact", d)}">Contact Us</a>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>

  <!-- Search overlay -->
  <div class="search-overlay" id="searchOverlay" aria-hidden="true">
    <div class="search-box" role="dialog" aria-modal="true" aria-label="Search the site">
      <div class="search-input-row">
        <svg class="ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input type="text" id="searchInput" placeholder="Search services, industries, pages..." autocomplete="off">
        <button class="search-close" id="searchClose" aria-label="Close search">&#10005;</button>
      </div>
      <div class="search-hint" id="searchHint">Try "AI", "data engineering", "healthcare", "Odoo", "cloud"...</div>
      <div class="search-results" id="searchResults"></div>
    </div>
  </div>

  <a class="whatsapp-float" href="https://wa.me/971557529787" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.25 8.21zm4.53-6.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg></a>
  <button class="scroll-top" id="scrollTop" aria-label="Scroll to top"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg></button>`;
}

/* ---------------- Shared footer ---------------- */
function footer() {
  return `<footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col footer-about">
          <a class="logo footer-logo" href="index.html">
            <img src="${P}loggo.png" alt="Software Disruption logo" width="40" height="40">
            <span class="logo-text">Software<em>Disruption</em></span>
          </a>
          <p>Software Disruption – FZCO is a Dubai-based AI and data engineering company helping enterprises build scalable, data-driven software solutions across the GCC.</p>
          <div class="footer-social">
            <a href="https://www.linkedin.com/company/software-disruption/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.45-.03-3.35-2.05-3.35-2.05 0-2.35 1.6-2.35 3.2V21H9z"/></svg></a>
            <a href="https://wa.me/971557529787" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.53 12.98c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="about-us.html">About Us</a></li>
            <li><a href="why-choose-us.html">Why Us</a></li>
            <li><a href="how-we-work.html">How We Work</a></li>
            <li><a href="our-team.html">Our Team</a></li>
            <li><a href="careers.html">Careers</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resource</h4>
          <ul>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="case-studies.html">Case Studies</a></li>
            <li><a href="client-testimonials.html">Client Testimonials</a></li>
            <li><a href="faq.html">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>What We Do</h4>
          <ul>
            <li><a href="services/ai-machine-learning-services.html">AI &amp; Machine Learning</a></li>
            <li><a href="services/data-engineering.html">Data Engineering</a></li>
            <li><a href="services/devops-cloud-services.html">DevOps / Cloud</a></li>
            <li><a href="services/digital-transformation-services.html">Digital Transformation</a></li>
            <li><a href="services/software-consulting-services.html">Software Consulting</a></li>
            <li><a href="services/odoo-partner.html">Odoo Partner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <ul class="footer-contact">
            <li><strong>Phone</strong><a href="tel:+971557529787">+971-557529787</a></li>
            <li><strong>Email</strong><a href="mailto:waqas@softwaredisruption.com">waqas@softwaredisruption.com</a></li>
            <li><strong>Address</strong><span>IFZA Business Park, DDP, PREMISES NO: 35039-001 Dubai</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Software Disruption - FZCO. All Rights Reserved.</p>
        <div class="footer-legal"><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-service.html">Terms of Service</a></div>
      </div>
    </div>
  </footer>`;
}

/* ---------------- Shared footer ---------------- */
function footer(sub) {
  const X = (f) => (sub ? "../" + f : f);
  return `<footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col footer-about">
          <a class="logo footer-logo" href="${X("index.html")}">
            <img src="${X(P)}loggo.png" alt="Software Disruption logo" width="40" height="40">
            <span class="logo-text">Software<em>Disruption</em></span>
          </a>
          <p>Software Disruption – FZCO is a Dubai-based AI and data engineering company helping enterprises build scalable, data-driven software solutions across the GCC.</p>
          <div class="footer-social">
            <a href="https://www.linkedin.com/company/software-disruption/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.45-.03-3.35-2.05-3.35-2.05 0-2.35 1.6-2.35 3.2V21H9z"/></svg></a>
            <a href="https://wa.me/971557529787" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.53 12.98c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="${X("about-us.html")}">About Us</a></li>
            <li><a href="${X("why-choose-us.html")}">Why Us</a></li>
            <li><a href="${X("how-we-work.html")}">How We Work</a></li>
            <li><a href="${X("our-team.html")}">Our Team</a></li>
            <li><a href="${X("careers.html")}">Careers</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resource</h4>
          <ul>
            <li><a href="${X("blog.html")}">Blog</a></li>
            <li><a href="${X("case-studies.html")}">Case Studies</a></li>
            <li><a href="${X("client-testimonials.html")}">Client Testimonials</a></li>
            <li><a href="${X("faq.html")}">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>What We Do</h4>
          <ul>
            <li><a href="${X("services/ai-machine-learning-services.html")}">AI &amp; Machine Learning</a></li>
            <li><a href="${X("services/data-engineering.html")}">Data Engineering</a></li>
            <li><a href="${X("services/devops-cloud-services.html")}">DevOps / Cloud</a></li>
            <li><a href="${X("services/digital-transformation-services.html")}">Digital Transformation</a></li>
            <li><a href="${X("services/software-consulting-services.html")}">Software Consulting</a></li>
            <li><a href="${X("services/odoo-partner.html")}">Odoo Partner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <ul class="footer-contact">
            <li><strong>Phone</strong><a href="tel:+971557529787">+971-557529787</a></li>
            <li><strong>Email</strong><a href="mailto:waqas@softwaredisruption.com">waqas@softwaredisruption.com</a></li>
            <li><strong>Address</strong><span>IFZA Business Park, DDP, PREMISES NO: 35039-001 Dubai</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Software Disruption - FZCO. All Rights Reserved.</p>
        <div class="footer-legal"><a href="${X("privacy-policy.html")}">Privacy Policy</a><a href="${X("terms-of-service.html")}">Terms of Service</a></div>
      </div>
    </div>
  </footer>`;
}

/* ---------------- Shared footer ---------------- */
function footer(sub, depth) {
  const d = depth || (sub ? 1 : 0);
  const u = (k) => url(k, d);
  const P = depth === 2 ? "../../assets/img/" : sub ? "../assets/img/" : "assets/img/";
  return `<footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col footer-about">
          <a class="logo footer-logo" href="${u("home")}">
            <img src="${P}loggo.png" alt="Software Disruption logo" width="40" height="40">
            <span class="logo-text">Software<em>Disruption</em></span>
          </a>
          <p>Software Disruption – FZCO is a Dubai-based AI and data engineering company helping enterprises build scalable, data-driven software solutions across the GCC.</p>
          <div class="footer-social">
            <a href="https://www.linkedin.com/company/software-disruption/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.45-.03-3.35-2.05-3.35-2.05 0-2.35 1.6-2.35 3.2V21H9z"/></svg></a>
            <a href="https://wa.me/971557529787" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm4.53 12.98c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="${u("about")}">About Us</a></li>
            <li><a href="${u("why")}">Why Us</a></li>
            <li><a href="${u("howWeWork")}">How We Work</a></li>
            <li><a href="${u("team")}">Our Team</a></li>
            <li><a href="${u("careers")}">Careers</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resource</h4>
          <ul>
            <li><a href="${u("blog")}">Blog</a></li>
            <li><a href="${u("caseStudies")}">Case Studies</a></li>
            <li><a href="${u("testimonials")}">Client Testimonials</a></li>
            <li><a href="${u("faq")}">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>What We Do</h4>
          <ul>
            <li><a href="${u("ai-machine-learning-services")}">AI &amp; Machine Learning</a></li>
            <li><a href="${u("data-engineering")}">Data Engineering</a></li>
            <li><a href="${u("devops-cloud-services")}">DevOps / Cloud</a></li>
            <li><a href="${u("digital-transformation-services")}">Digital Transformation</a></li>
            <li><a href="${u("software-consulting-services")}">Software Consulting</a></li>
            <li><a href="${u("odoo-partner")}">Odoo Partner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <ul class="footer-contact">
            <li><strong>Phone</strong><a href="tel:+971557529787">+971-557529787</a></li>
            <li><strong>Email</strong><a href="mailto:waqas@softwaredisruption.com">waqas@softwaredisruption.com</a></li>
            <li><strong>Address</strong><span>IFZA Business Park, DDP, PREMISES NO: 35039-001 Dubai</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Software Disruption - FZCO. All Rights Reserved.</p>
        <div class="footer-legal"><a href="${u("privacy")}">Privacy Policy</a><a href="${u("terms")}">Terms of Service</a></div>
      </div>
    </div>
  </footer>`;
}

/* ---------------- Shell ---------------- */
function shell({ title, description, active, body, sub, key, depth }) {
  const pre = depth === 2 ? "../../" : sub ? "../" : "";
  const OUT = key ? MAP[key].dir + "/index.html" : "index.html";
  shell.OUT = OUT;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="${pre}assets/img/loggo.png">
  <link rel="stylesheet" href="${pre}assets/css/style.css">
  <script>document.documentElement.className += " js-anim";</script>
</head>
<body>
  <div class="preloader" id="preloader" aria-hidden="true">
    <div class="preloader-inner">
      <img src="${pre}assets/img/loggo.png" alt="" width="74" height="74">
      <div class="preloader-bar"><span></span></div>
      <p>Software<span>Disruption</span></p>
    </div>
  </div>
${headerWithFix(active, sub, body, depth)}

${footer(sub, depth)}
<script>window.SD_PRE="${pre}";</script>
<script src="${pre}assets/js/search-index.js"></script>
<script src="${pre}assets/js/main.js"></script>
</body>
</html>`;
}

/* ---------------- Components ---------------- */
function pageHero({ crumbs, title, lead, points = [], cta = true, sub }) {
  const px = sub === 2 ? "../../" : sub ? "../" : "";
  const X = (f) => px + f;
  const pts = points.length ? `<ul class="hero-points">${points.map((p) => `<li>${p}</li>`).join("")}</ul>` : "";
  const ctas = cta
    ? `<div class="hero-cta-row"><a class="btn btn-orange btn-lg" href="${X("contact/index.html")}">Schedule a Call</a><a class="btn btn-ghost-light btn-lg" href="${X("testimonials/index.html")}">See Client Results</a></div>`
    : "";
  const bc = crumbs
    .map((c, i) => {
      if (!c) return "";
      const href = c[1] ? c[1] : null; // crumbs already carry correct depth prefix from url()
      const label = i ? `<span class="sep">&#8250;</span>` : "";
      return href ? `${label}<a href="${href}">${c[0]}</a>` : `${label}<span class="bc-cur">${c[0]}</span>`;
    })
    .join("");
  return `<section class="page-hero"><div class="container">
    <nav class="breadcrumb">${bc}</nav>
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ""}
    ${pts}${ctas}
  </div></section>`;
}

function ctaBand(title, text, btn = "Book free consultation", sub) {
  const px = sub === 2 ? "../../" : sub ? "../" : "";
  const X = (f) => px + f;
  return `<section class="section cta-band"><div class="container" style="text-align:center;max-width:880px">
    <span class="eyebrow light center">Ready to Disrupt Digitally</span>
    <h2 class="section-title">${title}</h2>
    <p class="lead" style="margin-bottom:34px">${text}</p>
    <div class="hero-cta-row" style="justify-content:center"><a class="btn btn-orange btn-lg" href="${X("contact/index.html")}">${btn}</a><a class="btn btn-ghost-light btn-lg" href="tel:+971557529787">+971-557529787</a></div>
  </div></section>`;
}

const esc = (s) => s;

module.exports = { fs, path, ROOT, P, header, footer, shell, pageHero, ctaBand: ctaBand, esc };