<template>
  <main class="bg-[#0a0a0a] min-h-screen text-white overflow-hidden">
    <!-- Cinematic Contact Wrapper -->
    <div class="contact-wrapper relative min-h-screen pt-32 pb-24 md:pt-48 md:pb-32 flex items-center z-10">
        
        <!-- Geometric Decor Background -->
        <div class="absolute inset-0 z-0 opacity-20 pointer-events-none contact-bg-anim">
            <div class="mi-invert-fix">
                <div class="mil-animation-frame">
                    <div class="mil-animation mil-position-1 mil-scale" data-value-1="7" data-value-2="1.6"></div>
                    <div class="mil-animation mil-position-2 mil-scale" data-value-1="4" data-value-2="1"></div>
                    <div class="mil-animation mil-position-3 mil-scale" data-value-1="1.2" data-value-2=".1"></div>
                </div>
            </div>
            <!-- Gradient Overlay for Context readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"></div>
        </div>

        <div class="container relative z-20 px-6 md:px-12 mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                
                <!-- Left Column: Fast Contact Information -->
                <div class="contact-info flex flex-col justify-center h-full pt-10">
                    <ul class="flex gap-4 text-sm text-gray-400 mb-12 fade-up-item">
                        <li><NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('nav.home') }}</NuxtLink></li>
                        <li>/</li>
                        <li class="text-white">{{ $t('nav.contact') }}</li>
                    </ul>
                    
                    <h1 class="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                        <span class="block split-line text-white">{{ $t('contact.info_title') }}</span>
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-gray-400 font-light max-w-lg mb-16 fade-up-item">
                        {{ $t('contact.info_desc') }}
                    </p>

                    <div class="space-y-10 fade-up-item">
                        <div>
                            <span class="block text-sm tracking-widest text-[#FFA500] uppercase mb-2">{{ $t('contact.email_label') }}</span>
                            <a :href="`mailto:${$t('contact.email')}`" class="text-3xl md:text-4xl font-light hover:text-[#FFA500] transition-colors">{{ $t('contact.email') }}</a>
                        </div>
                        <div>
                            <span class="block text-sm tracking-widest text-[#FFA500] uppercase mb-2">{{ $t('contact.phone_label') }}</span>
                            <a :href="`tel:${$t('contact.phone')}`" class="text-3xl md:text-4xl font-light hover:text-[#FFA500] transition-colors">{{ $t('contact.phone') }}</a>
                        </div>
                        <div>
                            <span class="block text-sm tracking-widest text-[#FFA500] uppercase mb-2">{{ $t('contact.address_label') }}</span>
                            <address class="text-xl md:text-2xl font-light not-italic text-gray-300">
                                {{ $t('contact.address_val1') }}<br/>
                                {{ $t('contact.address_val2') }}
                            </address>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Interactive GSAP Form -->
                <div class="contact-form-container relative bg-[#111]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl">
                    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
                        
                        <!-- Name & Phone Row -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="form-group flex flex-col gap-2">
                                <label for="name" class="text-sm font-medium text-gray-400">{{ $t('contact.form.name') }}</label>
                                <input type="text" id="name" v-model="form.name" required
                                    class="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FFA500] focus:ring-1 focus:ring-[#FFA500] transition-all"
                                    placeholder="John Doe" />
                            </div>
                            <div class="form-group flex flex-col gap-2">
                                <label for="phone" class="text-sm font-medium text-gray-400">{{ $t('contact.form.phone') }}</label>
                                <input type="tel" id="phone" v-model="form.phone"
                                    class="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FFA500] focus:ring-1 focus:ring-[#FFA500] transition-all"
                                    placeholder="+1 234 567 890" />
                            </div>
                        </div>

                        <!-- Email & Budget Row -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="form-group flex flex-col gap-2">
                                <label for="email" class="text-sm font-medium text-gray-400">{{ $t('contact.form.email') }}</label>
                                <input type="email" id="email" v-model="form.email" required
                                    class="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FFA500] focus:ring-1 focus:ring-[#FFA500] transition-all"
                                    placeholder="john@example.com" />
                            </div>
                            <div class="form-group flex flex-col gap-2">
                                <label for="budget" class="text-sm font-medium text-gray-400">{{ $t('contact.form.budget') }}</label>
                                <select id="budget" v-model="form.budget"
                                    class="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#FFA500] focus:ring-1 focus:ring-[#FFA500] transition-all appearance-none cursor-pointer">
                                    <option value="" disabled selected>Select range</option>
                                    <option value="under5k">< $5,000</option>
                                    <option value="5k_10k">$5,000 - $10,000</option>
                                    <option value="10k_25k">$10,000 - $25,000</option>
                                    <option value="over25k">$25,000+</option>
                                </select>
                            </div>
                        </div>

                        <!-- Message Box -->
                        <div class="form-group flex flex-col gap-2">
                            <label for="message" class="text-sm font-medium text-gray-400">{{ $t('contact.form.message') }}</label>
                            <textarea id="message" rows="5" v-model="form.message" required
                                class="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FFA500] focus:ring-1 focus:ring-[#FFA500] transition-all resize-none"
                                placeholder="Project details..."></textarea>
                        </div>

                        <!-- Status Messages -->
                        <div v-if="submitStatus === 'success'" class="form-group rounded-xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-400 text-sm">
                            {{ $t('contact.form.success') || 'Thank you! Your message has been sent successfully.' }}
                        </div>
                        <div v-if="submitStatus === 'error'" class="form-group rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
                            {{ submitError || $t('contact.form.error') || 'Something went wrong. Please try again.' }}
                        </div>

                        <!-- Submit Button -->
                        <div class="form-group mt-4">
                            <button type="submit" :disabled="isSubmitting"
                                class="group relative w-full overflow-hidden rounded-xl bg-white px-8 py-5 text-lg font-medium text-black transition-transform hover:scale-[1.02] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                <span class="relative z-10 flex items-center justify-center gap-3">
                                    <template v-if="isSubmitting">Sending...</template>
                                    <template v-else>
                                        {{ $t('contact.form.submit') }}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </template>
                                </span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useHead, useLocalePath } from '#imports';

