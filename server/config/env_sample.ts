module.exports = {
    env: 'development',
    database: "ts-api",
    dialect: 'postgres',
    username: 'postgres',
    password: 'pgroot',
    host: "localhost",
    port: 3000,
    pgPort: 5432,
    dbUrl: 'postgres://postgres:pgroot@localhost:5432/ts-api',
    secret: 'S3cr3t'
}