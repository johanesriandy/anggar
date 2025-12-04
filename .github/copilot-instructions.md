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
- `npm run lint` - Run ESLint

## Code Style and Conventions

### TypeScript
- Use strict TypeScript settings as configured in `tsconfig.json`
- Target ES2017 with modern ESNext modules
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
- Use PascalCase for React component files (`.tsx`)
- Use lowercase for configuration files

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
