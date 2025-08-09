module.exports = {
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	setupFiles: ['dotenv/config', '<rootDir>/jest.env.js'],
	globals: {
		NODE_ENV: 'test',
	},
}
