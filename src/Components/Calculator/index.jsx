/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchUser } from '../../store/actions/userActionsCreator';

const SignupSchema = yup.object().shape({
  /* account: yup.string().required('Ingrese un correo electronico'), */
  amount: yup.string().required('Ingrese un nombre de Usuario'),
});
const Calculator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({ resolver: yupResolver(SignupSchema) });
  const watchShowAmount = watch();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);
  const userIdFromToken = jwtDecode(token)._id || null;
  const [cotizante, setCotizante] = useState([]);
  const [value, onChange] = useState(new Date());
  const accounts = user.accountId;
  useEffect(() => {
    dispatch(fetchUser(token, userIdFromToken));
  }, [token]);
  const parDivisa = [
    {
      base: 'AUD',
      cotizante: ['CAD', 'CHF', 'JPY', 'NZD', 'USD'],
    },
    {
      base: 'CAD',
      cotizante: ['CHF', 'JPY'],
    },
    {
      base: 'CHF',
      cotizante: ['JPY'],
    },
    {
      base: 'EUR',
      cotizante: ['AUD', 'CAD', 'CHF', 'GBP', 'JPY', 'NZD', 'USD'],
    },
    {
      base: 'GBP',
      cotizante: ['AUD', 'CAD', 'CHF', 'JPY', 'NZD', 'USD'],
    },
    {
      base: 'NZD',
      cotizante: ['CAD', 'CHF', 'JPY', 'USD'],
    },
    {
      base: 'USD',
      cotizante: ['CAD', 'CHF', 'JPY'],
    },
    {
      base: 'XAU',
      cotizante: ['USD'],
    },
    {
      base: 'XAG',
      cotizante: ['USD'],
    },
  ];
  const PrecioCotizante = [
    {
      cotizante: 'CAD',
      costo: 7.84,
    },
    {
      cotizante: 'CHF',
      costo: 10.85,
    },
    {
      cotizante: 'JPY',
      costo: 8.69,
    },
    {
      cotizante: 'NZD',
      costo: 6.7,
    },
    {
      cotizante: 'USD',
      costo: 10,
    },
    {
      cotizante: 'GBP',
      costo: 13.6,
    },
    {
      cotizante: 'AUD',
      costo: 7.18,
    },
  ];
  const handlerRisk = () => {
    const accountData = accounts.find(
      (account) => account.accountName === watchShowAmount.account,
    );
    const amount = parseInt(watchShowAmount.amount || 0, 10);
    const riskData = (100 * amount) / (accountData.accountAmount || 0);
    setValue('risk', riskData);
  };
  const handlerLottery = () => {
    const PriceCotice = PrecioCotizante.find(
      (price) => price.cotizante === watchShowAmount.currencyQuote,
    );
    const amount = parseInt(watchShowAmount.amount || 0, 10);
    const SL = parseInt(watchShowAmount.stopLoss, 10) || 0;
    if (SL && amount) {
      const valuePip = amount / SL || 0;
      const lotteryAux = valuePip / PriceCotice.costo || 0;
      setValue('lottery', lotteryAux.toFixed(2));
    } else {
      setValue('lottery', 0);
    }
  };
  const handleBase = () => {
    const Cotize = parDivisa.find(
      (divisa) => divisa.base === watchShowAmount.currencyBase,
    );
    setCotizante(Cotize?.cotizante);
  };
  useEffect(() => {
    if (watchShowAmount.account) {
      handlerRisk();
      handleBase();
      handlerLottery();
    }
  }, [
    watchShowAmount.account,
    watchShowAmount.amount,
    watchShowAmount.currencyBase,
    watchShowAmount.currencyQuote,
    watchShowAmount.stopLoss,
  ]);
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
            <form>
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
                  {accounts?.map((account) => (
                    <option key={account._id} value={account.accountName}>
                      {account.accountName}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={2}>
                <Center>
                  <FormLabel
                    htmlFor="currencyBase"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Par de divisas
                  </FormLabel>
                </Center>
                <Center flexDirection="row" justifyContent="space-around">
                  <Select
                    id="currencyBase"
                    placeholder="Seleccionar Par"
                    {...register('currencyBase', { required: true })}
                    border="2px solid"
                    width="40%"
                  >
                    {parDivisa.map((divisa) => (
                      <option key={divisa.base} value={divisa.base}>
                        {divisa.base}
                      </option>
                    ))}
                  </Select>
                  <Select
                    id="currencyQuote"
                    placeholder="Seleccionar Par"
                    {...register('currencyQuote', { required: true })}
                    border="2px solid"
                    width="40%"
                  >
                    {cotizante?.map((divisa) => (
                      <option key={divisa} value={divisa}>
                        {divisa}
                      </option>
                    ))}
                  </Select>
                </Center>
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
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input type="number" id="amount" {...register('amount')} />
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
                  />
                </InputGroup>
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
                  type="number"
                  id="lottery"
                  {...register('lottery')}
                  isReadOnly
                />
              </FormControl>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Calculator;
