const {Router} = require("express");
const router = Router();
const {getPosts, createPost, updatePost, deletePost, getSingleUserPosts} = require("../controllers/postControllers")


router.get('/get', getPosts)
router.get('/get/:userId', getSingleUserPosts)
router.post('/create', createPost)
router.put('/update/:id', updatePost)
router.delete('/delete/:id', deletePost)

module.exports = router;