module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  },
  preset: 'ts-jest',
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    "**/*.(test|spec).(ts|tsx)"
  ],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "enzyme.js"
  ],
  setupFilesAfterEnv: ["./enzyme.js"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
    "^@redux/(.*)$": "<rootDir>/redux/$1",
    "^@containers/(.*)$": "<rootDir>/containers/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"]
}
