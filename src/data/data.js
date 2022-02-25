import { DateTime } from 'luxon';

export const parDivisa = [
  {
    base: 'AUD',
    cotizante: ['CAD', 'CHF', 'JPY', 'NZD', 'USD'],
  },
  {
    base: 'CAD',
    cotizante: ['CHF', 'JPY'],
  },
  {
    base: 'CHF',
    cotizante: ['JPY'],
  },
  {
    base: 'EUR',
    cotizante: ['AUD', 'CAD', 'CHF', 'GBP', 'JPY', 'NZD', 'USD'],
  },
  {
    base: 'GBP',
    cotizante: ['AUD', 'CAD', 'CHF', 'JPY', 'NZD', 'USD'],
  },
  {
    base: 'NZD',
    cotizante: ['CAD', 'CHF', 'JPY', 'USD'],
  },
  {
    base: 'USD',
    cotizante: ['CAD', 'CHF', 'JPY'],
  },
  {
    base: 'XAU',
    cotizante: ['USD'],
  },
  {
    base: 'XAG',
    cotizante: ['USD'],
  },
];
export const PrecioCotizante = [
  {
    cotizante: 'CAD',
    costo: 7.84,
  },
  {
    cotizante: 'CHF',
    costo: 10.85,
  },
  {
    cotizante: 'JPY',
    costo: 8.69,
  },
  {
    cotizante: 'NZD',
    costo: 6.7,
  },
  {
    cotizante: 'USD',
    costo: 10,
  },
  {
    cotizante: 'GBP',
    costo: 13.6,
  },
  {
    cotizante: 'AUD',
    costo: 7.18,
  },
];
export const month = [
  {
    date: 'ENERO',
    number: '01',
    startDate: '2022-01-01',
    endDate: DateTime.fromISO('2022-01-01').endOf('month').toISO(),
  },
  {
    date: 'FEBRERO',
    number: '02',
    startDate: '2022-02-01',
    endDate: DateTime.fromISO('2022-02-01').endOf('month').toISO(),
  },
  {
    date: 'MARZO',
    number: '03',
    startDate: '2022-03-01',
    endDate: DateTime.fromISO('2022-03-01').endOf('month').toISO(),
  },
  // {
  //   date: 'ABRIL',
  //   startDate: '2022-04-01',
  //   endDate: DateTime.fromISO('2022-04-01').endOf('month').toISO(),
  // },
  // {
  //   date: 'MAYO',
  //   startDate: '2022-05-01',
  //   endDate: DateTime.fromISO('2022-05-01').endOf('month').toISO(),
  // },
  // {
  //   date: 'JUNIO',
  //   startDate: '2022-06-01',
  //   endDate: DateTime.fromISO('2022-06-01').endOf('month').toISO(),
  // },
  // {
  //   date: 'JULIO',
  //   startDate: '2022-07-01',
  //   endDate: DateTime.fromISO('2022-07-01').endOf('month').toISO(),
  // },
  // {
  //   date: 'AGOSTO',
  //   startDate: '2022-08-01',
  //   endDate: DateTime.fromISO('2022-08-01').endOf('month').toISO(),
  // },
  // {
  //   date: 'SETIEMBRE',
  //   startDate: '2022-09-01',
  //   endDate: DateTime.fromISO('2022-09-01').endOf('month').toISO(),
  // },
  // {
  //   date: 'OCTUBRE',
  //   startDate: '2022-10-01',
  //   endDate: DateTime.fromISO('2022-10-01').endOf('month').toISO(),
  // },
  // {
  //   date: 'NOVIEMBRE',
  //   startDate: '2022-11-01',
  //   endDate: DateTime.fromISO('2022-11-01').endOf('month').toISO(),
  // },
  // {
  //   date: 'DICIEMBRE',
  //   startDate: '2022-12-01',
  //   endDate: DateTime.fromISO('2022-12-01').endOf('month').toISO(),
  // },
];
