/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import {
  Flex,
  useColorModeValue,
  Stack,
  Grid,
  /* SimpleGrid, */
  ButtonGroup,
  IconButton,
  Select,
  Box,
  Link,
  /* GridItem, */
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../store/actions/userActionsCreator';
import { fetchAccounts } from '../../store/actions/accountActions';

const TableData = () => {
  // const header = ['name', 'created', 'actions'];
  /* const data = [
    { name: 'Daggy', created: '7 days ago' },
    { name: 'Anubra', created: '23 hours ago' },
    { name: 'Josef', created: 'A few seconds ago' },
    { name: 'Sage', created: 'A few hours ago' },
  ]; */

  /* currencyPair */
  const user = useSelector((state) => state.user.user);
  const { operation } = useSelector((state) => state.account.operations);
  const { accountId } = user;
  const token = useSelector((state) => state.auth.token);
  const userIdFromToken = jwtDecode(token)._id || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(token, userIdFromToken));
  }, [token]);
  const handlerAccountName = (e) => {
    const accountData = accountId.find(
      (dataAccount) => dataAccount.accountName === e.target.value,
    );
    if (accountData) {
      dispatch(fetchAccounts(accountData._id));
    }
  };
  const HandleReportOperation = (id) => {
    navigate(`/pages/viewoperation/${id}`);
  };
  return (
    <>
      <Select
        id="account"
        placeholder="Seleccionar Cuenta"
        border="2px solid"
        onClick={handlerAccountName}
      >
        {accountId?.map((accountData) => (
          <option key={accountData._id} value={accountData.accountName}>
            {accountData.accountName}
          </option>
        ))}
      </Select>
      <Flex w="full" p={50} alignItems="center" justifyContent="center">
        <Stack
          direction={{ base: 'column' }}
          w="full"
          bg={{ md: useColorModeValue('white', 'gray.800') }}
          shadow="lg"
        >
          <Grid
            /* spacingY={3} */
            templateColumns="1fr 2fr 1fr 1fr 1fr"
            w={{ base: 120, md: 'full' }}
            textTransform="uppercase"
            /* bg={useColorModeValue('gray.100', 'gray.700')}
                  color={useColorModeValue('gray.500')} */
            py={{ base: 1, md: 4 }}
            px={{ base: 2, md: 10 }}
            fontSize="md"
            fontWeight="hairline"
            /* display="table-header-group" */
          >
            <Box>PAR DE DIVISA</Box>
            <Box>LINK DE ENTRADA </Box>
            <Box>TIPO DE OPERACION</Box>
            <Box>FECHA </Box>
            <Box>Actions</Box>
            {/* <chakra.span textAlign={{ md: 'center' }}>Actions</chakra.span> */}
          </Grid>
          {operation?.map((operationDate) => (
            <Flex
              direction={{ base: 'row', md: 'column' }}
              /* bg={useColorModeValue('white', 'gray.800')} */
              key={operationDate._id}
            >
              <Grid
                /* spacingY={3} */
                templateColumns="1fr 2fr 1fr  1fr 1fr"
                /* columns={{ base: 1, md: 4 }} */
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <Box>{operationDate.currencyPair}</Box>
                <Box
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  <Link href={operationDate.linkEntry} isExternal>
                    {operationDate.linkEntry}
                  </Link>
                </Box>
                <Box
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {operationDate.typeOfEntry}
                </Box>
                <Box
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {operationDate.dateOperation.substr(0, 10)}
                </Box>
                <Flex justify={{ md: 'center' }}>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton
                      onClick={() => HandleReportOperation(operationDate._id)}
                      colorScheme="blue"
                      icon={<BsBoxArrowUpRight />}
                    />
                    <IconButton colorScheme="green" icon={<AiFillEdit />} />
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                    />
                  </ButtonGroup>
                </Flex>
              </Grid>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </>
  );
};
export default TableData;
