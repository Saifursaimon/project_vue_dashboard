<script setup>
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class=" max-w-360 mx-auto md:px-10 ">
    <Navbar />
    <RouterView />
  </div>
</template>
