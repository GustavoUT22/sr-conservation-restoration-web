# Product

## Register

brand

## Users

Curators, collections managers, private collectors, religious institutions and heritage bodies in Peru — plus the occasional private owner of an inherited piece. They arrive from a referral or a search, on desktop as often as mobile, and they are deciding one thing: **is this person competent enough to touch an irreplaceable object?**

That decision is made in the first ten seconds, before any body copy is read. The job the site has to do is transfer confidence, then make it easy to start a conversation.

## Product Purpose

The professional site of Solange Rodríguez, conservator-restorer based in Lima. It exists to win commissions — from institutions primarily, private collectors secondarily. It is not a personal portfolio and not a blog.

Success is a qualified enquiry through the contact form or a direct email from someone who already trusts her before writing.

## Brand Personality

Editorial, museum-grade, quietly authoritative. The tone of an exhibition catalogue, not of a service provider.

Three words: **precise, reverent, cinematic.**

The emotional target is *confidence through restraint* — the sense that the person behind this work does not need to oversell, because the work carries itself.

## Anti-references

- **Creative-portfolio template.** Generic "designer portfolio" layouts with icon-and-heading card grids repeated down the page.
- **Corporate SaaS.** Hero metrics, feature grids, gradient accents, rounded cards, pill buttons.
- **Playful or trendy-for-its-own-sake.** No whimsy, no illustration, no hand-drawn or sketchy assets.
- **Craft-fair artisanal.** Warm parchment/cream backgrounds, paper-grain textures, "handmade" cues. Restoration is a technical discipline, not a craft stall.
- **Decoration that competes with the work.** Any visual effect that draws attention away from the pieces themselves fails, no matter how impressive it is in isolation.

## Design Principles

1. **The work outranks the interface.** Photography of the pieces is the strongest asset on this site. Every layout decision either showcases it or gets out of its way. Effects serve the object; they never perform beside it.

2. **Earn trust before asking for it.** Specificity is the credibility mechanism — real materials, real techniques, real dates. Vague claims ("pasión por el arte") read as weaker than a technical note a curator can verify.

3. **Restraint is the luxury signal.** Confidence shows in what is left out. Density and silence are both tools; the page should breathe unevenly, not uniformly.

4. **Vary the rhythm deliberately.** Repeating one section skeleton reads as templated even when each instance is well made. Every section should earn its own structure and its own entrance.

5. **Motion must mean something.** Animation belongs to the craft being described — revealing, cleaning, reintegrating, layering. Movement that any portfolio could have is decoration and gets cut.

## Visual Direction

**Cinematic gallery, maximum intensity** (decided 2026-07-25).

Full-bleed imagery on a constant dark ground, minimal text, hard typographic hierarchy. Ambitious scroll-driven moments in every section rather than reserved highlights.

**Accepted risk, recorded deliberately:** this direction has the highest ceiling *and* the lowest tolerance for weak photography — it magnifies whatever image it is given. The current library is seven images reused across sections, with no real before/after pairs. Until Solange supplies high-resolution originals and genuine before/after sets, the execution will outrun the material. This is a known trade-off, not an oversight.

Secondary risk: maximum intensity pulls against the institutional audience's expectation of sobriety. Mitigation is that intensity lives in *imagery and transitions*, never in ornament, colour noise or novelty typography.

## Accessibility & Inclusion

- **WCAG 2.1 AA.** Body text ≥ 4.5:1, large text ≥ 3:1. The existing `--text-muted` token is suspected to fail on both grounds and is under audit.
- **`prefers-reduced-motion` is mandatory**, and non-negotiable given the motion-heavy direction. Every scroll-driven reveal needs a crossfade or instant fallback.
- Keyboard navigation must remain intact everywhere, with visible `:focus-visible` states — a dark cinematic ground makes weak focus rings disappear.
- Spanish-only content (`lang="es"`), audience in Peru. No i18n planned.
- Text over full-bleed imagery must guarantee contrast by construction (scrim or gradient), never by hoping the photograph is dark enough.
