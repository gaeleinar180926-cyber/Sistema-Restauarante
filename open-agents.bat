@echo off
echo 🍽️ Abriendo Sistema Restaurante POS - Todos los Agentes
echo ========================================================

REM Abrir cada agente en una ventana separada de VS Code
echo 📱 Abriendo Backend Agent...
start "" code "C:\Users\jovan\proyectos\Sistema-Restaurante\agents\backend"

timeout /t 2 /nobreak >nul

echo 🎨 Abriendo Frontend Agent...
start "" code "C:\Users\jovan\proyectos\Sistema-Restaurante\agents\frontend"

timeout /t 2 /nobreak >nul

echo 🔐 Abriendo Auth Agent...
start "" code "C:\Users\jovan\proyectos\Sistema-Restaurante\agents\auth"

timeout /t 2 /nobreak >nul

echo 📱 Abriendo Android POS Agent...
start "" code "C:\Users\jovan\proyectos\Sistema-Restaurante\agents\android-pos"

timeout /t 2 /nobreak >nul

echo 📊 Abriendo Monitoring Agent...
start "" code "C:\Users\jovan\proyectos\Sistema-Restaurante\agents\monitoring"

timeout /t 2 /nobreak >nul

echo 🎯 Abriendo Coordinador Central...
start "" code "C:\Users\jovan\proyectos\Sistema-Restaurante"

echo ✅ Todos los agentes abiertos correctamente!
echo.
echo 💡 Próximos pasos:
echo 1. Ejecuta 'npm run sync:env' en el coordinador central
echo 2. Ejecuta 'npm run dev:agents' para iniciar todos los servicios
echo 3. O inicia cada agente individualmente con 'npm run dev'
echo.
pause