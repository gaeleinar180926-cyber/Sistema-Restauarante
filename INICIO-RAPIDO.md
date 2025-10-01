# 🚀 Guía de Inicio Rápido - Sistema POS Restaurante

## 📂 Cómo volver a abrir el proyecto

### Opción 1: Script Automático (Recomendado)
1. Hacer doble clic en `start-dev.bat`
2. El script automáticamente:
   - Navega al directorio del proyecto
   - Verifica las versiones de Node.js y npm
   - Instala/actualiza dependencias
   - Inicia todos los servicios

### Opción 2: Comandos Manuales en Terminal
```powershell
# 1. Navegar al proyecto
cd "C:\Users\jovan\proyectos\Sistema-Restaurante"

# 2. Instalar dependencias (primera vez o después de actualizaciones)
npm run install:all

# 3. Iniciar todos los servicios
npm run dev
```

### Opción 3: Servicios Individuales
```powershell
# Si solo necesitas un servicio específico:
npm run dev:backend   # Puerto 3001
npm run dev:frontend  # Puerto 3000
npm run dev:auth      # Puerto 3002
```

## 🌐 URLs de Acceso
Una vez iniciado el sistema:

- **Frontend (POS)**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Auth Service**: http://localhost:3002/api/auth

## 🔐 Credenciales por Defecto
- **Usuario**: admin@restaurant.com
- **Contraseña**: admin123

⚠️ **IMPORTANTE**: Cambiar estas credenciales en la primera configuración

## 🛠️ Comandos Útiles

### Desarrollo
```powershell
npm run dev              # Iniciar todos los servicios
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend
npm run dev:auth         # Solo auth service
```

### Instalación
```powershell
npm run install:all      # Instalar todas las dependencias
npm run setup:dev        # Configuración inicial
```

### Base de Datos
```powershell
npm run db:migrate       # Ejecutar migraciones
npm run db:seed          # Datos de prueba
npm run db:reset         # Resetear DB
npm run db:backup        # Backup manual
```

### Testing
```powershell
npm run test:all         # Todos los tests
npm run test:backend     # Solo backend
npm run test:frontend    # Solo frontend
npm run test:auth        # Solo auth
```

### Producción
```powershell
npm run build            # Build para producción
npm run start            # Iniciar en producción
```

## 📋 Checklist de Inicio

### Primera vez:
- [ ] Verificar Node.js >= 18.0.0 instalado
- [ ] Verificar PostgreSQL >= 14.0 instalado y corriendo
- [ ] Verificar Redis >= 6.0 instalado y corriendo
- [ ] Configurar variables de entorno (.env)
- [ ] Ejecutar `npm run install:all`
- [ ] Ejecutar `npm run db:migrate`
- [ ] Ejecutar `npm run db:seed`
- [ ] Cambiar credenciales por defecto

### Uso diario:
- [ ] Navegar al directorio del proyecto
- [ ] Ejecutar `start-dev.bat` o `npm run dev`
- [ ] Acceder a http://localhost:3000
- [ ] Iniciar sesión

## 🚨 Resolución de Problemas Comunes

### Error: Puerto ya en uso
```powershell
# Encontrar proceso usando el puerto
netstat -ano | findstr :3000
# Terminar el proceso (reemplazar PID)
taskkill /PID [PID] /F
```

### Error: Dependencias desactualizadas
```powershell
# Limpiar cache de npm
npm cache clean --force
# Reinstalar dependencias
npm run install:all
```

### Error: Base de datos no conecta
```powershell
# Verificar PostgreSQL corriendo
pg_ctl status
# Iniciar PostgreSQL si está detenido
pg_ctl start
```

### Error: Redis no disponible
```powershell
# En Windows con WSL
wsl redis-server
# O usar Redis Desktop Manager
```

## 📁 Estructura del Proyecto
```
Sistema-Restaurante/
├── agents/
│   ├── backend/     # Node.js + Express (puerto 3001)
│   ├── frontend/    # React.js + Tailwind (puerto 3000)
│   └── auth/        # JWT Auth Service (puerto 3002)
├── config/          # Configuración global
├── docs/           # Documentación
├── scripts/        # Scripts de utilidad
├── start-dev.bat   # Script de inicio automático
└── package.json    # Configuración principal
```

## 🔄 Workflow Recomendado

1. **Abrir proyecto**: Usar `start-dev.bat`
2. **Desarrollar**: Hacer cambios en los agentes correspondientes
3. **Probar**: Usar tests antes de hacer commits
4. **Guardar**: Commits siguiendo Conventional Commits
5. **Cerrar**: Ctrl+C en terminal para detener servicios

## 📞 Soporte
Si tienes problemas:
1. Revisa esta guía
2. Consulta el README.md completo
3. Revisa los logs en terminal
4. Contacta soporte técnico