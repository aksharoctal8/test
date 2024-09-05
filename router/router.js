const express = require('express');
const router = express.Router();
const controller = require("../controller/userController");
const handleMultipartData = require("../helper/fileHandler")
router.post("/signup",handleMultipartData.single('image'),controller.signup)
router.get("/:id",controller.index)
router.patch("/:id",handleMultipartData.single('image'),controller.updateProfile);
router.delete("/:id",controller.deleteProfile)
module.exports = router;