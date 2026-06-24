---
type: note
status: published
publish_type: lexicon
tags: [Knowledge Architecture, Information Design, Composability, Systems Thinking, Meta-Cognition]
originated_date: 2026-06-23
publish_date: 2026-06-23
title: Knowledge Grammars
description: The principle that every knowledge system, article, or process map is a graph in disguise, and that selecting the right noun-types and verb-types for a given goal is the foundational design act that keeps that graph legible and actionable
trademark: false
---

## Every Article is a Graph in Disguise

Any piece of writing contains an implicit graph. A research paper connects hypotheses to evidence through verbs like "supports," "contradicts," and "extends." A strategy document connects objectives to initiatives through verbs like "enables," "requires," and "measures." A meeting transcript connects decisions to people through verbs like "proposed," "approved," and "blocked." The graph is always there. The question is whether you make it explicit, and if so, which graph you choose to see.

Making the graph explicit requires selecting a finite set of **noun-types** (what kinds of things exist in this system) and **verb-types** (how those things can relate to each other). This selection is a **Knowledge Grammar**: the structural vocabulary that determines what can be expressed, navigated, and discovered within a knowledge system.

A tagging system permits only "belongs to" relationships. A citation network permits only "cites" relationships. A folder hierarchy permits only "contains" relationships. Each of these is a grammar choice, usually made unconsciously, that determines what becomes visible and what remains structurally inexpressible. Knowledge Grammars names this choice and argues that making it deliberately is a foundational design act.

The distinction from adjacent concepts is precise. [Knowledge Composability](/lexicon/knowledge-composability) describes the outcome: knowledge systems becoming overlayable and recombinable across boundaries. Knowledge Grammars describes the mechanism that makes composability possible or prevents it. Two systems compose when their grammars are translatable. They fail to compose when their grammars are incompatible, regardless of how well-structured their content is internally.

## Grammars are Goal-Dependent

The grammar you need depends on what you are trying to see. Different communicative goals require different structural vocabularies because each goal asks different questions of the underlying material.

Consider a single intellectual territory mapped at three levels of zoom:

| Goal | Noun-Types | Verb-Types | What Becomes Visible |
|------|-----------|-----------|---------------------|
| Navigate a landscape of concerns | Domains (intellectual territories) | enables, parallels, grounds, tensions | Which fields provide foundations for others; where structural analogies exist |
| Trace intellectual lineage within a domain | Sources (articles, books, papers) | cites, extends, contradicts, synthesises | How ideas build on each other; where disagreements live |
| Reason about ideas precisely | Concepts (definitions, claims, models) | subsumes, decomposes, instantiates, contrasts | How one concept contains another; where boundaries lie |

Each level serves a distinct purpose. The domain-level grammar helps you decide where to invest attention. The source-level grammar helps you understand how a field evolved. The concept-level grammar helps you think clearly about what a term means and where it breaks down. Using a source-level grammar to navigate between domains would produce noise. Using a domain-level grammar to reason about individual concepts would produce vagueness. The grammar must match the goal.

A concrete example: mapping 83 intellectual domains into a navigable landscape required choosing a grammar. We selected domains like `complexity-systems`, `pattern-languages`, and `regenerative-design` as nouns. We chose verbs like `enables`, `parallels`, and `grounds` to connect them. This grammar makes visible which domains provide foundational knowledge for others (complexity-systems *enables* artificial-intelligence), where structural analogies exist across distant fields (pattern-languages *parallels* software-architecture), and where empirical reality anchors abstract theory (ecology-earth-systems *grounds* complexity-systems). It makes other things invisible: the temporal evolution of these relationships, the internal structure of each domain, the specific sources that justify each connection. Those would require different grammars at different levels of zoom.

## Grammar Selection as a Design Act

Choosing a grammar is choosing what questions your knowledge system can answer. This choice has three structural consequences.

**Expressibility** determines what relationships can be stated. If your grammar includes only "relates to" as a verb-type, you cannot distinguish between a domain that enables another and one that productively contradicts it. The information exists in someone's mind, but the system cannot hold it. Adding "enables" and "tensions" as distinct verb-types makes that distinction structurally expressible.

