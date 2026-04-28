<script setup> 
import FooterComponent from "@/components/FooterComponent.vue";   
import HeaderComponent from "@/components/HeaderComponent.vue"; 
import { useSupabaseStore } from "@/stores/supabaseStore";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const color = ref("fuchsia"); 
const colorButton = ref("buttonfuchsia");  
const supabaseStore = useSupabaseStore();
const router = useRouter();
const categoriaActiva = ref('Relaciones y Ligues')
const categoriaSupa = storeToRefs(supabaseStore).categoria

const savedColor = localStorage.getItem("selectedCardColor");    
if (savedColor) { 
  color.value = savedColor;
  colorButton.value = "button" + savedColor;
  supabaseStore.estilo = savedColor;
} else {
  localStorage.setItem("selectedCardColor", "fuchsia");
  supabaseStore.estilo = "fuchsia";
}

const estilo = storeToRefs(supabaseStore).estilo; 
const mensaje = storeToRefs(supabaseStore).mensaje;

const nombre = storeToRefs(supabaseStore).nickName;

const cantidadLetras = computed(()=>{ 
  
  return mensaje.value.trim().length
}) 

const setColor = (c) => { 
  color.value = c;
  colorButton.value = "button";
  colorButton.value += c;
  supabaseStore.estilo = c;
  localStorage.setItem("selectedCardColor", c);
};
const setColorCategory = (categoria) => {
  categoriaActiva.value = categoria
  categoriaSupa.value = categoria

};
async function publicarPost() {
 if(mensaje.value.trim() === '') return

  await supabaseStore.postear(nombre.value, mensaje.value,estilo.value, categoriaSupa.value )
 
  await supabaseStore.cargarComentarios()
 
  mensaje.value = "";
  router.push('/Inicio')
}
</script>
<template> 
  <section class="max-w-dvw flex flex-col items-center text-white pb-28">   
    <HeaderComponent></HeaderComponent>   
    <section 
      class="w-[75%] flex flex-col mt-3 gap-7 max-md:w-[82%] max-md:mt-8"
    >
      <div class="flex flex-col gap-2 max-md:gap-1">
        <h1
          class="text-5xl font-bold flex gap-3 items-center max-md:text-3xl max-md:gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="55"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-venetian-mask-icon lucide-venetian-mask max-md:w-8 max-md:h-8"
          >
            <path d="M18 11c-1.5 0-2.5.5-3 2" />
            <path
              d="M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z"
            />
            <path d="M6 11c1.5 0 2.5.5 3 2" /></svg
          >Confiesa un secreto
        </h1>
        <p class="text-white/60 text-2xl max-md:text-xl">
          Todo es 100% anónimo
        </p>
      </div>
      <!-- TARJETA -->
      <div
        class="flex flex-col items-center border-5 rounded-4xl p-10 w-full gap-8 shadow-xl shadow-slate-950/40 max-md:p-4"
        :class="color"
      >
      <div class="w-full relative" >
        <textarea
        
          class="text-xl resize-none p-7 w-full text-white border-3 border-slate-300/30 rounded-3xl bg-black/40 outline-0 max-md:text-lg max-md:p-5 overflow-hidden min-h-70 field-sizing-content pb-10"
          name=""
          id=""
          cols="30"
          rows="8"
          placeholder="¿Qué tienes en mente? Nadie sabrá que fuiste tú..."
          required=""
          v-model="mensaje">
          
    
      </textarea>
