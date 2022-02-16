/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Flex,
  Input,
  Button,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Center,
  Select,
  InputLeftElement,
  InputGroup,
  useColorModeValue,
  setScript,
} from '@chakra-ui/react';

const SignupSchema = yup.object().shape({
  email: yup.string().email().required('Ingrese un correo electronico'),
  userName: yup.string().required('Ingrese un nombre de Usuario'),
});
const parDivisa = [
  'AUDCAD',
  'AUDCHF',
  'AUDJPY',
  'AUDNZD',
  'AUDUSD',
  'CADCHF',
  'CADJPY',
  'CHFJPY',
  'EURAUD',
  'EURCAD',
  'EURCHF',
  'EURGBP',
  'EURJPY',
  'EURNZD',
  'EURUSD',
  'GBPAUD',
  'GBPCAD',
  'GBPCHF',
  'GBPJPY',
  'GBPNZD',
  'GBPUSD',
  'NZDCAD',
  'NZDCHF',
  'NZDJPY',
  'NZDUSD',
  'USDCAD',
  'USDCHF',
  'USDJPY',
  'XAUUSD',
  'XAUGUSD',
];

const AddOperation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignupSchema) });
  const [risk, setRisk] = useState('');
  const [lottery, setLottery] = useState('');
  const [amountData, setAmountData] = useState('');
  const accounts = [
    { cuenta: 'Cuenta Gama', monto: 10000 },
    { cuenta: 'Cuenta Alfa', monto: 50000 },
  ];
  const handlerRisk = (e) => {
    e.preventDefault();
    const amount = parseInt(e.target.value, 10);
    setAmountData(amount);
    const riskData = (100 * (amount || 0)) / accounts[0].monto;
    setRisk(riskData);
  };
  const handlerLottery = (e) => {
    e.preventDefault();
    const stopLoss = parseInt(e.target.value, 10);
    const valuePip = (amountData || 0) / stopLoss;
    const lotteryAux = (valuePip || 0) / 10;
    setLottery(lotteryAux.toFixed(2));
  };
  const onSubmit = (data) => console.log(data);
  return (
    <Flex flexDirection="row">
      <Stack
        margin="auto"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: '90%', md: '468px' }}>
          <Stack
            p="1rem"
            bg={useColorModeValue('gray.300', 'gray.800')}
            boxShadow="md"
            justifyContent="center"
            borderRadius={20}
            mb={10}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mt={2}>
                <Center>
                  <FormLabel htmlFor="account" fontSize={20} fontWeight="bold">
                    Elegir cuenta
                  </FormLabel>
                </Center>
                <Select
                  id="account"
                  placeholder="Seleccionar Cuenta"
                  {...register('account', { required: true })}
                  border="2px solid"
                >
                  {accounts.map((account) => (
                    <option key={account.cuenta} value={account.cuenta}>
                      {account.cuenta}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={2}>
                <Center>
                  <FormLabel
                    htmlFor="typeAccount"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Par de divisas
                  </FormLabel>
                </Center>
                <Select
                  id="currencyPair"
                  placeholder="Seleccionar Par"
                  {...register('currencyPair', { required: true })}
                  border="2px solid"
                >
                  {parDivisa.map((divisa) => (
                    <option key={divisa} value={divisa}>
                      {divisa}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={2}>
                <Center>
                  <FormLabel htmlFor="amount" fontSize={20} fontWeight="bold">
                    Monto a Invertir
                  </FormLabel>
                </Center>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    /* color="black" */
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input
                    type="number"
                    id="amount"
                    {...register('amount')}
                    onChange={handlerRisk}
                  />
                </InputGroup>

                {errors.amount && <p>{errors.amount.message}</p>}
              </FormControl>
              <FormControl mt={2}>
                <Center>
                  <FormLabel htmlFor="stopLoss" fontSize={20} fontWeight="bold">
                    Stop loss
                  </FormLabel>
                </Center>
                <InputGroup>
                  <Input
                    type="number"
                    id="stopLoss"
                    {...register('stopLoss')}
                    onChange={handlerLottery}
                  />
                </InputGroup>
                {errors.amount && <p>{errors.amount.message}</p>}
              </FormControl>
              <FormControl>
                <Center>
                  <FormLabel htmlFor="risk" fontSize={20} fontWeight="bold">
                    Ratio de Riesgo
                  </FormLabel>
                </Center>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1.2em"
                    children="%"
                  />
                  <Input
                    value={risk}
                    type="number"
                    id="risk"
                    {...register('risk')}
                    isReadOnly
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Center>
                  <FormLabel htmlFor="lottery" fontSize={20} fontWeight="bold">
                    Lotaje
                  </FormLabel>
                </Center>
                <Input
                  value={lottery}
                  type="number"
                  id="lottery"
                  {...register('lottery')}
                  isReadOnly
                />
              </FormControl>
              <Center justifyContent="space-around">
                <Button
                  borderRadius={20}
                  type="submit"
                  variant="solid"
                  bg="teal"
                  mt={5}
                >
                  Calcular
                </Button>
                <Button
                  borderRadius={20}
                  type="submit"
                  variant="solid"
                  bg="green"
                  mt={5}
                >
                  Registrar operacion
                </Button>
              </Center>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AddOperation;
