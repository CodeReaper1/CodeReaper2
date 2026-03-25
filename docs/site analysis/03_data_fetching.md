# Data Fetching and API Integration

## Headless WordPress & GraphQL
The Nuxt frontend acts as the display layer for a Headless WordPress architecture. 
- **Endpoint**: `https://api.apexdigital.dev/graphql`
- **Mechanism**: The app makes direct `POST` requests to this endpoint using GraphQL syntax.

## Implementation Pattern
The standard Vue/Nuxt approach in this repository is to fetch data at the page level using Nuxt's `useFetch` composable.

### Example (From Portfolio)
```javascript
const graphqlUrl = "https://api.apexdigital.dev/graphql";

const { data, pending, error } = await useFetch(graphqlUrl, {
  method: 'POST',
  body: {
    query: `
      query GetPortfolios {
        portfolioItems(first: 20) {
          nodes {
            id
            title
            slug
            date
            client
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `
  },
  transform: (response) => {
    // Crucial: The transform function shapes the deeply nested GraphQL 
    // response into a flat, easy-to-iterate array for the Vue template.
    if (!response?.data?.portfolioItems?.nodes) return [];
    
    return response.data.portfolioItems.nodes.map(node => ({
      client: node.client || 'Apex Digital',
      date: new Date(node.date).toLocaleDateString('en-US'),
      title: node.title.toUpperCase(),
      image: node.featuredImage?.node?.sourceUrl || '/img/placeholder.jpg',
      link: `/portfolio/${node.slug}`
    }));
  }
});
```

### Missing Setup Attributes
- **No Global Apollo Client**: Currently, no dedicated GraphQL client (like Apollo or urql) is configured. All queries are raw fetch requests passing a stringified query.
- **No Reusable Composables**: Data queries are currently hardcoded inside the `.vue` files. If the project scales, extracting these into `app/composables/usePortfolio.ts` or similar would be highly recommended.
