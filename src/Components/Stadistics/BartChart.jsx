/* eslint-disable react/forbid-prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
ChartJS.defaults.font.size = 16;
const options = {
  fill: true,
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};
const BartChart = ({ operationDate }) => {
  const dateMonth = [];
  const [dateprueba, setDateprueba] = useState([]);
  /* console.log(
    '🚀 ~ file: LineChart.jsx ~ line 49 ~ LineChart ~ dateprueba',
    dateprueba,
  ); */
  // const [sum, setSum] = useState([]);
  // const [monthData, setmonthData] = useState([]);
  // useEffect(() => {
  //   setSum([]);
  //   setmonthData([]);
  // }, []);
  const calculateMoneyPerMonth = () => {
    let aux = 0;
    operationDate?.forEach((op) => {
      let profit = 0;
      let stopLoss = 0;
      op?.forEach((date) => {
        if (date.tradingResult === 'GANADA') {
          profit += 1;
        } else if (date.tradingResult === 'PERDIDA') {
          stopLoss += 1;
        }
      });
      const auxDateMonth = DateTime.fromISO(
        operationDate[aux][0]?.dateOperation,
      )
        .setLocale('pe')
        .toFormat('LLLL');
      const auxNumberMonth = DateTime.fromISO(
        operationDate[aux][0]?.dateOperation,
      )
        .setLocale('pe')
        .toFormat('L');
      if (stopLoss || profit) {
        const prueba = {
          profit,
          stopLoss,
          month: auxDateMonth,
          num: parseInt(auxNumberMonth, 10),
        };
        dateMonth.push(prueba);
      }
      aux += 1;
    });
    dateMonth.sort((a, b) => a.num - b.num);
  };
  useEffect(() => {
    if (operationDate.length) {
      calculateMoneyPerMonth();
    }
    setDateprueba(dateMonth);
  }, [operationDate]);
  const data = {
    datasets: [
      {
        label: 'Operaciones Ganadas',
        data: dateprueba.map((d) => d.profit),
        borderColor: 'rgba(0, 0, 0, 1)',
        backgroundColor: 'rgba(255, 0, 145, 0.8)',
      },
      {
        label: 'Operaciones Perdidas',
        data: dateprueba.map((d) => d.stopLoss),
        borderColor: 'rgba(0, 0, 0, 1)',
        backgroundColor: 'rgba(0, 53, 255, 0.93)',
      },
    ],
    labels: dateprueba.map((d) => d.month),
  };

  return <Bar data={data} options={options} />;
};
export default BartChart;
BartChart.propTypes = {
  operationDate: PropTypes.array.isRequired,
};
