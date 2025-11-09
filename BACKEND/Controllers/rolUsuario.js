const connection = require("../Config/dataBase");

const obtenerRolesUsuarios = (req, res) => {
    connection.query("SELECT * FROM rol_usuario;", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener los roles de usuario" });
            return;
        }
        res.json(results);
    });
};

const obtenerRolUsuarioPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM rol_usuario WHERE id_rol = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener el rol de usuario" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Rol de usuario no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarRolUsuario = (req, res) => {
    const { id_rol, nombre_rol } = req.body;
    const sql = "INSERT INTO rol_usuario (id_rol, nombre_rol) VALUES (?, ?, ?)";
    connection.query(sql, [id_rol, nombre_rol], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al agregar el rol de usuario" });
            return;
        }
        res.status(210).json({ message: "Rol de usuario agregado correctamente" });
    });
};

const eliminarRolUsuario = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM rol_usuario WHERE id_rol = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al eliminar el rol de usuario" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Rol de usuario no encontrado" });
            return;
        }
        res.json({ message: "Rol de usuario eliminado correctamente" });
    });
};

const actualizarRolUsuario = (req, res) => {
    const id = req.params.id;
    const { id_rol, nombre_rol } = req.body;
    const sql = "UPDATE rol_usuario SET id_rol = ?, nombre_rol = ? WHERE id_rol_usuario = ?";
    connection.query(sql, [id_rol, nombre_rol, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al actualizar el rol de usuario" });
            return;
        }
        res.json({ message: "Rol de usuario actualizado correctamente" });
    });
};

module.exports = {
    obtenerRolesUsuarios,
    obtenerRolUsuarioPorId,
    agregarRolUsuario,
    eliminarRolUsuario,
    actualizarRolUsuario
}