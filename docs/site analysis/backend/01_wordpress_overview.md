# Headless WordPress Backend Overview

## Architecture Approach
The backend for this project is built on WordPress, operating in a "Headless" mode. This means that WordPress is strictly used as an API provider and Content Management System (CMS), while the frontend rendering is entirely decoupled and handled by the Nuxt 3 application.

## API Endpoint
The Nuxt frontend communicates with the backend via a GraphQL endpoint:
`https://api.apexdigital.dev/graphql`

## Key Responsibilities of the Backend
- **Content Storage**: Blog posts, portfolio items, services, and other custom post types.
- **Custom Fields Mapping**: Any complex data structures, such as project metrics, client logos, and image galleries, are maintained in WordPress and exposed through GraphQL.
- **E-commerce / Services Logic**: Managing checkouts, pricing metadata, and shipping logic.
- **Multilingual Content Delivery**: Serving dual-language content (English and Bulgarian) requested by the Nuxt frontend.

## Integration Notes for AI Agents
When examining backend interactions:
- **No REST API used**: All data is fetched using GraphQL (`POST` requests to `/graphql`). 
- **Type Checking**: The frontend uses `transform` hooks to map deep GraphQL node relationships into simple arrays. Any modification to the WordPress schema (e.g., adding a new field in Advanced Custom Fields) requires updating the corresponding GraphQL query in the `.vue` files.
