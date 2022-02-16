import { Button, useColorModeValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonAddAcount = () => {
  const navigate = useNavigate();
  const handlerSubmit = () => {
    navigate('/pages/createoperation');
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
      Agregar operación
    </Button>
  );
};
export default ButtonAddAcount;
