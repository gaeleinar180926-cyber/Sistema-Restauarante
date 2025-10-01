# WARP.md

Este archivo proporciona orientación a WARP (warp.dev) al trabajar con código en este repositorio.

## Descripción del Proyecto

Este es un **Sistema POS para Restaurantes** inspirado en SoftRestaurant, diseñado con una **arquitectura multi-agente** donde 7 agentes especializados manejan diferentes aspectos del sistema. El proyecto tiene como objetivo crear una solución POS completa que rivalice con SoftRestaurant usando tecnología moderna, arquitectura modular y código abierto.

## Arquitectura Multi-Agente

El sistema consiste de **7 agentes especializados** que se comunican vía APIs y mantienen estricta separación de responsabilidades:

### Agentes Principales
1. **Agente Backend** (`agents/backend/` - Puerto 3001)
   - Node.js + Express + PostgreSQL + Sequelize
   - APIs REST para mesas, pedidos, productos, pagos, reportes
   - Servidor WebSocket para actualizaciones en tiempo real
   - SQLite para desarrollo, PostgreSQL para producción

2. **Agente Frontend** (`agents/frontend/` - Puerto 3000)  
   - React.js + Vite + Tailwind CSS
   - Interfaz optimizada para pantallas táctiles de restaurante
   - Cliente WebSocket en tiempo real
   - Funcionalidad offline con localStorage/IndexedDB

3. **Agente Auth** (`agents/auth/` - Puerto 3002)
   - Autenticación JWT + bcrypt (mínimo 12 salt rounds)
   - Control de acceso basado en roles (admin, gerente, mesero, cocina, cajero)
   - Rate limiting (100 solicitudes/minuto por IP)
   - Recuperación de contraseñas y registro de auditoría

### Agentes de Soporte
4. **Agente DevOps** (`agents/devops/`)
   - CI/CD con GitHub Actions
   - Automatización de despliegue en VPS (Hostinger)
   - Contenedores Docker y gestión de procesos PM2
   - Gestión SSL/TLS y dominios

5. **Agente Assets** (`agents/assets/`)
   - Recursos visuales y de marca del restaurante
   - Iconos Lucide React y tipografía consistente
   - Imágenes de productos y plantillas de recibos
   - Sistema de temas (claro/oscuro)

6. **Agente Monitoring** (`agents/monitoring/`)
   - Logging centralizado con Winston
   - Métricas de rendimiento en tiempo real
   - Seguimiento de errores y alertas
   - KPIs específicos para restaurantes

7. **Agente Config** (`agents/config/`)
   - Gestión de variables de entorno
   - Configuración multi-tenant
   - Configuraciones de integraciones (impresoras, pasarelas de pago)
   - Reglas de negocio y parámetros del restaurante

## Comandos Principales de Desarrollo

### Inicio Rápido
```powershell
# Iniciar todos los servicios (método más fácil)
.\start-dev.bat

# O manualmente iniciar todos los agentes
npm run dev:agents

# O iniciar agentes específicos
npm run dev:backend    # Puerto 3001
npm run dev:frontend   # Puerto 3000  
npm run dev:auth       # Puerto 3002
```

### Gestión de Variables de Entorno
```powershell
# Sincronizar variables de entorno entre todos los agentes
npm run sync:env

# Sincronizar entorno de agente específico
npm run sync:env:backend
npm run sync:env:frontend
npm run sync:env:auth
```

### Configuración y Gestión de Agentes
```powershell
# Configurar todos los agentes (primera vez)
npm run setup:agents

# Instalar dependencias para todos los agentes
npm run install:all

# Instalar para agentes específicos
npm run install:backend
npm run install:frontend
npm run install:auth
```

### Pruebas
```powershell
# Ejecutar todas las pruebas en todos los agentes
npm run test:all

# Probar agentes específicos
npm run test:backend     # Pruebas Jest para API y base de datos
npm run test:frontend    # Vitest para componentes e interfaz
npm run test:auth        # Pruebas de seguridad y autenticación
```

