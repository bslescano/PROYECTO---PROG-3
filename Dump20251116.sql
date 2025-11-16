-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias_inv`
--

DROP TABLE IF EXISTS `categorias_inv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_inv` (
  `id_categoriaInv` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `detalle` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_categoriaInv`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_inv`
--

LOCK TABLES `categorias_inv` WRITE;
/*!40000 ALTER TABLE `categorias_inv` DISABLE KEYS */;
INSERT INTO `categorias_inv` VALUES (1,'Muebles','Juego de sillas y mesas'),(2,'Muebles',' 4 Mesas de luz y 2 roperos'),(3,'Suministros de limpieza','Jabones y champús\nToallas \nPapel'),(4,'Suministros de Limpieza','Lavandina\nPerfume de ambiente\nToallas'),(5,'Electrodomesticos y equipos','Televisores y equipo de sonido'),(6,'Lenceria y Textiles','5 Juegos de sabanas y 2 manteles'),(7,'Lenceria y Textiles','2 Juegos de cortinas blancas');
/*!40000 ALTER TABLE `categorias_inv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` int NOT NULL,
  `pasaporte` int NOT NULL,
  `id_direccion` int DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `fk_clientes_direccion` (`id_direccion`),
  CONSTRAINT `fk_clientes_direccion` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Laura','Gómez',40233456,0,1),(2,'Mauricio','Rodríguez',45226672,0,2),(3,'Camila','Fernández',39500444,0,3),(4,'Juan','Pereyra',41111222,0,4),(5,'Sofía','Martínez',43122455,0,1),(6,'Diego','Sosa',38999654,0,2),(7,'Paula','Benítez',40111333,0,3),(8,'Lucas','López',42333555,0,4);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `concepto` varchar(100) DEFAULT NULL,
  `precio_unitario` float NOT NULL,
  `subtotal` float NOT NULL,
  `id_factura` int DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_factura` (`id_factura`),
  CONSTRAINT `detalle_factura_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion`
--

