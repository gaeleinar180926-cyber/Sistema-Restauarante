# 🔧 REGLAS ACTUALIZADAS - Sistema Restaurante POS

## 🌐 **CONFIGURACIÓN DE URLs Y DOMINIOS**

### **Producción - Hostinger VPS:**
```
DOMAIN_BASE=chapibot.pro
SERVER_IP=31.97.43.51
SSL_ENABLED=true
```

### **URLs por Agente:**
- **Backend**: `https://api.chapibot.pro` (Puerto 3001)
- **Frontend**: `https://pos.chapibot.pro` (Puerto 3000)  
- **Auth**: `https://auth.chapibot.pro` (Puerto 3002)
- **Monitoring**: `https://monitor.chapibot.pro`

---

## 📱 **1. BACKEND AGENT CORE (ACTUALIZADA)**
```
backend_agent_core:
Agente Backend maneja toda la lógica de negocio del restaurante:
- Puerto 3001 exclusivo para APIs REST
- URL Producción: https://api.chapibot.pro
- URL Desarrollo: http://localhost:3001
- WebSocket en mismo puerto para tiempo real: wss://api.chapibot.pro
- PostgreSQL como DB principal, SQLite para desarrollo
- Sequelize ORM con migraciones versionadas
- Validación estricta con express-validator
- Rate limiting: 100 requests/minuto por IP
- CORS configurado para: https://pos.chapibot.pro,https://monitor.chapibot.pro
- Logs con Winston para todas las transacciones críticas
- Health check endpoint: https://api.chapibot.pro/health
```

---

## 🎨 **2. FRONTEND UX STANDARDS (ACTUALIZADA)**
```
frontend_ux_standards:
Frontend optimizado para operaciones de restaurante:
- Puerto 3000, URL Producción: https://pos.chapibot.pro
- URL Desarrollo: http://localhost:3000
- React + Vite + Tailwind CSS
- Botones mínimo 44px para pantallas táctiles
- Máximo 3 taps para completar una orden
- Estados de mesa: Verde=libre, Rojo=ocupada, Amarillo=cuenta, Azul=limpieza
- Interfaz responsive para tablets 7"-10"
- WebSocket client: wss://api.chapibot.pro
- APIs Backend: https://api.chapibot.pro
- APIs Auth: https://auth.chapibot.pro
- Cache con React Query para datos frecuentes
- Modo offline con localStorage/IndexedDB
```

---

## 🔐 **3. AUTH SECURITY STANDARDS (ACTUALIZADA)**
```
auth_security_standards:
Agente Auth maneja seguridad crítica del POS:
- Puerto 3002, URL Producción: https://auth.chapibot.pro
- URL Desarrollo: http://localhost:3002
- JWT con refresh tokens, expiración 15 minutos
- bcrypt con 12 salt rounds mínimo
- Roles: ADMIN, GERENTE, CAJERO, MESERO, COCINA
- Biometría para dispositivos Android compatibles
- Rate limiting específico: 10 login attempts/minuto
- Logs de auditoría para cambios de permisos
- Sesiones concurrentes limitadas por rol
- CORS configurado para: https://pos.chapibot.pro,https://api.chapibot.pro
- Health check endpoint: https://auth.chapibot.pro/health
```

---

## 📊 **4. RESTAURANT MONITORING (ACTUALIZADA)**
```
restaurant_monitoring:
Agente Monitoring supervisa operaciones críticas:
- URL Producción: https://monitor.chapibot.pro
- Métricas específicas: tiempo promedio de orden, mesas libres
- Alertas: caja registradora desconectada, impresora sin papel
- Performance: response times de APIs por endpoint
- Errors: tracking con Sentry para bugs en producción
- Business KPIs: ventas por hora, productos más vendidos
- Health checks endpoints:
  * https://api.chapibot.pro/health
  * https://auth.chapibot.pro/health
  * https://pos.chapibot.pro (status check)
- Dashboards: Grafana para visualización en tiempo real
- WebSocket: wss://api.chapibot.pro para updates tiempo real
```

---

