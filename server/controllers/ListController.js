import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { listService } from '../services/ListService'



//PUBLIC
export class ListController extends BaseController {
  constructor() {
    super("api/list")
    this.router = express.Router()
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      //.get("/:id/tasks" this.getTasksById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

 
  async getAll(req, res, next) {
    try {
      //only gets list by user who is logged in
      let data = await listService.getAll(req.body.boardId)
      return res.send(data)
    }
    catch (err) { 
      next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await listService.getById(req.params.id)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await listService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await listService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await listService.delete(req.params.id)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}

