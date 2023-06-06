import { Price } from '../../../models/Price';

export interface DataToSave {
  store: string;
  product: string;
  price: number;
}

export const savePriceToDB = async (dataToSave: DataToSave[]) => {
  try {
    return dataToSave.map(async (result) => {
      const { store, product, price } = result;
      console.log('New price:', JSON.stringify(result));
      return await Price.create({
        store,
        product,
        price,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  } catch (error) {
    console.error(error);
  }
};
