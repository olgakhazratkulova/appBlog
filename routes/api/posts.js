const router = require('express').Router();

const { getAll, create, getById, update, deleteById } = require('../../models/post.model');


router.get('/', async (req, res) => {
    try {
        const [result] = await getAll();
        res.json(result);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});


//Debería devolver un post con toda la info de su autor
router.get('/:postId', async (req, res) => {
    const {postId} = req.params;
    try {
        const [result] = await getById(postId);
        res.json(result);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});


router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        const [newPost] = await getById(result.insertId);
        res.json(newPost);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});


router.put('/:postId', async (req, res) => {
    const {postId} = req.params;
    try {
        const [result] = await update(postId, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});


router.delete('/:postId', async (req, res) => {
    const {postId} = req.params;
    try {
        const [post] = await getById(postId);
        await deleteById(postId);
        res.json(post[0]);
    } catch (error) {
        res.status(500).json({fatal: error.message});  
    }
});

module.exports = router;