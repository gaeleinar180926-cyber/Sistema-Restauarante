#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class SimpleVPSDeploy {
  constructor() {
    this.host = process.env.SERVER_HOST || '31.97.43.51';
    this.user = process.env.SERVER_USER || 'root';
    this.pass = process.env.SERVER_PASS || 'R@mmsten180926';
    
    // URLs de producción - Hostinger VPS
    this.productionUrls = {
      frontend: 'https://pos.chapibot.pro',
      backend: 'https://api.chapibot.pro',
      auth: 'https://auth.chapibot.pro',
      monitoring: 'https://monitor.chapibot.pro'
    };
    
    this.agents = ['backend', 'frontend', 'auth', 'monitoring'];
  }

  async deployFiles(files, targetPath = '/var/www/restaurant-pos') {
    try {
      console.log(`🚀 Iniciando deploy a ${this.host}:${targetPath}`);
      
      // Crear directorio en el servidor si no existe
      await this.runSSH(`mkdir -p ${targetPath}`);
      
      // Subir cada archivo
      for (const file of files) {
        console.log(`📤 Subiendo ${file}...`);
        await this.uploadFile(file, targetPath);
      }
      
      console.log('✅ Deploy completado exitosamente!');
      return true;
    } catch (error) {
      console.error('❌ Error en deploy:', error.message);
      return false;
    }
  }

  async uploadFile(localFile, remotePath) {
    return new Promise((resolve, reject) => {
      // Crear script WinSCP temporal
      const scriptContent = `
option batch abort
option confirm off
open scp://${this.user}:${this.pass}@${this.host}
put "${localFile}" "${remotePath}/"
exit
`;
      
      fs.writeFileSync('temp_upload.txt', scriptContent);
      
      const command = `winscp.com /script=temp_upload.txt`;
      
      exec(command, (error, stdout, stderr) => {
        // Limpiar archivo temporal
        if (fs.existsSync('temp_upload.txt')) {
          fs.unlinkSync('temp_upload.txt');
        }
        
        if (error) {
          // Si WinSCP no está disponible, usar método alternativo
          this.uploadViaPowerShell(localFile, remotePath)
            .then(resolve)
            .catch(reject);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  async uploadViaPowerShell(localFile, remotePath) {
    return new Promise((resolve, reject) => {
      // Usar PowerShell con SSH
      const command = `
$password = ConvertTo-SecureString "${this.pass}" -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential ("${this.user}", $password)
scp -o StrictHostKeyChecking=no "${localFile}" ${this.user}@${this.host}:${remotePath}/
`;
      
      exec(`powershell -Command "${command}"`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  async runSSH(command) {
    return new Promise((resolve, reject) => {
      const sshCommand = `plink -batch -pw ${this.pass} ${this.user}@${this.host} "${command}"`;
      
      exec(sshCommand, (error, stdout, stderr) => {
        if (error) {
          // Si plink no funciona, usar ssh directo
          const altCommand = `ssh -o StrictHostKeyChecking=no ${this.user}@${this.host} "${command}"`;
          exec(altCommand, (error2, stdout2, stderr2) => {
            if (error2) {
              reject(error2);
            } else {
              resolve(stdout2);
            }
          });
        } else {
          resolve(stdout);
        }
      });
    });
  }

  async checkServerStatus() {
    try {
      const result = await this.runSSH('uptime && df -h && free -m');
      console.log('📊 Estado del servidor:');
      console.log(result);
      return result;
    } catch (error) {
      console.error('❌ Error verificando servidor:', error.message);
      return null;
    }
  }

  async restartServices() {
    try {
      console.log('🔄 Reiniciando servicios...');
      await this.runSSH('systemctl restart nginx');
      await this.runSSH('pm2 restart all');
      console.log('✅ Servicios reiniciados');
      return true;
    } catch (error) {
      console.error('❌ Error reiniciando servicios:', error.message);
      return false;
    }
  }

  async deployProductionAgents() {
    try {
      console.log('🚀 Desplegando agentes a producción...');
      
      // 1. Sincronizar variables de entorno primero
      console.log('🔄 Sincronizando variables de entorno...');
      const { exec } = require('child_process');
      await new Promise((resolve, reject) => {
        exec('node scripts/sync-env.js all', (error, stdout, stderr) => {
          if (error) reject(error);
          else {
            console.log(stdout);
            resolve(stdout);
          }
        });
      });
      
      // 2. Construir todos los agentes
      console.log('🔨 Construyendo agentes...');
      for (const agent of this.agents) {
        if (fs.existsSync(`agents/${agent}`)) {
          console.log(`📦 Construyendo agente ${agent}...`);
          await new Promise((resolve, reject) => {
            exec(`cd agents/${agent} && npm run build`, (error, stdout, stderr) => {
              if (error) {
                console.log(`⚠️ Build opcional para ${agent}: ${error.message}`);
              }
              resolve();
            });
          });
        }
      }
      
      // 3. Crear directorios en el servidor
      await this.runSSH('mkdir -p /var/www/pos.chapibot.pro');
      await this.runSSH('mkdir -p /var/www/api.chapibot.pro');
      await this.runSSH('mkdir -p /var/www/auth.chapibot.pro');
      await this.runSSH('mkdir -p /var/www/monitor.chapibot.pro');
      
      // 4. Subir archivos de cada agente
      for (const agent of this.agents) {
        if (fs.existsSync(`agents/${agent}`)) {
          console.log(`📤 Subiendo agente ${agent}...`);
          await this.uploadAgent(agent);
        }
      }
      
      // 5. Instalar dependencias en el servidor
      console.log('📦 Instalando dependencias en el servidor...');
      await this.installProductionDependencies();
      
      // 6. Configurar PM2 y Nginx
      console.log('⚙️ Configurando servicios...');
      await this.configureProductionServices();
      
      // 7. Reiniciar servicios
      await this.restartServices();
      
      console.log('✅ Deploy a producción completado exitosamente!');
      console.log('🌐 URLs de producción:');
      for (const [service, url] of Object.entries(this.productionUrls)) {
        console.log(`   ${service}: ${url}`);
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error en deploy de producción:', error.message);
      return false;
    }
  }

  async uploadAgent(agentName) {
    const agentPath = `agents/${agentName}`;
    const remotePath = this.getRemotePathForAgent(agentName);
    
    // Crear tar.gz del agente
    await new Promise((resolve, reject) => {
      exec(`tar -czf ${agentName}.tar.gz -C ${agentPath} .`, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(stdout);
      });
    });
    
    // Subir archivo comprimido
    await this.uploadFile(`${agentName}.tar.gz`, '/tmp');
    
    // Extraer en el servidor
    await this.runSSH(`cd ${remotePath} && tar -xzf /tmp/${agentName}.tar.gz`);
    
    // Limpiar archivos temporales
    fs.unlinkSync(`${agentName}.tar.gz`);
    await this.runSSH(`rm -f /tmp/${agentName}.tar.gz`);
  }

  getRemotePathForAgent(agentName) {
    const paths = {
      'backend': '/var/www/api.chapibot.pro',
      'frontend': '/var/www/pos.chapibot.pro',
      'auth': '/var/www/auth.chapibot.pro',
      'monitoring': '/var/www/monitor.chapibot.pro'
    };
    return paths[agentName] || `/var/www/${agentName}.chapibot.pro`;
  }

  async installProductionDependencies() {
    const commands = [
      'cd /var/www/api.chapibot.pro && npm install --production',
      'cd /var/www/auth.chapibot.pro && npm install --production'
    ];
    
    for (const command of commands) {
      try {
        await this.runSSH(command);
      } catch (error) {
        console.log(`⚠️ Instalación opcional: ${error.message}`);
      }
    }
  }

  async configureProductionServices() {
    // Configurar PM2 ecosystem
    const pm2Config = {
      apps: [
        {
          name: 'api-chapibot',
          script: '/var/www/api.chapibot.pro/src/server.js',
          env: {
            NODE_ENV: 'production',
            PORT: 3001
          }
        },
        {
          name: 'auth-chapibot',
          script: '/var/www/auth.chapibot.pro/src/server.js',
          env: {
            NODE_ENV: 'production',
            PORT: 3002
          }
        }
      ]
    };
    
    // Guardar configuración PM2
    fs.writeFileSync('ecosystem.config.js', `module.exports = ${JSON.stringify(pm2Config, null, 2)};`);
    await this.uploadFile('ecosystem.config.js', '/var/www');
    fs.unlinkSync('ecosystem.config.js');
    
    // Iniciar aplicaciones con PM2
    await this.runSSH('cd /var/www && pm2 start ecosystem.config.js');
  }
}

// Si se ejecuta directamente
if (require.main === module) {
  const deploy = new SimpleVPSDeploy();
  
  const args = process.argv.slice(2);
  const action = args[0];
  
  switch (action) {
    case 'deploy':
      const files = args.slice(1);
      if (files.length === 0) {
        console.log('Uso: node simple-deploy.js deploy <archivo1> [archivo2] ...');
        process.exit(1);
      }
      deploy.deployFiles(files);
      break;
      
    case 'production':
      deploy.deployProductionAgents();
      break;
      
    case 'status':
      deploy.checkServerStatus();
      break;
      
    case 'restart':
      deploy.restartServices();
      break;
      
    case 'urls':
      console.log('🌐 URLs de producción configuradas:');
      for (const [service, url] of Object.entries(deploy.productionUrls)) {
        console.log(`   ${service.toUpperCase()}: ${url}`);
      }
      break;
      
    default:
      console.log(`
Uso: node simple-deploy.js <acción> [argumentos]

Acciones disponibles:
  deploy <archivos...>  - Sube archivos específicos al servidor
  production           - Deploy completo de todos los agentes a producción
  status              - Verifica estado del servidor  
  restart             - Reinicia nginx y PM2
  urls                - Muestra las URLs de producción

Ejemplos:
  node simple-deploy.js production      # Deploy completo
  node simple-deploy.js deploy dist/    # Solo archivos específicos
  node simple-deploy.js status
  node simple-deploy.js restart
  node simple-deploy.js urls

🌐 URLs de producción:
  Frontend: https://pos.chapibot.pro
  Backend: https://api.chapibot.pro
  Auth: https://auth.chapibot.pro
  Monitoring: https://monitor.chapibot.pro
`);
  }
}

module.exports = SimpleVPSDeploy;