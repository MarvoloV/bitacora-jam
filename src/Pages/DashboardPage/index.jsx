import React from 'react';
import { Center } from '@chakra-ui/react';
import Sidebar from '../../Components/Sidebar';
import CardAccount from '../../Components/CardAccount';
import ButtonAddAcount from '../../Components/ButtonAddAcount';

const DashboardPage = () => (
  <Sidebar>
    <Center display="flex" pt={5} flexWrap="wrap">
      <CardAccount />
      <CardAccount />
    </Center>
    <Center>
      <ButtonAddAcount />
    </Center>
  </Sidebar>
);

export default DashboardPage;
