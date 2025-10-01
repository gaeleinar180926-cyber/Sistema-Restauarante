#!/usr/bin/env node
/**
 * Sync Agents - Script Principal de Sincronización
 * Coordina la sincronización completa entre los 3 agentes del POS restaurant
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class AgentSynchronizer {
  constructor() {
    this.processes = {};
    this.isRunning = false;
    this.syncComplete = false;
  }

  async start() {
    console.clear();
    this.printHeader();
    
    try {
      await this.performFullSync();
      console.log(`\n${COLORS.green}🎉 Sincronización completa exitosa!${COLORS.reset}`);
      this.printPostSyncInstructions();
    } catch (error) {
      console.error(`\n${COLORS.red}❌ Error durante la sincronización:${COLORS.reset}`);
      console.error(`${COLORS.red}${error.message}${COLORS.reset}`);
      process.exit(1);
    }
  }

  printHeader() {
    console.log(`${COLORS.bright}${COLORS.cyan}╔══════════════════════════════════════════════════════╗`);
    console.log(`║                🍽️  RESTAURANT POS                    ║`);
    console.log(`║              Agent Synchronization                   ║`);
    console.log(`║                                                      ║`);
    console.log(`║  Sincronizando Backend, Frontend y Auth agents      ║`);
    console.log(`╚══════════════════════════════════════════════════════╝${COLORS.reset}\n`);
  }

  async performFullSync() {
    const steps = [
      { name: 'Verificar estructura del proyecto', fn: () => this.verifyProjectStructure() },
      { name: 'Sincronizar variables de entorno', fn: () => this.syncEnvironmentVariables() },
      { name: 'Verificar dependencias de agentes', fn: () => this.verifyAgentDependencies() },
      { name: 'Configurar logging centralizado', fn: () => this.setupCentralizedLogging() },
      { name: 'Validar contratos de API', fn: () => this.validateAPIContracts() },
      { name: 'Configurar Git hooks', fn: () => this.setupGitHooks() }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const progress = `[${i + 1}/${steps.length}]`;
      
      console.log(`${COLORS.yellow}${progress} ${step.name}...${COLORS.reset}`);
      
      try {
        await step.fn();
        console.log(`${COLORS.green}✅ ${step.name} completado${COLORS.reset}`);
      } catch (error) {
        console.log(`${COLORS.red}❌ ${step.name} falló: ${error.message}${COLORS.reset}`);
        throw error;
      }
    }

    this.syncComplete = true;
  }

  verifyProjectStructure() {
    const requiredDirs = [
      'agents/backend',
      'agents/frontend', 
      'agents/auth',
      'shared',
      'docs',
      'logs',
      'scripts',
      'tests/integration'
    ];

    const requiredFiles = [
      '.env.shared',
      'docs/api-contracts.md',
      'shared/logger.js',
      'scripts/sync-env.js',
      'scripts/log-viewer.js'
    ];

    // Verificar directorios
    for (const dir of requiredDirs) {
      if (!fs.existsSync(dir)) {
        throw new Error(`Directorio requerido no encontrado: ${dir}`);
      }
    }

    // Verificar archivos
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Archivo requerido no encontrado: ${file}`);
      }
    }

    // Verificar package.json de cada agente
    const agents = ['backend', 'frontend', 'auth'];
    for (const agent of agents) {
      const packageJsonPath = `agents/${agent}/package.json`;
      if (!fs.existsSync(packageJsonPath)) {
        throw new Error(`package.json no encontrado para agente: ${agent}`);
      }
    }
  }

  syncEnvironmentVariables() {
    // Ejecutar script de sincronización de variables de entorno
    try {
      execSync('node scripts/sync-env.js all', { stdio: 'pipe' });
    } catch (error) {
      throw new Error(`Error al sincronizar variables de entorno: ${error.message}`);
    }
  }

  verifyAgentDependencies() {
    const agents = ['backend', 'frontend', 'auth'];
    
    for (const agent of agents) {
      const agentDir = `agents/${agent}`;
      const nodeModulesPath = `${agentDir}/node_modules`;
      
      if (!fs.existsSync(nodeModulesPath)) {
        console.log(`${COLORS.yellow}  📦 Instalando dependencias para ${agent}...${COLORS.reset}`);
        try {
          execSync(`npm install`, { 
            cwd: agentDir, 
            stdio: 'pipe' 
          });
        } catch (error) {
          throw new Error(`Error instalando dependencias de ${agent}: ${error.message}`);
        }
      }
    }
  }

  setupCentralizedLogging() {
    // Verificar que winston esté instalado en shared
    const sharedPackageJson = 'shared/package.json';
    
    if (!fs.existsSync(sharedPackageJson)) {
      // Crear package.json para shared si no existe
      const sharedPackage = {
        name: 'restaurant-pos-shared',
        version: '1.0.0',
        description: 'Shared utilities for Restaurant POS agents',
        main: 'logger.js',
        dependencies: {
          winston: '^3.11.0'
        }
      };
      
      fs.writeFileSync(sharedPackageJson, JSON.stringify(sharedPackage, null, 2));
      
      try {
        execSync('npm install', { cwd: 'shared', stdio: 'pipe' });
      } catch (error) {
        throw new Error(`Error instalando dependencias de shared: ${error.message}`);
      }
    }
  }

  validateAPIContracts() {
    const contractsFile = 'docs/api-contracts.md';
    
    if (!fs.existsSync(contractsFile)) {
      throw new Error('Archivo de contratos de API no encontrado');
    }

    const contracts = fs.readFileSync(contractsFile, 'utf8');
    
    // Validar que contenga las secciones principales
    const requiredSections = [
      'Backend Agent (Puerto 3001)',
      'Auth Agent (Puerto 3002)', 
      'Frontend Agent (Puerto 3000)',
      'Performance Requirements',
      'Security Requirements'
    ];

    for (const section of requiredSections) {
      if (!contracts.includes(section)) {
        throw new Error(`Sección requerida no encontrada en contratos: ${section}`);
      }
    }
  }

  setupGitHooks() {
    const hooksDir = '.git/hooks';
    
    if (!fs.existsSync('.git')) {
      console.log(`${COLORS.yellow}  ⚠️  No es un repositorio Git, saltando configuración de hooks${COLORS.reset}`);
      return;
    }

    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    // Pre-commit hook para sincronizar antes de commit
    const preCommitHook = `#!/bin/sh
# Restaurant POS - Pre-commit hook
# Sincroniza variables de entorno antes de commit

echo "🔄 Sincronizando variables de entorno..."
node scripts/sync-env.js all

if [ $? -ne 0 ]; then
  echo "❌ Error en sincronización de variables de entorno"
  exit 1
fi

echo "✅ Variables de entorno sincronizadas"
`;

    const preCommitPath = `${hooksDir}/pre-commit`;
    fs.writeFileSync(preCommitPath, preCommitHook);
    
    // Hacer ejecutable en sistemas Unix
    if (process.platform !== 'win32') {
      execSync(`chmod +x ${preCommitPath}`);
    }
  }

  printPostSyncInstructions() {
    console.log(`\n${COLORS.bright}🚀 Sistema de sincronización configurado exitosamente!${COLORS.reset}\n`);
    
    console.log(`${COLORS.bright}📋 Comandos disponibles:${COLORS.reset}`);
    console.log(`  ${COLORS.green}npm run sync:env${COLORS.reset}              - Sincronizar variables de entorno`);
    console.log(`  ${COLORS.green}npm run dev:agents${COLORS.reset}            - Iniciar todos los agentes`);
    console.log(`  ${COLORS.green}npm run logs${COLORS.reset}                  - Ver logs en tiempo real`);
    console.log(`  ${COLORS.green}npm run test:integration${COLORS.reset}      - Ejecutar tests de integración`);
    console.log(`  ${COLORS.green}npm run test:full-system${COLORS.reset}     - Tests completos del sistema`);
    
    console.log(`\n${COLORS.bright}📁 Archivos clave:${COLORS.reset}`);
    console.log(`  ${COLORS.cyan}.env.shared${COLORS.reset}                   - Variables de entorno compartidas`);
    console.log(`  ${COLORS.cyan}docs/api-contracts.md${COLORS.reset}         - Contratos entre agentes`);
    console.log(`  ${COLORS.cyan}shared/logger.js${COLORS.reset}              - Sistema de logging centralizado`);
    console.log(`  ${COLORS.cyan}tests/integration/${COLORS.reset}            - Tests de integración`);
    
    console.log(`\n${COLORS.bright}🔄 Flujo de trabajo recomendado:${COLORS.reset}`);
    console.log(`  1. ${COLORS.yellow}npm run sync:env${COLORS.reset}          - Antes de trabajar`);
    console.log(`  2. ${COLORS.yellow}npm run dev:agents${COLORS.reset}        - Iniciar desarrollo`);
    console.log(`  3. ${COLORS.yellow}npm run logs${COLORS.reset}              - Monitorear en otra terminal`);
    console.log(`  4. ${COLORS.yellow}npm run test:integration${COLORS.reset}  - Antes de hacer commit`);

    console.log(`\n${COLORS.bright}🎯 Performance targets configurados:${COLORS.reset}`);
    console.log(`  • Table selection: < 100ms`);
    console.log(`  • Add product: < 150ms`);
    console.log(`  • Send order: < 200ms`);
    console.log(`  • Process payment: < 300ms`);
    console.log(`  • Table status change: < 50ms`);
    
    console.log(`\n${COLORS.bright}💡 Notas importantes:${COLORS.reset}`);
    console.log(`  • Las variables de entorno se sincronizan automáticamente`);
    console.log(`  • Los logs se almacenan centralizadamente en logs/`);
    console.log(`  • Los commits activan auto-sincronización vía Git hooks`);
    console.log(`  • Los tests validan la comunicación entre todos los agentes`);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const synchronizer = new AgentSynchronizer();
  
  // Manejar señales para cleanup
  process.on('SIGINT', () => {
    console.log(`\n${COLORS.yellow}🛑 Sincronización interrumpida por el usuario${COLORS.reset}`);
    process.exit(0);
  });
  
  synchronizer.start().catch((error) => {
    console.error(`\n${COLORS.red}💥 Error fatal durante la sincronización:${COLORS.reset}`);
    console.error(`${COLORS.red}${error.message}${COLORS.reset}`);
    process.exit(1);
  });
}

module.exports = AgentSynchronizer;