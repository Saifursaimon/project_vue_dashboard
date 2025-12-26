<template>
    <div class="bg-[#F7F8FC] p-5 w-full">
        <div class="bg-white p-4 rounded-lg mb-10">
            <div class="flex items-center justify-between mb-7">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-[#22B4FF]" />
                    <p className="font-semibold text-lg">产品管理</p>
                </div>
                <div class="flex items-center  gap-2">
                    <div>
                        <el-select v-model="selectedCategory" @change="changeCategory" placeholder="选择分类" clearable
                            style="margin-bottom: 15px">
                            <el-option v-for="cat in categories" :key="cat.id" :label="cat.name_zh" :value="cat.id" />
                        </el-select>
                    </div>
                    <el-button type="primary" size="large">
                        <img src="/src/assets/images/add-icon.svg" />
                        创建作品
                    </el-button>
                </div>
            </div>
            <div>
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="name" label="产品名称" />

                    <el-table-column label="上传时间">
                        <template #default="{ row }">
                            {{ row.date }}
                        </template>
                    </el-table-column>

                    <!-- 产品分类 -->
                    <el-table-column label="产品分类">
                        <template #default="{ row }">

                            {{ row.category }}

                        </template>
                    </el-table-column>

                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button type="primary" link>查看</el-button>
                            <el-button type="warning" link>编辑</el-button>
                            <el-button type="danger" link @click="handleDelete(row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="flex justify-center items-center gap-2 mt-6 text-sm">
                    <button v-for="p in totalPages" :key="p" @click="page = p" class="px-3 py-1 rounded" :class="page === p
                        ? 'bg-[#22B4FF] text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                        ">
                        {{ p }}
                    </button>
                    <el-button size="large" type="primary" link @click="nextPage" :disabled="!hasNext">下一页</el-button>
                </div>
            </div>
        </div>
        <div class="bg-white p-4 rounded-lg ">
            <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-[#22B4FF]" />
                <p className="font-semibold text-lg">最近上传</p>
            </div>
            <div class=" grid grid-cols-1 md:grid-cols-3 gap-5  mt-7">
                <ProductCard v-for="product in products" :key="product.id" :p="product" />
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed, ref } from 'vue';
import ProductsData from '/src/products.json'
import categories from '/src/categories.json'
import ProductCard from '@/components/ProductCard.vue';


const PAGE_SIZE = 6

const tableData = ref(ProductsData)
const selectedCategory = ref("all")
const page = ref(1)



const filteredData = computed(() => {
    if (selectedCategory.value === "all") return tableData.value
    return tableData.value.filter(
        (p) => p.categoryId === selectedCategory.value
    )
})


const totalPages = computed(() =>
    Math.ceil(filteredData.value.length / PAGE_SIZE)
)

const list = computed(() => {
    const start = (page.value - 1) * PAGE_SIZE
    return filteredData.value.slice(start, start + PAGE_SIZE)
})

const hasNext = computed(() => page.value < totalPages.value)

const nextPage = () => {
    if (hasNext.value) page.value++
}

const changeCategory = (value) => {
    selectedCategory.value = value
    page.value = 1
}



const handleDelete = (row) => {
    ElMessageBox.confirm(
        `确定要删除「${row.name}」吗？`,
        '警告',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            tableData.value = tableData.value.filter(
                (item) => item.id !== row.id
            )
            ElMessage.success('删除成功')
        })
        .catch(() => { })
}

const products = computed(() => {
    return ProductsData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
})

</script>
