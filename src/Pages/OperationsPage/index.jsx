import React from 'react';
import ButtonAddOperation from '../../Components/ButtonAddOperation';
import Sidebar from '../../Components/Sidebar';
import TableData from '../../Components/Table';

const OperationsPage = () => (
  <Sidebar>
    <ButtonAddOperation />
    <TableData />
  </Sidebar>
);

export default OperationsPage;
