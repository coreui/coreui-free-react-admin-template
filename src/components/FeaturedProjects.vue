<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h2 class="text-xl sm:text-2xl font-bold">Featured Projects in Bangalore</h2>
        <a href="#" class="text-brand text-sm font-semibold">View All</a>
      </div>

      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <img class="h-80 w-full object-cover" src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop" alt="Featured project" />
            <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
              <div class="font-semibold">Mahindra Zen</div>
              <div class="text-xs opacity-90">at Begur by Mahindra Lifespaces</div>
              <div class="mt-2 text-sm">INR 2.25 Cr onwards</div>
              <div class="mt-3 flex gap-3">
                <button class="px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-semibold">Contact Now</button>
                <button class="px-4 py-2 rounded-md border border-white/70 text-sm">Share Details</button>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex gap-3 items-center p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
            <img class="h-16 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop" alt="Brigade Eternia" />
            <div class="text-sm">
              <div class="font-semibold">Brigade Eternia</div>
              <div class="text-gray-500">Whitefield</div>
            </div>
          </div>
          <div class="flex gap-3 items-center p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
            <img class="h-16 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=800&auto=format&fit=crop" alt="Brigade Valencia" />
            <div class="text-sm">
              <div class="font-semibold">Brigade Valencia</div>
              <div class="text-gray-500">Electronic City</div>
            </div>
          </div>
          <div class="flex gap-3 items-center p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
            <img class="h-16 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=800&auto=format&fit=crop" alt="Mahindra Zen" />
            <div class="text-sm">
              <div class="font-semibold">Mahindra Zen</div>
              <div class="text-gray-500">Begur</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>