DROP TABLE IF EXISTS `direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion` (
  `id_direccion` int NOT NULL AUTO_INCREMENT,
  `calle` varchar(100) NOT NULL,
  `numero` int NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `país` varchar(50) NOT NULL DEFAULT 'Argentina',
  PRIMARY KEY (`id_direccion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
INSERT INTO `direccion` VALUES (1,'San Martín',245,'Buenos Aires','Buenos Aires','Argentina'),(2,'Belgrano',880,'Córdoba','Córdoba','Argentina'),(3,'Mitre',1550,'Mendoza','Mendoza','Argentina'),(4,'Rivadavia',420,'Rosario','Santa Fe','Argentina');
/*!40000 ALTER TABLE `direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_direccion` int DEFAULT NULL,
  PRIMARY KEY (`id_empleado`),
  KEY `fk_empleados_direccion` (`id_direccion`),
  CONSTRAINT `fk_empleados_direccion` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'Juan','Pérez','Gerente General','2615551234','juan.perez@hotelcalifornia.com',1),(2,'María','Gómez','Recepcionista','2615552345','maria.gomez@hotelcalifornia.com',2),(3,'Luis','Rodríguez','Mucamo','2615553456','luis.rodriguez@hotelcalifornia.com',3),(4,'Ana','Martínez','Cocinera','2615554567','ana.martinez@hotelcalifornia.com',4);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura_impuestos`
--

DROP TABLE IF EXISTS `factura_impuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura_impuestos` (
  `monto_aplicado` decimal(10,2) DEFAULT NULL,
  `id_factura` int DEFAULT NULL,
  `id_impuesto` int DEFAULT NULL,
  `id_facturaImpuestos` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_facturaImpuestos`),
  KEY `id_factura` (`id_factura`),
  KEY `id_impuesto` (`id_impuesto`),
  CONSTRAINT `factura_impuestos_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`),
  CONSTRAINT `factura_impuestos_ibfk_2` FOREIGN KEY (`id_impuesto`) REFERENCES `impuestos` (`id_impuesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura_impuestos`
--

LOCK TABLES `factura_impuestos` WRITE;
/*!40000 ALTER TABLE `factura_impuestos` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura_impuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `fecha_emision` date NOT NULL,
  `subtotal` float NOT NULL,
  `impuestos` decimal(10,2) DEFAULT NULL,
  `intereses` decimal(10,2) DEFAULT NULL,
  `total` float NOT NULL,
  `estado` enum('Pendiente','Anulada','Pagada') NOT NULL,
  `id_cliente` int NOT NULL,
  `id_empleado` int NOT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `fk_facturas_empleados` (`id_empleado`),
  CONSTRAINT `fk_facturas_empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (1,'2022-12-31',20000,3000.00,0.00,23000,'Pagada',1,1),(6,'2022-12-31',20000,3000.00,3.00,23000,'Pagada',2,2),(7,'2023-01-15',15000,2500.00,0.00,17500,'Pendiente',3,3),(8,'2023-02-10',32000,4800.00,5.00,37300,'Anulada',4,4);
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion` (
  `id_habitacion` int NOT NULL AUTO_INCREMENT,
  `numero` int NOT NULL,
  `tipo` enum('Simple','Doble','Suite','Presidencial') DEFAULT NULL,
  `precio_noche` float NOT NULL,
  `estado` enum('Disponible','Reservada','Ocupado','Mantenimiento') DEFAULT NULL,
  `url_imagen` varchar(500) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_habitacion`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion`
--

LOCK TABLES `habitacion` WRITE;
/*!40000 ALTER TABLE `habitacion` DISABLE KEYS */;
INSERT INTO `habitacion` VALUES (1,3,'Doble',38,'Disponible',NULL,NULL),(2,5,'Simple',28.26,'Reservada',NULL,NULL),(3,12,'Doble',38,'Mantenimiento',NULL,NULL),(4,4,'Suite',80,'Disponible',NULL,NULL),(5,1,'Suite',95,'Disponible',NULL,NULL),(6,2,'Simple',30,'Disponible',NULL,NULL),(8,7,'Simple',9,'Mantenimiento',NULL,NULL),(9,3,'Simple',10,'Disponible',NULL,NULL);
/*!40000 ALTER TABLE `habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impuestos`
--

DROP TABLE IF EXISTS `impuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impuestos` (
  `id_impuesto` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('IVA','Tasa Municipal','IIBB') DEFAULT NULL,
  `porcentaje` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_impuesto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impuestos`
--

LOCK TABLES `impuestos` WRITE;
/*!40000 ALTER TABLE `impuestos` DISABLE KEYS */;
INSERT INTO `impuestos` VALUES (1,'IVA',21.00),(2,'Tasa Municipal',15.00),(3,'Tasa Municipal',15.00),(4,'IVA',21.00);
/*!40000 ALTER TABLE `impuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id_item` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `estado` varchar(10) NOT NULL,
  `id_categoriaInv` int DEFAULT NULL,
  PRIMARY KEY (`id_item`),
  KEY `id_categoriaInv` (`id_categoriaInv`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_categoriaInv`) REFERENCES `categorias_inv` (`id_categoriaInv`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,'Muebles',2,'Nuevo',1),(2,'Muebles',3,'Nuevo',2),(3,'Suministros de Limpieza',2,'Nuevo',3),(4,'Suministros de Limpieza',5,'Nuevo',4);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `fecha_pago` date NOT NULL,
  `monto` float NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `id_reserva` int NOT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `fk_pagos_reservas` (`id_reserva`),
  CONSTRAINT `fk_pagos_reservas` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id_reserva`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,'2025-03-12',38000,'Efectivo','Pagado',1),(2,'2025-03-13',38000,'Efectivo','Pagado',2),(3,'2025-04-12',20000,'Tarjeta','Pendiente',3),(4,'2025-04-24',56000,'Tarjeta','Pagado',4),(5,'2025-05-01',45000,'Tarjeta','Pagado',5);
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  `telefono` bigint NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_direccion` int DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`),
  KEY `id_direccion` (`id_direccion`),
  CONSTRAINT `proveedores_ibfk_1` FOREIGN KEY (`id_direccion`) REFERENCES `direccion` (`id_direccion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Laminek',381362699,'laminek223@gmail.com',1),(2,'El Amigo',3814556781,'ElamigoB@gmail.com',2),(3,'BENS',3815005678,'bensservicio@gmail.com',3);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `estado` varchar(20) NOT NULL,
  `id_cliente` int DEFAULT NULL,
  `id_habitacion` int DEFAULT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_habitacion` (`id_habitacion`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_habitacion`) REFERENCES `habitacion` (`id_habitacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'2025-03-12','2025-03-20','Pendiente',1,1),(2,'2025-04-03','2025-03-12','Confirmada',2,2),(3,'2025-04-04','2025-04-21','Confirmada',3,3),(4,'2025-04-12','2025-04-15','Confirmada',4,4),(5,'2025-05-01','2025-05-08','Pendiente',5,5);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_usuario`
--

DROP TABLE IF EXISTS `rol_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_usuario` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_usuario`
--

LOCK TABLES `rol_usuario` WRITE;
/*!40000 ALTER TABLE `rol_usuario` DISABLE KEYS */;
INSERT INTO `rol_usuario` VALUES (1,'Administrador'),(2,'Administrador'),(3,'Cliente'),(4,'Cliente'),(5,'Cliente'),(6,'Empleado');
/*!40000 ALTER TABLE `rol_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `precio` float NOT NULL,
  PRIMARY KEY (`id_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Spa y belleza','Masajes',31000),(2,'Buffet p/2','Carne con papas al horno',27000),(3,'Buffet','Matambre al verdeo con papas',21000),(4,'Spa y belleza','Manicura y masajes',38000);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjetas`
--

DROP TABLE IF EXISTS `tarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjetas` (
  `id_tarjeta` int NOT NULL AUTO_INCREMENT,
  `entidad` varchar(50) DEFAULT NULL,
  `numero` int NOT NULL,
  `cuotas` enum('1','3','6','9','12','18','24') NOT NULL,
  `intereses` decimal(10,2) NOT NULL,
  `monto_total` float NOT NULL,
  `id_pago` int DEFAULT NULL,
  `ultimos_digitos` varchar(4) NOT NULL,
  `nombre_titular` varchar(100) NOT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  PRIMARY KEY (`id_tarjeta`),
  KEY `id_pago` (`id_pago`),
  CONSTRAINT `tarjetas_ibfk_1` FOREIGN KEY (`id_pago`) REFERENCES `pagos` (`id_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjetas`
--

LOCK TABLES `tarjetas` WRITE;
/*!40000 ALTER TABLE `tarjetas` DISABLE KEYS */;
INSERT INTO `tarjetas` VALUES (1,'Banco Nacion',12235688,'3',6.00,20000,1,'344','Priscila Olariaga','2025-04-12'),(2,'Banco Nacion',93845282,'3',6.00,56000,2,'887','Carlos Medina','2025-04-24'),(3,'Tarjeta Naranja',76467488,'3',15.00,45000,3,'991','Rocio Gonzales','2025-05-02');
/*!40000 ALTER TABLE `tarjetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `id_rol` int DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuarios_rol` (`id_rol`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol_usuario` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'test','test',1),(2,'Admin','Admin',2),(3,'Priscila','PriiNerea',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-16 20:46:46
