import { Box, Heading, Text, Button, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const handlerHome = () => {
    navigate('/pages/home');
  };

  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Center flexDirection="column" width="100vW" height="50vh">
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="30px" mt={3} mb={2}>
          Página no encontrada
        </Text>
        <Text color="gray.500" mb={6} fontSize={20}>
          La página que busca no existe
        </Text>

        <Button
          type="button"
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          onClick={handlerHome}
        >
          Go to Home
        </Button>
      </Center>
    </Box>
  );
};
export default NotFound;
