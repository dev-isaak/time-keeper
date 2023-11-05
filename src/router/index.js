import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserMainView from '@/views/UserMainView.vue'
import AccountSettingsView from '@/views/AccountSettingsView.vue'
import VerifyAccountView from '@/views/VerifyAccountView.vue'
import RecoveryPasswordView from '@/views/RecoveryPasswordView.vue'
import CalendarView from '@/views/CalendarView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/user-main',
      name: 'userMain',
      component: UserMainView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/account-settings',
      name: 'accountSettings',
      component: AccountSettingsView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/verify-account',
      name: 'verifyAccount',
      component: VerifyAccountView
    },
    {
      path: '/recovery-password',
      name: 'recoveryPassword',
      component: RecoveryPasswordView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        requireAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()

  const isAuthenticated = store.jwt
  const needAuth = to.meta.requireAuth

  if (!isAuthenticated && to.name !== 'login' && needAuth == true) {
    return next({ name: 'login' })
  } else {
    next()
  }
})

export default router
