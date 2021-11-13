const express=require("express")
const router=express.Router()
const positions=require("../controllers/positions")


router.post("/",positions.createPosition)
router.get("/",positions.getPositions)
router.get("/:id",positions.getOnePosition)
router.put("/:id",positions.updatePosition)
router.delete('/:id', positions.deletePosition)

module.exports=router