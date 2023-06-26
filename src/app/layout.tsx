'use client'
import './globals.css'
import { miltonian, montserrat } from './fonts'
import { Providers } from './providers'
import { Box, Flex } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${miltonian.variable}`}>
        <Providers>
          <Box as='header' bg='gray.100' p={4} mb={8}>
            <Flex as='nav' justifyContent='flex-end' >
              <Link m={2} href='/'>Home</Link>
              <Link m={2} href='/sign-up'>Sign Up</Link>
            </Flex>
          </Box>
          {children}
        </Providers>
      </body>
    </html>
  )
}
