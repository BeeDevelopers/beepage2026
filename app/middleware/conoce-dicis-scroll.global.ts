export default defineNuxtRouteMiddleware((to, from) => {
  const isConoceDicisRoute = (path: string) =>
    path === '/conoce-dicis' || path.startsWith('/conoce-dicis/')

  if (isConoceDicisRoute(to.path) && isConoceDicisRoute(from.path)) {
    to.meta.scrollToTop = false
  }
})
