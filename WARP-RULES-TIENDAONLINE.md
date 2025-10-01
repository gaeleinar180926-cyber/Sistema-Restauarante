# 🔧 REGLAS GENERADAS - 26/9/2025

## 📱 **BACKEND AGENT CORE**
```
backend_agent_core:
Agente Backend maneja toda la lógica de negocio del e-commerce:
- Puerto 3001 exclusivo para APIs REST
- URL Producción: https://api.mitienda.com
- URL Desarrollo: http://localhost:3001
- WebSocket en mismo puerto para tiempo real: https://api.mitienda.com
- PostgreSQL como DB principal, SQLite para desarrollo
- Sequelize ORM con migraciones versionadas
- Validación estricta con express-validator
- Rate limiting: 100 requests/minuto por IP
- CORS configurado para: https://shop.mitienda.com,https://admin.mitienda.com
- Logs con Winston para todas las transacciones críticas
- Health check endpoint: https://api.mitienda.com/health
```

---

## 🎨 **FRONTEND STANDARDS**
```
frontend_standards:
Frontend optimizado para operaciones de e-commerce:
- Puerto 3000, URL Producción: https://shop.mitienda.com
- URL Desarrollo: http://localhost:3000
- React + Vite + Tailwind CSS
- Interfaz responsive optimizada
- WebSocket client: https://api.mitienda.com
- APIs Backend: https://api.mitienda.com
- APIs Auth: https://auth.mitienda.com
- Cache con React Query para datos frecuentes
- Modo offline con localStorage/IndexedDB
```

---

## 🔐 **AUTH SECURITY STANDARDS**
```
auth_security_standards:
Agente Auth maneja seguridad crítica del e-commerce:
- Puerto 3002, URL Producción: https://auth.mitienda.com
- URL Desarrollo: http://localhost:3002
- JWT con refresh tokens, expiración 15 minutos
- bcrypt con 12 salt rounds mínimo
- Rate limiting específico: 10 login attempts/minuto
- Logs de auditoría para cambios de permisos
- Sesiones concurrentes limitadas por rol
- CORS configurado para: https://shop.mitienda.com,https://api.mitienda.com
- Health check endpoint: https://auth.mitienda.com/health
```

---

## 🌐 **CORS Y SSL CONFIGURATION**
```
cors_ssl_configuration:
Configuración de seguridad y comunicación entre agentes:
- SSL/TLS obligatorio en producción (mitienda.com)
- CORS Origins permitidos:
  * https://shop.mitienda.com
  * https://admin.mitienda.com
  * http://localhost:3000 (desarrollo)
  * http://127.0.0.1:3000 (desarrollo)
- WebSocket Seguro: https://api.mitienda.com
- Certificados automáticos: Let's Encrypt
- Headers de seguridad: HSTS, CSP, X-Frame-Options
- Rate limiting por dominio configurado
```

---

## 🚀 **DEPLOYMENT COORDINATION**
```
deployment_coordination:
Sistema de despliegue coordinado para producción:
- VPS: TU.IP.SERVIDOR
- Dominio base: mitienda.com
- Estructura servidor:
  * /var/www/mitienda.com/ (Frontend)
  * /var/www/api.mitienda.com/ (Backend)
  * /var/www/auth.mitienda.com/ (Auth)
  * /var/www/monitor.mitienda.com/ (Monitoring)
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
