import axios from 'axios';

import { PricesTable } from '@/features/PricesTable';
import { Price } from '@/types';

interface IProps {
  prices: Price[];
}

const Index = ({ prices }: IProps) => <PricesTable prices={prices} />;

Index.getInitialProps = async () => {
  const { data } = await axios.get<Price[]>('http://localhost:3000/api/prices');

  return { prices: data };
};

export default Index;
