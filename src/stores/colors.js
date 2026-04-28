import { ref } from "vue";
import { defineStore } from "pinia";

export const useColorsStore = defineStore("colors", () => {
  const colorPage = ref(localStorage.getItem('color' ) || 'medianoche');
  
  function setTheme(tema){
    colorPage.value = tema
    localStorage.setItem('color',tema)
  }
  
  return { colorPage,setTheme };
});

