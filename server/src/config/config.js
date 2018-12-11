module.exports = {
  port: process.env.PORT || 8081,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    adminSecret: process.env.ADMIN_SECRET || 'admincode'
  }
}
