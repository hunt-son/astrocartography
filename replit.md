# AstroPlace - Privacy-First Astrocartography Web Application

## Overview

AstroPlace is a full-stack web application that provides privacy-focused astrocartography services. The application allows users to generate personalized astrological maps showing planetary line influences across the globe based on their birth data. The core philosophy centers around client-side calculations to ensure user privacy, with all astrological computations happening locally in the browser rather than on remote servers.

The application features an interactive map interface, location recommendations based on astrological influences, and educational content about astrocartography. It's built as a modern single-page application with a React frontend and Express.js backend, emphasizing responsive design and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React 18 using TypeScript and follows a component-based architecture pattern. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized production builds. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, ensuring accessibility and consistent design patterns.

State management is handled through React Query (@tanstack/react-query) for server state and local React state for component-level data. The routing system uses Wouter for lightweight client-side navigation. The application is designed to work primarily as a client-side application with minimal server dependencies for the core astrological functionality.

### Styling and Design System
The frontend implements a comprehensive design system using Tailwind CSS with custom CSS variables for theming. The design system includes custom color palettes (cosmic, stellar, golden) specifically chosen for the astronomical theme. The application supports responsive design patterns and includes provisions for dark mode theming.

### Data Processing Architecture
Astrological calculations are performed entirely on the client side using custom TypeScript implementations. The `AstroCalculations` class handles planetary position calculations, astrocartography line generation, and location recommendations. This architecture ensures user privacy by never transmitting sensitive birth data to external servers.

The application includes location search functionality with autocomplete features, timezone detection, and mapping capabilities. Sample location data is included for demonstration purposes, but the architecture supports integration with external geocoding services.

### Backend Architecture
The server-side is built with Express.js and TypeScript, following a minimal API-first approach. The backend is primarily designed to serve the frontend application and handle any future server-side features that may be needed. The current implementation includes a basic routing structure and middleware setup.

The storage layer is abstracted through an interface-based pattern (`IStorage`), with an in-memory implementation provided for development. This abstraction allows for easy migration to persistent database solutions when needed.

### Build and Development Configuration
The application uses a monorepo structure with separate client and server directories, plus a shared directory for common types and schemas. The build process uses Vite for the frontend and esbuild for the backend, producing optimized bundles for production deployment.

Development tooling includes TypeScript for type safety, ESLint and Prettier for code formatting, and PostCSS for CSS processing. The configuration supports both development and production environments with appropriate optimizations for each.

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework for building the user interface
- **Express.js**: Backend web application framework
- **TypeScript**: Type system for JavaScript providing compile-time type checking
- **Vite**: Frontend build tool and development server

### UI and Styling Dependencies
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible component primitives for React
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for managing component variants

### Data Management Dependencies
- **TanStack Query**: Server state management and caching library
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library
- **Date-fns**: Date manipulation and formatting utilities

### Database and ORM Dependencies
- **Drizzle ORM**: Type-safe ORM for database operations
- **Drizzle Kit**: CLI tool for database migrations and schema management
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **PostgreSQL**: Primary database system (configured via DATABASE_URL)

### Development and Build Dependencies
- **ESBuild**: Fast JavaScript bundler for backend builds
- **PostCSS**: CSS post-processor with Autoprefixer
- **TSX**: TypeScript execution environment for development

### Additional Libraries
- **Wouter**: Lightweight routing library for React
- **CMDK**: Command menu component for search interfaces
- **Embla Carousel**: Carousel component library
- **Nanoid**: URL-safe unique string ID generator

The application is designed to work with Neon Database for PostgreSQL hosting, but can be configured to work with any PostgreSQL-compatible database through the DATABASE_URL environment variable.