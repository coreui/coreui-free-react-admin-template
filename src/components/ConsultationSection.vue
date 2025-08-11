<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h3 class="text-2xl font-bold">FREE Expert Consultation</h3>
        <p class="mt-2 text-gray-600">Speak to our experts and get personalized guidance today</p>
        <img class="mt-6 rounded-xl border border-gray-200" src="https://images.unsplash.com/illustrations/consulting.svg?auto=format" onerror="this.src='https://picsum.photos/seed/consult/800/500'" alt="Illustration" />
      </div>
      <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="font-semibold">Get Answers to All Your Questions</div>
        <form class="mt-4 grid grid-cols-1 gap-4">
          <input class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Full Name" />
          <input class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Mobile Number" />
          <input class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Email Address" />
          <div class="flex gap-3 text-sm">
            <label class="inline-flex items-center gap-2"><input type="radio" name="role" checked> I am Buyer</label>
            <label class="inline-flex items-center gap-2"><input type="radio" name="role"> Broker</label>
            <label class="inline-flex items-center gap-2"><input type="radio" name="role"> Builder</label>
          </div>
          <button type="button" class="mt-2 inline-flex justify-center rounded-lg bg-brand px-4 py-2 text-white font-semibold hover:bg-brand-600">Request Consultation</button>
          <div class="text-xs text-gray-500">Call Us +91 8080 190190</div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>