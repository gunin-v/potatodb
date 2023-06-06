import { Price } from '@/types';
import format from 'date-fns/format';
import { useState } from 'react';

interface ChartData {
  [product: string]: number | string;
  date: string;
}

export const usePrices = (prices: Price[]) => {
  const setPricesByStoreInit = () =>
    prices.reduce((acc, price) => {
      return {
        ...acc,
        [price.store]: [...(acc[price.store] || []), price],
      };
    }, {});

  const [pricesByStore] = useState<{
    [store: string]: Price[];
  }>(setPricesByStoreInit);

  const getChartData = (prices: Price[]) => {
    return prices.reduce((acc, priceItem) => {
      const date = format(new Date(priceItem.date), 'MMMM yyyy');
      const existingDate =
        acc.length && acc.filter((item) => item.date === date);

      console.log(existingDate[0]);

      return existingDate
        ? [...acc, { ...existingDate[0], [priceItem.product]: priceItem.price }]
        : [...acc, { date, [priceItem.product]: priceItem.price }];
    }, [] as any[]);
  };

  return { pricesByStore, getChartData };
};
