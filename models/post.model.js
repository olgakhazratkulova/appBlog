const getAll = () => {
    return db.query('select * from posts');
}

const getById = (postId) => {
    return db.query(
        'select * from posts join autores on autores.id = posts.fkautor where posts.id = ?', [postId],
        );
}

const getByFkAutor = (fkAutor) => {
    return db.query('select * from posts where fkautor = ?', [fkAutor]);
}

const create = ({título, descripción, categoría}) => {
    return db.query('insert into posts (título, descripción, categoría) values (?, ?, ?)', [título, descripción, categoría]);
}

const update = (postId, {título, descripción, categoría}) => {
    return db.query(
        'update posts set título = ?, descripción = ?, categoría = ? where id = ?', [título, descripción, categoría, postId]
        );
}

const deleteById = (postId) => {
    return db.query('delete from posts where id = ?', [postId]);
}


module.exports = {
    getAll, getById, create, update, deleteById, getByFkAutor
}