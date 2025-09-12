export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  if ((!authStore.isAuthenticated || !authStore.currentUser) && to.path !== '/login') {
    return navigateTo('/login')
  }
})