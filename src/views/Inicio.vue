<script setup>  
import Card from "@/components/Card.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import Loader from "@/components/Loader.vue";
import { useSupabaseStore } from "@/stores/supabaseStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { supabase } from "../../utils/supabase";

const mostrar = ref(false)
const storeSupabase = useSupabaseStore()
const publicaciones = ref([]);
const hiddeLoader = storeToRefs(storeSupabase).hiddeLoader
const categoriaActiva = ref('Todos')
const setColorCategory = (categoria) => {
  categoriaActiva.value = categoria
  
};

const publisMostar = computed(() => {
  if (categoriaActiva.value === 'Todos') {
    return publicaciones.value
  }

  return publicaciones.value.filter((publicacion) => {
    return publicacion.categoria === categoriaActiva.value
  })
})
const cargarPublicaciones = async () => {
  
  
    const { data } = await supabase
      .from("publicaciones")
      .select(`
        id,
        nombre,
        mensaje,
        estilo,
        categoria,
        creado_hace,
        avatares(avatar),
        likes(count)
      `);

    publicaciones.value = data ?? [];
  
};

onMounted(async () => {
  await cargarPublicaciones();

  if (window.innerWidth > 768) {
    mostrar.value = true;
  }
});
</script>
<template>
  <Teleport to="body">
    <Loader v-show="hiddeLoader"></Loader>
  </Teleport>
  <section class="max-w-dvw flex flex-col items-center pb-28">
    <HeaderComponent></HeaderComponent>
    <section
      class="w-[75%] flex flex-col mt-3 gap-7 max-md:w-[82%] max-md:mt-8"
    >
      <header class="w-full flex flex-col">
        <h1
          class="text-white text-4xl font-bold flex gap-2.5 items-center w-full max-md:text-3xl max-md:justify-center"
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
            class="lucide lucide-sparkles-icon lucide-sparkles"
          >
            <path
              d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
            />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" /></svg
          >Últimos Secretos
        </h1>
        
        <div class="flex flex-col relative  ">
          <div @click="mostrar = !mostrar" class="text-white/70 cursor-pointer flex gap-2 mt-8 items-center active:text-white ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-filter-icon lucide-list-filter"><path d="M2 5h20"/><path d="M6 12h12"/><path d="M9 19h6"/></svg>
          <p class="text-xl font-semibold ">Filtros</p>
        </div>
        <div v-show="mostrar" class="flex gap-4 mt-6 max-md:grid max-md:grid-cols-1 max-md:absolute max-md:w-full max-md:left-0 max-md:px-10 max-md:top-15 max-md:bg-white/5 max-md:rounded-3xl max-md:py-8 max-md:z-100 max-md:backdrop-blur-2xl max-md:border-2 max-md:border-white/30" >
          <div
                          @click="setColorCategory('Todos')"   
                          class="bg-white/10 rounded-2xl flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100 max-md:w-full max-md:hover:translate-0 max-md:hover:opacity-70"  :class="{'active-category' : categoriaActiva ==='Todos'}"
                        >
                          <p class="font-semibold flex items-center gap-1">
                            <span class="text-2xl">🤐​​​</span> Todos
                          </p>
                        </div>
          <div
                @click="setColorCategory('Relaciones y Ligues')"
                class="bg-white/10 rounded-2xl flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100 max-md:w-full max-md:h-max max-md:hover:translate-0 max-md:hover:opacity-70" :class="{'active-category' : categoriaActiva ==='Relaciones y Ligues'}"
              >
                <p class="font-semibold flex items-center gap-1">
                  <span class="text-2xl">👩‍❤️‍👨​</span> Relaciones y Ligues
                </p>
              </div>
              <div
                @click="setColorCategory('Confesiones')"
                class="bg-white/10 rounded-2xl flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100 max-md:h-max max-md:hover:translate-0 max-md:hover:opacity-70" :class="{'active-category' : categoriaActiva ==='Confesiones'}"
              >
                <p class="font-semibold flex items-center gap-1">
                  <span class="text-2xl">🙊​​</span>Confesiones
                </p>
              </div>
              <div
                @click="setColorCategory('Chisme Universitario')"
                class="bg-white/10 rounded-2xl flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100 max-md:hover:translate-0 max-md:hover:opacity-70" :class="{'active-category' : categoriaActiva ==='Chisme Universitario'}"
              >
                <p class="font-semibold flex items-center gap-1">
                  <span class="text-2xl">🧑‍🎓​​​</span>Chisme Universitario
                </p>
              </div>
              <div
                @click="setColorCategory('Random')"
                class="bg-white/10 rounded-2xl flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100 max-md:hover:translate-0 max-md:hover:opacity-70" :class="{'active-category' : categoriaActiva ==='Random'}"
              >
                <p class="font-semibold flex items-center gap-1">
                  <span class="text-2xl">😅​​​​</span>Random
                </p>
              </div>
        </div>
        </div>
        
      </header>
      <main
        v-for="publi in publisMostar"
        :key="publi.id"
        class="flex flex-col gap-7"
      >
        <Card
        @mensaje-enviado ="cargarPublicaciones"
          :nombre="publi.nombre"
          :avatar="publi.avatares?.avatar"
          :mensaje="publi.mensaje"
          :estilo="publi.estilo"
          :tiempo="storeSupabase.tiempoRelativo(publi.creado_hace)"
          :categoria="publi.categoria"
          :id="publi.id"
          :likes="publi.likes[0].count"
        ></Card>
      </main>
    </section>
    <FooterComponent></FooterComponent>
  </section>
</template>
<style scoped>

  .active-category {
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.685);
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  translate: 0px 0px;
  box-shadow: 0 3px 8px 2px #ffffff4f;
}
</style>
