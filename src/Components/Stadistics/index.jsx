import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../../store/actions/accountActions';

const StatsCard = ({ title, stat, color }) => (
  <Stat
    px={{ base: 2, md: 4 }}
    py="2"
    /* shadow="xl" */
    border="1px solid"
    borderColor={useColorModeValue('gray.200', 'gray.800')}
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

const BasicStatistics = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { operation } = useSelector((state) => state.account.operations);
  const [takeProfit, setTakeProfit] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [breakEven, setBreakEven] = useState(0);
  const [percentage, setpercentaje] = useState(100);
  console.log(
    '🚀 ~ file: index.jsx ~ line 43 ~ BasicStatistics ~ operation',
    operation,
  );
  const calculateStatus = () => {
    const sl = operation.filter((op) => op.tradingResult === 'PERDIDA');
    const tp = operation.filter((op) => op.tradingResult === 'GANADA');
    const be = operation.filter((op) => op.tradingResult === 'BREAK EVEN');
    let auxPercentage = 100;
    operation.forEach((op) => {
      auxPercentage += op.resultPercentage;
    });
    if (auxPercentage % 1 === 0) {
      setpercentaje(auxPercentage);
    } else {
      setpercentaje(parseFloat(auxPercentage.toFixed(1)));
    }
    setTakeProfit(tp.length);
    setStopLoss(sl.length);
    setBreakEven(be.length);
  };
  useEffect(() => {
    // useDispatch(fetchUser(token, userIdFromToken));
    dispatch(fetchAccounts(id));
  }, []);
  useEffect(() => {
    calculateStatus();
  }, [operation]);

  return (
    <Box maxW="5xl" mx="auto" pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid
        columns={{ sm: 1, base: 2, md: 2, lg: 2, xl: 5 }}
        spacing={{ base: 5, lg: 8 }}
      >
        <StatsCard title="TOTAL" stat={operation.length} color="purple.500" />
        <StatsCard title="TAKE PROFIT" stat={takeProfit} color="teal.400" />
        <StatsCard title="STOP LOSS" stat={stopLoss} color="red" />
        <StatsCard title="BREAK EVEN" stat={breakEven} color="yellow.500" />
        <StatsCard title="% DE LA CUENTA" stat={percentage} color="cyan" />
      </SimpleGrid>
    </Box>
  );
};
export default BasicStatistics;

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
