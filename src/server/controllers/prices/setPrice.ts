import { getDataFromPerekrestok } from '../../parcer/perekrestok';
import { getDataFromMagnit } from '../../parcer/magnit';
import { QUERY_ITEMS, STORES } from '../../constants';
import { DataToSave, savePriceToDB } from './features/savePrice';

export const setPrice = async (ctx) => {
  const result: DataToSave[] = [];

  // const perekrestokData = await getDataFromPerekrestok(
  //   QUERY_ITEMS[STORES.PEREKRESTOK],
  // );
  //
  // Object.entries(perekrestokData).forEach(([product, price]) =>
  //   result.push({ store: STORES.PEREKRESTOK, product, price }),
  // );

  const magnitData = await getDataFromMagnit(QUERY_ITEMS[STORES.MAGNIT]);

  Object.entries(magnitData).forEach(([product, price]) =>
    result.push({ store: STORES.MAGNIT, product, price }),
  );

  ctx.body = await savePriceToDB(result);
};
