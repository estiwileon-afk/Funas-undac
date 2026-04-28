import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../../utils/supabase";

export const useSupabaseStore = defineStore("supabase", () => {
  const user = ref(null);
  const isLoggin = ref(false);
  const publicaciones = ref([]);
  
  const hiddeLoader = ref(false);
  //Datos del Usuario
  const estilo = ref("fuchsia");
  const mensaje = ref("");
  const avatar = ref("");
  const nickName = ref("");
  const correo = ref("");
  const contraseña = ref("");
  const categoria = ref("Relaciones y Ligues")

  //Funciones

  //Registro
  async function registrarseSupa(email, password, apodo) {
    hiddeLoader.value = true;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: apodo,
        },
      },
    });
    if (data.user) {
      isLoggin.value = true;
    }
    
    //Crear perfil y avatar
    if (data.user) {
      const { error } = await supabase.from("avatares").insert({
        id: data.user.id,
      
      });
    }

    const usuario = await obtenerUsuario();
    cargarSesion();
    obtenerAvatar(usuario);
    if (error) {
      hiddeLoader.value = false;
      return alert(error.message);
    }
   hiddeLoader.value = false;
    return { data, error };
  }
  //Iniciar Sesion

  async function iniciarSesion(email, password) {
    
    hiddeLoader.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      hiddeLoader.value = false;
      return alert(error.message);
      
    }
    
    const usuario = obtenerUsuario();
    user.value = usuario;

    cargarSesion();
    cargarComentarios();
    hiddeLoader.value = false;
    return { user, error };
  }

  //Ver cambios en el Auth

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;

    isLoggin.value = !!session;
  });

  async function cargarSesion() {
    const { data } = await supabase.auth.getSession();
    const usuario = await obtenerUsuario();
    if (user.value) {
      obtenerAvatar(usuario);
      nickName.value = data.session.user.user_metadata.display_name;
    }
  }

  async function obtenerUsuario() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }
  async function obtenerAvatar(usuario) {
    const { data } = await supabase
      .from("avatares")
      .select("avatar")
      .eq("id", usuario.id)
      .single();

    avatar.value = data.avatar;
  }
  async function cambiarIcono(icono) {
    const { data: userData } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("avatares")
      .update({ avatar: icono })
      .eq("id", userData.user.id);

    cargarComentarios();
  }
  //Cerrar Sesion
  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();

    return { error };
  }

  //AÑADIR PUBLICACIONES--------------------
  
  async function postear( nombre, mensaje, estilo,categoria) {
    if (mensaje === "") return;
    const { error } = await supabase.from("publicaciones").insert({
     
      nombre: nombre,
      mensaje: mensaje,
      estilo: estilo,
      categoria:categoria
    });
  }

  async function cargarComentarios() {
    hiddeLoader.value = true;
    const { data, error } = await supabase
      .from("publicaciones")
      .select("*, avatares(avatar)")
      .order("creado_hace", { ascending: false });
 
   
    
    publicaciones.value = data
    hiddeLoader.value = false;
  }

  //CALCULAR TIEMPO DE PUBLICACION

function tiempoRelativo(fecha) {
  const ahora = new Date()
  const pasado = new Date(fecha)

  const segundos = Math.floor((ahora - pasado) / 1000)
  if (segundos < 60) return 'hace unos segundos'

  const minutos = Math.floor(segundos / 60)
  if (minutos < 60) return `hace ${minutos} min`

  const horas = Math.floor(minutos / 60)
  if (horas < 24) return `hace ${horas} h`

  const dias = Math.floor(horas / 24)
  if (dias < 7) return `hace ${dias} días`

  const semanas = Math.floor(dias / 7)
  if (semanas < 4) return `hace ${semanas} sem`

  const meses = Math.floor(dias / 30)
  if (meses < 12) return `hace ${meses} meses`

  const años = Math.floor(dias / 365)
  return `hace ${años} años`
}

async function getCurrentUserId() {
  const { data } = await supabase.auth.getUser();
  return data?.user?.id;
}

// DAR LIKE
async function likear(idPublicacion, userId) {
  const user = userId ?? (await getCurrentUserId());
  if (!user) return;

  await supabase
    .from("likes")
    .insert([
      {
        user_id: user,
        post_id: idPublicacion,
      },
    ]);
}

// ELIMINAR LIKE
async function eliminarLike(idPublicacion, userId) {
  const user = userId ?? (await getCurrentUserId());
  if (!user) return;

  await supabase
    .from("likes")
    .delete()
    .eq("user_id", user)
    .eq("post_id", idPublicacion);
}
async function saberLike(idPublicacion) {
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const { data: dioLike } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", user.id)
    .eq("post_id", idPublicacion)
    .maybeSingle();

  return dioLike;
}


  return {
    isLoggin,
    avatar,
    nickName,
    correo,
    contraseña,
    registrarseSupa,
    cambiarIcono,
    cerrarSesion,
    user,
    cargarSesion,
    iniciarSesion,
    hiddeLoader,
    estilo,
    mensaje,
    publicaciones,
    postear,
    cargarComentarios,
    tiempoRelativo,
    categoria, 
    likear, 
    eliminarLike,
    saberLike
  };
  {persist:{
    path: {mensaje}
  }}
  
});
