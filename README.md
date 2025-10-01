Este sistema es un Punto de Venta (POS) para restaurantes inspirado en SoftRestaurant, pero desarrollado como parte del proyecto CHAPI.
La meta es que sea modular, escalable y fácil de mantener gracias a la separación por agentes especializados.

🎯 Objetivo: Crear un sistema POS completo que rivalice con SoftRestaurant pero con tecnología moderna, arquitectura modular y código abierto.


📋 PRD (Product Requirements Document)
🎯 Visión del Producto
Desarrollar un sistema POS integral para restaurantes que permita gestionar mesas, pedidos, inventario, pagos y reportes de manera eficiente, escalable y en tiempo real. Inspirado en la funcionalidad de SoftRestaurant pero con arquitectura moderna.
👥 Usuarios Objetivo

👨‍🍳 Meseros: Tomar pedidos, gestionar mesas, enviar órdenes a cocina
💰 Cajeros: Procesar pagos, generar tickets, manejar cierres de caja
👑 Administradores: Gestionar menú, empleados, reportes, configuración
🍽️ Cocina: Recibir órdenes, marcar platos listos, gestionar tiempos
📊 Gerentes: Reportes avanzados, análisis de ventas, control de inventario

⚡ Funcionalidades Core
🏪 Gestión de Mesas

Vista visual del layout del restaurante (estilo SoftRestaurant)
Estados: 🟢 libre, 🔴 ocupada, 🟡 cuenta, 🔵 limpieza
Transferencia de mesas entre meseros
Unión y división de mesas
Reservas y asignaciones

📝 Control de Órdenes

Toma de pedidos por mesa con interfaz táctil
Modificación de órdenes en tiempo real
Envío automático a cocina con tickets
Tracking de tiempos de preparación
Notas especiales y modificadores

📦 Sistema de Inventario

Control de stock en tiempo real
Alertas automáticas de productos agotados
Gestión de proveedores y compras
Costo por plato y rentabilidad
Movimientos y ajustes de inventario

💳 Procesamiento de Pagos

Múltiples formas de pago (efectivo, tarjeta, transferencia)
División de cuentas entre comensales
Sistema de propinas automáticas/manuales
Integración con terminales de pago
Facturas y recibos automáticos

📊 Reportes y Analytics

Ventas por período (día/semana/mes)
Productos más/menos vendidos
Rendimiento por mesero y turno
Análisis de flujo de caja
Reportes fiscales y contables


🏗️ Arquitectura del Sistema
💻 Stack Tecnológico

Backend: Node.js + Express.js + PostgreSQL + Redis
Frontend: React.js + Tailwind CSS + Socket.io
Base de Datos: PostgreSQL (principal) + Redis (cache/sesiones)
Autenticación: JWT + bcrypt + middleware personalizado
Real-time: WebSocket con Socket.io
Deployment: GitHub Pages (dev) + VPS/Cloud (producción)


📌 Agentes del Sistema
🔧 1. Backend Agent (Puerto 3001)
Responsable de la lógica de negocio, seguridad y conexión a base de datos.
Estructura:
backend/
├── src/
│   ├── controllers/     # Manejo de peticiones HTTP
│   ├── models/          # Modelos de datos (Sequelize/TypeORM)
│   ├── routes/          # Rutas de API REST
│   ├── services/        # Lógica de negocio
│   ├── middleware/      # Autenticación, validación, cors
│   ├── utils/           # Helpers y utilidades
│   └── database/        # Configuración DB y migraciones
├── config/              # Configuración de entornos
├── tests/               # Pruebas de integración/unidad
└── package.json
APIs Principales:

/api/mesas - Gestión de mesas y estados
/api/pedidos - Órdenes y modificaciones
/api/productos - Menú e inventario
/api/pagos - Procesamiento de pagos
/api/reportes - Analytics y reportes
/api/usuarios - Gestión de empleados

🎨 2. Frontend Agent (Puerto 3000)
Encargado de la interfaz de usuario (POS, gestión de mesas, cuentas).
Estructura:
frontend/
├── src/
│   ├── components/      # Botones, inputs, modales, tablas
│   ├── pages/           # Pantallas (login, mesas, órdenes, reportes)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Comunicación con APIs
│   ├── utils/           # Helpers del frontend
│   ├── styles/          # Estilos globales, variables CSS
│   └── context/         # Estado global (Context API)
├── public/              # Assets estáticos
├── assets/              # Imágenes, íconos, fonts
└── package.json
Pantallas Principales:

