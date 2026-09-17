/* Part 2: generates index, services, industries, about, why-us, testimonials, contact */
const { fs, path, ROOT, P, header, footer, shell, pageHero, ctaBand } = require("./build");
const servicesD = require("./data-services");
const { replacer } = require("./replace-emojis");
const { url } = require("./paths");
const icon = require("./icons");
const industriesD = require("./data-industries");
const pagesD = require("./data-pages");

const { MAP } = require("./paths");
servicesD.forEach(s => { s.key = s.file.replace(".html", ""); });
const ICON_NAME = {
  "💼": "briefcase", "🆘": "life-buoy", "⚡": "zap", "🏛️": "building", "🏥": "hospital",
  "🎓": "graduation", "🏨": "building", "🚛": "truck", "🐄": "cow", "🏭": "factory",
  "🏗️": "building", "🛒": "cart", "📡": "tv",
};
industriesD.forEach(d => { d.iconName = ICON_NAME[d.icon] || "activity"; d.slug = d.file.replace(".html", ""); });

/* ================= INDEX (HOME) ================= */
const homeBody = `
  <section class="hero" id="home">
    <div class="hero-blob hero-blob-1"></div><div class="hero-blob hero-blob-2"></div><div class="hero-blob hero-blob-3"></div>
    <!-- Liquid overlay (this section only): waves + cursor-following blob -->
    <div class="liquid-overlay" id="liquidOverlay" aria-hidden="true">
      <svg class="liquid-svg" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#634CB6"/>
            <stop offset=".55" stop-color="#8d5bd8"/>
            <stop offset="1" stop-color="#FC741C"/>
          </linearGradient>
        </defs>
        <path class="liquid-wave liquid-wave-2" fill="url(#liquidGrad)" opacity=".22"
          d="M0,600 C260,520 520,680 780,590 C1040,500 1240,660 1440,580 L1440,800 L0,800 Z"/>
        <path class="liquid-wave liquid-wave-1" fill="url(#liquidGrad)" opacity=".16"
          d="M0,520 C240,430 480,610 720,540 C960,470 1200,620 1440,520 L1440,800 L0,800 Z"/>
      </svg>
      <div class="liquid-blob" id="liquidBlob"></div>
      <div class="liquid-blob liquid-blob-2" id="liquidBlob2"></div>
      <div class="liquid-glow"></div>
    </div>
    <div class="container hero-inner">
      <div class="hero-content">
        <p class="hero-tag">Data, AI &amp; Software Company Dubai</p>
        <h1 class="hero-title">Empowering Businesses<br>Through <span class="grad-text">Intelligent</span><br><span class="grad-text">Software Solutions</span></h1>
        <h2 class="hero-subtitle">Dubai's Technology Partner for Custom Software, AI, Data Engineering &amp; Cloud Solutions</h2>
        <p class="hero-desc">We design, build, and deliver high-performance digital products that solve real problems, accelerate growth, and create measurable business impact. From AI-powered platforms to cloud-native systems.</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="${url('contact', 0)}">Get a Free Consultation</a>
          <a class="btn btn-ghost btn-lg" href="${url('services', 0)}">Explore Services</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><span class="stat-num" data-count="50">0</span><span class="stat-plus">+</span><p>Projects Delivered</p></div>
          <div class="stat"><span class="stat-num" data-count="30">0</span><span class="stat-plus">+</span><p>Expert Engineers</p></div>
          <div class="stat"><span class="stat-num" data-count="12">0</span><span class="stat-plus">+</span><p>Industries Served</p></div>
          <div class="stat"><span class="stat-num" data-count="98">0</span><span class="stat-plus">%</span><p>Client Satisfaction</p></div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="orb orb-a"></div><div class="orb orb-b"></div><div class="orb orb-c"></div>
        <div class="hero-card">
          <div class="hc-top"><span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span></div>
          <div class="hc-body">
            <div class="hc-row"><span class="hc-badge">&lt;/&gt;</span><p>AI Model Training</p><span class="hc-val">94%</span></div>
            <div class="bar"><span style="width:94%"></span></div>
            <div class="hc-row"><span class="hc-badge">&#9729;</span><p>Cloud Deployment</p><span class="hc-val">89%</span></div>
            <div class="bar"><span style="width:89%"></span></div>
            <div class="hc-row"><span class="hc-badge">&#10022;</span><p>Data Pipelines</p><span class="hc-val">97%</span></div>
            <div class="bar"><span style="width:97%"></span></div>
          </div>
        </div>
        <div class="float-chip chip-1"><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#634CB6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg> AI &amp; ML</div>
        <div class="float-chip chip-2"><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FC741C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> DevOps / Cloud</div>
        <div class="float-chip chip-3"><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#634CB6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg> Data Engineering</div>
      </div>
    </div>
  </section>

  <section class="section about" id="about"><div class="blob blob-sm blob-tl"></div>
    <div class="container about-grid">
      <div class="about-text">
        <span class="eyebrow">About Us</span>
        <h2 class="section-title">Software Disruption - FZCO <span class="grad-text">A Dubai-Based Global Technology Company</span></h2>
        <p class="lead">Specializing in custom software development, AI/ML engineering, data engineering, cloud solutions, and digital product innovation — we combine deep technical expertise with strategic insight to create software products that outperform expectations.</p>
        <div class="about-cards stagger">
          <article class="mini-card reveal"><div class="mini-icon">🎯</div><div><h3>Mission</h3><p>To empower businesses through intelligent, scalable, and human-centered technology solutions.</p></div></article>
          <article class="mini-card reveal"><div class="mini-icon">🔭</div><div><h3>Vision</h3><p>To become a global leader in next-generation software solutions that transform industries and enhance everyday lives.</p></div></article>
          <article class="mini-card reveal"><div class="mini-icon">💎</div><div><h3>Values</h3><p>Innovation First, Integrity &amp; Transparency, Precision in Every Detail, Client-Centric Approach, Long-Term Partnerships.</p></div></article>
        </div>
        <a class="btn btn-ghost" style="margin-top:26px" href="${url('about', 0)}">Learn More About Us</a>
      </div>
      <div class="about-visual reveal">
        <div class="ai-ring"><span>Dubai<br><em>Global Tech Hub</em></span></div>
        <div class="ai-tags"><span>Custom Software</span><span>AI / ML</span><span>Data Engineering</span><span>Cloud Solutions</span><span>Product Innovation</span></div>
      </div>
    </div>
  </section>

  <section class="section wedo" id="how-we-work"><div class="container">
    <span class="eyebrow center">What / How</span>
    <h2 class="section-title center">We Do / <span class="grad-text">We Deliver</span></h2>
    <div class="wedo-grid stagger">
      <div class="wedo-col reveal">
        <div class="wedo-badge">⚙️</div><h3>We Do</h3>
        <p>We help businesses automate and optimize their operations through modern, scalable technology solutions — powered by AI, machine learning, cloud engineering, and agile development. Our goal is to function as an extension of your internal team: not just a vendor, but a true technology partner focused on your long-term success.</p>
        <p>By working in a team-augmentation capacity, we keep your workflows seamless and deliver working, testable software throughout the development cycle. This approach guarantees transparency, alignment, and faster time-to-value.</p>
        <ul class="check-list"><li>Agile development cycles</li><li>Transparent &amp; aligned delivery</li><li>Working software at every stage</li></ul>
      </div>
      <div class="wedo-col reveal">
        <div class="wedo-badge badge-orange">📤</div><h3>We Deliver</h3>
        <p>From concept to production, we ship reliable, scalable digital products that create measurable business impact across the GCC and beyond.</p>
        <div class="deliver-items">
          <div class="deliver-item"><span class="di-num">01</span><div><h4>MVPs &amp; SaaS Platforms</h4><p>Launch fast, validate quickly, scale confidently.</p></div></div>
          <div class="deliver-item"><span class="di-num">02</span><div><h4>Enterprise Systems</h4><p>Robust platforms built for high-volume operations.</p></div></div>
          <div class="deliver-item"><span class="di-num">03</span><div><h4>AI-Powered Products</h4><p>Production-grade ML, NLP &amp; computer vision.</p></div></div>
          <div class="deliver-item"><span class="di-num">04</span><div><h4>Cloud-Native Solutions</h4><p>Secure, high-performance infrastructure on AWS, Azure &amp; GCP.</p></div></div>
        </div>
      </div>
    </div>
  </div></section>

  <section class="section values" id="why-us"><div class="container">
    <span class="eyebrow center">Our Core</span>
    <h2 class="section-title center">Value <span class="grad-text">Proposition</span></h2>
    <div class="values-grid stagger">
      <article class="flip-card reveal">
          <div class="flip-inner">
            <div class="flip-face flip-front">
              <div class="value-icon">${icon("clock")}</div>
              <h3>Time boxed consistent Deliveries</h3>
              <span class="flip-hint">Hover to explore</span>
            </div>
            <div class="flip-face flip-back">
              <h4>Time boxed consistent Deliveries</h4>
              <p>We follow a disciplined, agile delivery model that ensures your milestones are met without compromise. Timely releases mean faster go-to-market and reduced operational delays.</p>
            </div>
          </div>
        </article>
        <article class="flip-card reveal">
          <div class="flip-inner">
            <div class="flip-face flip-front">
              <div class="value-icon">${icon("money")}</div>
              <h3>Cost-Effective Offshore Development</h3>
              <span class="flip-hint">Hover to explore</span>
            </div>
            <div class="flip-face flip-back">
              <h4>Cost-Effective Offshore Development</h4>
              <p>Access to top engineering talent at significantly lower cost — without sacrificing quality, communication, or accountability. Based in Dubai with delivery teams across multiple time zones.</p>
            </div>
          </div>
        </article>
        <article class="flip-card reveal">
          <div class="flip-inner">
            <div class="flip-face flip-front">
              <div class="value-icon">${icon("globe")}</div>
              <h3>End-to-End Product Development</h3>
              <span class="flip-hint">Hover to explore</span>
            </div>
            <div class="flip-face flip-back">
              <h4>End-to-End Product Development</h4>
              <p>From ideation to launch, we build digital products from scratch. Whether it's an MVP, a SaaS platform, or a full-scale enterprise system, we take ownership of the entire journey.</p>
            </div>
          </div>
        </article>
        <article class="flip-card reveal">
          <div class="flip-inner">
            <div class="flip-face flip-front">
              <div class="value-icon">${icon("flask")}</div>
              <h3>Expertise in Emerging Technologies</h3>
              <span class="flip-hint">Hover to explore</span>
            </div>
            <div class="flip-face flip-back">
              <h4>Expertise in Emerging Technologies</h4>
              <p>Deep expertise in AI, ML, cloud engineering, data science, and modern technology stacks — ensuring your solution is innovative, future-proof, and competitive.</p>
            </div>
          </div>
        </article>
        <article class="flip-card reveal">
          <div class="flip-inner">
            <div class="flip-face flip-front">
              <div class="value-icon">${icon("shield")}</div>
              <h3>Efficiency &amp; Long-Term Reliability</h3>
              <span class="flip-hint">Hover to explore</span>
            </div>
            <div class="flip-face flip-back">
              <h4>Efficiency &amp; Long-Term Reliability</h4>
              <p>Our engineering philosophy focuses on stable performance, clean architecture, and smooth scalability. Your systems remain robust, maintainable, and ready for growth.</p>
            </div>
          </div>
        </article>
        <article class="flip-card reveal">
          <div class="flip-inner">
            <div class="flip-face flip-front">
              <div class="value-icon">${icon("heart")}</div>
              <h3>Built on Empathy &amp; Client Understanding</h3>
              <span class="flip-hint">Hover to explore</span>
            </div>
            <div class="flip-face flip-back">
              <h4>Built on Empathy &amp; Client Understanding</h4>
              <p>We listen, understand your challenges, and design solutions that solve real problems. Empathy drives everything we build, ensuring the end product truly works for the people who use it.</p>
            </div>
          </div>
        </article>
    </div>
  </div></section>

  <section class="section services" id="services"><div class="blob blob-sm blob-br"></div>
    <div class="container">
      <span class="eyebrow center">What We Offer</span>
      <h2 class="section-title center">Technology Solutions <span class="grad-text">That Work for You</span></h2>
      <div class="services-grid stagger">
        <article class="service-card reveal"><div class="service-icon">${icon("data-engineering")}</div><h3>Data Engineering Services</h3><p>Build reliable data pipelines, cloud data warehouses, and analytics-ready platforms. Turn raw data into a powerful business asset with enterprise-grade data engineering.</p><a class="link-more" href="services/data-engineering/index.html">Learn More <span>&#8594;</span></a></article>
        <article class="service-card reveal"><div class="service-icon">${icon("data-science")}</div><h3>Data Science Services</h3><p>Transform complex data into actionable insights with statistical modeling, predictive analytics, BI dashboards, and customer analytics that drive smarter decisions.</p><a class="link-more" href="services/data-science/index.html">Learn More <span>&#8594;</span></a></article>
        <article class="service-card reveal"><div class="service-icon">${icon("ai")}</div><h3>AI &amp; Machine Learning Services</h3><p>Build production-grade AI and ML solutions — from predictive models and NLP to computer vision and generative AI — that automate processes and deliver measurable ROI.</p><a class="link-more" href="services/ai-machine-learning/index.html">Learn More <span>&#8594;</span></a></article>
        <article class="service-card reveal"><div class="service-icon">${icon("product")}</div><h3>Software Product Management</h3><p>Turn ideas into successful products with strategic planning, discovery-first validation, roadmap execution, and user-focused development.</p><a class="link-more" href="services/product-management/index.html">Learn More <span>&#8594;</span></a></article>
        <article class="service-card reveal"><div class="service-icon">${icon("consulting")}</div><h3>Software Consulting Services</h3><p>Strategic consulting and custom software development for startups and enterprises — architecture design to full-stack development.</p><a class="link-more" href="services/software-consulting/index.html">Learn More <span>&#8594;</span></a></article>
        <article class="service-card reveal"><div class="service-icon">${icon("team")}</div><h3>Resource Augmentation Services</h3><p>Scale your technology team on demand with pre-vetted engineers, data scientists, and product specialists. Integrated with your tools, aligned to your goals.</p><a class="link-more" href="services/resource-augmentation/index.html">Learn More <span>&#8594;</span></a></article>
        <article class="service-card reveal"><div class="service-icon">${icon("cloud")}</div><h3>DevOps / Cloud Services</h3><p>Automate deployments, optimize cloud infrastructure on AWS, Azure, and GCP, and secure your systems with expert DevOps and cloud engineering.</p><a class="link-more" href="services/devops-cloud/index.html">Learn More <span>&#8594;</span></a></article>
        <article class="service-card reveal"><div class="service-icon">${icon("rocket")}</div><h3>Digital Transformation Services</h3><p>Modernize legacy systems and implement innovative technologies to accelerate efficiency, reduce costs, and position your business for digital-first growth.</p><a class="link-more" href="services/digital-transformation/index.html">Learn More <span>&#8594;</span></a></article>
        <article class="service-card reveal"><div class="service-icon">${icon("puzzle")}</div><h3>Odoo Partner</h3><p>As a certified Odoo Partner, we deliver ERP implementation, customization, training, and support to help businesses streamline operations and scale with confidence.</p><a class="link-more" href="services/odoo-partner/index.html">Learn More <span>&#8594;</span></a></article>
      </div>
    </div>
  </section>

  <section class="section cta-band"><div class="container cta-band-inner">
    <div class="cta-band-text reveal">
      <span class="eyebrow light">From idea to execution</span>
      <h2 class="section-title">We turn your vision into a <span class="grad-text">high-performing digital product</span></h2>
      <p class="lead">Accelerate your business growth with tailored software solutions designed around real user needs. Our expert product and engineering teams help startups, SMEs, and enterprises build impactful, scalable digital products that stand out in competitive markets.</p>
      <a class="btn btn-orange btn-lg" href="${url('contact', 0)}">Contact Now</a>
    </div>
    <div class="cta-band-visual reveal"><img class="section-img img-reveal" src="assets/img/idea-to-execution.jpg" alt="Digital transformation Dubai" loading="lazy"></div>
  </div></section>

  <section class="section industries" id="industries"><div class="container">
    <span class="eyebrow center">Industries We Serve</span>
    <h2 class="section-title center">Solutions Built For <span class="grad-text">Every Domain</span></h2>
    <p class="section-sub center">Our software solutions are built to support businesses across all domains. We bring deep engineering and consulting expertise to a wide range of B2B and B2C sectors.</p>
    <div class="industries-grid stagger">
      <article class="ind-card reveal"><span class="ind-icon">${icon("ai", 22)}</span><h4>AI/ML-Driven Domains</h4><p>NLP, Computer Vision, LLM-based solutions</p></article>
      <a class="ind-card reveal" href="${url('i-business-accounting', 0)}"><span class="ind-icon">${icon("briefcase", 22)}</span><h4>Business Accounting</h4><p>Financial automation &amp; compliance</p></a>
      <a class="ind-card reveal" href="${url('i-healthcare', 0)}"><span class="ind-icon">${icon("hospital", 22)}</span><h4>Healthcare</h4><p>Clinical &amp; patient platforms</p></a>
      <a class="ind-card reveal" href="${url('i-logistics', 0)}"><span class="ind-icon">${icon("truck", 22)}</span><h4>Logistics &amp; Supply Chain</h4><p>Fleet, tracking &amp; routing</p></a>
      <a class="ind-card reveal" href="${url('i-retail-ecommerce', 0)}"><span class="ind-icon">${icon("cart", 22)}</span><h4>Retail &amp; E-commerce</h4><p>Commerce platforms &amp; CDP</p></a>
      <a class="ind-card reveal" href="${url('i-higher-education', 0)}"><span class="ind-icon">${icon("graduation", 22)}</span><h4>Higher Education</h4><p>Learning management systems</p></a>
      <a class="ind-card reveal" href="${url('i-livestock', 0)}"><span class="ind-icon">${icon("cow", 22)}</span><h4>Livestock &amp; Animal Health</h4><p>Traceability &amp; monitoring</p></a>
      <a class="ind-card reveal" href="${url('i-manufacturing', 0)}"><span class="ind-icon">${icon("factory", 22)}</span><h4>Manufacturing</h4><p>Industrial automation &amp; MES</p></a>
      <a class="ind-card reveal" href="${url('i-disaster-relief', 0)}"><span class="ind-icon">${icon("shield", 22)}</span><h4>Disaster Relief</h4><p>Rapid response platforms</p></a>
      <a class="ind-card reveal" href="${url('i-real-estate', 0)}"><span class="ind-icon">${icon("building", 22)}</span><h4>Real Estate</h4><p>Property &amp; construction tech</p></a>
      <a class="ind-card reveal" href="${url('i-energy-utilities', 0)}"><span class="ind-icon">${icon("zap", 22)}</span><h4>Energy &amp; Utilities</h4><p>Smart grids &amp; analytics</p></a>
      <a class="ind-card reveal" href="${url('i-telecom-media', 0)}"><span class="ind-icon">${icon("tv", 22)}</span><h4>Telecom &amp; Media</h4><p>Network &amp; content platforms</p></a>
    </div>
    <p class="section-sub center reveal">From complex enterprise workflows to high-impact consumer applications, we adapt our engineering capabilities to fit the unique needs of each industry — delivering scalable, innovative, and production-ready outcomes.</p>
    <div style="text-align:center;margin-top:20px"><a class="btn btn-ghost" href="${url('industries', 0)}">Explore All Industries</a></div>
  </div></section>

  <section class="section split" id="it-solutions"><div class="container split-wrap">
    <div class="split-col split-img reveal"><img class="section-img img-reveal" src="assets/img/it-solutions.jpg" alt="Cutting-edge IT solutions Dubai" loading="lazy"></div>
    <div class="split-col split-text reveal">
      <span class="eyebrow">IT Solutions</span>
      <h2 class="section-title">Boost Your Business with <span class="grad-text">Cutting-Edge IT Solutions</span></h2>
      <p>Elevate your business with custom software and IT solutions engineered for efficiency, scalability, and long-term growth. From cloud infrastructure and DevOps to AI-powered automation — we deliver secure, high-performance systems designed for your evolving needs.</p>
      <p>Supercharge your operations with agile product development and intuitive, user-focused design that enhances engagement and sets your brand apart. Whether you're modernizing existing systems or building new digital products from scratch, we craft solutions that help you innovate with confidence.</p>
      <ul class="check-list"><li>Secure, high-performance systems</li><li>Agile product development</li><li>Cloud infrastructure &amp; DevOps</li></ul>
    </div>
  </div></section>

  <section class="section split split-rev" id="dubai-it"><div class="container split-wrap">
    <div class="split-col split-text reveal">
      <span class="eyebrow">Trusted Local Partner</span>
      <h2 class="section-title">Delivering Intelligent IT Solutions <span class="grad-text">From Dubai</span></h2>
      <p>We are a trusted IT solutions provider in Dubai, delivering innovative, secure, and high-performance technology services that help businesses grow and operate with confidence. From infrastructure to custom software, our solutions are crafted with precision, scalability, and a deep understanding of modern business needs — ensuring every client receives technology that truly works for them.</p>
      <div class="gc-list"><span>Dubai, UAE (HQ)</span><span>Abu Dhabi, UAE</span><span>Riyadh, KSA</span><span>Jeddah, KSA</span></div>
    </div>
    <div class="split-col split-img reveal"><img class="section-img img-reveal" src="assets/img/dubai-delivery.jpg" alt="Cloud solutions UAE" loading="lazy"></div>
  </div></section>

  <section class="section team" id="team"><div class="container">
    <span class="eyebrow center">Our Team</span>
    <h2 class="section-title center">Meet Our <span class="grad-text">Leadership Team</span></h2>
    <div class="team-grid stagger">
      <article class="team-card reveal"><img class="team-photo" src="assets/img/team-waqas.jpg" alt="Waqas Azam"><h3>Waqas Azam</h3><span class="team-role">Managing Director</span><p>Professional experience in Software Architecture, DevOps and Machine Learning</p></article>
      <article class="team-card reveal"><img class="team-photo" src="assets/img/team-yousuf.jpg" alt="Muhammad Yousuf"><h3>Muhammad Yousuf</h3><span class="team-role">Engineering Manager</span><p>Software / Machine Learning Engineer working on computer vision and application backends. Skilled in Python, TensorFlow, Golang, and NodeJS.</p></article>
      <article class="team-card reveal"><img class="team-photo" src="assets/img/team-shahzad.jpg" alt="Shahzad Paracha"><h3>Shahzad Paracha</h3><span class="team-role">Head of Product</span><p>Product Leader with focus on customer-centric innovation &amp; scalable product growth</p></article>
    </div>
  </div></section>

  <section class="section testimonials" id="testimonials"><div class="container">
    <span class="eyebrow center">Client Testimonials</span>
    <h2 class="section-title center">What Our <span class="grad-text">Clients Say</span></h2>
    <div class="testi-grid stagger">
      <figure class="testi-card reveal"><div class="testi-stars"><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg></div><blockquote>"The biggest compliment I can give is that working with this team feels like I haven't outsourced the project — rather it's like I've hired an internal team to work with."</blockquote><figcaption><strong>Muzaffar J. Butt</strong><span>CEO – Obox Solution LTD. (Canada)</span></figcaption></figure>
      <figure class="testi-card reveal"><div class="testi-stars"><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg></div><blockquote>"Software Disruption has been an exceptional partner — consistently demonstrating deep collaboration, technical excellence, and a strong commitment to our mission."</blockquote><figcaption><strong>Joseph Bucher</strong><span>CEO – Relief Compass (Los Angeles, CA)</span></figcaption></figure>
      <figure class="testi-card reveal"><div class="testi-stars"><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg></div><blockquote>"He and his team matured and improved a complex application significantly, while ensuring the project was always in a working and deployable state."</blockquote><figcaption><strong>Evan Villemez</strong><span>VP of Engineering at Jeenie (Washington, DC)</span></figcaption></figure>
    </div>
    <div style="text-align:center;margin-top:36px"><a class="btn btn-ghost" href="${url('testimonials', 0)}">Read All Testimonials</a></div>
  </div></section>

  <section class="section blogs" id="blogs"><div class="container">
    <span class="eyebrow center">Latest Blogs</span>
    <h2 class="section-title center">Insights &amp; <span class="grad-text">Resources</span></h2>
    <div class="blog-grid stagger">
      <article class="blog-card reveal"><a class="blog-thumb" href="${url('blog-e-invoicing-penalties-saudi-arabia', 0)}"><img src="assets/img/blog-einvoicing.jpg" alt="" loading="lazy"><span>Software Development</span></a><div class="blog-body"><span class="blog-cat">Software Development</span><h3><a href="${url('blog-e-invoicing-penalties-saudi-arabia', 0)}">E-Invoicing Penalties in Saudi Arabia: What ZATCA Non-Compliance Actually Costs You</a></h3><p class="blog-meta">by <strong>Waqas Azam</strong> &middot; September 14, 2026</p><p>A production certificate expires on a Thursday afternoon. Nobody notices, because the billing system carries on exactly as before. PDFs...</p><a class="link-more" href="${url('blog-e-invoicing-penalties-saudi-arabia', 0)}">Read More <span>&#8594;</span></a></div></article>
      <article class="blog-card reveal"><a class="blog-thumb" href="${url('blog-it-staff-augmentation-saudi-arabia', 0)}"><img src="assets/img/blog-staffing.jpg" alt="" loading="lazy"><span>Software Development</span></a><div class="blog-body"><span class="blog-cat">Software Development</span><h3><a href="${url('blog-it-staff-augmentation-saudi-arabia', 0)}">IT Staff Augmentation in Saudi Arabia: The Real Cost of Hiring In-House vs. an Augmented Team</a></h3><p class="blog-meta">by <strong>Waqas Azam</strong> &middot; September 2, 2026</p><p>A finance lead in Riyadh signs off a headcount request. Backend engineer, twenty thousand riyals a month, booked at two...</p><a class="link-more" href="${url('blog-it-staff-augmentation-saudi-arabia', 0)}">Read More <span>&#8594;</span></a></div></article>
      <article class="blog-card reveal"><a class="blog-thumb" href="${url('blog-rust-vs-cpp', 0)}"><img src="assets/img/blog-rust.jpg" alt="" loading="lazy"><span>Software Development</span></a><div class="blog-body"><span class="blog-cat">Software Development</span><h3><a href="${url('blog-rust-vs-cpp', 0)}">Rust vs C++: Performance, Memory Management and Safety</a></h3><p class="blog-meta">by <strong>Waqas Azam</strong> &middot; August 15, 2026</p><p>A deadline passed on January 1 this year, and most teams never noticed. CISA and the FBI had named that...</p><a class="link-more" href="${url('blog-rust-vs-cpp', 0)}">Read More <span>&#8594;</span></a></div></article>
    </div>
  </div></section>

  <section class="section contact" id="contact"><div class="container contact-wrap">
    <div class="contact-info reveal">
      <span class="eyebrow light">Contact Us</span>
      <h2 class="section-title">Ready to <span class="grad-text">Get Started</span></h2>
      <p class="lead">Tell us about your project — we'll show you how we can help.</p>
      <div class="contact-rows">
        <div class="contact-row"><span class="cr-icon">✉️</span><div><h4>Email</h4><a href="mailto:waqas@softwaredisruption.com">waqas@softwaredisruption.com</a></div></div>
        <div class="contact-row"><span class="cr-icon">☎️</span><div><h4>Phone</h4><a href="tel:+971557529787">+971-557529787</a> &nbsp;|&nbsp; <a href="tel:+923008299449">+92-3008299449</a></div></div>
        <div class="contact-row"><span class="cr-icon">📍</span><div><h4>Location</h4><p>IFZA Business Park, DDP, PREMISES NO: 35039-001 Dubai</p></div></div>
      </div>
      <div class="contact-banner"><div><h4>Ready to Disrupt Digitally</h4><p>Schedule your free consultation and start building smarter, scalable solutions.</p></div><a class="btn btn-orange" href="${url('contact', 0)}">Book free consultation</a></div>
    </div>
    <div class="contact-form-wrap reveal">
      <form class="contact-form" id="contactForm" novalidate>
        <h3>Get in Touch</h3>
        <div class="form-row">
          <div class="form-group"><label for="name">Full Name <span>*</span></label><input type="text" id="name" name="name" placeholder="Your full name" required><small class="error-msg">Please enter your name</small></div>
          <div class="form-group"><label for="email">Email <span>*</span></label><input type="email" id="email" name="email" placeholder="name@company.com" required><small class="error-msg">Please enter a valid email</small></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label for="phone">Phone</label><input type="tel" id="phone" name="phone" placeholder="+971 5X XXX XXXX"></div>
          <div class="form-group"><label for="subject">Service Needed</label><select id="subject" name="subject"><option>AI &amp; Machine Learning</option><option>Data Engineering</option><option>Data Science</option><option>DevOps / Cloud</option><option>Digital Transformation</option><option>Resource Augmentation</option><option>Odoo ERP</option><option>Other</option></select></div>
        </div>
        <div class="form-group"><label for="message">Project Details <span>*</span></label><textarea id="message" name="message" rows="5" placeholder="Tell us about your project, goals, and timeline..." required></textarea><small class="error-msg">Please tell us about your project</small></div>
        <button type="submit" class="btn btn-primary btn-block">Send Message</button>
        <p class="form-success" id="formSuccess">Thank you! Your message has been sent. We'll get back to you within 24 hours.</p>
      </form>
    </div>
  </div></section>`;

