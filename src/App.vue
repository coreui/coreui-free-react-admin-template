<script setup>
import Navbar from "./components/Navbar.vue";
import HeroSection from "./components/HeroSection.vue";
import FeaturedProjects from "./components/FeaturedProjects.vue";
import NewProjects from "./components/NewProjects.vue";
import ArticlesSection from "./components/ArticlesSection.vue";
import ExclusiveSection from "./components/ExclusiveSection.vue";
import ConsultationSection from "./components/ConsultationSection.vue";
import FooterSection from "./components/FooterSection.vue";
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Navbar />
    <main>
      <HeroSection />
      <FeaturedProjects />
      <NewProjects />
      <ArticlesSection />
      <ExclusiveSection />
      <ConsultationSection />
    </main>
    <FooterSection />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
