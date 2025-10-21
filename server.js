const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Datos iniciales de los sensores
let sensorData = {
    voltaje: 0,
    corriente: 0,
    led1: false,
    led2: false,
    led3: false,
    timestamp: new Date().toISOString()
};

// Endpoint para recibir datos del ESP32 (POST)
app.post('/api/data', (req, res) => {
    try {
        sensorData = {
            ...req.body,
            timestamp: new Date().toISOString()
        };
        
        console.log('📡 Datos recibidos del ESP32:', sensorData);
        
        res.json({ 
            status: 'success', 
            message: 'Datos recibidos correctamente',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error procesando datos:', error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Error interno del servidor' 
        });
    }
});

// Endpoint para obtener datos (GET) - usado por el frontend
app.get('/api/data', (req, res) => {
    res.json(sensorData);
});

// Endpoint de salud del servidor
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Servir el frontend para todas las demás rutas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📱 Frontend disponible en: http://localhost:${PORT}`);
    console.log(`📡 Endpoint API: http://localhost:${PORT}/api/data`);
});
