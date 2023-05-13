import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import GalleryView from '../views/GalleryView.vue'
import NewPostView from '../views/admin/NewPostView.vue'
import AdminView from '../views/admin/AdminView.vue'
import AdminGalleryView from '../views/admin/AdminGalleryView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/admin/',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/admin/gallery',
      name: 'admin-gallery',
      component: AdminGalleryView
    },
    {
      path: '/admin/new',
      name: 'new',
      component: NewPostView
    }
  ]
})

export default router
