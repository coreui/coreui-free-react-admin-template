<template>
  <article class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <img :src="img" :alt="title" class="h-40 w-full object-cover" />
    <div class="p-4">
      <h3 class="font-semibold">{{ title }}</h3>
      <div class="mt-2 text-xs text-gray-500">2 Months Ago</div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  img: { type: String, required: true },
  title: { type: String, required: true }
});
</script>