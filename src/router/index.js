import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Post from '../views/Post.vue'

Vue.use(VueRouter)
  const routes = [
    {
      path: '/',
      name: 'login',
      component:Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/post',
          name: 'post',
          component: Post,
        },

      ]
    }
  ]

const router = new VueRouter({
  mode: 'history',
  //  base:'/FollowupAcc',

  routes
})


// navigation guard to check for logged in users
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

//   if (requiresAuth && !auth.currentUser) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
