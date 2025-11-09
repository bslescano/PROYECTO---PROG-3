const connection = require("../Config/dataBase");

const obtenerUsuarios = (req, res) => {
    connection.query("SELECT * FROM usuarios;", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener los usuarios" });
            return;
        }
        res.json(results);
    });
};

const obtenerUsuarioPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener el usuario" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarUsuario = (req, res) => {
    const { usuario, contraseña, id_rol } = req.body;
    const sql = "INSERT INTO usuarios (usuario, contraseña, id_rol) VALUES (?, ?, ?)";
    connection.query(
        sql,
        [usuario, contraseña, id_rol],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error al agregar el usuario" });
                return;
            }
            res.status(201).json({ message: "Usuario agregado correctamente", id: results.insertId });
        }
    );
};

const eliminarUsuario = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al eliminar el usuario" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.json({ message: "Usuario eliminado correctamente" });
    });
};

const actualizarUsuario = (req, res) => {
    const id = req.params.id;
    const { id_usuario, usuario, contraseña, id_rol } = req.body;
    const sql =
        "UPDATE usuarios SET id_usuario = ?, usuario = ?, contraseña = ?, id_rol = ? WHERE id_usuario = ?";
    connection.query(
        sql,
        [id_usuario, usuario, contraseña, id_rol, id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error al actualizar el usuario" });
                return;
            }
            res.json({ message: "Usuario actualizado correctamente" });
        }
    );
};

const loginUsuario = (req, res) => {
    const { usuario, contraseña } = req.body;
    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";
    connection.query(sql, [usuario, contraseña], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: "Usuario o contraseña incorrectos" });
            return;
        }
        const user = results[0];
        res.status(200).json(user);
    });
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    agregarUsuario,
    eliminarUsuario,
    actualizarUsuario,
    loginUsuario
};