🏠 Dashboard: Resumen de ventas y estado general
🏪 Mesas: Vista interactiva del layout del restaurante
📱 POS: Pantalla de toma de pedidos
🍽️ Cocina: Monitor de órdenes para cocina
💰 Caja: Procesamiento de pagos y cierres
📊 Reportes: Analytics y gráficas
⚙️ Configuración: Ajustes del sistema

🔐 3. Auth Agent (Puerto 3002)
Maneja autenticación, autorización y seguridad del sistema.
Responsabilidades:

Sistema de login/logout con JWT
Gestión de roles y permisos granulares
Middleware de autorización por rutas
Recuperación de contraseñas vía email
Auditoría y logs de acceso
Rate limiting y protección contra ataques

Roles del Sistema:

👑 Super Admin: Acceso total al sistema
👨‍💼 Gerente: Reportes, configuración, empleados
👨‍🍳 Mesero: Mesas asignadas, pedidos, cobros básicos
🍳 Cocina: Órdenes, estados de preparación
💰 Cajero: Pagos, cierres de caja, reportes básicos

🚀 4. DevOps Agent
Automatiza el ciclo de vida del sistema:

Scripts de instalación y configuración automática
CI/CD con GitHub Actions
Docker containers para desarrollo y producción
Monitoreo de builds y rollback automático
Backup automático de base de datos
SSL/TLS y certificados automáticos

🎨 5. Assets Agent
Recursos visuales y de identidad del POS:

Logos del restaurante y sistema
Iconografía consistente (Lucide React)
Tipografías optimizadas para pantallas táctiles
Temas (claro/oscuro) y paletas de colores
Imágenes de productos del menú
Assets para impresión de tickets

📊 6. Monitoring Agent
Detección de fallos y métricas en tiempo real:

Logs centralizados con Winston
Métricas de performance (CPU, RAM, DB)
Alertas automáticas por email/SMS
Dashboard de monitoreo en tiempo real
Tracking de errores y exceptions
Análisis de uso y estadísticas

⚙️ 7. Config Agent
Centraliza la configuración del sistema:

Variables de entorno por agente
Configuración de licencias y activación
Ajustes de entornos (dev, test, prod)
Parámetros del restaurante (horarios, impuestos, etc.)
Configuración de integraciones externas
Backup y restore de configuraciones


🚀 Instalación y Configuración
📋 Prerrequisitos

Node.js v18.0.0 o superior
PostgreSQL v14.0 o superior
Redis v6.0 o superior
Git para control de versiones
npm o yarn como gestor de paquetes

📥 Instalación
1. Clonar el Repositorio
bash# Opción A: Repositorio propio
git clone https://github.com/einar2781-web/restaurant-pos-system.git
cd restaurant-pos-system

# Opción B: Fork del repositorio de referencia
git clone https://github.com/edinsoncs/Sistema-Restaurante.git
cd Sistema-Restaurante
git remote add upstream https://github.com/einar2781-web/restaurant-pos-system.git
2. Configuración de Base de Datos
sql-- Crear base de datos
CREATE DATABASE restaurant_pos;
CREATE USER pos_user WITH ENCRYPTED PASSWORD 'tu_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE restaurant_pos TO pos_user;
3. Configuración de Variables de Entorno
Backend (.env)
env# Servidor
PORT=3001
NODE_ENV=development

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_pos
DB_USER=pos_user
DB_PASSWORD=tu_password_seguro
DB_SSL=false

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro_de_32_caracteres
JWT_EXPIRES_IN=24h

# Email (para recuperación de contraseñas)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password

# Integracione
PAYMENT_GATEWAY_KEY=tu_key_de_pagos
PRINTER_IP=192.168.1.100
Frontend (.env)
envREACT_APP_API_URL=http://localhost:3001/api
REACT_APP_AUTH_URL=http://localhost:3002/api/auth
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_RESTAURANT_NAME=Mi Restaurante
REACT_APP_VERSION=1.0.0
Auth Service (.env)
envPORT=3002
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_pos
DB_USER=pos_user
DB_PASSWORD=tu_password_seguro
JWT_SECRET=tu_jwt_secret_muy_seguro_de_32_caracteres
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
4. Instalación de Dependencias
bash# Backend
cd backend
npm install
npm run migrate
npm run seed

# Frontend  
cd ../frontend
npm install

