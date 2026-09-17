/* Blog listing + 3 post articles (condensed from softwaredisruption.com/blog) */
module.exports = {
  listing: {
    file: "blog/index.html",
    active: "blog",
    title: "Blog | SoftwareDisruption Dubai",
    description: "Insights on software engineering, AI, data platforms, and technology regulation in the GCC — from the Software Disruption team.",
    heroTitle: "Insights & Resources",
    heroLead: "Practical writing on software engineering, AI, data platforms, and the technology regulation shaping the GCC — from engineers who ship.",
    posts: [
      {
        url: "blog/e-invoicing-penalties-saudi-arabia/index.html",
        img: "assets/img/blog-einvoicing.jpg",
        cat: "Software Development",
        title: "E-Invoicing Penalties in Saudi Arabia: What ZATCA Non-Compliance Actually Costs You",
        author: "Waqas Azam",
        date: "September 14, 2026",
        excerpt: "A production certificate expires on a Thursday afternoon. Nobody notices, because the billing system carries on exactly as before. PDFs still print. QR codes still render...",
      },
      {
        url: "blog/it-staff-augmentation-saudi-arabia/index.html",
        img: "assets/img/blog-staffing.jpg",
        cat: "Software Development",
        title: "IT Staff Augmentation in Saudi Arabia: The Real Cost of Hiring In-House vs. an Augmented Team",
        author: "Waqas Azam",
        date: "September 2, 2026",
        excerpt: "A finance lead in Riyadh signs off a headcount request. Backend engineer, twenty thousand riyals a month, booked at two hundred and forty thousand for the year...",
      },
      {
        url: "blog/rust-vs-cpp/index.html",
        img: "assets/img/blog-rust.jpg",
        cat: "Software Development",
        title: "Rust vs C++: Performance, Memory Management and Safety",
        author: "Waqas Azam",
        date: "August 15, 2026",
        excerpt: "A deadline passed on January 1 this year, and most teams never noticed. CISA and the FBI had named that date for manufacturers shipping memory-unsafe code...",
      },
    ],
  },
  posts: [
    {
      file: "blog-e-invoicing-penalties-saudi-arabia.html",
      active: "blog",
      title: "E-Invoicing Penalties in Saudi Arabia: What ZATCA Non-Compliance Actually Costs You",
      description: "What ZATCA non-compliance actually costs — Article 45 fines, clearance failures, and the December 2026 amnesty window explained.",
      img: "assets/img/blog-einvoicing.jpg",
      cat: "Software Development",
      author: "Waqas Azam",
      date: "September 14, 2026",
      body: `
      <p>A production certificate expires on a Thursday afternoon. Nobody notices, because the billing system carries on exactly as before. PDFs still print. QR codes still render. Sales keeps selling.</p>
      <p>What stopped is clearance. Every standard invoice that should have gone to Fatoora for approval before reaching the buyer is sitting in a queue nobody watches, and none of those documents is legally a tax invoice.</p>
      <p>That's the shape of most Fatoora problems we get called into. Not defiance, not a decision to ignore anything. A certificate, a firewall change, an ERP upgrade that quietly broke the signing step. The fine is rarely the expensive part of it.</p>
      <h2>ZATCA dropped Article 45 fines from the amnesty on 30 June 2026</h2>
      <p>On 29 June 2026 the Zakat, Tax and Customs Authority announced that the Minister of Finance had extended the Cancellation of Fines and Exemption of Financial Penalties Initiative for another six months, running to 31 December 2026. Most finance teams read the headline, saw the date, and moved on.</p>
      <p>The announcement lists what's covered. Late registration across all tax laws, late payment, late filing of returns, and VAT return correction fines. Then it lists exclusions. Tax evasion penalties, fines already paid before the initiative took effect, penalties tied to any return falling due after 30 June 2026, and fines imposed under Article 45 of the VAT Law.</p>
      <blockquote>Article 45 is the clause e-invoicing field violations are assessed under.</blockquote>
      <p>Set that against how the same initiative was described in earlier rounds. KPMG's alerts on both the 2023 and the 2024 extensions listed VAT field detections and e-invoicing regulation violations among the covered categories, explicitly. Previous versions of ZATCA's own simplified guideline named e-invoicing under Article 45 as included.</p>
      <p>So the language moved. Whether that's a deliberate narrowing or a drafting difference, we honestly can't tell you from the public text alone. What we can tell you is that an assumption formed in 2024 is a bad thing to bet exposure on. If you're carrying unresolved Fatoora violations and you were planning to clear them under the waiver, call 19993 and get it confirmed in writing before December.</p>
      <h2>What actually breaks, and what it costs</h2>
      <p>From our work with businesses integrating ZATCA Phase 2, the recurring failure patterns are:</p>
      <ul>
        <li><strong>Certificate expiry.</strong> Production CSIDs renew annually. Nobody owns the renewal calendar, and clearance fails silently.</li>
        <li><strong>ERP upgrades that break signing.</strong> An upgrade rebuilds an integration layer, and the cryptographic stamp quietly fails validation.</li>
        <li><strong>Queue failures nobody watches.</strong> Clearance is asynchronous. If no one monitors the Fatoora response queue, rejected invoices pile up as legally void documents.</li>
        <li><strong>Simpler-invoice volume assumptions.</strong> Teams assume simplified invoices don't need clearance — until ZATCA's reporting window rules catch them out.</li>
      </ul>
      <p>The direct fines under Article 45 scale with violation count — SAR 5,000–50,000 per violation category — but the indirect costs are usually larger: invoices that aren't legally tax invoices, input VAT recovery complications, and audit exposure that compounds every month the queue stays broken.</p>
      <h2>One more line worth reading properly</h2>
      <p>Even if the initiative gets extended past December, it will not reach back to cover fines on any return that fell due after 30 June 2026. That door is shut regardless of what happens next.</p>
      <h2>What we'd do this week</h2>
      <ul>
        <li>Check the expiry date on your production CSID certificate. Put a named owner and a 60-day renewal reminder on it.</li>
        <li>Reconcile Fatoora's response queue against your invoice register for the last 90 days. Anything uncleared is not a tax invoice.</li>
        <li>If you have unresolved Article 45 violations, confirm in writing (19993) whether they're covered by the current initiative — before 31 December 2026.</li>
        <li>If your ERP upgrade is scheduled, schedule the e-invoicing regression test in the same window.</li>
      </ul>
      <p>ZATCA integration is an engineering problem with regulatory consequences. We build and maintain ZATCA Phase 2 integrations — monitoring, signing, and clearance queues — as part of our Odoo and custom ERP work across KSA. If your queue has been quiet for a while, it might be worth a conversation.</p>`,
      prev: null,
    },
    {
      file: "blog-it-staff-augmentation-saudi-arabia.html",
      active: "blog",
      title: "IT Staff Augmentation in Saudi Arabia: The Real Cost of Hiring In-House vs. an Augmented Team",
      description: "The real cost of hiring in-house vs an augmented engineering team in Saudi Arabia — GOSI, levies, iqama, end of service and more.",
      img: "assets/img/blog-staffing.jpg",
      cat: "Software Development",
      author: "Waqas Azam",
      date: "September 2, 2026",
      body: `
      <p>A finance lead in Riyadh signs off a headcount request. Backend engineer, twenty thousand riyals a month, booked at two hundred and forty thousand for the year. Clean number. Easy to defend in a board pack.</p>
      <p>Then the year runs. GOSI starts filing, the levy invoices land through SADAD, iqama renewal falls due, and the auditor wants an end of service provision sitting on the balance sheet. The actual line comes in somewhere past two hundred and sixty thousand, and none of that was in the original request.</p>
      <p>We have this conversation in most of our KSA scoping calls. The offer letter number gets treated as the cost of the engineer. It isn't, and the gap is wide enough to change which staffing model actually makes sense for you.</p>
      <h2>The offer letter misses at least five recurring employer lines</h2>
      <p>Take a non-Saudi engineer on twenty thousand riyals a month. Say the Qiwa-registered contract splits as basic twelve thousand five hundred, housing five thousand, other allowances two thousand five hundred. Fairly standard shape for a tech role.</p>
      <ul>
        <li><strong>GOSI occupational hazards</strong> — 2% of basic plus housing, employer pays all of it. Around SAR 350/month on this package.</li>
        <li><strong>The work permit levy</strong> — SAR 700 or 800 per month depending on your headcount ratio of Saudi to expat employees.</li>
        <li><strong>Iqama renewal</strong> — commonly SAR 650 a year for private sector employees, plus medical insurance that keeps getting cheaper on paper and slower in practice.</li>
        <li><strong>Work permit licence fee</strong> — SAR 100 a year.</li>
        <li><strong>End of service accrual</strong> — Article 84 of the Labour Law sets half a month's wage for each of the first five years, calculated on the last wage including fixed allowances. On this package you should be provisioning roughly SAR 833 a month.</li>
      </ul>
      <blockquote>That's north of SAR 2,000 a month in recurring employer lines that never appeared in the headcount request — roughly 10–12% on top of the salary, before a single line of code gets written.</blockquote>
      <h2>Then there's the time cost</h2>
      <p>Six to ten weeks is realistic for a good technical hire in the current Riyadh market: search, screening, negotiation, offer, notice period, onboarding. And the risk isn't symmetric — a wrong senior hire costs two quarters of momentum plus a severance conversation. Meanwhile the roadmap the engineer was hired to deliver slips month by month.</p>
      <h2>What augmentation changes</h2>
      <ul>
        <li><strong>Speed.</strong> Pre-vetted engineers integrated in days, not months — we average 5–10 business days to first placement.</li>
        <li><strong>Flexibility.</strong> Scale up for a launch, scale down after a migration. You're paying for capability, not headcount.</li>
        <li><strong>No employer overhead.</strong> The GOSI, levy, iqama, EOSB and recruitment lines don't exist in the model.</li>
        <li><strong>Fewer wrong hires.</strong> Professionals we've already assessed for technical depth, communication, and delivery track record.</li>
      </ul>
      <h2>When in-house still wins</h2>
      <p>We say this to clients too: if you need permanent, core-domain capability for years — your core product team, your platform leadership — build it in-house. Augmentation works best for capacity, specialisations you need temporarily (a cloud migration, an ML push), and speed. Most mature organisations do both: a stable core, plus an elastic outer ring.</p>
      <h2>The honest math</h2>
      <p>Compare the fully loaded in-house cost — salary plus the five employer lines plus recruitment effort plus time-to-productivity — against an augmented senior engineer at a predictable monthly rate, deliverable in days. For most Saudi businesses at growth stage, the augmented line wins on both cost and speed until the role becomes truly permanent. When it does, we'll tell you that too — that's the conversation a technology partner, not a body shop, has.</p>`,
    },
    {
      file: "blog-rust-vs-cpp.html",
      active: "blog",
      title: "Rust vs C++: Performance, Memory Management and Safety",
      description: "Rust vs C++ — what changed after CISA's memory-safety deadline, honest performance analysis, and when each language wins.",
      img: "assets/img/blog-rust.jpg",
      cat: "Software Development",
      author: "Waqas Azam",
      date: "August 15, 2026",
      body: `
      <p>A deadline passed on January 1 this year, and most teams never noticed. CISA and the FBI had named that date for manufacturers shipping memory-unsafe code into critical infrastructure to publish a memory safety roadmap.</p>
      <p>Nobody gets fined. It still changed the Rust vs C++ debate after more than ten years of benchmark threads. We've watched this question move from conference slides into procurement checklists. Our team at Software Disruption builds data platforms and backend systems across the UAE and Saudi Arabia, so those checklists land on our desk.</p>
      <h2>Rust vs C++ Performance: Is There a Real Winner?</h2>
      <p>On raw speed, the honest answer we give clients is a near tie. Both compile to native machine code, and Rust's main compiler sits on LLVM — the same backend Clang uses for C++ — so much of the optimizer is shared.</p>
      <h3>1. Rust's ownership model enables some unique optimizations</h3>
      <p>Ownership guarantees that mutable references never alias, allowing optimizations a C++ compiler cannot legally make. In tight, self-contained code this occasionally gives Rust the edge.</p>
      <h3>2. Bounds checks cost Rust a little</h3>
      <p>The optimizer removes most of them, but a careless hot loop can pay a few percent. C++ pays nothing because it checks nothing — which is the whole safety story below.</p>
      <h3>3. Library maturity still favours C++</h3>
      <p>Eigen, CUDA, and decades of tuned game engine code. Rust equivalents are younger. If your workload leans on those ecosystems, the performance question answers itself.</p>
      <blockquote>The real performance difference is not in the benchmark — it's in how much engineering time it takes to reach safe, fast, maintainable production code in each language.</blockquote>
      <h2>Memory Management: Two Philosophies</h2>
      <p>C++ puts memory management in the programmer's hands with smart pointers, RAII, and a long checklist of ways to get it wrong — use-after-free, data races, iterator invalidation. Rust's compiler enforces the rules at build time: ownership, borrowing, and lifetimes make the large classes of memory bugs compile-time errors instead of production incidents.</p>
      <h2>Safety: The Part That Changed the Debate</h2>
      <p>Roughly 70% of serious security vulnerabilities tracked by major vendors over the years trace back to memory safety. That statistic — and CISA's memory-safe-languages push — is why the conversation changed. Memory safety is now a procurement checkbox, not an academic preference.</p>
      <h2>What We Tell Clients</h2>
      <ul>
        <li><strong>Greenfield backend / data platforms:</strong> Rust is increasingly our default — modern tooling, memory safety, and excellent async performance.</li>
        <li><strong>Heavy numeric / existing C++ ecosystems:</strong> C++ remains the pragmatic answer; wrap it, don't rewrite it.</li>
        <li><strong>Critical infrastructure:</strong> the memory-safety roadmap is arriving whether through regulators or insurers — plan the roadmap now.</li>
        <li><strong>Team reality:</strong> Rust has a real learning curve. Budget for it. C++ expertise is more abundant — but so is C++ legacy pain.</li>
      </ul>
      <p>Language choice is an architectural decision, not a fashion decision. Make it deliberately — with your workload, your team, and your ten-year horizon on the table.</p>`,
    },
  ],
};