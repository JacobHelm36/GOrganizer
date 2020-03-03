import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class ListService {
  async getListByBoardId(id, email) {
    let data = await dbContext.List.find({ boardId: id })
    //throw new Error("Method not implemented.")
    return data
  }

  async getById(id) {
    let data = await dbContext.List.findOne({ _id: id })
    // if (!data) {
    //   throw new BadRequest("Invalid ID or you do not own this List")
    // }
    return data
  }

  async create(rawData) {
    let data = await dbContext.List.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.List.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this List");
    }
    return data;
  }

  async delete(id) {
    let data = await dbContext.List.findOneAndRemove({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this List");
    }
  }

}


export const listService = new ListService()