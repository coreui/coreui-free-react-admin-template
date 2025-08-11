<template>
  <section class="py-10 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h2 class="text-xl sm:text-2xl font-bold">New Projects in Bangalore</h2>
        <a href="#" class="text-brand text-sm font-semibold">View All</a>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProjectCard title="Brigade Avalon" area="Whitefield, Bangalore" price="INR 4.62 Cr onwards" img="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop" />
        <ProjectCard title="Bren Aspera" area="Old Madras Road, Bangalore" price="INR 1.33 Cr onwards" img="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop" />
        <ProjectCard title="Brigade Lakecrest" area="Old Madras Road" price="INR 98.54 Lacs onwards" img="https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?q=80&w=1200&auto=format&fit=crop" />
        <ProjectCard title="Casagrand Keatsway" area="Thanisandra" price="INR 91.77 Lacs onwards" img="https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?q=80&w=1200&auto=format&fit=crop" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProjectCard from "./shared/ProjectCard.vue";
</script>