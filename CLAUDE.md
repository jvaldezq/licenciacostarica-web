# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 application for "Licencia Costa Rica," a driving school management system for Costa Rica. It's a landing page with information about driving classes and license types (A, B, C, D, E). The project uses:

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth0 (@auth0/nextjs-auth0)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Forms**: React Final Form with Yup validation
- **State Management**: React Query (v3)
- **Animations**: GSAP, canvas-confetti, tailwindcss-animated

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
npm run db:generate  # Generate Prisma Client after schema changes
npm run db:push      # Push schema changes to database (dev)
npm run migrate      # Create and apply migrations (dev)
npm run migrate:create  # Create migration without applying
npm run migrate:prod    # Apply migrations to production
npm run db:reset     # Reset database (WARNING: deletes all data)
npm run db:studio    # Open Prisma Studio GUI
```

**IMPORTANT**: Always run `npm run db:generate` after modifying `schema.prisma` to update the Prisma Client types.

## Project Structure

### Core Directory Layout
```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with metadata, QueryWrapper, VideoModalProvider
│   └── page.tsx      # Landing page
├── components/       # React components
│   ├── Forms/        # Form components (FormInput, FormDropdown, FormCalendar, FormSwitch)
│   └── ui/           # shadcn/ui components
├── lib/              # Core utilities and configurations
│   ├── prisma.ts     # Prisma client singleton
│   ├── definitions.ts # TypeScript interfaces for all models
│   ├── clientApi.ts  # Axios client for browser API calls
│   ├── serverApi.ts  # Fetch wrapper for server-side API calls
│   └── formValidator.ts # Yup validation schemas
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── data/             # Static data and constants
├── assets/           # Static assets (images, videos)
└── styles/           # Global CSS
```

### Database Architecture

The database schema is defined in `schema.prisma` at the project root. Key models:

- **User**: Instructors and staff with Auth0 authentication
- **UserAccess**: Role-based permissions (admin, instructor, receptionist)
- **Location**: Driving school locations (San Ramón, Ciudad Vial)
- **LicenseType**: License categories (A: motorcycle, B: car, C: bus, etc.)
- **Asset**: Vehicles/motorcycles used for lessons
- **Customer**: Students taking classes
- **Event**: Scheduled classes or driving tests
- **EventType**: Class vs. Drive Test
- **Schedule**: Time blocks for assets and instructors
- **Payment**: Payment tracking for events
- **Log**: Audit log for all database changes

**Key Relationships**:
- Events connect Customers, Assets, Instructors, Locations, and LicenseTypes
- Each Event has one Payment (1:1 relationship via `paymentId` unique constraint)
- Schedules can be linked to Assets, Users (instructors), or Customers
- Users have a Location and UserAccess for permissions

### Type Definitions

All database models have corresponding TypeScript interfaces in `src/lib/definitions.ts` (e.g., `IEvent`, `ICustomer`, `IUser`). Use these interfaces instead of Prisma types in client-side code.

### API Architecture

This project uses two distinct API clients:

1. **Server Components** (`src/lib/serverApi.ts`):
   - Uses `fetch()` with Next.js revalidation
   - Default revalidation: 60 seconds
   - Example: `serverApi({ path: '/api/events', params: { locationId: 1 } })`

2. **Client Components** (`src/lib/clientApi.ts`):
   - Axios instance configured with `NEXT_PUBLIC_API_URL`
   - Used with React Query for data fetching/mutations
   - Example: `clientApi.post('/api/events', eventData)`

Both clients call routes defined in `src/app/api/` (not visible in current exploration, but implied by the architecture).

### Form Components

Custom form wrappers integrate React Final Form with shadcn/ui:
- `FormInput`: Text input with validation
- `FormDropdown`: Select dropdown with search
- `FormCalendar`: Date picker
- `FormSwitch`: Toggle switch
- All wrapped by `InputWrapper` for consistent error handling and labels

Validation schemas are defined in `src/lib/formValidator.ts` using Yup.

### UI Components

The project uses shadcn/ui components (configured via `components.json`):
- Base path: `@/components` (aliased via tsconfig.json)
- CSS variables disabled (uses direct Tailwind classes)
- Style: default
- Base color: slate

## Environment Variables

Required environment variables (in `.env`):
```
POSTGRES_PRISMA_URL=          # Pooled connection for Prisma
POSTGRES_URL_NON_POOLING=     # Direct connection for migrations
NEXT_PUBLIC_API_URL=          # Base URL for API routes
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID= # GA4 tracking ID
AUTH0_SECRET=                 # Auth0 session secret
AUTH0_BASE_URL=               # Application base URL
AUTH0_ISSUER_BASE_URL=        # Auth0 tenant URL
AUTH0_CLIENT_ID=              # Auth0 application client ID
AUTH0_CLIENT_SECRET=          # Auth0 application client secret
```

## Important Notes

- The project uses the `@/` path alias for imports from `src/`
- Images are optimized for AVIF/WebP and stored in Firebase Storage
- The landing page is SEO-optimized with comprehensive metadata
- Video modals are managed through a React Context (`VideoModalProvider`)
- Google Analytics is conditionally loaded based on environment variable
- The application is primarily in Spanish (locale: es_CR)

## Testing the Application

There are no test scripts configured. To verify changes:
1. Run `npm run dev` and test manually at http://localhost:3000
2. Run `npm run build` to check for TypeScript/build errors
3. Use `npm run lint` to check code quality

## Common Workflows

### Adding a New Model
1. Update `schema.prisma` with the new model
2. Add TypeScript interface to `src/lib/definitions.ts`
3. Run `npm run migrate:create` to create migration
4. Run `npm run migrate` to apply migration
5. Run `npm run db:generate` to update Prisma Client

### Adding shadcn/ui Components
```bash
npx shadcn-ui@latest add [component-name]
```

Components will be added to `src/components/ui/` and use the `@/` alias.
