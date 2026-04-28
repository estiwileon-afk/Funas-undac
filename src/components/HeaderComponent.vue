<script setup> 
import { useSupabaseStore } from '@/stores/supabaseStore';
import { storeToRefs } from 'pinia';

const supabaseStore = useSupabaseStore() 
const avatar = storeToRefs(supabaseStore).avatar 
const apodo = storeToRefs(supabaseStore).nickName 
</script>
<template> 
  <header 
    class="header flex h-20 w-full justify-between items-center px-6 text-white sticky top-0 z-100 max-md:h-15 max-md:px-3" 
  > 
    <router-link to="/" class="flex items-center gap-2 max-md:gap-1"> 
      <img class="h-15 w-15 max-md:h-10 max-md:w-10" src="/logo.png" alt="Logo" />
      <p class="text-3xl font-bold max-md:text-xl">Funas UNDAC</p>
    </router-link>
    <router-link to="/MiPerfil" class="flex items-center gap-2 backdrop-blur-2xl rounded-full border border-white/30 bg-white/5 px-4 pr-5 py-2 max-md:px-2 max-md:py-1 max-md:pr-3">
      <div class="bg-white/40 rounded-full w-10 h-10 flex items-center justify-center max-md:w-7 max-md:h-7 ">
        <span class="text-[1.4rem] max-md:text-[1rem]">{{ avatar }}</span>
      </div>
      <span class="text-xl font-semibold max-md:text-sm">{{apodo}}</span>
    </router-link>
  </header>
</template>
<style scoped>
.header {
  background-color: transparent;
  animation: aparecer both;
  animation-timeline: scroll();
  animation-range: 0 1000px;
}
@keyframes aparecer {
 
  100% {
    background-color: rgba(255, 255, 255, 0.082);
    backdrop-filter: blur(100px);
  }
}
</style>
