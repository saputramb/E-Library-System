import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { history_book, history_bookId } from './historyBook';

export interface bookAttributes {
  book_code: string;
  category: string;
  title: string;
  author: string;
  publication_year: string;
  book: string;
  created_at: Date;
  updated_at: Date;
}

export type bookPk = "book_code";
export type bookId = book[bookPk];
export type bookOptionalAttributes = "created_at" | "updated_at";
export type bookCreationAttributes = Optional<bookAttributes, bookOptionalAttributes>;

export class book extends Model<bookAttributes, bookCreationAttributes> implements bookAttributes {
  book_code!: string;
  category!: string;
  title!: string;
  author!: string;
  publication_year!: string;
  book!: string;
  created_at!: Date;
  updated_at!: Date;

  // book hasMany history_book via book_code
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

  static initModel(sequelize: Sequelize.Sequelize): typeof book {
    return sequelize.define('book', {
      book_code: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true
      },
      category: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      author: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      publication_year: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      book: {
        type: DataTypes.TEXT,
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
      tableName: 'book',
      schema: 'public',
      hasTrigger: true,
      timestamps: false,
      paranoid: true,
      indexes: [
        {
          name: "book1_pkey",
          unique: true,
          fields: [
            { name: "book_code" },
          ]
        },
      ]
    }) as typeof book;
  }
}
