import { Button, useColorModeValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonAddOperation = () => {
  const navigate = useNavigate();
  const handlerSubmit = () => {
    navigate('/pages/createaccount');
  };
  return (
    <Button
      bg={useColorModeValue('teal.300', 'teal.600')}
      variant="outline"
      rightIcon={<AddIcon />}
      rounded="xl"
      mb={10}
      _hover={{
        bg: 'teal.500',
      }}
      _focus={{
        bg: 'teal.500',
      }}
      onClick={handlerSubmit}
    >
      Agregar Una Cuenta
    </Button>
  );
};
export default ButtonAddOperation;
