// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { miltonian, montserrat } from './fonts'

const theme = extendTheme({
  fonts: {
    heading: miltonian.variable,
    body: montserrat.variable,
  },
  colors: {
    brand: {
      100: '#fdc500',
      900: '#1a202c',
    },
  },
})

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}