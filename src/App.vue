<script setup>
import { storeToRefs } from "pinia";
import { useColorsStore } from "./stores/colors";
import { useSupabaseStore } from "./stores/supabaseStore";
import { onMounted } from "vue";
import Loader from "./components/Loader.vue";

const store = useColorsStore();
const tema = storeToRefs(store).colorPage;

const supabaseStore = useSupabaseStore();
const hiddeLoader = storeToRefs(supabaseStore).hiddeLoader;

onMounted(async () => {
  hiddeLoader.value = true;
  await supabaseStore.cargarSesion();
  await supabaseStore.cargarComentarios();
  hiddeLoader.value = false;
});
</script>
<template>
  <main class="max-w-screen min-h-dvh" :class="tema">
    <router-view />
    <Loader v-if="hiddeLoader" />
  </main>
</template>
<style scoped>
.medianoche {
  background: linear-gradient(to bottom right, #361a32, #38081a);
}
.pastel {
  background: linear-gradient(to bottom right, #861043, #e94d83);
}
</style>
