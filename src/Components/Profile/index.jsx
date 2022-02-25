/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
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
  useColorModeValue,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import getCurrentLocalStorage from '../../store/utils/LocalStorageUtils';
import {
  fetchUpdateAvatarUser,
  fetchUpdateUser,
} from '../../store/actions/userActionsCreator';

const SignupSchema = yup.object().shape({
  name: yup.string().required('rellene el campo del nombre'),
  country: yup.string().required('rellene el campo contry'),
  celphone: yup.string(),
});
const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(SignupSchema) });
  const user = useSelector((state) => state.user.user);
  const token = getCurrentLocalStorage('token');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState('md');
  const [mainImage, setMainImage] = useState(null);
  const [formAvatar, setFormAvatar] = useState({ image: '' });
  const MySwal = withReactContent(Swal);
  const defaultPicture =
    'https://user-images.githubusercontent.com/13368066/151895402-67d28c80-17a8-4a35-8bab-b0be177cbfda.png';
  const [avatar, setAvatar] = useState(defaultPicture);
  useEffect(() => {
    setAvatar(user.picture ?? defaultPicture);
    reset(user);
  }, [user]);
  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };
  const onChangeFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = async () => {
      setMainImage(reader.result);
    };
    setFormAvatar(() => ({
      mainImage: e.target.files[0],
    }));
  };
  const handleChangePicture = async () => {
    try {
      const formDataImageMain = new FormData();
      formDataImageMain.append('image', formAvatar.mainImage);
      dispatch(fetchUpdateAvatarUser(formDataImageMain, user._id, token));
      onClose();
      await MySwal.fire({
        title: <strong>Buen trabajo!</strong>,
        html: <i>Foto Actualizada!</i>,
        icon: 'success',
      });
    } catch (error) {
      await MySwal.fire({
        title: <strong>Algo ha sucedido</strong>,
        html: <i>Hay un error con la imagen {error}.</i>,
        icon: 'error',
      });
    }
  };
  const onSubmit = async (data) => {
    try {
      dispatch(fetchUpdateUser(data, user._id, token));
      await MySwal.fire({
        title: <strong>Buen trabajo!</strong>,
        html: <i>Perfil Actualizado!</i>,
        icon: 'success',
      });
    } catch (error) {
      await MySwal.fire({
        title: <strong>Algo ha sucedido</strong>,
        html: <i>Hay un error con los datos {error}.</i>,
        icon: 'error',
      });
    }
  };
  return (
    <Box>
      <Text
        color={useColorModeValue('gray.800', 'gray.200')}
        fontSize={15}
        fontWeight="light"
      >
        DESCRIPCION GENERAL
      </Text>
      <Heading as="h1" color={useColorModeValue('blue', 'white')} fontSize={30}>
        Perfil de usuario
      </Heading>
      <Box
        display="flex"
        alignItems="center"
        mt={10}
        justifyContent="space-around"
        flexWrap="wrap"
      >
        <Center
          bg={useColorModeValue('white', 'gray.800')}
          width={{
            base: '90%', // 0-48em
            md: '90%', // 48em-80em,
            lg: '50%', // 80em+
            xl: '35%',
          }}
          height="lg"
          flexDirection="column"
          borderRadius="20px"
          mb={20}
        >
          <Avatar
            size="2xl"
            src={avatar}
            alt={user?.username}
            onClick={() => handleSizeClick('xl')}
          />
          <Heading as="h2" fontSize={40} fontWeight="normal">
            @ {user.username}
          </Heading>
          <Modal onClose={onClose} size={size} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edita tu imagen de perfil</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  type="file"
                  className="avatarImage"
                  accept="image/png, .jpeg, .jpg,"
                  onChange={onChangeFile}
                />
                <img src={mainImage} alt="avatarImage" />
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={handleChangePicture}
                  style={{
                    marginTop: 15,
                    maxWidth: 200,
                    alignSelf: 'center',
                  }}
                >
                  Cambiar imagen
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Center>
        <Center
          width={{
            base: '90%', // 0-48em
            md: '90%', // 48em-80em,
            lg: '40%', // 80em+
            xl: '40%',
          }}
          height="lg"
          flexDirection="column"
          borderRadius="20px"
          bg={useColorModeValue('white', 'gray.800')}
          mb={20}
        >
          <form onSubmit={handleSubmit(onSubmit)} fontWeight="ligth">
            <FormControl>
              <Center>
                <FormLabel htmlFor="email" fontSize={20} fontWeight="bold">
                  Correo Electronico
                </FormLabel>
              </Center>
              <Input
                type="email"
                id="email"
                color="red"
                fontWeight="black"
                isReadOnly
                borderColor={useColorModeValue('black', 'white')}
                {...register('email')}
                textAlign="center"
              />
            </FormControl>
            <FormControl>
              <Center>
                <FormLabel htmlFor="username" fontSize={20} fontWeight="bold">
                  Nombre de usuario
                </FormLabel>
              </Center>
              <Input
                type="text"
                id="username"
                isReadOnly
                color="red"
                fontWeight="black"
                borderColor={useColorModeValue('black', 'white')}
                {...register('username')}
                textAlign="center"
              />
            </FormControl>
            <FormControl>
              <Center>
                <FormLabel htmlFor="name" fontSize={20} fontWeight="bold">
                  Nombre Completo
                </FormLabel>
              </Center>
              <InputGroup>
                <Input
                  type="text"
                  {...register('name')}
                  borderColor={useColorModeValue('black', 'white')}
                  autoComplete="off"
                  textAlign="center"
                />
              </InputGroup>
              {errors.name && <p>{errors.name.message}</p>}
            </FormControl>
            <FormControl>
              <Center>
                <FormLabel htmlFor="country" fontSize={20} fontWeight="bold">
                  Pais
                </FormLabel>
              </Center>
              <Input
                type="text"
                id="country"
                {...register('country')}
                borderColor={useColorModeValue('black', 'white')}
                autoComplete="off"
                textAlign="center"
              />
              {errors.country && <p>{errors.country.message}</p>}
            </FormControl>
            <FormControl>
              <Center>
                <FormLabel htmlFor="cell" fontSize={20} fontWeight="bold">
                  Celular
                </FormLabel>
              </Center>
              <Input
                type="text"
                id="cell"
                {...register('cell')}
                borderColor={useColorModeValue('black', 'white')}
                autoComplete="off"
                textAlign="center"
              />
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
