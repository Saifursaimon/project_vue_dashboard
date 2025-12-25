<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '/src/assets/images/logo.svg'
const route = useRoute()

const links = [
    { name: '产品展示', path: '/' },
    { name: '洽谈记录', path: '/records' }
]

</script>

<template>
    <div class="py-10 flex items-center justify-between">
        <img :src="logo" alt="Logo" class="h-20 w-20 md:w-51.75 md:h-8.25" />
        <div class="flex item-center gap-5 md:gap-16.75 font-medium">
            <RouterLink v-for="link in links" :key="link.path" :to="link.path" class="relative py-2"
                active-class="text-[#22B4FF]">
                {{ link.name }}

                <span v-if="route.path === link.path"
                    class="absolute left-1/2 -bottom-1 w-3/4 -translate-x-1/2 h-[4px] bg-[#22B4FF] rounded"></span>
            </RouterLink>
        </div>
    </div>
</template>
