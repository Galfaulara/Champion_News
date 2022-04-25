import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

import React from 'react'
import routes from '../routes'
import { useLocation } from 'react-router-dom'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  console.log(currentLocation, 'currentLocation')
  const getRouteName = (pathname, routes) => {
    try {
      const currentRoute = routes.find((route) => route.path === pathname)
      return currentRoute.name
    } catch {}
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      console.log(currentPathname, 'currentPathname')
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      })

      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
