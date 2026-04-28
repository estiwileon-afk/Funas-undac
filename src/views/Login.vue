<script setup> 
import Loader from "@/components/Loader.vue";
import { useSupabaseStore } from "@/stores/supabaseStore"; 
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";


const active = ref("registro");
const isOpen = ref(true);
const tipo = ref("password"); 

const supabaseStore = useSupabaseStore();
const router = useRouter();
const isLoggin = storeToRefs(supabaseStore).isLoggin;
const hiddeLoader = storeToRefs(supabaseStore).hiddeLoader
//Datos del Usuario

const nickName = storeToRefs(supabaseStore).nickName;
const correo = storeToRefs(supabaseStore).correo;
const contraseña = storeToRefs(supabaseStore).contraseña;
function validarCorreo(c) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(c);
}

//Funciones


 
//Inicio Sesion
async function login() {
  const {user,error} = await supabaseStore.iniciarSesion(correo.value,contraseña.value);

  if (user) {
    router.push("/Inicio");
  

    }
      supabaseStore.cargarComentarios()
} 
//Registro
async function registro() {
  if (nickName.value === "" || correo.value === "" || contraseña.value === "") {
    return alert("Rellena todos los campos");
  }
  if (!validarCorreo(correo.value)) {
    return alert("Coloca un correo valido");
  }
  if (contraseña.value.length < 8) {
    return alert("La contraseña debe tener minimo 8 caracteres");
  }
  if (nickName.value > 12) {
    return alert("El apodo es demasiado largo");
  }

  const { data, error } = await supabaseStore.registrarseSupa(
    correo.value,
    contraseña.value,
    nickName.value,
  );
  
  isLoggin.value = true;
 
  router.push("/Inicio");
 
  supabaseStore.cargarComentarios()
}

