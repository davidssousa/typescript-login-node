module.exports = {
    env: 'development',
    database: "ts-api",
    dialect: 'postgres', // postgres | mssql | 
    username: 'postgres',
    password: 'pgroot',
    host: "localhost",
    port: 5432,
    dbUrl: 'postgres://postgres:pgroot@localhost:5432/ts-api',
    instanceName: 'MSSQLServer',
    secret: 'S3cr3t'
}