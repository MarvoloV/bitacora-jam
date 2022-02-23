/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import {
  Text,
  Heading,
  Box,
  Avatar,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  /* email: yup.string().email().required('Ingrese un correo electronico'),
  userName: yup.string().required('Ingrese un nombre de Usuario'), */
  name: yup.string().required('rellene el campo contraseña'),
  country: yup.string().required('rellene el campo confirmar contraseña'),
  celphone: yup.string(),
});
const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignupSchema) });

  const onSubmit = () => {};
  /* const onSubmit = (data) => {}; */
  return (
    <Box>
      <Text color="gray.500" fontSize={15} fontWeight="light">
        DESCRIPCION GENERAL
      </Text>
      <Heading as="h1" color="blue" fontSize={30}>
        Perfil de usuario
      </Heading>
      <Box
        display="flex"
        alignItems="center"
        mt={10}
        justifyContent="space-around"
      >
        <Center
          bg="red.700"
          width={{
            base: '100%', // 0-48em
            md: '100%', // 48em-80em,
            lg: '50%', // 80em+
            xl: '35%',
          }}
          height="lg"
          flexDirection="column"
          borderRadius="20px"
        >
          <Avatar
            size="3xl"
            src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          />
          <Heading as="h2" fontSize={40} fontWeight="normal">
            Justina Clark
          </Heading>
        </Center>

        <Center
          width={{
            base: '100%', // 0-48em
            md: '100%', // 48em-80em,
            lg: '60%', // 80em+
            xl: '60%',
          }}
          height="lg"
          flexDirection="column"
          borderRadius="20px"
          border="3px"
          borderColor="red"
        >
          <form onSubmit={handleSubmit(onSubmit)} fontWeight="ligth">
            <FormControl>
              <Center>
                <FormLabel htmlFor="email" fontSize={20} fontWeight="bold">
                  Correo Electronico
                </FormLabel>
              </Center>
              <Input
                value="jorgead0812@gmail.com"
                type="email"
                id="email"
                isDisabled
                color="red"
                fontWeight="black"
              />
            </FormControl>
            <FormControl>
              <Center>
                <FormLabel htmlFor="userName" fontSize={20} fontWeight="bold">
                  Nombre de usuario
                </FormLabel>
              </Center>
              <Input
                type="text"
                id="userName"
                value="Marvolov"
                isDisabled
                color="red"
                fontWeight="black"
              />
            </FormControl>
            <FormControl>
              <Center>
                <FormLabel htmlFor="name" fontSize={20} fontWeight="bold">
                  Nombre Completo
                </FormLabel>
              </Center>
              <InputGroup>
                <Input type="text" {...register('name')} />
              </InputGroup>
              {errors.name && <p>{errors.name.message}</p>}
            </FormControl>
            <FormControl>
              <Center>
                <FormLabel htmlFor="country" fontSize={20} fontWeight="bold">
                  Pais
                </FormLabel>
              </Center>
              <Input type="text" id="country" {...register('country')} />
              {errors.country && <p>{errors.country.message}</p>}
            </FormControl>
            <FormControl>
              <Center>
                <FormLabel htmlFor="celphone" fontSize={20} fontWeight="bold">
                  Celular
                </FormLabel>
              </Center>
              <Input type="text" id="celphone" {...register('celphone')} />
            </FormControl>
            <Button
              borderRadius={20}
              type="submit"
              variant="solid"
              colorScheme="whatsapp"
              width="full"
              mt={7}
            >
              Actualizar datos
            </Button>
          </form>
        </Center>
      </Box>
    </Box>
  );
};
export default Profile;
