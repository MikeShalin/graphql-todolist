const CONNECTION_PARAMS = {
  retryWrites: true,
  w: 'majority',
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

module.exports = {
  USER: process.env.USER_DB,
  PASS: process.env.PASSWORD_DB,
  URI_DB: process.env.URI_DB,
  NAME_DB: process.env.NAME_DB,
  CONNECTION_PARAMS,
}