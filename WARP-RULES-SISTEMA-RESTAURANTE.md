# 🔧 REGLAS GENERADAS - 26/9/2025

## 📱 **BACKEND AGENT CORE**
```
backend_agent_core:
Agente Backend maneja toda la lógica de negocio del restaurante:
- Puerto 3001 exclusivo para APIs REST
- URL Producción: https://api.chapibot.pro
- URL Desarrollo: http://localhost:3001
- WebSocket en mismo puerto para tiempo real: https://api.chapibot.pro
- PostgreSQL como DB principal, SQLite para desarrollo
- Sequelize ORM con migraciones versionadas
- Validación estricta con express-validator
- Rate limiting: 100 requests/minuto por IP
- CORS configurado para: https://pos.chapibot.pro,https://monitor.chapibot.pro
- Logs con Winston para todas las transacciones críticas
- Health check endpoint: https://api.chapibot.pro/health
```

---

## 🎨 **FRONTEND STANDARDS**
```
frontend_standards:
Frontend optimizado para operaciones de restaurante:
- Puerto 3000, URL Producción: https://pos.chapibot.pro
- URL Desarrollo: http://localhost:3000
- React + Vite + Tailwind CSS
- Interfaz responsive optimizada
- WebSocket client: https://api.chapibot.pro
- APIs Backend: https://api.chapibot.pro
- APIs Auth: https://auth.chapibot.pro
- Cache con React Query para datos frecuentes
- Modo offline con localStorage/IndexedDB
```

---

## 🔐 **AUTH SECURITY STANDARDS**
```
auth_security_standards:
Agente Auth maneja seguridad crítica del restaurante:
- Puerto 3002, URL Producción: https://auth.chapibot.pro
- URL Desarrollo: http://localhost:3002
- JWT con refresh tokens, expiración 15 minutos
- bcrypt con 12 salt rounds mínimo
- Rate limiting específico: 10 login attempts/minuto
- Logs de auditoría para cambios de permisos
- Sesiones concurrentes limitadas por rol
- CORS configurado para: https://pos.chapibot.pro,https://api.chapibot.pro
- Health check endpoint: https://auth.chapibot.pro/health
```

---

## 📊 **MONITORING STANDARDS**
```
monitoring_standards:
Agente Monitoring supervisa operaciones críticas del restaurante:
- URL Producción: https://monitor.chapibot.pro
- Performance: response times de APIs por endpoint
- Errors: tracking con Sentry para bugs en producción
- Health checks endpoints:
  * https://api.chapibot.pro/health
  * https://auth.chapibot.pro/health
  * https://pos.chapibot.pro (status check)
- Dashboards: Grafana para visualización en tiempo real
- WebSocket: https://api.chapibot.pro para updates tiempo real
```

---

## 🌐 **CORS Y SSL CONFIGURATION**
```
cors_ssl_configuration:
Configuración de seguridad y comunicación entre agentes:
- SSL/TLS obligatorio en producción (chapibot.pro)
- CORS Origins permitidos:
  * https://pos.chapibot.pro
  * https://monitor.chapibot.pro
  * http://localhost:3000 (desarrollo)
  * http://127.0.0.1:3000 (desarrollo)
- WebSocket Seguro: https://api.chapibot.pro
- Certificados automáticos: Let's Encrypt
- Headers de seguridad: HSTS, CSP, X-Frame-Options
- Rate limiting por dominio configurado
```

---

## 🚀 **DEPLOYMENT COORDINATION**
```
deployment_coordination:
Sistema de despliegue coordinado para producción:
- VPS: 31.97.43.51
- Dominio base: chapibot.pro
- Estructura servidor:
  * /var/www/chapibot.pro/ (Frontend)
  * /var/www/api.chapibot.pro/ (Backend)
  * /var/www/auth.chapibot.pro/ (Auth)
  * /var/www/monitor.chapibot.pro/ (Monitoring)
- PM2 para gestión de procesos Node.js
- Nginx reverse proxy configurado
- Deploy comando: npm run deploy:production
- Health checks post-deploy automáticos
- Rollback coordinado si fallan health checks
```

---

## 📋 **CONFIGURACIÓN GENERADA AUTOMÁTICAMENTE**
Estas reglas fueron generadas usando el generador automático de reglas.
Para modificar, edita el archivo de configuración y regenera.
