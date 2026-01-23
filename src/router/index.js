import CreateView from '@/views/CreateView.vue'
import EditView from '@/views/EditView.vue'
import HomeView from '@/views/HomeView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import RecordDownloadView from '@/views/RecordDownloadView.vue'
import RecordListView from '@/views/RecordListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component:HomeView
    },
    {
      path:'/records',
      name:'records',
      component:RecordListView,
    },
    {
      path:'/records/info/:id',
      name:'record-info',
      component:RecordDownloadView
    },
    {
      path:'/products/:id',
      name:'product details',
      component:ProductDetailsView
    },
    {
      path:'/create',
      name:'create',
      component:CreateView
    },
    {
      path:'/edit/:id',
      name:'edit',
      component:EditView
    },

  ],
})

export default router
