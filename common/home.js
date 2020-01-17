module.exports = (u) => {
  const http = require('http');

  /*
  const router = require('./router');

  router.register('/', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  });

  router.register('/data', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    require('./sheets.js')(
      require('../data/ahq-tournament-data.js')(u, res)
      , '19HSTRRyScAtnzyYcXCFz_9rzopum5jLi7dQ5YpAgl8k'
    );
  });

  router.register('/hi', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hi!\n');
  });
  */

  const server = http.createServer(function (req, res) {
    const url = req.url;
    if (url === '/') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('2!\n');
    } else if (url === '/hi') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hi!\n');
    } else if (url === '/data') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader("Access-Control-Allow-Origin", "*");
      require('./sheets.js')(
        require('../data/ahq-tournament-data.js')(u, res)
        , '19HSTRRyScAtnzyYcXCFz_9rzopum5jLi7dQ5YpAgl8k'
      );
    } else {
      res.statusCode = 404;
      res.end('404, sorry!\n');
    }
    /*
    handler = router.route(req);
    handler.process(req, res);
    */
  });

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}/`);
  });
}
