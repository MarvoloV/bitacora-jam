/* eslint-disable operator-linebreak */
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
import { parDivisa, PrecioCotizante } from '../../data/data';

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
  // const [value, onChange] = useState(new Date());
  const accounts = user.accountId;
  useEffect(() => {
    dispatch(fetchUser(token, userIdFromToken));
  }, [token]);
  const handlerRisk = () => {
    const accountData = accounts.find(
      (account) => account.accountName === watchShowAmount.account,
    );
    const amount = parseInt(watchShowAmount.amount || 0, 10);
    const riskData = (100 * amount) / (accountData.accountAmount || 0);
    setValue('risk', riskData);
    setValue('accountTotal', accountData.accountAmount);
  };
  const handlerLottery = () => {
    const PriceCotice = PrecioCotizante.find(
      (price) => price.cotizante === watchShowAmount.currencyQuote,
    );
    const amount = parseInt(watchShowAmount.amount || 0, 10);
    const SL = Number(watchShowAmount.stopLoss) || 0;
    if (SL && amount) {
      const lottery = amount / (SL * PriceCotice.costo + 7);
      setValue('lottery', lottery.toFixed(2));
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
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={200}>
                  <Center>
                    <FormLabel
                      htmlFor="account"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Elegir cuenta
                    </FormLabel>
                  </Center>
                  <Select
                    id="account"
                    placeholder="Seleccionar Cuenta"
                    {...register('account', { required: true })}
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
                    _hover={{}}
                  >
                    {accounts?.map((account) => (
                      <option key={account._id} value={account.accountName}>
                        {account.accountName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mt={2} width={200}>
                  <Center>
                    <FormLabel
                      htmlFor="accountTotal"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      CUENTA
                    </FormLabel>
                  </Center>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      fontSize="1.2em"
                      children="$"
                    />
                    <Input
                      id="accountTotal"
                      {...register('accountTotal', { required: true })}
                      borderColor={useColorModeValue('black', 'white')}
                      textAlign="center"
                      _hover={{}}
                    />
                  </InputGroup>
                </FormControl>
              </Box>

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
                <Center flexDirection="row" justifyContent="space-between">
                  <Select
                    id="currencyBase"
                    placeholder="Seleccionar Par"
                    {...register('currencyBase', { required: true })}
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
                    _hover={{}}
                    width="200px"
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
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
                    _hover={{}}
                    width="200px"
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
                  <Input
                    type="number"
                    id="amount"
                    {...register('amount')}
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
                    _hover={{}}
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
                    step="any"
                    id="stopLoss"
                    {...register('stopLoss')}
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
                    _hover={{}}
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
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
                    isReadOnly
                    _hover={{}}
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
                  borderColor={useColorModeValue('black', 'white')}
                  textAlign="center"
                  isReadOnly
                  _hover={{}}
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
