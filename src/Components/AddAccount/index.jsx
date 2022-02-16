/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  /*   InputGroup,
  InputRightElement, */
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const SignupSchema = yup.object().shape({
  name: yup.string().required('Ingrese un nombre de la cuenta'),
  amount: yup.number().required('Ingrese un monto para la cuenta'),
});
/* minW={{ base: '80%', md: '468px' }} */
const AddAcount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignupSchema) });
  const onSubmit = (data) => console.log(data);
  return (
    <Box>
      <Center>
        <Stack
          p="1rem"
          bg={useColorModeValue('gray.200', 'gray.800')}
          boxShadow="md"
          /* h="80vh" */
          justifyContent="center"
          borderRadius={20}
          width={1000}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Center>
                <FormLabel htmlFor="name" fontSize={20} fontWeight="bold">
                  Nombre de la cuenta
                </FormLabel>
              </Center>
              <Input type="text" id="name" {...register('name')} />
              {errors.name && <p>{errors.name.message}</p>}
            </FormControl>
            <FormControl mt={2}>
              <Center>
                <FormLabel htmlFor="amount" fontSize={20} fontWeight="bold">
                  Monto de la cuenta
                </FormLabel>
              </Center>
              <Input type="number" id="amount" {...register('amount')} />
              {errors.amount && <p>{errors.amount.message}</p>}
            </FormControl>
            <FormControl mt={2}>
              <Center>
                <FormLabel
                  htmlFor="typeAccount"
                  fontSize={20}
                  fontWeight="bold"
                >
                  Tipo de Cuenta
                </FormLabel>
              </Center>

              <Select
                id="typeAccount"
                placeholder="Seleccionar cuenta"
                {...register('typeAccount', { required: true })}
              >
                <option value="Demo">Demo</option>
                <option value="Real">Real</option>
                <option value="Testing">Testing</option>
              </Select>
            </FormControl>
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
