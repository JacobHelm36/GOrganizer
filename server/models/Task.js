import mongoose from "mongoose"
import {dbContext} from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  creatorEmail: { type: String, required: true },
  body: { type: String, required: true }
})

const Task = new Schema({
  title: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true},
  comments: [Comment]
}, { timestamps: true, toJSON: { virtuals: true } })


Task.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

// //CASCADE ON DELETE
// Task.pre('deleteMany', function (next) {
//   //lets find all the Tasks and remove them
//   Promise.all([
//     //something like...
//     dbContext.Tasks.deleteMany({ TaskId: this._conditions_id }),
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

// //CASCADE ON DELETE
// Task.pre('findOneAndRemove', function (next) {
//   //lets find all the Tasks and remove them
//   Promise.all([
//     dbContext.Tasks.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Task