<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-xl sm:text-2xl font-bold">Read about Pune Real Estate</h2>
        <p class="text-gray-600">Explore collections of region</p>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ArticleCard title="Top builders in Mumbai in 2025" img="https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=1200&auto=format&fit=crop" />
        <ArticleCard title="How to earn from your commercial property" img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" />
        <ArticleCard title="Benefits of Living in Shapoorji Pallonji Hadapsar" img="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop" />
        <ArticleCard title="Things to know about Majestique Towers Kharadi" img="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop" />
      </div>

      <div class="mt-6 text-center">
        <button class="px-4 py-2 bg-brand text-white rounded-md font-semibold hover:bg-brand-600">Show More</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import ArticleCard from "./shared/ArticleCard.vue";
</script>