### Producción
```powershell
# Construir todos los agentes para producción
npm run build

# Desplegar en VPS (Hostinger)
npm run deploy

# Verificar estado del despliegue
npm run deploy:status
```

## Arquitectura de Comunicación entre Agentes

### Contratos de API
- **Agente Backend**: Proporciona APIs REST en `/api/*` para toda la lógica de negocio
- **Agente Auth**: Maneja autenticación en `/api/auth/*` con tokens JWT
- **Agente Frontend**: Consume APIs de los agentes Backend y Auth
- **URLs Inter-Agente**: Definidas en `.env.shared` y sincronizadas entre agentes

### Comunicación en Tiempo Real
- **Servidor WebSocket**: Agente Backend (`ws://localhost:3001`)
- **Socket.io**: Estados de mesa en tiempo real, actualizaciones de pedidos, notificaciones de cocina
- **Requisitos de Rendimiento**: 
  - Selección de mesa: < 100ms
  - Agregar producto al pedido: < 150ms  
  - Enviar pedido a cocina: < 200ms
  - Procesar pago: < 300ms
  - Cambios de estado de mesa: < 50ms

### Sincronización de Entornos
El sistema usa un patrón de configuración de entorno compartido:
- **`.env.shared`**: Contiene toda la configuración común
- **`scripts/sync-env.js`**: Sincroniza entornos entre agentes
- **Variables específicas de agente**: Cada agente obtiene su PORT, AGENT_NAME y AGENT_ROLE

## Características Específicas del Restaurante

### UX Inspirada en SoftRestaurant
- Diseño visual de mesas con funcionalidad de arrastrar y soltar
- Estados de mesa: 🟢 Verde=libre, 🔴 Rojo=ocupada, 🟡 Amarillo=cuenta, 🔵 Azul=limpieza
- Interfaz optimizada para pantallas táctiles con botones mínimo de 44px
- Flujo de trabajo tradicional: seleccionar mesa → tomar pedido → enviar a cocina → procesar pago

### Estándares de Rendimiento
- Debe soportar 50+ usuarios concurrentes durante las horas pico del restaurante
- Consultas de base de datos optimizadas con indexación adecuada (mesas, pedidos, productos)
- Artículos del menú y configuraciones en caché con Redis
- Funcionalidad offline para operación continua sin internet

### Requisitos de Seguridad
- Autenticación JWT con validación de roles en todas las rutas
- bcrypt con mínimo 12 salt rounds para contraseñas  
- Rate limiting: 100 solicitudes/minuto por IP
- CORS habilitado solo para dominios autorizados
- Todas las operaciones críticas registradas (pagos, cambios de pedidos, acciones de usuarios)

## Arquitectura de Base de Datos

### Base de Datos Principal (PostgreSQL)
- **Tables**: Diseño del piso del restaurante y gestión de mesas
- **Orders**: Seguimiento de pedidos en tiempo real y actualizaciones de estado
- **Products**: Artículos del menú con categorías, precios e inventario
- **Users**: Gestión de personal con control de acceso basado en roles
- **Payments**: Registros de transacciones con múltiples métodos de pago

### Capa de Caché (Redis)
- Almacenamiento de sesiones y gestión de tokens JWT
- Caché de artículos del menú y configuraciones
- Datos en tiempo real para conexiones WebSocket

### Base de Datos de Desarrollo
- SQLite usado para desarrollo (`restaurant_pos_dev.sqlite`)
- PostgreSQL para entornos de producción

## Estrategia de Pruebas

### Requisitos de Cobertura
- **Pruebas Unitarias**: Mínimo 80% de cobertura para cálculos de precios, lógica de impuestos, reglas de descuentos
- **Pruebas de Integración**: Flujo completo de pedido desde mesa hasta pago
- **Pruebas E2E**: Escenarios completos de restaurante con múltiples usuarios
- **Pruebas de Carga**: Simular hora pico del restaurante con 50+ pedidos concurrentes
- **Pruebas de Seguridad**: Validar procesamiento de pagos y protección de datos

