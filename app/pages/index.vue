<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('landing').path('/').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  ogImage: 'https://laravel-osdd.lomkit.com/social-card.png',
  twitterImage: 'https://laravel-osdd.lomkit.com/social-card.png'
})

useHead({
  script: [{
    key: 'osdd-motion',
    tagPosition: 'head',
    innerHTML: 'try{if(!matchMedia(\'(prefers-reduced-motion: reduce)\').matches)document.documentElement.classList.add(\'osdd-motion\')}catch(e){}'
  }]
})

onMounted(() => {
  if (prefersMotion()) {
    document.documentElement.classList.add('osdd-motion')
  }
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('osdd-motion')
})
</script>

<template>
  <div v-if="page">
    <LandingHero />
    <LandingTerminal />
    <LandingGraph />
    <LandingBento />
    <LandingAgents />
    <LandingCta />
  </div>
</template>
