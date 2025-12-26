<script setup>
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import PinLogin from './components/PinLogin.vue';
import Sidebar from './components/Sidebar.vue';

const authorized = ref(false)

const handleLoginSuccess = () => {
  authorized.value = true;
};


onMounted(() => {
  const verified = localStorage.getItem("dashboard_pin_verified");
  if (verified === "true") {
    authorized.value = true;
  }
});

</script>

<template>
  <PinLogin v-if="!authorized" loginType="dashboard" @success="handleLoginSuccess" />
  <div v-else>
    <Navbar />
    <div class="flex items-start">
      <div class="hidden md:block">
        <Sidebar/>
      </div>
      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>
