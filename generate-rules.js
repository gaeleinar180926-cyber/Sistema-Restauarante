#!/usr/bin/env node
/**
 * Generador de Reglas Automático
 * Crea reglas personalizadas para cualquier proyecto multi-agente
 */

const fs = require('fs');
const path = require('path');

class RulesGenerator {
  constructor() {
    this.templates = {
      backend: this.getBackendTemplate(),
      frontend: this.getFrontendTemplate(),
      auth: this.getAuthTemplate(),
      monitoring: this.getMonitoringTemplate(),
      cors: this.getCORSTemplate(),
      deployment: this.getDeploymentTemplate()
    };
  }

  generateRules(config) {
    const rules = [];
    
    for (const [agentType, template] of Object.entries(this.templates)) {
      if (config.agents.includes(agentType) || agentType === 'cors' || agentType === 'deployment') {
        const rule = this.processTemplate(template, config);
        rules.push(rule);
      }
    }
    
    return rules.join('\n\n---\n\n');
  }

  processTemplate(template, config) {
    let processed = template;
    
    // Reemplazar variables del template
    processed = processed.replace(/\${PROJECT_NAME}/g, config.projectName);
    processed = processed.replace(/\${DOMAIN_BASE}/g, config.domainBase);
    processed = processed.replace(/\${SERVER_IP}/g, config.serverIP);
    processed = processed.replace(/\${PROJECT_TYPE}/g, config.projectType);
    
    // Reemplazar URLs específicas
    if (config.urls) {
      for (const [service, url] of Object.entries(config.urls)) {
        processed = processed.replace(new RegExp(`\\$\\{${service.toUpperCase()}_URL\\}`, 'g'), url);
      }
    }
    
    return processed;
  }

  getBackendTemplate() {
    return `## 📱 **BACKEND AGENT CORE**
\`\`\`
backend_agent_core:
Agente Backend maneja toda la lógica de negocio del \${PROJECT_TYPE}:
- Puerto 3001 exclusivo para APIs REST
- URL Producción: \${BACKEND_URL}
- URL Desarrollo: http://localhost:3001
- WebSocket en mismo puerto para tiempo real: \${BACKEND_URL}
- PostgreSQL como DB principal, SQLite para desarrollo
- Sequelize ORM con migraciones versionadas
- Validación estricta con express-validator
- Rate limiting: 100 requests/minuto por IP
- CORS configurado para: \${FRONTEND_URL},\${MONITORING_URL}
- Logs con Winston para todas las transacciones críticas
- Health check endpoint: \${BACKEND_URL}/health
\`\`\``;
  }

  getFrontendTemplate() {
    return `## 🎨 **FRONTEND STANDARDS**
\`\`\`
frontend_standards:
Frontend optimizado para operaciones de \${PROJECT_TYPE}:
- Puerto 3000, URL Producción: \${FRONTEND_URL}
- URL Desarrollo: http://localhost:3000
- React + Vite + Tailwind CSS
- Interfaz responsive optimizada
- WebSocket client: \${BACKEND_URL}
- APIs Backend: \${BACKEND_URL}
- APIs Auth: \${AUTH_URL}
- Cache con React Query para datos frecuentes
- Modo offline con localStorage/IndexedDB
\`\`\``;
  }

  getAuthTemplate() {
    return `## 🔐 **AUTH SECURITY STANDARDS**
\`\`\`
auth_security_standards:
Agente Auth maneja seguridad crítica del \${PROJECT_TYPE}:
- Puerto 3002, URL Producción: \${AUTH_URL}
- URL Desarrollo: http://localhost:3002
- JWT con refresh tokens, expiración 15 minutos
- bcrypt con 12 salt rounds mínimo
- Rate limiting específico: 10 login attempts/minuto
- Logs de auditoría para cambios de permisos
- Sesiones concurrentes limitadas por rol
- CORS configurado para: \${FRONTEND_URL},\${BACKEND_URL}
- Health check endpoint: \${AUTH_URL}/health
\`\`\``;
  }

  getMonitoringTemplate() {
    return `## 📊 **MONITORING STANDARDS**
\`\`\`
monitoring_standards:
Agente Monitoring supervisa operaciones críticas del \${PROJECT_TYPE}:
- URL Producción: \${MONITORING_URL}
- Performance: response times de APIs por endpoint
- Errors: tracking con Sentry para bugs en producción
- Health checks endpoints:
  * \${BACKEND_URL}/health
  * \${AUTH_URL}/health
  * \${FRONTEND_URL} (status check)
- Dashboards: Grafana para visualización en tiempo real
- WebSocket: \${BACKEND_URL} para updates tiempo real
\`\`\``;
  }

