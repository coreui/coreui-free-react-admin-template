<template>
  <article class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <img :src="img" :alt="title" class="h-40 w-full object-cover" />
    <div class="p-4">
      <div class="text-sm text-green-600 font-semibold">RERA Verified</div>
      <h3 class="mt-1 font-semibold">{{ title }}</h3>
      <p class="text-sm text-gray-500">{{ area }}</p>
      <div class="mt-2 text-sm font-semibold">{{ price }}</div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  img: { type: String, required: true },
  title: { type: String, required: true },
  area: { type: String, required: true },
  price: { type: String, required: true }
});
</script>