Prahaar 360 - Unified Cyber Enforcement Suite
Overview
Prahaar 360 is a comprehensive AI-powered cybercrime reporting and prevention platform designed specifically for Indore, Madhya Pradesh. The system consists of four main intelligent modules:

Vajra: Real-time threat mapping and visualization
Kautilya: AI-powered investigation assistance
MayaJaal: Web intelligence and digital footprint analysis
BrahmaNet: Citizen engagement and reporting portal
The platform enables citizens to report cybercrimes, provides law enforcement officers with advanced investigation tools, and offers real-time threat monitoring across the city. It uses AI analysis to identify patterns, assess risk levels, and provide actionable insights for cybercrime prevention.

User Preferences
Preferred communication style: Simple, everyday language.

System Architecture
Frontend Architecture
React SPA: Built with React 18 and TypeScript for type safety and modern development
Wouter Routing: Lightweight client-side routing for navigation between modules
shadcn/ui Components: Modern, accessible UI component library with Radix UI primitives
TailwindCSS: Utility-first CSS framework for responsive design and theming
TanStack Query: Data fetching, caching, and synchronization with automatic refetching
Chart.js Integration: Real-time data visualization for dashboards and analytics
Backend Architecture
Express.js Server: RESTful API server with middleware for logging and error handling
TypeScript: Full-stack type safety with shared schema definitions
Modular Route Structure: Organized API endpoints for different modules (scam reports, investigations, threat data)
File Upload Support: Multer integration for evidence file handling
Mock Data Generation: Faker.js for demonstration data in development
Database Design
Hybrid Storage Architecture:
Firebase Firestore: Real-time database for reports, investigations, threat data, and officer actions
Local Browser Storage: Secure storage for images and evidence files (privacy and performance)
In-Memory Storage: Development fallback for local testing
Schema Organization: Separate collections for users, scam reports, case investigations, threat data, fraud identifiers, and officer actions
Real-time Synchronization: Firebase enables live updates across all connected clients
JSON Documents: Flexible NoSQL structure for complex data types and arrays
AI Integration
Google Gemini AI: Integrated for scam case analysis and fraud identifier assessment
Risk Assessment: Automated risk scoring and pattern matching for reported cases
Analysis Pipeline: AI-powered investigation assistance with recommendation generation
Mock Analysis: Fallback mock data generation for development and demonstration
Real-time Features
Auto-refresh Queries: Configurable refresh intervals for live data updates
Alert System: Real-time scrolling alerts for active threats
Live Maps: Interactive threat visualization with clustering and heatmaps
Dashboard Metrics: Real-time statistics and trend analysis
Security & Authentication
Role-based Access: Separate interfaces for citizens and law enforcement officers
Session Management: Express session handling with PostgreSQL storage
Input Validation: Zod schema validation for all form inputs and API requests
File Security: Secure file upload handling with size limits and type validation
External Dependencies
Cloud Services
Firebase: Real-time database for report storage and live data synchronization
Google AI Platform: Gemini API for AI-powered analysis and insights
Local Browser Storage: Secure local storage for images and evidence files (privacy-focused)
Frontend Libraries
Radix UI: Accessible component primitives for complex UI interactions
Leaflet: Interactive mapping library for geographic threat visualization
Chart.js: Data visualization and real-time charting capabilities
React Hook Form: Form state management with validation
Development Tools
Vite: Fast build tool and development server with HMR
Drizzle Kit: Database migration and schema management
ESBuild: Fast JavaScript bundling for production builds
Free-tier APIs
Google Fonts: Typography (Inter font family)
Font Awesome: Icon library for consistent UI elements
External Map Tiles: OpenStreetMap-based mapping services
The architecture emphasizes modularity, type safety, and real-time capabilities while maintaining cost-effectiveness through free-tier services and open-source technologies.
