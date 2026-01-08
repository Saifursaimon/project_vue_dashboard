<template>
  <div class="bg-[#F7F8FC] p-5 max-w-full overflow-x-hidden">
    <!-- PRODUCTS TABLE -->
    <div class="bg-white p-4 rounded-lg mb-10">
      <div class="flex flex-col md:flex-row md:items-center gap-8 md:gap-0 justify-between mb-7">
        <div class="flex items-center gap-2">
          <div class="w-1 h-5 bg-[#22B4FF]" />
          <p class="font-semibold text-lg whitespace-nowrap">产品管理</p>
        </div>

       <div class="flex items-center  gap-2">
          <div>
            <el-select v-model="selectedCategory" @change="changeCategory" placeholder="选择分类" clearable
              class="custom-select">
              <el-option v-for="cat in categories" :key="cat.id" :label="cat.name_zh" :value="cat.id" />
            </el-select>
          </div>
          <el-button @click="router.push('/create')" type="primary" size="large">
            <img src="/images/add-icon.svg" />
            创建作品
          </el-button>
        </div>
      </div>

      <el-table :data="list" table-layout="fixed">
        <el-table-column prop="name" label="产品名称" />

        <el-table-column label="上传时间">
          <template #default="{ row }">
            {{ row.date }}
          </template>
        </el-table-column>

        <el-table-column label="产品分类">
          <template #default="{ row }">
            {{ row.category }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template  #default="{ row }">
            <div class="flex flex-col md:flex-row justify-center items-center gap-2">
              <RouterLink :to="`/products/${row.id}`">
              <el-button link>查看</el-button>
            </RouterLink>

            <RouterLink :to="`/edit/${row.id}`">
              <el-button link>编辑</el-button>
            </RouterLink>

            <el-button link @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- PAGINATION -->
      <div class="flex justify-center items-center gap-2 mt-6 text-sm">
        <button
          v-for="p in totalPages"
          :key="p"
          @click="page = p"
          class="px-3 py-1 rounded"
          :class="page === p
            ? 'bg-[#22B4FF] text-white'
            : 'bg-gray-200 hover:bg-gray-300'"
        >
          {{ p }}
        </button>

        <el-button
          size="large"
          type="primary"
          link
          @click="nextPage"
          :disabled="!hasNext"
        >
          下一页
        </el-button>
      </div>
    </div>

    <!-- LATEST PRODUCTS -->
    <div class="bg-white p-4 rounded-lg">
      <div class="flex items-center gap-2">
        <div class="w-1 h-5 bg-[#22B4FF]" />
        <p class="font-semibold text-lg">最近上传</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        <ProductCard
          v-for="product in latestProducts"
          :key="product.id"
          :p="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import ProductCard from '@/components/ProductCard.vue'

const PAGE_SIZE = 6

const router = useRouter()
const tableData = ref([])
const selectedCategory = ref('all')
const page = ref(1)

const categories = ref([
  { id: 'all', name_zh: '全部' },
  { id: 'display', name_zh: '展示类型' },
  { id: 'ecommerce', name_zh: '电子商务' },
  { id: 'oa', name_zh: 'OA' },
  { id: 'inventory', name_zh: '库存管理' },
  { id: 'multi-vendor', name_zh: '多供应商电子商务' },
  { id: 'service', name_zh: '服务' },
  { id: 'social', name_zh: '社交媒体' },
  { id: 'other', name_zh: '其他' }
])

/* ---------------- FETCH ---------------- */
const fetchProducts = async () => {
  try {
    const res = await fetch('https://backend-server-o6mn.onrender.com/products')
    tableData.value = await res.json()
  } catch (err) {
    ElMessage.error('获取产品失败')
    console.error(err)
  }
}

/* ---------------- SORT (LATEST → OLDEST) ---------------- */
const sortedData = computed(() => {
  return [...tableData.value].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
})

/* ---------------- FILTER ---------------- */
const filteredData = computed(() => {
  if (selectedCategory.value === 'all') return sortedData.value
  return sortedData.value.filter(
    p => p.categoryId === selectedCategory.value
  )
})

/* ---------------- PAGINATION ---------------- */
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

const changeCategory = () => {
  page.value = 1
}

/* ---------------- DELETE ---------------- */
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除「${row.name}」吗？`,
      '警告',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const res = await fetch(
      `https://backend-server-o6mn.onrender.com/products/${row.id}`,
      { method: 'DELETE' }
    )

    if (res.ok) {
      tableData.value = tableData.value.filter(p => p.id !== row.id)
      ElMessage.success('删除成功')
    } else {
      ElMessage.error('删除失败')
    }
  } catch (err) {
    if (err !== 'cancel') ElMessage.error('删除失败')
  }
}

/* ---------------- LATEST 3 CARDS ---------------- */
const latestProducts = computed(() =>
  sortedData.value.slice(0, 3)
)

onMounted(fetchProducts)
</script>

<style scoped>
.custom-select :deep(.el-select__wrapper) {
  background-color: #F3F8FE;
  padding: 8px 16px;
  width: 145px;
}

.custom-select :deep(.el-select__selected-item) {
  color: #22B4FF;
}

:deep(.el-table__cell) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
