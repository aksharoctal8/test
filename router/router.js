const express = require('express');
const router = express.Router();
const controller = require("../controller/userController");
const handleMultipartData = require("../helper/fileHandler")
router.post("/signup",handleMultipartData.single('image'),controller.signup)
router.get("/:id",controller.index)
router.patch("/update/:id",handleMultipartData.single('image'),controller.updateProfile)
module.exports = router;