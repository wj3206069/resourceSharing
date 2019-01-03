export const formatRoutes = (authorities) => {
  const aRouter = []
  authorities.forEach(oMenu => {
    const title = oMenu.title
    const name = oMenu.name
    if (name) {
      oMenu.title = oMenu.name
    }
    oMenu.name = title || oMenu.path
    if (oMenu.componentPath) {
      var componentPath = oMenu.componentPath
      if (componentPath.indexOf('/') !== -1) {
        oMenu.component = function () {
          return import(`../views/${componentPath}`)
        }
      } else {
        if (componentPath.toLowerCase() === 'layout') {
          oMenu.component = function () {
            return import(`@/views/layout/Layout`)
          }
        } else {
          oMenu.component = function () {
            return import(`@/views/layout/components/DefaultView`)
          }
        }
      }
    } else {
      oMenu.component = function () {
        return import(`@/views/index/index`)
      }
    }
    if (oMenu.children) {
      oMenu.children = formatRoutes(oMenu.children)
    }
    if (oMenu.path) {
      aRouter.push(oMenu)
    }
  })
  return aRouter
}
