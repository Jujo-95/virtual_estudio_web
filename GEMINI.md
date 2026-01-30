# Project Overview

This is a React single-page application (SPA) for "Virtual Estudio," designed as a modern landing page. Its primary goal is to drive users to either start using the Virtual Estudio app or contact sales. The project focuses on presenting Virtual Estudio's AI platform for fashion brands, which converts garment photos into ready-to-publish campaigns.

## Technology Stack

*   **Frontend Framework:** React
*   **Build Tool:** Vite
*   **Language:** JavaScript (with JSX)
*   **Linting:** ESLint

## Project Structure

*   `/`: Root directory containing configuration files, `index.html`, and main project files.
*   `/public`: Static assets, including `favicon.svg` and `web_images` (campaign assets, garment images).
*   `/src`: Source code for the React application.
    *   `App.jsx`: Main application component.
    *   `main.jsx`: Entry point for the React application.
    *   `index.css`: Global styles.
    *   `/src/assets`: Placeholder for general assets (currently empty).
    *   `/src/components`: Reusable React components (e.g., `Button`, `NavBar`, `Footer`, `DemoShowcase`, `FeatureRail`, `HowItWorks`, `HowScroller`, `WhyScroller`).
    *   `/src/lib`: Utility functions or libraries (e.g., `site.js`).

## Development Workflow

*   **Install Dependencies:** `npm install`
*   **Start Development Server:** `npm run dev`
*   **Build for Production:** `npm run build`
*   **Preview Production Build:** `npm run preview`
*   **Run Linter:** `npm run lint`

## Key Concepts & Business Logic

The project's core purpose is to serve as a highly effective landing page for "Virtual Estudio." The business aims to solve the problem of slow, costly, and unscalable content production for fashion brands by offering an AI platform that generates ready-to-publish campaigns (UGC and editorial), virtual models, creative variations, and videos, all managed through a credit-based system in COP.

### Landing Page Strategy (from `runbook.md`)

The landing page is designed with a "North Star" objective: to lead the user to **start in the app** (`https://app.virtualestudio.io/`) or **talk to sales** (`mailto:info@virtualestudio.io`).

**Key Principles:**
*   **Benefit-led messaging:** Focus on results, not just features.
*   **Clarity over creativity:** Short sentences, action verbs, no jargon.
*   **Proof over promise:** Every important claim should be backed by visual proof, examples, testimonials, or metrics.

**Ideal Architecture (Mandatory Sections):**
1.  **Hero (Above the fold):** Explains what Virtual Estudio is and its benefits within 5 seconds. Includes headline, subheadline, primary CTA ("Ir a la app"), secondary CTA ("Hablar con ventas"), microcopy, and quick social proof.
2.  **Demonstration:** Shows the product in action (video, carousel of examples, animation).
3.  **Services:** Maps product features to clear benefits in 5-7 cards (e.g., Campaigns, Videos, Garments, Models, Credits, Brand DNA).
4.  **Social Proof:** Testimonials, logos, or metrics to build trust.
5.  **Personalization:** Interactive elements like a "quick calculator" for publications per week to estimate monthly credits.
6.  **"Here's one I made earlier":** Instant demo showing real examples based on user choices (e.g., style, garment type).
7.  **How It Works:** A simple 3-step explanation of the process.
8.  **Pricing:** Clarifies the credit-based model and links to a dedicated pricing page.
9.  **FAQ:** Addresses common objections (quality, rights, time, creative control, pricing).
10. **Final CTA + Contact Form:** Captures leads not ready for the app.

### Design and UX Principles

*   **Legibility/Contrast:** Minimum AA contrast, body text >= 16px (mobile), comfortable line-height.
*   **Dominant CTA:** The primary CTA is consistent and visually prominent throughout the page.
*   **Reduced Distractions:** Minimal navigation, legal links in the footer only.

## Important Files

*   `package.json`: Project metadata, dependencies, and scripts.
*   `vite.config.js`: Vite build configuration.
*   `eslint.config.js`: ESLint linting configuration.
*   `README.md`: Basic project setup and commands.
*   `RESUMEN_EJECUTIVO.md`: Executive summary of the brand, problem, solution, and business model.
*   `runbook.md`: Detailed strategy, content, architecture, and design principles for the landing page.

## Conventions and Guidelines

*   **Coding Style:** Enforced by ESLint, including rules for React hooks and best practices.
*   **Design:** Modern UI with glassmorphism and gradients, adhering to the UX principles outlined in `runbook.md`.
*   **Copywriting:** Benefit-led, clear, concise, and supported by proof, following the guidelines in `runbook.md`.