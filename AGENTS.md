# AGENTS.md - Development Guide for GSGFs Blog Frontend

This document provides essential information for AI agents working on this Next.js blog project.

## Project Overview

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript with strict mode enabled
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS with dark mode support
- **Runtime**: Node.js >=22, with Cloudflare Workers support via OpenNext

## Build and Development Commands

### Development

```bash
pnpm dev                   # Start development server
pnpm dev:clean             # Clean .next cache and start dev server
pnpm dev:https             # Start dev server with HTTPS
```

### Build and Deployment

```bash
pnpm build                 # Build for production
pnpm start                 # Start production server
pnpm analyze               # Build with bundle analyzer
```

### Cloudflare Deployment

```bash
pnpm build:cloudflare      # Build for Cloudflare
pnpm preview               # Preview Cloudflare deployment
pnpm deploy                # Deploy to Cloudflare
pnpm deploy:cloudflare     # Deploy to Cloudflare (alias)
pnpm cf-typegen            # Generate Cloudflare types
```

### Code Quality

```bash
pnpm lint                  # Run ESLint with auto-fix
pnpm lint:check            # Run ESLint without fixing
pnpm format                # Format code with Prettier
```

## Code Style Guidelines

### TypeScript Configuration

- Strict mode enabled (`"strict": true`)
- Path alias `@/*` maps to project root
- `noImplicitAny: false` (explicit `any` allowed but discouraged)
- Target: `esnext`
- Module resolution: `bundler`

### Import Organization

Follow the ESLint import order configuration:

1. Built-in modules
2. External dependencies
3. Internal imports (`@/` prefix)
4. Parent directories
5. Sibling/index imports
6. Object imports
7. Unknown imports

**Example:**

```typescript
import type { Metadata } from "next";
import { clsx } from "clsx";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";

import { Providers } from "./providers";
```

### Naming Conventions

- **Components**: PascalCase (e.g., `BlogList`, `Navbar`)
- **Files**: kebab-case for non-components (e.g., `blog-list.tsx`)
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with `Type` suffix if needed

### React/Next.js Patterns

- Use App Router with server components by default
- Mark client components with `"use client"` directive
- Use `export const dynamic` and `export const revalidate` for caching
- Prefer async server components for data fetching
- Use Suspense boundaries for loading states

**Server Component Example:**

```typescript
export const dynamic = "force-static";
export const revalidate = 86400;

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4">
      {/* content */}
    </section>
  );
}
```

**Client Component Example:**

```typescript
"use client";

import { useState } from "react";

export default function ClientComponent() {
  const [state, setState] = useState<boolean>(false);

  return (
    <div>{/* interactive content */}</div>
  );
}
```

### Styling with Tailwind CSS

- Use utility classes with `clsx` for conditional classes
- Follow responsive design patterns (mobile-first)
- Use semantic color names from design system
- Prefer flexbox/grid over absolute positioning

**Example:**

```typescript
import { clsx } from "clsx";

const className = clsx(
  "bg-background min-h-screen font-sans antialiased",
  isActive && "border-blue-500",
);
```

### Error Handling

- Use TypeScript for compile-time safety
- Validate environment variables with Zod schemas
- Use try-catch for async operations with proper error logging
- Implement error boundaries for React components

### File Structure

```
app/                    # App Router pages and layouts
├── [dynamic]/         # Dynamic routes
├── layout.tsx         # Root layout
├── page.tsx          # Home page
└── providers.tsx     # Context providers

components/            # Reusable components
├── blog/             # Blog-specific components
├── comment/          # Comment system
├── music/            # Music player
└── navbar/           # Navigation

lib/                  # Utility functions
server/backend/       # Backend API handlers
env/                  # Environment variable schemas
types/                # TypeScript type definitions
utils/                # Helper functions
```

### ESLint Rules

- React hooks rules enforced
- JSX props sorted alphabetically
- No unused imports/variables (warn level)
- Prefer const over let
- Import order enforced
- Prettier integration

### Prettier Configuration

- 2 space indentation
- Double quotes for strings
- Semicolons required
- Trailing commas in multiline
- Line endings: LF
- Tailwind CSS plugin for class sorting

### Commit Convention

Follow conventional commits with commitlint:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/modifications
- `chore:` Maintenance tasks

### Testing

No formal test framework configured. Use:

- Manual testing in development
- Type checking as primary validation
- ESLint for code quality
- Build verification before deployment

## Environment Variables

Use Zod schemas in `env/schema.ts` for validation:

- `NEXT_PUBLIC_*` for client-side variables
- Private variables for server-side only
- Always validate with `privateSchema.parse()` and `publicSchema.parse()`

## Security Considerations

- CSP headers configured in `next.config.ts`
- Input validation with Zod
- Secure headers (X-Frame-Options, Referrer-Policy)

## Performance

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Static generation where possible
- Cache headers configured

## Cloudflare Integration

- OpenNext for Cloudflare Workers deployment
- Wrangler for development and deployment

## Important Notes

1. Always run `pnpm lint` and `pnpm format` before committing
2. Check TypeScript compilation with `pnpm build`
3. Use path aliases (`@/`) for imports
4. Follow existing patterns in similar components
5. Validate environment variables in server code
6. Use server components by default, client components only when necessary
