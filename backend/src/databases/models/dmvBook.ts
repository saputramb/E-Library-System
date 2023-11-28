import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dmv_bookAttributes {
  book_code?: string;
  category?: string;
  title?: string;
  author?: string;
  publication_year?: string;
  book?: string;
  created_at?: Date;
}

export type dmv_bookOptionalAttributes = "book_code" | "category" | "title" | "author" | "publication_year" | "book" | "created_at";
export type dmv_bookCreationAttributes = Optional<dmv_bookAttributes, dmv_bookOptionalAttributes>;

export class dmv_book extends Model<dmv_bookAttributes, dmv_bookCreationAttributes> implements dmv_bookAttributes {
  book_code?: string;
  category?: string;
  title?: string;
  author?: string;
  publication_year?: string;
  book?: string;
  created_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof dmv_book {
    return sequelize.define('dmv_book', {
      book_code: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      category: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      title: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      author: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      publication_year: {
        type: DataTypes.STRING(64),
        allowNull: true
      },
      book: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'dmv_book',
      schema: 'public',
      timestamps: false,
      paranoid: true,
    }) as typeof dmv_book;
  }
}
