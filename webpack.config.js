module.exports = {
  entry: './run.js',
   resolve: {
    fallback: {
      "crypto": false,
      "fs": false,
        "path": false,
        "os": false,
        "http": false,
        "https": false,
        "stream": false,
        "zlib": false,
        "buffer": false,
        "assert": false,
        "util": false,
        "url": false,
        "querystring": false,
        "tty": false,
        "punycode": false,
        "process": false,
        "module": false,
        "net": false,
        "dns": false,
        "tls": false,
    }
  }
};