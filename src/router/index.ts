import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie';
import Orders from '../components/pages/Orders.vue'
import Login from '../components/pages/Login.vue'

const middlewareAdmin = (to, from, next)=>{
  if(!Cookies.get('AiutaAdminAuth')){
    router.push('auth')
  }else{
    next()
  }
}
const middlewareAuth = (to, from, next)=>{
  if(Cookies.get('AiutaAdminAuth')){
    router.push('orders')
  }else{
    next()
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/orders', component: Orders, meta: { layout: 'Admin' }, beforeEnter: middlewareAdmin },
    { path: '/auth', component: Login, meta: { layout: 'Auth' }, beforeEnter: middlewareAuth }
  ]
})

export default router
