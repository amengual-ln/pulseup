export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, currentUser } = useAuthStore()
  if ((!isAuthenticated || !currentUser) && to.path !== '/login') {
    navigateTo('/login')
  }
  if (currentUser?.firstLogin) {
    console.log('First login!')
    navigateTo('/welcome')
  } else {
    navigateTo('/')
  }
})