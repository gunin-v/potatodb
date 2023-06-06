import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

interface PriceAttributes {
  store: string;
  product: string;
  price: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

class Price extends Model<PriceAttributes> implements PriceAttributes {
  public store!: string;
  public product!: string;
  public price!: number;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Price.init(
  {
    store: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'price',
  },
);

export { Price };
