import express, { NextFunction, Request, Response } from "express";
import Logic from "../Logic/FollowerLogicMYSQL";
import WebSiteErrorHandler from "../MiddleWare/websiteErrors";
import {
  AddFollowError,
  GetAllFollowersError,
  RemoveAllFollowersError,
  RemoveFollowError,
} from "../Models/FollowErrors";

const followRouter = express.Router();

// ADD FOLLOW TO VACATION
followRouter.post(
  "/follow/:vacation_key/:user_key",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacation_key = +request.params.vacation_key;
      const user_key = +request.params.user_key;
      const result = await Logic.addFollower(vacation_key, user_key);
      if (!result) {
        throw new AddFollowError(vacation_key);
      }
      response.status(201).json({ message: "Follow added", result: result });
    } catch (err) {
      next(err);
    }
  }
);

// REMOVE FOLLOW FROM VACATION
followRouter.delete(
  "/removeFollow/:vacation_key/:user_key",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacation_key = +request.params.vacation_key;
    const user_key = +request.params.user_key;
    try {
      const result = await Logic.removeFollower(vacation_key, user_key);
      if (!result) {
        throw new RemoveFollowError(vacation_key);
      }
      response.status(200).json({ message: "Follow removed", result: result });
    } catch (error) {
      next(error);
    }
  }
);

// REMOVE ALL FOLLOWER WHEN VACATION REMOVED
followRouter.delete(
  "/removeAllFollowers/:vacation_key",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacation_key = +request.params.vacation_key;
    try {
      const result = await Logic.removeAllFollowers(vacation_key);
      if (!result) {
        throw new RemoveAllFollowersError(vacation_key);
      }
      response
        .status(200)
        .json({ message: "Followers removed", result: result });
    } catch (error) {
      next(error);
    }
  }
);

// GET ALL followers
followRouter.get(
  "/allFollowers",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await Logic.getAllFollowers();
      if (!result) {
        throw new GetAllFollowersError();
      }
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

// Error handling middleware
followRouter.use(WebSiteErrorHandler);

export default followRouter;