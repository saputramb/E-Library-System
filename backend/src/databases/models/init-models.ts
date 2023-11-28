import type { Sequelize } from "sequelize";
import { book as _book } from "./book";
import type { bookAttributes, bookCreationAttributes } from "./book";
import { dmv_book as _dmv_book } from "./dmvBook";
import type { dmv_bookAttributes, dmv_bookCreationAttributes } from "./dmvBook";
import { dmv_books_borrowed as _dmv_books_borrowed } from "./dmvBooksBorrowed";
import type { dmv_books_borrowedAttributes, dmv_books_borrowedCreationAttributes } from "./dmvBooksBorrowed";
import { dmv_history_book as _dmv_history_book } from "./dmvHistoryBook";
import type { dmv_history_bookAttributes, dmv_history_bookCreationAttributes } from "./dmvHistoryBook";
import { dmv_user as _dmv_user } from "./dmvUser";
import type { dmv_userAttributes, dmv_userCreationAttributes } from "./dmvUser";
import { history_book as _history_book } from "./historyBook";
import type { history_bookAttributes, history_bookCreationAttributes } from "./historyBook";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _book as book,
  _dmv_book as dmv_book,
  _dmv_books_borrowed as dmv_books_borrowed,
  _dmv_history_book as dmv_history_book,
  _dmv_user as dmv_user,
  _history_book as history_book,
  _user as user,
};

export type {
  bookAttributes,
  bookCreationAttributes,
  dmv_bookAttributes,
  dmv_bookCreationAttributes,
  dmv_books_borrowedAttributes,
  dmv_books_borrowedCreationAttributes,
  dmv_history_bookAttributes,
  dmv_history_bookCreationAttributes,
  dmv_userAttributes,
  dmv_userCreationAttributes,
  history_bookAttributes,
  history_bookCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const book = _book.initModel(sequelize);
  const dmv_book = _dmv_book.initModel(sequelize);
  const dmv_books_borrowed = _dmv_books_borrowed.initModel(sequelize);
  const dmv_history_book = _dmv_history_book.initModel(sequelize);
  const dmv_user = _dmv_user.initModel(sequelize);
  const history_book = _history_book.initModel(sequelize);
  const user = _user.initModel(sequelize);

  history_book.belongsTo(book, { as: "book_code_book", foreignKey: "book_code"});
  book.hasMany(history_book, { as: "history_books", foreignKey: "book_code"});
  history_book.belongsTo(user, { as: "borrower", foreignKey: "borrower_id"});
  user.hasMany(history_book, { as: "history_books", foreignKey: "borrower_id"});

  return {
    book: book,
    dmv_book: dmv_book,
    dmv_books_borrowed: dmv_books_borrowed,
    dmv_history_book: dmv_history_book,
    dmv_user: dmv_user,
    history_book: history_book,
    user: user,
  };
}