## 🤝 **5. MULTI-AGENT COORDINATION (ACTUALIZADA)**
```
multi_agent_coordination:
Los agentes trabajan en equipo siguiendo contratos de API estrictos:
- Backend Agent (https://api.chapibot.pro) define todas las APIs
- Frontend Agent (https://pos.chapibot.pro) consume APIs documentadas
- Auth Agent (https://auth.chapibot.pro) maneja autenticación independiente
- Monitoring Agent (https://monitor.chapibot.pro) supervisa todo el sistema
- Cada agente valida entrada/salida según contratos
- Comunicación vía HTTPS/WSS: wss://api.chapibot.pro
- CORS configurado para comunicación entre dominios
- Cambios de API requieren actualización de contratos primero
- Deploy coordinado: npm run deploy:production
```

---

## 🌐 **6. CORS Y SSL CONFIGURATION (NUEVA)**
```
cors_ssl_configuration:
Configuración de seguridad y comunicación entre agentes:
- SSL/TLS obligatorio en producción (chapibot.pro)
- CORS Origins permitidos:
  * https://pos.chapibot.pro
  * https://monitor.chapibot.pro  
  * http://localhost:3000 (desarrollo)
  * http://127.0.0.1:3000 (desarrollo)
- WebSocket Seguro: wss://api.chapibot.pro
- Certificados automáticos: Let's Encrypt
- Headers de seguridad: HSTS, CSP, X-Frame-Options
- Rate limiting por dominio configurado
```

---

## 🚀 **7. DEPLOYMENT COORDINATION (NUEVA)**
```
deployment_coordination:
Sistema de despliegue coordinado para producción:
- VPS: 31.97.43.51 (Hostinger)
- Dominio base: chapibot.pro
- Estructura servidor:
  * /var/www/pos.chapibot.pro/ (Frontend)
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

## 📋 **PLANTILLA PARA OTROS PROYECTOS**

### **Variables a Cambiar por Proyecto:**
```bash
# Cambiar estas variables para cada proyecto:
PROJECT_NAME="Sistema-Restaurante"
DOMAIN_BASE="chapibot.pro"  # Cambiar por tu dominio
SERVER_IP="31.97.43.51"    # Cambiar por tu servidor

# Agentes del proyecto (personalizar):
BACKEND_URL="https://api.${DOMAIN_BASE}"
FRONTEND_URL="https://pos.${DOMAIN_BASE}" 
AUTH_URL="https://auth.${DOMAIN_BASE}"
MONITORING_URL="https://monitor.${DOMAIN_BASE}"
```

### **Estructura de Reglas Reutilizable:**
```
[nombre_proyecto]_[agente]_[función]:
[Agente] maneja [responsabilidad] del [tipo_proyecto]:
- Puerto [puerto] exclusivo para [función]
- URL Producción: https://[subdominio].${DOMAIN_BASE}
- URL Desarrollo: http://localhost:[puerto]
- [Configuraciones específicas del agente]
- CORS configurado para: [lista de URLs permitidas]
- Health check endpoint: https://[subdominio].${DOMAIN_BASE}/health
```

---

## 🎯 **REGLAS ESPECÍFICAS POR TIPO DE PROYECTO**

### **Para E-Commerce:**
```
ecommerce_backend_core:
- URL: https://api.tutienda.com
- Funciones: productos, pedidos, pagos, inventario

ecommerce_frontend_shop:  
- URL: https://shop.tutienda.com
- Funciones: catálogo, carrito, checkout, cuenta usuario

ecommerce_admin_panel:
- URL: https://admin.tutienda.com  
- Funciones: gestión productos, pedidos, reportes
```

### **Para Blog/CMS:**
```
blog_api_core:
- URL: https://api.miblog.com
- Funciones: posts, comentarios, usuarios, media

blog_frontend_public:
- URL: https://www.miblog.com
- Funciones: lista posts, post individual, comentarios

blog_admin_cms:
- URL: https://admin.miblog.com
- Funciones: crear posts, gestión usuarios, configuración
```

---

## ✅ **PRÓXIMOS PASOS PARA TU CONFIGURACIÓN PERFECTA**

### **1. Actualizar Reglas en Warp:**
- Reemplaza tus reglas actuales con las versiones actualizadas
- Incluye las URLs específicas en cada regla
- Añade las nuevas reglas (CORS, Deploy, etc.)

### **2. Crear Plantilla Reutilizable:**
- Guarda las reglas como plantilla
- Define variables por proyecto
- Crea script para generar reglas automáticamente

### **3. Validar Configuración:**
- Probar cada agente con sus URLs específicas
- Verificar comunicación entre agentes
- Confirmar deploy coordinado funciona