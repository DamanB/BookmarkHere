import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserBookmarks from '../views/UserBookmarks.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/userbookmarks',
    name: 'UserBookmarks',
    component: UserBookmarks
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
