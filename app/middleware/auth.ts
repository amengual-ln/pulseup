export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, currentUser } = useAuthStore()
  
  if (!isAuthenticated || !currentUser) {
    if (to.path !== '/login') {
      return navigateTo('/login')
    }
    return
  }
  if (currentUser.firstLogin) {
    if (to.path !== '/welcome') {
      return navigateTo('/welcome')
    }
    return
  }

  if (['/login', '/welcome'].includes(to.path)) {
    return navigateTo('/')
  }
})