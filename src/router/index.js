import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserBookmarks from '../views/UserBookmarks.vue'
import { projectAuth } from '../firebase/config'

//Auth Guards
const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user){
    next();
  }
  else
  {
    next({name: "UserBookmarks" });
  }
}

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user){
    next();
  }
  else
  {
    next({ name: "Home" });
  }
}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireNoAuth
  },
  {
    path: '/userbookmarks',
    name: 'UserBookmarks',
    component: UserBookmarks,
    beforeEnter: requireAuth

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
