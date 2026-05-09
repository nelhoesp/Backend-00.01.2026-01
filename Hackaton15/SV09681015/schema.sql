-- ============================================
-- SISTEMA DE COURIER ONLINE - ESQUEMA SQL
-- ============================================

CREATE DATABASE IF NOT EXISTS courier_db;
USE courier_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'repartidor', 'admin') DEFAULT 'cliente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de paquetes
CREATE TABLE IF NOT EXISTS paquetes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_tracking VARCHAR(20) UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    peso DECIMAL(10,2),
    remitente_id INT NOT NULL,
    destinatario_nombre VARCHAR(100) NOT NULL,
    destinatario_direccion TEXT NOT NULL,
    destinatario_telefono VARCHAR(20),
    estado ENUM('registrado','en_transito','en_destino','entregado','no_entregado') DEFAULT 'registrado',
    repartidor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (remitente_id) REFERENCES usuarios(id),
    FOREIGN KEY (repartidor_id) REFERENCES usuarios(id)
);

-- Tabla de ubicaciones (tracking en tiempo real)
CREATE TABLE IF NOT EXISTS ubicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paquete_id INT NOT NULL,
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    descripcion_ubicacion VARCHAR(255),
    registrado_por INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paquete_id) REFERENCES paquetes(id),
    FOREIGN KEY (registrado_por) REFERENCES usuarios(id)
);

-- Tabla de mensajes del chat
CREATE TABLE IF NOT EXISTS mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paquete_id INT NOT NULL,
    usuario_id INT NOT NULL,
    contenido TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paquete_id) REFERENCES paquetes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de eventos del historial
CREATE TABLE IF NOT EXISTS historial_eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paquete_id INT NOT NULL,
    evento VARCHAR(255) NOT NULL,
    descripcion TEXT,
    usuario_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paquete_id) REFERENCES paquetes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ============================================
-- STORED PROCEDURES (Objetos de BD)
-- ============================================

DELIMITER $$

-- SP: Registrar nuevo paquete y generar tracking
CREATE PROCEDURE sp_registrar_paquete(
    IN p_descripcion TEXT,
    IN p_peso DECIMAL(10,2),
    IN p_remitente_id INT,
    IN p_destinatario_nombre VARCHAR(100),
    IN p_destinatario_direccion TEXT,
    IN p_destinatario_telefono VARCHAR(20)
)
BEGIN
    DECLARE v_tracking VARCHAR(20);
    SET v_tracking = CONCAT('CUR', LPAD(FLOOR(RAND() * 999999), 6, '0'));
    
    INSERT INTO paquetes (codigo_tracking, descripcion, peso, remitente_id, destinatario_nombre, destinatario_direccion, destinatario_telefono)
    VALUES (v_tracking, p_descripcion, p_peso, p_remitente_id, p_destinatario_nombre, p_destinatario_direccion, p_destinatario_telefono);
    
    -- Registrar evento inicial
    INSERT INTO historial_eventos (paquete_id, evento, descripcion, usuario_id)
    VALUES (LAST_INSERT_ID(), 'REGISTRADO', 'Paquete registrado en el sistema', p_remitente_id);
    
    SELECT LAST_INSERT_ID() as paquete_id, v_tracking as codigo_tracking;
END$$

-- SP: Actualizar estado del paquete
CREATE PROCEDURE sp_actualizar_estado(
    IN p_paquete_id INT,
    IN p_nuevo_estado ENUM('registrado','en_transito','en_destino','entregado','no_entregado'),
    IN p_usuario_id INT,
    IN p_descripcion_ubicacion VARCHAR(255),
    IN p_latitud DECIMAL(10,8),
    IN p_longitud DECIMAL(11,8)
)
BEGIN
    UPDATE paquetes SET estado = p_nuevo_estado WHERE id = p_paquete_id;
    
    INSERT INTO ubicaciones (paquete_id, latitud, longitud, descripcion_ubicacion, registrado_por)
    VALUES (p_paquete_id, p_latitud, p_longitud, p_descripcion_ubicacion, p_usuario_id);
    
    INSERT INTO historial_eventos (paquete_id, evento, descripcion, usuario_id)
    VALUES (p_paquete_id, UPPER(p_nuevo_estado), p_descripcion_ubicacion, p_usuario_id);
    
    SELECT 'OK' as resultado;
END$$

-- SP: Obtener tracking completo de un paquete
CREATE PROCEDURE sp_obtener_tracking(IN p_codigo VARCHAR(20))
BEGIN
    SELECT 
        p.id, p.codigo_tracking, p.descripcion, p.peso, p.estado,
        p.destinatario_nombre, p.destinatario_direccion, p.destinatario_telefono,
        u.nombre as remitente_nombre,
        r.nombre as repartidor_nombre,
        p.created_at
    FROM paquetes p
    JOIN usuarios u ON p.remitente_id = u.id
    LEFT JOIN usuarios r ON p.repartidor_id = r.id
    WHERE p.codigo_tracking = p_codigo;
    
    -- Historial completo
    SELECT 
        he.evento, he.descripcion, he.created_at,
        u.nombre as registrado_por,
        ub.latitud, ub.longitud, ub.descripcion_ubicacion
    FROM historial_eventos he
    JOIN paquetes p ON he.paquete_id = p.id
    JOIN usuarios u ON he.usuario_id = u.id
    LEFT JOIN ubicaciones ub ON ub.paquete_id = p.id AND DATE(ub.created_at) = DATE(he.created_at)
    WHERE p.codigo_tracking = p_codigo
    ORDER BY he.created_at ASC;
END$$

DELIMITER ;

-- ============================================
-- VISTAS
-- ============================================

CREATE VIEW v_paquetes_activos AS
SELECT 
    p.id, p.codigo_tracking, p.descripcion, p.estado,
    u.nombre as remitente, 
    p.destinatario_nombre as destinatario,
    p.destinatario_direccion,
    r.nombre as repartidor,
    p.created_at
FROM paquetes p
JOIN usuarios u ON p.remitente_id = u.id
LEFT JOIN usuarios r ON p.repartidor_id = r.id
WHERE p.estado NOT IN ('entregado', 'no_entregado');

-- ============================================
-- DATOS DE PRUEBA
-- ============================================
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Admin Sistema', 'admin@courier.com', '$2b$10$hashedpassword1', 'admin'),
('Juan Pérez', 'juan@email.com', '$2b$10$hashedpassword2', 'cliente'),
('María López', 'maria@email.com', '$2b$10$hashedpassword3', 'cliente'),
('Carlos Ruiz', 'carlos@email.com', '$2b$10$hashedpassword4', 'repartidor');