<p class="absolute bottom-6 right-6 z-20 text-lg font-semibold "><span :class="{'text-red-500': cantidadLetras > 999}">
{{cantidadLetras}}
</span>/1000</p>
        
      </div>
      <p v-show="cantidadLetras > 999" class="font-semibold text-2xl text-white text-center p-4 w-full border-2 border-white/40 bg-white/10 rounded-4xl">Tu confesión supera el límite de letras</p>
        
    
        <div class="flex justify-between w-full max-md:flex-col max-md:gap-6">
          <div
            class="flex flex-col gap-2 self-start w-full max-md:items-center"
          >
            <h2 class="flex gap-2 items-center text-2xl font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-palette-icon lucide-palette max-md:w-6.5 max-md:h-6.5"
              >
                <path
                  d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
                />
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              Color de Tarjeta
            </h2>
            <p class="text-white/50 text-xl max-md:text-center">
              Escoge una vibra para tu tarjeta secreta
            </p>
            <div
              class="flex gap-4 mt-3 max-md:grid max-md:grid-cols-3 max-md:w-full max-md:place-items-center"
            >
              <div
                @click="setColor('fuchsia')"
                :class="{ active: color === 'fuchsia' }"
                class="colorButtons rounded-full bg-linear-to-br from-fuchsia-500 to-fuchsia-600 w-15 h-15 opacity-50 scale-90 shadow-white/20 p-2 hover:scale-100 hover:opacity-100 cursor-pointer border-2 border-white/70"
              ></div>
              <div
                @click="setColor('red')"
                :class="{ active: color === 'red' }"
                class="colorButtons rounded-full bg-linear-to-br from-red-500 to-red-600 w-15 h-15 p-2 opacity-50 scale-90 hover:scale-100 hover:opacity-100 cursor-pointer border-2 border-white/70"
              ></div>
              <div
                @click="setColor('emerald')"
                :class="{ active: color === 'emerald' }"
                class="colorButtons rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 w-15 h-15 p-2 opacity-50 scale-90 hover:scale-100 hover:opacity-100 cursor-pointer border-2 border-white/70"
              ></div>
              <div
                @click="setColor('amber')"
                :class="{ active: color === 'amber' }"
                class="colorButtons rounded-full bg-linear-to-br from-amber-500 to-amber-600 w-15 h-15 p-2 opacity-50 scale-90 hover:scale-100 hover:opacity-100 cursor-pointer border-2 border-white/70"
              ></div>
              <div
                @click="setColor('blue')"
                :class="{ active: color === 'blue' }"
                class="colorButtons rounded-full bg-linear-to-br from-blue-500 to-blue-600 w-15 h-15 p-2 opacity-50 scale-90 hover:scale-100 hover:opacity-100 cursor-pointer border-2 border-white/70"
              ></div>
            </div>
          </div>
          <div
            class="flex flex-col gap-2 self-start max-md:items-center max-md:w-full w-full"
          >
            <h2 class="text-2xl font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-blocks-icon lucide-blocks max-md:w-6.5 max-md:h-6.5"
              >
                <path
                  d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"
                />
                <rect x="14" y="2" width="8" height="8" rx="1" />
              </svg>
              Categoría
            </h2>

            <div
              class="grid grid-cols-2 gap-4 mt-3 max-md:gap-3 max-md:grid-cols-1 max-md:w-full"
            >
              <div
                @click="setColorCategory('Relaciones y Ligues')"
                class="bg-white/10 rounded-full flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100 max-md:w-full" :class="{'active-category' : categoriaActiva ==='Relaciones y Ligues'}"
              >
                <p class="font-semibold flex items-center gap-1">
                  <span class="text-xl">👩‍❤️‍👨​</span> Relaciones y Ligues
                </p>
              </div>
              <div
                @click="setColorCategory('Confesiones')"
                class="bg-white/10 rounded-full flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100" :class="{'active-category' : categoriaActiva ==='Confesiones'}"
              >
                <p class="font-semibold flex items-center gap-1">
                  <span class="text-xl">🙊​​</span>Confesiones
                </p>
              </div>
              <div
                @click="setColorCategory('Chisme Universitario')"
                class="bg-white/10 rounded-full flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100" :class="{'active-category' : categoriaActiva ==='Chisme Universitario'}"
              >
                <p class="font-semibold flex items-center gap-1">
                  <span class="text-xl">🧑‍🎓​​​</span>Chisme Universitario
                </p>
              </div>
              <div
                @click="setColorCategory('Random')"
                class="bg-white/10 rounded-full flex items-center justify-center h-fit px-3 py-2 border-3 border-slate-300/30 text-white/90 opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200 categories hover:-translate-y-1 hover:scale-100" :class="{'active-category' : categoriaActiva ==='Random'}"
              >
                <p class="font-semibold flex items-center gap-1">
                  <span class="text-xl">😅​​​​</span>Random
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
        type="button"
          
          @click="publicarPost"
          :class="colorButton, { 'disabled': cantidadLetras > 999 || mensaje.trim() === ''}"
          class="text-3xl font-bold bg-white px-6 py-4 rounded-2xl hover:bg-white/80 cursor-pointer transition-[background] duration-200 mt-4 max-md:text-2xl max-md:w-full max-md:text-center"
        >
          Confiesa Ahora 🔥
        </button>
      </div>
    </section>
    <FooterComponent></FooterComponent>
  </section>
</template>
<style scoped>
  .disabled{
    opacity: .3;
    cursor: not-allowed;
   pointer-events: none;
  }
.colorButtons {
  transition: scale 0.2s ease-out;
}
.active {
  border: solid 4px white;
  box-shadow: 0px 4px 12px 2px rgba(255, 255, 255, 0.445);
  scale: 1;
  opacity: 1;
}
.active-category {
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.685);
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  translate: 0px 0px;
  box-shadow: 0 3px 8px 2px #ffffff4f;
}

.fuchsia {
  background: linear-gradient(
    to bottom right,
    rgba(217, 70, 239, 0.8),
    rgba(192, 38, 211, 0.8)
  );
  border-color: #e879f9;
}

.red {
  background: linear-gradient(
    to bottom right,
    rgba(239, 68, 68, 0.8),
    rgba(220, 38, 38, 0.8)
  );
  border-color: #f87171;
}

.emerald {
  background: linear-gradient(
    to bottom right,
    rgba(16, 185, 129, 0.8),
    rgba(5, 150, 105, 0.8)
  );
  border-color: #34d399;
}

.amber {
  background: linear-gradient(
    to bottom right,
    rgba(245, 158, 11, 0.8),
    rgba(217, 119, 6, 0.8)
  );
  border-color: #fbbf24;
}

.blue {
  background: linear-gradient(
    to bottom right,
    rgba(59, 130, 246, 0.8),
    rgba(37, 99, 235, 0.8)
  );
  border-color: #60a5fa;
}
.buttonfuchsia {
  color: rgb(129, 27, 143);
}
.buttonred {
  color: rgb(153, 28, 28);
}
.buttonemerald {
  color: rgb(4, 95, 66);
}
.buttonamber {
  color: rgb(155, 85, 5);
}
.buttonblue {
  color: rgb(20, 63, 155);
}
</style>
