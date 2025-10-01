@echo off
echo 🍽️ Iniciando Sistema Restaurante POS - Modo Desarrollo
echo =====================================================

REM Cambiar al directorio principal
cd /d "C:\Users\jovan\proyectos\Sistema-Restaurante"

echo 🔄 Sincronizando variables de entorno...
call npm run sync:env

echo.
echo 🚀 Iniciando todos los agentes de forma coordinada...
echo.
echo 📱 Backend Agent (Puerto 3001) - https://api.chapibot.pro
echo 🎨 Frontend Agent (Puerto 3000) - https://pos.chapibot.pro  
echo 🔐 Auth Agent (Puerto 3002) - https://auth.chapibot.pro
echo 📊 Monitoring Agent - https://monitor.chapibot.pro
echo.

REM Abrir terminales separadas para cada agente
start "Backend Agent" cmd /k "cd /d C:\Users\jovan\proyectos\Sistema-Restaurante\agents\backend && echo 📱 Backend Agent Iniciado && npm run dev"

timeout /t 3 /nobreak >nul

start "Frontend Agent" cmd /k "cd /d C:\Users\jovan\proyectos\Sistema-Restaurante\agents\frontend && echo 🎨 Frontend Agent Iniciado && npm run dev"

timeout /t 3 /nobreak >nul

start "Auth Agent" cmd /k "cd /d C:\Users\jovan\proyectos\Sistema-Restaurante\agents\auth && echo 🔐 Auth Agent Iniciado && npm run dev"

timeout /t 3 /nobreak >nul

start "Monitoring Agent" cmd /k "cd /d C:\Users\jovan\proyectos\Sistema-Restaurante\agents\monitoring && echo 📊 Monitoring Agent Iniciado && npm run dev"

echo ✅ Todos los agentes iniciados correctamente!
echo.
echo 🌐 URLs disponibles:
echo   Frontend: https://pos.chapibot.pro
echo   Backend:  https://api.chapibot.pro
echo   Auth:     https://auth.chapibot.pro
echo   Monitor:  https://monitor.chapibot.pro
echo.
echo 💡 Para ver logs en tiempo real: npm run logs
echo 💡 Para parar todos los servicios: Ctrl+C en cada terminal
echo.
pause