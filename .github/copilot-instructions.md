# GitHub Copilot Instructions

This document provides guidance for GitHub Copilot when working with this repository.

## Project Overview

This is a Next.js 16 application built with:

- **Framework**: Next.js 16.0.7 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint 9 with Next.js config

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint on all TypeScript and JavaScript files

## Code Style and Conventions

### TypeScript

- Use strict TypeScript settings as configured in `tsconfig.json`
- Use ES2017 target with ESNext module system
- Utilize path aliases with `@/*` for cleaner imports
- Prefer explicit types for function parameters and return values
- Use `type` for object shapes and `interface` for contracts

### React/Next.js

- Use the App Router structure (files in `app/` directory)
- Follow React Server Components by default
- Add `"use client"` directive only when client-side features are needed
- Use Next.js built-in components (`Image`, `Link`, etc.) over HTML elements
- Export metadata objects for SEO in page and layout files
- Use `next/font` for font optimization

### Styling

- Use Tailwind CSS utility classes for styling
- Follow mobile-first responsive design with Tailwind breakpoints (`sm:`, `md:`, etc.)
- Utilize dark mode variants with `dark:` prefix
- Prefer composition of utility classes over custom CSS

### File Naming

- Use kebab-case for directories
- Next.js special files (`page.tsx`, `layout.tsx`, `loading.tsx`, etc.) must use lowercase
- Use kebab-case for custom React component files (`.tsx`) and TypeScript files (`.ts`)
- Use lowercase for configuration files

Note on historical guidelines (ID: 1000000) ⚠️

In prior versions of this repository's style guide, we recommended using PascalCase for component filenames (e.g., `MyComponent.tsx`) under guideline ID: 1000000. We've intentionally migrated to a kebab-case filename convention (e.g., `my-component.tsx`) for component files to encourage consistency across directories and to match the existing file structure in the repository (e.g., `components/ui/button.tsx`, `components/ui/input.tsx`).

Why we made this change:
- Improves consistency with directory kebab-case and Next.js special files
- Matches a wide range of open-source Next.js templates and tooling
- Maintains readable file names when scanning directories

Note: This change only applies to filenames and path-based imports. Component identifiers in code (the exported React component names) should remain `PascalCase` (e.g., `export function MyButton() {}`), which preserves React naming conventions.

Legacy/deprecated filenames

Some PascalCase filenames may still exist as re-export aliases for backward compatibility during the migration. For instance, `contexts/AuthContext.tsx` currently re-exports from `contexts/auth-context.tsx` to avoid large refactors in a single PR. These aliases are temporary; please import using kebab-case going forward, and we may remove aliases in a follow-up cleanup when all code references kebab-case paths.

### Component Structure

- Keep components small and focused on a single responsibility
- Extract reusable components to separate files
- Use functional components with hooks
- Follow the order: imports, types, component, exports

## Quality Standards

### Code Quality

- Ensure all code passes ESLint validation
- Maintain TypeScript strict mode compliance
- Write self-documenting code with clear variable and function names
- Add comments only when the code's intent is not obvious

### Testing

- Follow existing test patterns if test files are added to the project
- Test edge cases and error scenarios
- Keep tests focused and isolated

### Accessibility

- Use semantic HTML elements
- Ensure proper heading hierarchy
- Add appropriate ARIA labels when needed
- Support keyboard navigation

### Performance

- Optimize images using Next.js Image component
- Minimize client-side JavaScript
- Use Server Components when possible
- Lazy load components when appropriate

## Security

- Never commit sensitive data (API keys, credentials, etc.)
- Validate and sanitize user inputs
- Use environment variables for configuration
- Follow OWASP security best practices

## Git Practices

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Use conventional commit format when possible (e.g., `feat:`, `fix:`, `docs:`)
