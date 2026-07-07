import type { DualTrackPresentation } from "../types-v2";

/**
 * Cooperathon 2026 — University Research Track
 * The Perceptiosphere: Living Archive for Institutional Memory
 *
 * Narrative: Knowledge succession as societal crisis → living archive as solution → Wayne as proof.
 * Colour palette: #1e3a5f (constellation blue) | #b8860b (legacy gold) | #065f46 (living emerald) | #7c2d12 (decay sienna) | #6d28d9 (community violet)
 * No emojis. Left-aligned. Institutional gravitas register. Awe-evoking where specified.
 */

export const cooperathonPerceptiosphereData: DualTrackPresentation = {
  title: "The Perceptiosphere: Living Archive for Institutional Memory",
  subtitle: "Cooperathon 2026 — University Research Track",
  author: "Francis Wang",
  date: "2026-07",
  duration: 5,

  slides: [
    // ─── SLIDE 1: TITLE ─────────────────────────────────────────────
    {
      id: "slide-title",
      title: "Title",
      type: "title",
      section: "Opening",
      layout: "title-anchored",
      intent: "Set the tone: this is about preserving human endeavour. Constellation blue background feel. Serious, reverent, grounded.",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center">
          <h1 style="font-size:2.6rem;line-height:1.15;text-align:left;max-width:36rem;">The Perceptiosphere:<br/>Living Archive for Institutional Memory</h1>
          <p class="gestalt-slide__subtitle" style="margin-top:1.25rem;font-size:1rem;opacity:0.55;max-width:34rem;text-align:left;">Renewing our relationship with the knowledge around us</p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.85rem;">Francis Wang</div>
          <div style="font-size:0.85rem;opacity:0.5;">University of Calgary | Golden Gate University | University of Waterloo</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.9rem;opacity:0.5;">Cooperathon 2026 — University Research Track</div>
          <div style="font-size:0.85rem;opacity:0.4;">July 7, 2026</div>
        </div>
      </div>`,
    },

    // ─── SLIDE 2: HOOK (WAYNE STORY) ────────────────────────────────
    {
      id: "slide-hook",
      title: "When Professor Wayne Passed",
      type: "content",
      section: "Problem",
      intent: "Personal story earns the right to pitch. Two-column: emotional text left, Wayne photo right. Super-connector framing. This is MY mentor.",
      html: `<div style="display:grid;grid-template-columns:1fr 22rem;gap:2rem;align-items:start;">
        <div>
          <h2 style="font-size:1.6rem;margin-bottom:1.25rem;text-align:left;">Professor Wayne H. Chang was a super-connector.</h2>
          <p style="font-size:1.15rem;line-height:1.9;margin-bottom:1rem;">He wove together an entire innovation community: <strong>1,000+ students, 700+ ventures, 17 industries</strong>. His work became the core identity of an institution of thinking around entrepreneurial education and applying innovation for societal good.</p>
          <p style="font-size:1.15rem;line-height:1.9;margin-bottom:1rem;">He was my inspiring mentor. I would not be doing what I am doing without him.</p>
          <p style="font-size:1.15rem;line-height:1.9;margin-bottom:1.25rem;">When he passed, that connective tissue became <strong>invisible overnight</strong>. It is now up to me and my colleagues to continue what he started.</p>
          <div style="padding:1rem 1.25rem;border-radius:0.5rem;border:1px solid rgba(184,134,11,0.2);background:rgba(184,134,11,0.03);">
            <p style="font-size:1.15rem;line-height:1.7;font-weight:500;">Every university has a Wayne.<br/>Most will never know what they lost.</p>
          </div>
          <p style="font-size:0.95rem;opacity:0.6;margin-top:1rem;line-height:1.6;">We are actively trying to capture what Wayne represented. See <strong>Wayne's Knowledge Constellation</strong> later in this presentation.</p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:22rem;height:26rem;border-radius:0.75rem;background:rgba(184,134,11,0.06);border:1px solid rgba(184,134,11,0.15);display:flex;align-items:center;justify-content:center;overflow:hidden;">
            <img src="/images/presentations/loveyoudad.jpeg" alt="Professor Wayne H. Chang" style="width:100%;height:100%;object-fit:cover;border-radius:0.75rem;" onerror="this.style.display='none';this.parentElement.innerHTML='<p style=\\'font-size:0.85rem;opacity:0.4;text-align:center;padding:1rem;\\'>Wayne H. Chang<br/>1965\u20132025</p>'" />
          </div>
          <p style="font-size:0.82rem;opacity:0.5;margin-top:0.5rem;text-align:center;">Prof. Wayne H. Chang<br/>Conrad School, UWaterloo</p>
        </div>
      </div>`,
    },

    // ─── SLIDE 3: PROBLEM (DATA-BACKED) ─────────────────────────────
    {
      id: "slide-problem",
      title: "The Knowledge Succession Crisis",
      type: "content",
      section: "Problem",
      intent: "Data cards with APA citations. Cross-generational collaboration as unlock. Larger font for screen-share legibility.",
      html: `<h2 style="font-size:1.6rem;margin-bottom:1.25rem;text-align:left;">Knowledge Succession: A Societal Crisis</h2>
        <p style="font-size:1.05rem;line-height:1.8;max-width:42rem;margin-bottom:1.25rem;">When people leave a community through retirement or departure, knowledge leaves the ecosystem. Doctoral theses, symposium proceedings, decades of institutional practice: publicly available, but <mark style="background:rgba(124,45,18,0.12);padding:0.1rem 0.3rem;border-radius:0.2rem;">not discovered because it is not mapped</mark>.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;">
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(124,45,18,0.2);background:rgba(124,45,18,0.03);">
            <p style="font-size:2rem;font-weight:700;color:#7c2d12;">80%</p>
            <p style="font-size:0.85rem;opacity:0.7;margin-top:0.25rem;">of organisational knowledge is tacit and undocumented\u00B9</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(124,45,18,0.2);background:rgba(124,45,18,0.03);">
            <p style="font-size:2rem;font-weight:700;color:#7c2d12;">$31.5B</p>
            <p style="font-size:0.85rem;opacity:0.7;margin-top:0.25rem;">lost annually by Fortune 500 from knowledge sharing failures\u00B2</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(124,45,18,0.2);background:rgba(124,45,18,0.03);">
            <p style="font-size:2rem;font-weight:700;color:#7c2d12;">70%</p>
            <p style="font-size:0.85rem;opacity:0.7;margin-top:0.25rem;">of KM initiatives fail to meet their objectives\u00B3</p>
          </div>
        </div>
        <p style="font-size:1.05rem;line-height:1.8;max-width:42rem;margin-bottom:1rem;">What we lack is an <strong>institutional memory of a place</strong>. Addressing knowledge succession unlocks <mark style="background:rgba(6,95,70,0.1);padding:0.1rem 0.3rem;border-radius:0.2rem;">cross-generational collaboration</mark>: long-term innovations spanning multiple generations, sustained because context is no longer lost with each departure.</p>
        <div style="margin-top:1rem;font-size:0.85rem;opacity:0.45;line-height:1.8;">
          <p>\u00B9 Wellman, J. L. (2009). <em>Organizational learning: How companies and institutions manage and apply knowledge</em>. Palgrave Macmillan.</p>
          <p>\u00B2 Babcock, P. (2004). Shedding light on knowledge management. <em>HR Magazine, 49</em>(5), 46\u201350.</p>
          <p>\u00B3 Lucidea. (2020). <em>The state of knowledge management</em>. Lucidea KM Research Report.</p>
        </div>`,
    },

    // ─── SLIDE 4: VISION (ATRIUM WALL) ──────────────────────────────
    {
      id: "slide-vision",
      title: "The Institutional Memory Wall",
      type: "content",
      section: "Vision",
      intent: "Awe-evoking. Slow delivery. Paint the picture. Let them see it. The constellation as physical installation and digital product.",
      html: `<div style="padding:2rem 2.5rem;border-radius:0.75rem;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.12);margin-bottom:1.5rem;">
          <p style="font-size:1.15rem;line-height:1.8;max-width:38rem;">Imagine the entire wall of a full atrium. Two storeys tall. A giant, living display of the institutional memory of a place.</p>
          <p style="font-size:1.05rem;line-height:1.8;max-width:38rem;margin-top:1rem;">Everyone can see and navigate the gaps in the constellation of knowledge. They get inspired about what they do next.</p>
        </div>
        <p style="font-size:1.1rem;line-height:1.8;max-width:38rem;margin-bottom:1.5rem;font-weight:500;">They feel small and yet connected to this massive, determined human endeavour.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;">
          <div style="padding:1rem 1.25rem;border-radius:0.5rem;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.12);">
            <p style="font-size:0.85rem;font-weight:600;color:#065f46;margin-bottom:0.4rem;">They can see their contributions</p>
            <p style="font-size:0.92rem;opacity:0.7;line-height:1.6;">Preserved. Attributed. Connected to the whole.</p>
          </div>
          <div style="padding:1rem 1.25rem;border-radius:0.5rem;background:rgba(109,40,217,0.04);border:1px solid rgba(109,40,217,0.12);">
            <p style="font-size:0.85rem;font-weight:600;color:#6d28d9;margin-bottom:0.4rem;">They can see the gaps</p>
            <p style="font-size:0.92rem;opacity:0.7;line-height:1.6;">Inspiration for what to explore next. Knowledge as invitation.</p>
          </div>
          <div style="padding:1rem 1.25rem;border-radius:0.5rem;background:rgba(184,134,11,0.04);border:1px solid rgba(184,134,11,0.12);">
            <p style="font-size:0.85rem;font-weight:600;color:#b8860b;margin-bottom:0.4rem;">This enables cross-generational collaboration</p>
            <p style="font-size:0.92rem;opacity:0.7;line-height:1.6;">Long-term innovations sustained across multiple generations of contributors.</p>
          </div>
        </div>`,
    },

    // ─── SLIDE 5: PERCEPTIOSPHERE CONCEPT (CONCENTRIC RINGS) ─────────
    {
      id: "slide-perceptiosphere",
      title: "The Perceptiosphere",
      type: "content",
      section: "Solution",
      intent: "Introduce the Perceptiosphere architecture with concentric rings SVG. Knowledge as spatial relationship. Four layers: Tacit, Trusted Circle, Community of Practice, Public.",
      html: `<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:2.5rem;align-items:center;">
        <div>
          <h2 style="font-size:1.6rem;margin-bottom:1rem;text-align:left;">The Perceptiosphere</h2>
          <p style="font-size:1.1rem;line-height:1.8;margin:0 0 1.5rem;">Knowledge exists not as a flat collection but as a <strong>spatial relationship</strong> between the knower and the known. Four concentric layers radiate outward from an entity, each representing a different scope of influence and access.</p>
          <div style="display:grid;grid-template-columns:1rem 1fr;column-gap:0.75rem;row-gap:0.65rem;align-items:start;">
            <div style="width:1rem;height:1rem;border-radius:50%;background:#b8860b;margin-top:0.35em;"></div>
            <p style="margin:0;font-size:1.05rem;line-height:1.5;"><strong>Tacit</strong> \u2014 Private, embodied knowledge</p>
            <div style="width:1rem;height:1rem;border-radius:50%;background:#6d28d9;margin-top:0.35em;"></div>
            <p style="margin:0;font-size:1.05rem;line-height:1.5;"><strong>Trusted Circle</strong> \u2014 Shared with close collaborators</p>
            <div style="width:1rem;height:1rem;border-radius:50%;background:#1e3a5f;margin-top:0.35em;"></div>
            <p style="margin:0;font-size:1.05rem;line-height:1.5;"><strong>Community of Practice</strong> \u2014 Professional network exchange</p>
            <div style="width:1rem;height:1rem;border-radius:50%;background:#065f46;margin-top:0.35em;"></div>
            <p style="margin:0;font-size:1.05rem;line-height:1.5;"><strong>Public</strong> \u2014 Open contribution to collective knowledge</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 340 340" style="width:100%;max-width:30rem;height:auto;" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path id="ps-public-arc" d="M 40 170 A 130 130 0 0 1 300 170" fill="none"/>
              <path id="ps-community-arc" d="M 80 170 A 90 90 0 0 1 260 170" fill="none"/>
              <path id="ps-trusted-arc" d="M 120 170 A 50 50 0 0 1 220 170" fill="none"/>
            </defs>
            <!-- Public (outermost) -->
            <circle cx="170" cy="170" r="150" fill="none" stroke="#065f46" stroke-width="2" opacity="0.3"/>
            <circle cx="170" cy="170" r="150" fill="rgba(6,95,70,0.04)"/>
            <!-- Community of Practice -->
            <circle cx="170" cy="170" r="110" fill="none" stroke="#1e3a5f" stroke-width="2" opacity="0.4"/>
            <circle cx="170" cy="170" r="110" fill="rgba(30,58,95,0.06)"/>
            <!-- Trusted Circle -->
            <circle cx="170" cy="170" r="70" fill="none" stroke="#6d28d9" stroke-width="2.5" opacity="0.5"/>
            <circle cx="170" cy="170" r="70" fill="rgba(109,40,217,0.08)"/>
            <!-- Tacit (innermost) -->
            <circle cx="170" cy="170" r="30" fill="none" stroke="#b8860b" stroke-width="3" opacity="0.7"/>
            <circle cx="170" cy="170" r="30" fill="rgba(184,134,11,0.15)"/>
            <!-- Labels -->
            <text x="170" y="170" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="700" fill="#b8860b" font-family="Geist, sans-serif">TACIT</text>
            <text font-size="10" font-weight="600" fill="#6d28d9" letter-spacing="0.06em" font-family="Geist, sans-serif">
              <textPath href="#ps-trusted-arc" startOffset="50%" text-anchor="middle">TRUSTED CIRCLE</textPath>
            </text>
            <text font-size="9.5" font-weight="600" fill="#1e3a5f" letter-spacing="0.05em" font-family="Geist, sans-serif">
              <textPath href="#ps-community-arc" startOffset="50%" text-anchor="middle">COMMUNITY OF PRACTICE</textPath>
            </text>
            <text font-size="11" font-weight="600" fill="#065f46" letter-spacing="0.08em" font-family="Geist, sans-serif">
              <textPath href="#ps-public-arc" startOffset="50%" text-anchor="middle">PUBLIC</textPath>
            </text>
          </svg>
        </div>
      </div>`,
    },

    // ─── SLIDE 6: SOLUTION (PERCEPTIOSPHERE PROTOCOL) ────────────────
    {
      id: "slide-solution",
      title: "The Perceptiosphere Protocol",
      type: "content",
      section: "Solution",
      intent: "Technical confidence. The protocol, not just a product. AI + human co-evolution. Knowledge as new asset class. Collaboration between groups.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:0.75rem;text-align:left;max-width:38rem;">The Perceptiosphere Protocol</h2>
        <p style="font-size:0.95rem;line-height:1.8;max-width:38rem;margin-bottom:1.5rem;">A build-to-manage platform that helps communities capture institutional memory as a <mark style="background:rgba(6,95,70,0.1);padding:0.1rem 0.3rem;border-radius:0.2rem;">new asset class</mark>. Open-source templates for thinking about our relationship with information. Commercial deployments for processing and managing this knowledge at scale.</p>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:1rem;margin-bottom:1.5rem;">
          <div style="width:2rem;height:2rem;border-radius:50%;background:#1e3a5f;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;">1</div>
          <div><p style="font-size:0.88rem;line-height:1.6;"><strong>Collect and decompose.</strong> AI agents process terabytes of institutional data (publications, course materials, project archives) into semantic knowledge atoms.</p></div>
          <div style="width:2rem;height:2rem;border-radius:50%;background:#065f46;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;">2</div>
          <div><p style="font-size:0.88rem;line-height:1.6;"><strong>Curate and connect.</strong> Humans validate, annotate, and link. The community contributes stories, reflections, and new knowledge back into the mesh.</p></div>
          <div style="width:2rem;height:2rem;border-radius:50%;background:#b8860b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;">3</div>
          <div><p style="font-size:0.88rem;line-height:1.6;"><strong>Navigate and compound.</strong> Knowledge becomes navigable, inheritable, alive. People join communities, get value from them, and contribute back.</p></div>
        </div>
        <div style="padding:1rem 1.25rem;border-radius:0.5rem;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.12);">
          <p style="font-size:1.05rem;line-height:1.6;">The real power: enabling collaboration between different groups. People join communities, get value from them, and contribute back. Managed contexts combine into something greater than any individual.</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;margin-top:1.25rem;">
          <div style="padding:0.6rem 0.85rem;border-radius:0.4rem;background:rgba(6,95,70,0.06);border:1px solid rgba(6,95,70,0.15);">
            <p style="font-size:1rem;font-weight:700;color:#065f46;">SDG 4</p>
            <p style="font-size:0.88rem;opacity:0.7;margin-top:0.2rem;">Quality Education</p>
          </div>
          <div style="padding:0.6rem 0.85rem;border-radius:0.4rem;background:rgba(30,58,95,0.06);border:1px solid rgba(30,58,95,0.15);">
            <p style="font-size:1rem;font-weight:700;color:#1e3a5f;">SDG 9</p>
            <p style="font-size:0.88rem;opacity:0.7;margin-top:0.2rem;">Industry, Innovation and Infrastructure</p>
          </div>
          <div style="padding:0.6rem 0.85rem;border-radius:0.4rem;background:rgba(109,40,217,0.06);border:1px solid rgba(109,40,217,0.15);">
            <p style="font-size:1rem;font-weight:700;color:#6d28d9;">SDG 10</p>
            <p style="font-size:0.88rem;opacity:0.7;margin-top:0.2rem;">Reduced Inequalities</p>
          </div>
        </div>`,
    },

    // ─── SLIDE 6: DEMO (WAYNE'S CONSTELLATION) ──────────────────────
    {
      id: "slide-demo",
      title: "Wayne's Knowledge Constellation",
      type: "content",
      section: "Demo",
      layout: "content-anchored",
      intent: "This is the 30-40 second transition slide. Image of the constellation + silhouette concept. Presenter will tab-switch to live demo. Deliberate pause for awe.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:1rem;text-align:left;">Wayne's Knowledge Constellation</h2>
        <p style="font-size:0.92rem;line-height:1.8;max-width:38rem;margin-bottom:1.5rem;">1,000+ nodes of documented knowledge. Courses, frameworks, students, ventures. All mapped, connected, navigable.</p>
        <div style="padding:2rem;border-radius:0.75rem;background:rgba(30,58,95,0.06);border:1px solid rgba(30,58,95,0.15);text-align:center;margin-bottom:1.5rem;min-height:12rem;display:flex;align-items:center;justify-content:center;">
          <div>
            <p style="font-size:0.85rem;opacity:0.5;margin-bottom:0.75rem;">[LIVE DEMO: Knowledge Mesh Visualisation]</p>
            <p style="font-size:0.92rem;opacity:0.4;">Silhouette of Wayne formed by the knowledge he created.<br/>Community stories toggle on to fill the negative space he left behind.</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(184,134,11,0.15);background:rgba(184,134,11,0.03);">
            <p style="font-size:0.92rem;font-weight:600;color:#b8860b;">Outline: Wayne's body of work</p>
            <p style="font-size:0.85rem;opacity:0.6;line-height:1.5;margin-top:0.25rem;">Frameworks, courses, methodologies forming the recognisable profile</p>
          </div>
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(109,40,217,0.15);background:rgba(109,40,217,0.03);">
            <p style="font-size:0.92rem;font-weight:600;color:#6d28d9;">Interior: Community stories</p>
            <p style="font-size:0.85rem;opacity:0.6;line-height:1.5;margin-top:0.25rem;">Reflections from students fill the negative space. Toggleable.</p>
          </div>
        </div>`,
    },

    // ─── SLIDE 7: BOOK (LIBRARIES OF THE FUTURE) ────────────────────
    {
      id: "slide-book",
      title: "Libraries of the Future",
      type: "content",
      section: "Viability",
      intent: "Credibility through research. Project page link + screenshot right. Dual doctoral. Publisher interest.",
      html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;">
          <div>
            <h2 style="font-size:1.6rem;margin-bottom:1.25rem;text-align:left;">Libraries of the Future</h2>
            <p style="font-size:1.1rem;line-height:1.8;margin-bottom:1.25rem;">The first-principles research underpinning this platform. How generative AI adoption produces measurable cognitive erosion, and how architectural solutions (the Perceptiosphere) and measurement tools (the Cognitive Vitality Index) can reverse it.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.25rem;">
              <div style="padding:0.75rem 1rem;border-radius:0.4rem;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.1);">
                <p style="font-size:0.95rem;font-weight:600;color:#065f46;">DBA</p>
                <p style="font-size:0.85rem;opacity:0.6;margin-top:0.2rem;">Golden Gate University</p>
              </div>
              <div style="padding:0.75rem 1rem;border-radius:0.4rem;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.1);">
                <p style="font-size:0.95rem;font-weight:600;color:#065f46;">DDes</p>
                <p style="font-size:0.85rem;opacity:0.6;margin-top:0.2rem;">University of Calgary</p>
              </div>
            </div>
            <p style="font-size:0.92rem;opacity:0.6;margin-bottom:1rem;">Under review: Taylor & Francis (Chapman Hall / CRC Press)</p>
            <div style="padding:0.75rem 1rem;border-radius:0.4rem;background:rgba(184,134,11,0.04);border:1px solid rgba(184,134,11,0.12);">
              <p style="font-size:0.92rem;color:#b8860b;font-weight:500;">findcongwang.com/projects/libraries-of-the-future</p>
            </div>
          </div>
          <div style="border-radius:0.5rem;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 4px 12px rgba(0,0,0,0.08);">
            <img src="/images/presentations/book-project.png" alt="Libraries of the Future project page" style="width:100%;height:auto;display:block;" onerror="this.style.display='none';this.parentElement.innerHTML='<p style=\\'font-size:0.85rem;opacity:0.4;text-align:center;padding:3rem;\\'>Project page screenshot<br/>(place screenshot here)</p>'" />
          </div>
        </div>`,
    },

    // ─── SLIDE 8: TEAM ──────────────────────────────────────────────
    {
      id: "slide-team",
      title: "Team and Coalition",
      type: "content",
      section: "Viability",
      intent: "Francis bio front and centre with highlighted attributes. Team below. Universities at bottom as foundation. Large fonts.",
      html: `<h2 style="font-size:1.6rem;margin-bottom:1.25rem;text-align:left;">Team and Coalition</h2>
        <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(184,134,11,0.2);background:rgba(184,134,11,0.03);margin-bottom:1.25rem;">
          <p style="font-size:1.2rem;font-weight:700;margin-bottom:0.5rem;">Francis Wang</p>
          <p style="font-size:1.05rem;line-height:1.8;"><mark style="background:rgba(184,134,11,0.1);padding:0.05rem 0.3rem;border-radius:0.2rem;">Dual doctoral researcher</mark> (DBA + DDes) synthesising futures research into frameworks for building a better society. <br/> <mark style="background:rgba(30,58,95,0.1);padding:0.05rem 0.3rem;border-radius:0.2rem;">Over a decade of startup practice</mark> with notable exits (Opus One \u2192 GE Vernova $75M acquisition; Swell Energy Series B at $650M). <br/> <mark style="background:rgba(6,95,70,0.1);padding:0.05rem 0.3rem;border-radius:0.2rem;">Staff-level AI/ML engineering</mark> leading fleet-scale distributed systems. <br/> Creator of the <mark style="background:rgba(109,40,217,0.1);padding:0.05rem 0.3rem;border-radius:0.2rem;">APPETITE foresight model</mark> for long-term sustainable innovation.</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:0.75rem;margin-bottom:1.25rem;">
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(30,58,95,0.1);">
            <p style="font-weight:700;font-size:0.95rem;">Barry Wylant</p>
            <p style="font-size:0.85rem;opacity:0.65;margin-top:0.2rem;">Advisor. Active Library theory.</p>
            <p style="font-size:0.82rem;opacity:0.55;margin-top:0.3rem;line-height:1.5;">Supervises the design methodology and validates the Perceptiosphere as a knowledge architecture.</p>
          </div>
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(30,58,95,0.1);">
            <p style="font-weight:700;font-size:0.95rem;">Larry Smith</p>
            <p style="font-size:0.85rem;opacity:0.65;margin-top:0.2rem;">Advisor. Innovation ecosystems.</p>
            <p style="font-size:0.82rem;opacity:0.55;margin-top:0.3rem;line-height:1.5;">Provides institutional access and validates the knowledge succession model at UWaterloo.</p>
          </div>
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(30,58,95,0.1);">
            <p style="font-weight:700;font-size:0.95rem;">Arwin Tio</p>
            <p style="font-size:0.85rem;opacity:0.65;margin-top:0.2rem;">Tech Lead. Neo4j, graphs.</p>
            <p style="font-size:0.82rem;opacity:0.55;margin-top:0.3rem;line-height:1.5;">Builds the graph database infrastructure and API layer powering the knowledge mesh.</p>
          </div>
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(30,58,95,0.1);">
            <p style="font-weight:700;font-size:0.95rem;">Alex Li</p>
            <p style="font-size:0.85rem;opacity:0.65;margin-top:0.2rem;">Design. Dir. Product, RBC.</p>
            <p style="font-size:0.82rem;opacity:0.55;margin-top:0.3rem;line-height:1.5;">Designs the constellation interface to make complex knowledge navigable for non-specialists.</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;padding-top:1rem;border-top:1px solid rgba(0,0,0,0.06);">
          <div style="text-align:center;">
            <p style="font-size:1.05rem;font-weight:700;color:#b8860b;">Golden Gate University</p>
            <p style="font-size:0.85rem;opacity:0.5;">DBA Programme</p>
          </div>
          <div style="text-align:center;">
            <p style="font-size:1.05rem;font-weight:700;color:#1e3a5f;">University of Calgary</p>
            <p style="font-size:0.85rem;opacity:0.5;">DDes Programme</p>
          </div>
          <div style="text-align:center;">
            <p style="font-size:1.05rem;font-weight:700;color:#065f46;">University of Waterloo</p>
            <p style="font-size:0.85rem;opacity:0.5;">Wayne's Legacy + Conrad School</p>
          </div>
        </div>`,
    },

    // ─── SLIDE 9: THE ASK ───────────────────────────────────────────
    {
      id: "slide-ask",
      title: "The Ask",
      type: "title",
      section: "Close",
      layout: "title-anchored",
      intent: "Conclusive. High contrast. $15K. Open-source release + art installation + commercial tools. 'Map your institution's intellectual legacy.'",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center" style="text-align:left;max-width:36rem;">
          <p style="font-size:3rem;font-weight:700;margin-bottom:1.5rem;">$15,000</p>
          <div style="font-size:0.95rem;line-height:2.2;margin-bottom:2rem;">
            <p>\u2192 Open-source protocol release to communities</p>
            <p>\u2192 Art installation honouring Wayne's legacy, donated to UWaterloo</p>
            <p>\u2192 All tools prepared for commercial deployment</p>
          </div>
          <div style="width:4rem;height:1px;background:rgba(30,58,95,0.15);margin-bottom:2rem;"></div>
          <p style="font-size:1.3rem;font-weight:600;color:#b8860b;">Are you losing knowledge from your institutional legacy?</p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.82rem;">Francis Wang</div>
          <div style="font-size:0.85rem;opacity:0.5;">findcongwang@gmail.com</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.85rem;opacity:0.4;">The Perceptiosphere: Living Archive</div>
          <div style="font-size:0.85rem;opacity:0.4;">Cooperathon 2026 — University Research Track</div>
        </div>
      </div>`,
    },

    // ─── APPENDIX: BUSINESS MODEL ───────────────────────────────────
    {
      id: "slide-business-model",
      title: "Business Model",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'How do you make money?' Q&A. Build-to-manage model.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">Build-to-Manage Model</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;">
          <div>
            <p style="font-weight:600;font-size:0.85rem;color:#065f46;margin-bottom:0.75rem;">Revenue Streams</p>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(6,95,70,0.15);background:rgba(6,95,70,0.03);">
                <p style="font-size:0.82rem;font-weight:600;">Setup fee: $50\u2013150K</p>
                <p style="font-size:0.85rem;opacity:0.6;margin-top:0.2rem;">Process institutional data into interactive knowledge constellation</p>
              </div>
              <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(6,95,70,0.15);background:rgba(6,95,70,0.03);">
                <p style="font-size:0.82rem;font-weight:600;">Recurring SaaS: $10\u201330K/year</p>
                <p style="font-size:0.85rem;opacity:0.6;margin-top:0.2rem;">Management, hosting, ongoing AI curation, community features</p>
              </div>
            </div>
          </div>
          <div>
            <p style="font-weight:600;font-size:0.85rem;color:#1e3a5f;margin-bottom:0.75rem;">Market</p>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(30,58,95,0.12);background:rgba(30,58,95,0.03);">
                <p style="font-size:0.82rem;font-weight:600;">B2B Primary</p>
                <p style="font-size:0.85rem;opacity:0.6;margin-top:0.2rem;">Universities, research institutions, large organisations</p>
              </div>
              <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(30,58,95,0.12);background:rgba(30,58,95,0.03);">
                <p style="font-size:0.82rem;font-weight:600;">B2B2C Secondary</p>
                <p style="font-size:0.85rem;opacity:0.6;margin-top:0.2rem;">Institutions provide access; students and alumni contribute and benefit</p>
              </div>
            </div>
          </div>
        </div>
        <div style="padding:1rem 1.25rem;border-radius:0.5rem;background:rgba(184,134,11,0.04);border:1px solid rgba(184,134,11,0.12);">
          <p style="font-size:0.82rem;line-height:1.6;opacity:0.8;">Global KM market: $10B+. Every university and large organisation is a potential customer. Seven-figure company trajectory.</p>
        </div>`,
    },

    // ─── APPENDIX: COMPETITOR COMPARISON ─────────────────────────────
    {
      id: "slide-competitor",
      title: "Competitive Landscape",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'How is this different?' Q&A. Table format.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">What Exists vs. What We Build</h2>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:0.92rem;">
            <thead>
              <tr style="border-bottom:2px solid rgba(30,58,95,0.15);">
                <th style="text-align:left;padding:0.5rem 0.75rem;font-weight:600;">Platform</th>
                <th style="text-align:left;padding:0.5rem 0.75rem;font-weight:600;">Scope</th>
                <th style="text-align:left;padding:0.5rem 0.75rem;font-weight:600;">Gap</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <td style="padding:0.5rem 0.75rem;">Notion, Obsidian, Roam</td>
                <td style="padding:0.5rem 0.75rem;">Personal knowledge</td>
                <td style="padding:0.5rem 0.75rem;color:#7c2d12;">Individual only. No institutional layer.</td>
              </tr>
              <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <td style="padding:0.5rem 0.75rem;">Confluence, SharePoint</td>
                <td style="padding:0.5rem 0.75rem;">Enterprise KM</td>
                <td style="padding:0.5rem 0.75rem;color:#7c2d12;">Fails at tacit knowledge. No sovereignty.</td>
              </tr>
              <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <td style="padding:0.5rem 0.75rem;">Connected Papers, Semantic Scholar</td>
                <td style="padding:0.5rem 0.75rem;">Academic citation graphs</td>
                <td style="padding:0.5rem 0.75rem;color:#7c2d12;">Citations only. No teaching legacy, no community.</td>
              </tr>
              <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
                <td style="padding:0.5rem 0.75rem;">Legacy.com, StoryCorps</td>
                <td style="padding:0.5rem 0.75rem;">Memory preservation</td>
                <td style="padding:0.5rem 0.75rem;color:#7c2d12;">Not navigable or composable. Static.</td>
              </tr>
              <tr>
                <td style="padding:0.5rem 0.75rem;font-weight:600;color:#065f46;">Perceptiosphere</td>
                <td style="padding:0.5rem 0.75rem;color:#065f46;">Sovereign \u2194 Collective bridge</td>
                <td style="padding:0.5rem 0.75rem;color:#065f46;font-weight:500;">Living, navigable, composable. Both individual and institutional.</td>
              </tr>
            </tbody>
          </table>
        </div>`,
    },

    // ─── APPENDIX: CORE PROTOCOL ────────────────────────────────────
    {
      id: "slide-core-protocol",
      title: "CORE Protocol",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'What is the research methodology?' Q&A.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">The CORE Protocol</h2>
        <p style="font-size:0.88rem;opacity:0.7;margin-bottom:1.5rem;">Original research methodology that governs how knowledge moves through the system.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:1rem;">
          <div style="padding:1.25rem;border-radius:0.5rem;text-align:center;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.12);">
            <p style="font-size:1.5rem;font-weight:700;color:#1e3a5f;">C</p>
            <p style="font-size:0.92rem;font-weight:600;margin-top:0.5rem;">Collect</p>
            <p style="font-size:0.82rem;opacity:0.6;margin-top:0.3rem;">Raw inputs from all sources</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;text-align:center;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.12);">
            <p style="font-size:1.5rem;font-weight:700;color:#065f46;">O</p>
            <p style="font-size:0.92rem;font-weight:600;margin-top:0.5rem;">Organise</p>
            <p style="font-size:0.82rem;opacity:0.6;margin-top:0.3rem;">AI decomposition into semantic atoms</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;text-align:center;background:rgba(184,134,11,0.04);border:1px solid rgba(184,134,11,0.12);">
            <p style="font-size:1.5rem;font-weight:700;color:#b8860b;">R</p>
            <p style="font-size:0.92rem;font-weight:600;margin-top:0.5rem;">Reflect</p>
            <p style="font-size:0.82rem;opacity:0.6;margin-top:0.3rem;">Human validation, connection, curation</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;text-align:center;background:rgba(109,40,217,0.04);border:1px solid rgba(109,40,217,0.12);">
            <p style="font-size:1.5rem;font-weight:700;color:#6d28d9;">E</p>
            <p style="font-size:0.92rem;font-weight:600;margin-top:0.5rem;">Execute</p>
            <p style="font-size:0.82rem;opacity:0.6;margin-top:0.3rem;">Deploy as navigable, living knowledge</p>
          </div>
        </div>`,
    },

    // ─── APPENDIX: SDG ALIGNMENT ────────────────────────────────────
    {
      id: "slide-sdg",
      title: "SDG Alignment",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'How does this create social impact?' Q&A.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">Sustainable Development Goals</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;">
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(6,95,70,0.15);background:rgba(6,95,70,0.03);">
            <p style="font-size:1.2rem;font-weight:700;color:#065f46;margin-bottom:0.5rem;">SDG 4</p>
            <p style="font-size:0.92rem;font-weight:600;margin-bottom:0.5rem;">Quality Education</p>
            <p style="font-size:0.85rem;opacity:0.7;line-height:1.5;">Self-determined learning pathways from collective knowledge. Students build on intellectual lineage.</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(30,58,95,0.15);background:rgba(30,58,95,0.03);">
            <p style="font-size:1.2rem;font-weight:700;color:#1e3a5f;margin-bottom:0.5rem;">SDG 9</p>
            <p style="font-size:0.92rem;font-weight:600;margin-bottom:0.5rem;">Innovation Infrastructure</p>
            <p style="font-size:0.85rem;opacity:0.7;line-height:1.5;">Open-source blueprints enable any institution to adopt. Knowledge infrastructure as innovation enabler.</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(109,40,217,0.15);background:rgba(109,40,217,0.03);">
            <p style="font-size:1.2rem;font-weight:700;color:#6d28d9;margin-bottom:0.5rem;">SDG 10</p>
            <p style="font-size:0.92rem;font-weight:600;margin-bottom:0.5rem;">Reduced Inequalities</p>
            <p style="font-size:0.85rem;opacity:0.7;line-height:1.5;">Open-source reduces knowledge equity gap. Community contribution means resource-limited institutions can participate.</p>
          </div>
        </div>`,
    },

    // ─── APPENDIX: CORE PROCESS (FULL IMAGE) ────────────────────────
    {
      id: "slide-core-image",
      title: "CORE Process (Expanded)",
      type: "appendix",
      section: "Appendix",
      intent: "Full-page CORE process diagram. Visual backup for methodology questions.",
      html: `<div style="display:flex;align-items:center;justify-content:center;height:100%;padding:1rem;">
        <img src="/images/presentations/core-process.png" alt="CORE Process: Collect, Organise, Reflect, Execute" style="max-width:100%;max-height:85vh;object-fit:contain;border-radius:0.5rem;" />
      </div>`,
    },

    // ─── APPENDIX: ACCESS SCHEMA ────────────────────────────────────
    {
      id: "slide-access-schema",
      title: "ACCESS Schema",
      type: "appendix",
      section: "Appendix",
      intent: "Schema description at comfortable reading width. Backup for 'How is knowledge structured?' Q&A.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">The ACCESS Schema</h2>
        <div style="max-width:28rem;">
          <p style="font-size:0.92rem;line-height:1.8;margin-bottom:1rem;">A seven-field metadata schema governing how knowledge atoms are structured, connected, and made composable across sovereign boundaries.</p>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.1);font-size:0.92rem;"><strong>A</strong>ttribution \u2014 Source provenance and authorship</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.1);font-size:0.92rem;"><strong>C</strong>ontext \u2014 Where knowledge lives and applies</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.1);font-size:0.92rem;"><strong>C</strong>onnection \u2014 Typed relationships to other atoms</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.1);font-size:0.92rem;"><strong>E</strong>vidence \u2014 Confidence scoring and verification</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.1);font-size:0.92rem;"><strong>S</strong>overeignty \u2014 Ownership and permission boundaries</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(30,58,95,0.04);border:1px solid rgba(30,58,95,0.1);font-size:0.92rem;"><strong>S</strong>tate \u2014 Lifecycle and temporal evolution</div>
          </div>
        </div>`,
    },

    // ─── APPENDIX: FORGE PROCESS ────────────────────────────────────
    {
      id: "slide-forge-process",
      title: "FORGE Process",
      type: "appendix",
      section: "Appendix",
      intent: "FORGE evolution cycle at comfortable reading width. Backup for 'How do AI agents improve?' Q&A.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">The FORGE Evolution Cycle</h2>
        <div style="max-width:28rem;">
          <p style="font-size:0.92rem;line-height:1.8;margin-bottom:1rem;">A continuous improvement protocol for AI agents that curate institutional knowledge. Ensures the system learns and adapts alongside the community it serves.</p>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.1);font-size:0.92rem;"><strong>F</strong>eedback \u2014 Collect signals from human curators</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.1);font-size:0.92rem;"><strong>O</strong>bserve \u2014 Identify patterns in agent performance</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.1);font-size:0.92rem;"><strong>R</strong>efine \u2014 Propose and test improvements</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.1);font-size:0.92rem;"><strong>G</strong>raduate \u2014 Promote to next maturity stage</div>
            <div style="padding:0.4rem 0.85rem;border-radius:0.3rem;background:rgba(6,95,70,0.04);border:1px solid rgba(6,95,70,0.1);font-size:0.92rem;"><strong>E</strong>volve \u2014 Integrate into the living system</div>
          </div>
        </div>`,
    },

    // ─── APPENDIX: MY RESEARCH ──────────────────────────────────────
    {
      id: "slide-my-research",
      title: "My Research",
      type: "appendix",
      section: "Appendix",
      intent: "Research domains and driving questions from findcongwang.com homepage. The 'Why Work in Sustainability' poem grounds the moral foundation.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:1.5rem;">My Research</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
          <div style="padding:1rem 1.25rem;border-radius:0.5rem;border-left:3px solid #b8860b;background:rgba(184,134,11,0.03);">
            <p style="font-size:1rem;font-weight:700;color:#b8860b;margin-bottom:0.4rem;">Design and Futures Studies</p>
            <p style="font-size:0.95rem;line-height:1.6;opacity:0.8;">How do we bring intention into innovating toward the right initiatives for long-term interests?</p>
          </div>
          <div style="padding:1rem 1.25rem;border-radius:0.5rem;border-left:3px solid #1e3a5f;background:rgba(30,58,95,0.03);">
            <p style="font-size:1rem;font-weight:700;color:#1e3a5f;margin-bottom:0.4rem;">Business, Technology, and Entrepreneurship</p>
            <p style="font-size:0.95rem;line-height:1.6;opacity:0.8;">How do we build organisations and societal structures at scale to facilitate these initiatives?</p>
          </div>
          <div style="padding:1rem 1.25rem;border-radius:0.5rem;border-left:3px solid #065f46;background:rgba(6,95,70,0.03);">
            <p style="font-size:1rem;font-weight:700;color:#065f46;margin-bottom:0.4rem;">Learning Science and Knowledge Management</p>
            <p style="font-size:0.95rem;line-height:1.6;opacity:0.8;">How do we redesign education to prepare the workforce in order to deliver these initiatives?</p>
          </div>
          <div style="padding:1rem 1.25rem;border-radius:0.5rem;border-left:3px solid #6d28d9;background:rgba(109,40,217,0.03);">
            <p style="font-size:1rem;font-weight:700;color:#6d28d9;margin-bottom:0.4rem;">Sustainable Development, Health, Fitness, and Longevity</p>
            <p style="font-size:0.95rem;line-height:1.6;opacity:0.8;">How do we keep these individual and systemic processes going forever?</p>
          </div>
        </div>
        <div style="padding:1.25rem 1.5rem;border-radius:0.5rem;background:rgba(30,58,95,0.03);border:1px solid rgba(30,58,95,0.1);">
          <p style="font-size:0.95rem;line-height:1.8;font-style:italic;opacity:0.85;">The industrial revolution was humanity\u2019s withdrawal from the Earth\u2019s trust fund \u2014 a finite reserve built over eons. This investment gave us unprecedented power and understanding, but it left us with a debt that must now be repaid.</p>
          <p style="font-size:0.95rem;line-height:1.8;font-style:italic;opacity:0.85;margin-top:0.75rem;">To be born in this era is to inherit both humanity\u2019s greatest knowledge and its greatest debt. It is our responsibility to use what we\u2019ve learned to restore balance, for the cost of inaction is ruin.</p>
          <p style="font-size:0.88rem;margin-top:1rem;opacity:0.6;">\u2014 Francis Wang, \u201CWhy Work in Sustainability\u201D</p>
        </div>`,
    },
  ],

  story: {
    type: "steps",
    visualisation: "wordcloud",
    steps: [
      { id: "step-1", label: "Legacy", thread: "succession", conceptsAdded: ["institutional memory", "living archive", "knowledge succession"] },
      { id: "step-2", label: "Wayne", thread: "succession", conceptsAdded: ["Wayne H. Chang", "super-connector", "innovation community", "1,000 students", "700 ventures", "societal good"] },
      { id: "step-3", label: "Crisis", thread: "problem", conceptsAdded: ["80% tacit", "$31.5B lost annually", "undiscovered", "unmapped", "cross-generational collaboration"] },
      { id: "step-4", label: "Vision", thread: "vision", conceptsAdded: ["atrium wall", "constellation", "feel small yet connected", "navigate gaps", "determined human endeavour"], conceptsFaded: ["undiscovered"] },
      { id: "step-4b", label: "Layers", thread: "protocol", conceptsAdded: ["Perceptiosphere", "tacit", "trusted circle", "community of practice", "public", "spatial relationship"] },
      { id: "step-5", label: "Protocol", thread: "protocol", conceptsAdded: ["CORE protocol", "knowledge mesh", "new asset class", "AI decomposition", "community contribution"] },
      { id: "step-6", label: "Constellation", thread: "vision", conceptsAdded: ["silhouette", "negative space", "stories filling gaps", "living not static"], conceptsFaded: ["80% tacit"] },
      { id: "step-7", label: "Research", thread: "protocol", conceptsAdded: ["Libraries of the Future", "dual doctoral", "Taylor & Francis", "Cognitive Vitality Index"] },
      { id: "step-8", label: "Coalition", thread: "succession", conceptsAdded: ["multi-university", "open-source", "build-to-manage", "startup exits"] },
      { id: "step-9", label: "Legacy Lives", thread: "vision", conceptsAdded: ["map your legacy", "art installation", "knowledge compounds across generations"] },
    ],
    threadColors: {
      succession: "#b8860b",
      problem: "#7c2d12",
      vision: "#1e3a5f",
      protocol: "#065f46",
      community: "#6d28d9",
    },
  },

  anchors: [
    { slideId: "slide-title", storyStepId: "step-1" },
    { slideId: "slide-hook", storyStepId: "step-2" },
    { slideId: "slide-problem", storyStepId: "step-3" },
    { slideId: "slide-vision", storyStepId: "step-4" },
    { slideId: "slide-perceptiosphere", storyStepId: "step-4b" },
    { slideId: "slide-solution", storyStepId: "step-5" },
    { slideId: "slide-demo", storyStepId: "step-6" },
    { slideId: "slide-book", storyStepId: "step-7" },
    { slideId: "slide-team", storyStepId: "step-8" },
    { slideId: "slide-ask", storyStepId: "step-9" },
  ],
};