fs.writeFileSync(path.join(ROOT, "index.html"), shell({
  title: "SoftwareDisruption | Data, AI & Software Company Dubai",
  description: "Dubai's Technology Partner for Custom Software, AI, Data Engineering & Cloud Solutions.",
  active: "home", body: homeBody,
}));
console.log("index.html generated");

/* ================= SERVICES OVERVIEW ================= */
const svcBody = pageHero({
  crumbs: [["Home", url('home', 0)], ["Services", null]],
  title: "High-Impact Technology Solutions Designed for Modern Businesses",
  lead: "At Software Disruption – FZCO, we deliver end-to-end technology solutions that help businesses innovate faster, operate smarter, and scale with confidence. Our teams blend strategic insight with deep engineering expertise to build digital products that drive measurable growth.",
}) + `
  <section class="section services" style="padding-top:60px"><div class="container">
    <div class="services-grid stagger">
    ${servicesD.map((s) => `<article class="service-card reveal"><div class="service-icon">${s.icon}</div><h3>${s.name}</h3><p>${s.heroLead.split(".")[0]}.${s.heroLead.split(".")[1] ? "." : ""}</p><a class="link-more" href="${url(s.key, 0)}">Read More <span>&#8594;</span></a></article>`).join("")}
    </div>
  </div></section>` + ctaBand("Let's Build Something Together", "Whether you're a startup with a bold idea or an enterprise ready to modernize — we'd love to hear about your project.");

fs.mkdirSync(path.join(ROOT, "services"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "services", "index.html"), shell({
  title: "AI & Data Engineering Services in Dubai | SoftwareDisruption",
  description: "Explore our services: AI/ML, data engineering, data science, DevOps/cloud, digital transformation, Odoo ERP and more.",
  active: "services", sub: true, key: "services", body: svcBody,
}));
console.log("services.html generated");

/* ================= INDUSTRIES OVERVIEW ================= */
const indBody = pageHero({
  crumbs: [["Home", url('home', 0)], ["Industries We Serve", null]],
  title: "Technology Solutions Engineered for Your Industry — and for This Region",
  lead: "Multiple industries. One standard: built for the regulations, languages, calendars & scale of the UAE and Saudi Arabia. Generic technology fails in specific ways — we don't sell one solution with thirteen logos on it.",
}) + `
  <section class="section industries" style="padding-top:60px"><div class="container">
    <div class="industries-grid stagger">
    ${industriesD.map((d) => `<a class="ind-card reveal" href="${url("i-" + d.slug, 0)}"><span class="ind-icon">${icon(d.iconName, 22)}</span><h4>${d.name}</h4><p>${d.challenges[0]}</p></a>`).join("")}
    </div>
  </div></section>
  <section class="trust-band section"><div class="container">
    <span class="eyebrow light center">What "Built for the Region" Actually Means</span>
    <h2 class="section-title center">Four Realities Shape <span class="grad-text">Every Solution</span></h2>
    <div class="values-grid stagger">
      <article class="value-card reveal"><div class="value-icon">🏛️</div><h3>Digital Sovereignty by Design</h3><p>Health data under UAE Federal Law No. 2 of 2019. Government data under NDMO classification. The first architecture question is always: where may this data live, and can we prove it?</p></article>
      <article class="value-card reveal"><div class="value-icon">🗣️</div><h3>Arabic-First, Multilingual Always</h3><p>Arabic is the language of law, records, clinical notes, and the majority market — we build Arabic-capable search, NLP, and conversational AI as core engineering.</p></article>
      <article class="value-card reveal"><div class="value-icon">🌙</div><h3>The Regional Calendar Is a Feature</h3><p>Ramadan reshapes demand and shifts ~11 days every year. Our forecasting carries Hijri-calendar intelligence, and peak readiness is an engineering discipline.</p></article>
      <article class="value-card reveal"><div class="value-icon">🗺️</div><h3>National Programs Set the Roadmap</h3><p>Vision 2030, UAE Net Zero 2050, national AI strategies, and localisation frameworks like ICV and IKTVA define where budgets and mandates move — we align.</p></article>
    </div>
  </div></section>` + ctaBand("Find Your Industry — or Book a Free Consultation", "From complex enterprise workflows to high-impact consumer applications, we adapt our engineering capabilities to fit the unique needs of each industry.");

fs.writeFileSync(path.join(ROOT, "industries", "index.html"), shell({
  title: "Industries We Serve - Software Disruption - FZCO",
  description: "Technology solutions engineered for healthcare, logistics, retail, government, education and more across the UAE and Saudi Arabia.",
  active: "industries", sub: true, key: "industries", body: indBody,
}));
console.log("industries.html generated");

/* ================= ABOUT US ================= */
const a = pagesD.about;
fs.mkdirSync(path.join(ROOT, "about"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "about", "index.html"), shell({ title: a.title, description: a.description, active: a.active, sub: true, key: "about", body: pageHero({ sub: true, crumbs: [["Home", url("home", 1)], ["About Us", null]], title: a.heroTitle, lead: a.heroLead, cta: false }) + a.body }));
console.log("about-us.html generated");

/* ================= WHY CHOOSE US ================= */
const w = pagesD.why;
fs.mkdirSync(path.join(ROOT, "why-us"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "why-us", "index.html"), shell({ title: w.title, description: w.description, active: w.active, sub: true, key: "why", body: pageHero({ sub: true, crumbs: [["Home", url("home", 1)], ["Why Choose Us", null]], title: w.heroTitle, lead: w.heroLead, cta: false }) + w.body }));
console.log("why-choose-us.html generated");

/* ================= TESTIMONIALS ================= */
const t = pagesD.testimonials;
const tBody = pageHero({ crumbs: [['Home', url('home', 0)], ['Client Testimonials', null]], title: t.heroTitle, lead: t.heroLead, cta: false }) + `
  <section class="section testimonials" style="padding-top:50px"><div class="container">
    <div class="testi-grid" style="grid-template-columns:1fr;max-width:900px;margin:0 auto">
    ${t.items.map((x) => `<figure class="testi-card reveal"><div class="testi-stars"><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg><svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="#f5a623" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7.14 14 2 9l7.03-.91L12 2z"/></svg></div><blockquote>"${x[0]}"</blockquote>${x[1] ? `<blockquote style="margin-top:-8px">${x[1]}</blockquote>` : ""}${x[2] ? `<blockquote style="margin-top:-8px">${x[2]}</blockquote>` : ""}<figcaption><strong>${x[3]}</strong><span>${x[4]}</span></figcaption><span class="blog-cat" style="margin-top:14px;align-self:flex-start">${x[5]}</span></figure>`).join("")}
    </div>
  </div></section>` + ctaBand("Want to Become Our Next Success Story?", "Let's discuss your project — free consultation, no commitment.");
fs.mkdirSync(path.join(ROOT, "testimonials"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "testimonials", "index.html"), shell({ title: t.title, description: t.description, active: t.active, sub: true, key: "testimonials", body: tBody }));
console.log("client-testimonials.html generated");

/* ================= CONTACT US ================= */
const c = pagesD.contact;
const cBody = pageHero({
  crumbs: [["Home", url('home', 0)], ["Contact Us", null]], title: c.heroTitle, lead: c.heroLead,
  points: ["Free, No-Obligation Consultation", "Response Within 1 Business Day", "NDA Guaranteed", "100% IP Ownership"], cta: false,
}) + `
  <section class="section contact" style="padding-top:60px"><div class="container contact-wrap">
    <div class="contact-info reveal">
      <span class="eyebrow light">Tell Us About Your Project</span>
      <h2 class="section-title">Have an idea, a challenge, or a <span class="grad-text">product ready to come to life?</span></h2>
      <p class="lead">Our team is here to help — whether you're launching a startup, scaling your technology, modernizing legacy systems, or building AI-powered solutions. Here's what to expect when you reach out:</p>
      <div class="contact-rows">
        ${c.expect.map((e) => `<div class="contact-row"><span class="cr-icon">${e[0]}</span><div><h4>${e[1]}</h4><p>${e[2]}</p></div></div>`).join("")}
        <div class="contact-row"><span class="cr-icon">✉️</span><div><h4>Email</h4><a href="mailto:waqas@softwaredisruption.com">waqas@softwaredisruption.com</a></div></div>
        <div class="contact-row"><span class="cr-icon">☎️</span><div><h4>Phone</h4><a href="tel:+971557529787">+971-557529787</a> &nbsp;|&nbsp; <a href="tel:+923008299449">+92-3008299449</a></div></div>
        <div class="contact-row"><span class="cr-icon">📍</span><div><h4>Location</h4><p>IFZA Business Park, DDP, PREMISES NO: 35039-001 Dubai</p></div></div>
      </div>
      <div class="contact-banner"><div><h4>Ready to Disrupt Digitally</h4><p>Schedule your free consultation and start building smarter, scalable solutions.</p></div><a class="btn btn-orange" href="mailto:waqas@softwaredisruption.com">Book free consultation</a></div>
    </div>
    <div class="contact-form-wrap reveal">
      <form class="contact-form" id="contactForm" novalidate>
        <h3>Fill Out the Form Below</h3>
        <p style="font-size:.9rem;margin-bottom:22px">We'll get back to you within one business day.</p>
        <div class="form-row">
          <div class="form-group"><label for="name">Full Name <span>*</span></label><input type="text" id="name" name="name" placeholder="Your full name" required><small class="error-msg">Please enter your name</small></div>
          <div class="form-group"><label for="email">Email <span>*</span></label><input type="email" id="email" name="email" placeholder="name@company.com" required><small class="error-msg">Please enter a valid email</small></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label for="phone">Phone</label><input type="tel" id="phone" name="phone" placeholder="+971 5X XXX XXXX"></div>
          <div class="form-group"><label for="subject">Service Needed</label><select id="subject" name="subject"><option>AI &amp; Machine Learning</option><option>Data Engineering</option><option>Data Science</option><option>DevOps / Cloud</option><option>Digital Transformation</option><option>Resource Augmentation</option><option>Odoo ERP</option><option>Other</option></select></div>
        </div>
        <div class="form-group"><label for="message">Project Details <span>*</span></label><textarea id="message" name="message" rows="5" placeholder="Tell us about your project, goals, and timeline..." required></textarea><small class="error-msg">Please tell us about your project</small></div>
        <button type="submit" class="btn btn-primary btn-block">Send Message</button>
        <p class="form-success" id="formSuccess">Thank you! Your message has been sent. We'll get back to you within one business day.</p>
      </form>
    </div>
  </div></section>`;
fs.mkdirSync(path.join(ROOT, "contact"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "contact", "index.html"), shell({ title: c.title, description: c.description, active: c.active, sub: true, key: "contact", body: cBody }));
console.log("contact-us.html generated");

console.log("PART 2 DONE");
/* ---- Post-pass ---- */
fs.readdirSync(ROOT).filter(f => f.endsWith(".html")).forEach((f) => {
  const p = path.join(ROOT, f);
  fs.writeFileSync(p, replacer(fs.readFileSync(p, "utf8")));
});
console.log("SVG icon pass done (part 2)");
