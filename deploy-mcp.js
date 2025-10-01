#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

class VPSDeployMCP {
  constructor() {
    this.tools = [
      {
        name: 'deploy_to_vps',
        description: 'Deploy application to VPS server via SSH',
        input_schema: {
          type: 'object',
          properties: {
            files: { type: 'array', items: { type: 'string' }, description: 'Files to deploy' },
            target_path: { type: 'string', description: 'Target path on server' },
            restart_services: { type: 'boolean', description: 'Restart services after deploy' }
          },
          required: ['files', 'target_path']
        }
      },
      {
        name: 'check_server_status',
        description: 'Check VPS server status and running services',
        input_schema: {
          type: 'object',
          properties: {
            service: { type: 'string', description: 'Specific service to check' }
          }
        }
      },
      {
        name: 'run_remote_command',
        description: 'Execute command on VPS server',
        input_schema: {
          type: 'object',
          properties: {
            command: { type: 'string', description: 'Command to execute' },
            directory: { type: 'string', description: 'Working directory' }
          },
          required: ['command']
        }
      }
    ];
  }

  async handleRequest(request) {
    const { method, params } = request;

    switch (method) {
      case 'tools/list':
        return { tools: this.tools };

      case 'tools/call':
        return await this.handleToolCall(params);

      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  async handleToolCall(params) {
    const { name, arguments: args } = params;

    switch (name) {
      case 'deploy_to_vps':
        return await this.deployToVPS(args);
      case 'check_server_status':
        return await this.checkServerStatus(args);
      case 'run_remote_command':
        return await this.runRemoteCommand(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  async deployToVPS(args) {
    const { files, target_path, restart_services = false } = args;
    const host = process.env.SERVER_HOST;
    const user = process.env.SERVER_USER;
    const sshKey = process.env.SSH_KEY_PATH;

    try {
      // Crear directorio temporal
      const tempDir = 'deploy_temp';
      await this.executeCommand(`if (Test-Path ${tempDir}) { Remove-Item -Recurse -Force ${tempDir} }; New-Item -ItemType Directory ${tempDir}`);
      
      // Copiar archivos al directorio temporal
      for (const file of files) {
        await this.executeCommand(`Copy-Item "${file}" "${tempDir}/" -Recurse`);
      }

      // Crear archivo comprimido
      const zipFile = 'deploy.zip';
      await this.executeCommand(`Compress-Archive -Path "${tempDir}/*" -DestinationPath "${zipFile}" -Force`);

      // Subir archivo al servidor usando pscp (PuTTY) o scp
      const password = process.env.SERVER_PASS;
      const scpCommand = `echo ${password} | pscp -batch -pw ${password} ${zipFile} ${user}@${host}:${target_path}/`;
      
      try {
        await this.executeCommand(scpCommand);
      } catch (error) {
        // Si pscp no funciona, usar scp con expect
        const sshCommand = `plink -batch -pw ${password} ${user}@${host}`;
        await this.executeCommand(`echo ${password} | ${sshCommand} "mkdir -p ${target_path}"`);
        // Usar método alternativo de copia
        throw new Error('Requiere configuración adicional de herramientas SSH');
      }

      // Extraer en el servidor
      const sshCommand = `plink -batch -pw ${password} ${user}@${host}`;
      await this.executeCommand(`echo ${password} | ${sshCommand} "cd ${target_path} && unzip -o ${zipFile} && rm ${zipFile}"`);

      // Reiniciar servicios si es necesario
      if (restart_services) {
        await this.executeCommand(`echo ${password} | ${sshCommand} "systemctl restart nginx && pm2 restart all"`);
      }

      // Limpiar archivos locales
      await this.executeCommand(`Remove-Item ${zipFile}, ${tempDir} -Recurse -Force`);

      return {
        content: [{
          type: 'text',
          text: `✅ Deploy exitoso a ${host}:${target_path}\n${files.length} archivos desplegados${restart_services ? '\n🔄 Servicios reiniciados' : ''}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `❌ Error en deploy: ${error.message}`
        }]
      };
    }
  }

  async checkServerStatus(args) {
    const { service } = args;
    const host = process.env.SERVER_HOST;
    const user = process.env.SERVER_USER;
    const sshKey = process.env.SSH_KEY_PATH;

    const sshCommand = sshKey
      ? `ssh -i "${sshKey}" ${user}@${host}`
      : `ssh ${user}@${host}`;

    try {
      const command = service 
        ? `${sshCommand} "systemctl status ${service}"`
        : `${sshCommand} "uptime && df -h && free -m"`;

      const result = await this.executeCommand(command);
      
      return {
        content: [{
          type: 'text',
          text: `📊 Estado del servidor ${host}:\n\n${result}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `❌ Error checking server: ${error.message}`
        }]
      };
    }
  }

  async runRemoteCommand(args) {
    const { command, directory = '~' } = args;
    const host = process.env.SERVER_HOST;
    const user = process.env.SERVER_USER;
    const sshKey = process.env.SSH_KEY_PATH;

    const sshCommand = sshKey
      ? `ssh -i "${sshKey}" ${user}@${host}`
      : `ssh ${user}@${host}`;

    try {
      const fullCommand = `${sshCommand} "cd ${directory} && ${command}"`;
      const result = await this.executeCommand(fullCommand);
      
      return {
        content: [{
          type: 'text',
          text: `💻 Comando ejecutado en ${host}:\n$ ${command}\n\n${result}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `❌ Error executing command: ${error.message}`
        }]
      };
    }
  }

  executeCommand(command) {
    return new Promise((resolve, reject) => {
      console.error(`Executing: ${command}`);
      const process = spawn('powershell', ['-Command', command], { shell: true });
      let output = '';
      let error = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        error += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(error || `Command failed with code ${code}`));
        }
      });
    });
  }
}

// Iniciar servidor MCP
const server = new VPSDeployMCP();

process.stdin.on('data', async (data) => {
  try {
    const request = JSON.parse(data.toString());
    const response = await server.handleRequest(request);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.log(JSON.stringify({
      error: { message: error.message }
    }));
  }
});