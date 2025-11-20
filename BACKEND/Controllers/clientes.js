const connection = require("../Config/dataBase");

const obtenerClientes = (req, res) => {
    const { dni } = req.query;
    let sql = "SELECT * FROM clientes";
    const params = [];

    if (dni) {
        sql += " WHERE dni = ?";
        params.push(dni);
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            
            res.status(500).json({ error: "Error al obtener el cliente", details: err.sqlMessage });
            return;
        }
        res.json(results);
    });
};

const obtenerClientePorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM clientes WHERE id_cliente = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            
            res.status(500).json({ error: "Error al obtener el cliente", details: err.sqlMessage });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarCliente = (req, res) => {
    const { nombre, apellido, dni, pasaporte, email, telefono, id_direccion } = req.body;
    const sql = "INSERT INTO clientes (nombre, apellido, dni, pasaporte, email, telefono, id_direccion) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [nombre, apellido, dni, pasaporte || null, email, telefono, id_direccion || null], (err, results) => {
        if (err) {
            
            res.status(500).json({ error: "Error al agregar el cliente", details: err.sqlMessage });
            return;
        }
        res.status(201).json({ message: "Cliente agregado correctamente", id: results.insertId });
    });
};

const eliminarCliente = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM clientes WHERE id_cliente = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            
            res.status(500).json({ error: "Error al eliminar el cliente", details: err.sqlMessage });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json({ message: "Cliente eliminado correctamente" });
    });
};

const actualizarCliente = (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, dni, pasaporte, email, telefono, id_direccion } = req.body;
    const sql = "UPDATE clientes SET nombre = ?, apellido = ?, dni = ?, pasaporte = ?, email = ?, telefono = ?, id_direccion = ? WHERE id_cliente = ?";
    connection.query(sql, [nombre, apellido, dni, pasaporte || null, email, telefono, id_direccion || null, id], (err, results) => {
        if (err) {
            
            res.status(500).json({ error: "Error al actualizar el cliente", details: err.sqlMessage });
            return;
        }
        res.json({ message: "Cliente actualizado correctamente"});
    });
};

module.exports = { 
    obtenerClientes, 
    obtenerClientePorId, 
    agregarCliente, 
    eliminarCliente, 
    actualizarCliente,
};