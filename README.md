Claro, a continuación detallo los pasos y te proporciono ejemplos de código para crear una API REST con Node.js, MySQL y Docker para operaciones CRUD:

### Paso 1: Crear una Aplicación Node.js

Comencemos creando una aplicación Node.js y configurando el servidor Express.

1.1. Crea un nuevo proyecto de Node.js e inicializa npm:

```bash
mkdir nodejs-mysql-crud
cd nodejs-mysql-crud
npm init -y
```

1.2. Instala las dependencias necesarias, como Express, MySQL y dotenv:

```bash
npm install express mysql2 dotenv
```

1.3. Crea un archivo `index.js` para configurar el servidor Express y conectarlo a la base de datos MySQL.

Ejemplo de `index.js`:

```javascript
const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());

// Definir rutas para CRUD
// ...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Paso 2: Configurar la Base de Datos con Docker

Utilizaremos Docker para ejecutar un contenedor de MySQL.

Ejemplo de archivo `docker-compose.yml`:

```yaml
version: "3"
services:
  db:
    image: mysql:5.7
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: your_database
    volumes:
      - ./db_data:/var/lib/mysql
```

### Paso 3: Definir Endpoints y Operaciones CRUD

A continuación, define los endpoints de la API y las operaciones CRUD. Crearás archivos separados para definir las rutas, controladores y modelos de tu API.

Ejemplo de definición de rutas y controladores para CRUD:

```javascript
const router = express.Router();

router.get("/users", (req, res) => {
  // Obtener todos los usuarios de la base de datos
  // ...
});

router.get("/users/:id", (req, res) => {
  // Obtener un usuario por ID
  // ...
});

router.post("/users", (req, res) => {
  // Crear un nuevo usuario
  // ...
});

router.put("/users/:id", (req, res) => {
  // Actualizar un usuario por ID
  // ...
});

router.delete("/users/:id", (req, res) => {
  // Borrar un usuario por ID
  // ...
});

app.use("/api", router);
```

### Paso 4: Dockerizar la Aplicación

Para dockerizar la aplicación Node.js, crea un archivo `Dockerfile` en la raíz de tu proyecto.

Ejemplo de `Dockerfile`:

```Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
```

El archivo `Dockerfile` anterior se asegurará de que la aplicación Node.js se ejecute en un contenedor Docker.

En resumen, al seguir estos pasos y utilizar los ejemplos de código proporcionados, podrás crear una API RESTful con Node.js, MySQL y Docker para operaciones CRUD. No olvides ajustar los detalles según tus necesidades específicas y consultar la documentación oficial de las tecnologías involucradas.

Por supuesto, a continuación te proporciono un ejemplo de código para realizar la configuración de las rutas y las operaciones CRUD en una API REST con Node.js, Express y MySQL.

### Paso 3: Definir Endpoints y Operaciones CRUD

#### 3.1. Definir las Rutas

Crea un archivo `routes.js` para definir las rutas de la API.

```javascript
const express = require("express");
const router = express.Router();
const userController = require("./userController");

// Ruta para obtener todos los usuarios
router.get("/users", userController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get("/users/:id", userController.getUserById);

// Ruta para crear un nuevo usuario
router.post("/users", userController.createUser);

// Ruta para actualizar un usuario por ID
router.put("/users/:id", userController.updateUser);

// Ruta para borrar un usuario por ID
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
```

#### 3.2. Definir el Controlador

Crea un archivo `userController.js` para manejar las operaciones CRUD.

```javascript
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  // Implementa la lógica para obtener un usuario por ID
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  // Implementa la lógica para crear un nuevo usuario
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  // Implementa la lógica para actualizar un usuario por ID
};

