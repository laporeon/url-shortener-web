<template>
  <form @submit.prevent="generateShortUrl" class="form main-card p-5 rounded">
    <div class="input-group">
      <label for="url" class="form-label mb-2 d-block fs-6">URL Original</label>
      <input
        id="url"
        v-model="originalUrl"
        type="url"
        placeholder="https://www.youtube.com/@amigoscode"
        class="p-2 rounded text-white fs-6 mb-3"
        :class="{ 'is-invalid': originalUrlError }"
      />
    </div>
    <span v-if="originalUrlError" class="text-danger text-nowrap mb-3 d-block">{{
      originalUrlError
    }}</span>

    <div class="input-group">
      <label for="expiration" class="form-label mb-2 d-block fs-6"
        >Data de Expiração (opcional)</label
      >
      <input
        id="expiration"
        v-model="expirationDate"
        type="date"
        class="p-2 rounded text-white fs-6 mb-3"
        :class="{ 'is-invalid': expirationDateError }"
      />
    </div>
    <span v-if="expirationDateError" class="text-danger text-nowrap mb-3 d-block">
      {{ expirationDateError }}
    </span>

    <button
      type="submit"
      :disabled="!isFormValid"
      class="btn btn-primary text-white rounded fw-bolder p-2 w-100"
    >
      Gerar URL Encurtada
    </button>

    <ShortUrlModal :shortUrl="shortUrl" :expiresAt="expiresAt" />
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ShortUrlModal from './ShortUrlModal.vue'
import api from '@/config/api'
import { errors } from '@/utils/errors'

const originalUrl = ref('')
const expirationDate = ref('')
const shortUrl = ref('')
const expiresAt = ref('')
const originalUrlError = ref('')
const expirationDateError = ref('')

const isFormValid = computed(() => originalUrl.value.trim() !== '')

const generateShortUrl = async () => {
  if (!isFormValid.value) return

  originalUrlError.value = ''
  expirationDateError.value = ''

  try {
    const { data } = await api.generateShortUrl({
      originalUrl: originalUrl.value,
      expirationDate: expirationDate.value
    })
    shortUrl.value = data.shortUrl
    expiresAt.value = data.expiresAt

    originalUrl.value = ''
    expirationDate.value = ''
  } catch (error: any) {
    const backendErrors = error.response?.data?.details || {}

    originalUrlError.value = errors[backendErrors.originalUrl] || backendErrors.originalUrl || ''
    expirationDateError.value =
      errors[backendErrors.expirationDate] || backendErrors.expirationDate || ''
  }
}
</script>

<style scoped>
.main-card {
  background: #111827;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.17);
  border: 1px solid #27272a;
}

.form-label {
  color: #d1d5db !important;
}

.input-group input {
  width: 100%;
  background: #1f2937;
  border: 1px solid #374151;
  transition: border-color 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #2563eb;
}

.input-group input.is-invalid {
  border-color: #dc2626;
}

button:disabled {
  background: #374151;
  cursor: not-allowed;
}
</style>
