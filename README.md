# Wensity shadcn Registry

The public shadcn/ui registry for [Wensity](https://ui.wensity.com). Install React
components, UI primitives, fonts, and design tokens straight into your project
with the shadcn CLI. The code lands in your repo as source you own, with no
runtime dependency on Wensity and no theme provider to wire up.

[Browse the components](https://ui.wensity.com/components) ·
[Docs](https://ui.wensity.com/docs) ·
[Create a preset](https://ui.wensity.com/create-preset) ·
[wensity.com](https://wensity.com)

## Install

Every item in this registry is free and MIT licensed. Install one with the
shadcn CLI:

```bash
npx shadcn@latest add @wensity/liquid-multimodal-input
```

The `@wensity` namespace is registered in shadcn's public registry index, so it
resolves without any `components.json` configuration on your side.

You can also point at this repository directly:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/wensity/registry/main/button.json
```

### Start with the base tokens

`wensity-base` installs the CSS custom property contract that every Wensity
component reads from. Add it once before or after your first component:

```bash
npx shadcn@latest add @wensity/wensity-base
```

Components still render without it, falling back to your existing shadcn
variables, but the base contract is what makes radius, control colors, and
motion consistent across the set.

## Requirements

- React 18 or later
- Tailwind CSS v4
- A project already initialised with `npx shadcn@latest init`

Individual items declare their own npm dependencies (`framer-motion`,
`@tabler/icons-react`, `@base-ui/react`, and similar). The shadcn CLI installs
those for you at add time.

## What is in here

70 registry items across five groups.

### Agentic AI Interfaces

Chat, voice, and model-selection surfaces for AI products.

| Item | Name | Description | Install |
| --- | --- | --- | --- |
| [`liquid-multimodal-input`](https://ui.wensity.com/components/liquid-multimodal-input) | Liquid Multimodal Input | Expanding prompt area with a glowing drop-zone. | `npx shadcn@latest add @wensity/liquid-multimodal-input` |
| [`generative-skeleton-mesh`](https://ui.wensity.com/components/generative-skeleton-mesh) | Generative Skeleton Mesh | An organic loading state, not a spinner. | `npx shadcn@latest add @wensity/generative-skeleton-mesh` |
| [`voice-aurora-wave`](https://ui.wensity.com/components/voice-aurora-wave) | Voice Aurora Wave | A breathing voice orb. Never jittery, always organic. | `npx shadcn@latest add @wensity/voice-aurora-wave` |
| [`model-context-switcher`](https://ui.wensity.com/components/model-context-switcher) | Model Context Switcher | A Radix dropdown that scales out from the trigger and glides between options. | `npx shadcn@latest add @wensity/model-context-switcher` |

### Cinematic Interactions

Scroll and motion pieces for landing pages and hero sections.

| Item | Name | Description | Install |
| --- | --- | --- | --- |
| [`infinite-marquee`](https://ui.wensity.com/components/infinite-marquee) | Infinite Marquee | Seamless, GPU-only logo strip that never stutters. | `npx shadcn@latest add @wensity/infinite-marquee` |
| [`morphing-shape-background`](https://ui.wensity.com/components/morphing-shape-background) | Morphing Shape Background | Lava-lamp blobs that drift behind your hero at 120fps with no SVG morph. | `npx shadcn@latest add @wensity/morphing-shape-background` |
| [`scrubbable-video-reveal`](https://ui.wensity.com/components/scrubbable-video-reveal) | Scrubbable Video Reveal | Apple-style scroll-scrubbed image sequence on a canvas. | `npx shadcn@latest add @wensity/scrubbable-video-reveal` |

### Elite Micro-Interactions

Small, high-polish interaction details.

| Item | Name | Description | Install |
| --- | --- | --- | --- |
| [`gooey-navigation-menu`](https://ui.wensity.com/components/gooey-navigation-menu) | Gooey Navigation Menu | A liquid FAB whose children stretch out of it like metal. | `npx shadcn@latest add @wensity/gooey-navigation-menu` |
| [`multi-select-token-pills`](https://ui.wensity.com/components/multi-select-token-pills) | Multi-Select Token Pills | Tag input that pops in, slides out, and never snaps the layout. | `npx shadcn@latest add @wensity/multi-select-token-pills` |
| [`shimmering-skeleton-wrapper`](https://ui.wensity.com/components/shimmering-skeleton-wrapper) | Shimmering Skeleton Wrapper | One angled GPU sweep across any placeholder geometry. Never one shimmer per row. | `npx shadcn@latest add @wensity/shimmering-skeleton-wrapper` |

### Heavy SaaS Blocks

Larger composed blocks for dashboards and product pages.

| Item | Name | Description | Install |
| --- | --- | --- | --- |
| [`github-activity-grid`](https://ui.wensity.com/components/github-activity-grid) | GitHub-Style Activity Grid | 365 squares, one shared tooltip, and a cascading reveal that ripples backward from today. | `npx shadcn@latest add @wensity/github-activity-grid` |

### UI Primitives

The standard set, built on Base UI with Wensity's token contract. Accessible,
unstyled-first, and themeable through the primitive CSS block.

`button`, `button-group`, `input`, `text-area`, `select`, `form-field`, `badge`, `checkbox`, `switch`, `radio-group`, `toggle`, `label`, `input-otp`, `combobox`, `avatar`, `table`, `progress`, `alert`, `skeleton`, `spinner`, `toast`, `dialog`, `sheet`, `drawer`, `popover`, `tooltip`, `tabs`, `breadcrumb`, `pagination`, `card`, `separator`, `scroll-area`, `resizable`, `hover-card`, `accordion`, `aspect-ratio`, `attachment`, `calendar`, `carousel`, `chart`, `collapsible`, `slider`, `command`, `context-menu`, `data-table`, `date-picker`, `direction`, `dropdown-menu`, `empty-state`, `field`, `kbd`, `marker`, `native-select`, `navigation-menu`, `sidebar`, `typography`

Install any of them the same way:

```bash
npx shadcn@latest add @wensity/button @wensity/dialog @wensity/data-table
```

### Fonts and base tokens

| Item | What it does | Install |
| --- | --- | --- |
| `font-inter` | Registers Inter with the Wensity font token contract | `npx shadcn@latest add @wensity/font-inter` |
| `font-geist` | Registers Geist with the Wensity font token contract | `npx shadcn@latest add @wensity/font-geist` |
| `wensity-base` | The CSS custom property contract for color, radius, and motion | `npx shadcn@latest add @wensity/wensity-base` |

## Theming with presets

Wensity components read from a single `--primitive-*` CSS block, so you can
restyle the whole set without touching component source. Build a palette,
radius, and font combination in the
[preset studio](https://ui.wensity.com/create-preset), copy the resulting
`wsty1` code, and apply it with the Wensity CLI:

```bash
npx wensity@latest apply --preset <wsty1-code>
```

That rewrites the CSS block in place and leaves your component files alone. See
the [preset guide](https://ui.wensity.com/docs/create-preset) for the full
format.

## Using the Wensity CLI instead

The shadcn CLI covers everything in this repository. The
[Wensity CLI](https://github.com/wensity/cli) additionally handles presets,
project scaffolding, Tabler and Lucide icon swapping, and authenticated access
to Wensity Pro components.

```bash
npx wensity@latest init
npx wensity@latest add liquid-multimodal-input
```

## How this repository is generated

These files are build artifacts, not hand-written source. They are generated
from Wensity's public shadcn endpoints:

- Registry index: <https://ui.wensity.com/r/registry.json>
- Item payloads: `https://ui.wensity.com/r/<item>.json`

The Wensity product repository is private and is not mirrored here. This
repository contains only the free registry payloads. Wensity Pro components are
delivered through the authenticated CLI and are not published here.

Because the JSON is generated, please do not send pull requests that edit it
directly. Open an issue instead and the change will be made upstream.

## License

MIT. See [LICENSE](./LICENSE).

Copyright (c) 2026 Wensity Private Limited.
