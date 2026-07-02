import type { DualTrackPresentation } from "../types-v2";

/**
 * Cooperathon 2026 — Prosperity Track
 * DAI Compute: Sovereign Distributed Energy & AI for Canada
 *
 * Narrative: Hero's journey toward economically sovereign Canada.
 * Guide the audience through civilisational stakes, then land on mechanism.
 */

export const cooperathonProsperityData: DualTrackPresentation = {
  title: "Sovereign Distributed Energy & AI for Canada",
  subtitle: "Cooperathon 2026 — Prosperity Track",
  author: "Francis Wang",
  date: "2026-07",
  duration: 5,

  slides: [
    {
      id: "slide-title",
      title: "Title",
      type: "title",
      section: "Opening",
      layout: "title-anchored",
      intent: "Establish identity. Nation-building tone. The word 'sovereign' is the first strategic signal.",
      html: `<div class="gestalt-slide__anchored">
        <div class="gestalt-slide__anchor gestalt-slide__anchor--center">
          <h1 style="font-size:3rem;line-height:1.1;">DAI Compute</h1>
          <p class="gestalt-slide__subtitle" style="margin-top:1rem;font-size:1.05rem;opacity:0.6;max-width:30rem;">Sovereign Distributed Energy & AI for Canada</p>
          <p style="margin-top:0.5rem;font-size:0.75rem;opacity:0.4;">daicompute.ca</p>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left">
          <div style="font-size:0.85rem;">Francis Wang</div>
          <div style="font-size:0.75rem;opacity:0.5;">Cooperathon 2026 — Prosperity Track</div>
        </div>
        <div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right">
          <div style="font-size:0.85rem;font-weight:600;">July 2, 2026</div>
        </div>
      </div>`,
    },
    {
      id: "slide-hook",
      title: "The Civilisational Moment",
      type: "content",
      section: "Problem",
      intent: "Civilisational scale. Not 'another blockchain project.' This is nation-building. The 3.7 billion number should create awe.",
      html: `<h2 style="font-size:1.5rem;margin-bottom:1.5rem;">3.7 Billion People Will Be Displaced by Heat.</h2>
        <p style="font-size:0.95rem;line-height:1.7;max-width:36rem;margin-bottom:1.5rem;">By 2080, up to one-third of humanity will be living outside the human climate niche. The southern hemisphere has less landmass than the north. When billions need to move northward, which nations are prepared?</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.25rem;margin-bottom:1.5rem;">
          <div style="padding:1.25rem;border-radius:0.75rem;background:rgba(245,158,11,0.04);border:1px solid rgba(245,158,11,0.15);text-align:center;">
            <p style="font-size:1.6rem;font-weight:700;color:#f59e0b;">38M</p>
            <p style="font-size:0.75rem;opacity:0.7;">population, 2nd largest territory</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.75rem;background:rgba(14,165,233,0.04);border:1px solid rgba(14,165,233,0.15);text-align:center;">
            <p style="font-size:1.6rem;font-weight:700;color:#0ea5e9;">$0.07</p>
            <p style="font-size:0.75rem;opacity:0.7;">kWh — cheapest clean energy in G7</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.75rem;background:rgba(239,68,68,0.04);border:1px solid rgba(239,68,68,0.15);text-align:center;">
            <p style="font-size:1.6rem;font-weight:700;color:#ef4444;">Zero</p>
            <p style="font-size:0.75rem;opacity:0.7;">systems in global top 50</p>
          </div>
        </div>
        <p style="font-size:0.85rem;opacity:0.6;font-style:italic;">This is not a technology pitch. This is a pitch about building a sovereign nation that is ready for what is coming.</p>
        <p style="font-size:0.6rem;opacity:0.35;margin-top:1rem;font-family:var(--gestalt-font-mono);">Lenton et al. (2023) Nature Sustainability; World Bank Groundswell (2021)</p>`,
    },
    {
      id: "slide-stakes",
      title: "Two Converging Forces",
      type: "content",
      section: "Problem",
      intent: "Connect climate migration to compute sovereignty as ONE infrastructure problem. Budget 2024 quote provides government validation.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.5rem;">Two Forces Converging on Canada</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;">
          <div>
            <p style="font-weight:700;font-size:0.85rem;margin-bottom:1rem;color:#f59e0b;">Climate Physics</p>
            <p style="font-size:0.85rem;line-height:1.7;opacity:0.85;">The human climate niche peaks at 13°C mean annual temperature. That is southern Canada. As the globe warms, our latitude becomes MORE habitable. Equatorial regions become less.</p>
            <p style="font-size:0.7rem;opacity:0.4;margin-top:0.75rem;font-family:var(--gestalt-font-mono);">Lenton et al. 2023, Nature Sustainability</p>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.85rem;margin-bottom:1rem;color:#ef4444;">Compute Sovereignty</p>
            <blockquote style="border-left:2px solid rgba(239,68,68,0.3);padding-left:1rem;margin:0;">
              <p style="font-size:0.82rem;line-height:1.6;font-style:italic;opacity:0.85;">"Most compute capacity is located in other countries. This exposes Canadian firms to dependencies and security risks."</p>
              <p style="font-size:0.65rem;opacity:0.4;margin-top:0.5rem;">— Budget 2024</p>
            </blockquote>
            <p style="font-size:0.82rem;line-height:1.7;opacity:0.85;margin-top:0.75rem;">140,000 AI professionals. G7 #1 in publications. Cannot crack global top 50 in supercomputing.</p>
          </div>
        </div>
        <p style="font-size:0.88rem;opacity:0.7;margin-top:1.5rem;text-align:center;font-weight:500;">These are not separate problems. They are one: Canada has not built infrastructure for the future that is arriving.</p>`,
    },
    {
      id: "slide-vision",
      title: "Sovereign, Resilient Canada",
      type: "content",
      section: "Vision",
      intent: "Design fiction that feels achievable. SMR data grounds the vision. Then pivot to the gap: what's MISSING is the economic mechanism.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">The 50-Year Vision</h2>
        <p style="font-size:0.9rem;line-height:1.7;max-width:36rem;margin-bottom:1.5rem;">Small modular reactors powering self-sufficient communities co-located with AI compute infrastructure. Northern settlements that are energy-sovereign, not grid-dependent. A distributed network of compute nodes owned by Canadians, powered by Canadian energy, processing Canadian AI workloads.</p>
        <div style="padding:1rem 1.25rem;background:rgba(14,165,233,0.03);border:1px solid rgba(14,165,233,0.12);border-radius:0.5rem;margin-bottom:1.25rem;">
          <p style="font-size:0.82rem;line-height:1.6;"><strong>NRCan SMR Roadmap:</strong> $5.3B Canadian market for small modular reactors. Three applications: on-grid power, heavy industry, and off-grid remote communities currently burning diesel. Deployment within the decade.</p>
        </div>
        <p style="font-size:0.88rem;opacity:0.8;">The components exist. What is missing is the <strong>economic mechanism</strong> that connects Canadian energy to Canadian compute and allows citizens to participate in building it.</p>`,
    },
    {
      id: "slide-mechanism",
      title: "DAI Compute: The Mechanism",
      type: "content",
      section: "Solution",
      intent: "HOW it works. Lead with citizen participation and economics. Blockchain introduced as accounting layer. Asset-backed + burn-on-use.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">DAI Compute: Distributed AI Infrastructure</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;">
          <div style="text-align:center;padding:1rem;">
            <div style="font-size:1.3rem;margin-bottom:0.4rem;">☀️</div>
            <p style="font-weight:700;font-size:0.8rem;margin-bottom:0.4rem;">1. Install</p>
            <p style="font-size:0.75rem;opacity:0.7;line-height:1.4;">Solar + compute node. $0 down via financing.</p>
          </div>
          <div style="text-align:center;padding:1rem;">
            <div style="font-size:1.3rem;margin-bottom:0.4rem;">⚡</div>
            <p style="font-weight:700;font-size:0.8rem;margin-bottom:0.4rem;">2. Generate & Process</p>
            <p style="font-size:0.75rem;opacity:0.7;line-height:1.4;">Energy + AI compute to the network.</p>
          </div>
          <div style="text-align:center;padding:1rem;">
            <div style="font-size:1.3rem;margin-bottom:0.4rem;">🏗️</div>
            <p style="font-weight:700;font-size:0.8rem;margin-bottom:0.4rem;">3. Earn & Build</p>
            <p style="font-size:0.75rem;opacity:0.7;line-height:1.4;">Tokens backed by real Canadian assets. Every dollar builds infrastructure.</p>
          </div>
        </div>
        <div style="padding:1rem 1.25rem;background:rgba(16,185,129,0.04);border:1px solid rgba(16,185,129,0.12);border-radius:0.5rem;">
          <p style="font-size:0.82rem;line-height:1.6;"><strong>Asset-backed. Burned on use.</strong> Dual token (NRG + CMP). Both backed by physical Canadian infrastructure. Both consumed on access. Not speculative instruments.</p>
          <p style="font-size:0.78rem;line-height:1.6;opacity:0.7;margin-top:0.5rem;">Financing model: extend the $50B solar lease industry to include compute hardware. Break-even: 18-24 months.</p>
        </div>
        <p style="font-size:0.78rem;opacity:0.5;margin-top:1rem;font-style:italic;">Blockchain = accounting layer for verifiable, decentralised infrastructure. Clean energy co-op with blockchain accounting.</p>`,
    },
    {
      id: "slide-gap",
      title: "The Gap",
      type: "content",
      section: "Solution",
      intent: "Complement, not compete. Quick visual proof. Expendable section if running long.",
      html: `<h2 style="font-size:1.3rem;margin-bottom:1rem;">Complements Government Investment</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;">
          <div style="padding:1.25rem;border-radius:0.75rem;border:1px solid rgba(14,165,233,0.12);">
            <p style="font-weight:700;font-size:0.8rem;color:#0ea5e9;margin-bottom:0.75rem;">SCIP ($705M)</p>
            <p style="font-size:0.78rem;line-height:1.6;opacity:0.8;">One centralised supercomputer. 24,000 academic researchers. Public-funded.</p>
          </div>
          <div style="padding:1.25rem;border-radius:0.75rem;border:1px solid rgba(16,185,129,0.12);">
            <p style="font-weight:700;font-size:0.8rem;color:#10b981;margin-bottom:0.75rem;">DAI Compute</p>
            <p style="font-size:0.78rem;line-height:1.6;opacity:0.8;">Distributed citizen network. 140,000+ industry professionals + startups + citizens. Private capital mobilised.</p>
          </div>
        </div>
        <p style="font-size:0.82rem;opacity:0.7;margin-top:1.5rem;text-align:center;">Both are needed. Public supercomputer for research. Distributed network for everyone else.</p>
        <p style="font-size:0.78rem;opacity:0.5;margin-top:0.5rem;text-align:center;">No existing approach combines: sovereignty + asset-backing + citizen participation + energy integration + $0-down financing.</p>`,
    },
    {
      id: "slide-traction",
      title: "Traction & Credibility",
      type: "content",
      section: "Viability",
      intent: "Signal research depth. 'Peer-reviewed climate science, NRCan roadmaps, semiconductor supply chain analysis.' Honest about stage.",
      html: `<h2 style="font-size:1.4rem;margin-bottom:1.25rem;">Research-Backed, Not Speculative</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;">
          <div>
            <p style="font-weight:700;font-size:0.8rem;margin-bottom:0.75rem;color:#10b981;">Built</p>
            <ul style="list-style:none;padding:0;font-size:0.8rem;line-height:2;">
              <li>✓ ForesightScope platform deployed</li>
              <li>✓ 50-year scenario: Nature Sustainability, NRCan, Balsillie</li>
              <li>✓ Tokenomics designed (USD.ai / PAXG patterns)</li>
              <li>✓ ISED strategy alignment confirmed</li>
              <li>✓ Patent: renewable energy markets</li>
            </ul>
          </div>
          <div>
            <p style="font-weight:700;font-size:0.8rem;margin-bottom:0.75rem;opacity:0.5;">Next Steps</p>
            <ul style="list-style:none;padding:0;font-size:0.8rem;line-height:2;opacity:0.7;">
              <li>○ Smart contract audit</li>
              <li>○ CSA Sandbox application</li>
              <li>○ First financing partnership</li>
              <li>○ 10 pilot nodes online</li>
              <li>○ Enterprise pilot contract</li>
            </ul>
          </div>
        </div>
        <p style="font-size:0.75rem;opacity:0.5;margin-top:1rem;font-style:italic;">Pre-launch. Clear path. The 50-year strategy draws on peer-reviewed science, government roadmaps, and semiconductor supply chain analysis.</p>`,
    },
    {
      id: "slide-horizon",
      title: "From Nodes to Sovereignty",
      type: "content",
      section: "Viability",
      intent: "Vertical integration grounded in Taiwan precedent. SDGs structural.",
      html: `<h2 style="font-size:1.3rem;margin-bottom:1.25rem;">The Path to Sovereignty</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:1.25rem;">
          <div style="padding:1rem;border-radius:0.75rem;border:1px solid rgba(14,165,233,0.12);">
            <p style="font-weight:700;font-size:0.75rem;color:#0ea5e9;margin-bottom:0.5rem;">Now (0-5 yr)</p>
            <p style="font-size:0.72rem;line-height:1.5;opacity:0.8;">Distributed nodes. Financing. Enterprise pilots. Demand creation.</p>
          </div>
          <div style="padding:1rem;border-radius:0.75rem;border:1px solid rgba(16,185,129,0.12);">
            <p style="font-weight:700;font-size:0.75rem;color:#10b981;margin-bottom:0.5rem;">Build (5-20 yr)</p>
            <p style="font-size:0.72rem;line-height:1.5;opacity:0.8;">Network effect. Government customer. SMR co-location. Chip packaging.</p>
          </div>
          <div style="padding:1rem;border-radius:0.75rem;border:1px solid rgba(245,158,11,0.12);">
            <p style="font-weight:700;font-size:0.75rem;color:#f59e0b;margin-bottom:0.5rem;">Sovereign (20-50 yr)</p>
            <p style="font-size:0.72rem;line-height:1.5;opacity:0.8;">Vertical integration. Domestic fabrication. Full supply chain sovereignty.</p>
          </div>
        </div>
        <p style="font-size:0.8rem;opacity:0.7;margin-bottom:1rem;">Taiwan took 40 years from zero to global semiconductor leader. The path is proven. It starts with demand creation.</p>
        <div style="display:flex;gap:1rem;">
          <span style="font-size:0.7rem;padding:0.3rem 0.6rem;border-radius:1rem;background:rgba(14,165,233,0.08);color:#0ea5e9;">SDG 9: Infrastructure</span>
          <span style="font-size:0.7rem;padding:0.3rem 0.6rem;border-radius:1rem;background:rgba(16,185,129,0.08);color:#10b981;">SDG 7: Clean Energy</span>
          <span style="font-size:0.7rem;padding:0.3rem 0.6rem;border-radius:1rem;background:rgba(245,158,11,0.08);color:#f59e0b;">SDG 12: Production</span>
        </div>`,
    },
    {
      id: "slide-team-ask",
      title: "Team & Ask",
      type: "content",
      section: "Close",
      intent: "Credibility. Specific use of funds. Close with 'sovereignty' not 'compute.' The journey ends with the nation.",
      html: `<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:2.5rem;">
        <div>
          <h2 style="font-size:1.3rem;margin-bottom:1rem;">Team</h2>
          <div style="font-size:0.78rem;line-height:2;">
            <p><strong>Francis Wang</strong> — Lead & Technical. AI systems, foresight (APPETITE model), blockchain architecture. Patent: renewable energy. DBA + DDes. Prior: early engineer, $680M startup.</p>
            <p><strong>Maria Smirnova</strong> — Futures Research & Scenarios</p>
            <p><strong>Alex Li</strong> — Design & Aesthetics</p>
            <p><strong>James Cheng</strong> — Content & Ecosystem</p>
            <p><strong>William Yao</strong> — Finance & Governance (Build-to-Manage)</p>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;justify-content:center;padding:1.5rem;border-radius:0.75rem;background:rgba(16,185,129,0.04);border:1px solid rgba(16,185,129,0.15);">
          <p style="font-weight:700;font-size:0.9rem;margin-bottom:1rem;">The Ask: $10,000</p>
          <ul style="list-style:none;padding:0;font-size:0.8rem;line-height:2;">
            <li>→ Smart contract security audit</li>
            <li>→ First hardware procurement batch</li>
          </ul>
          <p style="font-size:0.72rem;opacity:0.6;margin-top:0.75rem;">Most capital-efficient first step: prove security, deploy real hardware in Canadian homes.</p>
          <p style="font-weight:700;font-size:1.1rem;margin-top:1.5rem;color:#10b981;">Back Canadian sovereignty.</p>
        </div>
      </div>`,
    },
    // ─── APPENDIX ────────────────────────────────────────────────
    {
      id: "slide-scenario",
      title: "50-Year Scenario",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'Why Canada? What's the long-term vision?' Civilisational framing with research citations.",
      html: `<h2 style="font-size:1.3rem;margin-bottom:1.25rem;">The 50-Year Scenario (Research-Backed)</h2>
        <div style="font-size:0.78rem;line-height:2;margin-bottom:1rem;">
          <p><strong>1. Climate physics:</strong> 2.1-3.7B people outside human climate niche by 2100 (Lenton et al. 2023, Nature Sustainability)</p>
          <p><strong>2. Migration pressure:</strong> 216M internal climate migrants by 2050 (World Bank Groundswell 2021). Northward movement inevitable.</p>
          <p><strong>3. Canada's position:</strong> 2nd largest territory, 38M people, human climate niche optimal (~13°C MAT = southern Canada)</p>
          <p><strong>4. Energy advantage:</strong> Quebec $0.07/kWh; cold climate 40-60% cooling reduction; SMRs for northern communities ($5.3B market)</p>
          <p><strong>5. Infrastructure gap:</strong> Northern regions lack energy, connectivity, compute. Remote communities on diesel.</p>
          <p><strong>6. Co-location model:</strong> SMR + compute = self-sufficient settlements. Economically viable through compute revenue.</p>
          <p><strong>7. Vertical integration:</strong> Demand base → chip packaging (10-20yr) → fabrication (20-50yr). Taiwan precedent: 40 years zero to leader.</p>
        </div>
        <p style="font-size:0.75rem;opacity:0.5;">This is not speculation. Each step is grounded in peer-reviewed science, government roadmaps, or historical precedent.</p>`,
    },
    {
      id: "slide-tokenomics",
      title: "Tokenomics",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'How do the tokens work?' question.",
      html: `<h2 style="font-size:1.3rem;margin-bottom:1.25rem;">Dual-Token Mechanics</h2>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:1rem;align-items:center;margin-bottom:1.5rem;">
          <div style="padding:1.25rem;border-radius:0.75rem;border:1px solid rgba(245,158,11,0.2);text-align:center;">
            <p style="font-weight:700;color:#f59e0b;font-size:1rem;">NRG</p>
            <p style="font-size:0.72rem;opacity:0.7;margin-top:0.4rem;">Energy Credit</p>
            <p style="font-size:0.68rem;opacity:0.5;margin-top:0.4rem;">Minted: verified renewable generation</p>
            <p style="font-size:0.68rem;opacity:0.5;">Burned: energy use or exchange</p>
          </div>
          <div style="font-size:1.5rem;opacity:0.3;">⇄</div>
          <div style="padding:1.25rem;border-radius:0.75rem;border:1px solid rgba(14,165,233,0.2);text-align:center;">
            <p style="font-weight:700;color:#0ea5e9;font-size:1rem;">CMP</p>
            <p style="font-size:0.72rem;opacity:0.7;margin-top:0.4rem;">Compute Credit</p>
            <p style="font-size:0.68rem;opacity:0.5;margin-top:0.4rem;">Minted: verified compute provision</p>
            <p style="font-size:0.68rem;opacity:0.5;">Burned: compute access</p>
          </div>
        </div>
        <p style="font-size:0.78rem;opacity:0.6;text-align:center;">AMM exchange (market-driven) • Both burned on use • No speculation incentive • Burn-Mint Equilibrium</p>`,
    },
    {
      id: "slide-regulatory",
      title: "Regulatory Pathway",
      type: "appendix",
      section: "Appendix",
      intent: "Backup for 'Is this legal?' question.",
      html: `<h2 style="font-size:1.3rem;margin-bottom:1.25rem;">CSA Sandbox Pathway</h2>
        <div style="display:flex;flex-direction:column;gap:0.6rem;">
          <div style="display:flex;align-items:center;gap:0.75rem;"><div style="width:1.75rem;height:1.75rem;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">1</div><p style="font-size:0.8rem;">Securities counsel (crypto-specialist, Canadian)</p></div>
          <div style="display:flex;align-items:center;gap:0.75rem;"><div style="width:1.75rem;height:1.75rem;border-radius:50%;background:#0ea5e9;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">2</div><p style="font-size:0.8rem;">CSA pre-filing conference</p></div>
          <div style="display:flex;align-items:center;gap:0.75rem;"><div style="width:1.75rem;height:1.75rem;border-radius:50%;background:#f59e0b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">3</div><p style="font-size:0.8rem;">Regulatory Sandbox application (time-limited relief)</p></div>
          <div style="display:flex;align-items:center;gap:0.75rem;"><div style="width:1.75rem;height:1.75rem;border-radius:50%;background:#8b5cf6;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">4</div><p style="font-size:0.8rem;">Operate under Sandbox; quarterly reporting</p></div>
          <div style="display:flex;align-items:center;gap:0.75rem;"><div style="width:1.75rem;height:1.75rem;border-radius:50%;background:#6366f1;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;">5</div><p style="font-size:0.8rem;">Graduate to full registration (Year 2-3)</p></div>
        </div>
        <div style="margin-top:1.25rem;padding:0.75rem 1rem;background:rgba(16,185,129,0.03);border:1px solid rgba(16,185,129,0.1);border-radius:0.5rem;">
          <p style="font-size:0.75rem;opacity:0.7;"><strong>Design:</strong> Utility-first (burned on use). No profit promises. Immediate utility at launch. Decentralised governance.</p>
        </div>`,
    },
  ],

  story: {
    type: "steps",
    visualisation: "wordcloud",
    steps: [
      { id: "step-1", label: "Opening", thread: "vision", conceptsAdded: ["sovereign Canada", "nation-building", "50-year journey"] },
      { id: "step-2", label: "Climate", thread: "crisis", conceptsAdded: ["3.7 billion displaced", "human climate niche", "northward migration"], conceptsFaded: ["50-year journey"] },
      { id: "step-3", label: "Convergence", thread: "crisis", conceptsAdded: ["compute sovereignty", "Budget 2024", "digital colony", "140,000 professionals"] },
      { id: "step-4", label: "Vision", thread: "infrastructure", conceptsAdded: ["SMR co-location", "northern settlements", "energy sovereignty", "$5.3B market"], conceptsFaded: ["digital colony"] },
      { id: "step-5", label: "Mechanism", thread: "mechanism", conceptsAdded: ["DAI Compute", "asset-backed", "burn on use", "$0 down"], conceptsFaded: ["3.7 billion displaced", "northward migration"] },
      { id: "step-6", label: "Complement", thread: "mechanism", conceptsAdded: ["complement SCIP", "citizen participation", "distributed nodes"] },
      { id: "step-7", label: "Credibility", thread: "mechanism", conceptsAdded: ["ForesightScope", "peer-reviewed", "ISED aligned"] },
      { id: "step-8", label: "Horizon", thread: "vision", conceptsAdded: ["vertical integration", "Taiwan precedent", "chip sovereignty"], conceptsFaded: ["compute sovereignty", "Budget 2024"] },
      { id: "step-9", label: "Close", thread: "vision", conceptsAdded: ["sovereign capacity", "Canadian backbone", "back sovereignty"] },
    ],
    threadColors: {
      crisis: "#e06666",
      infrastructure: "#0ea5e9",
      mechanism: "#10b981",
      vision: "#f59e0b",
    },
  },

  anchors: [
    { slideId: "slide-title", storyStepId: "step-1" },
    { slideId: "slide-hook", storyStepId: "step-2" },
    { slideId: "slide-stakes", storyStepId: "step-3" },
    { slideId: "slide-vision", storyStepId: "step-4" },
    { slideId: "slide-mechanism", storyStepId: "step-5" },
    { slideId: "slide-gap", storyStepId: "step-6" },
    { slideId: "slide-traction", storyStepId: "step-7" },
    { slideId: "slide-horizon", storyStepId: "step-8" },
    { slideId: "slide-team-ask", storyStepId: "step-9" },
  ],
};
