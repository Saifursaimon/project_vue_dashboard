<template>
    <div class="bg-[#F7F8FC] p-5 w-full">
        <div class="bg-white p-4 rounded-lg mb-5">
            <div>
                <div class="bg-white m-4 rounded-lg p-8">
                    <div class="max-w-4xl mx-auto">

                        <!-- header -->
                        <div class="flex items-center gap-2 mb-10">
                            <span class="w-1 h-5 bg-[#22B4FF]" />
                            <h1 class="font-semibold text-lg">产品管理</h1>
                        </div>

                        <form class="space-y-6">
                            <!-- name + category -->
                            <div class="flex justify-between gap-4">
                                <div class="flex-1 flex gap-4">
                                    <label class="whitespace-nowrap font-medium">*产品名称</label>
                                    <el-input v-model="form.productName" placeholder="请输入作品名称" />
                                </div>

                                <div class="flex-1 flex gap-4">
                                    <label class="whitespace-nowrap font-medium">*产品分类</label>
                                    <el-select v-model="form.productCategory" placeholder="请选择作品分类">
                                        <el-option value="">请选择</el-option>
                                        <el-option value="display">展示类型</el-option>
                                        <el-option value="ecommerce">电子商务</el-option>
                                        <el-option value="oa">OA</el-option>
                                        <el-option value="inventory">库存管理</el-option>
                                        <el-option value="multi-vendor">多供应商电子商务</el-option>
                                        <el-option value="service">服务</el-option>
                                        <el-option value="social">社交媒体</el-option>
                                        <el-option value="other">其他</el-option>
                                    </el-select>
                                </div>
                            </div>

                            <!-- description -->
                            <div class="flex gap-4">
                                <label class="pt-2 whitespace-nowrap font-medium">*产品描述</label>
                                <el-input type="textarea" v-model="form.productDescription" rows="5" />
                            </div>

                            <!-- cover -->
                            <div>
                                <label class="block mb-3 font-medium">上传封面</label>
                                <div class="w-1/4 border-2 rounded-lg p-6 text-center">
                                    <input type="file" hidden id="cover" accept="image/*" @change="handleCoverChange" />
                                    <label for="cover" class="cursor-pointer">
                                        <img v-if="coverPreview" :src="coverPreview" class="rounded-lg" />
                                        <div v-else>
                                            <Plus class="mx-auto h-12 w-12 text-gray-400" />
                                            <p class="mt-2">上传产品封面</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <!-- images -->
                            <div>
                                <div class="flex gap-4 items-center my-5">
                                    <p class="font-medium">上传图片</p>
                                    <p class="text-[#636363]">单个文件最大支持20M，支持jpg\png</p>
                                </div>
                                <div class="flex gap-3 mt-4">
                                    <div v-for="(img, i) in imagePreviews" :key="i" class="relative">
                                        <img :src="img.url" class="h-24 w-24 rounded-lg object-cover" />
                                        <button @click="removeImage(i)" type="button"
                                            class="absolute -top-2 -right-2 bg-white rounded-full p-1">
                                            <X class="h-4 w-4 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                                <el-button type="primary" size="large" class="px-20!">
                                    <input type="file" hidden id="images" multiple accept="image/*"
                                        @change="handleImagesChange" />
                                    <label for="images">点击上传</label>
                                </el-button>

                                
                            </div>

                            <!-- pdf -->
                            <div>
                                <div class="mt-4 space-y-2">
                                    <div v-for="(pdf, i) in pdfPreviews" :key="i" class="flex justify-between w-1/3">
                                        <p>{{ pdf.name }}</p>
                                        <button @click="removePdf(i)" type="button">
                                            <X class="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <div class="flex gap-4 items-center my-5">
                                    <p class="font-medium">上传文档</p>
                                    <p class="text-[#636363]">PDF格式20M以内</p>
                                </div>
                                <el-button type="primary" size="large" class="px-20!">
                                    <input type="file" hidden id="pdf" multiple accept=".pdf"
                                        @change="handlePdfChange" />
                                    <label for="pdf">点击上传</label>
                                </el-button>

                                
                            </div>

                            <!-- links -->
                            <div>
                                <label class="pt-2 whitespace-nowrap font-medium ">上传链接</label>
                                <div class="my-3 space-y-1">
                                    <div v-for="(l, i) in savedLinks" :key="i" class="flex justify-between w-1/3">
                                        <span>{{ l }}</span>
                                        <button @click="removeLink(i)" type="button">
                                            <X class="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div class="flex gap-4">
                                        <el-input v-model="form.linksInput" placeholder="请输入或粘贴你要上传的链接"
                                            class="custom-input" />
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
            <el-button type="primary" size="large" @click="onSubmit">上传</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Plus, X } from "lucide-vue-next";

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
const onSubmit = () => {
    const finalData = {
        name: form.productName,
        categoryId: form.productCategory,
        category: categoryMap[form.productCategory] || "其他",
        description: form.productDescription,
        date: new Date().toISOString().split("T")[0],
        coverImage: form.coverImage,
        images: imagePreviews.value.map(i => i.file),
        documents: pdfPreviews.value.map(p => p.file),
        contacts: savedLinks.value,
    };

    console.log("SUBMIT DATA 👉", finalData);
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