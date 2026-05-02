<script setup>
import EmojiComponent from '@/components/EmojiComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useColorsStore } from '@/stores/colors';
import { useSupabaseStore } from '@/stores/supabaseStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const store = useColorsStore()
const supabaseStore = useSupabaseStore()
const config = ref('custom');
const { colorPage: theme } = storeToRefs(store)
const avatar = storeToRefs(supabaseStore).avatar
const apodo = storeToRefs(supabaseStore).nickName
const correo = storeToRefs(supabaseStore).correo
const contraseña = storeToRefs(supabaseStore).contraseña
const isLoggin = storeToRefs(supabaseStore).isLoggin
function setConfig(type) {
    config.value = type
}

const setTheme = (tema)=>{
    localStorage.setItem('color',tema)
    store.setTheme(tema)
}
async function logOut(){
    await supabaseStore.cerrarSesion()
    isLoggin.value = false
    apodo.value = ''
    correo.value = ''
    contraseña.value = ''
    router.push("/")
}
</script>
<template>
    <section class="max-w-dvw flex flex-col items-center text-white pb-28">
        <HeaderComponent></HeaderComponent>
        <section class="w-[75%] flex flex-col mt-3 gap-9 max-md:w-[82%] max-md:mt-8">
            <div class="w-full flex flex-col items-center justify-center gap-4">
                <p class="text-8xl border-7 border-white rounded-[3.3rem] p-3 py-7 max-md:text-7xl  caja max-md:px-5">{{ avatar }}</p>  
                <span class="text-5xl font-bold max-md:text-[3.2rem]">{{apodo}}</span>
            </div>
            <div class="flex justify-between w-full border-3 border-white/50 rounded-full p-2 gap-6 bg-white/5 max-md:gap-1 max-md:p-1.25 ">
                <p @click="setConfig('custom')" :class="{'active': config === 'custom'}" class="flex gap-2 items-center justify-center w-full text-2xl font-semibold hover:bg-black/20 rounded-full py-3 cursor-pointer transition-all duration-100  max-md:text-base max-md:flex-col max-md:gap-0.5 max-md:py-2.25" ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings max-md:w-6 max-md:h-6"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>Configuración</p> 
                <p @click="setConfig('secrets')" :class="{'active': config === 'secrets'}" class="flex gap-2 items-center justify-center w-full text-2xl font-semibold hover:bg-black/20 rounded-full py-3 cursor-pointer transition-all duration-100 max-md:text-base max-md:flex-col max-md:gap-0.5 max-md:py-2.25"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history-icon lucide-history max-md:w-6 max-md:h-6"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>Mis Confesiones</p> 
            </div>
            
            <section v-if="config === 'custom'"  class="w-full flex flex-col items-center gap-8">
                <div class="flex flex-col items-center gap-2">
                <h2 class="text-4xl font-semibold flex items-center gap-2 max-md:text-3xl"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer2-icon lucide-mouse-pointer-2 max-md:w-7.5 max-md:h-7.5"><path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/></svg>Elige tu Avatar</h2>
                <p class="text-white/60 text-2xl max-md:text-xl max-md:text-center">Selecciona un emoji que te represente</p>
                </div>
                <div class="grid grid-cols-8 w-full gap-4 border-3 border-white/50 rounded-4xl p-8 bg-white/5 max-md:p-4 max-md:grid-cols-4 max-md:gap-2 ">
                    <EmojiComponent emoji="😎"></EmojiComponent>
                    <EmojiComponent emoji="😏"></EmojiComponent>
                    <EmojiComponent emoji="🤑"></EmojiComponent>
                    <EmojiComponent emoji="🤠"></EmojiComponent>
                    <EmojiComponent emoji="🥸"></EmojiComponent>
                    <EmojiComponent emoji="🧐"></EmojiComponent>
                    <EmojiComponent emoji="🥴"></EmojiComponent>
                    <EmojiComponent emoji="🥵"></EmojiComponent>
                    <EmojiComponent emoji="😈"></EmojiComponent>
                    <EmojiComponent emoji="🥶"></EmojiComponent>
                    <EmojiComponent emoji="🐱"></EmojiComponent>
                    <EmojiComponent emoji="🐶"></EmojiComponent>
                    <EmojiComponent emoji="🐼"></EmojiComponent>
                    <EmojiComponent emoji="🐸"></EmojiComponent>
                    <EmojiComponent emoji="🦊"></EmojiComponent>
                    <EmojiComponent emoji="🐺"></EmojiComponent>
                    <EmojiComponent emoji="⚡"></EmojiComponent>
                    <EmojiComponent emoji="🚀"></EmojiComponent>
                    <EmojiComponent emoji="💎"></EmojiComponent>
                    <EmojiComponent emoji="🔥"></EmojiComponent>
                    <EmojiComponent emoji="👀"></EmojiComponent>
                    <EmojiComponent emoji="👺"></EmojiComponent>
                    <EmojiComponent emoji="👻"></EmojiComponent>
                    <EmojiComponent emoji="💀"></EmojiComponent>
                </div>
                <div class="w-full flex mt-5 h-65 max-md:flex-col max-md:gap-6 max-md:h-auto">
                    <div class="flex flex-col justify-center gap-2 w-[50%] max-md:w-full max-md:text-center max-md:items-center ">
                        <h2 class="text-4xl font-semibold flex gap-2 items-center max-md:text-3xl"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paintbrush-vertical-icon lucide-paintbrush-vertical max-md:w-7"><path d="M10 2v2"/><path d="M14 2v4"/><path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z"/><path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"/></svg>Tema de la Página</h2>
                        <p class="text-white/60 text-2xl">Personaliza el ambiente a tu modo</p>
                    </div>
                    <div class="border-3 border-white/50 rounded-4xl p-8 bg-white/5 w-[60%] flex gap-5 max-md:p-4 max-md:w-full  ">
                        <div @click="setTheme('medianoche')" :class="{'theme-active': theme === 'medianoche'}" class="w-full rounded-4xl p-4 flex flex-col items-center gap-3 border-2 border-white/30 bg-white/10 opacity-60 hover:opacity-80 cursor-pointer hover:bg-black/20 transition-all duration-200 max-md:w-1/2 max-md:p-2 max-md:gap-2 max-md:rounded-3xl max-md:hover:bg-white/10">
                            <div class=" rounded-3xl w-full h-full medianoche border border-white/60 max-md:h-20"></div> 
                            <p class="text-xl font-semibold max-md:text-lg">Medianoche</p>
                        </div>
                        <div @click="setTheme('pastel')" :class="{'theme-active': theme === 'pastel'}" class="w-full rounded-4xl p-4 flex flex-col items-center gap-3 border-2 border-white/30 bg-white/10 opacity-60 hover:opacity-80 cursor-pointer hover:bg-black/20 transition-all duration-200 max-md:w-1/2 max-md:p-2 max-md:gap-2 max-md:rounded-3xl max-md:hover:bg-white/10">
                            <div class=" rounded-3xl w-full h-full pastel border border-white/60 max-md:h-20"></div>
                            <p class="text-xl font-semibold max-md:text-lg">Pastel</p>
                        </div>
                    </div>
                </div>
                <button type="button" @click="logOut" class="text-2xl text-white/90 font-semibold bg-red-800/40 border-3 border-red-400/90 p-4 w-full rounded-2xl mt-8 hover:bg-red-800/70 hover:border-red-300/80 transition-all duration-200 hover:text-white cursor-pointer max-md:mt-4">Cerrar Sesión</button>
            </section>
            <section v-else class="w-full flex justify-center items-center gap-8">
                <div class="flex flex-col border-3 border-dashed  border-white/50 rounded-4xl p-8 bg-white/5 w-full items-center justify-center h-75 gap-5 max-md:p-4 max-md:text-center">
                    <p class="text-2xl font-semibold ">Aún no has roto el silencio...</p>
                    <router-link to="/Compartir" class="degradado p-4 px-7 rounded-2xl font-semibold text-xl">Empezar Ahora</router-link>
                </div>
            </section>
            <div>
             
            </div>
        </section>
        <FooterComponent></FooterComponent>
    </section>
</template>
<style scoped>
.degradado{
    background: linear-gradient(to left, rgb(243, 26, 171), rgb(141, 34, 190));
    box-shadow: 1px 1px 8px 2px rgba(0, 0, 0, 0.267);
}
.active{
    background-color: white;
    color: black;
    
}
.caja{
    background: linear-gradient(to left, rgb(243, 26, 171), rgb(141, 34, 190));
}

.medianoche{
  background: linear-gradient(to bottom right, #361a32,#38081a);
  
}
.pastel{
   background: linear-gradient(to bottom right, #861043,#e94d83);
}
.theme-active{
    border-color: white;
    background-color: rgba(255, 255, 255, 0.100);
    opacity: 1;
    box-shadow: 2px 0px 7px 1px #0000007d;
}

</style>