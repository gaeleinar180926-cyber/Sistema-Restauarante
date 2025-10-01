@echo off
color 0A
title Sistema POS Restaurante - Inicio
echo ===============================================
echo    🚀 SISTEMA POS RESTAURANTE - INICIO
echo ===============================================
echo.

REM Navegar al directorio del proyecto
cd /d "C:\Users\jovan\proyectos\Sistema-Restaurante"

echo ⏳ Verificando prerrequisitos...
echo.

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js no está instalado o no está en el PATH
    echo    Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: npm no está disponible
    echo    npm debería venir con Node.js
    pause
    exit /b 1
)

REM Mostrar versiones
echo ✅ Node.js: 
node --version
echo ✅ npm: 
npm --version
echo.

REM Verificar si existen los agentes
if not exist "agents\backend\package.json" (
    echo 🔧 Configurando agente backend...
    node scripts/setup-agent.js backend
    echo.
)

if not exist "agents\frontend\package.json" (
    echo 🔧 Configurando agente frontend...
    node scripts/setup-agent.js frontend
    echo.
)

if not exist "agents\auth\package.json" (
    echo 🔧 Configurando agente auth...
    node scripts/setup-agent.js auth
    echo.
)

echo 📦 Instalando dependencias...
echo.

REM Instalar dependencias principales
echo Instalando dependencias principales...
npm install
if errorlevel 1 (
    echo ❌ Error instalando dependencias principales
    pause
    exit /b 1
)

REM Instalar dependencias de agentes
echo Instalando dependencias de agentes...

if exist "agents\backend\package.json" (
    echo - Backend...
    cd agents\backend
    npm install
    if errorlevel 1 (
        echo ❌ Error instalando dependencias del backend
        cd ..\..
        pause
        exit /b 1
    )
    cd ..\..
)

if exist "agents\frontend\package.json" (
    echo - Frontend...
    cd agents\frontend
    npm install
    if errorlevel 1 (
        echo ❌ Error instalando dependencias del frontend
        cd ..\..
        pause
        exit /b 1
    )
    cd ..\..
)

if exist "agents\auth\package.json" (
    echo - Auth...
    cd agents\auth
    npm install
    if errorlevel 1 (
        echo ❌ Error instalando dependencias del auth
        cd ..\..
        pause
        exit /b 1
    )
    cd ..\..
)

echo.
echo ===============================================
echo    ✅ CONFIGURACIÓN COMPLETADA
echo ===============================================
echo.
echo 🌐 URLs de acceso una vez iniciado:
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:3001/api/health
echo    Auth:      http://localhost:3002/api/health
echo.
echo 🔐 Credenciales por defecto:
echo    Usuario: admin@restaurant.com
echo    Contraseña: admin123
echo.
echo ⚡ Iniciando sistema...
echo    Presiona Ctrl+C para detener todos los servicios
echo.

REM Verificar si tenemos concurrently instalado
npm list concurrently >nul 2>&1
if errorlevel 1 (
    echo 🔧 Instalando concurrently para ejecutar múltiples servicios...
    npm install concurrently
)

REM Iniciar el sistema
if exist "agents\backend\package.json" if exist "agents\frontend\package.json" if exist "agents\auth\package.json" (
    echo 🚀 Iniciando arquitectura multi-agente...
    npm run dev:agents
) else (
    echo 🚀 Iniciando aplicación monolítica...
    npm run dev
)

echo.
echo ===============================================
echo    Sistema detenido
echo ===============================================
pause