### Herramientas de Pruebas
- **Backend**: Jest + Supertest para pruebas de API
- **Frontend**: Vitest + Testing Library para pruebas de componentes
- **E2E**: Playwright para pruebas de flujo completo (vía MCP)

## Arquitectura Multi-Tenant

El sistema soporta múltiples restaurantes/sucursales:
- Esquemas de base de datos separados o bases de datos por tenant
- Configuraciones únicas (menús, mesas, personal) por tenant
- Código base compartido con datos aislados
- Panel de administración para gestionar múltiples tenants

## Flujo de Desarrollo

### Principios de Aislamiento de Agentes
- Cada agente funciona independientemente sin responsabilidades superpuestas
- Comunicación solo a través de contratos de API bien definidos
- package.json y dependencias separadas para cada agente
- Sin dependencias de código compartidas entre agentes excepto utilidades comunes

### Integración de Operaciones del Restaurante
1. **Gestión de Mesas**: Diseño visual → cambios de estado → actualizaciones en tiempo real
2. **Procesamiento de Pedidos**: Tomar pedido → notificación a cocina → pago → liberación de mesa
3. **Flujo de Cocina**: Recibir pedidos → marcar estado de preparación → notificar completado
4. **Sistema de Pagos**: Múltiples métodos de pago → generación de recibos → integración con caja registradora

### Soporte de Integración de Hardware
- Impresoras USB/Bluetooth para tickets de cocina y recibos
- Entrada de escáner de código de barras para productos
- Comandos de apertura de cajón de efectivo
- Compatibilidad multiplataforma (Windows, Linux, terminales POS Android)

## Solución de Problemas

### Problemas Comunes de Desarrollo
```powershell
# Conflictos de puertos
netstat -ano | findstr :3000    # Encontrar proceso en conflicto
taskkill /PID [PID] /F          # Terminar proceso en conflicto

# Problemas de dependencias
npm run install:all              # Reinstalar todas las dependencias
npm run sync:env                 # Resincronizar variables de entorno

# Problemas de conexión a base de datos
# Verificar que el servicio PostgreSQL esté ejecutándose
# Revisar credenciales de base de datos en .env.shared
```

### Análisis de Logs
- **Logs principales**: `logs/restaurant-pos.log`
- **Logs específicos de agente**: Cada agente registra en su propio archivo
- **Monitoreo de rendimiento**: Métricas en tiempo real vía Agente Monitoring

### Depuración de Entornos
```powershell
# Verificar configuraciones de agentes
npm run sync:env all

# Verificar salud de agentes
# Cada agente expone endpoint /api/health para verificaciones de estado
```

## Despliegue en Producción

### Despliegue en VPS (Hostinger)
- Despliegue automatizado vía `simple-deploy.js`
- Gestión de procesos PM2 para todos los agentes  
- Certificados SSL/TLS y configuración de dominios
- Respaldos de base de datos y monitoreo

### Configuración de Entorno
- Configuraciones de producción en `.env.shared`
- Aplicación HTTPS para todas las comunicaciones entre agentes
- Clustering de Redis para alta disponibilidad
- Replicación de base de datos para seguridad de datos

## Mejores Prácticas de Desarrollo

### Estándares de Código
- ESLint + Prettier para formato consistente
- Conventional Commits para historial claro de cambios
- Semantic Versioning para lanzamientos
- Code Review requerido para todos los cambios de agentes

### Pruebas de Flujo de Trabajo del Restaurante
- Siempre probar escenarios completos de restaurante (selección de mesa → pedido → pago)
- Validar rendimiento bajo carga (50+ usuarios concurrentes)
- Probar funcionalidad offline y sincronización al reconectarse
- Verificar actualizaciones en tiempo real en múltiples sesiones de cliente

### Mejores Prácticas de Seguridad
- Nunca hacer commit de datos sensibles (API keys, contraseñas, tokens)
- Usar variables de entorno para toda la configuración
- Validar toda entrada tanto en frontend como backend
- Registrar todas las transacciones financieras para pistas de auditoría
