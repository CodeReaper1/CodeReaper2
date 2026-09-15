const GRAPHQL_URL = 'https://api.apexdigital.dev/graphql';

const SETTINGS_QUERY = `
  query GetSiteSettings {
    apexSiteSettings {
      primaryColor
      seoAccentColor
      dmAccentColor
      wdAccentColor
      homepageHeroSubtitle
      homepageHeroTitle1
      homepageHeroTitle2
      homepageHeroDesc
      homepageHeroBtn1
      homepageHeroBtn2
      homepageStrategySubtitle
      homepageStrategyTitle
      homepageStat1Num
      homepageStat1Label
      homepageStat2Num
      homepageStat2Label
      homepageProcessSteps {
        title
        desc
      }
      homepageCtaTitle
      homepageCtaDesc
      homepageCtaBtn
      homepageCtaSubtitle
      homepageCtaLink
      homepageScrollingTitle
      homepageScrollingSubtitle
      homepageFaqTitle
      homepageFaqSubtitle
      homepageFaqItems {
        question
        answer
      }
      homepageStackTitle
      homepageStackSubtitle
      homepageStackItems {
        name
        category
        logo {
          sourceUrl
          altText
        }
      }
    }
  }
`;

const DEFAULT_STACK_ITEMS = [
  { name: 'Figma', category: 'Design', logo: { sourceUrl: '/img/tech/figma.svg', altText: 'Figma logo' } },
  { name: 'Nuxt', category: 'Framework', logo: { sourceUrl: '/img/tech/nuxt.svg', altText: 'Nuxt logo' } },
  { name: 'React', category: 'Framework', logo: { sourceUrl: '/img/tech/react.svg', altText: 'React logo' } },
  { name: 'TypeScript', category: 'Language', logo: { sourceUrl: '/img/tech/typescript.svg', altText: 'TypeScript logo' } },
  { name: 'Tailwind CSS', category: 'Styling', logo: { sourceUrl: '/img/tech/tailwindcss.svg', altText: 'Tailwind CSS logo' } },
  { name: 'GSAP', category: 'Motion', logo: { sourceUrl: '/img/tech/gsap.svg', altText: 'GSAP logo' } },
  { name: 'WordPress', category: 'CMS', logo: { sourceUrl: '/img/tech/wordpress.svg', altText: 'WordPress logo' } },
  { name: 'Shopify', category: 'Commerce', logo: { sourceUrl: '/img/tech/shopify.svg', altText: 'Shopify logo' } },
  { name: 'Node.js', category: 'Runtime', logo: { sourceUrl: '/img/tech/nodejs.svg', altText: 'Node.js logo' } },
  { name: 'Supabase', category: 'Backend', logo: { sourceUrl: '/img/tech/supabase.svg', altText: 'Supabase logo' } },
  { name: 'Cloudflare', category: 'Infra', logo: { sourceUrl: '/img/tech/cloudflare.svg', altText: 'Cloudflare logo' } },
  { name: 'Framer Motion', category: 'Motion', logo: { sourceUrl: '/img/tech/framer-motion.svg', altText: 'Framer Motion logo' } },
];

const DEFAULTS = {
  primaryColor: '#FF9900',
  seoAccentColor: '#FF9900',
  dmAccentColor: '#FFA500',
  wdAccentColor: '#FFA500',
  homepageHeroSubtitle: 'AWARD-WINNING DIGITAL AGENCY',
  homepageHeroTitle1: 'WE BUILD',
  homepageHeroTitle2: 'DIGITAL EXPERIENCES',
  homepageHeroDesc: 'We craft beautiful, conversion-focused websites and digital products that help ambitious brands grow faster.',
  homepageHeroBtn1: 'Our Services',
  homepageHeroBtn2: 'View Portfolio',
  homepageStrategySubtitle: 'OUR STRATEGY',
  homepageStrategyTitle: 'Data-driven decisions.<br>Creative execution.',
  homepageStat1Num: '200',
  homepageStat1Label: 'PROJECTS COMPLETED',
  homepageStat2Num: '98',
  homepageStat2Label: 'CLIENT SATISFACTION',
  homepageProcessSteps: [
    { title: 'Discovery & Strategy', desc: 'We dive deep into your business, understanding your goals, audience, and market to craft a tailored digital strategy.' },
    { title: 'Design & Prototyping', desc: 'Our design team creates stunning, user-centric interfaces that align perfectly with your brand identity.' },
    { title: 'Development & Build', desc: 'We bring designs to life using modern frameworks, ensuring fast, scalable, and secure digital products.' },
    { title: 'Launch & Growth', desc: 'After a successful launch, we focus on continuous optimization and digital marketing to drive growth.' },
  ],
  homepageCtaTitle: '',
  homepageCtaDesc: '',
  homepageCtaBtn: '',
  homepageCtaSubtitle: '',
  homepageCtaLink: '/contact',
  homepageScrollingTitle: 'Selected Work',
  homepageScrollingSubtitle: 'Digital Dust',
  // Empty on purpose: index.vue falls through to the translated i18n copy
  // when the CMS has nothing, so English defaults here would beat every translation.
  homepageFaqTitle: '',
  homepageFaqSubtitle: '',
  homepageFaqItems: [],
  homepageStackTitle: 'The stack we ship with',
  homepageStackSubtitle: 'Tech & Tools',
  homepageStackItems: DEFAULT_STACK_ITEMS,
};

function normalize(s) {
  if (!s) return { ...DEFAULTS };
  const out = { ...DEFAULTS, ...s };
  out.homepageFaqItems = Array.isArray(s.homepageFaqItems) ? s.homepageFaqItems.filter(i => i && i.question) : [];
  const stackItems = Array.isArray(s.homepageStackItems) ? s.homepageStackItems.filter(i => i && i.name) : [];
  out.homepageStackItems = stackItems.length ? stackItems : DEFAULT_STACK_ITEMS;
  const processSteps = Array.isArray(s.homepageProcessSteps) ? s.homepageProcessSteps.filter(i => i && i.title) : [];
  out.homepageProcessSteps = processSteps.length ? processSteps : DEFAULTS.homepageProcessSteps;
  return out;
}

export function useSiteSettings() {
  const { data, pending, error } = useFetch(GRAPHQL_URL, {
    key: 'apex-site-settings',
    method: 'POST',
    body: { query: SETTINGS_QUERY },
    transform: (response) => normalize(response?.data?.apexSiteSettings),
  });

  const settings = computed(() => data.value ?? { ...DEFAULTS });

  return { settings, pending, error };
}
