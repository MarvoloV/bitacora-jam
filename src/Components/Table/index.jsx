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
  Button,
  /* GridItem, */
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { fetchUser } from '../../store/actions/userActionsCreator';
import { fetchAccounts } from '../../store/actions/accountActions';

const TableData = () => {
  const user = useSelector((state) => state.user.user);
  const { operation } = useSelector((state) => state.account.operations);
  const { accountId } = user;
  const token = useSelector((state) => state.auth.token);
  const userIdFromToken = jwtDecode(token)._id || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerSubmit = () => {
    navigate('/pages/createoperation');
  };
  useEffect(() => {
    dispatch(fetchUser(token, userIdFromToken));
  }, [token]);
  const handlerAccountName = (e) => {
    const accountData = accountId?.find(
      (dataAccount) => dataAccount.accountName === e.target.value,
    );
    if (accountData) {
      dispatch(fetchAccounts(accountData._id));
    }
  };
  const HandleReportOperation = (id) => {
    navigate(`/pages/viewoperation/${id}`);
  };
  const HandleEditOperation = (id) => {
    navigate(`/pages/editoperation/${id}`);
  };
  return (
    <>
      <Box display="flex" justifyContent="space-around" mt={10} height={5}>
        <Select
          id="account"
          placeholder="Seleccionar Cuenta"
          onClick={handlerAccountName}
          bg={useColorModeValue('gray.100', 'gray.700')}
          borderColor={useColorModeValue('black', 'gray.700')}
          width={600}
        >
          {accountId?.map((accountData) => (
            <option key={accountData._id} value={accountData.accountName}>
              {accountData.accountName}
            </option>
          ))}
        </Select>
        <Button
          bg={useColorModeValue('teal.300', 'teal.600')}
          variant="outline"
          rightIcon={<AddIcon />}
          rounded="xl"
          mb={10}
          _hover={{
            bg: 'teal.500',
          }}
          _focus={{
            bg: 'teal.500',
          }}
          onClick={handlerSubmit}
        >
          Agregar Una Cuenta
        </Button>
      </Box>

      <Flex w="full" pt={10} alignItems="center" justifyContent="center">
        <Stack
          direction={{ base: 'column' }}
          w="full"
          bg={{ md: useColorModeValue('white', 'gray.800') }}
          shadow="lg"
        >
          <Grid
            /* spacingY={3} */
            templateColumns="repeat(7, 1fr)"
            gap={6}
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
            <Box>% DE RIESGO </Box>
            <Box>RIESGO:BENEFICIO </Box>
            <Box>TIPO DE OPERACION</Box>
            <Box>FECHA </Box>
            <Box>Actions</Box>
            {/* <chakra.span textAlign={{ md: 'center' }}>Actions</chakra.span> */}
          </Grid>
          {operation?.map((operationDate) => (
            <Grid
              key={operationDate._id}
              /* spacingY={3} */
              templateColumns="repeat(7, 1fr)"
              gap={6}
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
                textAlign="center"
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
                {operationDate.risk}
              </Box>
              <Box
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {operationDate.riskBenefit}
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
                  <IconButton
                    onClick={() => HandleEditOperation(operationDate._id)}
                    colorScheme="green"
                    icon={<AiFillEdit />}
                  />
                  <IconButton
                    colorScheme="red"
                    variant="outline"
                    icon={<BsFillTrashFill />}
                  />
                </ButtonGroup>
              </Flex>
            </Grid>
          ))}
        </Stack>
      </Flex>
    </>
  );
};
export default TableData;
