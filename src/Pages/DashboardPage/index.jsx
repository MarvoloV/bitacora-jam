/* eslint-disable no-underscore-dangle */

import React, { useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import JWTDecode from 'jwt-decode';
import Sidebar from '../../Components/Sidebar';
import CardAccount from '../../Components/CardAccount';
import ButtonAddAcount from '../../Components/ButtonAddAcount';
import { fetchUser } from '../../store/actions/userActionsCreator';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { accountId } = useSelector((state) => state.user.user);
  const userIdFromToken = JWTDecode(token)._id || null;
  useEffect(() => {
    dispatch(fetchUser(token, userIdFromToken));
  }, []);
  return (
    <Sidebar>
      <Center display="flex" pt={5} flexWrap="wrap">
        {accountId?.map((account) => (
          <CardAccount
            key={account._id}
            accountName={account.accountName}
            accountAmount={account.accountAmount}
            accountType={account.accountType}
            id={account._id}
          />
        ))}
      </Center>
      <Center>
        <ButtonAddAcount />
      </Center>
    </Sidebar>
  );
};

export default DashboardPage;
