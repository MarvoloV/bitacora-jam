/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
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
  Text,
  IconButton,
} from '@chakra-ui/react';
import { FaRegTimesCircle } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import { sendOperation } from '../../store/actions/operationActions';
import { fetchUser } from '../../store/actions/userActionsCreator';
import { parDivisa, PrecioCotizante } from '../../data/data';

const SignupSchema = yup.object().shape({
  /* account: yup.string().required('Ingrese un correo electronico'), */
  amount: yup.string().required('Ingrese un nombre de Usuario'),
});
const AddOperation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(SignupSchema) });
  const watchShowAmount = watch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);
  const userIdFromToken = jwtDecode(token)._id || null;
  const [cotizante, setCotizante] = useState([]);
  const [value, onChange] = useState(new Date());
  const [accountconfirmations, setAccountConfirmations] = useState([]);
  const [accountUser, setAccountUser] = useState({});
  const [confirmationsOperation, setConfirmationsOperation] = useState([]);
  const accounts = user.accountId;
  useEffect(() => {
    dispatch(fetchUser(token, userIdFromToken));
  }, [token]);

  const handlerRisk = () => {
    const accountData = accounts.find(
      (account) => account.accountName === watchShowAmount.account,
    );
    const amount = parseInt(watchShowAmount.amount || 0, 10);
    setAccountUser(accountData);
    setAccountConfirmations(accountData.confirmations);
    const riskData = (100 * amount) / (accountData.accountAmount || 0);
    setValue('risk', riskData);
    setValue('accountTotal', accountData.accountAmount);
  };
  const handlerLottery = () => {
    const PriceCotice = PrecioCotizante.find(
      (price) => price.cotizante === watchShowAmount.currencyQuote,
    );
    const amount = parseInt(watchShowAmount.amount || 0, 10);
    const SL = parseInt(watchShowAmount.stopLoss, 10) || 0;
    if (SL && PriceCotice) {
      const valuePip = amount / SL;
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
  const handlerConfirmation = () => {
    const repeat = confirmationsOperation.find(
      (confirmation) => confirmation === watchShowAmount.confirmations,
    );
    if (!repeat) {
      const addConfirmation = accountconfirmations.find(
        (confirmation) => confirmation === watchShowAmount.confirmations,
      );
      if (addConfirmation) {
        setConfirmationsOperation([...confirmationsOperation, addConfirmation]);
      }
    }
  };
  const handlerDeleteConfirmation = (confirmationCompare) => {
    const updateConfirmations = confirmationsOperation.filter(
      (confirmation) => confirmation !== confirmationCompare,
    );
    setConfirmationsOperation(updateConfirmations);
  };
  const handlerRiskBenefit = () => {
    const stopLoss = parseInt(watchShowAmount.stopLoss, 10) || 0;
    const takeProfit = parseInt(watchShowAmount.takeProfit, 10) || 0;
    if (stopLoss && takeProfit) {
      const riskBenefit = takeProfit / stopLoss;
      if (riskBenefit % 1 === 0) {
        setValue('riskBenefit', `1:${riskBenefit}`);
      } else {
        setValue('riskBenefit', `1:${riskBenefit.toFixed(1)}`);
      }
    }
  };
  const onSubmit = async ({
    account,
    currencyBase,
    currencyQuote,
    amount,
    typeOfEntry,
    stopLoss,
    takeProfit,
    linkEntry,
    risk,
    lottery,
    riskBenefit,
  }) => {
    try {
      const currencyPair = `${currencyBase}/${currencyQuote}`;
      const newFormAccount = {
        dateOperation: value,
        account,
        currencyBase,
        currencyQuote,
        currencyPair,
        operationAmount: parseInt(amount, 10),
        typeOfEntry,
        stopLoss: parseInt(stopLoss, 10),
        takeProfit: parseInt(takeProfit, 10),
        confirmationsOperation,
        linkEntry,
        risk,
        lottery: parseFloat(lottery, 10),
        riskBenefit,
        accountId: accountUser._id,
      };
      dispatch(
        sendOperation(newFormAccount, accountUser.operationId, accountUser._id),
      );
      await MySwal.fire({
        title: <strong>Buen trabajo!</strong>,
        html: <i>Operacion Creada!</i>,
        icon: 'success',
      });
      navigate('/pages/operations');
    } catch (error) {
      await MySwal.fire({
        title: <strong>Algo ha sucedido</strong>,
        html: <i>{`Alguno de los campos es innv??lido. ${error}`}</i>,
        icon: 'error',
      });
    }
  };
  useEffect(() => {
    if (watchShowAmount.account) {
      handlerRisk();
      handleBase();
      handlerLottery();
      handlerRiskBenefit();
    }
  }, [
    watchShowAmount.account,
    watchShowAmount.amount,
    watchShowAmount.currencyBase,
    watchShowAmount.currencyQuote,
    watchShowAmount.stopLoss,
    watchShowAmount.takeProfit,
  ]);
  useEffect(() => {
    if (watchShowAmount.account) {
      handlerConfirmation();
    }
  }, [watchShowAmount.confirmations]);

  //  console.log('???? ~ file: index.jsx ~ line 170 ~ AddOperation ~ value', value);
  // const dateFormat = value.toLocaleDateString();

  return (
    <Flex flexDirection="row">
      <Stack
        margin="auto"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: '90%', md: '468px', lg: '600px' }}>
          <Stack
            p="1rem"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="md"
            justifyContent="center"
            borderRadius={20}
            mb={10}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mt={2}>
                <Center>
                  <FormLabel
                    htmlFor="currencyBase"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Fecha y hora
                  </FormLabel>
                </Center>
                <Center flexDirection="row" justifyContent="space-around">
                  <DatePicker
                    onChange={onChange}
                    value={value}
                    format="dd-MM-y"
                  />
                </Center>
              </FormControl>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={250}>
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
                  >
                    {accounts?.map((account) => (
                      <option key={account._id} value={account.accountName}>
                        {account.accountName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mt={2} width={250}>
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
                      isReadOnly
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
                    width="250px"
                    textAlign="center"
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
                    width={250}
                    textAlign="center"
                  >
                    {cotizante?.map((divisa) => (
                      <option key={divisa} value={divisa}>
                        {divisa}
                      </option>
                    ))}
                  </Select>
                </Center>
              </FormControl>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={250}>
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
                    />
                  </InputGroup>
                  {errors.amount && <p>{errors.amount.message}</p>}
                </FormControl>
                <FormControl mt={2} width={250}>
                  <Center>
                    <FormLabel
                      htmlFor="typeOfEntry"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Tipo de entrada
                    </FormLabel>
                  </Center>
                  <Select
                    id="confirmations"
                    placeholder="Seleccionar tipo de entrada"
                    {...register('typeOfEntry', { required: true })}
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
                  >
                    <option value="COMPRA">COMPRA</option>
                    <option value="VENTA">VENTA</option>
                  </Select>
                </FormControl>
              </Box>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={250}>
                  <Center>
                    <FormLabel
                      htmlFor="stopLoss"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Stop Loss
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
                    />
                  </InputGroup>
                  {/* {errors.amount && <p>{errors.amount.message}</p>} */}
                </FormControl>
                <FormControl mt={2} width={250}>
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
                      type="number"
                      step="any"
                      id="takeProfit"
                      {...register('takeProfit')}
                      borderColor={useColorModeValue('black', 'white')}
                      textAlign="center"
                    />
                  </InputGroup>
                </FormControl>
              </Box>
              <FormControl mt={2}>
                <Center>
                  <FormLabel
                    htmlFor="confirmations"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Elegir confirmaciones
                  </FormLabel>
                </Center>
                <Select
                  id="confirmations"
                  placeholder="Seleccionar Cuenta"
                  {...register('confirmations', { required: true })}
                  borderColor={useColorModeValue('black', 'white')}
                  textAlign="center"
                >
                  {accountconfirmations?.map((confirmation) => (
                    <option key={confirmation} value={confirmation}>
                      {confirmation}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                mt={5}
              >
                {confirmationsOperation.map((confirmation) => (
                  <Box
                    key={confirmation}
                    my={2}
                    fontSize="25px"
                    display="flex"
                    justifyContent="space-between"
                    width={300}
                  >
                    <Text mr={5}>{confirmation}</Text>
                    <IconButton
                      colorScheme="teal"
                      variant="outline"
                      /* bg={useColorModeValue('gray.300', 'gray.800')} */
                      icon={<FaRegTimesCircle />}
                      type="button"
                      onClick={() => handlerDeleteConfirmation(confirmation)}
                    />
                  </Box>
                ))}
              </Box>
              <FormControl mt={2}>
                <Center>
                  <FormLabel
                    htmlFor="linkEntry"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Link Entrada tradingView
                  </FormLabel>
                </Center>
                <Input
                  type="url"
                  id="linkEntry"
                  {...register('linkEntry')}
                  borderColor={useColorModeValue('black', 'white')}
                  textAlign="center"
                />
              </FormControl>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={250}>
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
                      type="number"
                      step="any"
                      id="risk"
                      {...register('risk')}
                      borderColor={useColorModeValue('black', 'white')}
                      isReadOnly
                      textAlign="center"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={2} width={250}>
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
                    type="number"
                    step="any"
                    id="lottery"
                    {...register('lottery')}
                    borderColor={useColorModeValue('black', 'white')}
                    isReadOnly
                    textAlign="center"
                  />
                </FormControl>
              </Box>
              <FormControl mt={2}>
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
              <Center>
                <Button
                  borderRadius={20}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
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
