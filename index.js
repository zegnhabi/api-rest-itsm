const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());

// Definir rutas para CRUD
const router = express.Router();

router.get("/duenos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM duenos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/duenos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM duenos where id_dueno = ?", [
      id,
    ]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo usuario
router.post("/duenos", async (req, res) => {
  try {
    const { nombre, telefono, direccion, genero } = req.body;
    const [rows] = await db.query(
      "INSERT INTO duenos (nombre, telefono, direccion, genero) VALUES (?, ?, ?, ?)",
      [nombre, telefono, direccion, genero]
    );
    res.json({ id_dueno: rows.insertId, nombre, telefono, direccion, genero });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar un usuario por ID
router.put("/duenos/:id", async (req, res) => {
  try {
    //obtener el id de dueno y convertilo a entero
    const id = parseInt(req.params.id);
    const { nombre, telefono, direccion, genero } = req.body;
    const [rows] = await db.query(
      "UPDATE duenos SET nombre = ?, telefono = ?, direccion = ?, genero = ? WHERE id_dueno = ?",
      [nombre, telefono, direccion, genero, id]
    );
    res.json({ id_dueno: id, nombre, telefono, direccion, genero });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para borrar un usuario por ID
router.delete("/duenos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [rows] = await db.query("DELETE FROM duenos WHERE id_dueno = ?", [
      id,
    ]);
    res.json({ id_dueno: id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
