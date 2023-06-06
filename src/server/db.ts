import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('sqlite:prices.db');
