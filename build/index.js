'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _partyCtr = require('./src/controllers/partyCtr');

var _partyCtr2 = _interopRequireDefault(_partyCtr);

var _officeCtr = require('./src/controllers/officeCtr');

var _officeCtr2 = _interopRequireDefault(_officeCtr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));

app.use(_express2.default.json());

app.get('/api/v1', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to POLITICO'
  });
});
app.post('/api/v1/parties', _partyCtr2.default.createParty);
app.get('/api/v1/parties/:partyId', _partyCtr2.default.getPartyById);
app.get('/api/v1/parties', _partyCtr2.default.getParties);
app.put('/api/v1/party/:id/name', _partyCtr2.default.update);
app.delete('/api/v1/party/:id', _partyCtr2.default.delete);
app.post('/api/v1/office', _officeCtr2.default.createOffice);
app.get('/api/v1/office', _officeCtr2.default.getOffice);
app.get('/api/v1/office/:officeId', _officeCtr2.default.getOfficeById);

app.listen(3000);
console.log('app running on port ', 3000);

exports.default = app;