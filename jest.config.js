module.exports = {
  preset: 'jest-preset-angular',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@environment/(.*)': '<rootDir>/src/environment/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
  },
  testEnvironment: "@happy-dom/jest-environment", // primeng CSS parse error fix
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
}
