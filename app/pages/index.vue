<script lang="ts" setup>
import { ProductsOrderByEnum } from '#gql/default';

const { siteName } = useAppConfig();

const { data: productData } = await useAsyncGql('getProducts', { first: 4, orderby: ProductsOrderByEnum.Popularity });
const popularProducts = productData.value?.products?.nodes || [];

useSeoMeta({
  title: 'COCO — Pure Coconut Water',
  ogTitle: 'COCO — Pure Coconut Water',
  description: 'Natural coconut water sourced straight from the tropics. No additives, no preservatives — just pure hydration.',
  ogDescription: 'Natural coconut water sourced straight from the tropics. Pure hydration delivered to your door.',
});
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="coco-hero-bg coco-leaf-decoration relative overflow-hidden min-h-[600px] flex items-center">
      <div class="container relative z-10 py-24 grid gap-6 md:grid-cols-2 items-center">
        <div class="text-white space-y-6">
          <span class="inline-block text-sm font-semibold tracking-widest uppercase text-[--color-coco-gold] border border-[--color-coco-gold]/40 px-4 py-1 rounded-full">
            100% Natural
          </span>
          <h1 class="text-5xl font-bold leading-tight lg:text-6xl">
            Pure. Natural.<br />
            <span class="text-[--color-coco-gold]">Refreshing.</span>
          </h1>
          <p class="text-lg text-white/80 max-w-md">
            Straight from hand-picked tropical coconuts. No additives, no preservatives — just electrolyte-rich coconut water the way nature intended.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/products"
              class="bg-[--color-coco-gold] hover:bg-yellow-400 text-[--color-coco-dark] font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Shop Now
            </NuxtLink>
            <NuxtLink
              to="/product-category/coconut-water"
              class="border border-white/40 hover:bg-white/10 text-white font-medium px-8 py-3 rounded-full transition-colors"
            >
              View Range
            </NuxtLink>
          </div>
        </div>
        <div class="hidden md:flex justify-center">
          <div class="relative w-72 h-72">
            <div class="absolute inset-0 rounded-full bg-[--color-coco-teal]/20 blur-3xl"></div>
            <img
              src="/images/hero-product.png"
              alt="COCO Coconut Water"
              class="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              onerror="this.style.display='none'"
            />
            <!-- Fallback coconut illustration when no image -->
            <div class="absolute inset-0 flex items-center justify-center text-[160px] select-none opacity-60">🥥</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust badges -->
    <section class="bg-[--color-coco-cream] py-10">
      <div class="container grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
        <div class="flex flex-col items-center gap-2">
          <span class="text-3xl">🌴</span>
          <p class="text-sm font-semibold text-[--color-coco-dark]">Tropical Sourced</p>
          <p class="text-xs text-gray-500">Hand-picked from Thailand & Philippines</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-3xl">⚡</span>
          <p class="text-sm font-semibold text-[--color-coco-dark]">Natural Electrolytes</p>
          <p class="text-xs text-gray-500">Potassium, magnesium & more</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-3xl">🚚</span>
          <p class="text-sm font-semibold text-[--color-coco-dark]">Fast Delivery</p>
          <p class="text-xs text-gray-500">Free shipping on orders over €40</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-3xl">🏅</span>
          <p class="text-sm font-semibold text-[--color-coco-dark]">Loyalty Rewards</p>
          <p class="text-xs text-gray-500">Earn points with every sip</p>
        </div>
      </div>
    </section>

    <!-- Popular products -->
    <section v-if="popularProducts.length" class="container my-20">
      <div class="flex items-end justify-between mb-8">
        <div>
          <p class="text-sm font-semibold tracking-widest uppercase text-[--color-coco-teal] mb-1">Our Range</p>
          <h2 class="text-3xl font-bold text-[--color-coco-dark]">Best Sellers</h2>
        </div>
        <NuxtLink class="text-primary font-medium hover:underline" to="/products">View all</NuxtLink>
      </div>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <ProductCard v-for="product in popularProducts" :key="product.databaseId" :node="product" />
      </div>
    </section>

    <!-- Benefits section -->
    <section class="bg-[--color-coco-dark] text-white py-20 my-20">
      <div class="container">
        <div class="text-center mb-12">
          <p class="text-sm font-semibold tracking-widest uppercase text-[--color-coco-gold] mb-2">Why COCO</p>
          <h2 class="text-3xl font-bold">The Purest Hydration on Earth</h2>
        </div>
        <div class="grid gap-8 md:grid-cols-3">
          <div class="coco-feature-card bg-white/5 rounded-2xl p-8 space-y-4">
            <div class="w-12 h-12 bg-[--color-coco-teal]/20 rounded-xl flex items-center justify-center text-2xl">💧</div>
            <h3 class="text-xl font-semibold">5× Hydration</h3>
            <p class="text-white/70">More electrolytes than most sports drinks, naturally occurring — not added by a lab.</p>
          </div>
          <div class="coco-feature-card bg-white/5 rounded-2xl p-8 space-y-4">
            <div class="w-12 h-12 bg-[--color-coco-teal]/20 rounded-xl flex items-center justify-center text-2xl">🥥</div>
            <h3 class="text-xl font-semibold">Zero Additives</h3>
            <p class="text-white/70">No added sugar, no preservatives, no artificial flavours. Just pure coconut goodness.</p>
          </div>
          <div class="coco-feature-card bg-white/5 rounded-2xl p-8 space-y-4">
            <div class="w-12 h-12 bg-[--color-coco-teal]/20 rounded-xl flex items-center justify-center text-2xl">🌱</div>
            <h3 class="text-xl font-semibold">Sustainably Farmed</h3>
            <p class="text-white/70">Ethically sourced from family-run farms. Every purchase plants a coconut tree.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Loyalty teaser -->
    <section class="container my-20">
      <div class="bg-gradient-to-br from-[--color-coco-cream] to-white rounded-3xl p-10 md:p-16 grid gap-8 md:grid-cols-2 items-center border border-[--color-coco-gold]/20">
        <div class="space-y-4">
          <p class="text-sm font-semibold tracking-widest uppercase text-[--color-coco-teal]">Coco Rewards</p>
          <h2 class="text-3xl font-bold text-[--color-coco-dark]">Earn Points With Every Sip</h2>
          <p class="text-gray-600">Join the COCO Rewards program and earn points on every order. Climb from Coconut to Diamond tier and unlock exclusive perks, early access, and free products.</p>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-center gap-2"><span class="text-[--color-coco-teal] font-bold">✓</span> 1 point per €1 spent</li>
            <li class="flex items-center gap-2"><span class="text-[--color-coco-teal] font-bold">✓</span> Bonus points for reviews & referrals</li>
            <li class="flex items-center gap-2"><span class="text-[--color-coco-teal] font-bold">✓</span> Redeem points for discounts</li>
          </ul>
          <NuxtLink
            to="/my-account"
            class="inline-block bg-[--color-coco-teal] hover:bg-[--color-primary-dark] text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Join Rewards
          </NuxtLink>
        </div>
        <div class="hidden md:flex justify-center text-8xl select-none">🏆</div>
      </div>
    </section>

    <!-- CTA banner -->
    <section class="bg-[--color-coco-teal] py-16 text-white text-center">
      <div class="container space-y-4">
        <h2 class="text-3xl font-bold">Ready to Stay Hydrated?</h2>
        <p class="text-white/80 max-w-lg mx-auto">Free shipping on your first order. Use code <strong>COCO10</strong> for 10% off.</p>
        <NuxtLink
          to="/products"
          class="inline-block bg-white text-[--color-coco-dark] font-semibold px-10 py-3 rounded-full hover:bg-[--color-coco-cream] transition-colors mt-2"
        >
          Shop the Range
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
