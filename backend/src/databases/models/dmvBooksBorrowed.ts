import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dmv_books_borrowedAttributes {
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

export type dmv_books_borrowedPk = "id";
export type dmv_books_borrowedId = dmv_books_borrowed[dmv_books_borrowedPk];
export type dmv_books_borrowedOptionalAttributes = "id" | "book_code" | "book_title" | "author" | "year_of_book_publication" | "book" | "borrower" | "date" | "remarks";
export type dmv_books_borrowedCreationAttributes = Optional<dmv_books_borrowedAttributes, dmv_books_borrowedOptionalAttributes>;

export class dmv_books_borrowed extends Model<dmv_books_borrowedAttributes, dmv_books_borrowedCreationAttributes> implements dmv_books_borrowedAttributes {
  id?: number;
  book_code?: string;
  book_title?: string;
  author?: string;
  year_of_book_publication?: string;
  book?: string;
  borrower?: string;
  date?: Date;
  remarks?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof dmv_books_borrowed {
    return sequelize.define('dmv_books_borrowed', {
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
      tableName: 'dmv_books_borrowed',
      schema: 'public',
      timestamps: false,
      paranoid: true,
    }) as typeof dmv_books_borrowed;
  }
}
