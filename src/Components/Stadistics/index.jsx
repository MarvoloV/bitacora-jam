/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const StatsCard = ({ title, stat, color }) => (
  <Stat
    px={{ base: 2, md: 4 }}
    py="2"
    /* shadow="xl" */
    border="1px solid"
    borderColor={useColorModeValue('gray.800', 'gray.800')}
    rounded="lg"
    bg={color}
  >
    <Flex justifyContent="center">
      <Box>
        <StatLabel isTruncated fontSize="xl">
          {title}
        </StatLabel>
        <StatNumber fontSize="5xl" fontWeight="medium" textAlign="center">
          {stat}
        </StatNumber>
      </Box>
    </Flex>
  </Stat>
);

const BasicStatistics = () => (
  <Box maxW="5xl" mx="auto" pt={5} px={{ base: 2, sm: 12, md: 17 }}>
    <SimpleGrid
      columns={{ sm: 1, base: 2, md: 2, lg: 2, xl: 4 }}
      spacing={{ base: 5, lg: 8 }}
    >
      <StatsCard title="TOTAL" stat="50" color="purple.500" />
      <StatsCard title="TAKE PROFIT" stat="10" color="teal.400" />
      <StatsCard title="STOP LOSS" stat="33" color="red" />
      <StatsCard title="BREAK EVEN" stat="7" color="yellow.500" />
    </SimpleGrid>
  </Box>
);
export default BasicStatistics;

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  stat: PropTypes.string.isRequired,
};
