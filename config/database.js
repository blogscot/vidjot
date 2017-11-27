let URI

if (process.env.NODE_ENV === 'production') {
  URI = 'mongodb://blogscot:thisisnotmypassword@ds123136.mlab.com:23136/vidjot'
} else {
  URI = 'mongodb://localhost/vidjot'
}

module.exports = {
  URI,
}
