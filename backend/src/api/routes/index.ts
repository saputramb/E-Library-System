import { Router } from 'express';
import authentication from "./authentication";
import users from "./user";
import book from "./book";
import historyBook from "./history-book";
import refreshToken from "../middlewares/create-refresh-token";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  book(router);
  historyBook(router);
  refreshToken(router);
  return router;
};