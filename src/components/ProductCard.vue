<script setup>
import { RouterLink } from "vue-router";
 defineProps({
    p: Object
});

</script>

<template>
    <RouterLink :to="`/products/${p.id}`"
        class="block bg-white transition-all duration-300 hover:scale-[1.01] cursor-pointer shadow-sm">
        <div class="relative w-full  bg-[#F9FBFF] px-4 py-3 flex items-end justify-between">

            <div class="flex flex-col hover:scale-[1.01]">

                <h2 class="text-xl font-semibold leading-tight text-[#2da8ff]">
                    分时APP<br />
                    案例
                </h2>


                <div class="flex items-center gap-1 mt-12">
                    <span class="block w-8 h-0.75 bg-[#2da8ff] rounded-full"></span>
                    <span class="text-[#2da8ff] text-lg font-medium whitespace-nowrap">点刻科技</span>
                </div>
            </div>

            <!-- RIGHT IMAGE -->
            <div>
                <img src="@/assets/images/app-card.svg" alt="app preview" class="w-20 h-20" />
            </div>



        </div>
        <div class="p-4 bg-[#EDF1FC]">
            <div class="flex items-center justify-between gap-3.5">
                <p class="font-medium text-lg">{{ p.name.substring(0, 4) }} ...</p>
                <div
                    class="bg-[#22B4FF] text-white h-8 w-28 rounded-full text-center py-1 text-base overflow-hidden whitespace-nowrap text-ellipsis px-1">
                    {{ p.category }}
                </div>
            </div>
            <p class="text-base mt-2 text-[#32333B]">{{ p.date }}</p>
        </div>
    </RouterLink>
</template>
