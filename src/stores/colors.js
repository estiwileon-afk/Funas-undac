import { ref } from "vue";
import { defineStore } from "pinia";

export const useColorsStore = defineStore("colors", () => {
  const colorPage = ref(localStorage.getItem('color' ) || 'medianoche');
  
  function setTheme(tema){
    localStorage.setItem('color',tema);
    colorPage.value = tema;
  }
  
  return { colorPage,setTheme };
}); 

