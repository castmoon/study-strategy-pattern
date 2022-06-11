import ContextStrategy from './base/contextStrategy.js';
import MongoDBStrategy from './strategies/mongoDBStrategy.js';
import PostgresStrategy from './strategies/postgresStrategy.js';

const postgresConnectionString =
	'postgres://castmoon:castmoon@localhost:5432/strategy';

const postgresContext = new ContextStrategy(
	new PostgresStrategy(postgresConnectionString)
);
await postgresContext.connect();

const mongoDBConnectionString =
	'mongodb://castmoon:admin@localhost:27017/strategy';

const mongoDBContext = new ContextStrategy(
	new MongoDBStrategy(mongoDBConnectionString)
);
await mongoDBContext.connect();

const data = [
	{
		name: 'guilhermealves',
		type: 'transaction',
	},
	{
		name: 'mariadasilva',
		type: 'activityLog',
	},
];

const contextTypes = {
	transaction: postgresContext,
	activityLog: mongoDBContext,
};

for (const { type, name } of data) {
	const context = contextTypes[type];
	await context.create({ name: name + Date.now() });
	console.log(type, context.dbStrategy.constructor.name);
	console.log(await context.read());
}
