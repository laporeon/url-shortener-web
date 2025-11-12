<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div v-if="shortUrl" class="result text-center mt-4 pt-4 border-top border-secondary">
      <div class="d-flex gap-2 align-items-center">
        <input
          :value="shortUrl"
          class="flex-grow-1 bg-dark border border-secondary rounded text-primary p-2"
          readonly
          ref="shortUrlInput"
        />
        <button
          @click="copyToClipboard"
          :class="['btn', copied ? 'btn-success' : 'btn-primary']"
          :disabled="copied"
        >
          {{ copied ? 'Copiado!' : 'Copiar' }}
        </button>
      </div>
      <label class="text-center fs-6 text-secondary mt-1"
        >Expira em: {{ formattedExpiresAtDate }}</label
      >
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  shortUrl: string
  expiresAt: string
}>()

const copied = ref(false)
const shortUrlInput = ref<HTMLInputElement>()

const formattedExpiresAtDate = computed(() => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(props.expiresAt))
})

const copyToClipboard = async () => {
  if (copied.value) return

  await navigator.clipboard.writeText(props.shortUrl)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<style scoped>
.bg-dark {
  background: #1f2937 !important;
  border: 1px solid #374151 !important;
  color: #60a5fa !important;
}
</style>
