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
    const { data, productsList } = getChartData(pricesByStore[item]);

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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {productsList.map((product) => (
            <Line
              key={product.name}
              type="monotone"
              dataKey={product.name}
              stroke={product.color}
            />
          ))}
        </LineChart>
      </div>
    );
  });
};
