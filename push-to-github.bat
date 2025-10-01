@echo off
echo =========================================
echo   SUBIENDO SISTEMA RESTAURANTE A GITHUB
echo =========================================
echo.

echo Verificando estado de Git...
git status

echo.
echo Subiendo a GitHub...
git push -u origin master

echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ ¡ÉXITO! Repositorio subido correctamente
    echo.
    echo 🔗 Tu repositorio está en: https://github.com/jonathantech731/Sistema-Restaurante
    echo.
    echo 📋 Resumen del proyecto subido:
    echo   - 75+ archivos
    echo   - Agente de Autenticación completo
    echo   - Agente Backend con API REST
    echo   - Agente Frontend con React
    echo   - Documentación completa en español
    echo   - Scripts de deployment
    echo   - Configuración de seguridad
) else (
    echo ❌ Error al subir. Verifica que hayas creado el repositorio en GitHub.com primero
    echo.
    echo Pasos a seguir:
    echo 1. Ve a https://github.com/new
    echo 2. Crea un repositorio llamado "Sistema-Restaurante"
    echo 3. Ejecuta este script de nuevo
)

echo.
pause