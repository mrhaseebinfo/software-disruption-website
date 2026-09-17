/* Generates all pages. Run: node tools/build.js */
const { fs, path, ROOT, P, header, footer, shell, pageHero, ctaBand } = require("./build");
const { url, MAP } = require("./paths");
const services = require("./data-services");
services.forEach(d => { d.key = d.file.replace(".html", ""); d.file = MAP[d.key].dir + "/index.html"; });
const { replacer } = require("./replace-emojis");
const icon = require("./icons");
const industries = require("./data-industries");
industries.forEach(d => { d.slug = d.file.replace("industry-", "").replace(".html", ""); d.file = "industries/" + d.slug + "/index.html"; });
const pages = require("./data-pages");
const blog = require("./data-blog");

const crumb = (label, href) => (href ? [label, href] : null);

/* ---------- Service page builder ---------- */
function servicePage(d) {
  const u = (k) => url(k, 2);
  const challenges = `<section class="section challenges"><div class="container">
    <span class="eyebrow center">The Reality</span>
    <h2 class="section-title center">Sound <span class="grad-text">Familiar?</span></h2>
    <p class="section-sub">If your team is facing these challenges, you don't need another vendor — you need a partner who understands both the engineering and the business outcomes.</p>
    <div class="challenge-grid stagger">${d.challenges.map((c) => `<article class="challenge-card reveal"><h4>${c[0]}</h4><p>${c[1]}</p></article>`).join("")}</div>
    <div style="text-align:center;margin-top:36px"><a class="btn btn-primary btn-lg" href="${url('contact', 2)}">Let's Solve This Together</a></div>
  </div></section>`;

  const detail = `<section class="section"><div class="container">
    <span class="eyebrow center">What We Deliver</span>
    <h2 class="section-title center">End-to-End <span class="grad-text">${d.name}</span></h2>
    <p class="section-sub">Every solution is architected for performance, scalability, and long-term maintainability.</p>
    <div>${d.services.map((s) => `<article class="detail-block reveal"><div class="detail-icon">${d.icon === c0(s) ? d.icon : s[0]}</div><div><span class="best-for">${c1(s)}</span><h3>${s[1]}</h3><p>${s[2]}</p><h5>What's Included</h5><ul class="tick-list">${s[3].map((x) => `<li>${x}</li>`).join("")}</ul></div></article>`).join("")}</div>
  </div></section>`;

  const trust = `<section class="trust-band section"><div class="container">
    <span class="eyebrow light center">Why Software Disruption</span>
    <h2 class="section-title center">Your Trusted <span class="grad-text">${d.name.replace(" Services", "")} Partner</span> in UAE &amp; Beyond</h2>
    <div class="trust-grid stagger">${d.trust.map((t) => `<div class="trust-item reveal"><strong>${t[0]}</strong><span>${t[1]}</span></div>`).join("")}</div>
  </div></section>`;

  const region = d.region ? `<section class="section" style="padding-top:0"><div class="container" style="max-width:860px;text-align:center">
    <span class="eyebrow center">Serving the GCC</span>
    <h2 class="section-title">Built for <span class="grad-text">This Region</span></h2>
    <p class="lead">${d.region}</p>
    <div class="chip-row"><span class="chip">Dubai, UAE (HQ)</span><span class="chip">Abu Dhabi, UAE</span><span class="chip">Riyadh, KSA</span><span class="chip">Jeddah, KSA</span></div>
  </div></section>` : "";

  return shell({
    title: d.title, description: d.description, active: d.active, sub: true, depth: 2, key: d.key,
    body: pageHero({ sub: 2, crumbs: [['Home', url('home', 2)], ['Services', url('services', 2)], [d.name, null]], title: d.heroTitle, lead: d.heroLead, points: d.points }) + challenges + detail + trust + region + ctaBand("Ready to Get Started?", "Tell us about your project — we'll show you how we can help. Free consultation, no commitment, response within one business day.", "Book free consultation", 2),
  });
}
const c0 = (s) => s[0];
const c1 = (s) => "";
/* best-for badge text: hide empty */

/* ---------- Industry page builder ---------- */
const ICON_NAME = {
  "💼": "briefcase", "🆘": "life-buoy", "⚡": "zap", "🏛️": "building", "🏥": "hospital",
  "🎓": "graduation", "🏨": "building", "🚛": "truck", "🐄": "cow", "🏭": "factory",
  "🏗️": "building", "🛒": "cart", "📡": "tv",
};
function industryPage(d) {
  const u = (k) => url(k, 2);
  d.iconName = ICON_NAME[d.icon] || "activity";
  const body = pageHero({
    sub: 2, crumbs: [['Home', url('home', 2)], ['Industries We Serve', url('industries', 2)], [d.name, null]],
    title: d.heroTitle, lead: d.heroLead, points: [], cta: false,
    }) + `
  <section class="section"><div class="container split-cols">
    <div class="split-text reveal">
      <span class="eyebrow">Industry Overview</span>
      <h2 class="section-title">Technology Engineered for <span class="grad-text">${d.name.replace(" Industry", "").replace(" and ", " & ")}</span></h2>
      <p>${d.intro}</p>
      <a class="btn btn-primary" href="${url('contact', 2)}" style="margin-top:10px">Book a Free Consultation</a>
    </div>
    <div class="split-img reveal"><div class="ph-grad ph-tall" style="display:grid;place-items:center">
      <div class="ind-hero-badge">${icon(d.iconName, 96)}</div>
      <div class="ph-caption">${d.name}</div></div></div>
  </div></section>
  <section class="section challenges"><div class="container">
    <span class="eyebrow center">Common Challenges</span>
    <h2 class="section-title center">What's Holding <span class="grad-text">Teams Back</span></h2>
    <div class="challenge-grid stagger">${d.challenges.map((c) => `<article class="challenge-card reveal"><h4>${c}</h4></article>`).join("")}</div>
  </div></section>
  <section class="section industries"><div class="container">
    <span class="eyebrow center">What We Build</span>
    <h2 class="section-title center">Solutions We <span class="grad-text">Deliver</span></h2>
    <div class="sol-grid stagger">${d.solutions.map((s) => `<article class="sol-card reveal"><div class="service-icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join("")}</div>
    <div class="chip-row">${d.chips.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
  </div></section>
  ${ctaBand("Ready to Modernize " + d.name + "?", "Book a free consultation — we'll map your requirements and show you exactly how we'd approach them.", "Book free consultation", 2)}`;
  return shell({ title: d.name + " | SoftwareDisruption Dubai", description: d.heroLead, active: "i-" + d.name, sub: true, depth: 2, key: "i-" + d.slug, body });
}

/* ---------- Misc simple pages ---------- */
function faqPage(d) {
  const body = pageHero({ crumbs: [["Home", url('home', 1)], ["FAQs", null]], sub: true, title: d.heroTitle, lead: d.heroLead, cta: false }) + `
  <section class="section"><div class="container">
    <div class="faq-list">${d.faqs.map((f) => `<div class="faq-item"><button class="faq-q" type="button">${f[0]}<span class="faq-icon">+</span></button><div class="faq-a"><div class="faq-a-inner">${f[1]}</div></div></div>`).join("")}</div>
    <div style="text-align:center;margin-top:44px"><p style="margin-bottom:18px">Still have questions?</p><a class="btn btn-primary btn-lg" href="${url('contact', 1)}">Contact Us</a></div>
  </div></section>`;
  return shell({ title: d.title, description: d.description, active: d.active, sub: true, body });
}

function careersPage(d) {
  const body = pageHero({ crumbs: [["Home", url('home', 1)], ["Careers", null]], sub: true, title: d.heroTitle, lead: d.heroLead, cta: false }) + `
  <section class="section industries"><div class="container" style="max-width:860px">
    <span class="eyebrow center">Open Roles</span>
    <h2 class="section-title center">Current <span class="grad-text">Openings</span></h2>
    <div style="display:grid;gap:16px;margin-top:40px">${d.jobs.map((j) => `<div class="job-row reveal"><div><h3>${j[0]}</h3><div class="job-tags">${j[2].map((t) => `<span>${t}</span>`).join("")}</div></div><div style="display:flex;gap:10px;align-items:center"><span style="font-size:.85rem;color:var(--muted)">${j[1]}</span><a class="btn btn-primary" href="mailto:waqas@softwaredisruption.com?subject=Application: ${j[0]}">Apply</a></div></div>`).join("")}</div>
    <p style="text-align:center;margin-top:36px;font-size:.95rem">Don't see your role? We're always open to exceptional people — <a href="mailto:waqas@softwaredisruption.com">send us your profile</a>.</p>
  </div></section>`;
  return shell({ title: d.title, description: d.description, active: d.active, sub: true, body });
}

function casePage(d) {
  const body = pageHero({ crumbs: [["Home", url('home', 1)], ["Case Studies", null]], sub: true, title: d.heroTitle, lead: d.heroLead, cta: false }) + `
  <section class="section values"><div class="container">
    <div class="values-grid">${d.studies.map((s) => `<article class="value-card reveal"><div class="value-icon">${s[0]}</div><h3>${s[1]}</h3><p style="font-size:.8rem;color:var(--accent);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px">${s[2]}</p><p>${s[3]}</p><div class="chip-row" style="justify-content:flex-start;margin-top:16px">${s[4].map((c) => `<span class="chip" style="padding:5px 13px;font-size:12px">${c}</span>`).join("")}</div></article>`).join("")}</div>
  </div></section>` + ctaBand("Want Results Like These?", "Every engagement starts with a conversation about your goals. Book a free consultation.");
  return shell({ title: d.title, description: d.description, active: d.active, sub: true, body });
}

function howWeWorkPage(d) {
  const body = pageHero({ crumbs: [["Home", url('home', 1)], ["How We Work", null]], sub: true, title: d.heroTitle, lead: d.heroLead, cta: false }) + `
  <section class="section process"><div class="container">
    <span class="eyebrow center">Our Delivery Model</span>
    <h2 class="section-title center">From Idea to <span class="grad-text">Impact</span></h2>
    <div class="steps">${d.steps.map((s) => `<div class="step reveal"><div class="step-day">${s[0]}</div><div class="step-body"><h3>${s[1]}</h3><p>${s[2]}</p></div></div>`).join("")}</div>
  </div></section>
  <section class="section values"><div class="container">
    <span class="eyebrow center">Working Principles</span>
    <h2 class="section-title center">How We <span class="grad-text">Operate</span></h2>
    <div class="values-grid">${d.principles.map((p) => `<article class="value-card reveal"><div class="value-icon">${p[0]}</div><h3>${p[1]}</h3><p>${p[2]}</p></article>`).join("")}</div>
  </div></section>` + ctaBand("Ready to Work With Us?", "Schedule your free consultation and start building smarter, scalable solutions.");
  return shell({ title: d.title, description: d.description, active: d.active, sub: true, body });
}

function legalPage(d) {
  const body = pageHero({ crumbs: [["Home", url('home', 1)], [d.heroTitle, null]], sub: true, title: d.heroTitle, lead: d.heroLead, cta: false }) + `
  <section class="section"><div class="container legal-body">
    <p class="legal-updated">${d.updated}</p>
    ${d.sections.map((s) => `<h2>${s[0]}</h2>${Array.isArray(s[1]) ? `<ul>${s[1].map((li) => `<li>${li}</li>`).join("")}</ul>` : `<p>${s[1]}</p>`}`).join("")}
  </div></section>`;
  return shell({ title: d.title, description: d.description, active: d.active, sub: true, body });
}

function blogPostPage(d, key) {
  const body = `<section class="article-hero"><div class="container">
    <nav class="breadcrumb"><a href="${url('home', 2)}">Home</a><span class="sep">&#8250;</span><a href="${url('blog', 2)}">Blog</a></nav>
    <span class="article-tag">${d.cat}</span>
    <h1>${d.title}</h1>
    <div class="article-meta"><span>by <strong>${d.author}</strong></span><span>${d.date}</span></div>
  </div></section>
  <div class="article-body">${d.body}</div>
  <div class="post-nav">
    <a href="${url('blog', 2)}"><span>&#8592; Back to</span><strong>All Articles</strong></a>
    <a class="next" href="${url('contact', 2)}"><span>Ready to build?</span><strong>Get a Free Consultation &#8594;</strong></a>
  </div>` + ctaBand("Ready to Disrupt Digitally", "Schedule your free consultation and start building smarter, scalable solutions.");
  return shell({ title: d.title, description: d.description, active: d.active, sub: true, depth: 2, key: key, body });
}

/* ---------- Write all pages ---------- */
const files = [];

/* Service pages */
services.forEach((d) => {
  fs.mkdirSync(path.join(ROOT, MAP[d.key].dir), { recursive: true });
  fs.writeFileSync(path.join(ROOT, d.file), servicePage(d)); files.push(d.file);
});

/* Industry pages */
industries.forEach((d) => {
  fs.mkdirSync(path.join(ROOT, "industries", d.slug), { recursive: true });
  fs.writeFileSync(path.join(ROOT, d.file), industryPage(d)); files.push(d.file);
});

/* Simple pages → folder/index.html */
fs.mkdirSync(path.join(ROOT, "faq"), { recursive: true });
fs.mkdirSync(path.join(ROOT, "careers"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "faq", "index.html"), faqPage(pages.faq)); files.push("faq/index.html");
fs.writeFileSync(path.join(ROOT, "careers", "index.html"), careersPage(pages.careers)); files.push("careers/index.html");
fs.mkdirSync(path.join(ROOT, "case-studies"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "case-studies", "index.html"), casePage(pages.caseStudies)); files.push("case-studies/index.html");
fs.mkdirSync(path.join(ROOT, "how-we-work"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "how-we-work", "index.html"), howWeWorkPage(pages.howWeWork)); files.push("how-we-work/index.html");
fs.mkdirSync(path.join(ROOT, "team"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "team", "index.html"), shell({ title: pages.team.title, description: pages.team.description, active: pages.team.active, sub: true, key: "team", body: pageHero({ sub: true, crumbs: [["Home", url("home", 1)], ["Our Team", null]], title: pages.team.heroTitle, lead: pages.team.heroLead, cta: false }) + pages.team.body }));
files.push("team/index.html");
[["privacy", pages.privacy], ["terms", pages.terms]].forEach(([dir, d]) => {
  fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
  fs.writeFileSync(path.join(ROOT, dir, "index.html"), legalPage(d));
  files.push(dir + "/index.html");
});

/* Blog listing */
const blogListBody = pageHero({ crumbs: [["Home", url("home", 0)], ["Blog", null]], title: blog.listing.heroTitle, lead: blog.listing.heroLead, cta: false }) + `
  <section class="section blogs" style="padding-top:40px"><div class="container">
    <div class="blog-grid">${blog.listing.posts.map((p) => `<article class="blog-card reveal">
      <a class="blog-thumb" href="${p.url}"><img src="${p.img}" alt="${p.title}" loading="lazy"><span>${p.cat}</span></a>
      <div class="blog-body">
        <span class="blog-cat">${p.cat}</span>
        <h3><a href="${p.url}">${p.title}</a></h3>
        <p class="blog-meta">by <strong>${p.author}</strong> &middot; ${p.date}</p>
        <p>${p.excerpt}</p>
        <a class="link-more" href="${p.url}">Read More <span>&#8594;</span></a>
      </div></article>`).join("")}
    </div>
  </div></section>`;
fs.mkdirSync(path.join(ROOT, "blog"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "blog", "index.html"), shell({ title: blog.listing.title, description: blog.listing.description, active: blog.listing.active, sub: true, key: "blog", body: blogListBody }));
files.push(blog.listing.file);

/* Blog posts */
blog.posts.forEach((p, i) => {
  const next = blog.posts[i + 1];
  const slug = p.file.replace(".html", "").replace("blog-", "");
  const dir = path.join(ROOT, "blog", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), blogPostPage({ ...p, active: "blog", body: p.body }, "blog-" + slug));
  files.push("blog/" + slug + "/index.html");
});

console.log("Generated", files.length, "pages:", files.join(", "));
/* ---- Post-pass: replace emoji icons with professional SVGs in all generated pages ---- */
const filesPP = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));
filesPP.forEach((f) => {
  const p = path.join(ROOT, f);
  fs.writeFileSync(p, replacer(fs.readFileSync(p, "utf8")));
});
console.log("SVG icon replacement pass complete over", filesPP.length, "pages");
