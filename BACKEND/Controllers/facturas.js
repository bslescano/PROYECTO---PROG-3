const connection = require("../Config/dataBase");

const obtenerFacturas = (req, res) => {
    connection.query("SELECT * FROM facturas;", (err, results) => {
        if (err) {
            console.error("Error al obtener las facturas:", err);
            res.status(500).json({ error: "Error al obtener las facturas" });
            return;
        }
        res.json(results);
    });
};

const obtenerFacturaPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM facturas WHERE id_factura = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener la factura:", err);
            res.status(500).json({ error: "Error al obtener la factura" });
            return;
        }   
        if (results.length === 0) {
            res.status(404).json({ error: "Factura no encontrada" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarFactura = (req, res) => {
    const { id_factura, fecha_emision, subtotal, impuestos, intereses, total, estado, id_cliente, id_empleado } = req.body;
    const sql = "INSERT INTO facturas (id_factura, fecha_emision, subtotal, impuestos, intereses, total, estado, id_cliente, id_empleado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [id_factura, fecha_emision, subtotal, impuestos, intereses, total, estado, id_cliente, id_empleado], (err, results) => {
        if (err) {
            console.error("Error al agregar la factura:", err);
            res.status(500).json({ error: "Error al agregar la factura" });
            return;
        }
        res.status(210).json({ message: "Factura agregada correctamente" });
    });
};

const eliminarFactura = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM facturas WHERE id_factura = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar la factura:", err);
            res.status(500).json({ error: "Error al eliminar la factura" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Factura no encontrada" });
            return;
        }
        res.json({ message: "Factura eliminada correctamente" });
    });
};

const actualizarFactura = (req, res) => {
    const id = req.params.id;
    const { id_factura, fecha_emision, subtotal, impuestos, intereses, id_cliente, id_empleado } = req.body;
    const sql = "UPDATE facturas SET id_factura = ?, fecha_emision = ?, subtotal = ?, impuestos = ?, intereses = ?, total = ?, estado = ?, id_cliente = ?, id_empleado = ? WHERE id_factura = ?";
    connection.query(sql, [id_factura, fecha_emision, subtotal, impuestos, intereses, total, estado, id_cliente, id_empleado, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar la factura:", err);
            res.status(500).json({ error: "Error al actualizar la factura" });
            return;
        }
        res.json({ message: "Factura actualizada correctamente" });
    });
};

module.exports = {
    obtenerFacturas,
    obtenerFacturaPorId,
    agregarFactura,
    eliminarFactura,
    actualizarFactura
}