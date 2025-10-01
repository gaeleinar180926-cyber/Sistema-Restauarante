# Configuración de Producción - Sistema Restaurante POS

## URLs de Producción Configuradas

✅ **Frontend POS**: https://pos.chapibot.pro  
✅ **Backend API**: https://api.chapibot.pro  
✅ **Auth Service**: https://auth.chapibot.pro  
✅ **Monitoring**: https://monitor.chapibot.pro  

## Servidor VPS - Hostinger
- **IP**: 31.97.43.51
- **Dominio**: chapibot.pro
- **SSL**: Automático con Let's Encrypt

## Cambios Realizados

### 1. Variables de Entorno (.env.shared)
```bash
# URLs de Producción actualizadas
BACKEND_URL=https://api.chapibot.pro
AUTH_URL=https://auth.chapibot.pro
FRONTEND_URL=https://pos.chapibot.pro
MONITORING_URL=https://monitor.chapibot.pro

# CORS actualizado
CORS_ORIGIN=https://pos.chapibot.pro,https://monitor.chapibot.pro,http://localhost:3000,http://127.0.0.1:3000

# WebSocket con SSL
WEBSOCKET_URL=wss://api.chapibot.pro

# Modo producción
NODE_ENV=production
DEBUG_MODE=false
```

### 2. Sincronización de Agentes
Todos los agentes han sido sincronizados automáticamente con las nuevas configuraciones:
- ✅ Backend Agent (Puerto 3001)
- ✅ Frontend Agent (Puerto 3000)  
- ✅ Auth Agent (Puerto 3002)
- ✅ Monitoring Agent

### 3. Scripts de Despliegue Actualizados
```bash
# Deploy completo a producción
npm run deploy:production

# Verificar URLs configuradas
npm run deploy:urls

# Verificar estado del servidor
npm run deploy:status

# Reiniciar servicios
npm run deploy:restart
```

## Estructura de Directorios en el Servidor
```
/var/www/
├── pos.chapibot.pro/          # Frontend React
├── api.chapibot.pro/          # Backend Node.js
├── auth.chapibot.pro/         # Auth Service
└── monitor.chapibot.pro/      # Monitoring Dashboard
```

## Configuración PM2
```javascript
{
  "apps": [
    {
      "name": "api-chapibot",
      "script": "/var/www/api.chapibot.pro/src/server.js",
      "env": { "NODE_ENV": "production", "PORT": 3001 }
    },
    {
      "name": "auth-chapibot", 
      "script": "/var/www/auth.chapibot.pro/src/server.js",
      "env": { "NODE_ENV": "production", "PORT": 3002 }
    }
  ]
}
```

## Seguridad y SSL

### CORS Configurado para:
- ✅ https://pos.chapibot.pro (Frontend)
- ✅ https://monitor.chapibot.pro (Monitoring)
- ✅ Localhost para desarrollo

### SSL/TLS:
- ✅ Certificados automáticos con Let's Encrypt
- ✅ WebSocket Seguro (WSS) 
- ✅ HTTPS en todos los endpoints

### Puertos:
- **3000**: Frontend (desarrollo) → https://pos.chapibot.pro
- **3001**: Backend API → https://api.chapibot.pro  
- **3002**: Auth Service → https://auth.chapibot.pro
- **80/443**: Nginx reverse proxy

## Comandos de Verificación

### Verificar Estado:
```bash
npm run deploy:status
```

### Ver URLs:
```bash
npm run deploy:urls
```

### Deploy Completo:
```bash
npm run deploy:production
```

### Verificar APIs:
```bash
curl https://api.chapibot.pro/health
curl https://auth.chapibot.pro/health
curl https://pos.chapibot.pro
curl https://monitor.chapibot.pro
```

## Performance y Monitoring

### Métricas Configuradas:
- ✅ Tiempo respuesta < 100ms (selección mesa)
- ✅ Tiempo respuesta < 150ms (agregar producto)
- ✅ Rate limiting: 100 requests/minuto
- ✅ Logs centralizados en `/logs/`
- ✅ Health checks cada 30 segundos

### Monitoreo:
- **Health Checks**: Todos los agentes exponen `/api/health`
- **Dashboards**: Disponible en https://monitor.chapibot.pro
- **Logs**: Centralizados con Winston
- **Métricas**: Performance y business KPIs

## Próximos Pasos

1. **Verificar funcionamiento**: Probar cada URL
2. **Configurar SSL**: Validar certificados
3. **Testing**: Ejecutar tests de integración
4. **Monitoring**: Verificar métricas en tiempo real
5. **Backup**: Configurar respaldos automáticos

## Notas Importantes

- ⚠️ Las variables de entorno se sincronizan automáticamente
- ⚠️ Usar siempre `npm run sync:env` antes de deploy
- ⚠️ Los cambios en `.env.shared` afectan todos los agentes
- ⚠️ El deploy de producción incluye build automático