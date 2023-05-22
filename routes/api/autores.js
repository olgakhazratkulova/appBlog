const router = require('express').Router();

const { getAll, getById, create, update, deleteById, getById2 } = require('../../models/autor.model');
const { getByFkAutor } = require('../../models/post.model');

router.get('/', async (req, res) => {
    try {
        const [result] = await getAll();
        res.json(result);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});

router.get('/posts', async (req, res) => {
    try {
        const [autores] = await getAll();
        
        for(let autor of autores) {
            const [posts] = await getByFkAutor(autor.id);
            autor.posts = posts;
        }
        res.json(autores);
    
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});


 router.get('/posts/:autorId', async (req, res) => {
    const {autorId} = req.params;
    try {
        const [autor] = await getById(autorId);
        console.log(autor);
        
        if(!autor[0]) {
            return res.json({fatal: 'No existe un autor con ese ID'})
        }
        const [posts] = await getByFkAutor(autor[0].id);
        console.log(posts);
        autor[0].posts = posts;
        res.json(autor[0]);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});
 
router.get('/:autorId', async (req, res) => {
    const {autorId} = req.params;

    try {
        const [result] = await getById(autorId);
        if(result.length === 0) {
            return res.json({fatal: 'No existe un autor con ese ID'});
        }
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        const [autor] = await getById(result.insertId);
        res.json(autor[0]);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});

router.put('/:autorId', async (req, res) => {
    const {autorId} = req.params;
    console.log(autorId);
    try {
        const [result] = await update(autorId, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }
});

router.delete('/:autorId', async (req, res) => {
    const {autorId} = req.params;

    try {
        const [autor] = await getById(autorId);
        await deleteById(autorId);
        res.json(autor[0]);
    } catch (error) {
        res.status(500).json({fatal: error.message});
    }

});

module.exports = router;