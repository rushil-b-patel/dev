# Design — rushilpatel.dev

A locked design system for this site. Every page redesign reads this file before
emitting code. Extend or amend this file when the system needs to grow — do not
regenerate per page.

## Genre

editorial — minimal personal document. Dense, quiet, typography-led.

## Macrostructure family

- Home: Long Document — single narrow column (`max-w-2xl`), dashed section
  dividers, no hero; the intro block leads.
- Content pages (blog index, posts, 404): Long Document — same column, prose-led.
- There are no marketing pages. No enrichment anywhere: typography only.

## Theme

Custom, extracted from the existing brand. Papers are warmed toward the saffron
anchor; saffron is the only decorative accent.

| Token                | Light                  | Dark                   | Role                     |
| -------------------- | ---------------------- | ---------------------- | ------------------------ |
| `--background-color` | `oklch(99% 0.004 60)`  | `oklch(17% 0.008 50)`  | paper                    |
| `--text-primary`     | `oklch(24% 0.012 50)`  | `oklch(95% 0.005 60)`  | ink                      |
| `--text-secondary`   | `oklch(37% 0.01 50)`   | `oklch(85% 0.005 55)`  | ink-2                    |
| `--text-muted`       | `oklch(51% 0.01 50)`   | `oklch(68% 0.008 50)`  | muted                    |
| `--rule`             | `oklch(91% 0.006 60)`  | `oklch(28% 0.008 50)`  | hairlines, dividers      |
| `--surface`          | `oklch(96.5% 0.004 60)`| `oklch(23% 0.008 50)`  | chips, panels            |
| `--saffron`          | `oklch(56% 0.13 40)`   | `oklch(65% 0.12 40)`   | accent + focus ring      |
| `--text-inverse`     | `oklch(98% 0.004 60)`  | `oklch(24% 0.012 50)`  | text on inverted surface |

Tailwind bridge (`@theme inline` in `globals.css`): `rule`, `surface`, `saffron`
are usable as `border-rule`, `divide-rule`, `bg-surface`, `text-saffron`, etc.
Never hardcode `gray-*` / `neutral-*` for borders or surfaces — use the tokens.
Semantic exception: GitHub PR status colours (purple/green/red) in Work.

## Typography

- Display: Geist, 600–700 — all `h1`–`h3` (set globally in `globals.css`)
- Body: Google Sans, 400
- Mono: Tailwind default mono stack — dates, labels, code, quiet metadata
- Blog prose: Geist body (`font-geist` on the article)

## Spacing

Tailwind's default 4-pt scale. Section rhythm: `mt-10` between home sections,
`py-4` rows inside dashed-divided lists.

## Motion

- Named transition properties only — `transition-all` is banned.
- Durations 200–500 ms on Tailwind's default easing; never browser `ease`.
- `prefers-reduced-motion: reduce` collapses all animation/transition sitewide
  (global block in `globals.css`); JS smooth-scroll checks the media query.
- Animate `transform`/`opacity`/`filter` — never padding or other layout
  (exception: the `grid-template-rows` 0fr/1fr accordion technique).
- Focus rings never animate.

## Microinteractions stance

- Silent success — the copy button swaps its icon; no toasts.
- One hover signal per element: a colour shift or a small translate. Never
  scale + colour + radius together.
- Anything revealed on hover must also be visible at rest or reachable via
  focus/tap (ToC opens on click and focus-within).
- `:focus-visible` = 2 px saffron outline, instant, global.

## CTA voice

No filled buttons. Text links: saffron underline in prose (`.blog-link`),
muted→primary elsewhere (`.link-app`). Tools/demos use hairline-bordered
buttons (`border-rule`, `hover:bg-surface`).

## Icons

Feather (`react-icons/fi`) only. When Feather lacks a glyph (Stack Overflow),
hand-draw a custom SVG in Feather's voice: 24 viewBox, 2 px stroke,
round caps, `currentColor`.

## What pages MUST share

- The `max-w-2xl` column and dashed-divider rhythm.
- Geist display + Google Sans body + mono metadata.
- Saffron as the only accent (≤ 5 % per viewport) and the focus ring.
- Token names — pages reference tokens, never raw values.

## What pages MAY differ on

- Section composition inside the column.
- Blog posts get prose typography and interactive demo blocks.

## Exports

### tokens.css

```css
:root {
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
html.light {
    --background-color: oklch(99% 0.004 60);
    --text-primary: oklch(24% 0.012 50);
    --text-secondary: oklch(37% 0.01 50);
    --text-muted: oklch(51% 0.01 50);
    --text-inverse: oklch(98% 0.004 60);
    --saffron: oklch(56% 0.13 40);
    --rule: oklch(91% 0.006 60);
    --surface: oklch(96.5% 0.004 60);
}
html.dark {
    --background-color: oklch(17% 0.008 50);
    --text-primary: oklch(95% 0.005 60);
    --text-secondary: oklch(85% 0.005 55);
    --text-muted: oklch(68% 0.008 50);
    --text-inverse: oklch(24% 0.012 50);
    --saffron: oklch(65% 0.12 40);
    --rule: oklch(28% 0.008 50);
    --surface: oklch(23% 0.008 50);
}
```

### Tailwind v4 `@theme`

```css
@theme {
    --font-sans: var(--font-google-sans), sans-serif;
    --font-geist: var(--font-geist-sans), sans-serif;
}
@theme inline {
    --color-rule: var(--rule);
    --color-surface: var(--surface);
    --color-saffron: var(--saffron);
}
```
