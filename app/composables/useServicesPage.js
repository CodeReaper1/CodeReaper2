import { computed } from 'vue';
import { useI18n } from '#i18n';

const GRAPHQL_URL = 'https://api.apexdigital.dev/graphql';

const SERVICES_QUERY = `
  query GetServicesPageSettings {
    apexSiteSettings {
      servicesPageMetaTitle
      servicesHeroEyebrow
      servicesHeroTitleHtml
      servicesHeroSubtitle
      servicesScrollHint
      servicesCards {
        indexLabel
        title
        description
        imageUrl
        imageAlt
        features
        ctaLabel
        ctaPath
      }
    }
  }
`;

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
];

/** Default hero/portfolio strip copy from Framer project (Unframer MCP). Editable in WP Apex Settings. */
const FRAMER_FALLBACK = {
  eyebrow: 'Crafting Unique Brand Identities',
  titleHtml:
    'Branding that you <span class="text-primary font-medium">need</span> <span class="text-white font-medium">Indeed</span>',
  subtitle:
    'Elevate your brand with custom identity and package design. Showcase your story through bold visuals and strategic design solutions.',
  scrollPrimary: 'Scroll down',
  scrollSecondary: 'to see projects',
  worksSectionTitle: 'Recent Works',
  primaryCtaLabel: 'Get Started Now',
  primaryCtaPath: '/contact',
  secondaryCtaLabel: 'See Projects',
  secondaryCtaPath: '/portfolio',
  projectsLinkLabel: 'All Projects',
  projectsLinkPath: '/portfolio',
};

function defaultCards(t) {
  return [
    {
      indexLabel: '01.',
      title: t('services_page.web_dev.title'),
      description: t('services_page.web_dev.desc'),
      imageUrl: FALLBACK_IMAGES[0],
      imageAlt: '',
      features: [
        t('services_page.web_dev.f1'),
        t('services_page.web_dev.f2'),
        t('services_page.web_dev.f3'),
        t('services_page.web_dev.f4'),
      ],
      ctaLabel: t('services_page.btn_read_more'),
      ctaPath: '/web-development',
    },
    {
      indexLabel: '02.',
      title: t('services_page.seo.title'),
      description: t('services_page.seo.desc'),
      imageUrl: FALLBACK_IMAGES[1],
      imageAlt: '',
      features: [
        t('services_page.seo.f1'),
        t('services_page.seo.f2'),
        t('services_page.seo.f3'),
      ],
      ctaLabel: t('services_page.btn_read_more'),
      ctaPath: '/seo',
    },
    {
      indexLabel: '03.',
      title: t('services_page.marketing.title'),
      description: t('services_page.marketing.desc'),
      imageUrl: FALLBACK_IMAGES[2],
      imageAlt: '',
      features: [
        t('services_page.marketing.f1'),
        t('services_page.marketing.f2'),
        t('services_page.marketing.f3'),
        t('services_page.marketing.f4'),
      ],
      ctaLabel: t('services_page.btn_read_more'),
      ctaPath: '/digital-marketing',
    },
  ];
}

function normalizeCard(c, idx, t) {
  const hasBody =
    (c.title && String(c.title).trim()) ||
    (c.description && String(c.description).trim()) ||
    (c.imageUrl && String(c.imageUrl).trim());
  if (!hasBody) return null;
  const feats = Array.isArray(c.features) ? c.features.filter(Boolean) : [];
  return {
    indexLabel: (c.indexLabel && String(c.indexLabel).trim()) || String(idx + 1).padStart(2, '0') + '.',
    title: c.title || '',
    description: c.description || '',
    imageUrl: c.imageUrl || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
    imageAlt: c.imageAlt || '',
    features: feats.length ? feats : [],
    ctaLabel: (c.ctaLabel && String(c.ctaLabel).trim()) || t('services_page.btn_read_more'),
    ctaPath: (c.ctaPath && String(c.ctaPath).trim()) || '/contact',
  };
}

function buildPage(cms, t) {
  const c = cms || {};
  const metaTitle =
    (c.servicesPageMetaTitle && String(c.servicesPageMetaTitle).trim()) || `${t('nav.services')} | Apex Digital`;
  const eyebrow =
    (c.servicesHeroEyebrow && String(c.servicesHeroEyebrow).trim()) || FRAMER_FALLBACK.eyebrow;
  const titleHtml =
    (c.servicesHeroTitleHtml && String(c.servicesHeroTitleHtml).trim()) ||
    FRAMER_FALLBACK.titleHtml;
  const subtitle =
    (c.servicesHeroSubtitle && String(c.servicesHeroSubtitle).trim()) ||
    FRAMER_FALLBACK.subtitle;

  let scrollPrimary = FRAMER_FALLBACK.scrollPrimary;
  let scrollSecondary = FRAMER_FALLBACK.scrollSecondary;
  const scrollCombined = c.servicesScrollHint && String(c.servicesScrollHint).trim();
  if (scrollCombined) {
    const parts = scrollCombined.split('|').map((s) => s.trim());
    scrollPrimary = parts[0] || scrollPrimary;
    scrollSecondary = parts[1] || scrollSecondary;
  }

  let cards = [];
  if (Array.isArray(c.servicesCards) && c.servicesCards.length) {
    cards = c.servicesCards
      .map((row, i) => normalizeCard(row, i, t))
      .filter(Boolean);
  }
  if (!cards.length) {
    cards = defaultCards(t);
  }

  return {
    metaTitle,
    eyebrow,
    titleHtml,
    subtitle,
    scrollPrimary,
    scrollSecondary,
    worksSectionTitle: FRAMER_FALLBACK.worksSectionTitle,
    primaryCtaLabel: FRAMER_FALLBACK.primaryCtaLabel,
    primaryCtaPath: FRAMER_FALLBACK.primaryCtaPath,
    secondaryCtaLabel: FRAMER_FALLBACK.secondaryCtaLabel,
    secondaryCtaPath: FRAMER_FALLBACK.secondaryCtaPath,
    projectsLinkLabel: FRAMER_FALLBACK.projectsLinkLabel,
    projectsLinkPath: FRAMER_FALLBACK.projectsLinkPath,
    cards,
  };
}

export function useServicesPage() {
  const { t } = useI18n();

  const { data, pending, error } = useFetch(GRAPHQL_URL, {
    key: 'apex-services-page-settings',
    method: 'POST',
    body: { query: SERVICES_QUERY },
    transform: (response) => response?.data?.apexSiteSettings ?? null,
  });

  const page = computed(() => buildPage(data.value, t));

  return { page, pending, error };
}
