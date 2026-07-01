import type { PresentationData } from "../types";

export const librariesOfTheFutureData: PresentationData = {
  title: "Libraries of the Future",
  subtitle: "Hybrid Intelligence and Knowledge Integration in the Post-Agentic World",
  author: "Francis Wang",
  date: "2026-07",
  duration: 15,

  threadColors: {
    "problem": "#ef4444",
    "architecture": "#0ea5e9",
    "measurement": "#10b981",
    "frontiers": "#f59e0b",
  },

  timeline: [
    { id: "ev-01", date: "2026-01-15", label: "Book concept: Libraries of the Future", thread: "problem", conceptsAdded: ["Libraries of the Future", "Third-Party Thinkers", "Cognitive Erosion"] },
    { id: "ev-02", date: "2026-03-20", label: "Perceptiosphere framework crystallises", thread: "architecture", conceptsAdded: ["Perceptiosphere", "Knowledge Sovereignty", "Contextual Integrity", "Composable Collaboration"] },
    { id: "ev-03", date: "2026-05-08", label: "CORE cycle and knowledge zones", thread: "architecture", conceptsAdded: ["CORE Cycle", "Four Zones", "Contribution vs Extraction"] },
    { id: "ev-04", date: "2026-06-30", label: "Cognitive Vitality Index confirmed", thread: "measurement", conceptsAdded: ["Cognitive Vitality Index", "Resonance Wheel", "Six Dimensions", "Critical Threshold"] },
    { id: "ev-05", date: "2026-06-30", label: "Compelling Questions for the field", thread: "frontiers", conceptsAdded: ["Context Economy", "Living Archive", "Socratic AI Partners", "Composable Innovation"] },
  ],

  gestaltTerms: [
    { term: "Third-Party Thinkers", weight: 0.9, appearedAt: "ev-01", thread: "problem" },
    { term: "Cognitive Erosion", weight: 0.85, appearedAt: "ev-01", thread: "problem" },
    { term: "Perceptiosphere", weight: 1.0, appearedAt: "ev-02", thread: "architecture" },
    { term: "Knowledge Sovereignty", weight: 0.8, appearedAt: "ev-02", thread: "architecture" },
    { term: "Contextual Integrity", weight: 0.75, appearedAt: "ev-02", thread: "architecture" },
    { term: "Composable Collaboration", weight: 0.7, appearedAt: "ev-02", thread: "architecture" },
    { term: "CORE Cycle", weight: 0.65, appearedAt: "ev-03", thread: "architecture" },
    { term: "Cognitive Vitality Index", weight: 0.95, appearedAt: "ev-04", thread: "measurement" },
    { term: "Resonance Wheel", weight: 0.7, appearedAt: "ev-04", thread: "measurement" },
    { term: "Critical Threshold", weight: 0.6, appearedAt: "ev-04", thread: "measurement" },
    { term: "Context Economy", weight: 0.55, appearedAt: "ev-05", thread: "frontiers" },
    { term: "Living Archive", weight: 0.55, appearedAt: "ev-05", thread: "frontiers" },
  ],

  storyline: [
    { id: "step-01", title: "Title", slideId: "slide-title", timelineAnchor: "ev-01", section: "Opening" },
    { id: "step-02", title: "The Problem", slideId: "slide-problem", timelineAnchor: "ev-01", section: "Problem" },
    { id: "step-03", title: "Market Gap", slideId: "slide-gap", timelineAnchor: "ev-01", section: "Problem" },
    { id: "step-04", title: "The Perceptiosphere", slideId: "slide-perceptiosphere", timelineAnchor: "ev-02", section: "Framework" },
    { id: "step-05", title: "Cognitive Vitality Index", slideId: "slide-cvi", timelineAnchor: "ev-04", section: "Framework" },
    { id: "step-06", title: "The Resonance Wheel", slideId: "slide-resonance", timelineAnchor: "ev-04", section: "Framework" },
    { id: "step-07", title: "Meta-Demonstrative Design", slideId: "slide-meta", timelineAnchor: "ev-03", section: "Design" },
    { id: "step-08", title: "Sample Writing", slideId: "slide-sample", timelineAnchor: "ev-03", section: "Design" },
    { id: "step-09", title: "Contact", slideId: "slide-cta", timelineAnchor: "ev-05", section: "Closing" },
  ],

  slides: [
    {
      id: "slide-title",
      title: "Title",
      type: "title",
      layout: "title-anchored",
      html: `<div class="gestalt-slide__anchored"><div class="gestalt-slide__anchor gestalt-slide__anchor--center"><h1>Libraries of the Future</h1><p class="gestalt-slide__subtitle">Hybrid Intelligence and Knowledge Integration in the Post-Agentic World</p></div><div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left"><div>Francis (Cong) Wang</div><div>The Future of Knowledge series</div></div><div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-right"><div>Coming 2026</div></div></div>`,
    },
    {
      id: "slide-problem",
      title: "Third-Party Thinkers, Second-Hand Thoughts",
      type: "content",
      html: `<h2>Third-Party Thinkers, Second-Hand Thoughts</h2><p>We are doing more and thinking less.</p><p>Generative AI enables productive output at extraordinary scale while the cognitive capacities that make output meaningful quietly erode beneath the surface.</p><ul><li><strong>Aviation:</strong> Pilot manual flying skills degrade measurably after 6 months of automation reliance</li><li><strong>Medicine:</strong> AI diagnostic reliance produces measurable deskilling in clinical reasoning</li><li><strong>Education:</strong> Cognitive offloading replaces productive struggle required for deep learning</li></ul><p>The pattern is domain-agnostic. The problem is not too much information but too little thinking.</p>`,
    },
    {
      id: "slide-gap",
      title: "Market Gap",
      type: "content",
      html: `<h2>No Existing Book Combines All Three</h2><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:2rem;margin-top:2rem;"><div><h3 style="color:#ef4444">Architecture</h3><p>How knowledge systems should be structured for human-AI collaboration</p></div><div><h3 style="color:#10b981">Measurement</h3><p>How to detect and quantify cognitive erosion before it becomes irreversible</p></div><div><h3 style="color:#f59e0b">Futures</h3><p>What open questions the field must address collectively</p></div></div><p style="margin-top:2rem;opacity:0.7;">Existing books address one dimension. This book proposes that all three are required: you cannot fix what you cannot measure, and you cannot measure without architectural foundations.</p>`,
    },
    {
      id: "slide-perceptiosphere",
      title: "The Perceptiosphere",
      type: "content",
      html: `<h2>The Perceptiosphere</h2><p>A nested architecture of sovereign knowledge zones:</p><div style="text-align:center;margin:2rem 0;font-family:monospace;font-size:0.9rem;line-height:2;"><div style="border:2px solid #f59e0b;padding:1rem;border-radius:50%;width:20rem;margin:0 auto;"><div style="border:2px solid #10b981;padding:1rem;border-radius:50%;width:16rem;margin:0 auto;"><div style="border:2px solid #0ea5e9;padding:1rem;border-radius:50%;width:12rem;margin:0 auto;"><div style="border:2px solid #6366f1;padding:0.75rem;border-radius:50%;width:8rem;margin:0 auto;">Self</div>Trusted Circle</div>Community of Practice</div>Public</div></div><ul><li>Knowledge sovereignty: you control your context</li><li>Contextual integrity: meaning preserved across boundaries</li><li>Composable collaboration: shared without degraded</li></ul>`,
    },
    {
      id: "slide-cvi",
      title: "The Cognitive Vitality Index\u2122",
      type: "content",
      html: `<h2>The Cognitive Vitality Index\u2122</h2><p><strong>Definition:</strong> The proportion and quality of genuinely human-engaged cognitive work within a knowledge system, at any scale.</p><p><strong>Six dimensions:</strong></p><ol><li>Agency Retention</li><li>Critical Thinking Maintenance</li><li>Skill Preservation</li><li>Epistemic Autonomy</li><li>Cognitive Load Balance</li><li>Synthesis Quality</li></ol><p><strong>Key insight:</strong> Below a critical threshold of genuine engagement, capabilities enter an irreversible degradation spiral. CVI provides the early warning system.</p>`,
    },
    {
      id: "slide-resonance",
      title: "The Resonance Wheel\u2122",
      type: "content",
      html: `<h2>The Resonance Wheel\u2122</h2><p>A visualisation methodology for revealing interdependencies between CVI dimensions.</p><p>Complex indices cannot be decomposed into independent variables. Improving one dimension can suppress another. The Resonance Wheel makes these trade-offs visible.</p><p style="margin-top:2rem;padding:1.5rem;border:1px solid rgba(0,0,0,0.1);border-radius:0.5rem;background:rgba(0,0,0,0.02);"><em>The Resonance Wheel corrects the reductionist illusion that you can optimise each dimension in isolation. It is the complexity companion to the CVI.</em></p>`,
    },
    {
      id: "slide-meta",
      title: "Meta-Demonstrative Design",
      type: "content",
      html: `<h2>Meta-Demonstrative Design</h2><p>The book practises what it prescribes:</p><ul><li><strong>Annotation-rich format:</strong> margin notes, footnotes, and highlights create multiple reading depths</li><li><strong>Question priming:</strong> every chapter opens with questions that activate prior knowledge before presenting new material</li><li><strong>Cognitive friction:</strong> deliberate pauses designed to prevent passive reading</li><li><strong>Structured reflection:</strong> author commentary models reflective practice</li></ul><p style="margin-top:2rem;">If a book about preserving cognitive engagement allows passive consumption, it refutes its own thesis.</p>`,
    },
    {
      id: "slide-sample",
      title: "Sample Writing",
      type: "content",
      html: `<h2>Sample Writing Available</h2><p>Print-format samples demonstrating the annotation system in practice:</p><ul><li><strong>Preface:</strong> "How to Navigate This Book" (self-contained demonstration)</li><li><strong>Introduction opening:</strong> "Third-Party Thinkers, Second-Hand Thoughts"</li><li><strong>Chapter 3 opening:</strong> The Perceptiosphere (core IP in narrative with margin notes)</li></ul><p style="margin-top:2rem;opacity:0.7;">All produced in CSS Paged Media (Paged.js) for print-ready PDF delivery.</p>`,
    },
    {
      id: "slide-cta",
      title: "Contact",
      type: "content",
      layout: "title-anchored",
      html: `<div class="gestalt-slide__anchored"><div class="gestalt-slide__anchor gestalt-slide__anchor--center"><h2>Let's Talk</h2><p style="margin-top:1rem;"><a href="https://findcongwang.com/projects/libraries-of-the-future" target="_blank" rel="noopener">findcongwang.com/projects/libraries-of-the-future</a></p><p style="margin-top:2rem;">Francis (Cong) Wang<br/>francis.wang@fw.vision</p></div><div class="gestalt-slide__anchor gestalt-slide__anchor--bottom-left"><div>Publisher target: Chapman & Hall / CRC Press</div><div>Delivery: October 2026</div></div></div>`,
    },
  ],
};