const localePath = useLocalePath();

useHead({
  title: 'Contact Us | Apex Digital',
  meta: [
    { name: 'description', content: 'Get in touch with Apex Digital to discuss your next big project.' }
  ]
});

const CF7_ENDPOINT = 'https://api.apexdigital.dev/wp-json/contact-form-7/v1/contact-forms/13da736/feedback';

const form = ref({
    name: '',
    phone: '',
    email: '',
    budget: '',
    message: '',
});

const isSubmitting = ref(false);
const submitStatus = ref(''); // '', 'success', 'error'
const submitError = ref('');

const handleSubmit = async () => {
    isSubmitting.value = true;
    submitStatus.value = '';
    submitError.value = '';

    const formData = new FormData();
    formData.append('your-name', form.value.name);
    formData.append('your-email', form.value.email);
    formData.append('your-phone', form.value.phone);
    formData.append('your-budget', form.value.budget);
    formData.append('your-message', form.value.message);

    try {
        const response = await $fetch(CF7_ENDPOINT, {
            method: 'POST',
            body: formData,
        });

        if (response.status === 'mail_sent') {
            submitStatus.value = 'success';
            form.value = { name: '', phone: '', email: '', budget: '', message: '' };
        } else {
            submitStatus.value = 'error';
            submitError.value = response.message || 'Failed to send message.';
        }
    } catch (err) {
        submitStatus.value = 'error';
        submitError.value = err?.data?.message || 'Network error. Please try again.';
    } finally {
        isSubmitting.value = false;
    }
};

// Helper for splitting text into words and spans for SplitText simulation
function splitTextToChars(element) {
    if (!element) return;
    const text = element.innerText;
    element.innerHTML = '';
    
    const words = text.split(' ');
    
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';
        
        const chars = word.split('');
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char-animate block opacity-0 translate-y-[50px]';
            charSpan.style.display = 'inline-block'; 
            charSpan.style.transformOrigin = '0% 50%';
            charSpan.innerText = char;
            wordSpan.appendChild(charSpan);
        });
        
        element.appendChild(wordSpan);
        if (wordIndex < words.length - 1) {
            const space = document.createElement('span');
            space.style.display = 'inline-block';
            space.innerHTML = '&nbsp;';
            element.appendChild(space);
        }
    });
}

// Variables for GSAP cleanup
let pollingInterval;
let ctx;

onMounted(() => {
    const checkGSAP = () => {
        if (window.gsap && window.ScrollTrigger) {
            clearInterval(pollingInterval);
            initGSAP();
        }
    };
    pollingInterval = setInterval(checkGSAP, 50);

    if (window.refreshScrollAnimations) {
        window.refreshScrollAnimations();
    }
});

onUnmounted(() => {
    if (pollingInterval) clearInterval(pollingInterval);
    if (ctx) ctx.revert(); 
});

function initGSAP() {
    window.ScrollTrigger.refresh();

    nextTick(() => {
        ctx = window.gsap.context(() => {
            
            // 1. Process Typography Reveal
            document.querySelectorAll('.split-line').forEach(el => splitTextToChars(el));
            
            const tl = window.gsap.timeline({ delay: 0.2 });
            
            // Animate headers chars
            tl.to('.char-animate', {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.03,
                ease: 'expo.out'
            })
            // Animate other left column text chunks
            .fromTo('.fade-up-item', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
                "-=0.7"
            );

            // 2. Animate Right Form Items Stagger
            // Make form slide up layer by layer
            tl.fromTo('.contact-form-container', 
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
                "-=1"
            )
            .fromTo('.form-group',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
                "-=0.8"
            );

            // 3. Subtle background shape shifting on scroll
            window.gsap.to('.contact-bg-anim', {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: ".contact-wrapper",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

        }); // end context
    });
}
</script>

<style scoped>
/* Remove default arrow from select to style it cleanly */
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 50%;
}
</style>
