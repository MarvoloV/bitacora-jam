/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// 1. import `ChakraProvider` component
import AppRouter from './routes/AppRouter';

const App = () => (
  <ChakraProvider>
    <AppRouter />
  </ChakraProvider>
);
export default App;