**Navigation** determines what paths exist between nodes. You can only traverse connections that your grammar permits. A grammar with "cites" as its only verb produces a citation graph where you can trace influence chains. A grammar with "cites," "contradicts," and "synthesises" produces a richer graph where you can trace intellectual disagreements and resolutions. The grammar defines the topology of possible movement through knowledge.

**Composability** determines what external systems can connect to yours. Two teams in the same organisation may structure knowledge incompatibly without realising it. One team uses an undifferentiated "relates to" for all connections. Another distinguishes "enables" from "applies" from "tensions." Their knowledge cannot compose even when they share vocabulary. The grammar mismatch is invisible until someone tries to merge their maps into a shared commons.

Programming language design offers a structural analogy. A type system is a grammar for computation: it determines what operations are valid, what compositions are meaningful, and what errors are catchable before execution. Similarly, a Knowledge Grammar determines what connections are valid, what compositions are meaningful, and what structural inconsistencies are detectable before they cause confusion. In both cases, the grammar is a constraint that enables rather than restricts: by limiting what can be expressed, it makes what IS expressed trustworthy and navigable.

## Legibility Toward a Goal

The deepest practical consequence of grammar selection is **legibility**: the right grammar keeps a graph finite and actionable rather than infinitely detailed and unusable.

Any real system can be described at infinite resolution. An organisation's operations could be mapped with every email, every meeting, every micro-decision as a node. The resulting graph would be complete and utterly useless. No automation candidate would be visible because everything would be connected to everything else with equal structural weight. The graph would be technically accurate and practically illegible.

Grammar selection solves this by constraining representation to what matters for the intended purpose. When mapping an organisation's processes with the goal of identifying what to automate, a grammar with noun-types for roles, tasks, and decision points, and verb-types for triggers, transforms, and validates, produces a graph where automation candidates are structurally visible. Tasks connected only by "triggers" and "transforms" verbs (with no "judges" or "creates" verbs) are candidates for agent amplification. The grammar makes this visible without requiring someone to read through the entire process narrative and infer it.

This connects directly to how [Hybrid Intelligence](/lexicon/hybrid-intelligence) teams are designed. The [Process Mapping](/lexicon/process-mapping-from-business-models) step that precedes agent design is fundamentally a grammar selection act: you choose noun-types and verb-types that make the process legible toward the goal of identifying which functions to amplify with AI agents. A different goal (cost reduction, compliance auditing, customer experience improvement) would demand a different grammar of the same underlying process, surfacing different structural patterns and different action candidates.

The principle generalises: any time you need a graph to be actionable, you need a grammar that constrains it toward your purpose. The [Strategy Map](/lexicon/strategy-map) uses a grammar of Context, Policy, Process, and Agent as noun-types precisely because those four levels make governance decisions legible. The [Perceptiosphere](/lexicon/perceptiosphere) uses a grammar of Sources, Cards, Ecosystem entries, and Atlas MOCs because those types make knowledge cultivation legible. Each grammar is provisional and evolving. The principle that it must be deliberately chosen is foundational.

## References

- Alexander, Christopher. *Notes on the Synthesis of Form.* Harvard University Press, 1964. Design as the resolution of misfit between form and context; structural decomposition as a precondition for legible design.
- Berners-Lee, Tim. "Linked Data." W3C Design Issues, 2006. RDF triples (subject-predicate-object) as a minimal grammar for expressing relationships on the web.
- Chomsky, Noam. *Syntactic Structures.* Mouton, 1957. Formal grammars as generative systems that determine what strings are valid in a language; the structural analogy to knowledge expressibility.
- Langlands, Robert P. "Letter to Andre Weil." 1967. Structural isomorphism between number theory and harmonic analysis as an instance of grammar translation enabling cross-domain composition.
- Sowa, John F. *Knowledge Representation: Logical, Philosophical, and Computational Foundations.* Brooks/Cole, 2000. Ontological categories and semantic relations as formal systems for structuring knowledge.

## Cross-links

- [Hybrid Intelligence](/lexicon/hybrid-intelligence)
- [Knowledge Composability](/lexicon/knowledge-composability)
- [Knowledge Curation and Stewardship](/lexicon/knowledge-curation-and-stewardship)
- [Perceptiosphere](/lexicon/perceptiosphere)
- [Process Mapping from Business Models](/lexicon/process-mapping-from-business-models)
- [Strategy Map](/lexicon/strategy-map)
