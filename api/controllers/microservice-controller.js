const redis = require("redis")
const client = redis.createClient('6379', '127.0.0.1')
const connectionFactory = require("../repository/connectionFactory");
const repository = require("../repository/microserviceRepository");

module.exports = function (app) {
  
  app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
  });

  app.post('/api/microservice', (req, res) => {
      var microservice = req.body;
      var connection = connectionFactory();
      var microserviceRepository = repository();

      new microserviceRepository(connection).salva(microservice, function (error,  resultado) {
        if (error) {
          console.log(error);
          res.status('400').send(error);
        } else {
          res.status(201).json(resultado);
        }
      });
  });

  app.put('/api/microservice', (req, res) => {
      var microservice = req.body;
      var connection = connectionFactory();
      var microserviceRepository = repository();

      console.log(microservice);

      new microserviceRepository(connection).atualiza(microservice, function (error,  resultado) {
        if (error) {
          console.log(error);
          res.status('400').send(error);
        } else {
          res.status(201).json(resultado);
        }
      });
  });

  app.get('/api/microservice', (req, res) => {
    var microservice = req.body;
    var connection = connectionFactory();
    var microserviceRepository = repository();

    new microserviceRepository(connection).lista(function (error,  resultado) {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json(resultado);
        }
      });
  });

  app.get('/api/microservice/count', (req, resp) => {

    console.log(req.query.host);

      client.get(`${req.query.host}:${req.query.port}:${req.query.path}:COUNT`, function(err, data) {
        console.log(`${req.query.host}:${req.query.port}:${req.query.path}:COUNT`);
        console.log(data);
        resp.send(data)
      });
  });

  app.get('/api/microservice/errorcount', (req, resp) => {
     
      client.get(`${req.query.host}:${req.query.port}:${req.query.path}:ERROR-COUNTER`, function(err, data) {
        console.log(`${req.query.host}${req.query.port}:${req.query.path}:ERROR-COUNTER`);
        console.log(data);
        resp.send(data)
      });
  });

  app.get('/api/microservice/memoryusage', (req, resp) => {
     
      client.get(`${req.query.host}:${req.query.port}:${req.query.path}:MEMORY-USAGE`, function(err, data) {
        console.log(`${req.query.host}:${req.query.port}:${req.query.path}:MEMORY-USAGE`);

        if(data) {
          console.log(JSON.parse(data));
          resp.send(JSON.parse(data))
        } else {
          console.log(err);
          resp.send(JSON.parse(err))
        }
      });
  });

  app.get('/api/microservice/:id', (req, res) => {
    var connection = connectionFactory();
    var microserviceRepository = repository();

    new microserviceRepository(connection).buscaPorId(req.params.id, function (error,  resultado) {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json(resultado[0]);
        }
      });
  });

  app.put('/api/microservice/:id/registraCount', (req, res) => {
    var connection = connectionFactory();
    var microserviceRepository = repository();

    console.info(req.params.id);

    new microserviceRepository(connection).registraCount(req.params.id, function (error,  resultado) {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json(resultado);
        }
      });
  });

  app.put('/api/microservice/:id/desregistraCount', (req, res) => {
    var connection = connectionFactory();
    var microserviceRepository = repository();

    console.log(req.params.id, "sdfa");

    new microserviceRepository(connection).desregistraCount(req.params.id, function (error,  resultado) {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json(resultado);
        }
      });
  });

  return app;
}