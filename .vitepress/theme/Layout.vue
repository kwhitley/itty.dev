<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeSponsorsBar from '../components/HomeSponsorsBar.vue'
import FooterSponsorsBar from '../components/FooterSponsorsBar.vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { page } = useData()
</script>

<template>
  <Layout>
    <template #nav-bar-content-after v-if="page.relativePath === 'index.md'">
      <HomeSponsorsBar />
    </template>
    <template #nav-screen-content-after v-else>
      <FooterSponsorsBar />
    </template>
  </Layout>
</template>