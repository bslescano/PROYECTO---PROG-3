const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '12345678',
    database: 'hotel_prueba'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la database:', err);
        return;
    }
    console.log('Conexión exitosa a la database');
});

module.exports = connection;