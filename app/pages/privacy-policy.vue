<template>
  <main>
    <div class="mil-content">
        <div id="swupMain" class="mil-main-transition">

            <div class="container py-5 mil-p-120-120">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <h1 class="mb-4 mil-up mil-mb-60">{{ $t('privacy.title') }}</h1>

                        <div class="card mb-4 mil-up">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.who_we_are_title') }}</h2>
                                <p class="mb-0">{{ $t('privacy.who_we_are_desc') }}</p>
                            </div>
                        </div>

                        <div class="card mb-4 mil-up">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.comments_title') }}</h2>
                                <p>{{ $t('privacy.comments_desc1') }}</p>
                                <p class="mb-0">{{ $t('privacy.comments_desc2') }}</p>
                            </div>
                        </div>

                        <div class="card mb-4 mil-up">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.media_title') }}</h2>
                                <p class="mb-0">{{ $t('privacy.media_desc') }}</p>
                            </div>
                        </div>

                        <div id="cookies" class="card mb-4 mil-up" style="scroll-margin-top: 120px">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.cookies_title') }}</h2>
                                <p>{{ $t('privacy.cookies_desc1') }}</p>
                                <p>{{ $t('privacy.cookies_desc2') }}</p>
                                <p>{{ $t('privacy.cookies_desc3') }}</p>
                                <p class="mb-0">{{ $t('privacy.cookies_desc4') }}</p>
                            </div>
                        </div>

                        <div class="card mb-4 mil-up">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.embedded_title') }}</h2>
                                <p>{{ $t('privacy.embedded_desc1') }}</p>
                                <p class="mb-0">{{ $t('privacy.embedded_desc2') }}</p>
                            </div>
                        </div>

                        <div class="card mb-4 mil-up">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.share_title') }}</h2>
                                <p class="mb-0">{{ $t('privacy.share_desc') }}</p>
                            </div>
                        </div>

                        <div class="card mb-4 mil-up">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.retain_title') }}</h2>
                                <p>{{ $t('privacy.retain_desc1') }}</p>
                                <p class="mb-0">{{ $t('privacy.retain_desc2') }}</p>
                            </div>
                        </div>

                        <div class="card mb-4 mil-up">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.rights_title') }}</h2>
                                <p class="mb-0">{{ $t('privacy.rights_desc') }}</p>
                            </div>
                        </div>

                        <div class="card mb-4 mil-up">
                            <div class="card-body">
                                <h2 class="h4 mb-3">{{ $t('privacy.where_title') }}</h2>
                                <p class="mb-0">{{ $t('privacy.where_desc') }}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

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

<style scoped>
/* Adding basic card styling to account for Bootstrap classes present in original PHP that might be missing */
.card {
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    color: var(--mil-dark);
}
.card-body {
    padding: 2rem;
}
.mb-4 { margin-bottom: 2rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-0 { margin-bottom: 0; }
.py-5 { padding-top: 5rem; padding-bottom: 5rem; }
.h4 { font-size: 1.5rem; font-weight: 600; }
</style>
