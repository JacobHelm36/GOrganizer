import express from "express";
import BaseController from "../utils/BaseController";
import { tasksService } from "../services/TasksService";
import auth0provider from "@bcwdev/auth0provider";

export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router = express
      .Router()
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0provider.isAuthorized)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.user.sub;
      let data = await tasksService.create(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await tasksService.edit(req.params.id, req.userInfo.email, req.body);
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await tasksService.delete(req.params.id, req.userInfo.email);
      res.send(data)
    } catch (error) {
      console.error(error)
    }
  }
}