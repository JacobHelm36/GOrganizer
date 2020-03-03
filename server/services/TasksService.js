import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class TasksService {
  async getAll() {
    return await dbContext.Tasks.find({});
  }

  async getById(id, userEmail) {
    let data = await dbContext.Tasks.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  async getTasksByListId(id) {
    let data = await dbContext.Tasks.find({ listId: id })
    //throw new Error("Method not implemented.")
    return data
  }

  async create(rawData) {
    let data = await dbContext.Tasks.create(rawData)
    return data
  }

  async addComment(id, body) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id }, { $addToSet: { comments: body } }, { new: true });
    return (data);
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return "Delorted!"
  }

  async deleteComment(id, commentId) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id }, { $pull: { comments: { _id: commentId } } }, { new: true });
  }
}


export const tasksService = new TasksService()