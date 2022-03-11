/* eslint-disable react/forbid-prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      labels: {
        font: {
          size: 20,
        },
      },
    },
  },
};
const LineChart = ({ operationDate }) => {
  const dateMonth = [];
  const [dateprueba, setDateprueba] = useState([]);
  const calculateMoneyPerMonth = () => {
    let aux = 0;
    operationDate?.forEach((op) => {
      let suma = 0;
      op?.forEach((date) => {
        suma += date.resultMoney;
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
      if (suma) {
        const prueba = {
          suma,
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
        label: 'Resultado $',
        data: dateprueba.map((d) => d.suma),
        tension: 0.3,
        borderColor: 'rgb(75, 192, 192)',
        pointRadius: 3,
        pointBackgroundColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
      },
    ],
    labels: dateprueba.map((d) => d.month),
  };

  return <Line data={data} options={options} />;
};
export default LineChart;
LineChart.propTypes = {
  operationDate: PropTypes.array.isRequired,
};
