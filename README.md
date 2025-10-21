# ESP32 Web Monitor

Aplicación web para monitorear en tiempo real los datos de un ESP32, incluyendo voltaje, corriente y estado de LEDs.

## 🚀 Características

- Monitoreo en tiempo real de sensores
- Interfaz web responsive
- API REST para recibir datos del ESP32
- Despliegue automático con Render

## 📡 Endpoints de la API

- `GET /api/data` - Obtener datos actuales
- `POST /api/data` - Recibir datos del ESP32
- `GET /api/health` - Estado del servidor

## 🛠️ Instalación local

```bash
npm install
npm start
