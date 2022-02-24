/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
  fetchIdOperation,
  fetchUpdateOperation,
} from '../../store/actions/operationActions';
import { fetchUser } from '../../store/actions/userActionsCreator';
import { parDivisa, PrecioCotizante } from '../../data/data';

const SignupSchema = yup.object().shape({
  /* account: yup.string().required('Ingrese un correo electronico'), */
  amount: yup.string().required('Ingrese un nombre de Usuario'),
});
const EditOperation = () => {
  const operation = useSelector((state) => state.operation.operationId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const { id } = useParams();
  const watchShowAmount = watch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);
  const userIdFromToken = jwtDecode(token)._id || null;
  const [cotizante, setCotizante] = useState([]);
  const [accountconfirmations, setAccountConfirmations] = useState([]);
  const [accountUser, setAccountUser] = useState({});
  const [confirmationsOperation, setConfirmationsOperation] = useState([]);
  const accounts = user.accountId;
  useEffect(() => {
    dispatch(fetchUser(token, userIdFromToken));
    dispatch(fetchIdOperation(id));
  }, [token]);
  useEffect(() => {
    setConfirmationsOperation(operation.confirmationsOperation);
    if (operation.dateOperation) {
      reset({
        ...operation,
        dateOperation: new Date(operation.dateOperation),
        amount: operation.operationAmount,
      });
    }
  }, [operation]);
  const handlerRisk = () => {
    const accountData = accounts?.find(
      (account) => account.accountName === watchShowAmount.account,
    );
    const amount = parseInt(watchShowAmount.amount || 0, 10);
    if (accountData) {
      setAccountUser(accountData);
      setAccountConfirmations(accountData.confirmations);
      const riskData = (100 * amount) / (accountData.accountAmount || 0);
      setValue('risk', riskData);
    }
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
    const repeat = confirmationsOperation?.find(
      (confirmation) => confirmation === watchShowAmount.confirmations,
    );
    if (!repeat) {
      const addConfirmation = accountconfirmations?.find(
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
  const handlerResultOperation = () => {
    if (
      !watchShowAmount.resultPercentage &&
      !watchShowAmount.resultMoney &&
      !watchShowAmount.resultPips
    ) {
      const stopLoss = parseInt(watchShowAmount.stopLoss, 10) || 0;
      const takeProfit = parseInt(watchShowAmount.takeProfit, 10) || 0;
      const riskBenefit = takeProfit / stopLoss;
      const valuePip = watchShowAmount.amount / watchShowAmount.stopLoss;
      if (watchShowAmount.tradingResult === 'GANADA') {
        if (riskBenefit % 1 === 0) {
          const resultPercentageOp = watchShowAmount.risk * riskBenefit;
          setValue('resultPercentage', resultPercentageOp);
        } else {
          const resultPercentageOp =
            watchShowAmount.risk * riskBenefit.toFixed(2);
          setValue('resultPercentage', resultPercentageOp);
        }
        setValue('resultPips', watchShowAmount.takeProfit);
        setValue('resultMoney', valuePip * takeProfit);
      } else if (watchShowAmount.tradingResult === 'PERDIDA') {
        if (riskBenefit % 1 === 0) {
          const resultPercentageOp = watchShowAmount.risk * riskBenefit;
          setValue('resultPercentage', resultPercentageOp * -1);
        } else {
          const resultPercentageOp =
            watchShowAmount.risk * riskBenefit.toFixed(2);
          setValue('resultPercentage', resultPercentageOp * -1);
        }
        setValue('resultPips', watchShowAmount.takeProfit * -1);
        setValue('resultMoney', valuePip * takeProfit * -1);
      }
    }

    /* -0.08 */
  };
  const onSubmit = async ({
    dateOperation,
    account,
    tradingResult,
    currencyBase,
    currencyQuote,
    amount,
    typeOfEntry,
    stopLoss,
    takeProfit,
    linkEntry,
    linkOutput,
    risk,
    lottery,
    riskBenefit,
    resultPips,
    resultPercentage,
    resultMoney,
  }) => {
    try {
      const currencyPair = `${currencyBase}/${currencyQuote}`;
      const newFormAccount = {
        dateOperation,
        account,
        tradingResult,
        currencyBase,
        currencyQuote,
        currencyPair,
        operationAmount: amount,
        typeOfEntry,
        stopLoss,
        takeProfit,
        confirmationsOperation,
        linkEntry,
        linkOutput,
        risk,
        lottery,
        riskBenefit,
        resultPips,
        resultPercentage,
        resultMoney,
      };
      dispatch(fetchUpdateOperation(newFormAccount, id));
      await MySwal.fire({
        title: <strong>Buen trabajo!</strong>,
        html: <i>Operacion Actualizada!</i>,
        icon: 'success',
      });
      navigate('/pages/operations');
    } catch (error) {
      await MySwal.fire({
        title: <strong>Algo ha sucedido</strong>,
        html: <i>{`Alguno de los campos es innválido. ${error}`}</i>,
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
  useEffect(() => {
    handlerResultOperation();
  }, [watchShowAmount.tradingResult]);

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
                    htmlFor="dateOperation"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Fecha y hora
                  </FormLabel>
                </Center>
                <Center flexDirection="row" justifyContent="space-around">
                  <Controller
                    control={control}
                    name="dateOperation"
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        value={value}
                        format="dd-MM-y"
                      />
                    )}
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
                      htmlFor="tradingResult"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Resultado:
                    </FormLabel>
                  </Center>
                  <Select
                    id="tradingResult"
                    placeholder="Seleccionar resultado"
                    {...register('tradingResult', { required: true })}
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
                  >
                    <option value="ACTIVA">ACTIVA</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="GANADA">GANADA</option>
                    <option value="PERDIDA">PERDIDA</option>
                    <option value="BREAK EVEN">BREAK EVEN</option>
                  </Select>
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
                    width="250px"
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
                      /* color="black" */
                      fontSize="1.2em"
                      children="$"
                    />
                    <Input
                      type="number"
                      step="any"
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
                  placeholder="Seleccionar confirmaciones"
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
                {confirmationsOperation?.map((confirmation) => (
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
              <FormControl mt={2}>
                <Center>
                  <FormLabel
                    htmlFor="linkOutput"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Link Salida tradingView
                  </FormLabel>
                </Center>
                <Center>
                  <Input
                    type="url"
                    id="linkOutput"
                    {...register('linkOutput')}
                    borderColor={useColorModeValue('black', 'white')}
                    textAlign="center"
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
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <FormControl mt={2} width={250}>
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
                <FormControl mt={2} width={250}>
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
                      type="number"
                      step="any"
                      id="resultPips"
                      {...register('resultPips')}
                      borderColor={useColorModeValue('black', 'white')}
                      textAlign="center"
                    />
                  </InputGroup>
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
                      type="number"
                      step="any"
                      id="resultPercentage"
                      {...register('resultPercentage')}
                      borderColor={useColorModeValue('black', 'white')}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={2} width={250}>
                  <Center>
                    <FormLabel
                      htmlFor="resultMoney"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      Resultado (USD)
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
                      step="any"
                      id="resultMoney"
                      {...register('resultMoney')}
                      borderColor={useColorModeValue('black', 'white')}
                    />
                  </InputGroup>
                </FormControl>
              </Box>
              <Center>
                <Button
                  borderRadius={20}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  mt={5}
                >
                  Actualizar operacion
                </Button>
              </Center>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default EditOperation;
