'use client'

import { Center, Container, Heading } from '@chakra-ui/react';
import { miltonian } from './fonts';

export default function Home() {
  return (
    <Container maxW="container.lg">
      <Center>
        <Heading as='h1' size="2xl" className={miltonian.className} mb={8}>Home Page</Heading>
      </Center>
    </Container>
  );
}
