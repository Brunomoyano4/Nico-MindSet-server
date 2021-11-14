const express=require("express")
const router=express.Router()
const Clients=require("../controllers/clients")
const validateClient=require("../Validations/Clients")


router.post("/",validateClient.required,Clients.createClient)
router.get("/",Clients.getClients)
router.get("/:id",Clients.getOneClient)
router.put("/:id",Clients.updateClient)
router.delete('/:id',Clients.deleteClient)

module.exports=router