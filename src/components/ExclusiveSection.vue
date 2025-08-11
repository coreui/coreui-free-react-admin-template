<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-center text-xl sm:text-2xl font-bold">PropVest <span class="text-brand">Exclusive</span></h2>
      <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <FeatureCard title="Join as a Syndicate Broker" icon="🏢" />
        <FeatureCard title="Partner With Us" icon="🤝" />
        <FeatureCard title="Get Instant Home Loan" icon="🏦" />
        <FeatureCard title="Home Inspection" icon="🛠️" />
        <FeatureCard title="List Your Property" icon="🏙️" />
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from "./shared/FeatureCard.vue";
</script>