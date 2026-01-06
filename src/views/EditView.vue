<template>
  <div class="bg-[#F7F8FC] p-5 w-full">
    <div class="bg-white p-4 rounded-lg mb-5">
      <div>
        <div class="bg-white m-4 rounded-lg p-8">
          <div class="max-w-4xl mx-auto">

            <div class="flex items-center gap-2 mb-10">
              <span class="w-1 h-5 bg-[#22B4FF]" />
              <h1 class="font-semibold text-lg">产品编辑</h1>
            </div>

            <form class="space-y-6">

              <div class="flex justify-between gap-30">
                <div class="flex-1 flex gap-4">
                  <label class="whitespace-nowrap font-medium">*产品名称</label>
                  <el-input v-model="form.productName" placeholder="请输入作品名称" />
                </div>

                <div class="flex-1 flex gap-4">
                  <label class="whitespace-nowrap font-medium">*产品分类</label>
                  <el-select v-model="form.productCategory" placeholder="请选择作品分类">
                    <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </div>


              <div class="flex gap-4 mt-7">
                <label class="pt-2 whitespace-nowrap font-medium">*产品描述</label>
                <el-input type="textarea" v-model="form.productDescription" rows="5" />
              </div>


              <div>
                <label class="block mb-3 font-medium">上传封面</label>

                <div class="relative w-1/3 aspect-4/3 border rounded-lg overflow-hidden">
                  <input id="cover" type="file" hidden accept="image/*" @change="handleCoverChange" />

                  <template v-if="coverPreview">
                    <img :src="coverPreview" class="absolute inset-0 w-full h-full object-cover" />

                    <label for="cover" class="absolute inset-0 flex flex-col items-center justify-center
               bg-black/25 cursor-pointer">
                      <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow">
                        <PencilIcon class="w-6 h-6 text-gray-600" />
                      </div>
                      <p class="mt-2 text-white text-sm">修改封面</p>
                    </label>
                  </template>
                  <label v-else for="cover"
                    class="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    <Plus class="w-10 h-10 text-gray-400" />
                    <p class="mt-2 text-gray-500">上传产品封面</p>
                  </label>
                </div>
              </div>

              <div class="mt-8">
                <div class="flex gap-4 items-center mb-8">
                  <p class="font-medium">上传图片</p>
                  <p class="text-[#636363]">单个文件最大支持10M，支持jpg\png</p>
                </div>

                <el-button @click="imageInputRef?.click()" type="primary" size="large" class="px-20!">
                  <input ref="imageInputRef" type="file" hidden id="images" multiple accept="image/*"
                    @change="handleImagesChange" />
                  <label for="images">点击上传</label>
                </el-button>

                <div class="flex gap-3 mt-4">
                  <div v-for="(img, i) in imagePreviews" :key="i" class="relative">
                    <img :src="img.url" class="h-24 w-24 object-cover" />
                    <button @click="removeImage(i)" type="button"
                      class="absolute -top-2 -right-2 bg-[#C1C7D0] rounded-full ">
                      <X class="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>

              </div>


              <div>

                <div class="flex gap-4 items-center my-5">
                  <p class="font-medium">上传文档</p>
                  <p class="text-[#636363]">PDF格式10M以内</p>
                </div>
                <el-button @click="pdfInputRef?.click()" type="primary" size="large" class="px-20!">
                  <input ref="pdfInputRef" type="file" hidden id="pdf" multiple accept=".pdf"
                    @change="handlePdfChange" />
                  <label for="pdf">点击上传</label>
                </el-button>
                <div class="mt-4 space-y-2">
                  <div v-for="(pdf, i) in pdfPreviews" :key="i" class="flex items-center gap-30">
                    <div class="flex items-center gap-3 w-1/2">
                      <img src="/src/assets/images/PDF-icon.svg" class="h-15 w-15" />
                      <p class="font-medium">{{ pdf.name }}</p>
                    </div>
                    <button @click="removePdf(i)" type="button" class=" bg-[#C1C7D0] rounded-full p-1 ">
                      <X class="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>

              </div>


              <div class="mt-8">
                <label class="pt-2 whitespace-nowrap font-medium ">上传链接</label>
                <div class="my-3 space-y-1">
                  <div v-for="(l, i) in savedLinks" :key="i" class="flex items-center gap-30 w-1/3 mb-5">
                    <p class="font-medium w-1/2 overflow-hidden">{{ l }}</p>
                    <button @click="removeLink(i)" type="button" class="bg-[#C1C7D0] rounded-full p-1">
                      <X class="h-4 w-4" />
                    </button>
                  </div>
                  <div class="flex gap-4">
                    <el-input v-model="form.linksInput" placeholder="请输入或粘贴你要上传的链接" class="custom-input" />
                    <el-button type="primary" size="large" @click="saveLink" class="px-6 py-2">
                      保存
                    </el-button>
                  </div>


                </div>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
    <div class="w-full flex justify-end">
      <el-button type="primary" size="large" @click="onSubmit">更新</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { PencilIcon, Plus, X } from "lucide-vue-next";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { toRaw } from "vue";


