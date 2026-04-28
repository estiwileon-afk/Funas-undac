<script setup>
import { useSupabaseStore } from "@/stores/supabaseStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { supabase } from "../../utils/supabase";
const props = defineProps({
  avatar: String,
  nombre: String,
  mensaje: String,
  estilo: String,
  tiempo: String,
  categoria: String,
  likes: Number,
  id: Number,
});
const isLike = ref(false);
const likeCount = ref(props.likes ?? 0);

const store = useSupabaseStore();
const emit = defineEmits(["mensaje-enviado"]);

async function loadLikeState() {
  const dioLike = await store.saberLike(props.id);
  isLike.value = !!dioLike;
}

async function toggleLike() {
  const newLikeState = !isLike.value;
  isLike.value = newLikeState;
  likeCount.value = Math.max(0, likeCount.value + (newLikeState ? 1 : -1));

  try {
    if (newLikeState) {
      await store.likear(props.id);
    } else {
      await store.eliminarLike(props.id);
    }
    emit("mensaje-enviado");
  } catch (error) {
    isLike.value = !newLikeState;
    likeCount.value = Math.max(0, likeCount.value + (newLikeState ? -1 : 1));
    console.error("Error al actualizar like:", error);
  }
}

onMounted(async () => {
  await loadLikeState();
});
</script>
<template>
  <div
    class="text-white flex flex-col w-full max-h-85 rounded-3xl p-6 gap-5 border-5 border-white/50 justify-between shadow-xl shadow-black/30 max-md:max-h-90 max-md:p-5 max-md:gap-3"
    :class="props.estilo"
  >
    <div class="flex w-full justify-between items-center max-md:mb-2">
      <div class="flex gap-4 items-center max-md:gap-2">
        <div
          class="bg-white/40 rounded-full w-12 h-12 flex items-center justify-center max-md:w-9 max-md:h-9"
        >
          <span class="text-[1.6rem] max-md:text-[1.2rem]">{{
            props.avatar
          }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-2xl font-semibold max-md:text-lg">{{
            props.nombre
          }}</span>
          <p class="text-white/60 text-lg max-md:text-xs">{{ props.tiempo }}</p>
        </div>
      </div>
      <div
        class="bg-black/30 rounded-full flex items-center justify-center h-fit px-4 py-2 border border-white/30 max-md:px-2.5 max-md:py-1.5"
      >
        <p class="font-semibold max-md:text-xs">{{ props.categoria }}</p>
      </div>
    </div>
    <p class="text-xl mb-auto max-md:text-base text-justify">
      {{ props.mensaje }}
    </p>
    <div class="flex w-full gap-7 border-t border-white/20 pt-5 max-md:pt-3">
      <div
        class="flex gap-2 w-15 items-center transition-all duration-200 ease-out"
      >
        <svg
          @click="toggleLike"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          :fill="isLike ? '#ff0000' : '#ffffff'"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-heart-icon lucide-heart transition-all duration-200 ease-out hover:scale-125 active:scale-80 cursor-pointer max-md:w-5.5 max-md:h-5.5 max-md:hover:scale-none"
          :class="{ 'like-full': isLike }"
        >
          <path
            d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
          />
        </svg>
        <p class="mt-0.5 font-semibold text-lg max-md:text-base">
          {{ likeCount }}
        </p>
      </div>
      <div
        class="flex gap-2 w-15 items-center transition-all duration-200 ease-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#ffffff"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-message-square-icon lucide-message-square transition-all duration-200 ease-out hover:scale-115 hover:fill-white active:scale-80 cursor-pointer max-md:w-5.5 max-md:h-5.5 max-md:hover:scale-none max-md:hover:fill-none"
        >
          <path
            d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
          />
        </svg>
        <p class="mt-0.5 font-semibold text-lg max-md:text-base">0</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.like-full {
  color: #ff0000;
  & :hover {
    color: #ff0000;
  }
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
</style>
