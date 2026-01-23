<template>
  <div v-if="isLoading">
    <ElLoading />
  </div>
  <div v-else ref="pdfRef" class="pdf-page bg-white text-black mx-auto">

    <h1 class="text-center text-5xl font-semibold">洽谈记录</h1>
    <p class="text-xl text-right mt-6">洽谈编号：{{ formatRecordId(record) }}</p>

    <div v-if="record" class="mt-10">
      <div>
        <h3 class="text-2xl font-medium whitespace-nowrap underline">基础信息</h3>
        <div class="mt-5 space-y-5">
          <div class="space-y-3">
            <div class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label">类型:</h4>
              <p class="text-lg">{{ record?.basicInfo?.type }}</p>
            </div>
            <div v-if="record.basicInfo.companyName" class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label">公司名称:</h4>
              <p class="text-lg">{{ record?.basicInfo?.companyName }}</p>
            </div>
            <div v-if="record.basicInfo.personalName" class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label">个人姓名:</h4>
              <p class="text-lg">{{ record?.basicInfo?.personalName }}</p>
            </div>
            <div v-if="record?.basicInfo?.department?.value !== '其他'" class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label">部门:</h4>
              <p class="text-lg">{{ record?.basicInfo?.department?.value }}</p>
            </div>
            <div v-if="record?.basicInfo?.department?.value === '其他'" class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label">部门:</h4>
              <p class="text-lg">{{ record?.basicInfo?.department?.otherText }}</p>
            </div>
            <div v-if="record?.basicInfo?.remark" class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label">备注:</h4>
              <p class="text-lg">{{ record?.basicInfo?.remark }}</p>
            </div>
            <div v-if="record?.basicInfo?.contactPerson" class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label ">核心对接人:</h4>
              <div class="mt-5 space-y-3">
                <div v-if="record?.basicInfo?.contactPerson.name" class="flex items-start gap-10">
                  <h4 class="text-lg font-medium whitespace-nowrap ">姓名:</h4>
                  <p class="text-lg">{{ record?.basicInfo?.contactPerson?.name }}</p>
                </div>
                <div v-if="record?.basicInfo?.contactPerson.position" class="flex items-start gap-10">
                  <h4 class="text-lg font-medium whitespace-nowrap ">职务:</h4>
                  <p class="text-lg">{{ record?.basicInfo?.contactPerson?.position }}</p>
                </div>
                <div v-if="record?.basicInfo?.contactPerson.phone" class="flex items-start gap-10">
                  <h4 class="text-lg font-medium whitespace-nowrap ">电话:</h4>
                  <p class="text-lg">{{ record?.basicInfo?.contactPerson?.phone }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-3">
            <div v-if="record?.basicInfo?.collab?.firstTime" class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label">合作背景:</h4>
              <p>首次合作</p>
            </div>
            <div v-if="record?.basicInfo?.collab?.repeat" class="flex items-start gap-10">
              <p>复购</p>
              <div class="flex items-start gap-5">
                <h4 class="text-lg font-medium whitespace-nowrap ">历史项目:</h4>
                <p v-if="record?.basicInfo?.collab?.projectHistory">
                  {{ record?.basicInfo?.collab?.projectHistory }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <div v-if="record?.basicInfo?.discussionPlatform?.companyOffice" class="flex items-start gap-10">
              <h4 class="text-lg font-medium whitespace-nowrap label">洽谈方式:</h4>
              <p v-if="record?.basicInfo?.discussionPlatform?.companyOffice" class="text-lg">
                公司办公室
              </p>
              <p v-if="record?.basicInfo?.discussionPlatform?.clientOffice" class="text-lg">
                客户办公室
              </p>
              <p v-if="record?.basicInfo?.discussionPlatform?.videoCall" class="text-lg">
                远程视频
              </p>
              <p v-if="record?.basicInfo?.discussionPlatform?.other" class="text-lg">
                {{ record?.basicInfo?.discussionPlatform?.otherText }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <h3 class="text-2xl font-medium underline">核心需求明细</h3>
        <div class="mt-5 space-y-3">
          <div v-if="record?.coreNeeds?.reason" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">开发的背景或原因:</h4>
            <p class="text-lg">{{ record?.coreNeeds?.reason }}</p>
          </div>
          <div v-if="record?.coreNeeds?.objective" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">核心目标:</h4>
            <p class="text-lg text-wrap">{{ record?.coreNeeds?.objective }}</p>
          </div>
          <div v-if="record?.coreNeeds?.userGoal" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">用户目标:</h4>
            <p class="text-lg">{{ record?.coreNeeds?.userGoal }}</p>
          </div>
          <div v-if="record?.coreNeeds?.projectName" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">项目/产品名称:</h4>
            <div class="space-y-3">
              <div class="flex items-start gap-5">
                <p class="text-lg font-semibold whitespace-nowrap">暂定名称:</p>
                <p class="text-lg">{{ record?.coreNeeds?.projectName.provisionalName }}</p>
              </div>
              <div class="flex items-start gap-5">
                <p class="text-lg font-semibold whitespace-nowrap">正式名称:</p>
                <p class="text-lg">{{ record?.coreNeeds?.projectName.officialName }}</p>
              </div>
            </div>
          </div>
          <div v-if="record?.coreNeeds?.referenceApp" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">参考软件/APP:</h4>
            <p class="text-lg">{{ record?.coreNeeds?.referenceApp }}</p>
          </div>
          <div v-if="record?.coreNeeds?.coreFunctions" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">项目/产品核心功能：</h4>
            <p class="text-lg">{{ record?.coreNeeds?.coreFunctions }}</p>
          </div>
          <div v-if="record?.coreNeeds?.developmentEcosystem" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">计划开发生态：</h4>
            <p v-if="record?.coreNeeds?.developmentEcosystem.web" class="text-lg">Web端</p>
            <p v-if="record?.coreNeeds?.developmentEcosystem.ios" class="text-lg">IOS移动端</p>
            <p v-if="record?.coreNeeds?.developmentEcosystem.android" class="text-lg">安卓移动端</p>
            <p v-if="record?.coreNeeds?.developmentEcosystem.wechatMiniProgram" class="text-lg">
              微信小程序
            </p>
            <p v-if="record?.coreNeeds?.developmentEcosystem.wechatOfficialAccount" class="text-lg">
              公众号
            </p>
          </div>
          <div v-if="record?.coreNeeds?.pageStyle" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">页面风格:</h4>
            <div class="space-y-3">
              <p v-if="record?.coreNeeds?.pageStyle.companySpecific" class="text-lg">
                公司或产品专属的UI或色彩要求
              </p>
              <p v-if="record?.coreNeeds?.pageStyle.other" class="text-lg">
                {{ record?.coreNeeds?.pageStyle?.otherText }}
              </p>
            </div>
          </div>
          <div v-if="record?.coreNeeds?.riskAvoidance" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">风险规避:</h4>
            <p class="text-lg">{{ record?.coreNeeds?.riskAvoidance }}</p>
          </div>
          <div v-if="record?.coreNeeds?.technicalPreferences?.domainAndServer" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">域名及服务器:</h4>
            <p class="text-lg">{{ record?.coreNeeds?.technicalPreferences?.domainAndServer }}</p>
          </div>
          <div v-if="record?.coreNeeds?.technicalPreferences?.techStack" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">技术偏好:</h4>
            <p class="text-lg">{{ record?.coreNeeds?.technicalPreferences?.techStack }}</p>
          </div>
          <div v-if="record?.coreNeeds?.technicalPreferences?.systemIntegration" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">现有系统集成:</h4>
            <p class="text-lg">{{ record?.coreNeeds?.technicalPreferences?.systemIntegration }}</p>
          </div>
          <div v-if="record?.coreNeeds?.technicalPreferences?.other" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">其他内容:</h4>
            <p class="text-lg">{{ record?.coreNeeds?.technicalPreferences?.other }}</p>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <h3 class="text-2xl font-medium underline">项目约束与期望</h3>
        <div class="mt-5 space-y-3">
          <div v-if="record?.projectConstraints?.date" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">期望上线时间:</h4>
            <p class="text-lg">
              {{
                `${record?.projectConstraints?.date?.year}年 ${record?.projectConstraints?.date?.month}月
              ${record?.projectConstraints?.date?.day}日`
              }}
            </p>
          </div>
          <div v-if="record?.projectConstraints?.budgetControll" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">预算管控:</h4>
            <p class="text-lg">
              {{ record?.projectConstraints?.budgetControll }}
            </p>
          </div>
          <div v-if="record?.projectConstraints?.other" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">其他内容:</h4>
            <p class="text-lg">
              {{ record?.projectConstraints?.other }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <h3 class="text-2xl font-medium underline">特殊需求与问题跟进</h3>
        <div class="mt-5 space-y-3">
          <div v-if="record?.specialNeeds?.customerRequirements" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">客户特殊需求:</h4>
            <p class="text-lg">{{ record?.specialNeeds?.customerRequirements }}</p>
          </div>
          <div v-if="record?.specialNeeds?.negotiationIssues" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">洽谈遗留问题:</h4>
            <p class="text-lg">{{ record?.specialNeeds?.negotiationIssues }}</p>
          </div>
          <div v-if="record?.specialNeeds?.potentialRisks" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">潜在风险点:</h4>
            <p class="text-lg">{{ record?.specialNeeds?.potentialRisks }}</p>
          </div>
          <div v-if="record?.specialNeeds?.internalFollowUp" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">内部跟进:</h4>
            <p class="text-lg">{{ record?.specialNeeds?.internalFollowUp }}</p>
          </div>
          <div v-if="record?.specialNeeds?.recorder" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">记录人:</h4>
            <p class="text-lg">{{ record?.specialNeeds?.recorder.name }}</p>
          </div>
          <div v-if="record?.specialNeeds?.recorder" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">记录时间:</h4>
            <p class="text-lg">
              {{
                `${record?.specialNeeds?.recorder.date.year}年 ${record?.specialNeeds?.recorder.date.month}月
              ${record?.specialNeeds?.recorder.date.day}日`
              }}
            </p>
          </div>
          <div class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">客户信息</h4>
            <div class="space-y-3">
              <div v-if="record?.specialNeeds?.contactPerson" class="flex items-start gap-5">
                <h4 class="text-lg font-medium whitespace-nowrap">姓名:</h4>
                <p class="text-lg">
                  {{ record?.specialNeeds?.contactPerson?.name }}
                </p>
              </div>
              <div v-if="record?.specialNeeds?.contactPerson" class="flex items-start gap-5">
                <h4 class="text-lg font-medium whitespace-nowrap">职务:</h4>
                <p class="text-lg">
                  {{ record?.specialNeeds?.contactPerson?.position }}
                </p>
              </div>
              <div v-if="record?.specialNeeds?.contactPerson" class="flex items-start gap-5">
                <h4 class="text-lg font-medium whitespace-nowrap">电话:</h4>
                <p class="text-lg">
                  {{ record?.specialNeeds?.contactPerson?.phone }}
                </p>
              </div>
              <div v-if="record?.specialNeeds?.contactPerson" class="flex items-start gap-5">
                <h4 class="text-lg font-medium whitespace-nowrap">微信:</h4>
                <p class="text-lg">
                  {{ record?.specialNeeds?.contactPerson?.wechat }}
                </p>
              </div>
              <ElDivider />
              <div v-if="record?.specialNeeds?.assistant" class="flex items-start gap-5">
                <h4 class="text-lg font-medium whitespace-nowrap">姓名:</h4>
                <p class="text-lg">
                  {{ record?.specialNeeds?.assistant?.name }}
                </p>
              </div>
              <div v-if="record?.specialNeeds?.assistant" class="flex items-start gap-5">
                <h4 class="text-lg font-medium whitespace-nowrap">电话:</h4>
                <p class="text-lg">
                  {{ record?.specialNeeds?.assistant?.phone }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="record?.specialNeeds?.additionalNotes" class="flex items-start gap-10">
            <h4 class="text-lg font-medium whitespace-nowrap label">其他补充:</h4>
            <p class="text-lg">
              {{ record?.specialNeeds?.additionalNotes }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import html2pdf from 'html2pdf.js';
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const record = ref(null)
const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const pdfRef = ref(null);
const recordId = route.params.id
const shouldDownload = route.query.download === "1";

const fetchRecord = async () => {
  try {
    isLoading.value = true
    const res = await fetch(`https://backend-server-o6mn.onrender.com/records/${recordId}`)
    record.value = await res.json()
    isLoading.value = false

  } catch (e) {
    console.error('Failed to load record details', e)
  }
}

const generatePDF = async () => {
  await nextTick(); // wait for DOM

  html2pdf()
    .set({
      filename: `洽谈记录-${recordId}.pdf`,
      margin: 5,
      html2canvas: {
        scale: 2,
        backgroundColor: "#ffffff"
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      }
    })
    .from(pdfRef.value)
    .save();
  router.replace("/records");
};

onMounted(async () => {
  await fetchRecord();      // 1️⃣ wait for data
  await nextTick();         // 2️⃣ wait for render

  if (shouldDownload) {
    setTimeout(generatePDF, 400); // 3️⃣ wait for layout/fonts
  }


}
)

const formatRecordId = (record) => {
  if (!record?.id || !record?.createdAt) return '-'
  const date = new Date(record.createdAt)
  return `DH-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(record.id).padStart(3, '0')}`
}
</script>

<style scoped>
.label {
  width: 10rem;
  flex-shrink: 0;
}

.pdf-page {
  width: 198.5mm;
  min-height: 280.75mm;
  padding: 20mm;
  background: white;
  box-sizing: border-box;
}
</style>
