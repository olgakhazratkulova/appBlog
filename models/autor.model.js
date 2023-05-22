const getAll = () => {
    return db.query('select * from autores');
};

const getById = (autorId) => {
    return db.query('select * from autores where id = ?', [autorId]);
};

const getById2 = (autorId) => {
    return db.query(
        'select * from autores join posts on autores.id = posts.fkautor where autores.id = ?', [autorId],
        );
}


const create = ({nombre, email, imagen}) => {
    return db.query(
        'insert into autores (nombre, email, imagen) values (?, ?, ?)', [nombre, email, imagen]
        );
};

const update = (autorId, {nombre, email, imagen}) => {
    return db.query(
        'update autores set nombre = ?, email = ?, imagen = ? where id = ?', [nombre, email, imagen, autorId]
    );
};

const deleteById = (autorId) => {
    return db.query('delete from autores where id = ?', [autorId]);
}


module.exports = {
    getAll, getById, create, update, deleteById,getById2
}