/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Avatar,
  FormControl,
  FormLabel,
  InputRightElement,
  Image,
  Center,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import registerImagen from '../../assets/register.jpg';

const SignupSchema = yup.object().shape({
  email: yup.string().email().required('Ingrese un correo electronico'),
  userName: yup.string().required('Ingrese un nombre de Usuario'),
  password: yup.string().required('rellene el campo contraseña'),
  rePassword: yup.string().required('rellene el campo confirmar contraseña'),
});
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignupSchema) });
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleReShowClick = () => setShowRePassword(!showRePassword);
  const onSubmit = (data) => console.log(data);
  return (
    <Flex
      flexDirection="row"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"

      // alignItems="center"
    >
      <Stack direction="row">
        <Image
          width="50vw"
          height="100vh"
          objectFit="cover"
          src={registerImagen}
          alt="Dan Abramov"
        />
      </Stack>
      <Stack
        margin="auto"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="black" />
        <Heading color="black">Regístrate</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <Stack
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
            /* h="80vh" */
            justifyContent="center"
            borderRadius={20}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Center>
                  <FormLabel htmlFor="email" fontSize={20} fontWeight="bold">
                    Correo Electronico
                  </FormLabel>
                </Center>
                <Input
                  type="email"
                  id="email"
                  {...register('email', {
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </FormControl>
              <FormControl>
                <Center>
                  <FormLabel htmlFor="userName" fontSize={20} fontWeight="bold">
                    Nombre de usuario
                  </FormLabel>
                </Center>
                <Input type="text" id="userName" {...register('userName')} />
                {errors.userName && <p>{errors.userName.message}</p>}
              </FormControl>
              <FormControl>
                <Center>
                  <FormLabel htmlFor="password" fontSize={20} fontWeight="bold">
                    Contraseña
                  </FormLabel>
                </Center>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Ocultar' : 'Ver'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <p>{errors.password.message}</p>}
              </FormControl>
              <FormControl>
                <Center>
                  <FormLabel
                    htmlFor="rePassword"
                    fontSize={20}
                    fontWeight="bold"
                  >
                    Confirma tu contraseña
                  </FormLabel>
                </Center>
                <InputGroup>
                  <Input
                    type={showRePassword ? 'text' : 'password'}
                    id="rePassword"
                    {...register('rePassword')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleReShowClick}>
                      {showRePassword ? 'Ocultar' : 'Ver'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.rePassword && <p>{errors.rePassword.message}</p>}
              </FormControl>
              <Button
                borderRadius={20}
                type="submit"
                variant="solid"
                colorScheme="whatsapp"
                width="full"
                mt={3}
              >
                Registrarse
              </Button>
            </form>
          </Stack>
        </Box>
        <Box>
          ¿Ya tienes una cuenta?
          <Link
            as={RouterLink}
            to="/"
            color="blue.700"
            fontSize={18}
            textDecor="revert"
            href="/"
            fontWeight="semibold"
          >
            {' Inicia sesión'}
          </Link>
        </Box>
        <Stack direction="row">
          <Center>
            <Button
              borderRadius={20}
              type="submit"
              variant="solid"
              colorScheme="facebook"
              width="35vh"
              leftIcon={<BsFacebook />}
              margin={(0, 5)}
            >
              Registrese con Facebook
            </Button>
          </Center>
          <Center>
            <Button
              borderRadius={20}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="35vh"
              leftIcon={<FcGoogle />}
            >
              Registrese con Google
            </Button>
          </Center>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Register;
