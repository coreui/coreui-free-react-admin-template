<template>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-9 h-9 rounded-md bg-brand text-white font-bold">PV</span>
          <span class="text-xl font-extrabold tracking-tight">PropVest</span>
        </div>
        <span class="ml-3 hidden sm:inline-flex items-center gap-1 text-sm bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-brand"><path d="M12 2.25c-4.97 0-9 3.857-9 8.609 0 5.676 7.338 10.602 8.221 11.162.48.309 1.078.309 1.558 0 .883-.56 8.221-5.486 8.221-11.162 0-4.752-4.03-8.609-9-8.609Zm0 11.359a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z"/></svg>
          Bengaluru
        </span>
      </div>

      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <a href="#" class="hover:text-brand">Home</a>
        <a href="#" class="hover:text-brand">About</a>
        <a href="#" class="hover:text-brand">Services</a>
        <a href="#" class="hover:text-brand">Projects</a>
        <a href="#" class="hover:text-brand">Commercial</a>
        <a href="#" class="hover:text-brand">Contact</a>
      </nav>

      <div class="flex items-center gap-3">
        <button class="hidden sm:inline-flex items-center gap-2 text-sm text-gray-700 hover:text-brand">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h9.75A2.25 2.25 0 0 0 19.5 18.75V9h-3.75ZM9 3v6h6" />
          </svg>
          Login
        </button>
        <a href="#" class="inline-flex items-center gap-2 bg-brand text-white text-sm font-semibold px-3 py-2 rounded-md shadow-sm hover:bg-brand-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M2.003 5.884C2 5.95 2 6.026 2 6.18v11.64c0 .154 0 .231.003.297a1.5 1.5 0 0 0 1.034 1.034c.066.003.143.003.297.003h17.332c.154 0 .231 0 .297-.003a1.5 1.5 0 0 0 1.034-1.034C22 18.051 22 17.974 22 17.82V6.18c0-.154 0-.231-.003-.297a1.5 1.5 0 0 0-1.034-1.034C20.897 5.847 20.82 5.847 20.666 5.847H3.334c-.154 0-.231 0-.297.003a1.5 1.5 0 0 0-1.034 1.034ZM4.5 8.25h15M4.5 12h15M4.5 15.75h10.5"/></svg>
          097300 01119
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.bg-brand { background-color: var(--color-brand); }
.text-brand { color: var(--color-brand); }
.hover\:bg-brand-600:hover { background-color: var(--color-brand-600); }
.border-brand { border-color: var(--color-brand); }
</style>