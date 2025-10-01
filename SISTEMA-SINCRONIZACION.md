# Sistema de Sincronización - Restaurant POS

¡Felicidades! 🎉 Tienes configurado un sistema completo de sincronización entre tus 3 agentes (Backend, Frontend, Auth).

## 📋 Lo que se configuró

### ✅ Sincronización de Variables de Entorno
- **Archivo principal**: `.env.shared` - Variables compartidas entre todos los agentes
- **Script**: `scripts/sync-env.js` - Sincroniza automáticamente las variables
- **Auto-generación**: Cada agente tiene su `.env` generado automáticamente

### ✅ Contratos de API Documentados  
- **Archivo**: `docs/api-contracts.md` - Especificaciones completas de las APIs
- **Incluye**: Endpoints, performance requirements, estándares de response
- **Performance targets**: Table selection < 100ms, payments < 300ms, etc.

### ✅ Sistema de Logging Centralizado
- **Archivo**: `shared/logger.js` - Logger especializado para restaurantes
- **Features**: Correlation IDs, performance tracking, logs por agente
- **Viewer**: `scripts/log-viewer.js` - Dashboard en tiempo real con colores

### ✅ Tests de Integración
- **Directorio**: `tests/integration/` - Tests que validan comunicación entre agentes
- **Validaciones**: Performance, WebSocket, autenticación, flujos completos
- **Configuración**: `jest.integration.config.js` - Setup específico

### ✅ Git Hooks Automáticos
- **Pre-commit**: Auto-sincroniza variables de entorno antes de cada commit
- **Prevención**: Evita commits con configuración desactualizada

## 🚀 Comandos Principales

```bash
# Sincronización
npm run sync:agents          # Configuración completa inicial
npm run sync:env            # Solo variables de entorno

# Desarrollo
npm run dev:agents          # Inicia los 3 agentes sincronizados
npm run logs               # Monitor de logs en tiempo real

# Testing
npm run test:integration    # Tests entre agentes
npm run test:full-system   # Tests completos del sistema
```

## 🔄 Flujo de Trabajo Recomendado

### Al iniciar el día:
1. `npm run sync:env` - Sincronizar variables
2. `npm run dev:agents` - Iniciar todos los agentes  
3. `npm run logs` - Abrir monitor de logs (en otra terminal)

### Durante desarrollo:
- Los agentes se comunican automáticamente vía las URLs configuradas
- Los logs se centralizan automáticamente con correlation IDs
- Los cambios en `.env.shared` se propagan automáticamente

### Antes de commit:
1. `npm run test:integration` - Validar comunicación entre agentes
2. `git commit` - El pre-hook sincroniza automáticamente

## 📁 Estructura de Archivos Clave

```
Sistema-Restaurante/
├── .env.shared                 # Variables compartidas (FUENTE)
├── sync-agents.js             # Script principal de sincronización
├── docs/
│   └── api-contracts.md       # Contratos entre agentes
├── shared/
│   ├── logger.js              # Logger centralizado
│   └── package.json          # Dependencias compartidas
├── scripts/
│   ├── sync-env.js           # Sincroniza .env entre agentes
│   └── log-viewer.js         # Visualizador de logs en tiempo real
├── tests/integration/        # Tests de comunicación entre agentes
├── logs/                     # Logs centralizados
└── agents/
    ├── backend/              # Agente Backend (puerto 3001)
    ├── frontend/             # Agente Frontend (puerto 3000)
    └── auth/                 # Agente Auth (puerto 3002)
```

## 🎯 Performance Targets Configurados

Según tus reglas de negocio para POS restaurants:

- **Table selection**: < 100ms
- **Add product to order**: < 150ms  
- **Send order to kitchen**: < 200ms
- **Process payment**: < 300ms
- **Table status changes**: < 50ms

Los tests de integración validan automáticamente estos tiempos.

## 🔧 Configuración Específica por Agente

### Backend Agent (Puerto 3001)
- APIs de tables, orders, payments, products
- WebSocket para tiempo real
- Base de datos PostgreSQL + Redis

### Auth Agent (Puerto 3002)  
- JWT authentication/authorization
- User management
- Rate limiting y security

### Frontend Agent (Puerto 3000)
- UI React + Tailwind
- WebSocket client
- Consume APIs de Backend y Auth

## 💡 Características Especiales

### 🔍 Correlation IDs
- Cada request tiene ID único para rastreo across agents
- Visible en logs para debugging fácil

### 📊 Performance Monitoring  
- Logging automático de tiempos de respuesta
- Alertas cuando se exceden los thresholds

### 🎨 Log Viewer Interactivo
- Colores por agente (Backend=azul, Auth=magenta, Frontend=verde)
- Filtros por nivel, agente, operación
- Tiempo real con tail automático

### 🔄 Auto-sync en Git
- Pre-commit hook sincroniza variables automáticamente
- Previene inconsistencias entre agentes

## 📞 URLs de Comunicación

Los agentes se comunican automáticamente usando:

- **Backend**: http://localhost:3001
- **Auth**: http://localhost:3002  
- **Frontend**: http://localhost:3000
- **WebSocket**: ws://localhost:3001

Estas URLs están sincronizadas en todas las configuraciones.

## 🚨 Notas Importantes

1. **Siempre edita `.env.shared`** - No modifiques los `.env` de agentes directamente
2. **Los logs se centralizan automáticamente** - Usa `npm run logs` para monitorear
3. **Los tests validan la comunicación real** - Requieren que los agentes estén corriendo
4. **Git hooks sincronizan automáticamente** - Los commits triggean auto-sync
5. **Performance es crítico** - El sistema monitorea y alerta sobre tiempos

## 🆘 Troubleshooting

### Si un agente no se conecta:
1. Verificar que esté corriendo en el puerto correcto
2. `npm run sync:env` para revalidar configuración
3. Revisar logs con `npm run logs`

### Si tests de integración fallan:
1. Asegurar que todos los agentes estén corriendo
2. Verificar que las URLs sean accesibles
3. Revisar performance thresholds en `.env.shared`

### Si sincronización falla:
1. `npm run sync:agents` - Re-ejecutar setup completo
2. Verificar permisos de archivos
3. Revisar que todas las dependencias estén instaladas

¡Tu sistema de sincronización está listo para desarrollo profesional de POS restaurant! 🍽️