  getCORSTemplate() {
    return `## 🌐 **CORS Y SSL CONFIGURATION**
\`\`\`
cors_ssl_configuration:
Configuración de seguridad y comunicación entre agentes:
- SSL/TLS obligatorio en producción (\${DOMAIN_BASE})
- CORS Origins permitidos:
  * \${FRONTEND_URL}
  * \${MONITORING_URL}
  * http://localhost:3000 (desarrollo)
  * http://127.0.0.1:3000 (desarrollo)
- WebSocket Seguro: \${BACKEND_URL}
- Certificados automáticos: Let's Encrypt
- Headers de seguridad: HSTS, CSP, X-Frame-Options
- Rate limiting por dominio configurado
\`\`\``;
  }

  getDeploymentTemplate() {
    return `## 🚀 **DEPLOYMENT COORDINATION**
\`\`\`
deployment_coordination:
Sistema de despliegue coordinado para producción:
- VPS: \${SERVER_IP}
- Dominio base: \${DOMAIN_BASE}
- Estructura servidor:
  * /var/www/\${DOMAIN_BASE}/ (Frontend)
  * /var/www/api.\${DOMAIN_BASE}/ (Backend)
  * /var/www/auth.\${DOMAIN_BASE}/ (Auth)
  * /var/www/monitor.\${DOMAIN_BASE}/ (Monitoring)
- PM2 para gestión de procesos Node.js
- Nginx reverse proxy configurado
- Deploy comando: npm run deploy:production
- Health checks post-deploy automáticos
- Rollback coordinado si fallan health checks
\`\`\``;
  }

  saveRules(rules, filename = 'WARP-RULES.md') {
    const content = `# 🔧 REGLAS GENERADAS - ${new Date().toLocaleDateString()}

${rules}

---

## 📋 **CONFIGURACIÓN GENERADA AUTOMÁTICAMENTE**
Estas reglas fueron generadas usando el generador automático de reglas.
Para modificar, edita el archivo de configuración y regenera.
`;

    fs.writeFileSync(filename, content);
    console.log(`✅ Reglas guardadas en: ${filename}`);
  }
}

// Configuraciones predefinidas para diferentes tipos de proyectos
const projectConfigs = {
  restaurant: {
    projectName: "Sistema-Restaurante",
    projectType: "restaurante",
    domainBase: "chapibot.pro",
    serverIP: "31.97.43.51",
    agents: ["backend", "frontend", "auth", "monitoring"],
    urls: {
      backend: "https://api.chapibot.pro",
      frontend: "https://pos.chapibot.pro",
      auth: "https://auth.chapibot.pro", 
      monitoring: "https://monitor.chapibot.pro"
    }
  },
  
  ecommerce: {
    projectName: "TiendaOnline",
    projectType: "e-commerce",
    domainBase: "mitienda.com",
    serverIP: "TU.IP.SERVIDOR",
    agents: ["backend", "frontend", "auth"],
    urls: {
      backend: "https://api.mitienda.com",
      frontend: "https://shop.mitienda.com",
      auth: "https://auth.mitienda.com",
      monitoring: "https://admin.mitienda.com"
    }
  },

  blog: {
    projectName: "BlogPersonal",
    projectType: "blog/CMS",
    domainBase: "miblog.com", 
    serverIP: "TU.IP.SERVIDOR",
    agents: ["backend", "frontend"],
    urls: {
      backend: "https://api.miblog.com",
      frontend: "https://www.miblog.com",
      auth: "https://admin.miblog.com",
      monitoring: "https://stats.miblog.com"
    }
  }
};

// Si se ejecuta directamente
if (require.main === module) {
  const generator = new RulesGenerator();
  const args = process.argv.slice(2);
  const projectType = args[0] || 'restaurant';
  
  if (!projectConfigs[projectType]) {
    console.log(`❌ Tipo de proyecto no reconocido: ${projectType}`);
    console.log('Tipos disponibles:', Object.keys(projectConfigs).join(', '));
    process.exit(1);
  }

  console.log(`🔧 Generando reglas para proyecto: ${projectType}`);
  
  const config = projectConfigs[projectType];
  const rules = generator.generateRules(config);
  
  const filename = `WARP-RULES-${config.projectName.toUpperCase()}.md`;
  generator.saveRules(rules, filename);
  
  console.log(`\n📋 Configuración generada:`);
  console.log(`   Proyecto: ${config.projectName}`);
  console.log(`   Tipo: ${config.projectType}`);
  console.log(`   Dominio: ${config.domainBase}`);
  console.log(`   Agentes: ${config.agents.join(', ')}`);
  console.log(`\n🎯 Para usar:`);
  console.log(`   1. Revisa el archivo: ${filename}`);
  console.log(`   2. Copia las reglas que necesites a Warp`);
  console.log(`   3. Personaliza según tus necesidades`);
}

module.exports = RulesGenerator;