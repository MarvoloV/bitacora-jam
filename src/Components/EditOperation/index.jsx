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
  sendOperation,
} from '../../store/actions/operationActions';
import { fetchUser } from '../../store/actions/userActionsCreator';

const SignupSchema = yup.object().shape({
  /* account: yup.string().required('Ingrese un correo electronico'), */
  amount: yup.string().required('Ingrese un nombre de Usuario'),
});
const EditOperation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(SignupSchema) });
  const { id } = useParams();
  const watchShowAmount = watch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const user = useSelector((state) => state.user.user);
  const operation = useSelector((state) => state.operation.operationId);
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
    dispatch(fetchIdOperation(id));
  }, [token]);
  useEffect(() => {
    setValue('account', `${operation.account}`);
    setValue('currencyBase', `${operation.currencyBase}`);
    setValue('currencyQuote', `${operation.currencyQuote}`);
    setValue('amount', `${operation.operationAmount}`);
    setValue('stopLoss', `${operation.stopLoss}`);
    setValue('linkEntry', `${operation.linkEntry}`);
    setValue('typeOfEntry', `${operation.typeOfEntry}`);
    setValue('risk', `${operation.risk}`);
    setValue('lottery', `${operation.lottery}`);
    setConfirmationsOperation(operation.confirmationsOperation);
  }, [operation]);

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
  const onSubmit = async ({
    linkEntry,
    lottery,
    risk,
    stopLoss,
    amount,
    currencyQuote,
    currencyBase,
    account,
    typeOfEntry,
  }) => {
    try {
      const currencyPair = `${currencyBase}/${currencyQuote}`;
      const newFormAccount = {
        dateOperation: value,
        account,
        currencyBase,
        currencyQuote,
        currencyPair,
        operationAmount: amount,
        stopLoss,
        risk,
        lottery,
        linkEntry,
        typeOfEntry,
        confirmationsOperation,
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
        html: <i>{`Alguno de los campos es innválido. ${error}`}</i>,
        icon: 'error',
      });
      console.error(error);
    }
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
  useEffect(() => {
    if (watchShowAmount.account) {
      handlerConfirmation();
    }
  }, [watchShowAmount.confirmations]);

  //  console.log('🚀 ~ file: index.jsx ~ line 170 ~ AddOperation ~ value', value);
  // const dateFormat = value.toLocaleDateString();

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
                    /* color="black" */
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input type="text" id="amount" {...register('amount')} />
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
                  <Input type="text" id="stopLoss" {...register('stopLoss')} />
                </InputGroup>
                {/* {errors.amount && <p>{errors.amount.message}</p>} */}
              </FormControl>
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
                  border="2px solid"
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
                <Input type="url" id="linkEntry" {...register('linkEntry')} />
              </FormControl>
              <FormControl mt={2}>
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
                  border="2px solid"
                >
                  <option value="Compra">Compra</option>
                  <option value="Venta">Venta</option>
                </Select>
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
                    type="text"
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
                  type="text"
                  id="lottery"
                  {...register('lottery')}
                  isReadOnly
                />
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
export default EditOperation;