// Borrar un usuario por ID
exports.deleteUser = async (req, res) => {
  // Implementa la lógica para borrar un usuario por ID
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
```

Con estos ejemplos de código, podrás definir las rutas y los controladores para las operaciones CRUD de tu API. Recuerda ajustar los detalles según tu entorno y requerimientos.

Claro, puedo proporcionarte un ejemplo de código para implementar las operaciones CRUD (Create, Read, Update, Delete) en una API REST utilizando Node.js, Express y MySQL. Para este ejemplo, utilizaré el módulo `mysql2` para interactuar con la base de datos MySQL. A continuación, te muestro un ejemplo de cómo podrías estructurar el código para cada una de las operaciones CRUD:

### Paso 1: Configurar la Conexión a la Base de Datos

Primero, necesitarás configurar la conexión a tu base de datos MySQL. Puedes hacerlo en un archivo separado, por ejemplo `db.js`:

```javascript
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "tu_host_de_mysql",
  user: "tu_usuario",
  password: "tu_contraseña",
  database: "tu_base_de_datos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
```

### Paso 2: Definir las Operaciones CRUD en el Controlador

A continuación, puedes definir las operaciones CRUD en un controlador, por ejemplo, `usersController.js`:

```javascript
const pool = require("./db");

// Obtener todos los usuarios
async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

// Obtener un usuario por ID
async function getUserById(userId) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
  return rows[0];
}

// Crear un nuevo usuario
async function createUser(userData) {
  const [result] = await pool.query("INSERT INTO users SET ?", [userData]);
  return result.insertId;
}

// Actualizar un usuario por ID
async function updateUser(userId, userData) {
  await pool.query("UPDATE users SET ? WHERE id = ?", [userData, userId]);
}

// Borrar un usuario por ID
async function deleteUser(userId) {
  await pool.query("DELETE FROM users WHERE id = ?", [userId]);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
```

### Paso 3: Utilizar las Operaciones CRUD en las Rutas

Por último, puedes utilizar el controlador que has creado en tus rutas, por ejemplo, en `usersRoutes.js`:

```javascript
const express = require("express");
const router = express.Router();
const usersController = require("./usersController");

// Ruta para obtener todos los usuarios
router.get("/users", async (req, res) => {
  const users = await usersController.getAllUsers();
  res.json(users);
});

// Ruta para obtener un usuario por ID
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await usersController.getUserById(userId);
  res.json(user);
});

// Ruta para crear un nuevo usuario
router.post("/users", async (req, res) => {
  const userData = req.body;
  const newUserId = await usersController.createUser(userData);
  res.json({ id: newUserId, message: "User created successfully" });
});

// Ruta para actualizar un usuario por ID
router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  await usersController.updateUser(userId, userData);
  res.json({ message: "User updated successfully" });
});

// Ruta para borrar un usuario por ID
router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  await usersController.deleteUser(userId);
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
```

Con este ejemplo de código, puedes implementar las operaciones CRUD en una API REST utilizando Node.js, Express y MySQL. Recuerda adaptar este ejemplo a tus necesidades específicas, como la estructura de tu base de datos y la validación de datos.

Para levantar los servicios definidos en un archivo `docker-compose.yml`, primero asegúrate de tener Docker instalado en tu máquina. Una vez que tengas Docker instalado, sigue estos pasos para levantar los servicios con Docker Compose:

1. Abre una terminal o línea de comandos en el directorio donde se encuentra tu archivo `docker-compose.yml`.

2. Ejecuta el siguiente comando para levantar los servicios definidos en el archivo `docker-compose.yml`:

   ```bash
   docker-compose up
   ```

   Si deseas ejecutar los servicios en segundo plano, puedes agregar la bandera `-d` al comando:

   ```bash
   docker-compose up -d
   ```

3. Docker Compose leerá el archivo `docker-compose.yml` y levantará los servicios según las especificaciones definidas en ese archivo.

4. Puedes verificar que los servicios estén en ejecución utilizando el siguiente comando:

   ```bash
   docker-compose ps
   ```

Estos pasos te permitirán levantar los servicios definidos en el archivo `docker-compose.yml` utilizando Docker Compose. Recuerda que debes tener Docker y Docker Compose instalados en tu máquina para realizar estas acciones.

docker login
docker compose build
docker tag api-rest-itsm-api-rest zegnhabi/api-rest-itsm
docker push zegnhabi/api-rest-itsm
