const {Router} = require("express");
const router = Router();
const getAllPosts = require("../controllers/postControllers")

router.get('/get', getAllPosts)

module.exports = router;