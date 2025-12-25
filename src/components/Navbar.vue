<script setup>
import { useRouter } from 'vue-router';
import logo from '/src/assets/images/logo-white.svg'

const router = useRouter()

const user = localStorage.getItem('record_user')

</script>

<template>
    <div class="py-10 flex items-center relative bg-white">
        <div class="bg-[#22B4FF] px-4 md:p-4 absolute top-0">
            <img :src="logo" alt="Logo" class="h-20 w-20 md:w-51.75 md:h-8.25" />
        </div>
        <div class="flex item-center gap-5 md:gap-16.75 absolute right-5 font-medium">
            <div class="flex items-center gap-2">
                <el-avatar> {{ user.name || 'User' }} </el-avatar>
                <p>{{ user.user || 'User' }}</p>
            </div>
            <button class="flex items-center gap-2">
                <img src="/src/assets/images/logout.svg"/>
                退出
            </button>
        </div>
    </div>
</template>
