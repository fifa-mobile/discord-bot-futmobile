module.exports = (u) => {
  const http = require('http');
  var router = require('./router');

  router.register('/', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  });

  router.register('/data', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    require('./sheets.js')(
      require('../data/ahq-tournament-data.js')(u, res)
      , '19HSTRRyScAtnzyYcXCFz_9rzopum5jLi7dQ5YpAgl8k'
    );
    /*
    res.write(json);
    res.end();
    */
  });

  router.register('/hi', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hi!\n');
  });

  var server = http.createServer(function (req, res) {
    handler = router.route(req);
    handler.process(req, res);
  });

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}/`);
  });
}
