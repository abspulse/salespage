const data = require('./fixture');

module.exports = (api) => {
  api
    .route('/api/sample')
    .get((req, res) => {
      res.json(data);
    })
    .post((req, res) => {
      data[data.length] = req.body;
      res.json(data[data.length - 1]);
    });

  api
    .route('/api/sample/:id')
    .get((req, res) => {
      res.json(data[req.params.id - 1]);
    })
    .put((req, res) => {
      res.json(data[req.params.id - 1] = req.body);
    })
    .delete((req, res) => {
      res.json(data.splice(req.params.id - 1, req.params.id));
    });
};
