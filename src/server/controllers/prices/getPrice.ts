import { Price } from '../../models/Price';

export const getPrice = async (ctx) => {
  try {
    const prices = await Price.findAll();
    if (!prices.length) {
      ctx.status = 204; // No Content
      return;
    }

    ctx.body = prices;
  } catch (error) {
    console.error(error);
  }
};
