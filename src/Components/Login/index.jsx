/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Image,
  Center,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { fetchLogin } from '../../store/actions/authActionsCreator';
import imageLogin from '../../assets/login.jpg';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const LoginSchema = yup.object().shape({
  email: yup.string().email().required('Ingrese un correo electronico'),
  password: yup.string().required('Ingrese su  contraseña'),
});
const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [showPassword, setShowPassword] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const onSubmit = ({ email, password }) => {
    dispatch(fetchLogin(email, password));
  };
  useEffect(() => {
    if (token) {
      // setErrors({ error: '' });
      localStorage.setItem('token', JSON.stringify(token));
      navigate('/pages/home', { replace: true });
    } else {
      // setErrors({ ...errors, error: 'Email or password are wrong' });
    }
  }, [token]);
  return (
    <Flex
      flexDirection="row"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
    >
      <Stack direction="row">
        <Image
          width="50vw"
          height="100vh"
          objectFit="cover"
          src={imageLogin}
          alt="Imagen Login"
        />
      </Stack>
      <Stack
        margin="auto"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="black" />
        <Heading color="black">Bienvenido</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              justifyContent="center"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="black" />}
                  />
                  <Input
                    type="email"
                    placeholder="Correo Electronico"
                    {...register('email', {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                </InputGroup>
                {errors.email && <p>{errors.email.message}</p>}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="black" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="on"
                    placeholder="Contraseña"
                    {...register('password', { required: true })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Ocultar' : 'Ver'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <p>{errors.password.message}</p>}
                <FormHelperText textAlign="right">
                  <Link as={RouterLink} to="/forgotpassword">
                    ¿Olvidó su contraseña?
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={20}
                type="submit"
                variant="solid"
                colorScheme="whatsapp"
                width="full"
                fontSize={18}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          ¿No tienes una cuenta?
          <Link
            as={RouterLink}
            to="/register"
            color="blue.700"
            fontSize={18}
            textDecor="revert"
            href="/"
            fontWeight="semibold"
          >
            {' Registrate'}
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
              Iniciar con Facebook
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
              Iniciar con Google
            </Button>
          </Center>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
