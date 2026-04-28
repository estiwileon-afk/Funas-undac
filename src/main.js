import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(createPinia())


import { useSupabaseStore } from './stores/supabaseStore'
const supabaseStore = useSupabaseStore()


await supabaseStore.cargarSesion()


app.use(router)
app.mount('#app')
