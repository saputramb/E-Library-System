import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';
import type { user, userId } from './user';

export interface history_bookAttributes {
  id: number;
  book_code: string;
  borrower_id: number;
  date: Date;
  remarks: string;
  created_at: Date;
  updated_at: Date;
}

export type history_bookPk = "id";
export type history_bookId = history_book[history_bookPk];
export type history_bookOptionalAttributes = "id" | "date" | "created_at" | "updated_at";
export type history_bookCreationAttributes = Optional<history_bookAttributes, history_bookOptionalAttributes>;

export class history_book extends Model<history_bookAttributes, history_bookCreationAttributes> implements history_bookAttributes {
  id!: number;
  book_code!: string;
  borrower_id!: number;
  date!: Date;
  remarks!: string;
  created_at!: Date;
  updated_at!: Date;

  // history_book belongsTo book via book_code
  book_code_book!: book;
  getBook_code_book!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook_code_book!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook_code_book!: Sequelize.BelongsToCreateAssociationMixin<book>;
  // history_book belongsTo user via borrower_id
  borrower!: user;
  getBorrower!: Sequelize.BelongsToGetAssociationMixin<user>;
  setBorrower!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createBorrower!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof history_book {
    return sequelize.define('history_book', {
      id: {
        autoIncrement: true,
        type: DataTypes.DECIMAL,
        allowNull: false,
        primaryKey: true
      },
      book_code: {
        type: DataTypes.STRING(64),
        allowNull: false,
        references: {
          model: 'book',
          key: 'book_code'
        }
      },
      borrower_id: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      },
      remarks: {
        type: DataTypes.STRING(64),
        allowNull: false
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
      tableName: 'history_book',
      schema: 'public',
      timestamps: false,
      paranoid: true,
      indexes: [
        {
          name: "history_book_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    }) as typeof history_book;
  }
}
