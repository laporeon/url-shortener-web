<template>
  <footer class="mt-4 text-center text-secondary">
    <p>&copy; {{ currentYear }} Encurtei. Todos os direitos reservados.</p>
  </footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
