/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
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
import { month } from '../../data/data';
import { fetchAccounts } from '../../store/actions/accountActions';
import LineChart from './LineChart';
import BartChart from './BartChart';
import {
  cleanedOperationDate,
  fetchOperationDate,
} from '../../store/actions/operationActions';

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
  const { operationMonth } = useSelector((state) => state.operation);
  const [takeProfit, setTakeProfit] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [breakEven, setBreakEven] = useState(0);
  const [percentage, setpercentaje] = useState(100);

  /* operation?.forEach((op) => {
    const fecha = DateTime.fromISO(op.dateOperation).toLocaleString({
      month: 'long',
    });
    if (fecha === 'Enero') {
      suma += op.resultMoney;
      const datos = { fecha, suma };
      data.push(datos);
    }
    console.log(fecha);
  }); */

  /* console.log(
    '🚀 ~ file: index.jsx ~ line 55 ~ BasicStatistics ~ dateOperationMonth',
    dateOperationMonth,
  ); */
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
    dispatch(cleanedOperationDate());
  }, []);
  useEffect(() => {
    month.forEach((m) =>
      dispatch(fetchOperationDate(id, m.startDate, m.endDate)),
    );
  }, [operation.loader]);
  useEffect(() => {
    calculateStatus();
  }, [operation]);
  return (
    <>
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
      <Box display="flex " mt={100} justifyContent="space-around">
        <Box width={750} bg={useColorModeValue('white', 'gray.800')}>
          <LineChart operationDate={operationMonth} />
        </Box>
        <Box width={750} bg={useColorModeValue('white', 'gray.800')}>
          <BartChart operationDate={operationMonth} />
        </Box>
      </Box>
    </>
  );
};

export default BasicStatistics;

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
