import Link from 'next/link'
import React from 'react'

const ClientSideRoute = ({
    //props that this wrapper takes - children so that all elements wrapped are affected by this and route to set the route.
    children,
    route
  }: {

    children: React.ReactNode,
    route:string
  }) => {
  return (
    //we wrap all childrens inside a link tag to make it a hyperlink
    <div><Link href={route}>{children}</Link></div>
  )
}

export default ClientSideRoute