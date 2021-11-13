const mongoose=require("mongoose")
const Schema=mongoose.Schema

const positionsSchema=new Schema({
  clientId: { type: String, required: true},
  job: { type: String, required: true},
  description: { type: String, required: true},
})

module.exports=mongoose.model("Positions",positionsSchema)