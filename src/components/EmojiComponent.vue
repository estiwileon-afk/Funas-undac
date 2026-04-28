<script setup>

import { useSupabaseStore } from "@/stores/supabaseStore";
import { storeToRefs } from "pinia";


const supabaseStore = useSupabaseStore()
const avatar = storeToRefs(supabaseStore).avatar;
const setAvatar = async (emoji) => {
  avatar.value = emoji
  await supabaseStore.cambiarIcono(emoji)
 
 
}

const props = defineProps({
    emoji: String
})

</script>
<template>
  <span
    @click="setAvatar(props.emoji)"
    :class="{ 'active-avatar': avatar === props.emoji }"
    class="p-7 bg-white/10 border-3 rounded-3xl text-4xl flex justify-center items-center opacity-50 hover:border-white/80 hover:bg-black/30 hover:scale-110 transition-all duration-200 cursor-pointer max-md:p-3 max-md:text-3xl max-md:hover:scale-100 max-md:hover:bg-white/10"
    >{{ props.emoji }}</span
  >
</template>
<style scoped>
.active-avatar {
  opacity: 1;
  scale: 1.1;
  background-color: rgba(255, 255, 255, 0.1);
  filter: drop-shadow(0 0 0.8px white);
}
</style>
