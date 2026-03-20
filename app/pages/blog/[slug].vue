<template>
  <main>
    <div class="mil-content">
      <div id="swupMain" class="mil-main-transition">

        <!-- banner -->
        <div class="mil-inner-banner">
            <div class="mil-banner-content mil-center mil-up">
                <div class="container">
                    <!-- Breadcrumbs -->
                    <ul class="mil-breadcrumbs mil-center mil-mb-60">
                        <li><NuxtLink to="/">Homepage</NuxtLink></li>
                        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
                        <li><span class="mil-active">{{ post.title }}</span></li>
                    </ul>
                    <!-- Post Title -->
                    <h2>{{ post.title }}</h2>
                </div>
            </div>
        </div>
        <!-- banner end -->

        <!-- publication -->
        <section id="blog">
            <div class="container mil-p-120-90">
                <div class="row justify-content-center">
                    <div class="col-lg-12">

                        <!-- Post Thumbnail -->
                        <div class="mil-image-frame mil-horizontal mil-up">
                            <img :src="post.image" alt="Post cover" class="mil-scale" />
                        </div>

                        <!-- Post Info -->
                        <div class="mil-info mil-up mil-mb-90">
                            <div>Category: &nbsp;<span class="mil-dark">{{ post.category }}</span></div>
                            <div>Date: &nbsp;<span class="mil-dark">{{ post.date }}</span></div>
                            <div>Author: &nbsp;<span class="mil-dark">{{ post.author }}</span></div>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <!-- Post Content -->
                        <div class="mil-text-xl mil-dark mil-up mil-mb-60" v-html="post.content"></div>
                    </div>
                </div>
            </div>
        </section>
        <!-- publication end -->

        <!-- similar -->
        <section class="mil-soft-bg">
            <div class="container mil-p-120-60">
                <div class="row align-items-center mil-mb-30">
                    <div class="col-lg-6 mil-mb-30">
                        <h3 class="mil-up">Similar Publications:</h3>
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
                    <!-- Related Post 1 -->
                    <div class="col-lg-6">
                        <NuxtLink to="/blog/similar-post-1" class="mil-blog-card mil-mb-60">
                            <div class="mil-cover-frame mil-up">
                                <img src="/img/blog/4.jpg" alt="Related post" />
                            </div>
                            <div class="mil-post-descr">
                                <div class="mil-labels mil-up mil-mb-30">
                                    <div class="mil-label mil-upper mil-accent">{{ post.category }}</div>
                                    <div class="mil-label mil-upper">January 10 2024</div>
                                </div>
                                <h4 class="mil-up mil-mb-30">A Similar Topic to Explore</h4>
                                <p class="mil-post-text mil-up mil-mb-30">Here is a dummy excerpt for a related publication that shares categories with the current post.</p>
                                <div class="mil-link mil-dark mil-arrow-place mil-up">
                                    <span>Read more</span>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
        <!-- similar end -->

      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Dummy data for WP template simulation
const post = {
    title: route.params.slug ? route.params.slug.replace(/-/g, ' ').toUpperCase() : 'Dynamic Blog Title',
    image: '/img/blog/2.jpg',
    category: 'TECHNOLOGY',
    date: 'October 24 2023',
    author: 'Admin',
    content: `
        <p>This is dummy content rendering the body of the blog post. In the future WPGraphQL implementation, this will be replaced with standard WordPress block content parsed directly from the database.</p>
        <p>Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <br/>
        <h3>Subsection of the article</h3>
        <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus.</p>
    `
};

onMounted(() => {
    if (window.refreshScrollAnimations) {
        window.refreshScrollAnimations();
    }
});
</script>

<style scoped>
/* Scoped styles replicating the custom inline CSS from single.php */
.mil-text-xl :deep(p) {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    max-width: 100%;
    overflow: hidden;
    margin: 15px 0;
    padding: 0;
}
.mil-text-xl :deep(.mil-post-text) {
    transform: none !important;
}
</style>
