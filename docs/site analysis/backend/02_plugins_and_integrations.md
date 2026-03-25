# Essential WordPress Plugins and Integrations

To support the robust headless capabilities and local market integrations, the WordPress backend relies on several critical plugins. AI agents should be aware of these when debugging data flow or e-commerce features.

## Core Headless Connectivity
1. **WPGraphQL**: 
   - The cornerstone of the headless architecture. It turns the WordPress instance into a GraphQL server.
   - **Important**: Any custom post types or custom taxonomies MUST be explicitly configured to "show in GraphQL" within WordPress to be queryable by Nuxt.

2. **Advanced Custom Fields (ACF) + WPGraphQL for ACF** (Assumed based on data patterns): 
   - Used to structure bespoke data for portfolios and services.
   - The plugin bridge ensures that ACF fields are accessible in the GraphQL schema.

## E-commerce and Localization Plugins
The repository demonstrates deep integration with Bulgarian-specific e-commerce logic.

1. **Econt Integration (Checkout Simulator / API)**:
   - Contains specialized logic to interact with Econt (a major Bulgarian courier service).
   - Responsible for shipping calculations, office locations generation, and handling Cyrillic character inputs during the checkout process.
   - Nuxt frontend Playwright tests have been explicitly built to validate the Econt simulator integration, especially focusing on timeout handling and payload generation.

2. **Bulgarisation Plugin**:
   - Works in tandem with Econt and the broader e-commerce framework to adapt checkout parameters, formats, and API data streams for the local Bulgarian market.
   - Ensures correct currency (`лв.`), address localization, and regional logistics formatting.

## Multilingual Support (Backend)
- A translation plugin (likely WPML or Polylang, paired with their respective WPGraphQL extensions) manages the dual English (`en`) and Bulgarian (`bg`) content state.
- The Nuxt frontend dynamically routes based on the locale and expects corresponding node localization in the GraphQL payload.
