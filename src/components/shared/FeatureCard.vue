<template>
  <div class="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
    <div class="text-3xl">{{ icon }}</div>
    <div class="mt-2 text-sm font-semibold">{{ title }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true }
});
</script>