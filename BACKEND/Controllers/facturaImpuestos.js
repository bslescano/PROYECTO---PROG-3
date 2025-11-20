const connection = require("../Config/dataBase");

const obtenerFacturaImpuestos = (req, res) => {
    connection.query("SELECT * FROM factura_impuestos;", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener los factura de impuestos" });
            return;
        }
        res.json(results);
    });
};

const obtenerFacturaImpuestosPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM facturaImpuestos WHERE id_facturaImpuestos = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener el facturaImpuestos" });
            return;
        }   
        if (results.length === 0) {
            res.status(404).json({ error: "FacturaImpuestos no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarFacturaImpuestos = (req, res) => {
    const { id_facturaImpuestos, id_factura, id_impuesto, monto } = req.body;
    const sql = "INSERT INTO facturaImpuestos (id_facturaImpuestos, id_factura, id_impuesto, monto) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id_facturaImpuestos, id_factura, id_impuesto, monto], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al agregar el facturaImpuestos" });
            return;
        }
        res.status(210).json({ message: "FacturaImpuestos agregado correctamente" });
    });
};

const eliminarFacturaImpuestos = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM facturaImpuestos WHERE id_facturaImpuestos = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al eliminar el facturaImpuestos" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "FacturaImpuestos no encontrado" });
            return;
        }
        res.json({ message: "FacturaImpuestos eliminado correctamente" });
    });
};

const actualizarFacturaImpuestos = (req, res) => {
    const id = req.params.id;
    const { id_facturaImpuestos, id_factura, id_impuesto, monto } = req.body;
    const sql = "UPDATE facturaImpuestos SET id_facturaImpuestos = ?, id_factura = ?, id_impuesto = ?, monto = ? WHERE id_facturaImpuestos = ?";
    connection.query(sql, [id_facturaImpuestos, id_factura, id_impuesto, monto, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al actualizar el facturaImpuestos" });
            return;
        }
        res.json({ message: "FacturaImpuestos actualizado correctamente" });
    });
};

module.exports = {
    obtenerFacturaImpuestos,
    obtenerFacturaImpuestosPorId,
    agregarFacturaImpuestos,
    eliminarFacturaImpuestos,
    actualizarFacturaImpuestos
}