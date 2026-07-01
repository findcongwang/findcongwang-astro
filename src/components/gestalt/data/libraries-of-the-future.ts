import type { DualTrackPresentation } from "../types-v2";

/**
 * Libraries of the Future — Publisher Pitch Deck
 *
 * Editorial layout recommendations applied 2026-07-01.
 * Placeholder specs exist for: CVI radar chart, Resonance Wheel chord diagram,
 * Paged.js print sample screenshot, CV first page screenshot.
 */

export const librariesOfTheFutureData: DualTrackPresentation = {
  title: "Libraries of the Future",
  subtitle: "Hybrid Intelligence and Knowledge Integration in the Post-Agentic World",
  author: "Francis Wang",
  date: "2026-07",
  duration: 20,

  slides: [
    // ─── MAIN SLIDES ────────────────────────────────────────────────
    {
      id: "slide-title",
      title: "Title",
      type: "title",
      section: "Opening",
      layout: "title-anchored",
      intent: "Establish the book's identity and position the presentation as a publisher pitch. The subtitle signals academic rigour; 'Book Proposal' signals this is a business conversation.",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center">
          <h1 style="font-size:3.5rem;line-height:1.1;">Libraries of the Future</h1>
          <p class="gestalt-slide__subtitle" style="margin-top:1rem;font-size:1.15rem;opacity:0.6;max-width:28rem;">Hybrid Intelligence and Knowledge Integration in the Post-Agentic World</p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.85rem;">Francis (Cong) Wang</div>
          <div style="font-size:0.75rem;opacity:0.5;">The Future of Knowledge series</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.85rem;font-weight:600;">Book Proposal</div>
          <div style="font-size:0.75rem;opacity:0.5;">2026</div>
        </div>
      </div>`,
    },
    {
      id: "slide-hook",
      title: "The Hook",
      type: "content",
      section: "Problem",
      intent: "Create emotional and intellectual urgency. The audience should feel the problem is real, empirically validated, and personally relevant. Three domain-agnostic evidence cards prove this is not speculation.",
      html: `<h2 style="font-size:1.75rem;margin-bottom:1.25rem;">We Are Doing More and Thinking Less</h2>
        <p style="font-size:1rem;line-height:1.7;margin-bottom:2.5rem;max-width:36rem;">We are becoming <strong>third-party thinkers</strong> relying on <strong>second-hand thoughts</strong>. The cognitive capacities that make output meaningful quietly erode beneath the surface.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;">
          <div style="padding:1.5rem;border-radius:0.75rem;background:rgba(239,68,68,0.03);border:1px solid rgba(239,68,68,0.12);">
            <p style="font-weight:700;margin-bottom:0.75rem;color:#ef4444;font-size:0.9rem;">Aviation</p>
            <p style="font-size:0.85rem;line-height:1.65;opacity:0.8;">Manual flying skills degrade measurably after 6 months of automation reliance. Loss of Control incidents follow when automation fails.</p>
            <p style="font-size:0.65rem;margin-top:1rem;opacity:0.4;font-family:var(--gestalt-font-mono);">Leonidov (2025); Smith & Baumann (2020)</p>
          </div>
          <div style="padding:1.5rem;border-radius:0.75rem;background:rgba(14,165,233,0.03);border:1px solid rgba(14,165,233,0.12);">
            <p style="font-weight:700;margin-bottom:0.75rem;color:#0ea5e9;font-size:0.9rem;">Medicine</p>
            <p style="font-size:0.85rem;line-height:1.65;opacity:0.8;">AI diagnostic reliance produces measurable deskilling in clinical reasoning. Accuracy declines after sustained AI-assisted practice.</p>
            <p style="font-size:0.65rem;margin-top:1rem;opacity:0.4;font-family:var(--gestalt-font-mono);">Sunday (2025); Oettl et al. (2026)</p>
          </div>
          <div style="padding:1.5rem;border-radius:0.75rem;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.12);">
            <p style="font-weight:700;margin-bottom:0.75rem;color:#10b981;font-size:0.9rem;">Education</p>
            <p style="font-size:0.85rem;line-height:1.65;opacity:0.8;">Cognitive offloading replaces productive struggle. Short-term gains mask long-term degradation of higher-order thinking.</p>
            <p style="font-size:0.65rem;margin-top:1rem;opacity:0.4;font-family:var(--gestalt-font-mono);">Chase & Galvin (2026); Alubthane (2026)</p>
          </div>
        </div>
        <p style="margin-top:2rem;font-size:0.85rem;opacity:0.5;font-style:italic;">The pattern is domain-agnostic. The problem is not too much information but too little thinking.</p>`,
    },
    {
      id: "slide-why-now",
      title: "Why Now",
      type: "content",
      section: "Problem",
      intent: "Establish market timing. The publisher must believe this is the right moment: research exists, no framework book on the market, practitioners asking for solutions.",
      html: `<h2 style="font-size:1.75rem;margin-bottom:2rem;">Why This Book, Why Now</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;">
          <div>
            <p style="font-weight:700;margin-bottom:1.25rem;font-size:0.95rem;">The Research Explosion</p>
            <div style="font-size:0.88rem;line-height:2.4;border-left:2px solid rgba(0,0,0,0.06);padding-left:1.25rem;">
              <p><strong style="opacity:0.4;font-family:var(--gestalt-font-mono);font-size:0.75rem;">2022</strong> &nbsp;ChatGPT launches. Cognitive offloading goes mainstream.</p>
              <p><strong style="opacity:0.4;font-family:var(--gestalt-font-mono);font-size:0.75rem;">2024</strong> &nbsp;First validated AI dependence scale (AIDep-22)</p>
              <p><strong style="opacity:0.4;font-family:var(--gestalt-font-mono);font-size:0.75rem;">2025</strong> &nbsp;FAA automation skill degradation research published</p>
              <p><strong style="opacity:0.4;font-family:var(--gestalt-font-mono);font-size:0.75rem;">2026</strong> &nbsp;Cognitive agency surrender quantified. 89-paper systematic review confirms degradation.</p>
            </div>
          </div>
          <div>
            <p style="font-weight:700;margin-bottom:1.25rem;font-size:0.95rem;">The Market Window</p>
            <ul style="font-size:0.88rem;line-height:2.2;list-style:none;padding:0;">
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);">Validated instruments exist. No framework book synthesises them.</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);margin-top:0.75rem;">Practitioners asking "how do we design around this?" find no answer.</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);margin-top:0.75rem;">12\u201318 month window before the market fragments.</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);margin-top:0.75rem;">CRC Press has no book at this intersection.</li>
            </ul>
          </div>
        </div>`,
    },
    {
      id: "slide-gap",
      title: "The Gap",
      type: "content",
      section: "Positioning",
      intent: "Demonstrate competitive differentiation visually. The publisher immediately sees no existing book occupies this intersection.",
      html: `<h2 style="font-size:1.75rem;margin-bottom:1.75rem;">No Existing Book Combines All Three</h2>
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
          <thead>
            <tr style="border-bottom:2px solid rgba(0,0,0,0.08);">
              <th style="padding:0.75rem 1rem;text-align:left;font-weight:600;">Book</th>
              <th style="padding:0.75rem 1rem;text-align:center;font-weight:600;width:7rem;">Architecture</th>
              <th style="padding:0.75rem 1rem;text-align:center;font-weight:600;width:7rem;">Measurement</th>
              <th style="padding:0.75rem 1rem;text-align:center;font-weight:600;width:7rem;">Futures</th>
            </tr>
          </thead>
          <tbody style="line-height:2.4;">
            <tr style="border-bottom:1px solid rgba(0,0,0,0.04);"><td style="padding:0.5rem 1rem;">Mollick, <em>Co-Intelligence</em> (2024)</td><td style="text-align:center;opacity:0.2;">\u2014</td><td style="text-align:center;opacity:0.2;">\u2014</td><td style="text-align:center;opacity:0.5;">partial</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.04);"><td style="padding:0.5rem 1rem;">Suleyman, <em>The Coming Wave</em> (2023)</td><td style="text-align:center;opacity:0.2;">\u2014</td><td style="text-align:center;opacity:0.2;">\u2014</td><td style="text-align:center;color:#10b981;">\u2713</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.04);"><td style="padding:0.5rem 1rem;">Forte, <em>Building a Second Brain</em> (2022)</td><td style="text-align:center;opacity:0.5;">partial</td><td style="text-align:center;opacity:0.2;">\u2014</td><td style="text-align:center;opacity:0.2;">\u2014</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.04);"><td style="padding:0.5rem 1rem;">Agrawal et al., <em>Prediction Machines</em> (2022)</td><td style="text-align:center;opacity:0.2;">\u2014</td><td style="text-align:center;opacity:0.5;">partial</td><td style="text-align:center;opacity:0.2;">\u2014</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.04);"><td style="padding:0.5rem 1rem;">CRC Press, <em>Industry 6.0</em> (2024)</td><td style="text-align:center;opacity:0.5;">partial</td><td style="text-align:center;opacity:0.2;">\u2014</td><td style="text-align:center;opacity:0.5;">partial</td></tr>
            <tr style="background:rgba(99,102,241,0.04);border-radius:0.25rem;"><td style="padding:0.75rem 1rem;font-weight:700;">Libraries of the Future (2026)</td><td style="text-align:center;color:#10b981;font-weight:700;font-size:1.1rem;">\u2713</td><td style="text-align:center;color:#10b981;font-weight:700;font-size:1.1rem;">\u2713</td><td style="text-align:center;color:#10b981;font-weight:700;font-size:1.1rem;">\u2713</td></tr>
          </tbody>
        </table>
        <p style="margin-top:2rem;font-size:0.8rem;opacity:0.45;">First book combining a named knowledge architecture + measurement instrument + futures lens + annotation-rich meta-demonstrative format.</p>`,
    },
    {
      id: "slide-perceptiosphere",
      title: "The Perceptiosphere",
      type: "content",
      section: "Frameworks",
      intent: "Framework 1 with visual dominance. The concentric diagram occupies majority of attention. The audience grasps nested boundaries spatially before reading text.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:0.5rem;">The Perceptiosphere\u2122</h2>
        <p style="font-size:0.88rem;margin-bottom:2rem;opacity:0.7;">A nested architecture of sovereign knowledge zones.</p>
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:2.5rem;align-items:start;">
          <div style="display:flex;align-items:center;justify-content:center;">
            <div style="width:100%;aspect-ratio:1;max-width:22rem;background:rgba(99,102,241,0.02);border:1.5px dashed rgba(99,102,241,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(99,102,241,0.4);font-size:0.7rem;text-align:center;padding:2rem;">
              [INTERACTIVE PERCEPTIOSPHERE]<br/>Nested concentric zones:<br/>Self \u2192 Trusted Circle \u2192<br/>Community of Practice \u2192 Public
            </div>
          </div>
          <div>
            <p style="font-weight:700;margin-bottom:1rem;font-size:0.88rem;">Four Properties</p>
            <div style="font-size:0.85rem;line-height:1.7;">
              <p style="margin-bottom:1rem;"><strong>Knowledge sovereignty</strong><br/><span style="opacity:0.6;font-size:0.78rem;">Individuals and organisations retain ownership and governance over the knowledge context they produce, independent of any platform or tool.</span></p>
              <p style="margin-bottom:1rem;"><strong>Contextual integrity</strong><br/><span style="opacity:0.6;font-size:0.78rem;">When knowledge crosses a boundary, the relationships that make it meaningful are preserved rather than stripped into decontextualised data points.</span></p>
              <p style="margin-bottom:1rem;"><strong>Composable collaboration</strong><br/><span style="opacity:0.6;font-size:0.78rem;">Knowledge from different sovereign sources can be combined without either party losing the structural integrity of their contribution.</span></p>
              <p><strong>Contribution vs. extraction</strong><br/><span style="opacity:0.6;font-size:0.78rem;">Context flows outward through deliberate, governed contribution mechanisms rather than uncontrolled scraping or platform lock-in.</span></p>
            </div>
            <p style="margin-top:1.5rem;font-size:0.72rem;opacity:0.35;font-style:italic;">Not a platform. An architectural grammar.</p>
          </div>
        </div>`,
    },
    {
      id: "slide-cvi",
      title: "Cognitive Vitality Index",
      type: "content",
      section: "Frameworks",
      intent: "Framework 2 with radar chart as visual anchor. The audience understands this is measurable, composable, and grounded in research.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:0.5rem;">The Cognitive Vitality Index\u2122</h2>
        <p style="font-size:0.88rem;margin-bottom:2rem;opacity:0.7;">The proportion and quality of genuinely human-engaged cognitive work within a knowledge system, at any scale.</p>
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:2.5rem;align-items:start;">
          <div style="display:flex;align-items:center;justify-content:center;">
            <div style="width:100%;aspect-ratio:1;max-width:22rem;background:rgba(99,102,241,0.02);border:1.5px dashed rgba(99,102,241,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(99,102,241,0.4);font-size:0.7rem;text-align:center;padding:2rem;">
              [INTERACTIVE RADAR CHART]<br/>6 axes with animated scores
            </div>
          </div>
          <div>
            <p style="font-weight:700;margin-bottom:1rem;font-size:0.88rem;">Six Dimensions</p>
            <ol style="font-size:0.85rem;line-height:2.2;padding-left:1.25rem;">
              <li>Agency Retention</li>
              <li>Critical Thinking Maintenance</li>
              <li>Skill Preservation</li>
              <li>Epistemic Autonomy</li>
              <li>Cognitive Load Balance</li>
              <li>Synthesis Quality</li>
            </ol>
            <div style="margin-top:2rem;padding:1rem;border-radius:0.5rem;background:rgba(0,0,0,0.02);">
              <p style="font-size:0.78rem;line-height:1.7;opacity:0.7;">
                <strong>Composable:</strong> individual \u2192 team \u2192 org<br/>
                <strong>Diagnostic:</strong> early warning before irreversible erosion<br/>
                <strong>Non-linear:</strong> critical threshold below which recovery fails
              </p>
            </div>
          </div>
        </div>`,
    },
    {
      id: "slide-resonance",
      title: "The Resonance Wheel",
      type: "content",
      section: "Frameworks",
      intent: "Show why CVI needs a companion visualisation. The chord diagram makes trade-offs tangible. A genuinely novel contribution to measurement methodology.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:0.5rem;">The Resonance Wheel\u2122</h2>
        <p style="font-size:0.88rem;margin-bottom:2rem;opacity:0.7;">Dimensions resonate. Improving one can suppress another. The Wheel makes trade-offs visible.</p>
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:2.5rem;align-items:start;">
          <div style="display:flex;align-items:center;justify-content:center;">
            <div style="width:100%;aspect-ratio:1;max-width:22rem;background:rgba(245,158,11,0.02);border:1.5px dashed rgba(245,158,11,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(245,158,11,0.4);font-size:0.7rem;text-align:center;padding:2rem;">
              [INTERACTIVE CHORD DIAGRAM]<br/>Weighted arcs showing<br/>dimension interdependencies
            </div>
          </div>
          <div>
            <p style="font-weight:700;margin-bottom:0.75rem;font-size:0.88rem;">Why Radar Charts Alone Fail</p>
            <ul style="font-size:0.85rem;line-height:2;list-style:none;padding:0;">
              <li style="padding-left:1rem;border-left:2px solid rgba(239,68,68,0.3);">Angular placement implies independence</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(239,68,68,0.3);margin-top:0.5rem;">Area distorts comparisons</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(239,68,68,0.3);margin-top:0.5rem;">Creates illusion of separability</li>
            </ul>
            <p style="font-weight:700;margin-top:1.75rem;margin-bottom:0.75rem;font-size:0.88rem;">What the Wheel Reveals</p>
            <ul style="font-size:0.85rem;line-height:2;list-style:none;padding:0;">
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);">Which dimensions co-move</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);margin-top:0.5rem;">Hidden trade-offs and cascades</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);margin-top:0.5rem;">Feedback loops that amplify or suppress</li>
            </ul>
          </div>
        </div>`,
    },
    {
      id: "slide-meta",
      title: "Meta-Demonstrative Design",
      type: "content",
      section: "Innovation",
      intent: "Unique selling point. The format itself is a competitive moat: no other book does this. Four pillars plus a visual reference to the print sample.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:0.75rem;">The Book Practises What It Prescribes</h2>
        <p style="font-size:0.88rem;opacity:0.6;margin-bottom:2rem;">If a book about cognitive engagement allows passive consumption, it refutes its own thesis.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.75rem;">
          <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(99,102,241,0.15);background:rgba(99,102,241,0.02);">
            <p style="font-weight:700;font-size:0.82rem;margin-bottom:0.5rem;color:#6366f1;">Annotation-Rich Format</p>
            <p style="font-size:0.78rem;opacity:0.65;line-height:1.6;">Margin notes, footnotes, highlights. Multiple reading depths. Spatial navigation.</p>
          </div>
          <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(16,185,129,0.15);background:rgba(16,185,129,0.02);">
            <p style="font-weight:700;font-size:0.82rem;margin-bottom:0.5rem;color:#10b981;">Question Priming</p>
            <p style="font-size:0.78rem;opacity:0.65;line-height:1.6;">Every chapter opens with questions. Activates prior knowledge. Cognitive friction by design.</p>
          </div>
          <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(245,158,11,0.15);background:rgba(245,158,11,0.02);">
            <p style="font-weight:700;font-size:0.82rem;margin-bottom:0.5rem;color:#f59e0b;">Structured Reflection</p>
            <p style="font-size:0.78rem;opacity:0.65;line-height:1.6;">Author commentary models reflective practice. Not answers, but demonstration.</p>
          </div>
          <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(239,68,68,0.15);background:rgba(239,68,68,0.02);">
            <p style="font-weight:700;font-size:0.82rem;margin-bottom:0.5rem;color:#ef4444;">Print-Ready Innovation</p>
            <p style="font-size:0.78rem;opacity:0.65;line-height:1.6;">CSS Paged Media. 8.5\u00d79" with gutter annotations. Professional pipeline.</p>
          </div>
        </div>
        <div style="height:7rem;background:rgba(0,0,0,0.015);border:1.5px dashed rgba(0,0,0,0.08);border-radius:0.75rem;display:flex;align-items:center;justify-content:center;color:rgba(0,0,0,0.25);font-size:0.7rem;">
          [PLACEHOLDER: Paged.js print sample screenshot showing annotation-rich format with margin notes in gutter \u2014 landscape crop, approx 36rem \u00d7 7rem]
        </div>`,
    },
    {
      id: "slide-audience",
      title: "Audience and Market",
      type: "content",
      section: "Market",
      intent: "Prove market size and specificity. Named segments with estimated sizes. Course adoption extends revenue tail.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:1.75rem;">Who Will Read This Book</h2>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(99,102,241,0.15);background:rgba(99,102,241,0.02);">
            <div style="display:flex;align-items:baseline;justify-content:space-between;">
              <p style="font-weight:700;color:#6366f1;font-size:0.9rem;">Primary: Knowledge System Designers & Technology Leaders</p>
              <span style="font-size:0.7rem;font-family:var(--gestalt-font-mono);opacity:0.4;">50,000+</span>
            </div>
            <p style="font-size:0.82rem;margin-top:0.5rem;opacity:0.65;">CXOs, Chief Knowledge Officers, AI Strategy leads, Enterprise Architects. Budget authority. Need architectural frameworks.</p>
          </div>
          <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(16,185,129,0.15);background:rgba(16,185,129,0.02);">
            <div style="display:flex;align-items:baseline;justify-content:space-between;">
              <p style="font-weight:700;color:#10b981;font-size:0.9rem;">Secondary: Academic Researchers & Doctoral Candidates</p>
              <span style="font-size:0.7rem;font-family:var(--gestalt-font-mono);opacity:0.4;">25,000+</span>
            </div>
            <p style="font-size:0.82rem;margin-top:0.5rem;opacity:0.65;">KM, HCI, library science, AI ethics. Citable frameworks, novel models, measurement instruments.</p>
          </div>
          <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(245,158,11,0.15);background:rgba(245,158,11,0.02);">
            <div style="display:flex;align-items:baseline;justify-content:space-between;">
              <p style="font-weight:700;color:#f59e0b;font-size:0.9rem;">Tertiary: Innovation Leaders & Policymakers</p>
              <span style="font-size:0.7rem;font-family:var(--gestalt-font-mono);opacity:0.4;">15,000+</span>
            </div>
            <p style="font-size:0.82rem;margin-top:0.5rem;opacity:0.65;">Think tanks, government innovation advisors, corporate foresight teams. Structural grammars for governance.</p>
          </div>
        </div>
        <p style="font-size:0.75rem;opacity:0.4;margin-top:1.5rem;"><strong>Course adoption:</strong> KM (MBA/MSIM) \u2022 HCI seminars \u2022 AI Strategy (exec ed) \u2022 Info Architecture (MLIS) \u2022 Futures Studies \u2022 Innovation Mgmt (doctoral)</p>`,
    },
    {
      id: "slide-author",
      title: "Author Credibility",
      type: "content",
      section: "Market",
      intent: "Establish authority quickly. Dual doctoral, industry exits, published frameworks, ventures. The CV image provides visual weight.",
      html: `<div style="display:grid;grid-template-columns:1.8fr 1fr;gap:2.5rem;align-items:start;">
        <div>
          <h2 style="font-size:1.5rem;margin-bottom:1.75rem;">Why Me</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.75rem;font-size:0.82rem;">
            <div>
              <p style="font-weight:700;margin-bottom:0.75rem;font-size:0.85rem;">Academic</p>
              <div style="line-height:2;opacity:0.75;">
                <p>DDes, University of Calgary</p>
                <p>DBA, Golden Gate University</p>
                <p>MS AI Engineering, Quantic</p>
                <p>BSc CS (Honours), Waterloo</p>
              </div>
            </div>
            <div>
              <p style="font-weight:700;margin-bottom:0.75rem;font-size:0.85rem;">Industry</p>
              <div style="line-height:2;opacity:0.75;">
                <p>10+ years AI/ML engineering</p>
                <p>Opus One \u2192 $75M exit (GE Vernova)</p>
                <p>Swell Energy \u2192 $650M valuation</p>
                <p>Lead AI/ML, Sunrock DG</p>
              </div>
            </div>
            <div>
              <p style="font-weight:700;margin-bottom:0.75rem;font-size:0.85rem;">Intellectual Portfolio</p>
              <div style="line-height:2;opacity:0.75;">
                <p>26+ published frameworks</p>
                <p>findcongwang.com/lexicon</p>
                <p>Certifications: IFTF, UNDP, Duke</p>
              </div>
            </div>
            <div>
              <p style="font-weight:700;margin-bottom:0.75rem;font-size:0.85rem;">Ventures</p>
              <div style="line-height:2;opacity:0.75;">
                <p>FW.VISION (strategic foresight)</p>
                <p>Nova Roma (innovation non-profit)</p>
                <p>Conrad School mentor (Waterloo)</p>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;justify-content:center;padding-top:1rem;">
          <div style="width:100%;aspect-ratio:3/4;max-width:14rem;background:rgba(0,0,0,0.02);border:1.5px dashed rgba(0,0,0,0.08);border-radius:0.5rem;display:flex;align-items:center;justify-content:center;color:rgba(0,0,0,0.25);font-size:0.65rem;text-align:center;padding:1rem;">
            [PLACEHOLDER:<br/>CV first page<br/>Paged.js output<br/>14rem \u00d7 18.5rem]
          </div>
        </div>
      </div>`,
    },
    {
      id: "slide-production",
      title: "Production",
      type: "content",
      section: "Delivery",
      intent: "Demonstrate feasibility. Split timeline shows realistic planning. Existing work reduces risk.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:2rem;">Production and Delivery</h2>
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem;line-height:2.2;">
          <tbody>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);"><td style="padding:0.5rem 0;font-weight:600;width:42%;opacity:0.7;">Estimated length</td><td style="padding:0.5rem 0;">250\u2013300 pages (70,000\u201385,000 words)</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);"><td style="padding:0.5rem 0;font-weight:600;opacity:0.7;">Figures</td><td style="padding:0.5rem 0;">15\u201325 (radar charts, Resonance Wheels, zone diagrams, scenario maps)</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);"><td style="padding:0.5rem 0;font-weight:600;opacity:0.7;">Format</td><td style="padding:0.5rem 0;">Print-ready PDF via CSS Paged Media (Paged.js). Cover design included.</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);background:rgba(16,185,129,0.03);"><td style="padding:0.5rem 0;font-weight:700;">Written content</td><td style="padding:0.5rem 0;font-weight:700;">August 2026</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);background:rgba(16,185,129,0.03);"><td style="padding:0.5rem 0;font-weight:700;">Illustrations + meta-commentary + print-ready PDF</td><td style="padding:0.5rem 0;font-weight:700;">October 2026</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);"><td style="padding:0.5rem 0;font-weight:600;opacity:0.7;">Current status</td><td style="padding:0.5rem 0;">26+ framework entries. Multiple chapters advanced. Published lexicon as foundation.</td></tr>
            <tr style="border-bottom:1px solid rgba(0,0,0,0.06);"><td style="padding:0.5rem 0;font-weight:600;opacity:0.7;">Methodology</td><td style="padding:0.5rem 0;">Design Science Research + semi-structured interviews (5\u201310 informants)</td></tr>
            <tr><td style="padding:0.5rem 0;font-weight:600;opacity:0.7;">Open Access</td><td style="padding:0.5rem 0;">Philosophically aligned. Open to hybrid OA models.</td></tr>
          </tbody>
        </table>`,
    },
    {
      id: "slide-future-books",
      title: "Related Works",
      type: "content",
      section: "Closing",
      intent: "Signal series potential. The publisher sees long-term author commitment and multiple revenue opportunities from a single intellectual programme.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:0.5rem;">Follow-Up Works in Progress</h2>
        <p style="font-size:0.82rem;opacity:0.5;margin-bottom:2rem;">After this survey book, the intellectual programme branches into applied domains.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;font-size:0.82rem;">
          <div>
            <p style="font-weight:700;font-size:0.72rem;letter-spacing:0.05em;color:#0ea5e9;margin-bottom:0.75rem;">THE FUTURE OF WORK</p>
            <p style="line-height:1.7;margin-bottom:0.5rem;"><strong>Digital Sovereignty</strong><br/><span style="opacity:0.55;">Governance responses to knowledge ownership</span></p>
            <p style="line-height:1.7;"><strong>HI-Scaling Organisations</strong><br/><span style="opacity:0.55;">Operational playbook for hybrid intelligence</span></p>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.72rem;letter-spacing:0.05em;color:#10b981;margin-bottom:0.75rem;">THE FUTURE OF BUSINESS</p>
            <p style="line-height:1.7;margin-bottom:0.5rem;"><strong>CITAble</strong><br/><span style="opacity:0.55;">Making organisations legible and composable</span></p>
            <p style="line-height:1.7;"><strong>Founder-Led</strong><br/><span style="opacity:0.55;">Field guide for AI-augmented small ventures</span></p>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.72rem;letter-spacing:0.05em;color:#f59e0b;margin-bottom:0.75rem;">THE FUTURE OF INNOVATION</p>
            <p style="line-height:1.7;margin-bottom:0.5rem;"><strong>Designing Innovation</strong><br/><span style="opacity:0.55;">Systemic cultivation of innovation ecosystems (DDes)</span></p>
            <p style="line-height:1.7;"><strong>Art and Science of Entrepreneurship</strong><br/><span style="opacity:0.55;">Purpose, expression, and discovery in venture creation</span></p>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.72rem;letter-spacing:0.05em;color:#6366f1;margin-bottom:0.75rem;">OTHER SERIES</p>
            <p style="line-height:1.7;margin-bottom:0.5rem;"><strong>Architecting Agelessness</strong><br/><span style="opacity:0.55;">Longevity science meets AI health systems</span></p>
            <p style="line-height:1.7;"><strong>Capturing Waynism</strong><br/><span style="opacity:0.55;">A mentor's teaching philosophy preserved</span></p>
          </div>
        </div>`,
    },
    {
      id: "slide-cta",
      title: "Let's Talk",
      type: "title",
      section: "Closing",
      layout: "title-anchored",
      intent: "Clear call to action. The audience knows exactly what to do next.",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center">
          <h2 style="font-size:2.5rem;">Let\u2019s Talk</h2>
          <p style="margin-top:1.5rem;font-size:1.1rem;font-family:var(--gestalt-font-mono);">findcongwang.com/projects/libraries-of-the-future</p>
          <p style="margin-top:2.5rem;font-size:1rem;">Francis (Cong) Wang</p>
          <p style="opacity:0.6;font-size:0.85rem;margin-top:0.25rem;">findcongwang@gmail.com</p>
          <p style="opacity:0.5;font-size:0.8rem;margin-top:0.5rem;"><a href="https://www.linkedin.com/in/findcongwang/" style="color:inherit;">linkedin.com/in/findcongwang</a></p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.8rem;">Written content: August 2026</div>
          <div style="font-size:0.8rem;">Print-ready PDF: October 2026</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.8rem;">findcongwang.com/curriculum-vitae</div>
        </div>
      </div>`,
    },

    // ─── APPENDIX ───────────────────────────────────────────────────
    {
      id: "slide-appendix-break",
      title: "Appendix",
      type: "section",
      section: "Appendix",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center">
          <div style="width:4rem;height:1px;background:rgba(0,0,0,0.1);margin:0 auto 1.5rem;"></div>
          <h2 style="font-size:2.5rem;opacity:0.3;font-weight:400;">Appendix</h2>
          <p style="opacity:0.2;margin-top:0.75rem;font-size:0.85rem;">Additional Context for Discussion</p>
          <div style="width:4rem;height:1px;background:rgba(0,0,0,0.1);margin:1.5rem auto 0;"></div>
        </div>
      </div>`,
    },
    {
      id: "slide-appendix-toc",
      title: "Detailed TOC",
      type: "appendix",
      section: "Appendix",
      intent: "Full structural detail for publishers wanting chapter-level depth. Shows readiness and intellectual rigour.",
      html: `<h2 style="font-size:1.25rem;margin-bottom:1.25rem;">Detailed Table of Contents</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;font-size:0.72rem;line-height:1.7;">
          <div>
            <p><strong>Preface:</strong> How to Navigate This Book</p>
            <p style="opacity:0.5;margin-left:0.75rem;">Orientation to annotation format, question priming, structured reflection, and the meta-application principle.</p>
            <p style="margin-top:0.75rem;"><strong>Introduction:</strong> Third-Party Thinkers, Second-Hand Thoughts</p>
            <p style="opacity:0.5;margin-left:0.75rem;">Maps the central tension and offers three reading sequences for different audiences.</p>
            <div style="margin-top:0.75rem;border-top:1px solid rgba(239,68,68,0.15);padding-top:0.6rem;">
              <p style="font-weight:700;color:#ef4444;font-size:0.65rem;letter-spacing:0.05em;">PART I: THE PROBLEM</p>
              <p style="margin-top:0.5rem;margin-left:0.75rem;"><strong>Ch 1:</strong> Doing More, Thinking Less</p>
              <p style="opacity:0.5;margin-left:0.75rem;">Decomposes the erosion pattern into domain-agnostic dimensions. Introduces pass-through cognition and the critical threshold.</p>
              <p style="margin-top:0.5rem;margin-left:0.75rem;"><strong>Ch 2:</strong> From Information to Context</p>
              <p style="opacity:0.5;margin-left:0.75rem;">Establishes what knowledge systems actually need: composability, structural grammar, and curation as stewardship.</p>
            </div>
          </div>
          <div>
            <div style="border-top:1px solid rgba(14,165,233,0.15);padding-top:0.6rem;">
              <p style="font-weight:700;color:#0ea5e9;font-size:0.65rem;letter-spacing:0.05em;">PART II: THE FRAMEWORK</p>
              <p style="margin-top:0.5rem;margin-left:0.75rem;"><strong>Ch 3:</strong> The Perceptiosphere</p>
              <p style="opacity:0.5;margin-left:0.75rem;">The architectural response: nested sovereign zones preserving contextual integrity across boundaries.</p>
              <p style="margin-top:0.5rem;margin-left:0.75rem;"><strong>Ch 4:</strong> Measuring Human-Engaged Cognitive Work</p>
              <p style="opacity:0.5;margin-left:0.75rem;">The measurement response: CVI as composable diagnostic from individual to organisational scale.</p>
            </div>
            <div style="margin-top:0.75rem;border-top:1px solid rgba(245,158,11,0.15);padding-top:0.6rem;">
              <p style="font-weight:700;color:#f59e0b;font-size:0.65rem;letter-spacing:0.05em;">PART III: FRONTIERS</p>
              <p style="margin-top:0.5rem;margin-left:0.75rem;"><strong>Ch 5:</strong> Compelling Questions\u2122 for the Field</p>
              <p style="opacity:0.5;margin-left:0.75rem;">Four open frontiers as structured invitations using Bold Ambition + Significant Constraints.</p>
              <p style="opacity:0.4;margin-left:0.75rem;font-size:0.65rem;">5.1 Digital Sovereignty \u2022 5.2 Living Archive \u2022 5.3 Cognitive Agency \u2022 5.4 Composable Innovation</p>
            </div>
            <p style="margin-top:0.75rem;"><strong>Conclusion:</strong> The Post-Agentic Human</p>
            <p style="opacity:0.5;margin-left:0.75rem;">What it means to be human in a world of infinite automated output.</p>
          </div>
        </div>
        <p style="margin-top:1.25rem;font-size:0.68rem;opacity:0.4;">Full TOC with opening questions for each chapter: <a href="/projects/libraries-of-the-future" style="color:inherit;text-decoration:underline;">findcongwang.com/projects/libraries-of-the-future</a></p>`,
    },
    {
      id: "slide-appendix-bibliography",
      title: "Annotated Bibliography",
      type: "appendix",
      section: "Appendix",
      intent: "Demonstrate research depth. Each source gets one paragraph on relevance. Shows the evidence base is real and curated.",
      html: `<h2 style="font-size:1.35rem;margin-bottom:1.25rem;">Selected Annotated Bibliography</h2>
        <div style="font-size:0.75rem;line-height:1.7;columns:2;column-gap:2.5rem;">
          <p style="margin-bottom:0.75rem;break-inside:avoid;"><strong>Xu et al. (2026)</strong> \u2014 Demonstrates generative AI transforms benign cognitive offloading into systematic surrender by exploiting human cognitive miserliness. Core empirical backbone.</p>
          <p style="margin-bottom:0.75rem;break-inside:avoid;"><strong>Alubthane (2026)</strong> \u2014 89-paper systematic review: GenAI produces short-term gains but long-term degradation of higher-order thinking. Most comprehensive meta-evidence.</p>
          <p style="margin-bottom:0.75rem;break-inside:avoid;"><strong>Wu et al. (2025)</strong> \u2014 AIDep-22: first validated psychometric instrument for AI dependence (4 dimensions). Proves cognitive erosion is measurable with standardised instruments.</p>
          <p style="margin-bottom:0.75rem;break-inside:avoid;"><strong>Barulli & Stern (2013)</strong> \u2014 Cognitive reserve operates on use-it-or-lose-it principles. 840 citations. Direct theoretical grounding for the CVI.</p>
          <p style="margin-bottom:0.75rem;break-inside:avoid;"><strong>Leonidov (2025)</strong> \u2014 Pilot manual flying skill degradation in automated cockpits. When automation fails, degraded skills become lethal. The visceral aviation analogue.</p>
          <p style="margin-bottom:0.75rem;break-inside:avoid;"><strong>Kazienko et al. (2026)</strong> \u2014 AI Overload multilevel taxonomy (individual, organisational, societal). Parallels CVI\u2019s composable architecture.</p>
          <p style="margin-bottom:0.75rem;break-inside:avoid;"><strong>Mladin et al. (2026)</strong> \u2014 Algorithmic Habituation: 4-dimensional typology (cognitive, decisional, creative, moral). Maps onto CVI dimensions directly.</p>
          <p style="margin-bottom:0.75rem;break-inside:avoid;"><strong>\u0160ucha (2026)</strong> \u2014 AI as Mental Contaminant: low-risk AI applications reshape cognition below awareness threshold. Supports the invisible erosion thesis.</p>
        </div>`,
    },
    {
      id: "slide-appendix-methodology",
      title: "Methodology",
      type: "appendix",
      section: "Appendix",
      intent: "Satisfy academic reviewers. DSR justification for GGU pathway; empirical grounding for TnF reviewers.",
      html: `<h2 style="font-size:1.35rem;margin-bottom:1.5rem;">Research Methodology</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;font-size:0.82rem;">
          <div>
            <p style="font-weight:700;margin-bottom:0.75rem;">Design Science Research (DSR)</p>
            <ol style="line-height:2;padding-left:1.25rem;">
              <li>Problem identification and motivation</li>
              <li>Objectives for a solution</li>
              <li>Design and development</li>
              <li>Demonstration (practitioner interviews)</li>
              <li>Evaluation against objectives</li>
              <li>Communication (publication)</li>
            </ol>
          </div>
          <div>
            <p style="font-weight:700;margin-bottom:0.75rem;">Primary Data Collection</p>
            <ul style="line-height:2;list-style:none;padding:0;">
              <li style="padding-left:1rem;border-left:2px solid rgba(0,0,0,0.06);">5\u201310 semi-structured interviews</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(0,0,0,0.06);margin-top:0.4rem;">Key informants: practicing professionals</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(0,0,0,0.06);margin-top:0.4rem;">Focus: lived experience of cognitive change</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(0,0,0,0.06);margin-top:0.4rem;">IRB approval via GGU (pre-draft complete)</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(0,0,0,0.06);margin-top:0.4rem;">Thematic analysis + framework validation</li>
            </ul>
          </div>
        </div>
        <div style="margin-top:1.25rem;text-align:center;">
          <img src="/images/presentations/libraries-of-the-future/double-diamond.png" alt="Double Diamond design process model (Design Council)" style="max-height:16rem;width:auto;opacity:0.85;border-radius:0.5rem;" />
          <p style="font-size:0.65rem;opacity:0.35;margin-top:0.5rem;">Design Council Double Diamond \u2014 <a href="https://www.designcouncil.org.uk/resources/the-double-diamond/" style="color:inherit;">designcouncil.org.uk</a></p>
        </div>`,
    },
    {
      id: "slide-appendix-companion",
      title: "Companion Resources",
      type: "appendix",
      section: "Appendix",
      intent: "Show surrounding ecosystem that drives discovery and adoption. Built-in marketing channels make the book more commercially attractive.",
      html: `<h2 style="font-size:1.35rem;margin-bottom:2rem;">Companion Resources</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
          <div style="padding:1.5rem;border-radius:0.75rem;border:1.5px solid rgba(0,0,0,0.06);">
            <p style="font-weight:700;font-size:0.88rem;margin-bottom:0.5rem;">perceptiosphere.com</p>
            <p style="font-size:0.78rem;opacity:0.6;line-height:1.6;">Primary companion site. Frameworks, lexicon, compelling questions as interactive living documents.</p>
          </div>
          <div style="padding:1.5rem;border-radius:0.75rem;border:1.5px solid rgba(0,0,0,0.06);">
            <p style="font-weight:700;font-size:0.88rem;margin-bottom:0.5rem;">Open-Source Template</p>
            <p style="font-size:0.78rem;opacity:0.6;line-height:1.6;">GitHub scaffolding for readers to implement the Perceptiosphere system. Lowers adoption barriers.</p>
          </div>
          <div style="padding:1.5rem;border-radius:0.75rem;border:1.5px solid rgba(0,0,0,0.06);">
            <p style="font-weight:700;font-size:0.88rem;margin-bottom:0.5rem;">Innovation Challenge Portal</p>
            <p style="font-size:0.78rem;opacity:0.6;line-height:1.6;">Chapter 5 questions link to Nova Roma's active platform for structured discourse.</p>
          </div>
          <div style="padding:1.5rem;border-radius:0.75rem;border:1.5px solid rgba(0,0,0,0.06);">
            <p style="font-weight:700;font-size:0.88rem;margin-bottom:0.5rem;">Annotation-Rich Digital Reader</p>
            <p style="font-size:0.78rem;opacity:0.6;line-height:1.6;">Web-based reader at findcongwang.com demonstrating the layered annotation format live.</p>
          </div>
        </div>`,
    },
    {
      id: "slide-appendix-ai",
      title: "AI Disclosure",
      type: "appendix",
      section: "Appendix",
      intent: "Pre-empt AI use question. Principled and transparent positioning. Self-correcting research screenshot demonstrates rigour.",
      html: `<h2 style="font-size:1.35rem;margin-bottom:1.5rem;">AI Use: Transparent and Principled</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;font-size:0.82rem;">
          <div style="padding:1.25rem;border-radius:0.75rem;background:rgba(245,158,11,0.03);">
            <p style="font-weight:700;margin-bottom:0.75rem;">AI Is Used For</p>
            <ul style="line-height:2;list-style:none;padding:0;">
              <li>\u2022 Research discovery and paper retrieval</li>
              <li>\u2022 Transcription of recorded conversations</li>
              <li>\u2022 Fluency refinement of author-written text</li>
              <li>\u2022 Citation verification (DOI validation)</li>
              <li>\u2022 Typesetting and layout design recommendations</li>
            </ul>
          </div>
          <div style="padding:1.25rem;border-radius:0.75rem;background:rgba(239,68,68,0.03);">
            <p style="font-weight:700;margin-bottom:0.75rem;">AI Does Not</p>
            <ul style="line-height:2;list-style:none;padding:0;">
              <li>\u2022 Generate content or frameworks</li>
              <li>\u2022 Produce analysis or argument</li>
              <li>\u2022 Create original terminology</li>
              <li>\u2022 Write interview questions</li>
              <li>\u2022 Make editorial decisions</li>
            </ul>
          </div>
        </div>
        <div style="margin-top:1.5rem;padding:1rem 1.25rem;border-radius:0.75rem;border:1.5px solid rgba(0,0,0,0.06);display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:center;">
          <div>
            <p style="font-weight:700;font-size:0.8rem;margin-bottom:0.5rem;">Proprietary Research Infrastructure</p>
            <p style="font-size:0.72rem;opacity:0.6;line-height:1.6;">Custom research-MCP tools: OpenAlex + Semantic Scholar APIs for DOI verification. Playwright-based institutional access for paywalled articles. Self-correcting in real time.</p>
          </div>
          <img src="/images/presentations/libraries-of-the-future/self-correcting-research.jpeg" alt="AI research agent catching hallucinated citations" style="width:100%;max-height:10rem;object-fit:cover;border-radius:0.5rem;border:1px solid rgba(0,0,0,0.08);" />
        </div>`,
    },
    {
      id: "slide-appendix-competitors",
      title: "Competitor Deep-Dive",
      type: "appendix",
      section: "Appendix",
      intent: "Detailed competitive positioning for publishers wanting more than the summary table. Each comparison uses a different axis of differentiation.",
      html: `<h2 style="font-size:1.35rem;margin-bottom:1.75rem;">Competitive Positioning (Detail)</h2>
        <div style="font-size:0.82rem;line-height:1.7;display:flex;flex-direction:column;gap:1rem;">
          <div style="padding:1rem 1.25rem;border-left:4px solid #6366f1;border-radius:0 0.5rem 0.5rem 0;background:rgba(99,102,241,0.02);">
            <p><strong>vs. Mollick, <em>Co-Intelligence</em></strong> \u2014 Prescriptive architecture vs. descriptive practice. We provide architectural frameworks for entire knowledge systems. We address sovereignty and measurement.</p>
          </div>
          <div style="padding:1rem 1.25rem;border-left:4px solid #10b981;border-radius:0 0.5rem 0.5rem 0;background:rgba(16,185,129,0.02);">
            <p><strong>vs. Suleyman, <em>The Coming Wave</em></strong> \u2014 Actionable architecture vs. geopolitical analysis. Complementary layers: we address how organisations structure their knowledge relationships with AI.</p>
          </div>
          <div style="padding:1rem 1.25rem;border-left:4px solid #f59e0b;border-radius:0 0.5rem 0.5rem 0;background:rgba(245,158,11,0.02);">
            <p><strong>vs. Forte, <em>Building a Second Brain</em></strong> \u2014 Post-agentic vs. pre-AI. We extend PKM into institutional systems, sovereignty, generational succession, and cognitive health.</p>
          </div>
          <div style="padding:1rem 1.25rem;border-left:4px solid #ef4444;border-radius:0 0.5rem 0.5rem 0;background:rgba(239,68,68,0.02);">
            <p><strong>vs. CRC Press <em>Industry 6.0</em></strong> \u2014 Complementary within catalogue. They ask "what technologies?" We ask "how should humans architect their relationship with them?"</p>
          </div>
        </div>`,
    },
    {
      id: "slide-appendix-oa",
      title: "Open Access",
      type: "appendix",
      section: "Appendix",
      intent: "Address TnF standard OA question. Philosophical alignment with commercially pragmatic approach.",
      html: `<h2 style="font-size:1.35rem;margin-bottom:1.5rem;">Open Access and Ecosystem Strategy</h2>
        <p style="font-size:0.88rem;opacity:0.6;margin-bottom:2rem;">The book's thesis advocates for knowledge sovereignty and accessible systems. OA publishing is philosophically aligned.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;font-size:0.85rem;">
          <div>
            <p style="font-weight:700;margin-bottom:1rem;">Open Access Interests</p>
            <ul style="line-height:2.2;list-style:none;padding:0;">
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);">Open to hybrid OA models</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);margin-top:0.5rem;">Sustainability over ideology</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);margin-top:0.5rem;">Open-source codebase for adoption</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(16,185,129,0.3);margin-top:0.5rem;">Companion site as lead generation</li>
            </ul>
          </div>
          <div>
            <p style="font-weight:700;margin-bottom:1rem;">Ecosystem Model</p>
            <ul style="line-height:2.2;list-style:none;padding:0;">
              <li style="padding-left:1rem;border-left:2px solid rgba(14,165,233,0.3);"><strong>findcongwang.com</strong> \u2014 portfolio + lexicon</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(14,165,233,0.3);margin-top:0.5rem;"><strong>perceptiosphere.com</strong> \u2014 framework domain</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(14,165,233,0.3);margin-top:0.5rem;"><strong>Nova Roma</strong> \u2014 challenge portal</li>
              <li style="padding-left:1rem;border-left:2px solid rgba(14,165,233,0.3);margin-top:0.5rem;"><strong>GitHub</strong> \u2014 implementation templates</li>
            </ul>
          </div>
        </div>
        <p style="margin-top:2rem;font-size:0.78rem;opacity:0.4;">Free resources create adoption. The book provides the definitive, citable treatment that companion materials cannot replace.</p>`,
    },
  ],

  // ─── STORY TRACK ──────────────────────────────────────────────────
  story: {
    type: "steps",
    visualisation: "wordcloud",
    steps: [
      {
        id: "story-opening",
        label: "Opening",
        thread: "meta",
        conceptsAdded: ["Libraries of the Future"],
      },
      {
        id: "story-problem",
        label: "The Problem",
        thread: "problem",
        conceptsAdded: ["Third-Party Thinkers", "Second-Hand Thoughts", "Cognitive Erosion", "Pass-Through Cognition"],
      },
      {
        id: "story-evidence",
        label: "Evidence",
        thread: "problem",
        conceptsAdded: ["Automation Deskilling", "Cognitive Offloading", "Domain-Agnostic"],
      },
      {
        id: "story-urgency",
        label: "Urgency",
        thread: "problem",
        conceptsAdded: ["Market Window", "Cognitive Agency Surrender", "AIDep-22", "Empirical Validation"],
      },
      {
        id: "story-positioning",
        label: "Positioning",
        thread: "meta",
        conceptsAdded: ["Knowledge Architecture", "Measurement", "Futures", "No Existing Book"],
        conceptsFaded: ["Automation Deskilling"],
      },
      {
        id: "story-perceptiosphere",
        label: "Perceptiosphere",
        thread: "architecture",
        conceptsAdded: ["Perceptiosphere", "Knowledge Sovereignty", "Contextual Integrity", "Composable Collaboration", "Four Zones"],
        conceptsFaded: ["No Existing Book", "Market Window"],
      },
      {
        id: "story-sovereignty",
        label: "Sovereignty",
        thread: "architecture",
        conceptsAdded: ["Contribution vs Extraction", "Architectural Grammar"],
      },
      {
        id: "story-cvi",
        label: "CVI",
        thread: "measurement",
        conceptsAdded: ["Cognitive Vitality Index", "Six Dimensions", "Agency Retention", "Critical Threshold"],
        conceptsFaded: ["AIDep-22", "Domain-Agnostic"],
      },
      {
        id: "story-resonance",
        label: "Resonance",
        thread: "measurement",
        conceptsAdded: ["Resonance Wheel", "Interdependencies", "Non-Linear Degradation"],
      },
      {
        id: "story-meta-design",
        label: "Meta-Design",
        thread: "innovation",
        conceptsAdded: ["Meta-Demonstrative Design", "Annotation-Rich", "Question Priming", "Cognitive Friction"],
        conceptsFaded: ["Empirical Validation"],
      },
      {
        id: "story-audience",
        label: "Audience",
        thread: "meta",
        conceptsAdded: ["Knowledge System Designers", "Practitioners", "Academic Researchers"],
        conceptsFaded: ["Cognitive Offloading"],
      },
      {
        id: "story-author",
        label: "Author",
        thread: "meta",
        conceptsAdded: ["Practitioner-Researcher", "HI-Scaling", "Innovation Sanctuary", "Published Frameworks"],
      },
      {
        id: "story-delivery",
        label: "Delivery",
        thread: "meta",
        conceptsAdded: ["Print-Ready PDF", "CSS Paged Media", "Design Science Research"],
        conceptsFaded: ["Knowledge System Designers"],
      },
      {
        id: "story-series",
        label: "Series",
        thread: "innovation",
        conceptsAdded: ["Future of Work", "Future of Business", "Future of Innovation", "Digital Sovereignty"],
      },
      {
        id: "story-close",
        label: "Close",
        thread: "meta",
      },
    ],
    threadColors: {
      "problem": "#ef4444",
      "architecture": "#0ea5e9",
      "measurement": "#10b981",
      "innovation": "#f59e0b",
      "meta": "#6366f1",
    },
  },

  // ─── ANCHORS ──────────────────────────────────────────────────────
  anchors: [
    { slideId: "slide-title", storyStepId: "story-opening" },
    { slideId: "slide-hook", storyStepId: "story-problem" },
    { slideId: "slide-why-now", storyStepId: "story-urgency" },
    { slideId: "slide-gap", storyStepId: "story-positioning" },
    { slideId: "slide-perceptiosphere", storyStepId: "story-perceptiosphere" },
    { slideId: "slide-cvi", storyStepId: "story-cvi" },
    { slideId: "slide-resonance", storyStepId: "story-resonance" },
    { slideId: "slide-meta", storyStepId: "story-meta-design" },
    { slideId: "slide-audience", storyStepId: "story-audience" },
    { slideId: "slide-author", storyStepId: "story-author" },
    { slideId: "slide-production", storyStepId: "story-delivery" },
    { slideId: "slide-future-books", storyStepId: "story-series" },
    { slideId: "slide-cta", storyStepId: "story-close" },
  ],
};
