<script setup>
import { useColorsStore } from '@/stores/colors';

import { storeToRefs } from 'pinia';

const store = useColorsStore()
const tema = storeToRefs(store).colorPage

</script>
<template> 
  <nav
    class="text-white flex justify-evenly w-70 h-fit py-3 fixed bottom-5 left-0 right-0 m-auto  backdrop-blur-2xl rounded-full  border-y border-white/20 max-md:w-50 max-md:py-2" :class="tema === 'medianoche' ? 'bg-white/8':'bg-black/15'"
  > 
    <router-link
      to="/Inicio"
      class="transition-all duration-200 ease-in-out p-2.5 rounded-full hover:bg-black/20 scale-90 link"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-house-icon lucide-house max-md:w-6 max-md:h-6"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path
          d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        />
      </svg>
    </router-link>
    <router-link
      to="/Compartir"
      class="transition-all duration-200 ease-in-out p-2.5 rounded-full hover:bg-black/20 scale-90 link"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus max-md:w-6 max-md:h-6"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    </router-link>
    
    <router-link
      to="/MiPerfil"
      class="transition-all duration-200 ease-in-out p-2.5 rounded-full hover:bg-black/20 scale-90 link"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-user-icon lucide-user max-md:w-6 max-md:h-6"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </router-link>
  </nav>
</template>
<style scoped>

.router-link-active {
  color: white;
  background: linear-gradient(to left, rgb(243, 26, 171), rgb(141, 34, 190));
  box-shadow: 1px 1px 8px 2px rgba(0, 0, 0, 0.267);
  scale: 1;
}
</style>
