export default {
  APP_PORT: process.env.APP_PORT || 3001,
  DATABASE_HOST: process.env.DATABASE_HOST || "127.0.0.1",
  DATABASE_PORT: process.env.DATABASE_PORT || "27017",
  DATABASE_NAME: process.env.DATABASE_NAME || "est-assignment",
  JWT_TOKEN: process.env.JWT_TOKEN || "est-assignment"
}
