<script setup>
import { RouterLink } from "vue-router";

defineProps({
  p: Object
});
</script>

<template>
  <RouterLink :to="`/products/${p.id}`" class="relative block cursor-pointer overflow-hidden rounded-lg"
    :class="p.thmbnl ? 'bg-cover bg-center bg-no-repeat text-white' : 'bg-white hover:bg-[#f0f0f1]'"
    :style="p.thmbnl ? { backgroundImage: `url(${p.thmbnl})` } : {}">
    <!-- Overlay when thumbnail exists -->
    <div v-if="p.thmbnl" class="absolute inset-0 bg-gray-900/20"></div>

    <!-- CONTENT WRAPPER -->
    <div class="relative z-10">
      <!-- TOP SECTION -->
      <div class="w-full px-4 py-3 flex items-end justify-between h-50.75"
        :class="!p.thmbnl ? 'bg-[#F9FBFF] hover:bg-[#f0f0f1]' : ''">
        <!-- LEFT CONTENT -->
        <div class="flex flex-col hover:scale-[1.01]">
         <h2
            :class="`text-xl absolute top-5 font-semibold leading-tight ${p.thmbnl ? 'text-white' : 'text-[#2da8ff]'} `">
            {{ p.name }}
          </h2>
        </div>

        <!-- RIGHT IMAGE -->
        <div v-if="!p.thmbnl">
          <img src="/images/app-card.svg" alt="app preview" class="w-20 h-20" />
        </div>
      </div>

      <!-- BOTTOM SECTION -->
      <div class="p-4 h-21">
        <div class="flex items-center justify-between gap-3.5">
          <p v-if="!p.thmbnl" class="font-medium text-lg">
            {{ p.name.substring(0, 4) + ' ...' }}
          </p>

          <div v-if="!p.thmbnl"
            class="bg-[#22B4FF] text-white h-8 w-28 rounded-full text-center py-1 text-base overflow-hidden whitespace-nowrap text-ellipsis px-1">
            {{ p.category }}
          </div>
        </div>

        <p v-if="!p.thmbnl" class="text-base mt-2 text-[#32333B]">
          {{ p.date }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>
