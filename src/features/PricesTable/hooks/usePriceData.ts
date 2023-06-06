import { Price } from '@/types';
import format from 'date-fns/format';
import { useState } from 'react';

export interface ChartData {
  [date: string]: [
    {
      date: string;
      name: string;
      price: string | number;
    },
  ];
}

const COLORS = [
  '#0420e4',
  '#0ee404',
  '#e40404',
  '#007358',
  '#8500de',
  '#d35302',
  '#d0bf00',
  '#e501b6',
  '#02fdba',
  '#000000',
];

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
    let productsList: { name: string; color: string }[] = [];
    const sortedPrices: ChartData = prices.reduce((acc, priceItem) => {
      const date = format(new Date(priceItem.date), 'dd.MM.yy');

      if (!productsList.find((item) => item.name === priceItem.product)) {
        const index = productsList.length;
        productsList = [
          ...(productsList || []),
          {
            name: priceItem.product,
            color:
              COLORS[index] ||
              `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          },
        ];
      }

      return {
        ...acc,
        [date]: [
          ...(acc[date] || []),
          {
            name: priceItem.product,
            price: priceItem.price,
          },
        ],
      };
    }, {});

    const data = Object.entries(sortedPrices).map(([date, items]) => ({
      name: date,
      ...items.reduce((acc, item) => {
        return { ...acc, [item.name]: item.price };
      }, {}),
    }));

    return { data, productsList };
  };

  return { pricesByStore, getChartData };
};