function setActive(tipo) {
  active.value = tipo;
}
</script>
<template>
  <Teleport to="body">
    <Loader v-show="hiddeLoader" ></Loader>
  </Teleport>
  
  <section
    class="min-h-screen flex justify-center items-center max-md:py-[5vh]"
  >
    <div
      class="flex border rounded-4xl border-white/20 text-white w-[90%] h-[90vh] items-center justify-between gap-6 bg-white/5 max-md:flex-col max-md:h-max max-md:gap-2"
    >
      <div
        style="box-shadow: none"
        class="flex flex-col items-center gap-1 w-[40%] h-full degradado p-12 max-md:w-full rounded-4xl max-md:p-6 max-md:gap-3"
      >
        <h1 class="font-extrabold text-4xl italic">Funas UNDAC</h1>
        <img width="180px" height="180px" src="/icon.png" alt="Funas UNDAC" />

        <p
          class="text-xl text-white/90 mt-5 text-center font-semibold max-md:text-md max-md:mt-0"
        >
          Tu identidad es anónima.
        </p>
        <p
          class="text-xl text-white/70 text-center font-semibold max-md:text-sm"
        >
          El correo electrónico no será visible para otros usuarios ni se
          compartirá con terceros.
        </p>
        <p
          class="text-xl text-white/70 mt-auto self-start font-semibold flex gap-2 max-md:text-lg max-md:mt-2 max-md:self-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-shield-check-icon lucide-shield-check"
          >
            <path
              d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
            />
            <path d="m9 12 2 2 4-4" /></svg
          >Privacidad Absoluta
        </p>
      </div>
      <div
        class="flex flex-col min-w-[60%] h-full p-12 gap-6 justify-between max-md:p-6 max-md:w-full"
      >
        <div
          class="flex bg-black/20 border border-white/20 rounded-2xl w-fit p-1.25 text-white/50 max-md:self-center"
        >
          <p
            @click="setActive('registro')"
            :class="{ active: active === 'registro' }"
            class="hover:text-white cursor-pointer p-2.5 font-semibold rounded-xl px-6"
          >
            Registro
          </p>
          <p
            @click="setActive('login')"
            :class="{ active: active === 'login' }"
            class="hover:text-white cursor-pointer p-2.5 font-semibold rounded-xl px-6"
          >
            Iniciar Sesión
          </p>
        </div>
        <div class="flex flex-col max-md:text-center w-full">
          <h2 class="text-4xl font-extrabold">
            {{ active === "registro" ? "Unirse a las Funas" : "Inicia Sesión" }}
          </h2>
          <p class="text-white/70 text-lg">
            {{
              active === "registro"
                ? "Crea tu Identidad Anónima"
                : "Identifícate para ingresar"
            }}
          </p>
        </div>
        <form class="flex flex-col justify-between gap-4 w-full">
          <div
            class="flex max-md:flex-col gap-6 max-w-full justify-between max-md:gap-4"
          >
            <div class="flex flex-col gap-2  max-md:w-full" :class="active === 'registro' ? 'w-1/2':'w-full'">
              <label for="email" class="text-xl font-semibold gap-2"
                >Correo Electrónico
              </label>
              <div class="flex flex-col relative w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-mail-icon lucide-mail absolute m-auto top-0 bottom-0 left-4 text-white/50"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <input
                  v-model="correo"
                  placeholder="ejemplo@null"
                  class="font-semibold text-lg p-3 px-4 border-2 pl-12 border-white/50 bg-white/20 rounded-2xl h-15 focus:outline focus:outline-fuchsia-500 focus:border-fuchsia-500 transition-all duration-100 w-full"
                  id="email"
                  type="email"
                  required
                />
              </div>
            </div>
            <div
              v-show="active === 'registro'"
              class="flex flex-col gap-2 w-1/2 max-md:w-full"
            >
              <label for="apodo" class="text-xl font-semibold gap-2"
                >Apodo
                <span class="text-sm font-normal text-white/70"
                  >(No pongas tu nombre real)</span
                ></label
              >
              <div class="flex flex-col relative w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-user-icon lucide-user absolute m-auto top-0 bottom-0 left-4 text-white/50"
                > 
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  v-model="nickName"
                  placeholder="Tu apodo..."
                  class="font-semibold text-lg p-3 px-4 border-2 pl-12 border-white/50 bg-white/20 rounded-2xl h-15 focus:outline focus:outline-fuchsia-500 focus:border-fuchsia-500 transition-all duration-100 w-full"
                  id="apodo"
                  type="text"
                  required
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="contraseña" class="text-xl font-semibold"
              >Contraseña</label
            >
            <div class="relative w-full flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-lock-icon lucide-lock absolute m-auto top-0 bottom-0 left-4 text-white/50"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                v-model="contraseña"
                required=""
                placeholder="••••••••"
                class="font-semibold p-3 text-lg px-12 border-2 border-white/50 bg-white/20 rounded-2xl h-15 focus:outline focus:outline-fuchsia-500 focus:border-fuchsia-500 transition-all duration-100"
                id="contraseña"
                :type="tipo"
              />
              <svg
                @click="((isOpen = false), (tipo = 'text'))"
                v-show="isOpen === true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye-icon lucide-eye absolute right-4 top-0 bottom-0 m-auto cursor-pointer text-white/50 hover:text-white"
              >
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                @click="((isOpen = true), (tipo = 'password'))"
                v-show="isOpen === false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye-off-icon lucide-eye-off absolute right-4 top-0 bottom-0 m-auto cursor-pointer text-white/50 hover:text-white"
              >
                <path
                  d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
                />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path
                  d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
                />
                <path d="m2 2 20 20" />
              </svg>
            </div>
          </div>

          <button
            type="button"
            @click="active === 'registro' ? registro() : login()"
            class="degradado mt-3 h-15 rounded-2xl text-2xl font-bold cursor-pointer hover:opacity-70 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            Entrar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-right-icon lucide-arrow-right mt-1 group-hover:translate-x-2 transition-all duration-200"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<style scoped>
.active {
  background-color: white;
  color: rgb(12, 0, 5);
}
.degradado {
  background: linear-gradient(to left, rgb(243, 26, 171), rgb(141, 34, 190));
  box-shadow: 1px 1px 8px 2px rgba(0, 0, 0, 0.267);
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px rgb(63, 5, 44) inset;
  -webkit-text-fill-color: white;
}
</style>
