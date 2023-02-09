import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useContext, useState } from 'react'

import { SiteContextProvider } from '../lib/siteContext'


export default function App({ Component, pageProps }: AppProps) {
  const { data } = pageProps
  

  return (
    <SiteContextProvider data ={{...data}}>
      <Component {...pageProps} />
    </SiteContextProvider>

  )
}
