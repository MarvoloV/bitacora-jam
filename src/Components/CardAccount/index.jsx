/* eslint-disable react/jsx-one-expression-per-line */
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardAccount = ({ accountName, accountAmount, accountType, id }) => {
  const navigate = useNavigate();
  const handlerAccount = () => {
    navigate(`/pages/reportaccount/${id}`);
  };
  return (
    <Center py={6} width="400px">
      <Box
        maxW="330px"
        w="full"
        bg={useColorModeValue('teal.300', 'gray.800')}
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
      >
        <Stack
          textAlign="center"
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align="center"
        >
          <Stack direction="row" align="center" justify="center">
            <Text fontSize="3xl" fontWeight={800}>
              {accountName}
            </Text>
            {/* <Text fontSize="3xl">ID:</Text> */}
            {/* <Text fontSize="3xl" fontWeight={800}>
              101541845
            </Text> */}
          </Stack>
          <Stack direction="row" align="center" justify="center">
            <Text fontSize="xl">BROKER:</Text>
            <Text fontSize="xl" fontWeight={800}>
              ICMARKETS
            </Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckIcon} color="teal.400" />$ {accountAmount}{' '}
              dolares
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="teal.400" />
              {accountType}
            </ListItem>
          </List>

          <Button
            mt={10}
            w="full"
            bg={useColorModeValue('teal.300', 'teal.600')}
            rounded="xl"
            _hover={{
              bg: 'teal.500',
            }}
            _focus={{
              bg: 'teal.500',
            }}
            onClick={handlerAccount}
          >
            Ir a la Cuenta
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default CardAccount;
CardAccount.propTypes = {
  accountName: PropTypes.string.isRequired,
  accountAmount: PropTypes.number.isRequired,
  accountType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
