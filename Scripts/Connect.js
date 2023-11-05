const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'tareass'
});

app.get('/Get', (req, res) => {
    connection.query('SELECT * FROM tareas', (error, results, fields) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Hubo un error al obtener los datos.' });
        }
        res.json(results);
    });
});

app.post('/Post', (req, res) => {
    const { id, nombre, estado } = req.body;
    connection.query('INSERT INTO tareas (id, nombre, estado) VALUES (?, ?, ?)', [id, nombre, estado], (error, results, fields) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Hubo un error al insertar los datos.' });
        }
        res.json(results);
    });
});
app.delete('/Delete/:id', (req, res) => {
    const tareaId = req.params.id;
    connection.query('DELETE FROM tareas WHERE id = ?', [tareaId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Hubo un error al eliminar la tarea.' });
        }
        res.status(200).send('Tarea eliminada exitosamente');
    });
});
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor web iniciado en el puerto ${port}`);
});