const router = useRouter()
const route = useRoute()
const productId = route.params.id


/* ---------- form state ---------- */
const form = reactive({
  productName: "",
  productCategory: "",
  productDescription: "",
  coverImage: null,
  linksInput: "",
});

/* ---------- previews ---------- */
const coverPreview = ref("");
const imagePreviews = ref([]);
const pdfPreviews = ref([]);
const savedLinks = ref([]);
const imageInputRef = ref(null)
const pdfInputRef = ref(null)


const fetchProducts = async () => {

  try {

    const res = await fetch(`https://backend-server-o6mn.onrender.com/products/${productId}`)
    const data = await res.json()

    form.productName = data.name
    form.productCategory = data.category
    form.productDescription = data.description

    coverPreview.value = data.thmbnl
    imagePreviews.value = data.images.map((url) => ({ url, file: null }));
    pdfPreviews.value = data.documents
    savedLinks.value = data.contacts

    console.log(data)


  }
  catch (err) {
    console.log(err, ' failed to fetch product data in edit')
  }

}


const categories = [
  { value: "display", label: "展示类型" },
  { value: "ecommerce", label: "电子商务" },
  { value: "oa", label: "OA" },
  { value: "inventory", label: "库存管理" },
  { value: "multi-vendor", label: "多供应商电子商务" },
  { value: "service", label: "服务" },
  { value: "social", label: "社交媒体" },
  { value: "other", label: "其他" },
];

/* ---------- category map ---------- */
const categoryMap = {
  display: "展示类型",
  ecommerce: "电子商务",
  oa: "OA",
  inventory: "库存管理",
  "multi-vendor": "多供应商电子商务",
  service: "服务",
  social: "社交媒体",
  other: "其他",
};

/* ---------- submit ---------- */
const onSubmit = async () => {
  const formData = new FormData();

  /* ---------- BASIC FIELDS ---------- */
  formData.append("name", form.productName);
  formData.append("categoryId", form.productCategory);
  formData.append(
    "category",
    categoryMap[form.productCategory] || "其他"
  );
  formData.append("description", form.productDescription);
  formData.append(
    "date",
    new Date().toISOString().split("T")[0]
  );

  /* ---------- COVER ---------- */
  if (form.coverImage) {
    formData.append("cover", form.coverImage);
  }

  /* ---------- IMAGES ---------- */
  const existingImages = [];
  imagePreviews.value.forEach((img) => {
    if (img.file) {
      // new image
      formData.append("images", img.file);
    } else if (img.url) {
      // existing image
      existingImages.push(img.url);
    }
  });

  formData.append(
    "existingImages",
    JSON.stringify(existingImages)
  );

  /* ---------- DOCUMENTS ---------- */
  const existingDocuments = [];
  pdfPreviews.value.forEach((pdf) => {
    if (pdf.file) {
      formData.append("documents", pdf.file);
    } else {
      existingDocuments.push({
        name: pdf.name,
        url: pdf.url,
      });
    }
  });

  formData.append(
    "existingDocuments",
    JSON.stringify(existingDocuments)
  );

  /* ---------- CONTACTS ---------- */
  formData.append(
    "contacts",
    JSON.stringify(toRaw(savedLinks.value))
  );

  /* ---------- REQUEST ---------- */
  const res = await fetch(
    `https://backend-server-o6mn.onrender.com/products/${productId}`,
    {
      method: "PUT",
      body: formData,
    }
  );

  if (res.ok) {
    ElMessage.success("产品更新成功");
    router.push("/");
  }
};


/* ---------- cover ---------- */
const handleCoverChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  form.coverImage = file;
  const reader = new FileReader();
  reader.onload = () => (coverPreview.value = reader.result);
  reader.readAsDataURL(file);
};

/* ---------- images ---------- */
const handleImagesChange = (e) => {
  const files = Array.from(e.target.files || []);
  files.forEach((file) => {
    if (file.size > 20 * 1024 * 1024) {
      alert(`${file.name} exceeds 20MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      imagePreviews.value.push({ url: reader.result, file });
    reader.readAsDataURL(file);
  });
};

const removeImage = (idx) => {
  imagePreviews.value.splice(idx, 1);
};

/* ---------- pdfs ---------- */
const handlePdfChange = (e) => {
  const files = Array.from(e.target.files || []);
  files.forEach((file) => {
    pdfPreviews.value.push({ name: file.name, file });
  });
};

const removePdf = (idx) => {
  pdfPreviews.value.splice(idx, 1);
};

/* ---------- links ---------- */
const saveLink = () => {
  if (!form.linksInput) return;
  savedLinks.value.push(form.linksInput);
  form.linksInput = "";
};

const removeLink = (idx) => {
  savedLinks.value.splice(idx, 1);
};


onMounted(() => {
  fetchProducts()
})

</script>

<style scoped>
.custom-input :deep(.el-input__wrapper) {
  background-color: #F3F8FE;
  box-shadow: none;
  padding-top: 3px;
  padding-bottom: 3px;
}

.custom-input :deep(.el-input__inner) {
  background-color: transparent;
}
</style>
