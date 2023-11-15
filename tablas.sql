
CREATE TABLE Duenos (
    id_dueno INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    genero VARCHAR(10)
);

CREATE TABLE Razas (
    id_raza INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    tamano VARCHAR(20)
);

CREATE TABLE Mascotas (
    id_mascota INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    edad INT,
    genero VARCHAR(10),
    id_dueno INT,
    id_raza INT
);

ALTER TABLE Mascotas
ADD FOREIGN KEY (id_dueno) REFERENCES Duenos(id_dueno) ON UPDATE CASCADE ON DELETE NO ACTION;

ALTER TABLE Mascotas
ADD FOREIGN KEY a(id_raza) REFERENCES Razas(id_raza) ON UPDATE CASCADE ON DELETE CASCADE;