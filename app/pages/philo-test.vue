<template>
  <main ref="rootRef" class="philo-test">
    <!-- scaffolding: lets you scroll into the section from above -->
    <section class="pt-spacer">
      <span>scroll down</span>
    </section>

    <!-- PHILOSOPHY -->
    <section class="philo" id="philo">
      <div class="philo-head">
        <span>Our approach</span>
        <span>What guides the work</span>
      </div>
      <p class="philo-txt" id="philoTxt"><template
        v-for="(w, i) in words"
        :key="i"
      ><em
        v-if="w.accent"
        class="pw accent"
        data-pw
      >{{ w.text }}</em><span
        v-else
        class="pw"
      >{{ w.text }}</span>{{ ' ' }}</template></p>
    </section>

    <!-- scaffolding: lets you scroll past the section and back up -->
    <section class="pt-spacer">
      <span>scroll back up</span>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

definePageMeta({
  pageTransition: { name: 'page', mode: 'out-in' },
});

useHead({
  title: 'Philosophy section — scroll reveal test',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,500;0,600;0,700;1,700&display=swap' },
  ],
});

const rootRef = ref(null);

// The accent phrase animates as one unit, exactly like the reference markup:
// a single <em class="accent pw"> among plain per-word spans.
const PARTS = [
  { text: 'Beautiful work means very little if it does not make the brand easier to understand.' },
  { text: 'DESIGN IS NOT DECORATION.', accent: true },
  { text: 'We build identities, content and digital experiences around one clear idea, then shape every touchpoint so the brand feels consistent, considered and unmistakable.' },
];

const words = computed(() =>
  PARTS.flatMap((part) =>
    part.accent
      ? [{ text: part.text, accent: true }]
      : part.text.split(' ').map((text) => ({ text, accent: false })),
  ),
);

// Reference values, read off the original: each word tweens from its resting
// colour to the "lit" colour, and the scroll scrub drags a ~8.3-word-wide ramp
// through the paragraph. duration / stagger IS that ramp width — changing
// either one alone widens or narrows the travelling band.
const WORD_LIT = 'rgb(231, 231, 231)';
const ACCENT_LIT = 'rgb(0, 205, 88)';
const STAGGER = 0.12;
const DURATION = 1;

let ctx = null;

onMounted(() => {
  if (typeof window === 'undefined') return;

  setTimeout(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.to('.pw', {
          color: (i, el) => (el.classList.contains('accent') ? ACCENT_LIT : WORD_LIT),
          ease: 'none',
          duration: DURATION,
          stagger: STAGGER,
          scrollTrigger: {
            trigger: '#philo',
            start: 'top 75%',
            end: 'bottom top',
            scrub: 1,
          },
        });
        return () => tween.scrollTrigger?.kill();
      });

      ScrollTrigger.refresh();
    }, rootRef.value);
  }, 100);
});

onUnmounted(() => {
  ctx?.revert();
  ctx = null;
});
</script>

<style scoped>
.philo-test {
  font-family: 'Rubik', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
}

.pt-spacer {
  min-height: 100svh;
  background: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pt-spacer span {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}

.philo {
  background: #f8f7f1;
  padding: 7.75rem clamp(1.5rem, 5.7vw, 5rem) 6.5rem;
}

.philo-head {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.6rem;
}

.philo-head span {
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.66);
}

.philo-txt {
  margin: 0;
  max-width: 13em;
  font-size: clamp(1.72rem, 6.83vw, 3.6rem);
  font-weight: 700;
  line-height: 1.165;
}

/* Resting colours. The tween drives `color` from here to the lit values, so
   both endpoints read as pale on the cream ground — the dark band you see is
   the midpoint of the ramp travelling through the text. */
.pw {
  color: rgba(20, 20, 20, 0.16);
}

.pw.accent {
  color: rgba(0, 205, 88, 0.18);
  font-style: italic;
}

@media (min-width: 900px) {
  .philo-head {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
  }

  .philo {
    padding-top: 11rem;
    padding-bottom: 10rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pw {
    color: rgba(20, 20, 20, 0.85);
  }

  .pw.accent {
    color: rgb(0, 205, 88);
  }
}
</style>
