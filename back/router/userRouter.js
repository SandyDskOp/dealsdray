const express = require("express");
const router = express.Router();
const userRoutes = require("../controller/userController");


router.get("/", userRoutes.getData);
router.post("/emailExist",userRoutes.findEmailExist)
router.post("/addImage",userRoutes.singleFile,userRoutes.resizeImage,userRoutes.cloudImage)
router.post("/",userRoutes.addUser)
router.get("/getById/:id",userRoutes.getEmployeeById)
router.put("/:id",userRoutes.editData)
router.delete("/image/:pid",userRoutes.unlinkImageFromCloud)
router.delete("/",userRoutes.deleteEmployee)
router.post("/login",userRoutes.generateToken)
router.get("/auth",userRoutes.authenticateToken)

module.exports = router; 

   