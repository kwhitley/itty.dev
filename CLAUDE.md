# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation website for itty.dev, showcasing ultra-small JavaScript libraries focused on serverless APIs. The site uses VitePress as a static site generator to document multiple itty libraries including itty-router, itty-chroma, itty-fetcher, itty-durable, and itty-time.

## Development Commands

### Local Development
```bash
bun install        # Install dependencies (preferred over npm)
bun dev           # Start development server (alias: npm run dev)
```

### Build and Deploy
```bash
bun run build    # Build static site for production (alias: npm run build)
bun run preview  # Preview production build locally (alias: npm run preview)
```

### Release Management
```bash
bun run release  # Create new release with patch version bump
```

## Architecture

### VitePress Configuration
- Main config: `.vitepress/config.ts` - site configuration, theme, and metadata
- Navigation: `.vitepress/nav.root.ts` - sidebar for homepage/library overview
- Router navigation: `.vitepress/nav.itty-router.ts` - detailed sidebar for itty-router docs

### Content Structure
- `/` - Homepage and main library documentation
- `/itty-router/` - Comprehensive documentation for the itty-router library
- `/itty-[library]/` - Individual library documentation pages
- Each library folder contains structured markdown files for different aspects (API, guides, concepts, etc.)

### Key Libraries Used
- VitePress: Static site generator
- itty-router: Featured library (also used for examples)
- itty-chroma: Console styling library
- Sass: CSS preprocessing

### Content Organization
The site follows a hierarchical documentation structure:
- Library overview pages at the root level
- Detailed documentation in library-specific folders
- Conceptual guides, API references, TypeScript docs, and migration guides
- Runtime-specific implementation guides (Cloudflare Workers, Bun, Node.js, Next.js)

### Theme and Styling
- Uses VitePress default theme with custom logo and branding
- GitHub light/dark syntax highlighting
- Local search enabled
- Social links to GitHub, Discord, Bluesky, and X
- Edit links pointing to GitHub repository