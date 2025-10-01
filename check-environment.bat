@echo off
echo 🍽️ Verificando Entorno de Desarrollo - Sistema Restaurante POS
echo ===========================================================

echo.
echo 📂 Verificando estructura de directorios...

if exist "agents\backend" (
    echo ✅ Backend Agent encontrado
) else (
    echo ❌ Backend Agent NO encontrado
)

if exist "agents\frontend" (
    echo ✅ Frontend Agent encontrado
) else (
    echo ❌ Frontend Agent NO encontrado
)

if exist "agents\auth" (
    echo ✅ Auth Agent encontrado
) else (
    echo ❌ Auth Agent NO encontrado
)

if exist "agents\monitoring" (
    echo ✅ Monitoring Agent encontrado
) else (
    echo ❌ Monitoring Agent NO encontrado
)

echo.
echo 🔧 Verificando herramientas...

where node >nul 2>&1
if %ERRORLEVEL%==0 (
    echo ✅ Node.js instalado
    node --version
) else (
    echo ❌ Node.js NO instalado
)

where npm >nul 2>&1  
if %ERRORLEVEL%==0 (
    echo ✅ NPM instalado
    npm --version
) else (
    echo ❌ NPM NO instalado
)

where code >nul 2>&1
if %ERRORLEVEL%==0 (
    echo ✅ VS Code instalado
) else (
    echo ❌ VS Code NO instalado
)

echo.
echo 📦 Verificando dependencias principales...

if exist "package.json" (
    echo ✅ package.json principal encontrado
) else (
    echo ❌ package.json principal NO encontrado
)

if exist ".env.shared" (
    echo ✅ .env.shared encontrado
) else (
    echo ❌ .env.shared NO encontrado
)

if exist "node_modules" (
    echo ✅ node_modules principal instalado
) else (
    echo ⚠️ node_modules principal NO instalado - ejecuta 'npm install'
)

echo.
echo 🌐 Verificando configuración de URLs...

findstr "chapibot.pro" .env.shared >nul 2>&1
if %ERRORLEVEL%==0 (
    echo ✅ URLs de producción configuradas
) else (
    echo ❌ URLs de producción NO configuradas
)

echo.
echo 🚀 Scripts disponibles para iniciar:
echo   .\open-agents.bat          - Abrir todas las ventanas VS Code
echo   .\start-all-agents.bat     - Iniciar todos los agentes
echo   npm run sync:env           - Sincronizar variables
echo   npm run dev:agents         - Modo desarrollo automático
echo   npm run deploy:urls        - Ver URLs configuradas

echo.
echo 📋 Estado del entorno:
if exist "agents\backend" if exist "agents\frontend" if exist "agents\auth" (
    echo ✅ ENTORNO LISTO PARA DESARROLLO
) else (
    echo ❌ ENTORNO INCOMPLETO - Revisar agentes faltantes
)

echo.
pause