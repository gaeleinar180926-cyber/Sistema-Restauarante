/**
 * Jest Configuration for Integration Tests
 * Tests de integración para validar comunicación entre agentes
 */

module.exports = {
  // Environment
  testEnvironment: 'node',
  
  // Test files pattern
  testMatch: [
    '<rootDir>/tests/integration/**/*.test.js',
    '<rootDir>/tests/e2e/**/*.test.js'
  ],
  
  // Coverage settings
  collectCoverage: false, // Integration tests no necesitan coverage
  
  // Global setup and teardown
  globalSetup: '<rootDir>/tests/setup/global-setup.js',
  globalTeardown: '<rootDir>/tests/setup/global-teardown.js',
  
  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/integration-setup.js'
  ],
  
  // Module paths
  moduleNameMapping: {
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  
  // Test timeout for integration tests (longer than unit tests)
  testTimeout: 30000,
  
  // Verbose output for better debugging
  verbose: true,
  
  // Run tests in sequence (not parallel) to avoid conflicts
  maxWorkers: 1,
  
  // Reporters for better output
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results',
        outputName: 'integration-test-results.xml',
        suiteName: 'Restaurant POS Integration Tests'
      }
    ]
  ],
  
  // Transform settings
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/agents/*/node_modules/'
  ],
  
  // Module file extensions
  moduleFileExtensions: ['js', 'json'],
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true
};