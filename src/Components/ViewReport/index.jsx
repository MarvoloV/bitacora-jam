/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import {
  Flex,
  Input,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Center,
  InputLeftElement,
  InputGroup,
  useColorModeValue,
  Text,
  Link,
} from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';
import { fetchIdOperation } from '../../store/actions/operationActions';
import { fetchUser } from '../../store/actions/userActionsCreator';

const SignupSchema = yup.object().shape({
  /* account: yup.string().required('Ingrese un correo electronico'), */
  amount: yup.string().required('Ingrese un nombre de Usuario'),
});
const ViewReport = () => {
  const { register, reset } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const operation = useSelector((state) => state.operation.operationId);
  const date = operation.dateOperation || '2022-02-15';
  const userIdFromToken = jwtDecode(token)._id || null;
  const [value, onChange] = useState(new Date());
  const [confirmationsOperation, setConfirmationsOperation] = useState([]);
  useEffect(() => {
    dispatch(fetchUser(token, userIdFromToken));
    dispatch(fetchIdOperation(id));
  }, [token]);
  useEffect(() => {
    onChange(date);
    if (date) {
      reset({
        ...operation,
        amount: operation.operationAmount,
      });
    }
    setConfirmationsOperation(operation.confirmationsOperation);
  }, [operation]);

  return (
    <Flex flexDirection="row">
      <Stack
        margin="auto"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          minW={{
            base: '90%',
            sm: '300px',
            md: '600px',
            lg: '900px',
            xl: '1075px',
            '2xl': '1200px',
          }}
        >
          <Stack
            p="1rem"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="md"
            justifyContent="center"
            borderRadius={20}
            mb={10}
          >
            <form>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-around"
                flexWrap="wrap"
                alignItems="center"
              >
                <FormControl
                  mt={2}
                  display="flex"
                  flexDir="row"
                  width={400}
                  alignItems="center"
                >
                  <Center>
                    <FormLabel
                      htmlFor="currencyBase"
                      fontSize={20}
                      fontWeight="bold"
                      mb="0px"
                    >
                      Fecha y hora:
                    </FormLabel>
                  </Center>
                  <Center flexDirection="row" justifyContent="space-around">
                    <DatePicker
                      onChange={onChange}
                      value={value}
                      format="dd-MM-y"
                      disabled
                    />
                  </Center>
                </FormControl>
                <FormControl
                  mt={2}
                  width={400}
                  display="flex"
                  flexDir="row"
                  alignItems="center"
                >
                  <Center>
                    <FormLabel
                      htmlFor="tradingResult"
                      fontSize={20}
                      fontWeight="bold"
                      mb="0px"
                    >
                      Resultado:
                    </FormLabel>
                  </Center>
                  <Input
                    variant="flushed"
                    id="typeOfEntry"
                    {...register('tradingResult', { required: true })}
                    borderColor={useColorModeValue('black', 'white')}
                    isReadOnly
                    textAlign="center"
                  />
                </FormControl>
              </Box>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-around"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="account"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Cuenta
                    </FormLabel>
                  </Center>
                  <Input
                    id="account"
                    {...register('account', { required: true })}
                    borderColor={useColorModeValue('black', 'white')}
                    isReadOnly
                    textAlign="center"
                  />
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="currencyPair"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Par de divisas
                    </FormLabel>
                  </Center>
                  <Center flexDirection="row" justifyContent="space-around">
                    <Input
                      id="currencyPair"
                      placeholder="Seleccionar Par"
                      {...register('currencyPair', { required: true })}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                      textAlign="center"
                    />
                  </Center>
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="typeOfEntry"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Tipo de entrada
                    </FormLabel>
                  </Center>
                  <Input
                    id="typeOfEntry"
                    {...register('typeOfEntry', { required: true })}
                    borderColor={useColorModeValue('black', 'white')}
                    isReadOnly
                    textAlign="center"
                  />
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel htmlFor="amount" fontSize={20} fontWeight="bold">
                      Monto a Invertir
                    </FormLabel>
                  </Center>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      fontSize="1.2em"
                      children="$"
                    />
                    <Input
                      type="text"
                      id="amount"
                      {...register('amount')}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                      textAlign="center"
                    />
                  </InputGroup>
                </FormControl>
              </Box>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-around"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="stopLoss"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Stop loss
                    </FormLabel>
                  </Center>
                  <InputGroup>
                    <Input
                      type="text"
                      id="stopLoss"
                      {...register('stopLoss')}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                      textAlign="center"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="takeProfit"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Take Profit
                    </FormLabel>
                  </Center>
                  <InputGroup>
                    <Input
                      type="text"
                      id="takeProfit"
                      {...register('takeProfit')}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                      textAlign="center"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel htmlFor="risk" fontSize={20} fontWeight="bold">
                      % de inversion
                    </FormLabel>
                  </Center>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      fontSize="1.2em"
                      children="%"
                    />
                    <Input
                      type="text"
                      id="risk"
                      {...register('risk')}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                      textAlign="center"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="lottery"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Lotaje
                    </FormLabel>
                  </Center>
                  <Input
                    type="text"
                    id="lottery"
                    {...register('lottery')}
                    borderColor={useColorModeValue('black', 'white')}
                    isReadOnly
                    textAlign="center"
                  />
                </FormControl>
              </Box>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-around"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="riskBenefit"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Riesgo:Beneficio
                    </FormLabel>
                  </Center>
                  <InputGroup>
                    <Input
                      type="text"
                      id="riskBenefit"
                      {...register('riskBenefit')}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                      textAlign="center"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="resultPips"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Resultado en Pips
                    </FormLabel>
                  </Center>
                  <InputGroup>
                    <Input
                      type="text"
                      id="resultPips"
                      {...register('resultPips')}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                      textAlign="center"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="resultPercentage"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      % Resul. del trade
                    </FormLabel>
                  </Center>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      fontSize="1.2em"
                      children="%"
                    />
                    <Input
                      type="text"
                      id="resultPercentage"
                      {...register('resultPercentage')}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={2} width={220}>
                  <Center>
                    <FormLabel
                      htmlFor="resultMoney"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Resultado (USD)
                    </FormLabel>
                  </Center>
                  <Input
                    type="text"
                    id="resultMoney"
                    {...register('resultMoney')}
                    borderColor={useColorModeValue('black', 'white')}
                    isReadOnly
                  />
                </FormControl>
              </Box>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-around"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={300}>
                  <Center>
                    <FormLabel
                      htmlFor="linkEntry"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Link Entrada tradingView
                    </FormLabel>
                  </Center>
                  <Center>
                    <Link
                      padding={2}
                      border="1px solid "
                      borderRadius="md"
                      id="linkEntry"
                      href={operation.linkEntry}
                      isExternal
                      fontSize={20}
                    >
                      {operation.linkEntry}
                    </Link>
                  </Center>
                </FormControl>
                <FormControl mt={2} width={300}>
                  <Center>
                    <FormLabel
                      htmlFor="linkEntry"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Link Salida tradingView
                    </FormLabel>
                  </Center>
                  <Center>
                    <Link
                      padding={2}
                      border="1px solid "
                      borderRadius="md"
                      id="linkEntry"
                      href={operation.linkEntry}
                      isExternal
                      fontSize={20}
                    >
                      {operation.linkEntry}
                    </Link>
                  </Center>
                </FormControl>
              </Box>
              <FormControl mt={2}>
                <Center>
                  <FormLabel
                    htmlFor="confirmations"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    confirmaciones
                  </FormLabel>
                </Center>
              </FormControl>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
              >
                {confirmationsOperation?.map((confirmation) => (
                  <Box
                    key={confirmation}
                    my={1}
                    fontSize="25px"
                    display="flex"
                    width={300}
                  >
                    <Text mr={2}>{confirmation}</Text>
                  </Box>
                ))}
              </Box>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default ViewReport;
