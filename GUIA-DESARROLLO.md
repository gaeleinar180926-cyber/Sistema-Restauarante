# 🍽️ Guía de Desarrollo - Sistema Restaurante POS

## 📂 Directorios de Trabajo

### Directorio Principal:
```
C:\Users\jovan\proyectos\Sistema-Restaurante\
```

### Agentes Individuales:
1. **Backend Agent** (API + WebSocket)
   ```
   C:\Users\jovan\proyectos\Sistema-Restaurante\agents\backend\
   Puerto: 3001 → https://api.chapibot.pro
   ```

2. **Frontend Agent** (React POS)
   ```  
   C:\Users\jovan\proyectos\Sistema-Restaurante\agents\frontend\
   Puerto: 3000 → https://pos.chapibot.pro
   ```

3. **Auth Agent** (Autenticación)
   ```
   C:\Users\jovan\proyectos\Sistema-Restaurante\agents\auth\
   Puerto: 3002 → https://auth.chapibot.pro
   ```

4. **Android Agent** (POS Móvil)
   ```
   C:\Users\jovan\proyectos\Sistema-Restaurante\agents\android-pos\
   ```

5. **Monitoring Agent** (Supervisión)
   ```
   C:\Users\jovan\proyectos\Sistema-Restaurante\agents\monitoring\
   → https://monitor.chapibot.pro
   ```

## 🚀 Inicio Rápido

### Opción 1: Abrir Todo Automáticamente
```bash
# Ejecutar desde el directorio principal
.\open-agents.bat
```
**Resultado:** Se abren 6 ventanas de VS Code (una por agente + coordinador central)

### Opción 2: Iniciar Desarrollo Coordinado
```bash
# Ejecutar desde el directorio principal  
.\start-all-agents.bat
```
**Resultado:** Se abren 4 terminales (una por agente en ejecución)

### Opción 3: Manual Paso a Paso

#### 1. Abrir Ventanas de VS Code:
```bash
# Backend
code "C:\Users\jovan\proyectos\Sistema-Restaurante\agents\backend"

# Frontend  
code "C:\Users\jovan\proyectos\Sistema-Restaurante\agents\frontend"

# Auth
code "C:\Users\jovan\proyectos\Sistema-Restaurante\agents\auth"

# Coordinador Central
code "C:\Users\jovan\proyectos\Sistema-Restaurante"
```

#### 2. Sincronizar Variables (desde el directorio principal):
```bash
npm run sync:env
```

#### 3. Iniciar Cada Agente:
```bash
# En cada ventana de agente:
npm run dev
```

## 🔧 Comandos de Desarrollo

### Desde el Directorio Principal:
```bash
# Sincronizar configuraciones
npm run sync:env

# Iniciar todos los agentes (automático)
npm run dev:agents

# Ver logs en tiempo real
npm run logs

# Tests de integración
npm run test:integration

# Deploy a producción
npm run deploy:production
```

### En Cada Agente Individual:
```bash
# Desarrollo
npm run dev

# Build
npm run build  

# Tests
npm test

# Linting
npm run lint
```

## 🔄 Flujo de Trabajo Coordinado

### 1. **Configuración Inicial**
- Ejecutar `.\open-agents.bat` para abrir todas las ventanas
- En el coordinador central: `npm run sync:env`
- Verificar que todos tengan las URLs de producción

### 2. **Desarrollo Activo**
- Cada agente trabaja independiente en su ventana
- Las configuraciones se sincronizan automáticamente
- WebSocket mantiene comunicación en tiempo real

### 3. **Testing**
- Tests unitarios en cada agente individual
- Tests de integración desde el coordinador central
- Performance tests automáticos

### 4. **Deploy**
- Desde el coordinador: `npm run deploy:production`
- Se construye y despliega todo coordinadamente

## 🌐 URLs de Desarrollo vs Producción

### Desarrollo (Local):
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000` 
- Auth: `http://localhost:3002`

### Producción (Hostinger VPS):
- Backend: `https://api.chapibot.pro`
- Frontend: `https://pos.chapibot.pro`
- Auth: `https://auth.chapibot.pro`
- Monitoring: `https://monitor.chapibot.pro`

## 📋 Checklist de Desarrollo

### ✅ Antes de Empezar:
- [ ] Ejecutar `.\open-agents.bat`
- [ ] Sincronizar variables: `npm run sync:env`
- [ ] Verificar URLs: `npm run deploy:urls`
- [ ] Instalar dependencias si es necesario

### ✅ Durante el Desarrollo:
- [ ] Cada agente en su ventana de VS Code
- [ ] Backend corriendo en terminal separada
- [ ] Frontend corriendo en terminal separada  
- [ ] Auth corriendo en terminal separada
- [ ] Logs monitoreando en tiempo real

### ✅ Antes de Commit:
- [ ] Tests pasando: `npm run test:integration`
- [ ] Variables sincronizadas: `npm run sync:env`
- [ ] Build exitoso en todos los agentes
- [ ] Performance dentro de límites

## 🎯 Ventajas de esta Configuración

### ✅ **Organización:**
- Cada agente en su propio espacio de trabajo
- Navegación rápida entre componentes
- Context switching eficiente

### ✅ **Desarrollo Coordinado:**
- Variables de entorno sincronizadas
- APIs con contratos definidos
- WebSocket para comunicación tiempo real

### ✅ **Testing Integrado:**
- Tests individuales por agente
- Tests de integración del sistema completo
- Performance monitoring automático

### ✅ **Deploy Unificado:**
- Un solo comando para deploy completo
- Configuración automática de producción
- Rollback coordinado si es necesario

## 💡 Consejos Prácticos

### 📱 **Para el Backend Agent:**
- Enfócate en APIs REST y WebSocket
- Maneja toda la lógica de negocio
- Base de datos y transacciones

### 🎨 **Para el Frontend Agent:**  
- Interfaz optimizada para tablets
- Estados de mesa en tiempo real
- UX específico para restaurantes

### 🔐 **Para el Auth Agent:**
- JWT y seguridad
- Roles y permisos
- Biometría para Android

### 📊 **Para el Monitoring Agent:**
- Métricas de performance
- Health checks
- Business KPIs

## 🔧 Solución de Problemas

### Si un agente no inicia:
```bash
cd agents/[agente]
npm install
npm run dev
```

### Si las URLs no están actualizadas:
```bash
npm run sync:env
```

### Si hay conflictos de puertos:
- Backend: Puerto 3001
- Frontend: Puerto 3000  
- Auth: Puerto 3002
- Verificar con: `netstat -an | findstr :3001`