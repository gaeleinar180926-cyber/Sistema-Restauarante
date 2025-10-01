#!/usr/bin/env node

const { exec } = require('child_process');

class VPSSetup {
  constructor() {
    this.host = '31.97.43.51';
    this.user = 'root';
    this.pass = 'R@mmsten180926';
  }

  async runSSH(command, description = '') {
    return new Promise((resolve, reject) => {
      if (description) console.log(`🔧 ${description}`);
      
      const sshCommand = `ssh -o StrictHostKeyChecking=no ${this.user}@${this.host} "${command}"`;
      
      exec(sshCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Error: ${error.message}`);
          reject(error);
        } else {
          if (stdout) console.log(stdout);
          resolve(stdout);
        }
      });
    });
  }

  async setupComplete() {
    console.log('🚀 Iniciando configuración completa del VPS para Sistema POS\n');

    try {
      // 1. Actualizar sistema
      await this.runSSH('apt update && apt upgrade -y', 'Actualizando sistema Ubuntu...');

      // 2. Instalar Node.js 20.x (LTS)
      await this.runSSH(`
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&
        apt install -y nodejs
      `, 'Instalando Node.js 20.x LTS...');

      // 3. Instalar herramientas esenciales
      await this.runSSH(`
        apt install -y nginx postgresql postgresql-contrib redis-server &&
        npm install -g pm2 yarn
      `, 'Instalando nginx, PostgreSQL, Redis y PM2...');

      // 4. Configurar PostgreSQL
      await this.runSSH(`
        systemctl start postgresql &&
        systemctl enable postgresql &&
        sudo -u postgres createdb restaurant_pos &&
        sudo -u postgres psql -c "CREATE USER pos_user WITH PASSWORD 'pos_password123';" &&
        sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE restaurant_pos TO pos_user;"
      `, 'Configurando base de datos PostgreSQL...');

      // 5. Configurar Redis
      await this.runSSH(`
        systemctl start redis-server &&
        systemctl enable redis-server
      `, 'Configurando Redis para cache...');

      // 6. Configurar nginx básico
      await this.runSSH(`
        systemctl start nginx &&
        systemctl enable nginx &&
        mkdir -p /var/www/restaurant-pos &&
        chown -R $USER:$USER /var/www/restaurant-pos
      `, 'Configurando nginx...');

      // 7. Configurar firewall básico
      await this.runSSH(`
        ufw allow OpenSSH &&
        ufw allow 'Nginx Full' &&
        ufw allow 3001 &&
        ufw allow 3000 &&
        ufw allow 3002 &&
        echo "y" | ufw enable
      `, 'Configurando firewall...');

      // 8. Crear estructura de directorios
      await this.runSSH(`
        mkdir -p /var/www/restaurant-pos/{backend,frontend,auth,assets,logs,config} &&
        mkdir -p /var/log/restaurant-pos
      `, 'Creando estructura de directorios...');

      // 9. Configurar PM2 para auto-inicio
      await this.runSSH(`
        pm2 startup &&
        pm2 save
      `, 'Configurando PM2 para auto-inicio...');

      console.log('\n✅ Configuración del VPS completada exitosamente!');
      console.log('\n📋 Resumen de servicios instalados:');
      console.log('   - Node.js 20.x LTS');
      console.log('   - PostgreSQL con DB: restaurant_pos');
      console.log('   - Redis para cache');
      console.log('   - Nginx como reverse proxy');
      console.log('   - PM2 para gestión de procesos');
      console.log('   - Firewall configurado (puertos 22, 80, 443, 3000-3002)');
      
      // Verificar instalación
      await this.verifyInstallation();

    } catch (error) {
      console.error('❌ Error durante la configuración:', error.message);
      process.exit(1);
    }
  }

  async verifyInstallation() {
    console.log('\n🔍 Verificando instalación...');

    try {
      await this.runSSH('node --version && npm --version', 'Versiones de Node.js y npm:');
      await this.runSSH('nginx -v', 'Versión de nginx:');
      await this.runSSH('sudo -u postgres psql -c "SELECT version();" restaurant_pos', 'Versión de PostgreSQL:');
      await this.runSSH('redis-cli --version', 'Versión de Redis:');
      await this.runSSH('pm2 --version', 'Versión de PM2:');
      
      console.log('\n✅ Todas las herramientas están instaladas correctamente!');
    } catch (error) {
      console.warn('⚠️ Algunas verificaciones fallaron, pero la instalación puede estar correcta');
    }
  }

  async setupNginxConfig() {
    console.log('🔧 Configurando nginx para el sistema POS...');

    const nginxConfig = `
server {
    listen 80;
    server_name _;
    
    # Frontend (React)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Auth Service
    location /auth/ {
        proxy_pass http://localhost:3002/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}`;

    // Escribir configuración de nginx
    await this.runSSH(`
      echo '${nginxConfig}' > /etc/nginx/sites-available/restaurant-pos &&
      ln -sf /etc/nginx/sites-available/restaurant-pos /etc/nginx/sites-enabled/ &&
      rm -f /etc/nginx/sites-enabled/default &&
      nginx -t &&
      systemctl reload nginx
    `, 'Aplicando configuración de nginx...');

    console.log('✅ Nginx configurado para el sistema POS');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const setup = new VPSSetup();
  
  const args = process.argv.slice(2);
  const action = args[0] || 'full';

  switch (action) {
    case 'full':
      setup.setupComplete();
      break;
    case 'nginx':
      setup.setupNginxConfig();
      break;
    case 'verify':
      setup.verifyInstallation();
      break;
    default:
      console.log(`
Uso: node setup-vps.js [acción]

Acciones:
  full     - Configuración completa del VPS (por defecto)
  nginx    - Solo configurar nginx
  verify   - Verificar instalación

Ejemplo:
  node setup-vps.js full
`);
  }
}

module.exports = VPSSetup;