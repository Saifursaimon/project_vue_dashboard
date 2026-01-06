<template>
  <div class=" bg-[#F7F8FC] p-5 w-full">

    <p v-if="loading" class="mt-10 text-center">Loading...</p>


    <div v-else-if="state.product">

      <div>
        <h1 class="font-medium text-4xl">{{ state.product.name }}</h1>
        <p class="mt-8">{{ state.product.description }}</p>
      </div>


      <div class="mt-6 space-y-8">
        <div v-for="(img, index) in state.product.images?.length
          ? state.product.images
          : ['/images/image-placeholder.svg']" :key="index" class="relative w-full md:h-161">
          <img :src="img || '/images/image-placeholder.svg'" :alt="state.product.name"
            class="w-full h-full object-cover" />
        </div>
      </div>


      <div class="mt-12">
        <div v-for="(d, index) in state.product.documents" :key="index" class="mb-8 flex items-center justify-between">
          <div class="flex items-center gap-11">
            <img src="/images/PDF-icon.svg" alt="pdf" class="w-13 h-13 md:w-23 md:h-23" />
            <p class="font-medium text-lg">{{ d.name }}</p>
          </div>

          <a :href="d.url" target="_blank"
            class="w-16 md:w-26 h-6 md:h-11 whitespace-nowrap bg-[#22B4FF] rounded-full font-medium text-white text-base md:text-2xl px-10 py-3 flex items-center justify-center">
            查看
          </a>
        </div>
      </div>


      <div class=" mt-12 flex items-start gap-10">
        <p class="font-medium text-lg">链接地址:</p>
        <div class="flex flex-col gap-6">
          <a v-for="(c, i) in state.product.contacts" :key="i" :href="c.startsWith('http') ? c : `https://${c}`"
            target="blank" class=" text-lg underline underline-offset-6 decoration-2 decoration-[#2368F0]">
            {{ c }}
          </a>
        </div>
      </div>
    </div>


    <p v-else class="text-center mt-10">state.product not found</p>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()


const state = reactive({
  product: {},
  isLoading: true
})


const fetchProduct = async () => {
 try {
    const productId = route.params.id
    const res = await fetch(`https://backend-server-o6mn.onrender.com/products/${productId}`)
    const data = await res.json()
    state.product = data
    state.isLoading = false
  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
fetchProduct()
})
</script>
