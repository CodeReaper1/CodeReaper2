const GRAPHQL_URL = 'https://api.apexdigital.dev/graphql';

const PORTFOLIO_QUERY = `
  query GetPortfolios($first: Int) {
    portfolioItems(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        date
        client
        clientLogo
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export function usePortfolio(count = 20) {
  const { data, pending, error } = useFetch(GRAPHQL_URL, {
    key: `portfolio-${count}`,
    method: 'POST',
    body: {
      query: PORTFOLIO_QUERY,
      variables: { first: count },
    },
    transform: (response) => {
      if (!response?.data?.portfolioItems?.nodes) return [];

      return response.data.portfolioItems.nodes.map((node) => ({
        id: node.id,
        title: node.title,
        slug: node.slug,
        client: node.client || 'Apex Digital',
        clientLogo: node.clientLogo || null,
        date: new Date(node.date)
          .toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
          .toUpperCase(),
        image:
          node.featuredImage?.node?.sourceUrl || '/img/photo/1.jpg',
        imageAlt:
          node.featuredImage?.node?.altText || node.title,
        link: `/portfolio/${node.slug}`,
      }));
    },
  });

  return { projects: data, pending, error };
}
