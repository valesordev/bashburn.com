# bashburn.com — Look & Feel Brief

Working doc for brainstorming and developing the visual direction of this site. Written to be handed to a design tool
(Claude Design or similar) as grounding context. Everything under **Current State** is verbatim from the codebase —
keep it accurate as the site changes. Everything under **Open Questions** is deliberately unresolved.

---

## What this site is

bashburn — Brian's personal technical blog and conference-talk workspace.

Positioning copy currently live on the homepage:

> **~/bashburn**
> **$ whoami** — Brian
> I write about observability, infrastructure, and the developer tooling that makes everything feel fast.
> I'm also working on conference talks — this site is part of that process.

Site description: *"Writing on observability, infrastructure, developer tooling, and conference talks in progress."*

The key phrase is **"this site is part of that process."** Talks in progress are published *as* they're being
developed, not after they're delivered. That's an unusual and genuinely interesting editorial stance — the site
is a working surface, not an archive of finished things.

Context: Brian is an SE at Grafana Labs. Observability content here is professional-adjacent but personal.

---

## Current State

### Colors

From `src/styles/global.css` — GitHub dark, essentially verbatim:

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#0d1117` | GitHub dark canvas |
| `--color-text` | `#c9d1d9` | GitHub dark default text |
| `--color-accent` | `#3fb950` | Terminal green |
| `--color-accent-hover` | `#2ea043` | Darker green |
| `--color-surface` | `#161b22` | GitHub dark raised surface |
| `--color-border` | `#30363d` | GitHub dark border |
| `--color-muted` | `#8b949e` | GitHub dark secondary text |
| `--color-header-bg` | `#0d1117ee` | Sticky translucent header (`ee` ≈ 93% alpha) |

Additional hardcoded values inside the prose system:

- `#e6edf3` — prose headings (brighter than body text)
- `#d2a679` — inline `code` text, warm tan
- `#c9d1d9` — code inside `pre` (matches body)

The palette is coherent and committed: terminal, GitHub-native, developer-default. It reads as "I live in a
terminal," which is true. The one non-GitHub choice is the warm tan `#d2a679` for inline code — the only warm
value in an otherwise entirely cool palette, and it works.

### Typography

**The only monospace-first site of the five:**

```css
font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
```

Note: **no webfont is loaded.** JetBrains Mono, Fira Code, and Cascadia Code are named but not fetched — visitors
without them locally installed fall through to `ui-monospace` (SF Mono / Consolas / etc.). On Brian's own machine
it looks intentional; for most visitors it's the system mono. Either load one or accept `ui-monospace` as the
real choice.

### Prose system

**The most developed CSS of the five sites by a wide margin.** A full `.prose` implementation, hand-written
rather than using `@tailwindcss/typography`:

- `max-width: 65ch` — proper measure for reading
- `h1` 2rem · `h2` 1.5rem with bottom border + padding · `h3` 1.25rem
- Paragraphs: `1.75` line-height, `1.25rem` bottom margin
- Links: accent green, underlined, darker green on hover
- Inline `code`: surface bg, border, `4px` radius, `0.875em`, warm tan text
- `pre`: surface bg, border, `6px` radius, `1rem` padding, `overflow-x: auto`; nested `code` resets to plain
- Lists: disc/decimal, `1.5rem` indent, `0.25rem` item spacing
- Blockquote: `3px` accent-green left border, muted text

This is a real reading experience, carefully specified. Any redesign should treat it as the site's most
valuable existing asset, not something to replace casually.

### Pages

- `src/pages/index.astro` — `$ whoami` intro, `$ ls blog/` (5 most recent posts), active talks
- `src/pages/blog/index.astro` — all posts
- `src/pages/blog/[slug].astro` — post
- `src/pages/talks.astro` — talks

Nav: blog · talks.

### Content model

Two Astro content collections (`src/content/config.ts`):

- **`blog`** — has `draft` (filtered out of listings), `title`, `date`, `description`. One post: `getting-started`
- **`talks`** — has `status`; the homepage shows only talks where `status !== 'delivered'`. One talk:
  `observability-for-engineers`

The `status !== 'delivered'` filter is the editorial stance encoded in code: the homepage surfaces
work-in-progress and retires finished work.