# Auth Service
cd ../auth
npm install

# Instalar todas las dependencias desde la raíz
cd ..
npm run install:all
5. Iniciar el Sistema
bash# Desarrollo - Ejecutar todos los servicios
npm run dev

# O ejecutar individualmente:
npm run dev:backend    # Puerto 3001
npm run dev:frontend   # Puerto 3000  
npm run dev:auth       # Puerto 3002
🌐 URLs de Desarrollo

Frontend (POS): http://localhost:3000
Backend API: http://localhost:3001/api
Auth Service: http://localhost:3002/api/auth
API Documentation: http://localhost:3001/docs


📱 Cómo usar el Sistema
🏠 1. Primer Acceso

Abre http://localhost:3000
Usa las credenciales por defecto:

Usuario: admin@restaurant.com
Password: admin123


¡IMPORTANTE! Cambia la contraseña inmediatamente

🏪 2. Configuración Inicial

Configurar Restaurante:

Nombre, dirección, teléfono
Horarios de operación
Impuestos y moneda


Crear Layout de Mesas:

Accede a Configuración → Mesas
Arrastra y coloca las mesas según tu layout
Asigna números y capacidades


Configurar Menú:

Productos → Nuevo Producto
Categorías, precios, ingredientes
Fotos de los platos


Crear Empleados:

Usuarios → Nuevo Usuario
Asignar roles y permisos
Configurar horarios de trabajo



🍽️3. Flujo de Operación Diaria
Para Meseros:

Login con credenciales asignadas
Seleccionar Mesa libre en el layout
Tomar Pedido: agregar productos, modificadores, notas
Enviar a Cocina (automático)
Procesar Pago cuando los clientes terminen
Liberar Mesa para siguiente cliente

Para Cocina:

Monitor de Cocina muestra órdenes en tiempo real
Marcar platos como "En preparación" → "Listos"
Gestionar tiempos de preparación
Alertas de pedidos urgentes o retrasados

Para Administradores:

Dashboard con métricas del día
Reportes de ventas, productos, empleados
Gestión de inventario y stock
Configuración de precios y promociones


🔒 Seguridad y Roles
🛡️ Características de Seguridad

Autenticación JWT con tokens de corta duración
Encriptación bcrypt para contraseñas (12 salt rounds)
Rate limiting (100 requests/minuto por IP)
CORS configurado para dominios autorizados
Headers de seguridad con Helmet.js
Validación estricta en frontend y backend
Logs de auditoría para acciones críticas

👥 Sistema de Roles y Permisos
RolMesasPedidosPagosReportesConfigUsuariosSuper Admin✅ Full✅ Full✅ Full✅ Full✅ Full✅ FullGerente✅ Ver todas✅ Ver todas✅ Cierres✅ Avanzados✅ Parcial✅ EmpleadosMesero✅ Asignadas✅ Propias✅ Básico❌ No❌ No❌ NoCocina✅ Ver estados✅ Actualizar❌ No✅ Cocina❌ No❌ NoCajero✅ Ver todas✅ Ver todas✅ Full✅ Básicos❌ No❌ No

📊 Requerimientos del Sistema
⚡ Rendimiento

Tiempo de respuesta: < 200ms para operaciones básicas
Usuarios concurrentes: Soporte para 50+ usuarios simultáneos
Base de datos: Queries optimizadas con índices
Cache: Redis para sesiones y datos frecuentes
WebSocket: Updates en tiempo real sin lag perceptible

🖥️ Hardware Recomendado
Desarrollo:

RAM: 8GB mínimo
CPU: 4 cores mínimo
Disco: 10GB libres + SSD recomendado

Producción:

RAM: 16GB recomendado
CPU: 8 cores recomendado
Disco: 100GB + respaldo automático
Red: 100Mbps simétrico mínimo
UPS: Respaldo eléctrico para continuidad

💾 Base de Datos

PostgreSQL 14+ como DB principal
Redis 6+ para cache y sesiones
Backups automáticos cada 6 horas
Replicación recomendada para producción
SSL/TLS habilitado en producción


🧪 Testing y Calidad
📋 Cobertura de Tests

Unit Tests: 80% cobertura mínima
Integration Tests: APIs críticas al 100%
E2E Tests: Flujo completo de pedido y pago
Load Testing: Validar 50+ usuarios concurrentes
Security Testing: Validación de vulnerabilidades

