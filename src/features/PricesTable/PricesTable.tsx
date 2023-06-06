import { Price } from '@/types';

import styles from './PricesTable.module.scss';
import { usePrices } from '@/features/PricesTable/hooks/usePriceData';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IProps {
  prices: Price[];
}

export const PricesTable = ({ prices }: IProps) => {
  const { pricesByStore, getChartData } = usePrices(prices);
  return Object.keys(pricesByStore).map((item) => {
    const values = getChartData(pricesByStore[item]);

    console.log(values);
    const data = [
      {
        date: 'Page A',
        x: 4000,
        y: 2400,
      },
      {
        date: 'Page B',
        x: 3000,
        y: 1398,
      },
    ];
    return (
      <div className={styles.chart} key={item}>
        <h2>{item}</h2>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="x" stroke="#8884d8" />
          <Line type="monotone" dataKey="y" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  });
};