### Shell-prompt motif

`~/bashburn` as the wordmark, `$ whoami` and `$ ls blog/` as section headers. Consistent and effective —
the strongest single design idea across all five sites.

---

## The Shared-UI Constraint

Read this before proposing anything. It determines whether a change is cheap or expensive.

**`@valesordev/ui` provides:**

| Export | What it is |
|---|---|
| `BaseLayout.astro` | Page shell — head, meta, slots |
| `SiteHeader.astro` | Nav wrapper |
| `SiteFooter.astro` | Footer wrapper |
| `styles/base.css` | Tailwind import + `--color-bg` / `--color-text` + a `body` rule |

**The shared base defines only two variables:** `--color-bg` and `--color-text`. Everything else in the table
above — plus the entire `.prose` system — is local to this repo. There is no shared contract for those tokens;
the naming is convention across sites, nothing enforces it.

**So a look-and-feel change is one of two very different things:**

- **Token override** — edit `:root` in `src/styles/global.css`. Site-local, safe, affects nothing else.
- **Component change** — edit `@valesordev/ui`. Hits all five sites at once, requires an npm publish
  (`npm.pkg.github.com`) and a dependency bump in each consumer.

Default to token overrides. Reach for the shared package only when a structural change genuinely belongs to
every property.

**Specific note for this site:** the `.prose` system is a strong candidate for eventually moving into
`@valesordev/ui` — it's the only real typographic work in the portfolio and other sites will need reading
styles as they grow. But it's currently tuned to a mono-first, terminal-green site. Generalizing it means
tokenizing the hardcoded `#e6edf3` and `#d2a679`.

---

## Open Questions

Genuinely unresolved — these are prompts for brainstorming, not decisions already made.

1. **Load a webfont or commit to system mono?** JetBrains Mono is named but never fetched, so the site most
   people see isn't the site as designed. Loading it costs a request; accepting `ui-monospace` is free and
   arguably more honest for a terminal aesthetic. Decide deliberately.
2. **Mono for body text — really?** Full-monospace body copy is a strong aesthetic commitment that hurts
   long-form readability. A mono/sans split (mono for chrome, headings, and code; a readable sans or serif for
   prose) would keep the identity and improve the actual reading. This is the biggest open question here.
3. **How far does the terminal metaphor go?** `~/bashburn`, `$ whoami`, `$ ls blog/` are used lightly and well.
   Pushing further (a real prompt, cursor, keyboard nav, `cd` between sections) could be delightful or
   exhausting. Where's the line?
4. **Talks-in-progress as a first-class feature.** The `status !== 'delivered'` filter is genuinely
   distinctive. Should the design foreground it — a visible pipeline, drafting state, revision history —
   rather than just a list?
5. **GitHub dark: default or deliberate?** The palette is near-identical to GitHub's. Instantly legible to
   the audience, but it means the site looks like every other developer blog. Is there a version that keeps
   the terminal feel with a palette that's actually its own?
6. **Personal vs. professional.** Observability content overlaps with Brian's Grafana Labs work. Does the
   site read as a personal notebook or a professional presence? The `$ whoami` framing says notebook; the
   subject matter says professional.
7. **Does `.prose` get promoted to shared?** See the constraint section above — worth deciding before other
   sites start hand-rolling their own reading styles.

---

## Assets

No `design/` source files (XCF/AI) in this repo yet — this doc is the first thing here. The site currently uses
no logo or imagery; the `~/bashburn` wordmark is text.

`solo7productions.com/design/` and `system9studios.com/design/` hold logo sources as XCF + exported PNG; follow
that pattern if a mark is ever made for this site.

---

## Working Notes

- Stack: Astro 5 + Tailwind 4, deployed to GitHub Pages via a reusable workflow in `@valesordev/ui`
- Local dev: `npm install && npm run dev`
- Related planning: `valesor/web-infrastructure.md` in `life.solo7.media`
- Setup checklist: `SITE_CONFIG.md`
- **Deploy note:** GitHub Pages custom-domain conflict is unresolved for this domain — the domain is already
  claimed elsewhere and needs ownership verification or release before the site goes live
