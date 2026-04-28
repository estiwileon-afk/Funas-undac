
import { useColorsStore } from "@/stores/colors";
import { useSupabaseStore } from "@/stores/supabaseStore";
import Compartir from "@/views/Compartir.vue";
import Inicio from "@/views/Inicio.vue";
import Login from "@/views/Login.vue";
import MiPerfil from "@/views/MiPerfil.vue";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root"
    },
    {
      path: "/Inicio",
      name: "Inicio",
      component: Inicio,
      meta: { requiresAuth: true }
    },
    {
      path: "/Compartir",
      name: "Compartir",
      component: Compartir,
      meta: { requiresAuth: true }
    },
    {
      path: "/MiPerfil",
      name: "MiPerfil",
      component: MiPerfil,
      meta: { requiresAuth: true }
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
    },
    
  ],
  scrollBehavior(savedPosition){
    if(savedPosition){
      return savedPosition
    }else{
      return {top:0}
    }
  }
 
});
router.beforeEach((to)=>{
  const supabaseStore = useSupabaseStore()
  const isLoggin = storeToRefs(supabaseStore).isLoggin
  if (to.path === "/") {
    return isLoggin.value ? "/Inicio" : "/Login"
  }
  if (to.meta.requiresAuth && !isLoggin.value) {
    return "/Login"
  }
  if(to.path === "/Login" && isLoggin.value){
    return "/Inicio"
  }

})
export default router;
