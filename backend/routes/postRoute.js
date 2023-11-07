const {Router} = require("express");
const router = Router();
const {getPosts, createPost, updatePost, deletePost, getSingleUserPosts} = require("../controllers/postControllers")


router.get('/get', getAllPosts)
router.get('/get/:userId', getSingleNotes)
router.post('/create', createNote)
router.put('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote)

module.exports = router;