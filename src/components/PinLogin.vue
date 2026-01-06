<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {ElMessage} from 'element-plus'

const router = useRouter();
const emit = defineEmits(['success'])
const pin = ref(["", "", "", "", "", ""]);

const handleChange = (value, index) => {
    if (value.length > 1) return;
    pin.value[index] = value;

    if (value && index < 5) {
        document.getElementById(`pin-${index + 1}`)?.focus();
    }
};

const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin.value[index] && index > 0) {
        pin.value[index - 1] = "";
        document.getElementById(`pin-${index - 1}`)?.focus();
    }
};

const handleSubmit = async() => {
    const enteredPin = pin.value.join("");

     try {
    const res = await fetch('https://backend-server-o6mn.onrender.com/pin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pin: enteredPin })
    });

    if (!res.ok) {
      ElMessage.error('PIN 错误');
      return;
    }

    const data = await res.json()
    const token =  res.headers.get('authorization');
console.log(data)
    if (token) {
      localStorage.setItem("dashboard_user", JSON.stringify(data.user));
      localStorage.setItem('dashboard_token', token);
      localStorage.setItem('dashboard_pin_verified', 'true');
      emit('success')
    }

  } catch (err) {
    console.log(err)
    ElMessage.error('登录失败');
  }


};

const handleCancel = () => {
    pin.value = ["", "", "", "", "", ""];
    router.push("/");
};
</script>

<template>
    <div class="w-full flex justify-center md:items-center px-4 py-10 mt-[50%] md:mt-0">
        <div class="bg-white w-full max-w-md sm:max-w-lg
             p-6 sm:p-12
             rounded-3xl sm:rounded-[59px]
             shadow-md flex flex-col items-center">
            <img src="/src/assets/images/unlock-icon.svg" class="w-20 h-20 sm:w-32 sm:h-32" />

            <p class="font-medium text-lg sm:text-xl mt-4">请输入密码</p>

            <div class="flex gap-2 sm:gap-3 justify-center mt-8 sm:mt-12 mb-6">
                <input type="password" v-for="(digit, i) in pin" :key="i" :id="`pin-${i}`" maxlength="1" :value="digit"
                    @input="handleChange($event.target.value, i)" @keydown="handleKeyDown($event, i)" class="w-10 h-12 sm:w-16 sm:h-20
                 border text-center text-lg sm:text-2xl
                 rounded-lg sm:rounded-xl" />
            </div>

            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full mt-6 sm:mt-10">
                <button @click="handleCancel"
                    class="w-full sm:w-68 bg-[#95DBFF] text-white py-3 sm:py-5 rounded-lg sm:rounded-xl">
                    取 消
                </button>

                <button @click="handleSubmit"
                    class="w-full sm:w-68 bg-[#22B4FF] text-white py-3 sm:py-5 rounded-lg sm:rounded-xl">
                    解 锁
                </button>
            </div>
        </div>
    </div>
</template>
