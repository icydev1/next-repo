'use client'
import { SessionProvider } from 'next-auth/react'

const Provider = ({children , session}) => {

  

  return (
    <SessionProvider session={session}>
      {/* {alert(children)} */}
      {children}
    </SessionProvider>
  )
}

export default Provider