🚀 Comandos de Testing
bash# Tests individuales por agente
npm run test:backend
npm run test:frontend  
npm run test:auth

# Tests completos del sistema
npm run test:all
npm run test:coverage
npm run test:e2e

# Load testing
npm run test:load

🔧 Scripts de Desarrollo
📝 Comandos Disponibles
bash# Instalación
npm run install:all          # Instalar todas las dependencias
npm run setup:dev            # Configuración inicial de desarrollo  
npm run setup:prod           # Configuración para producción

# Desarrollo
npm run dev                  # Ejecutar todos los servicios
npm run dev:backend          # Solo backend (puerto 3001)
npm run dev:frontend         # Solo frontend (puerto 3000)
npm run dev:auth             # Solo auth service (puerto 3002)

# Base de datos
npm run db:migrate           # Ejecutar migraciones
npm run db:seed              # Sembrar datos de prueba
npm run db:reset             # Resetear DB completa
npm run db:backup            # Backup manual

# Producción
npm run build                # Build para producción
npm run start               # Iniciar en modo producción
npm run pm2:start           # Iniciar con PM2
npm run docker:build       # Build Docker containers

# Utilidades
npm run lint                # Linting de código
npm run format              # Formatear código con Prettier
npm run docs:generate       # Generar documentación API
npm run validate-rules      # Validar reglas del proyecto

📚 Documentación Adicional
📖 Recursos

API Documentation - Documentación completa de APIs
Deployment Guide - Guía de despliegue paso a paso
Architecture Overview - Arquitectura técnica detallada
CMS Usage Guide - Uso del panel de administración
Project Rules - Reglas y estándares del proyecto
Contributing Guide - Cómo contribuir al proyecto
Changelog - Historial de versiones y cambios

🔗 Enlaces Importantes

📱 Demo Live: https://restaurant-pos-demo.vercel.app
📋 Issues: https://github.com/einar2781-web/restaurant-pos-system/issues
💬 Discussions: https://github.com/einar2781-web/restaurant-pos-system/discussions
📧 Support: support@restaurant-pos.com


🤝 Contribución y Desarrollo
🔄 Workflow de Contribución

Fork el repositorio
Crear rama: git checkout -b feature/nueva-funcionalidad
Desarrollar siguiendo las reglas del proyecto
Testing: Asegurar que todos los tests pasen
Commit: git commit -m 'feat: nueva funcionalidad implementada'
Push: git push origin feature/nueva-funcionalidad
Pull Request con descripción detallada

📋 Estándares de Código

ESLint + Prettier para formatting
Conventional Commits para mensajes
Semantic Versioning para releases
Code Review obligatorio para PRs
Documentation actualizada con cada cambio


🚀 Roadmap y Versiones Futuras
📅 Version 1.1.0 (Q2 2024)

 Integración con TPV: Terminales de pago físicos
 App Móvil: React Native para meseros
 Reportes Avanzados: BI y analytics profundos
 Multi-restaurant: Soporte para cadenas
 API Gateway: Microservicios completos

📅 Version 1.2.0 (Q3 2024)

 Delivery Integration: Uber Eats, Rappi, etc.
 Customer App: App para clientes (reservas, menú)
 Loyalty Program: Sistema de puntos y recompensas
 Kitchen Display: Pantallas para cocina
 Voice Orders: Reconocimiento de voz

📅 Version 2.0.0 (Q4 2024)

 AI Analytics: Predicción de ventas con ML
 IoT Integration: Sensores de temperatura, ocupación
 Blockchain Payments: Criptomonedas y DeFi
 AR Menu: Menú en realidad aumentada
 Multi-idioma: Soporte internacional


⚖️ Licencia y Legal
📄 Licencia MIT
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
🏢 Información Legal

Autor: Jovas - einar2781-web
Proyecto: Sistema-Restaurante (Blue Team POS)
Inspirado en: SoftRestaurant (sin afiliación oficial)
Parte de: Proyecto CHAPI
Copyright: © 2024 Jovas. Todos los derechos reservados.

⚠️ Disclaimer
Este sistema es independiente y no está afiliado con SoftRestaurant®. Todas las marcas registradas pertenecen a sus respectivos propietarios.

📞 Soporte y Contacto
💬 Canales de Soporte

🐛 Issues: GitHub Issues
💡 Discussions: GitHub Discussions
📧 Email: soporte@sistema-restaurante.com
💬 Discord: Servidor de la Comunidad

