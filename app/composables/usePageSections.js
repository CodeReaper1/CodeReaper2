const GRAPHQL_URL = 'https://api.apexdigital.dev/graphql';

const PAGE_SECTIONS_QUERY = `
  query GetPageSections($page: String!) {
    pageSections(
      where: {
        taxQuery: {
          taxArray: [{ taxonomy: SECTIONPAGE, field: SLUG, terms: [$page] }]
        },
        orderby: { field: MENU_ORDER, order: ASC }
      },
      first: 50
    ) {
      nodes {
        id
        title
        content
        sectionSlug
        sectionOrder
      }
    }
  }
`;

export function usePageSections(page) {
  const pageSlug = typeof page === 'string' ? page : unref(page);

  const { data, pending, error } = useFetch(GRAPHQL_URL, {
    key: `page-sections-${pageSlug}`,
    method: 'POST',
    body: {
      query: PAGE_SECTIONS_QUERY,
      variables: { page: pageSlug },
    },
    transform: (response) => {
      const nodes = response?.data?.pageSections?.nodes;
      if (!nodes) return [];
      return nodes.map((n) => ({
        id: n.id,
        title: n.title,
        content: n.content,
        slug: n.sectionSlug,
        order: n.sectionOrder,
      }));
    },
  });

  function getSection(slug) {
    return data.value?.find((s) => s.slug === slug) ?? null;
  }

  return { sections: data, pending, error, getSection };
}
