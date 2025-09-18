export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, currentUser } = useAuthStore()
  
  if (!isAuthenticated || !currentUser) {
    if (to.path !== '/login') {
      return navigateTo('/login')
    }
    return
  }
  if (currentUser.firstLogin) {
    if (to.path !== '/completeProfile') {
      return navigateTo('/completeProfile')
    }
    return
  }

  if (['/login', '/completeProfile'].includes(to.path)) {
    return navigateTo('/')
  }
})