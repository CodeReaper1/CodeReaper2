// Utility: calculate read time from word count (avg 200 wpm)
function readTime(wordCount, wpm = 200) {
  const minutes = Math.ceil(wordCount / wpm);
  return `${minutes} min read`;
}

// Mock blog posts — replace body/meta with real CMS data (e.g. WPGraphQL) later.
// wordCount is the CMS-provided field; body is for display only.
const POSTS = [
  {
    slug: 'core-web-vitals-inp-2025',
    title: 'Core Web Vitals Are Dead — Long Live INP',
    excerpt: "Google replaced First Input Delay with Interaction to Next Paint in 2024. Here's what that means for your site's performance score — and what to do about it.",
    category: 'Performance',
    date: 'March 20, 2025',
    author: 'Alex Mercer',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    wordCount: 380, // → 2 min read
    body: `
      <p>Interaction to Next Paint (INP) became a Core Web Vital in March 2024, replacing First Input Delay as the primary measure of page interactivity. Where FID only measured the delay before the browser <em>started</em> processing a user interaction, INP measures the full round-trip — from click or tap all the way to the next visible frame. That is a fundamentally stricter test.</p>
      <h3>Why frameworks struggle with INP</h3>
      <p>Most popular front-end frameworks accumulate long tasks on the main thread through hydration, large event handlers, and synchronous state updates. A page that passed FID with ease can fail INP badly the moment a real user opens a dropdown or submits a form. The browser main thread is a single lane; anything blocking it for more than 50ms registers as a long task and degrades INP.</p>
      <h3>Practical fixes, ranked by impact</h3>
      <p>The highest-leverage improvements: defer all non-critical third-party scripts, move computational work to Web Workers, and apply React's <code>startTransition</code> to deprioritize non-urgent re-renders. On the infrastructure side, reducing DOM size dramatically speeds up layout recalculation after each interaction. Target a score under 200ms to hit the "Good" threshold and protect your search rankings.</p>
      <p>Run a PageSpeed Insights audit today and look at the INP diagnostic panel. Most sites we review are within two or three targeted fixes of a Good rating — the work is smaller than it looks from the outside.</p>
    `,
  },
  {
    slug: 'seo-audits-missing-link',
    title: 'Why Most SEO Audits Miss the Most Important Thing',
    excerpt: "Technical checklists are easy to run. Understanding search intent at every stage of the funnel is harder — and that's where real ranking improvements come from.",
    category: 'SEO',
    date: 'March 15, 2025',
    author: 'Sara Chen',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
    wordCount: 540, // → 3 min read
    body: `
      <p>The standard SEO audit is a technical exercise: check for broken links, validate schema markup, verify canonical tags, review crawl budget. These things matter. But they rarely explain why a site with clean technical health still ranks poorly for its target terms.</p>
      <h3>The missing layer: search intent alignment</h3>
      <p>Every query carries intent — informational, navigational, transactional, or commercial. Google's algorithms have become remarkably good at detecting when a page's content type does not match the dominant intent behind a keyword. A product page stuffed with long-form blog content will underperform a lean product page for transactional queries, even if the keyword density is higher.</p>
      <p>Auditing for intent means manually reviewing the top-ten results for each target keyword and asking: what kind of content is ranking? How long is it? Does it answer a question or sell a product? Your content must satisfy the same intent type to compete on the same SERP.</p>
      <h3>E-E-A-T and the authority gap</h3>
      <p>Google's helpful content guidelines lean hard on Experience, Expertise, Authoritativeness, and Trust. Sites covering competitive topics need demonstrable author credentials and editorial standards. The fix is systematic: add author bio pages, link them to social profiles and speaking credits, build topical depth by covering related concepts exhaustively before branching out to adjacent themes. Authority compounds. A site known deeply for one topic earns ranking credit for related ones over time.</p>
      <p>Most audits surface the broken redirects. The ones that drive results find the intent gaps — and those take a human eye, not a crawler.</p>
    `,
  },
  {
    slug: 'real-cost-of-slow-website',
    title: "The Real Cost of a Slow Website (It's Not Just Bounce Rate)",
    excerpt: "Every 100ms of added latency costs Amazon an estimated 1% in sales. For smaller businesses the proportional impact is often worse. Here's how to size the actual revenue exposure.",
    category: 'Business',
    date: 'March 10, 2025',
    author: 'James Park',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    wordCount: 780, // → 4 min read
    body: `
      <p>Performance conversations tend to focus on bounce rate, and for good reason — users leave slow pages. But the downstream costs of a slow website extend well beyond the immediate exit. Conversion rates, SEO rankings, paid ad Quality Scores, and even customer lifetime value are all measurably affected by load time.</p>
      <h3>Quantifying the revenue impact</h3>
      <p>The clearest way to size your exposure is to run a latency–conversion sensitivity analysis. Pull 90 days of session data segmented by page load time. You will almost always find a nonlinear relationship: sessions under 2 seconds convert at 2–4× the rate of sessions over 5 seconds. Multiply that conversion delta by your average order value and monthly session volume to get a monthly revenue figure attached to performance.</p>
      <p>For a site generating £50,000/month with a 2% conversion rate and 50,000 monthly sessions, a 1-percentage-point improvement in conversion from speed alone is worth £25,000 in incremental monthly revenue. At that level, investing in a Lighthouse audit and a day of developer time is one of the highest-ROI activities available.</p>
      <h3>The paid media multiplier</h3>
      <p>Google Ads Quality Score is partially determined by landing page experience. Slow landing pages receive lower Quality Scores, which directly raises your cost-per-click. Agencies routinely see 15–30% CPC reductions after improving landing page speed — a compounding benefit because the savings apply to every campaign going forward.</p>
      <h3>Where to start</h3>
      <p>Run Google Search Console's Core Web Vitals report and PageSpeed Insights for your highest-traffic pages. Fix the Largest Contentful Paint issues first: they are typically caused by unoptimized hero images, render-blocking CSS, or slow server response times. Each of those has a known fix, a clear before/after measurement, and a direct line to the metrics that move revenue.</p>
      <p>Performance is not a one-time audit — it requires ongoing monitoring as content changes, new scripts are added, and traffic patterns shift. Build a quarterly performance review into your maintenance calendar before a slow page starts costing you more than it would cost to fix it.</p>
    `,
  },
  {
    slug: 'gsap-vs-css-animations',
    title: 'GSAP vs CSS Animations: A Practical Guide for 2025',
    excerpt: "CSS animations have come a long way. So has GSAP. Choosing between them isn't a matter of preference — it depends on what you're building and the performance model you're working within.",
    category: 'Design',
    date: 'March 5, 2025',
    author: 'Mia Torres',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop',
    wordCount: 900, // → 5 min read
    body: `
      <p>The question comes up on every project that involves motion design: should we use CSS animations or reach for GSAP? The honest answer depends on four factors: complexity of the animation, scroll-dependency, browser performance requirements, and team familiarity.</p>
      <h3>When CSS is the right choice</h3>
      <p>CSS transitions and animations run on the compositor thread, meaning they can animate <code>transform</code> and <code>opacity</code> without touching the main JavaScript thread at all. For simple, self-contained animations — hover states, loading spinners, modal entrance fades — CSS is faster to write, easier to maintain, and performs identically on all devices. The Web Animations API (WAAPI) has closed much of the gap with libraries for programmatic control, and is worth evaluating seriously in 2025 for teams who want JavaScript control without a library dependency.</p>
      <h3>When GSAP earns its place</h3>
      <p>The moment your animation requires precise sequencing across multiple elements, GSAP's timeline API becomes invaluable. A GSAP timeline gives you absolute and relative positioning, stagger control, and the ability to reverse, pause, or seek to any point — in a way that would require hundreds of lines of CSS and manual orchestration logic to replicate.</p>
      <p>ScrollTrigger, GSAP's scroll-linked animation plugin, has no meaningful CSS equivalent. Pinning a section while an internal timeline plays, scrubbing animation progress to scroll position, triggering different animations at different scroll points — these are GSAP's native territory.</p>
      <h3>The performance question</h3>
      <p>GSAP animates via JavaScript on the main thread, which means a heavy timeline on a mobile device can cause jank if it mutates layout properties. The key rule applies to both CSS and GSAP: animate <code>transform</code> and <code>opacity</code> whenever possible. GSAP 3.x includes a <code>force3D</code> option that promotes animated elements to their own GPU layer, reducing paint costs for complex animations with many moving parts.</p>
      <h3>Practical decision framework</h3>
      <p>Simple hover and micro-interactions: use CSS. Entry animations triggered on scroll without complex sequencing: either works. Complex multi-element timelines, scroll-scrubbed animations, pinned sections: GSAP. The best teams use both — CSS for component-level micro-interactions, GSAP for page-level narrative sequences. That split gives you compositor-threaded performance where it's sufficient, and GSAP's expressive power where the complexity demands it.</p>
    `,
  },
  {
    slug: 'headless-wordpress-nuxt',
    title: 'Going Headless: WordPress + Nuxt in Production',
    excerpt: "Decoupling WordPress from its front-end unlocks Nuxt's full rendering power while keeping your editor's familiar workflow. Here is the exact setup we use for client sites.",
    category: 'Technology',
    date: 'March 3, 2025',
    author: 'Kai Brennan',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
    wordCount: 1100, // → 6 min read
    body: `
      <p>WordPress powers roughly 43% of the web — not because developers love PHP, but because content editors love the Block Editor and the mature plugin ecosystem. The headless approach keeps that editorial experience intact while letting you build the front-end in whatever stack you prefer. For Teraformed projects, that stack is Nuxt 3.</p>
      <h3>The architecture</h3>
      <p>In a headless setup, WordPress runs purely as a data source: it stores content, manages users, and exposes an API. The Nuxt front-end fetches that content at build time (for static pages) or at request time (for dynamic pages) via either the REST API or WPGraphQL. We prefer WPGraphQL for the precision it gives — you can request exactly the fields you need in a single query, keeping payload sizes small and request counts low.</p>
      <h3>WPGraphQL setup</h3>
      <p>Install WPGraphQL and optionally WPGraphQL for ACF if you use Advanced Custom Fields. The plugin adds a <code>/graphql</code> endpoint to your WordPress installation. From Nuxt, create a composable around <code>useFetch</code> that wraps your GraphQL queries. This gives you consistent error handling, caching via Nuxt's built-in data layer, and type safety if you integrate GraphQL Code Generator.</p>
      <p>For authentication on private content, WordPress's application passwords feature (built in since WP 5.6) provides a clean mechanism for server-to-server requests without exposing user credentials in the browser. Store the credentials in <code>.env</code> and access them only in server-side route handlers or Nitro server routes.</p>
      <h3>Deployment and preview</h3>
      <p>The trickiest part of headless WordPress is preview mode — editors need to see draft content before publishing. Nuxt's server-side rendering handles this natively: create a Nuxt server route that validates a WordPress preview token, sets a preview cookie, and redirects to the target page. On the page, detect the preview cookie and switch the GraphQL query from published-only to draft status. The result is a seamless preview experience that doesn't expose draft content to public visitors.</p>
      <h3>Performance implications</h3>
      <p>Headless WordPress sites consistently score above 95 on PageSpeed Insights for mobile because the Nuxt front-end is free of WordPress's plugin-injected CSS and JS. You control every byte that ships to the browser. The tradeoff: build times scale with content volume, so large sites should implement Incremental Static Regeneration using Nuxt's <code>useAsyncData</code> caching or a CDN-level stale-while-revalidate strategy rather than rebuilding the entire site on every content change.</p>
    `,
  },
  {
    slug: 'brand-copy-that-converts',
    title: 'How to Write Brand Copy That Actually Converts',
    excerpt: "Most brand copy is written for the company, not the customer. Flipping that perspective — with a clear framework — is the fastest way to improve conversion rates without changing a single pixel of design.",
    category: 'Marketing',
    date: 'February 28, 2025',
    author: 'Leon Hughes',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop',
    wordCount: 1250, // → 7 min read
    body: `
      <p>Visit ten agency or SaaS websites at random. Nine of them will open with a headline about the company's passion, expertise, or award-winning approach. One of them will open with a sentence about the customer's problem. The one that leads with the problem will convert better — not because of the writing quality, but because of the frame.</p>
      <h3>The fundamental shift: from company to customer</h3>
      <p>The most common copywriting mistake is confusing the company's story with the customer's story. "We've been delivering digital excellence since 2012" is the company's story. "You need a website that earns while you sleep" is the customer's story. Good conversion copy is about the customer at every stage of the page: the problem they have, the outcome they want, and the specific mechanism by which your product delivers that outcome.</p>
      <p>Start every copy project by writing a "Customer Before and After" document. Column A is the customer's current state before engaging you. Column B is the after state. Every sentence of copy should move the reader from column A to column B. If a sentence doesn't do that, cut it.</p>
      <h3>Headlines: where conversion is won or lost</h3>
      <p>Research consistently shows that 80% of readers only read the headline before deciding whether to continue. That makes it disproportionately important — it must communicate the specific outcome the customer wants, not the input or method. "Custom web development" is an input. "A website that loads in under 2 seconds and ranks on page one" is an output. Headlines that promise specific, believable outcomes outperform vague quality claims every time.</p>
      <p>The best headline formula for services: <strong>[Specific Outcome] + [Time Frame or Mechanism] + [Objection Removal]</strong>. "A new brand identity, delivered in 4 weeks, without the agency back-and-forth" hits all three. It states the outcome, signals efficiency with a specific timeframe, and removes the most common objection to hiring an agency.</p>
      <h3>Social proof: specificity beats volume</h3>
      <p>Testimonials with specific numbers, names, and company references outperform generic praise by a wide margin. "Great service, highly recommend" is noise. "We went from 12 qualified leads per month to 47 within 90 days of launching the new site" is signal. If your clients won't provide specific metrics, interview them until you find a story with a clear before/after and ask if you can tell it with their permission.</p>
      <h3>CTAs: commit to one action per page</h3>
      <p>Every page should have one primary call to action. Not two, not three — one. Multiple competing CTAs split attention and reduce the conversion rate of each individual action. The language of the CTA matters: "Submit" has consistently lower click rates than "Get My Free Audit" or "Start My Project." Use first-person, outcome-oriented language that continues the customer's journey rather than ending it.</p>
      <h3>Testing: the only way to know</h3>
      <p>Copy intuition improves with experience, but no copywriter can predict which version of a headline will convert better without data. Build a minimum viable testing infrastructure: one page, two headline variants, a 95% statistical significance threshold, and enough traffic to reach it. The compounding effect of iterative copy improvements over 12 months is larger than any single redesign.</p>
    `,
  },
];

export function useBlogPosts() {
  const postsWithReadTime = POSTS.map(post => ({
    ...post,
    readTime: readTime(post.wordCount),
  }));

  function getPost(slug) {
    return postsWithReadTime.find(p => p.slug === slug) ?? null;
  }

  return { posts: postsWithReadTime, getPost };
}
