import type { DualTrackPresentation } from "../types-v2";

/**
 * Cooperathon 2026 — Planet Track Pitch (v4)
 * Climate Action Knowledge Map
 *
 * Colour palette: #0c1b16 (dark) | #9bd17a (green) | #6c557e (purple) | #3e6e8e (blue)
 * Narrative: Audience as hero. Guide enables collaboration.
 * All content left-aligned. Footnotes on data claims.
 * Images from /images/presentations/cooperathon-planet/
 */

export const cooperathonPlanetData: DualTrackPresentation = {
  title: "Climate Action Knowledge Map",
  subtitle: "Cooperathon 2026 \u2014 Planet Track",
  author: "Francis Wang",
  date: "2026-07",
  duration: 5,

  slides: [
    // ─── SLIDES 1-4: Hook and Problem (content matches pitch-5min.md manual edits) ───
    {
      id: "slide-title",
      title: "Title",
      type: "title",
      section: "Opening",
      layout: "title-anchored",
      intent: "Establish identity. Composable knowledge for climate action. Signal collaborative, community-curated nature.",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center">
          <h1 style="font-size:3.2rem;line-height:1.1;text-align:left;">Climate Action Knowledge Map</h1>
          <p class="gestalt-slide__subtitle" style="margin-top:1rem;font-size:1.05rem;opacity:0.6;max-width:36rem;text-align:left;">Composable knowledge for regenerative practice. Curated by practitioners. Governed by communities.</p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.85rem;">Francis Wang</div>
          <div style="font-size:0.75rem;opacity:0.5;">Cooperathon 2026 \u2014 Planet Track</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.75rem;opacity:0.5;">July 2, 2026</div>
        </div>
      </div>`,
    },
    {
      id: "slide-hook-disconnected",
      title: "Disconnected Practitioners",
      type: "content",
      section: "Problem",
      intent: "The hook: millions of practitioners solving climate problems in isolation. Visual: scattered dots. Name practice domains to show breadth.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1.5rem;">Millions of Practitioners.<br/>Solving Climate Problems in Isolation.</h2>
        <svg viewBox="0 0 600 260" style="width:100%;max-width:36rem;margin:0 0 1.5rem 0;display:block;" xmlns="http://www.w3.org/2000/svg">
          <circle cx="85" cy="55" r="22" fill="rgba(155,209,122,0.15)" stroke="#9bd17a" stroke-width="1.5"/>
          <text x="85" y="59" text-anchor="middle" font-size="8" fill="#0c1b16" font-family="Geist, sans-serif">Permaculturists</text>
          <circle cx="260" cy="32" r="22" fill="rgba(62,110,142,0.12)" stroke="#3e6e8e" stroke-width="1.5"/>
          <text x="260" y="36" text-anchor="middle" font-size="8" fill="#0c1b16" font-family="Geist, sans-serif">Natural Builders</text>
          <circle cx="470" cy="50" r="22" fill="rgba(108,85,126,0.12)" stroke="#6c557e" stroke-width="1.5"/>
          <text x="470" y="54" text-anchor="middle" font-size="8" fill="#0c1b16" font-family="Geist, sans-serif">Regen Farmers</text>
          <circle cx="140" cy="165" r="22" fill="rgba(62,110,142,0.12)" stroke="#3e6e8e" stroke-width="1.5"/>
          <text x="140" y="169" text-anchor="middle" font-size="8" fill="#0c1b16" font-family="Geist, sans-serif">Ecological Design</text>
          <circle cx="370" cy="150" r="22" fill="rgba(108,85,126,0.12)" stroke="#6c557e" stroke-width="1.5"/>
          <text x="370" y="154" text-anchor="middle" font-size="8" fill="#0c1b16" font-family="Geist, sans-serif">Indigenous Stewards</text>
          <circle cx="530" cy="180" r="22" fill="rgba(155,209,122,0.15)" stroke="#9bd17a" stroke-width="1.5"/>
          <text x="530" y="184" text-anchor="middle" font-size="8" fill="#0c1b16" font-family="Geist, sans-serif">Resilience Orgs</text>
          <circle cx="55" cy="235" r="22" fill="rgba(62,110,142,0.12)" stroke="#3e6e8e" stroke-width="1.5"/>
          <text x="55" y="239" text-anchor="middle" font-size="7.5" fill="#0c1b16" font-family="Geist, sans-serif">Living Building</text>
        </svg>
        <p style="font-size:1rem;line-height:1.7;max-width:36rem;">Each community holds extraordinary knowledge validated by decades of practice. From fire resilience, water management, to natural building practices with radically different supply chain impacts.</p>
        <p style="font-size:1rem;line-height:1.7;max-width:36rem;margin-top:0.75rem;">Right now, these practices are not connected. Each community rebuilds understanding within its domain. Something validated in one region could save another community ten years of trial. But the knowledge stays isolated.</p>`,
    },
    {
      id: "slide-hook-connected",
      title: "Connected Through Knowledge",
      type: "content",
      section: "Problem",
      intent: "The contrast: same dots, now connected. The 'what if' moment. Audience sees the possibility.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1.5rem;">What If This Knowledge Were Composable?</h2>
        <svg viewBox="0 0 600 260" style="width:100%;max-width:36rem;margin:0 0 1.5rem 0;display:block;" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="130" r="28" fill="rgba(155,209,122,0.1)" stroke="#9bd17a" stroke-width="2"/>
          <text x="300" y="126" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#0c1b16" font-family="Geist, sans-serif">Knowledge</text>
          <text x="300" y="138" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#0c1b16" font-family="Geist, sans-serif">Map</text>
          <line x1="300" y1="130" x2="85" y2="55" stroke="rgba(12,27,22,0.12)" stroke-width="1"/>
          <circle cx="85" cy="55" r="20" fill="rgba(155,209,122,0.12)" stroke="#9bd17a" stroke-width="1.5"/>
          <text x="85" y="59" text-anchor="middle" font-size="7.5" fill="#0c1b16" font-family="Geist, sans-serif">Permaculturists</text>
          <line x1="300" y1="130" x2="260" y2="32" stroke="rgba(12,27,22,0.12)" stroke-width="1"/>
          <circle cx="260" cy="32" r="20" fill="rgba(62,110,142,0.12)" stroke="#3e6e8e" stroke-width="1.5"/>
          <text x="260" y="36" text-anchor="middle" font-size="7.5" fill="#0c1b16" font-family="Geist, sans-serif">Natural Builders</text>
          <line x1="300" y1="130" x2="490" y2="50" stroke="rgba(12,27,22,0.12)" stroke-width="1"/>
          <circle cx="490" cy="50" r="20" fill="rgba(108,85,126,0.12)" stroke="#6c557e" stroke-width="1.5"/>
          <text x="490" y="54" text-anchor="middle" font-size="7.5" fill="#0c1b16" font-family="Geist, sans-serif">Regen Farmers</text>
          <line x1="300" y1="130" x2="120" y2="210" stroke="rgba(12,27,22,0.12)" stroke-width="1"/>
          <circle cx="120" cy="210" r="20" fill="rgba(62,110,142,0.12)" stroke="#3e6e8e" stroke-width="1.5"/>
          <text x="120" y="214" text-anchor="middle" font-size="7.5" fill="#0c1b16" font-family="Geist, sans-serif">Ecological Design</text>
          <line x1="300" y1="130" x2="420" y2="220" stroke="rgba(12,27,22,0.12)" stroke-width="1"/>
          <circle cx="420" cy="220" r="20" fill="rgba(108,85,126,0.12)" stroke="#6c557e" stroke-width="1.5"/>
          <text x="420" y="224" text-anchor="middle" font-size="7.5" fill="#0c1b16" font-family="Geist, sans-serif">Indigenous Stewards</text>
          <line x1="300" y1="130" x2="530" y2="180" stroke="rgba(12,27,22,0.12)" stroke-width="1"/>
          <circle cx="530" cy="180" r="20" fill="rgba(155,209,122,0.12)" stroke="#9bd17a" stroke-width="1.5"/>
          <text x="530" y="184" text-anchor="middle" font-size="7.5" fill="#0c1b16" font-family="Geist, sans-serif">Resilience Orgs</text>
          <line x1="300" y1="130" x2="60" y2="130" stroke="rgba(12,27,22,0.12)" stroke-width="1"/>
          <circle cx="60" cy="130" r="20" fill="rgba(62,110,142,0.12)" stroke="#3e6e8e" stroke-width="1.5"/>
          <text x="60" y="134" text-anchor="middle" font-size="7.5" fill="#0c1b16" font-family="Geist, sans-serif">Living Building</text>
          <line x1="85" y1="55" x2="260" y2="32" stroke="rgba(12,27,22,0.06)" stroke-width="0.75" stroke-dasharray="3,3"/>
          <line x1="490" y1="50" x2="420" y2="220" stroke="rgba(12,27,22,0.06)" stroke-width="0.75" stroke-dasharray="3,3"/>
          <line x1="120" y1="210" x2="60" y2="130" stroke="rgba(12,27,22,0.06)" stroke-width="0.75" stroke-dasharray="3,3"/>
        </svg>
        <p style="font-size:1rem;line-height:1.7;max-width:36rem;">An open-access knowledge map where practitioner communities curate understanding together in a collaboration that benefits all parties. Resolving both the <strong>equity of access</strong> and the <strong>fairness of access</strong> to this knowledge.</p>`,
    },
    {
      id: "slide-why-fails",
      title: "Why Current Tools Fail",
      type: "content",
      section: "Problem",
      intent: "Pre-empt AI objection. Establish structural gap. Cite the 30-year knowledge-action gap with footnote.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1.5rem;">Existing Tools Do Not Serve These Communities</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;">
          <div style="padding:1.5rem;border-radius:0.75rem;background:rgba(108,85,126,0.05);border:1px solid rgba(108,85,126,0.2);">
            <p style="font-weight:700;font-size:0.95rem;color:#6c557e;margin-bottom:0.75rem;">What Exists Today</p>
            <ul style="font-size:0.92rem;line-height:2.2;list-style:none;padding:0;">
              <li>\u2022 AI search: generic answers, no bioregional depth</li>
              <li>\u2022 Books: author-specific, non-composable, static</li>
              <li>\u2022 Workshops: expensive, location-bound, disappear</li>
              <li>\u2022 Open databases: data without understanding</li>
              <li>\u2022 No withdrawal: deepest knowledge stays hidden</li>
            </ul>
          </div>
          <div style="padding:1.5rem;border-radius:0.75rem;background:rgba(155,209,122,0.06);border:1px solid rgba(155,209,122,0.25);">
            <p style="font-weight:700;font-size:0.95rem;color:#3e6e8e;margin-bottom:0.75rem;">What Practitioners Need</p>
            <ul style="font-size:0.92rem;line-height:2.2;list-style:none;padding:0;">
              <li>\u2022 First-principle mechanisms (WHY it works)</li>
              <li>\u2022 Adapted to their climate, soil, context</li>
              <li>\u2022 Validated by practitioners who do this work</li>
              <li>\u2022 <mark style="background:rgba(155,209,122,0.25);padding:0.1rem 0.3rem;border-radius:0.2rem;">Composable: rebuilds for YOUR situation</mark></li>
              <li>\u2022 Transferable across climate analogues</li>
            </ul>
          </div>
        </div>
        <p style="font-size:0.92rem;max-width:38rem;"><strong>Thirty years</strong> of documented knowledge-action gap.\u00B9 Solutions exist. They do not reach the people who farm, build, and steward the land.</p>
        <p style="font-size:0.72rem;opacity:0.45;margin-top:1rem;">\u00B9 Dura et al. (2026), "Still reading Gaelic poetry to deaf seagulls?" <em>Forestry Chronicle</em>. doi:10.5558/tfc2026-018</p>`,
    },

    // ─── SLIDE 5: The Knowledge Map (with image) ────────────────────
    {
      id: "slide-solution-map",
      title: "The Knowledge Map",
      type: "content",
      section: "Solution",
      intent: "Primary innovation: composable first-principle knowledge curated by practitioner communities. Show the work-in-progress demo image. Left-aligned. Footnote research link.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1rem;">Composable Knowledge, Curated by People Who Practise</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;margin-bottom:1rem;">
          <p style="font-size:0.88rem;line-height:1.5;"><strong style="color:#9bd17a;">Compose</strong> \u2014 Knowledge decomposed into first-principle mechanisms. Building blocks you reconstruct for your conditions.</p>
          <p style="font-size:0.88rem;line-height:1.5;"><strong style="color:#3e6e8e;">Navigate</strong> \u2014 Search by your bioregion, soil, climate. Composed understanding from multiple traditions, validated by practice.</p>
          <p style="font-size:0.88rem;line-height:1.5;"><strong style="color:#6c557e;">Transfer</strong> \u2014 <mark style="background:rgba(155,209,122,0.2);padding:0.1rem 0.3rem;border-radius:0.2rem;">Climate analogues</mark> connect knowledge globally. First principles enable valid cross-bioregion application.\u00B9</p>
        </div>
        <img src="/images/presentations/cooperathon-planet/cakm-knowledge-mesh.png" alt="Climate Action Knowledge Map - work in progress demonstration" style="width:100%;max-width:58rem;object-fit:contain;border-radius:0.75rem;border:1px solid rgba(12,27,22,0.08);" />
        <div style="display:flex;justify-content:space-between;margin-top:0.5rem;">
          <p style="font-size:0.72rem;opacity:0.4;">\u00B9 Climate analogues: Japan\u2019s and North America\u2019s eastern coasts share species and growing patterns, enabling knowledge transfer when mechanisms are understood.</p>
          <p style="font-size:0.7rem;opacity:0.4;">findcongwang.com/projects/libraries-of-the-future</p>
        </div>`,
    },

    // ─── SLIDE 6: Sovereignty (with image) ──────────────────────────
    {
      id: "slide-solution-sovereignty",
      title: "Sovereignty Enables Contribution",
      type: "content",
      section: "Solution",
      intent: "Trust layer enabling comprehensive contribution. Brief and decisive. Show the sovereignty UI screenshot. Left-aligned.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1rem;">The Deepest Knowledge Needs the Strongest Trust</h2>
        <p style="font-size:0.95rem;opacity:0.7;margin-bottom:1.5rem;max-width:36rem;">Indigenous communities hold millennia of validated ecological knowledge. They will contribute when withdrawal is a right, not a request.</p>
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:2rem;align-items:start;">
          <div>
            <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
              <div style="padding:1rem 1.25rem;border-radius:0.5rem;border:1.5px solid rgba(12,27,22,0.1);">
                <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;">1. Define</p>
                <p style="font-size:0.88rem;opacity:0.65;">What to share. With whom. Under what conditions.</p>
              </div>
              <div style="padding:1rem 1.25rem;border-radius:0.5rem;border:1.5px solid rgba(12,27,22,0.1);">
                <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;">2. Govern</p>
                <p style="font-size:0.88rem;opacity:0.65;">Community-defined access rules for all affiliates.</p>
              </div>
              <div style="padding:1rem 1.25rem;border-radius:0.5rem;border:1.5px solid rgba(108,85,126,0.3);background:rgba(108,85,126,0.04);">
                <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;">3. Withdraw</p>
                <p style="font-size:0.88rem;opacity:0.65;">Revoke any time. One action. Cascades everywhere.</p>
              </div>
            </div>
            <div style="padding:1rem 1.5rem;border-radius:0.5rem;background:rgba(12,27,22,0.9);color:#ffffff;">
              <p style="font-size:1rem;font-weight:600;color:#ffffff;">Technically enforced. Not ethically requested.</p>
              <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);margin-top:0.35rem;">When contribution is safe, the knowledge map becomes comprehensive.</p>
            </div>
          </div>
          <div>
            <img src="/images/presentations/cooperathon-planet/cakm-sovereignty.png" alt="Sovereignty withdrawal interface" style="width:100%;border-radius:0.75rem;border:1px solid rgba(12,27,22,0.08);" />
            <p style="font-size:0.7rem;opacity:0.4;margin-top:0.5rem;">Withdrawal UI: one-action sovereignty enforcement</p>
          </div>
        </div>`,
    },

    // ─── SLIDE 7: Traction (with social proof screenshots) ──────────
    {
      id: "slide-traction",
      title: "The Community Is Forming",
      type: "content",
      section: "Traction",
      intent: "Movement assembling. Social proof via overlapping screenshots. UBC workshop as sovereignty validation. SDGs below.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1.5rem;">This Community Is Already Assembling</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;">
          <div>
            <p style="font-weight:700;font-size:0.95rem;color:#3e6e8e;margin-bottom:0.75rem;">Practitioners Contributing</p>
            <div style="position:relative;height:12rem;margin-bottom:0.75rem;">
              <img src="/images/presentations/cooperathon-planet/cakm-lfi-1-post.png" alt="Community post" style="position:absolute;top:0;left:0;width:55%;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.1);box-shadow:0 2px 8px rgba(0,0,0,0.08);" />
              <img src="/images/presentations/cooperathon-planet/cakm-lfi-2.png" alt="Community reaction" style="position:absolute;top:1.5rem;left:48%;width:35%;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.1);box-shadow:0 2px 8px rgba(0,0,0,0.08);" />
              <img src="/images/presentations/cooperathon-planet/cakm-lfi-3.png" alt="Community reaction" style="position:absolute;top:5rem;left:55%;width:30%;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.1);box-shadow:0 2px 8px rgba(0,0,0,0.08);" />
              <img src="/images/presentations/cooperathon-planet/cakm-lfi-4.png" alt="Community reaction" style="position:absolute;top:16rem;left:52%;width:30%;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.1);box-shadow:0 2px 8px rgba(0,0,0,0.08);" />
              <img src="/images/presentations/cooperathon-planet/cakm-lfi-5.png" alt="Community reaction" style="position:absolute;top:10.5rem;left:60%;width:28%;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.1);box-shadow:0 2px 8px rgba(0,0,0,0.08);" />
            </div>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.95rem;color:#6c557e;margin-bottom:0.75rem;">Sovereignty Validation</p>
            <div style="padding:1.25rem;border-radius:0.75rem;border:1.5px solid rgba(108,85,126,0.2);background:rgba(108,85,126,0.03);margin-bottom:1rem;">
              <p style="font-size:0.92rem;line-height:1.7;"><strong>Kimberly Yazzie</strong><br/><span style="opacity:0.7;">UBC, Forest and Conservation Sciences. Indigenous data sovereignty.</span></p>
              <p style="font-size:0.92rem;line-height:1.7;margin-top:0.75rem;"><strong>Erin Trochim</strong><br/><span style="opacity:0.7;">UAF, Google Research Fellow. Cooperative geospatial attention.</span></p>
            </div>
            <div style="padding:0.75rem 1rem;border-radius:0.5rem;background:rgba(155,209,122,0.08);border:1px solid rgba(155,209,122,0.2);margin-bottom:1rem;">
              <p style="font-size:0.88rem;font-weight:600;">In-person workshop: August 6\u20137, 2026 at UBC</p>
              <p style="font-size:0.82rem;opacity:0.6;">Co-designing the first sovereign community instance.</p>
            </div>
            <p style="font-size:0.88rem;opacity:0.6;margin-bottom:0.75rem;">Regenerative practitioners actively seeking composable knowledge infrastructure.</p>
            <div style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.85rem;opacity:0.7;">
              <span><strong>SDG 13</strong> Climate Action</span>
              <span><strong>SDG 15</strong> Life on Land</span>
              <span><strong>SDG 10</strong> Reduced Inequalities</span>
            </div>
          </div>
        </div>`,
    },

    // ─── SLIDE 8: Team ──────────────────────────────────────────────
    {
      id: "slide-team",
      title: "Team",
      type: "content",
      section: "Team",
      intent: "Full team credentials. Substantive bios showing why each person is qualified. Left-aligned, readable font sizes.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1.5rem;">Team</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;">
          <div style="padding:1.25rem;border-radius:0.75rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.95rem;">Francis Wang</p>
            <p style="font-size:0.82rem;opacity:0.7;line-height:1.6;margin-top:0.35rem;">Lead Researcher + System Architect. Dual doctorate: DDes (UCalgary, innovation ecosystems) + DBA (GGU, hybrid intelligence). PINA member. Advanced Permaculture Design (Oregon State). 10+ years AI/ML engineering. $75M exit (GE Vernova). Patent holder in energy markets. MS AI Engineering (Quantic).</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.75rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.95rem;">Maria Smirnova</p>
            <p style="font-size:0.82rem;opacity:0.7;line-height:1.6;margin-top:0.35rem;">Systems Design. Architecture graduate, University of Waterloo. Founder and CEO of TaskMapper. Systems thinking, architectural design methodology. Previously led R&D at Iterra Advanced and creative design for WATonomous (autonomous vehicles).</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.75rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.95rem;">Arwin Tio</p>
            <p style="font-size:0.82rem;opacity:0.7;line-height:1.6;margin-top:0.35rem;">Data Architecture. Senior Software Engineer at Cruise (General Motors), data processing for autonomous vehicles. Previously Staff Engineer at NextRoll leading Data Products. Expertise in distributed systems, graph databases, large-scale data architecture.</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.75rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.95rem;">James Cheng</p>
            <p style="font-size:0.82rem;opacity:0.7;line-height:1.6;margin-top:0.35rem;">Platform Engineering. Software consultant with a decade of digital transformation across aviation, finance, healthcare, and public sector. Staff Software Engineer (Pivotal Labs/VMware). Systems Design Engineering, University of Waterloo.</p>
          </div>
        </div>
        <div style="padding:1rem 1.25rem;border-radius:0.5rem;background:rgba(12,27,22,0.02);border:1px solid rgba(12,27,22,0.06);">
          <p style="font-size:0.88rem;"><strong>William Yao</strong> (Strategic Advisory): Chartered Accountant, ex-Merrill Lynch. 40+ years financial services, corporate innovation, and entrepreneurship. Governance and institutional partnership strategy.</p>
          <p style="font-size:0.82rem;opacity:0.6;margin-top:0.5rem;">External collaborators: <strong>Kimberly Yazzie</strong> (UBC) \u2022 <strong>Erin Trochim</strong> (UAF, Google Research Fellow)</p>
        </div>
        <p style="font-size:0.72rem;opacity:0.4;margin-top:0.75rem;">Full roster: novaromahorizon.org/people</p>`,
    },

    // ─── SLIDE 9: The Ask / Invitation ──────────────────────────────
    {
      id: "slide-ask",
      title: "The Invitation",
      type: "title",
      section: "Ask",
      layout: "title-anchored",
      intent: "Dual CTA. $10K through Nova Roma Horizon to build and make the knowledge base available to the public. Call for contributors sharing embodied and tacit knowledge for the climate mission.",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center" style="text-align:left;max-width:38rem;">
          <p style="font-size:0.88rem;opacity:0.5;margin-bottom:0.75rem;">$10,000 through Nova Roma Horizon non-profit:</p>
          <h2 style="font-size:2rem;line-height:1.3;">Build and make this knowledge base available to the public.</h2>
          <p style="margin-top:1.5rem;font-size:0.95rem;opacity:0.7;line-height:1.7;">The critical mass of knowledge captured and analysed means real benefits to communities. An incentive for practitioners to join, contribute, and gain from this shared effort.</p>
          <p style="margin-top:1.5rem;font-size:1rem;line-height:1.7;">We are calling for all contributors looking to bring their <mark style="background:rgba(155,209,122,0.25);padding:0.1rem 0.4rem;border-radius:0.2rem;">embodied knowledge and tacit knowledge</mark>, sharing with people who care about the climate mission.</p>
          <p style="margin-top:1.5rem;font-size:1.1rem;font-weight:600;color:#3e6e8e;">This community is forming. The invitation is open.</p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.78rem;opacity:0.5;">Revenue: Build-and-manage + Consortium membership</div>
          <div style="font-size:0.78rem;opacity:0.5;">Communities never pay. Affiliates pay for governed access.</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.82rem;">Francis Wang</div>
          <div style="font-size:0.72rem;opacity:0.5;">findcongwang@gmail.com</div>
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
          <div style="width:4rem;height:1px;background:rgba(12,27,22,0.1);margin:0 auto 1.5rem;"></div>
          <h2 style="font-size:2.5rem;opacity:0.3;font-weight:400;">Appendix</h2>
          <p style="opacity:0.2;margin-top:0.75rem;font-size:0.85rem;">Additional Context for Q&A</p>
        </div>
      </div>`,
    },
    {
      id: "slide-appendix-carbon",
      title: "Carbon Sequestration Context",
      type: "appendix",
      section: "Appendix",
      intent: "Carbon sequestration detail with remote sensing weakness and below-ground carbon argument. Erin collaboration context.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:1.5rem;">Carbon Sequestration: The Measurement Challenge</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;">
          <div>
            <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.75rem;">The Headline Figure</p>
            <p style="font-size:0.88rem;line-height:1.7;opacity:0.7;">Regenerative practices sequester 3\u20138 tonnes CO\u2082/hectare/year.\u00B9 This applies specifically to agricultural land transitioning to regenerative management during the first 10\u201320 years.</p>
            <p style="font-size:0.72rem;opacity:0.4;margin-top:0.75rem;">\u00B9 Rodale Institute, Farming Systems Trial (ongoing since 1981).</p>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.75rem;">The Measurement Problem</p>
            <p style="font-size:0.88rem;line-height:1.7;opacity:0.7;">Canada\u2019s remote sensing approach to carbon monitoring has fundamental weaknesses: <mark style="background:rgba(108,85,126,0.15);padding:0.1rem 0.3rem;border-radius:0.2rem;">no below-ground carbon measurements</mark>, and cannot accurately capture microclimates under canopy cover.</p>
          </div>
        </div>
        <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;background:rgba(12,27,22,0.02);border:1px solid rgba(12,27,22,0.06);">
          <p style="font-weight:700;font-size:0.92rem;margin-bottom:0.5rem;">Why Below-Ground Matters More</p>
          <p style="font-size:0.88rem;opacity:0.7;line-height:1.7;">Above-ground carbon is vulnerable to re-release through fire, storm, and harvest. Below-ground carbon (soil organic matter, root systems, mycorrhizal networks) represents more permanent sequestration. Current monitoring cannot measure it at scale. This is a collaboration area with Erin Trochim (UAF): integrating ground-truth knowledge from practitioners into geospatial monitoring frameworks.</p>
        </div>`,
    },
    {
      id: "slide-appendix-competitors",
      title: "Competitive Landscape",
      type: "appendix",
      section: "Appendix",
      intent: "Platform comparison for judges asking about alternatives.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:1.5rem;">Why Not Existing Platforms?</h2>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;">
          <thead>
            <tr style="border-bottom:2px solid rgba(12,27,22,0.1);">
              <th style="padding:0.75rem;text-align:left;">Platform</th>
              <th style="padding:0.75rem;text-align:center;">Composable</th>
              <th style="padding:0.75rem;text-align:center;">Community-Curated</th>
              <th style="padding:0.75rem;text-align:center;">Bioregional</th>
              <th style="padding:0.75rem;text-align:center;">Sovereignty</th>
            </tr>
          </thead>
          <tbody style="line-height:2.6;">
            <tr style="border-bottom:1px solid rgba(12,27,22,0.05);"><td style="padding:0.5rem 0.75rem;">Google / AI Search</td><td style="text-align:center;opacity:0.3;">\u2014</td><td style="text-align:center;opacity:0.3;">\u2014</td><td style="text-align:center;opacity:0.3;">\u2014</td><td style="text-align:center;opacity:0.3;">\u2014</td></tr>
            <tr style="border-bottom:1px solid rgba(12,27,22,0.05);"><td style="padding:0.5rem 0.75rem;">Permaculture Books</td><td style="text-align:center;opacity:0.3;">\u2014</td><td style="text-align:center;opacity:0.5;">single author</td><td style="text-align:center;opacity:0.5;">sometimes</td><td style="text-align:center;opacity:0.3;">\u2014</td></tr>
            <tr style="border-bottom:1px solid rgba(12,27,22,0.05);"><td style="padding:0.5rem 0.75rem;">Mukurtu CMS</td><td style="text-align:center;opacity:0.3;">\u2014</td><td style="text-align:center;color:#9bd17a;">\u2713</td><td style="text-align:center;opacity:0.3;">\u2014</td><td style="text-align:center;opacity:0.5;">partial</td></tr>
            <tr style="border-bottom:1px solid rgba(12,27,22,0.05);"><td style="padding:0.5rem 0.75rem;">iNaturalist / GBIF</td><td style="text-align:center;opacity:0.3;">\u2014</td><td style="text-align:center;opacity:0.5;">crowd</td><td style="text-align:center;color:#9bd17a;">\u2713</td><td style="text-align:center;opacity:0.3;">\u2014</td></tr>
            <tr style="background:rgba(155,209,122,0.06);"><td style="padding:0.75rem;font-weight:700;">Climate Action Knowledge Map</td><td style="text-align:center;color:#9bd17a;font-weight:700;">\u2713</td><td style="text-align:center;color:#9bd17a;font-weight:700;">\u2713</td><td style="text-align:center;color:#9bd17a;font-weight:700;">\u2713</td><td style="text-align:center;color:#9bd17a;font-weight:700;">\u2713</td></tr>
          </tbody>
        </table>`,
    },
    {
      id: "slide-appendix-climate-analogues",
      title: "Climate Analogues",
      type: "appendix",
      section: "Appendix",
      intent: "Deeper explanation of climate analogue transfer. Japan/eastern NA example. PINA wind resilience example.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:1.5rem;">Climate Analogues: Valid Knowledge Transfer</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;">
          <div>
            <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.75rem;">The Principle</p>
            <p style="font-size:0.88rem;line-height:1.7;opacity:0.7;">Regions with analogous climate conditions share species, growing patterns, and ecological dynamics. First-principle knowledge transfers validly because we understand WHY practices work, not just THAT they work in a specific place.</p>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.75rem;">Japan \u2194 Eastern North America</p>
            <p style="font-size:0.88rem;line-height:1.7;opacity:0.7;">Japan\u2019s eastern coast and North America\u2019s eastern coast share temperate climate influence, rainfall patterns, and species overlap. Traditional land management practices transfer between these analogues when decomposed into mechanisms.</p>
          </div>
        </div>
        <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;background:rgba(12,27,22,0.02);border:1px solid rgba(12,27,22,0.06);">
          <p style="font-weight:700;font-size:0.92rem;margin-bottom:0.5rem;">Diversity as Structural Resilience (PINA DRI)</p>
          <p style="font-size:0.88rem;opacity:0.7;line-height:1.7;">A diversity of tree species at various ages along highways increases wind resilience. A monoculture of same species, same age, same orientation collapses as a unit in storms. This first-principle mechanism (age and species diversity for structural resilience) transfers to any wind-prone bioregion when understood at the mechanism level.</p>
        </div>`,
    },
    {
      id: "slide-appendix-pina",
      title: "PINA Community Collaboration",
      type: "appendix",
      section: "Appendix",
      intent: "PINA DRI case study as proof of practitioner community collaboration model.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:1.5rem;">Community Collaboration: PINA Case Study</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;">
          <div>
            <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.75rem;">Permaculture Institute of North America</p>
            <p style="font-size:0.88rem;line-height:1.7;opacity:0.7;">PINA is the professional body for permaculture practitioners in North America. Francis Wang is a member with Advanced Permaculture Design certification (Oregon State). The Disaster Resilience Initiative (DRI) demonstrates the collaboration model we are building infrastructure for.</p>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.95rem;margin-bottom:0.75rem;">DRI Outputs (pcx.earth/disaster)</p>
            <ul style="font-size:0.88rem;line-height:2;list-style:none;padding:0;opacity:0.7;">
              <li>\u2022 Fire, Flood, Hurricane, Winter toolkits</li>
              <li>\u2022 Risk Assessment guide</li>
              <li>\u2022 Community Resilience guide (in progress)</li>
              <li>\u2022 Summit: Aug 2025 (Holmgren, Millison, Dolman)</li>
            </ul>
          </div>
        </div>
        <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;background:rgba(155,209,122,0.06);border:1px solid rgba(155,209,122,0.15);">
          <p style="font-size:0.92rem;line-height:1.7;"><strong>The gap we fill:</strong> DRI demonstrates that practitioner communities CAN produce extraordinary collaborative knowledge. But the output is static PDFs. You cannot query them for your bioregion, compose them with other traditions, or transfer principles to analogous climates. The Knowledge Map makes community collaboration composable and navigable.</p>
        </div>`,
    },
  ],

  story: {
    type: "steps",
    visualisation: "wordcloud",
    steps: [
      {
        id: "step-disconnected",
        label: "Disconnected",
        thread: "problem",
        conceptsAdded: ["millions of practitioners", "isolation", "permaculture", "natural building", "regenerative", "indigenous stewardship"],
      },
      {
        id: "step-connected",
        label: "Connected",
        thread: "solution",
        conceptsAdded: ["composable knowledge", "climate analogues", "cross-pollination", "community"],
        conceptsFaded: ["isolation"],
      },
      {
        id: "step-gap",
        label: "The Gap",
        thread: "problem",
        conceptsAdded: ["30-year gap", "AI fails", "generic answers", "no first principles"],
        conceptsFaded: ["millions of practitioners", "natural building"],
      },
      {
        id: "step-compose",
        label: "Compose",
        thread: "solution",
        conceptsAdded: ["first-principle mechanisms", "practitioner-curated", "knowledge graph"],
        conceptsFaded: ["30-year gap", "AI fails", "generic answers"],
      },
      {
        id: "step-sovereignty",
        label: "Trust",
        thread: "solution",
        conceptsAdded: ["withdrawal mechanism", "technically enforced", "sovereignty"],
        conceptsFaded: ["no first principles", "permaculture"],
      },
      {
        id: "step-assembling",
        label: "Assembling",
        thread: "impact",
        conceptsAdded: ["UBC workshop", "practitioners contributing", "Kimberly Yazzie", "Erin Trochim"],
        conceptsFaded: ["knowledge graph", "climate analogues"],
      },
      {
        id: "step-team",
        label: "Team",
        thread: "impact",
        conceptsAdded: ["dual doctorate", "Nova Roma Horizon", "graph databases", "systems design"],
        conceptsFaded: ["withdrawal mechanism", "technically enforced"],
      },
      {
        id: "step-invitation",
        label: "Invitation",
        thread: "impact",
        conceptsAdded: ["embodied knowledge", "tacit knowledge", "climate mission", "the invitation is open"],
        conceptsFaded: ["UBC workshop", "Kimberly Yazzie", "Erin Trochim", "dual doctorate"],
      },
    ],
    threadColors: {
      problem: "#6c557e",
      solution: "#9bd17a",
      impact: "#3e6e8e",
    },
  },

  anchors: [
    { slideId: "slide-title", storyStepId: "step-disconnected" },
    { slideId: "slide-hook-disconnected", storyStepId: "step-disconnected" },
    { slideId: "slide-hook-connected", storyStepId: "step-connected" },
    { slideId: "slide-why-fails", storyStepId: "step-gap" },
    { slideId: "slide-solution-map", storyStepId: "step-compose" },
    { slideId: "slide-solution-sovereignty", storyStepId: "step-sovereignty" },
    { slideId: "slide-traction", storyStepId: "step-assembling" },
    { slideId: "slide-team", storyStepId: "step-team" },
    { slideId: "slide-ask", storyStepId: "step-invitation" },
  ],
};
