import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dmv_history_bookAttributes {
  id?: number;
  book_code?: string;
  book_title?: string;
  author?: string;
  year_of_book_publication?: string;
  book?: string;
  borrower?: string;
  date?: Date;
  remarks?: string;
}

export type dmv_history_bookPk = "id";
export type dmv_history_bookId = dmv_history_book[dmv_history_bookPk];
export type dmv_history_bookOptionalAttributes = "id" | "book_code" | "book_title" | "author" | "year_of_book_publication" | "book" | "borrower" | "date" | "remarks";
export type dmv_history_bookCreationAttributes = Optional<dmv_history_bookAttributes, dmv_history_bookOptionalAttributes>;

export class dmv_history_book extends Model<dmv_history_bookAttributes, dmv_history_bookCreationAttributes> implements dmv_history_bookAttributes {
  id?: number;
  book_code?: string;
  book_title?: string;
  author?: string;
  year_of_book_publication?: string;
  book?: string;
  borrower?: string;
  date?: Date;
  remarks?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof dmv_history_book {
    return sequelize.define('dmv_history_book', {
      id: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: true
      },
      book_code: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      book_title: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      author: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      year_of_book_publication: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      book: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      borrower: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      remarks: {
        type: DataTypes.STRING(64),
        allowNull: true
      }
    }, {
      tableName: 'dmv_history_book',
      schema: 'public',
      timestamps: false,
      paranoid: true,
    }) as typeof dmv_history_book;
  }
}
