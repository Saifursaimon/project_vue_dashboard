<template>
  <div class="space-y-5 p-5">
    <!-- RECORD LIST -->
    <div v-for="record in records" :key="record.id" class="bg-white rounded-xl px-6 py-7
             flex flex-col md:flex-row
             md:items-center md:justify-between
             gap-4 shadow-sm">
      <!-- Left -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900">
          {{ record.basicInfo?.companyName || "未填写公司名称" }}
        </h2>

        <div class="flex flex-wrap gap-6 mt-2 text-sm text-gray-500">
          <span>
            洽谈编号：
            <span class="text-gray-700"> {{ formatRecordId(record) }}</span>
          </span>

          <span>
            洽谈时间：
            <span class="text-gray-700">
              {{ formatDate(record.createdAt) }}
            </span>
          </span>
        </div>
      </div>

      <!-- Right buttons -->
      <div class="flex gap-3 justify-end">

        <el-button size="large" type="success" plain @click="downloadPDF(record.id)">
          下载
        </el-button>
      </div>
    </div>



  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const records = ref([]);
const loading = ref(false);




const formatRecordId = (record) => {
  if (!record || !record.id || !record.createdAt) return "-";

  const date = new Date(record.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const id = String(record.id).padStart(3, "0"); // 3-digit padding

  return `DH-${year}${month}${id}`;
};

/* ---------- FETCH RECORDS ---------- */
const fetchRecords = async () => {
  loading.value = true;
  try {
    const res = await fetch("https://backend-server-o6mn.onrender.com/records");
    const data = await res.json();

    // backend already sends DESC, but safe sort
    records.value = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } catch (err) {
    console.error("Failed to load records", err);
  } finally {
    loading.value = false;
  }
};

/* ---------- HELPERS ---------- */
const formatDate = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};




const downloadPDF = async (id) => {
  router.push(`/records/info/${id}?download=1`)
};


onMounted(fetchRecords);
</script>
