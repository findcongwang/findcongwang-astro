import type { DualTrackPresentation } from "../types-v2";

/**
 * Cooperathon 2026 — Prosperity Track (v2 Final)
 * Sovereign Distributed Energy and AI for Canada
 *
 * Narrative: Hero's journey toward economically sovereign Canada.
 * Colour palette: #0c1b16 (dark) | #1a365d (deep blue) | #2d6a4f (forest) | #b8860b (gold) | #9b2c2c (constraint red)
 * No emojis. Left-aligned. Footnotes on acronyms. Serious nation-building register.
 */

export const cooperathonProsperityData: DualTrackPresentation = {
  title: "Sovereign Distributed Energy and AI for Canada",
  subtitle: "Cooperathon 2026 — Prosperity Track",
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
      intent: "Establish the 50-year journey. Nation-building tone. No brand name yet. The subtitle echoes the ForesightScope: finding the pathway.",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center">
          <h1 style="font-size:2.8rem;line-height:1.15;text-align:left;max-width:36rem;">Sovereign Distributed Energy and AI for Canada</h1>
          <p class="gestalt-slide__subtitle" style="margin-top:1.25rem;font-size:1rem;opacity:0.55;max-width:34rem;text-align:left;">Finding the pathway to economic sovereignty with Canadian-owned energy and AI infrastructure</p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.85rem;">Francis Wang</div>
          <div style="font-size:0.75rem;opacity:0.5;">Cooperathon 2026 — Prosperity Track</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.75rem;opacity:0.5;">July 2, 2026</div>
        </div>
      </div>`,
    },

    // ─── SLIDE 2: HOOK ──────────────────────────────────────────────
    {
      id: "slide-hook",
      title: "The Civilisational Moment",
      type: "content",
      section: "Problem",
      intent: "Civilisational scale. Dark, serious. No emojis. The 3.7 billion number creates gravity. Closing sentence reframes expectations entirely.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1.5rem;text-align:left;">3.7 Billion People Outside the Human Climate Niche by 2080</h2>
        <p style="font-size:0.95rem;line-height:1.8;max-width:38rem;margin-bottom:2rem;">The southern hemisphere has less landmass than the north. When billions need to move northward, which nations are prepared? Canada is the second largest country on Earth. 38 million people. The cheapest clean energy in the G7. The coldest data centre climate on the planet.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;margin-bottom:2rem;">
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(26,54,93,0.2);background:rgba(26,54,93,0.03);">
            <p style="font-size:1.8rem;font-weight:700;color:#1a365d;">38M</p>
            <p style="font-size:0.78rem;opacity:0.6;margin-top:0.25rem;">people across 2nd largest territory</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(45,106,79,0.2);background:rgba(45,106,79,0.03);">
            <p style="font-size:1.8rem;font-weight:700;color:#2d6a4f;">$0.07</p>
            <p style="font-size:0.78rem;opacity:0.6;margin-top:0.25rem;">per kWh — cheapest clean energy, G7</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.5rem;border:1px solid rgba(155,44,44,0.2);background:rgba(155,44,44,0.03);">
            <p style="font-size:1.8rem;font-weight:700;color:#9b2c2c;">Zero</p>
            <p style="font-size:0.78rem;opacity:0.6;margin-top:0.25rem;">systems in global supercomputing top 50</p>
          </div>
        </div>
        <p style="font-size:1.05rem;line-height:1.7;font-weight:500;max-width:38rem;">We are not talking about a startup, or many startups. This is about building an <mark style="background:rgba(184,134,11,0.15);padding:0.1rem 0.4rem;border-radius:0.2rem;">economically sovereign nation</mark> and being ready for what is coming.</p>
        <p style="font-size:0.68rem;opacity:0.4;margin-top:1.5rem;">Lenton et al. (2023) "Quantifying the human cost of global warming," Nature Sustainability vol. 6; World Bank Groundswell Report (2021)</p>`,
    },

    // ─── SLIDE 3: FORCES ────────────────────────────────────────────
    {
      id: "slide-forces",
      title: "Forces Converging on Canada",
      type: "content",
      section: "Problem",
      intent: "Two-column. Left: climate + population density enables business models. Right: compute sovereignty + vertical supply chains. Not an intellectual plantation.",
      html: `<h2 style="font-size:1.8rem;margin-bottom:1.5rem;text-align:left;">Forces Converging on Canada</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;">
          <div>
            <p style="font-weight:700;font-size:0.9rem;margin-bottom:1rem;color:#b8860b;">Climate Physics + Population Density</p>
            <p style="font-size:0.88rem;line-height:1.8;margin-bottom:1rem;">The human climate niche peaks at <strong>13\u00B0C mean annual temperature</strong>. That is southern Canada. As the globe warms, our latitude becomes more habitable while equatorial regions become less.</p>
            <p style="font-size:0.88rem;line-height:1.8;margin-bottom:1rem;">With increased population density comes a <mark style="background:rgba(184,134,11,0.12);padding:0.1rem 0.3rem;border-radius:0.2rem;">plethora of business models relying on density</mark> that become viable for Canada's economy: transit, services, manufacturing, local supply chains. If we prepare properly.</p>
            <p style="font-size:0.68rem;opacity:0.4;margin-top:0.75rem;">Lenton et al. 2023, Nature Sustainability</p>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.9rem;margin-bottom:1rem;color:#1a365d;">Compute Sovereignty + Vertical Integration</p>
            <blockquote style="border-left:2px solid rgba(26,54,93,0.3);padding-left:1rem;margin:0 0 1rem 0;">
              <p style="font-size:0.82rem;line-height:1.6;font-style:italic;opacity:0.85;">"Most compute capacity is located in other countries. This exposes Canadian firms to dependencies and security risks."</p>
              <p style="font-size:0.65rem;opacity:0.4;margin-top:0.4rem;">\u2014 Budget 2024</p>
            </blockquote>
            <p style="font-size:0.88rem;line-height:1.8;margin-bottom:1rem;">140,000 AI professionals. G7 leader in publications. Cannot crack global top 50 in supercomputing.</p>
            <p style="font-size:0.88rem;line-height:1.8;">Canada must build <mark style="background:rgba(26,54,93,0.1);padding:0.1rem 0.3rem;border-radius:0.2rem;">vertically integrated supply chains and our own manufacturing capability</mark>, instead of remaining an intellectual plantation and factory for the United States.</p>
          </div>
        </div>`,
    },

    // ─── SLIDE 4: COMPELLING QUESTION (VISION) ──────────────────────
    {
      id: "slide-vision-cq",
      title: "The Compelling Question",
      type: "content",
      section: "Vision",
      intent: "Formatted as Compelling Question per lexicon. Bold Ambition in gold. Constraints in red with 'while resolving'. Supporting signals highlighted. This is the design fiction that creates wow.",
      html: `<p style="font-size:0.78rem;opacity:0.5;margin-bottom:1rem;text-transform:uppercase;letter-spacing:0.05em;">Compelling Question</p>
        <p style="font-size:1.15rem;line-height:1.7;margin-bottom:1.5rem;max-width:40rem;"><span style="color:#b8860b;font-weight:600;">How might Canada become an economically sovereign nation by 2076, with infrastructure prepared for population influx, independent energy-compute grids, and domestic AI capability at parity with leading nations</span></p>
        <p style="font-size:1rem;line-height:1.7;margin-bottom:1.5rem;max-width:40rem;"><span style="color:#9b2c2c;font-weight:500;">...while resolving:</span></p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem;">
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(155,44,44,0.15);background:rgba(155,44,44,0.03);font-size:0.82rem;color:#9b2c2c;">100:1 investment gap with the U.S. ($2.7B vs. $280B)</div>
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(155,44,44,0.15);background:rgba(155,44,44,0.03);font-size:0.82rem;color:#9b2c2c;">38M sparse population across world's 2nd largest territory</div>
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(155,44,44,0.15);background:rgba(155,44,44,0.03);font-size:0.82rem;color:#9b2c2c;">No domestic chip manufacturing or semiconductor sovereignty</div>
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;border:1px solid rgba(155,44,44,0.15);background:rgba(155,44,44,0.03);font-size:0.82rem;color:#9b2c2c;">No existing mechanism for citizen participation in infrastructure</div>
        </div>
        <p style="font-size:0.82rem;opacity:0.6;margin-bottom:0.75rem;">Signals that this is theoretically achievable:</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;background:rgba(45,106,79,0.06);border:1px solid rgba(45,106,79,0.15);">
            <p style="font-size:0.82rem;font-weight:600;color:#2d6a4f;">SMR: $5.3B market</p>
            <p style="font-size:0.72rem;opacity:0.6;">NRCan Roadmap. Off-grid northern communities. Deployment this decade.</p>
          </div>
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;background:rgba(45,106,79,0.06);border:1px solid rgba(45,106,79,0.15);">
            <p style="font-size:0.82rem;font-weight:600;color:#2d6a4f;">Taiwan: 40 years</p>
            <p style="font-size:0.72rem;opacity:0.6;">Zero to global semiconductor leader. The path is proven.</p>
          </div>
          <div style="padding:0.75rem 1rem;border-radius:0.4rem;background:rgba(45,106,79,0.06);border:1px solid rgba(45,106,79,0.15);">
            <p style="font-size:0.82rem;font-weight:600;color:#2d6a4f;">Cold climate: 40\u201360%</p>
            <p style="font-size:0.72rem;opacity:0.6;">Cooling cost reduction. Natural advantage for compute infrastructure.</p>
          </div>
        </div>`,
    },

    // ─── SLIDE 5: MECHANISM ─────────────────────────────────────────
    {
      id: "slide-mechanism",
      title: "The Economic Mechanism",
      type: "content",
      section: "Solution",
      intent: "The critical sentence is the headline. Then explain mechanism. Introduce 'Decentralized AI (DAI) Compute' at the end. Footnotes on NRG/CMP. No emojis.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:0.75rem;text-align:left;max-width:38rem;">The Economic Mechanism</h2>
        <p style="font-size:1.05rem;line-height:1.8;margin-bottom:2rem;max-width:38rem;">The missing piece: an economic mechanism that <mark style="background:rgba(184,134,11,0.12);padding:0.1rem 0.3rem;border-radius:0.2rem;">connects Canadian energy to Canadian compute</mark> and allows citizens to participate in building <strong>Canadian assets, Canadian infrastructure, and Canadian capabilities</strong>.</p>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:1rem;margin-bottom:1.5rem;">
          <div style="width:2rem;height:2rem;border-radius:50%;background:#1a365d;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">1</div>
          <div><p style="font-size:0.88rem;line-height:1.6;"><strong>Install</strong> solar panels + compute node. $0 down via financing partnerships (extending the $50B solar lease model).</p></div>
          <div style="width:2rem;height:2rem;border-radius:50%;background:#2d6a4f;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">2</div>
          <div><p style="font-size:0.88rem;line-height:1.6;"><strong>Generate and process.</strong> Your system produces energy (NRG\u00B9) and provides AI compute (CMP\u00B2) to the network.</p></div>
          <div style="width:2rem;height:2rem;border-radius:50%;background:#b8860b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">3</div>
          <div><p style="font-size:0.88rem;line-height:1.6;"><strong>Earn and build.</strong> Tokens are <strong>asset-backed</strong> by physical Canadian infrastructure and <strong>burned on use</strong>. Access passes, not speculative instruments. Break-even: 18\u201324 months.</p></div>
        </div>
        <div style="padding:1rem 1.25rem;border-radius:0.5rem;background:rgba(26,54,93,0.04);border:1px solid rgba(26,54,93,0.12);">
          <p style="font-size:0.88rem;line-height:1.6;">The initial vehicle: <strong>Distributed AI (DAI) Compute</strong>. A blockchain protocol where the accounting layer makes every contribution verifiable. A clean energy co-op with blockchain accounting.</p>
        </div>
        <div style="margin-top:1.25rem;font-size:0.68rem;opacity:0.45;line-height:1.8;">
          <p>\u00B9 <strong>NRG</strong> (Energy Credit): minted on verified renewable energy generation by smart meter oracle attestation; burned on energy consumption or exchange for compute access.</p>
          <p>\u00B2 <strong>CMP</strong> (Compute Credit): minted when a node operator stakes verified GPU/CPU capacity; burned when an enterprise buyer accesses compute processing.</p>
        </div>`,
    },

    // ─── SLIDE 6: GAP (INVERTED HIERARCHY) ──────────────────────────
    {
      id: "slide-gap",
      title: "The Unique Combination",
      type: "content",
      section: "Solution",
      intent: "INVERTED hierarchy. The combination message is LARGEST and most prominent. SCIP complement is supporting context below. This is the centrepiece.",
      html: `<div style="padding:2rem 2.5rem;border-radius:0.75rem;background:rgba(12,27,22,0.03);border:1px solid rgba(12,27,22,0.08);margin-bottom:2rem;">
          <p style="font-size:1.3rem;line-height:1.6;font-weight:600;max-width:38rem;">Sovereignty under Canadian law<br/>+ Asset-backing against physical infrastructure<br/>+ Citizen participation through financing<br/>+ Energy generation integration<br/>+ Distributed resilience</p>
          <p style="font-size:0.95rem;opacity:0.6;margin-top:1.25rem;">No existing approach combines all five. This is the gap.</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;">
          <div>
            <p style="font-weight:600;font-size:0.82rem;color:#1a365d;margin-bottom:0.5rem;">Government response (SCIP, $705M)</p>
            <p style="font-size:0.8rem;line-height:1.6;opacity:0.7;">One centralised supercomputer for 24,000 academic researchers. Necessary. But does not address 140,000+ industry professionals, startups, or citizens.</p>
          </div>
          <div>
            <p style="font-weight:600;font-size:0.82rem;color:#2d6a4f;margin-bottom:0.5rem;">This project</p>
            <p style="font-size:0.8rem;line-height:1.6;opacity:0.7;">Distributed citizen network. Private capital mobilised alongside public investment. Complementary to SCIP, not competitive.</p>
          </div>
        </div>`,
    },

    // ─── SLIDE 7: TEAM + CREDIBILITY ────────────────────────────────
    {
      id: "slide-team-credibility",
      title: "Team and Credibility",
      type: "content",
      section: "Viability",
      intent: "Lead with Francis's credibility: foresight practice, double doctorate, ISED submission, patent, renewable energy decade, AI ops. Then team cards. Footnotes on technical terms.",
      html: `<h2 style="font-size:1.6rem;margin-bottom:1.25rem;text-align:left;">Team and Credibility</h2>
        <div style="padding:1.25rem 1.5rem;border-radius:0.75rem;border:1.5px solid rgba(184,134,11,0.2);background:rgba(184,134,11,0.03);margin-bottom:1.25rem;">
          <p style="font-size:0.88rem;line-height:1.8;"><strong>Francis Wang</strong> (Lead Researcher) \u2014 15+ years engineering and product leadership. Dual doctoral research (DDes + DBA) combining AI systems with strategic foresight for long-term sustainable innovation. <mark style="background:rgba(184,134,11,0.1);padding:0.05rem 0.2rem;border-radius:0.15rem;">Submitted ISED Call for Proposals</mark> (blockchain on government-verified suppliers). Patent holder in renewable energy markets. Decade in renewable energy software. Staff software engineer in AI operations. Foresight methodology (APPETITE model).</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;margin-bottom:1rem;">
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.78rem;">Maria Smirnova</p>
            <p style="font-size:0.7rem;opacity:0.65;line-height:1.5;margin-top:0.25rem;">Systems & Operations. Architecture, UWaterloo. President Iterra R&D. COO Infortech. Scaling technology ventures.</p>
          </div>
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.78rem;">Arwin Tio</p>
            <p style="font-size:0.7rem;opacity:0.65;line-height:1.5;margin-top:0.25rem;">AI Infrastructure. Sr. SWE at Cruise (GM), autonomous vehicles. Previously Staff at NextRoll. HPC, distributed systems, GPU fleet.</p>
          </div>
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.78rem;">Alex Li</p>
            <p style="font-size:0.7rem;opacity:0.65;line-height:1.5;margin-top:0.25rem;">Design & UX. Director Product Design, RBC (AI products). Previously Capital One, IBM. Complex systems for non-specialists.</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.78rem;">James Cheng</p>
            <p style="font-size:0.7rem;opacity:0.65;line-height:1.5;margin-top:0.25rem;">Platform Engineering. Decade of digital transformation: aviation, finance, healthcare, public sector. Staff SWE Pivotal/VMware. Systems Design, UWaterloo.</p>
          </div>
          <div style="padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(12,27,22,0.08);">
            <p style="font-weight:700;font-size:0.78rem;">William Yao</p>
            <p style="font-size:0.7rem;opacity:0.65;line-height:1.5;margin-top:0.25rem;">Finance & Governance. Founder Nova Roma. CA, ex-Merrill Lynch. 40+ years financial services. Capital markets, energy economics, Build-to-Manage model.</p>
          </div>
        </div>
        <p style="font-size:0.65rem;opacity:0.4;margin-top:1rem;">Tokenomics: the economic design governing how NRG and CMP tokens are minted, exchanged, and burned. PAXG (Pax Gold): established asset-backed token (1 token = 1 oz physical gold) whose transparency model we follow for verification.</p>`,
    },

    // ─── SLIDE 8: FORESIGHTSCOPE PATHWAY ────────────────────────────
    {
      id: "slide-pathway",
      title: "Pathway to Economic Sovereignty",
      type: "demo",
      section: "Viability",
      layout: "content-anchored",
      intent: "ForesightScope widget: future-only cone (Now to H3). Golden path (Transform). Pitfall branches from CQ constraints (Order/Collapse). Hoverable scenarios with trajectory labels.",
      html: `<h2>Pathway to Economic Sovereignty</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;margin-bottom:0.5rem;">
          <div style="padding:0.5rem 0.75rem;border-radius:0.4rem;border:1px solid rgba(184,134,11,0.2);background:rgba(184,134,11,0.03);">
            <p style="font-size:0.68rem;font-weight:700;color:#b8860b;margin-bottom:0.2rem;">H1: Regulatory clarity + first nodes</p>
            <p style="font-size:0.62rem;opacity:0.6;line-height:1.4;">CSA Sandbox granted. 50 nodes online. Enterprise pilot secured.</p>
          </div>
          <div style="padding:0.5rem 0.75rem;border-radius:0.4rem;border:1px solid rgba(184,134,11,0.2);background:rgba(184,134,11,0.03);">
            <p style="font-size:0.68rem;font-weight:700;color:#b8860b;margin-bottom:0.2rem;">H2: Network effect + SMR co-location</p>
            <p style="font-size:0.62rem;opacity:0.6;line-height:1.4;">1000+ nodes. Govt customer. Northern settlement pilots.</p>
          </div>
          <div style="padding:0.5rem 0.75rem;border-radius:0.4rem;border:1px solid rgba(184,134,11,0.2);background:rgba(184,134,11,0.03);">
            <p style="font-size:0.68rem;font-weight:700;color:#b8860b;margin-bottom:0.2rem;">H3: Economic sovereignty achieved</p>
            <p style="font-size:0.62rem;opacity:0.6;line-height:1.4;">Domestic fabrication. Vertical integration. Self-sufficient communities.</p>
          </div>
        </div>
        <p class="gestalt-slide__meta">Scenario trajectories from the compelling question. Golden path: active transformation. Pitfalls: unresolved constraints.</p>`,
    },

    // ─── SLIDE 9: NEXT STEPS ────────────────────────────────────────
    {
      id: "slide-next-steps",
      title: "Next Steps",
      type: "content",
      section: "Close",
      intent: "Near-term concrete actions. CSA application. Solar installer engagement. Hardware in Canadian homes.",
      html: `<h2 style="font-size:1.6rem;margin-bottom:1.5rem;text-align:left;">Immediate Next Steps</h2>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:1.25rem 1.5rem;align-items:start;">
          <div style="width:2.5rem;height:2.5rem;border-radius:50%;background:#1a365d;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;">1</div>
          <div>
            <p style="font-size:0.95rem;font-weight:600;">Smart contract security audit</p>
            <p style="font-size:0.82rem;opacity:0.65;margin-top:0.25rem;">Professional third-party review of the protocol before any token issuance.</p>
          </div>
          <div style="width:2.5rem;height:2.5rem;border-radius:50%;background:#2d6a4f;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;">2</div>
          <div>
            <p style="font-size:0.95rem;font-weight:600;">CSA Regulatory Sandbox application</p>
            <p style="font-size:0.82rem;opacity:0.65;margin-top:0.25rem;">Engage principal regulator for time-limited operating relief. Critical path for all downstream activity.</p>
          </div>
          <div style="width:2.5rem;height:2.5rem;border-radius:50%;background:#b8860b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;">3</div>
          <div>
            <p style="font-size:0.95rem;font-weight:600;">Engage solar installers and financing partners</p>
            <p style="font-size:0.82rem;opacity:0.65;margin-top:0.25rem;">Establish the procurement and financing pipeline to roll out the initial set of hardware on the ground in Canadian homes.</p>
          </div>
        </div>
        <div style="margin-top:2rem;padding:1rem 1.5rem;border-radius:0.5rem;background:rgba(45,106,79,0.04);border:1px solid rgba(45,106,79,0.12);">
          <p style="font-size:0.88rem;line-height:1.7;">Target: <strong>first 10 pilot nodes operational within 12 months</strong>. Real hardware. Real energy generation. Real compute processing. Proof that the mechanism works before scaling.</p>
        </div>`,
    },

    // ─── SLIDE 10: THE ASK (STANDALONE, CONCLUSIVE) ─────────────────
    {
      id: "slide-ask",
      title: "The Ask",
      type: "title",
      section: "Close",
      layout: "title-anchored",
      intent: "Standalone. Dark background feel. High contrast. $10K. Smart contract audit + financing partnerships. 'Back Canadian economic sovereignty.' Final image judges leave with.",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center" style="text-align:left;max-width:34rem;">
          <p style="font-size:3rem;font-weight:700;margin-bottom:1.5rem;">$10,000</p>
          <div style="font-size:1rem;line-height:2.2;margin-bottom:2rem;">
            <p>\u2192 Smart contract security audit</p>
            <p>\u2192 First financing partnerships to bring energy and AI assets into Canadian hands</p>
          </div>
          <div style="width:4rem;height:1px;background:rgba(12,27,22,0.15);margin-bottom:2rem;"></div>
          <p style="font-size:1.4rem;font-weight:600;color:#b8860b;">Back Canadian economic sovereignty.</p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.82rem;">Francis Wang</div>
          <div style="font-size:0.72rem;opacity:0.5;">findcongwang@gmail.com</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.7rem;opacity:0.4;">Sovereign Distributed Energy and AI for Canada</div>
          <div style="font-size:0.7rem;opacity:0.4;">Cooperathon 2026 \u2014 Prosperity Track</div>
        </div>
      </div>`,
    },

    // ─── APPENDIX ───────────────────────────────────────────────────
    {
      id: "slide-tokenomics",
      title: "Tokenomics Detail",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'How do the tokens work?' question. Footnotes define all terms.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">Dual-Token Mechanics</h2>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:1.5rem;align-items:center;margin-bottom:1.5rem;">
          <div style="padding:1.5rem;border-radius:0.75rem;border:1.5px solid rgba(184,134,11,0.2);text-align:center;">
            <p style="font-weight:700;color:#b8860b;font-size:1.1rem;">NRG</p>
            <p style="font-size:0.78rem;opacity:0.6;margin-top:0.5rem;">Energy Credit</p>
            <p style="font-size:0.72rem;opacity:0.5;margin-top:0.5rem;line-height:1.5;">Minted: verified renewable generation (smart meter oracle attestation)</p>
            <p style="font-size:0.72rem;opacity:0.5;line-height:1.5;">Burned: energy consumption or exchange for CMP</p>
          </div>
          <div style="font-size:1.2rem;opacity:0.25;">\u21C4</div>
          <div style="padding:1.5rem;border-radius:0.75rem;border:1.5px solid rgba(26,54,93,0.2);text-align:center;">
            <p style="font-weight:700;color:#1a365d;font-size:1.1rem;">CMP</p>
            <p style="font-size:0.78rem;opacity:0.6;margin-top:0.5rem;">Compute Credit</p>
            <p style="font-size:0.72rem;opacity:0.5;margin-top:0.5rem;line-height:1.5;">Minted: verified compute provision (proof-of-compute attestation)</p>
            <p style="font-size:0.72rem;opacity:0.5;line-height:1.5;">Burned: enterprise buyer accesses compute processing</p>
          </div>
        </div>
        <div style="padding:1rem;border-radius:0.5rem;background:rgba(12,27,22,0.03);border:1px solid rgba(12,27,22,0.08);text-align:center;">
          <p style="font-size:0.82rem;opacity:0.7;">AMM exchange (market-driven rate) \u2022 Both burned on use \u2022 No speculation incentive \u2022 Burn-Mint Equilibrium</p>
        </div>
        <p style="font-size:0.68rem;opacity:0.4;margin-top:1rem;">AMM: Automated Market Maker \u2014 an on-chain exchange pool that algorithmically sets the NRG/CMP exchange rate based on supply and demand, without requiring a centralised order book.</p>`,
    },
    {
      id: "slide-regulatory",
      title: "Regulatory Pathway",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'Is this legal?' question. CSA Sandbox pathway.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">CSA Regulatory Sandbox Pathway</h2>
        <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
          <div style="display:flex;align-items:center;gap:1rem;"><div style="width:2rem;height:2rem;border-radius:50%;background:#2d6a4f;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">1</div><p style="font-size:0.85rem;">Engage securities counsel (Canadian crypto-specialist)</p></div>
          <div style="display:flex;align-items:center;gap:1rem;"><div style="width:2rem;height:2rem;border-radius:50%;background:#1a365d;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">2</div><p style="font-size:0.85rem;">CSA pre-filing conference with principal regulator</p></div>
          <div style="display:flex;align-items:center;gap:1rem;"><div style="width:2rem;height:2rem;border-radius:50%;background:#b8860b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">3</div><p style="font-size:0.85rem;">Regulatory Sandbox application (time-limited operating relief)</p></div>
          <div style="display:flex;align-items:center;gap:1rem;"><div style="width:2rem;height:2rem;border-radius:50%;background:#334155;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">4</div><p style="font-size:0.85rem;">Operate under Sandbox terms; demonstrate compliance; quarterly reporting</p></div>
          <div style="display:flex;align-items:center;gap:1rem;"><div style="width:2rem;height:2rem;border-radius:50%;background:#0c1b16;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">5</div><p style="font-size:0.85rem;">Graduate to full registration or exemption (Year 2\u20133)</p></div>
        </div>
        <div style="padding:1rem 1.25rem;border-radius:0.5rem;background:rgba(45,106,79,0.04);border:1px solid rgba(45,106,79,0.1);">
          <p style="font-size:0.8rem;opacity:0.75;line-height:1.6;"><strong>Utility-first design:</strong> tokens burned on use (consumptive). No profit promises. Immediate utility at launch. Decentralised governance. These are the CSA's criteria for non-security classification under the Pacific Coast Coin Exchange test.</p>
        </div>`,
    },
  ],

  story: {
    type: "steps",
    visualisation: "wordcloud",
    steps: [
      { id: "step-1", label: "Opening", thread: "vision", conceptsAdded: ["economic sovereignty", "nation-building", "50-year pathway"] },
      { id: "step-2", label: "Climate", thread: "crisis", conceptsAdded: ["3.7 billion displaced", "human climate niche", "northward pressure"] },
      { id: "step-3", label: "Convergence", thread: "crisis", conceptsAdded: ["compute sovereignty", "vertical integration", "intellectual plantation", "population density"] },
      { id: "step-4", label: "Question", thread: "vision", conceptsAdded: ["compelling question", "bold ambition", "constraints"], conceptsFaded: ["intellectual plantation"] },
      { id: "step-5", label: "Mechanism", thread: "mechanism", conceptsAdded: ["DAI Compute", "asset-backed", "burn on use", "citizen participation"], conceptsFaded: ["3.7 billion displaced"] },
      { id: "step-6", label: "Combination", thread: "mechanism", conceptsAdded: ["sovereignty + backing + participation + energy + financing"] },
      { id: "step-7", label: "Credibility", thread: "mechanism", conceptsAdded: ["foresight practice", "ISED submission", "peer-reviewed"], conceptsFaded: ["northward pressure"] },
      { id: "step-8", label: "Pathway", thread: "vision", conceptsAdded: ["transform trajectory", "golden path", "pitfall avoidance"], conceptsFaded: ["compute sovereignty"] },
      { id: "step-9", label: "Action", thread: "mechanism", conceptsAdded: ["smart contract audit", "solar installers", "first 10 nodes"] },
      { id: "step-10", label: "Sovereignty", thread: "vision", conceptsAdded: ["back Canadian sovereignty", "Canadian assets", "Canadian capabilities"] },
    ],
    threadColors: {
      crisis: "#9b2c2c",
      infrastructure: "#1a365d",
      mechanism: "#2d6a4f",
      vision: "#b8860b",
    },
  },

  anchors: [
    { slideId: "slide-title", storyStepId: "step-1" },
    { slideId: "slide-hook", storyStepId: "step-2" },
    { slideId: "slide-forces", storyStepId: "step-3" },
    { slideId: "slide-vision-cq", storyStepId: "step-4" },
    { slideId: "slide-mechanism", storyStepId: "step-5" },
    { slideId: "slide-gap", storyStepId: "step-6" },
    { slideId: "slide-team-credibility", storyStepId: "step-7" },
    { slideId: "slide-pathway", storyStepId: "step-8" },
    { slideId: "slide-next-steps", storyStepId: "step-9" },
    { slideId: "slide-ask", storyStepId: "step-10" },
  ],
};
