/* eslint-disable react/no-children-prop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  /*   InputGroup,
  InputRightElement, */
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { sendAccount } from '../../store/actions/accountActions';

const SignupSchema = yup.object().shape({
  accountName: yup.string().required('Ingrese un nombre de la cuenta'),
  accountAmount: yup.number().required('Ingrese un monto para la cuenta'),
  accountType: yup
    .string()
    .required('"seleccionar una de las opciones por favor'),
});

const AddAcount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(SignupSchema) });
  const [confirmations, setConfirmations] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const handlerAddConfirmation = (e) => {
    e.preventDefault();
    setConfirmations([...confirmations, getValues('confirmations')]);
    setValue('confirmations', '');
  };
  const handlerDeleteConfirmation = (confirmationCompare) => {
    const updateConfirmations = confirmations.filter(
      (confirmation) => confirmation !== confirmationCompare,
    );
    setConfirmations(updateConfirmations);
  };
  const onSubmit = async ({ accountName, accountAmount, accountType }) => {
    try {
      const newFormAccount = {
        accountName,
        accountAmount,
        accountType,
        confirmations,
      };
      dispatch(sendAccount(newFormAccount, user.accountId, user._id));
      await MySwal.fire({
        title: <strong>Buen trabajo!</strong>,
        html: <i>Cuenta Creada!</i>,
        icon: 'success',
      });
      navigate('/pages/home');
    } catch (error) {
      await MySwal.fire({
        title: <strong>Algo ha sucedido</strong>,
        html: <i>{`Alguno de los campos es innválido. ${error}`}</i>,
        icon: 'error',
      });
    }
  };
  return (
    <Box>
      <Center>
        <Stack
          p="1rem"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="md"
          /* h="80vh" */
          justifyContent="center"
          borderRadius={20}
          width={1000}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Center>
                <FormLabel
                  htmlFor="accountName"
                  fontSize={20}
                  fontWeight="bold"
                >
                  Nombre de la cuenta
                </FormLabel>
              </Center>
              <Input
                type="text"
                id="accountName"
                {...register('accountName')}
                border="2px solid"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </FormControl>
            <FormControl mt={2}>
              <Center>
                <FormLabel
                  htmlFor="accountAmount"
                  fontSize={20}
                  fontWeight="bold"
                >
                  Monto de la cuenta
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
                  id="accountAmount"
                  {...register('accountAmount')}
                />
              </InputGroup>

              {errors.amount && <p>{errors.amount.message}</p>}
            </FormControl>
            <FormControl mt={2}>
              <Center>
                <FormLabel
                  htmlFor="accountType"
                  fontSize={20}
                  fontWeight="bold"
                >
                  Tipo de Cuenta
                </FormLabel>
              </Center>

              <Select
                id="accountType"
                placeholder="Seleccionar cuenta"
                {...register('accountType', { required: true })}
              >
                <option value="Demo">Demo</option>
                <option value="Real">Real</option>
                <option value="Testing">Testing</option>
              </Select>
              {errors.typeAccount && <p>{errors.typeAccount.message}</p>}
            </FormControl>
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
              <Center justifyContent="space-between">
                <Input
                  type="text"
                  id="confirmations"
                  {...register('confirmations')}
                  width="75%"
                />
                <Button type="button" onClick={handlerAddConfirmation}>
                  Agregar Confirmación
                </Button>
              </Center>
            </FormControl>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              mt={5}
            >
              {confirmations.map((confirmation) => (
                <Box
                  key={confirmation}
                  my={2}
                  /* textAlign="end" */ fontSize="25px"
                  display="flex"
                  justifyContent="space-between"
                  width={300}
                >
                  <Text mr={5}>{confirmation}</Text>
                  <IconButton
                    icon={<BiTrash />}
                    type="button"
                    onClick={() => handlerDeleteConfirmation(confirmation)}
                  />
                </Box>
              ))}
            </Box>

            <Center>
              <Button
                borderRadius={20}
                type="submit"
                variant="solid"
                bg="green.400"
                _hover={{
                  bg: 'green.600',
                }}
                _focus={{
                  bg: 'green.500',
                }}
                mt={6}
              >
                Agregar
              </Button>
            </Center>
          </form>
        </Stack>
      </Center>
    </Box>
  );
};

export default AddAcount;
