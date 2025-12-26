<script setup>
import { useRoute, useRouter } from 'vue-router';
import logo from '/src/assets/images/logo-white.svg'

const router = useRouter()
const route = useRoute()

const user = JSON.parse(localStorage.getItem('dashboard_user'))

const handleLogout = () => {
    localStorage.removeItem('dashboard_pin_verified')
    localStorage.removeItem('dashboard_user')
    router.go(0)
   
}
</script>

<template>
    <div class="py-10 flex items-center relative bg-white">
        <div class="bg-[#22B4FF] px-4 md:p-4 absolute top-0">
            <img :src="logo" alt="Logo" class="h-20 w-20 md:w-51.75 md:h-8.25" />
        </div>
        <div class="flex item-center gap-6  absolute right-5 font-medium">
            <div class="flex items-center gap-2">
                <el-avatar> {{ user?.name.slice(0,2) || 'User' }} </el-avatar>
                <p>{{ user?.name || 'User' }}</p>
            </div>
            <button @click="handleLogout" class="flex items-center gap-2 hover:bg-gray-100 px-5 py-2">
                <img src="/src/assets/images/logout.svg"/>
                退出
            </button>
        </div>
    </div>
</template>
