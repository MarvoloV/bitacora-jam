import React from 'react';
import { Center } from '@chakra-ui/react';
import Sidebar from '../../Components/Sidebar';
import BasicStatistics from '../../Components/Stadistics';
import CardAcount from '../../Components/CardAcount/Index';
import AddAcount from '../../Components/AddAcount/index';

const DashboardPage = () => (
  <Sidebar>
    <BasicStatistics />
    <Center display="flex" pt={5}>
      <CardAcount />
      <CardAcount />
    </Center>
    <Center>
      <AddAcount />
    </Center>
  </Sidebar>
);

export default DashboardPage;
