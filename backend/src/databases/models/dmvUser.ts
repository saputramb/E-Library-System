import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dmv_userAttributes {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  address?: string;
  role?: string;
  created_at?: Date;
}

export type dmv_userPk = "id";
export type dmv_userId = dmv_user[dmv_userPk];
export type dmv_userOptionalAttributes = "id" | "name" | "email" | "phone" | "gender" | "address" | "role" | "created_at";
export type dmv_userCreationAttributes = Optional<dmv_userAttributes, dmv_userOptionalAttributes>;

export class dmv_user extends Model<dmv_userAttributes, dmv_userCreationAttributes> implements dmv_userAttributes {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  address?: string;
  role?: string;
  created_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof dmv_user {
    return sequelize.define('dmv_user', {
      id: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'dmv_users',
      schema: 'public',
      timestamps: false,
      paranoid: true,
    }) as typeof dmv_user;
  }
}
