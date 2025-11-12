<template>
  <main
    class="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-4"
  >
    <Header />
    <Form />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import Footer from './components/Footer.vue'
</script>
