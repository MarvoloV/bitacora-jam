import { Button, useColorModeValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';

const AddAcount = () => (
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
  >
    Agregar Una cuenta
  </Button>
);
export default AddAcount;
