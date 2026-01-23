<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-55.75 bg-white">
    <div
      :class="`flex items-center justify-between px-6 py-4 ${route.fullPath === '/' ? 'bg-[#EDF5FC] border-l-9 border-[#22B4FF]' : 'border-l-9 border-white'} w-full`">
      <div class="flex items-center gap-5">
        <img src="/images/dashboard-icon.svg" alt="dashboard" class="w-6 h-6"
          :class="route.fullPath === '/' ? 'icon-active' : 'icon-inactive'" />
        <RouterLink to="/" :class="` whitespace-nowrap ${route.fullPath === '/' ? 'text-[#22B4FF]' : 'text-black'} `">
          产品管理</RouterLink>

      </div>
    </div>
    <div
      :class="`flex items-center justify-between px-6 py-4 ${route.fullPath === '/records' ? 'bg-[#EDF5FC] border-l-9 border-[#22B4FF]' : 'border-l-9 border-white'} w-full`">
      <div class="flex items-center gap-5">
        <img src="/images/contract.png" alt="dashboard" class="w-6 h-6"
          :class="route.fullPath === '/records' ? 'icon-active' : 'icon-inactive'" />
        <RouterLink to="/records"
          :class="` whitespace-nowrap ${route.fullPath === '/records' ? 'text-[#22B4FF]' : 'text-black'} `">洽淡记录
        </RouterLink>

      </div>
    </div>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style scoped>
.icon-inactive {
  filter: grayscale(100%) brightness(0);
}

.icon-active {
  filter: invert(56%) sepia(91%) saturate(748%) hue-rotate(176deg) brightness(95%) contrast(95%);
}
</style>
