import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    components: {default: Home, header: Navbar, footer: Footer},
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
