<template>
  <main>
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">
        
        <!-- banner -->
        <div class="mil-inner-banner mil-p-0-120">
            <div class="mil-banner-content mil-up">
                <div class="mil-animation-frame">
                    <div class="mil-animation mil-position-4 mil-dark mil-scale" data-value-1="6" data-value-2="1.4"></div>
                </div>
                <div class="container">
                    <ul class="mil-breadcrumbs mil-mb-60">
                        <li><NuxtLink to="/">Homepage</NuxtLink></li>
                        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
                    </ul>
                    <h1 class="mil-mb-60">
                        Exploring <span class="mil-thin">the World</span> <br>
                        Through Our <span class="mil-thin">Blog</span>
                    </h1>
                    <a href="#blog" class="mil-link mil-dark mil-arrow-place mil-down-arrow">
                        <span>Publications</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- banner end -->

        <!-- popular -->
        <section class="mil-soft-bg" id="blog">
            <div class="container mil-p-120-60">
                <div class="row align-items-center mil-mb-30">
                    <div class="col-lg-6 mil-mb-30">
                        <h3 class="mil-up">Popular Publications:</h3>
                    </div>
                    <div class="col-lg-6 mil-mb-30">
                        <div class="mil-adaptive-right mil-up">
                            <NuxtLink to="/blog" class="mil-link mil-dark mil-arrow-place">
                                <span>View all</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- Dummy Post 1 -->
                    <div class="col-lg-6">
                        <NuxtLink to="/blog/modern-web-development-trends-2024" class="mil-blog-card mil-mb-60">
                            <div class="mil-cover-frame mil-up">
                                <img src="/img/blog/1.jpg" alt="Dummy post image" />
                            </div>
                            <div class="mil-post-descr">
                                <div class="mil-labels mil-up mil-mb-30">
                                    <div class="mil-label mil-upper mil-accent">TECHNOLOGY</div>
                                    <div class="mil-label mil-upper">October 24 2023</div>
                                </div>
                                <h4 class="mil-up mil-mb-30">Modern Web Development Trends in 2024</h4>
                                <p class="mil-post-text mil-up mil-mb-30">Discover the latest cutting-edge technologies and frameworks that are shaping the future of web development, from Server-Side Rendering to new reactive patterns...</p>
                                <div class="mil-link mil-dark mil-arrow-place mil-up">
                                    <span>Read more</span>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                    
                    <!-- Dummy Post 2 -->
                    <div class="col-lg-6">
                        <NuxtLink to="/blog/seo-strategies-for-ai-search" class="mil-blog-card mil-mb-60">
                            <div class="mil-cover-frame mil-up">
                                <img src="/img/blog/2.jpg" alt="Dummy post image" />
                            </div>
                            <div class="mil-post-descr">
                                <div class="mil-labels mil-up mil-mb-30">
                                    <div class="mil-label mil-upper mil-accent">MARKETING</div>
                                    <div class="mil-label mil-upper">November 05 2023</div>
                                </div>
                                <h4 class="mil-up mil-mb-30">SEO Strategies for the AI Search Era</h4>
                                <p class="mil-post-text mil-up mil-mb-30">As search engines actively integrate Generative AI directly into their results pages, traditional SEO is rapidly changing. How can you adapt your content strategy?</p>
                                <div class="mil-link mil-dark mil-arrow-place mil-up">
                                    <span>Read more</span>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
        <!-- popular end -->

        <!-- all blog posts (Dummy grid) -->
        <section>
            <div class="container mil-p-120-120">
                <div class="row align-items-center mil-mb-30">
                    <div class="col-lg-12 mil-mb-30">
                        <h3 class="mil-up">All Publications:</h3>
                    </div>
                </div>
                <div class="row">
                    <!-- Dummy Post 3 -->
                    <div class="col-lg-12">
                        <NuxtLink to="/blog/mastering-gsap-animations" class="mil-blog-card mil-mb-60">
                            <div class="mil-cover-frame mil-up">
                                <img src="/img/blog/3.jpg" alt="Dummy post image" />
                            </div>
                            <div class="mil-post-descr">
                                <div class="mil-labels mil-up mil-mb-30">
                                    <div class="mil-label mil-upper mil-accent">DESIGN</div>
                                    <div class="mil-label mil-upper">December 12 2023</div>
                                </div>
                                <h4 class="mil-up mil-mb-30">Mastering GSAP Animations in Modern SPAs</h4>
                                <p class="mil-post-text mil-up mil-mb-30">Learn how to properly integrate and clean up GSAP ScrollTriggers within modern Single Page Applications like Nuxt and Next to avoid memory leaks.</p>
                                <div class="mil-link mil-dark mil-arrow-place mil-up">
                                    <span>Read more</span>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
        <!-- blog end -->

        <!-- call to action -->
        <section class="mil-soft-bg">
            <div class="container mil-p-120-120">
                <div class="row">
                    <div class="col-lg-10">
                        <span class="mil-suptitle mil-suptitle-right mil-suptitle-dark mil-up">
                            Looking to make your mark? We'll help you turn your project into a success story.
                        </span>
                    </div>
                </div>
                <div class="mil-center">
                    <h2 class="mil-up mil-mb-60">
                        Stay up-to-date <span class="mil-thin">with the</span><br> latest news by <span class="mil-thin">subscribing</span><br> to our <span class="mil-thin">newsletter!</span>
                    </h2>
                    <div class="row justify-content-center mil-up">
                        <div class="col-lg-4">
                            <form class="mil-subscribe-form mil-subscribe-form-2 mil-up">
                                <input type="text" placeholder="Enter your email">
                                <button type="submit" class="mil-button mil-icon-button-sm mil-arrow-place"></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- call to action end -->

      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    if (window.refreshScrollAnimations) {
        window.refreshScrollAnimations();
    }
});
</script>
