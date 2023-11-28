import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { history_book, history_bookId } from './historyBook';

export interface userAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  role: string;
  password: string;
  refresh_token?: string;
  created_at: Date;
  updated_at: Date;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "refresh_token" | "created_at" | "updated_at";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  name!: string;
  email!: string;
  phone!: string;
  gender!: string;
  address!: string;
  role!: string;
  password!: string;
  refresh_token?: string;
  created_at!: Date;
  updated_at!: Date;

  // user hasMany history_book via borrower_id
  history_books!: history_book[];
  getHistory_books!: Sequelize.HasManyGetAssociationsMixin<history_book>;
  setHistory_books!: Sequelize.HasManySetAssociationsMixin<history_book, history_bookId>;
  addHistory_book!: Sequelize.HasManyAddAssociationMixin<history_book, history_bookId>;
  addHistory_books!: Sequelize.HasManyAddAssociationsMixin<history_book, history_bookId>;
  createHistory_book!: Sequelize.HasManyCreateAssociationMixin<history_book>;
  removeHistory_book!: Sequelize.HasManyRemoveAssociationMixin<history_book, history_bookId>;
  removeHistory_books!: Sequelize.HasManyRemoveAssociationsMixin<history_book, history_bookId>;
  hasHistory_book!: Sequelize.HasManyHasAssociationMixin<history_book, history_bookId>;
  hasHistory_books!: Sequelize.HasManyHasAssociationsMixin<history_book, history_bookId>;
  countHistory_books!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return sequelize.define('user', {
      id: {
        autoIncrement: true,
        type: DataTypes.DECIMAL,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: "users_email_key"
      },
      phone: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      tableName: 'users',
      schema: 'public',
      timestamps: false,
      paranoid: true,
      indexes: [
        {
          name: "users_email_key",
          unique: true,
          fields: [
            { name: "email" },
          ]
        },
        {
          name: "users_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    }) as typeof user;
  }
}
