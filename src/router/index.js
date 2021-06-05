import {
  createRouter,
  createWebHistory
} from 'vue-router'

const SingerDetail = () => import('/src/views/SingerDetail.vue')
const routes = [{
    path: "",
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('/src/views/Recommend.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('/src/views/Singer.vue'),
    children:[
      {
        path: ':mid',
        name:"Detail",
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    name: 'topList',
    component: () => import('/src/views/Top-list.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('/src/views/Search.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router