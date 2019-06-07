'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _officeCtr = require('./controllers/officeCtr');

var _officeCtr2 = _interopRequireDefault(_officeCtr);

var _userCtr = require('./controllers/userCtr');

var _userCtr2 = _interopRequireDefault(_userCtr);

var _partyCtr = require('./controllers/partyCtr');

var _partyCtr2 = _interopRequireDefault(_partyCtr);

var _candidatesCtr = require('./controllers/candidatesCtr');

var _candidatesCtr2 = _interopRequireDefault(_candidatesCtr);

var _interestCtr = require('./controllers/interestCtr');

var _interestCtr2 = _interopRequireDefault(_interestCtr);

var _votesCtr = require('./controllers/votesCtr');

var _votesCtr2 = _interopRequireDefault(_votesCtr);

var _tokenAuth = require('./helper/tokenAuth');

var _tokenAuth2 = _interopRequireDefault(_tokenAuth);

var _verifyAdmin = require('./helper/verifyAdmin');

var _verifyAdmin2 = _interopRequireDefault(_verifyAdmin);

var _userAuth = require('./helper/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // import { json, urlencoded } from 'body-parser';


app.use((0, _cors2.default)());

app.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(_express2.default.static(_path2.default.join(__dirname)));
app.use('/styles', _express2.default.static(__dirname + '../../UI/styles'));
app.use('/images', _express2.default.static(__dirname + '../../UI/images'));
app.use('/scripts', _express2.default.static(__dirname + '../../UI/scripts'));
app.use('/views', _express2.default.static(__dirname + '../../UI/views'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

app.use(_express2.default.json());
var port = process.env.PORT || 5000;

// homepage
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname + '../../UI/views/index.html'));
});

app.get('/api/v1', function (req, res) {
  return res.status(200).send({
    status: 200,
    message: 'Welcome to POLITICO'
  });
});
// admin: create, edit
app.post('/api/v1/parties', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _partyCtr2.default.create);

app.patch('/api/v1/parties/:id/name', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _partyCtr2.default.update);

app.delete('/api/v1/parties/:id', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _partyCtr2.default.delete);

app.delete('/api/v1/offices/:id', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _officeCtr2.default.delete);

app.post('/api/v1/offices', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _officeCtr2.default.create);

app.post('/api/v1/office/:userid/register', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _userAuth2.default.validateUserId, _candidatesCtr2.default.register);

app.post('/api/v1/office/interest', _tokenAuth2.default.verifyToken, _interestCtr2.default.userInterest);

app.get('/api/v1/office/interest', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _interestCtr2.default.getAllInterestedCandidates);

app.get('/api/v1/users', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _userAuth2.default.validateUserId, _userCtr2.default.getAllUsers);

app.get('/api/v1/:id/users', _tokenAuth2.default.verifyToken, _verifyAdmin2.default.verifyIsAdmin, _userAuth2.default.validateUserId, _userCtr2.default.getAUser);

// user
app.get('/api/v1/parties', _partyCtr2.default.getParties);

app.get('/api/v1/parties/:id', _partyCtr2.default.getAParty);

app.get('/api/v1/offices', _tokenAuth2.default.verifyToken, _officeCtr2.default.getAllOffices);

app.get('/api/v1/offices/:id', _tokenAuth2.default.verifyToken, _officeCtr2.default.getOneOffice);

app.post('/api/v1/votes', _tokenAuth2.default.verifyToken, _votesCtr2.default.votes);

app.get('/api/v1/office/:officeid/result', _tokenAuth2.default.verifyToken, _officeCtr2.default.officeResult);

app.get('/api/v1/candidates', _tokenAuth2.default.verifyToken, _candidatesCtr2.default.getAllCandidates);

// user login
app.post('/api/v1/auth/signup', _userCtr2.default.createUser);

app.post('/api/v1/auth/login', _userCtr2.default.login);

// user/admin logout
app.post('/api/v1/auth/signout', _tokenAuth2.default.verifyToken, _userCtr2.default.signout);

app.get('/', function (req, res) {
  return res.status(200).send({
    status: 200,
    message: 'Welcome to POLITICO'
  });
});

// Handle 404: send an 404 error page
// app.use(function(req, res) {
//   res.status(404).sendFile(path.join(__dirname + '../../UI/views/404.html'));
// });

// Handle 500: send a 500 error
// app.use(function(error, req, res, next) {
//   res.status(500).sendFile(path.join(__dirname + '../../UI/views/500.html'));
// });

app.all('*', function (req, res) {
  res.status(404).send({
    status: 404,
    error: 'Resource not found on the server'
  });
});

app.listen(port, function () {
  console.log('app is running on port ' + port);
});

exports.default = app;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZXhwcmVzcyIsInN0YXRpYyIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwiYm9keVBhcnNlciIsImpzb24iLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJwb3J0IiwicHJvY2VzcyIsImVudiIsIlBPUlQiLCJnZXQiLCJzZW5kRmlsZSIsInN0YXR1cyIsInNlbmQiLCJtZXNzYWdlIiwicG9zdCIsInRva2VuIiwidmVyaWZ5VG9rZW4iLCJ2ZXJpZnlBZG1pbiIsInZlcmlmeUlzQWRtaW4iLCJwYXJ0eUN0ciIsImNyZWF0ZSIsInBhdGNoIiwidXBkYXRlIiwiZGVsZXRlIiwiT2ZmaWNlIiwidmVyaWZ5SWQiLCJ2YWxpZGF0ZVVzZXJJZCIsImNhbmRpZGF0ZUN0ciIsInJlZ2lzdGVyIiwiaW50ZXJlc3RDdHIiLCJ1c2VySW50ZXJlc3QiLCJnZXRBbGxJbnRlcmVzdGVkQ2FuZGlkYXRlcyIsInVzZXJDdHIiLCJnZXRBbGxVc2VycyIsImdldEFVc2VyIiwiZ2V0UGFydGllcyIsImdldEFQYXJ0eSIsImdldEFsbE9mZmljZXMiLCJnZXRPbmVPZmZpY2UiLCJ2b3Rlc0N0ciIsInZvdGVzIiwib2ZmaWNlUmVzdWx0IiwiZ2V0QWxsQ2FuZGlkYXRlcyIsImNyZWF0ZVVzZXIiLCJsb2dpbiIsInNpZ25vdXQiLCJhbGwiLCJlcnJvciIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFHQSxJQUFNQSxNQUFNLHdCQUFaLEMsQ0FoQkE7OztBQW1CQUEsSUFBSUMsR0FBSixDQUFRLHFCQUFSOztBQUVBRCxJQUFJQyxHQUFK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QUFBQSxDQUFiOztBQUtBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBdkIsSUFBSXdELEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBQ3RELEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3pCQSxNQUFJa0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ25CRCxZQUFRLEdBRFc7QUFFbkJvQyxXQUFPO0FBRlksR0FBckI7QUFJRCxDQUxEOztBQU9BekQsSUFBSTBELE1BQUosQ0FBVzNDLElBQVgsRUFBaUIsWUFBTTtBQUNyQjRDLFVBQVFDLEdBQVIsNkJBQXNDN0MsSUFBdEM7QUFDRCxDQUZEOztrQkFJZWYsRyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGpzb24sIHVybGVuY29kZWQgfSBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgT2ZmaWNlIGZyb20gJy4vY29udHJvbGxlcnMvb2ZmaWNlQ3RyJztcbmltcG9ydCB1c2VyQ3RyIGZyb20gJy4vY29udHJvbGxlcnMvdXNlckN0cic7XG5pbXBvcnQgcGFydHlDdHIgZnJvbSAnLi9jb250cm9sbGVycy9wYXJ0eUN0cic7XG5pbXBvcnQgY2FuZGlkYXRlQ3RyIGZyb20gJy4vY29udHJvbGxlcnMvY2FuZGlkYXRlc0N0cic7XG5pbXBvcnQgaW50ZXJlc3RDdHIgZnJvbSAnLi9jb250cm9sbGVycy9pbnRlcmVzdEN0cic7XG5pbXBvcnQgdm90ZXNDdHIgZnJvbSAnLi9jb250cm9sbGVycy92b3Rlc0N0cic7XG5pbXBvcnQgdG9rZW4gZnJvbSAnLi9oZWxwZXIvdG9rZW5BdXRoJztcbmltcG9ydCB2ZXJpZnlBZG1pbiBmcm9tICcuL2hlbHBlci92ZXJpZnlBZG1pbic7XG5pbXBvcnQgdmVyaWZ5SWQgZnJvbSAnLi9oZWxwZXIvdXNlckF1dGgnO1xuXG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuXG5hcHAudXNlKGNvcnMoKSk7XG5cbmFwcC51c2UoJyonLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdQVVQsIEdFVCwgUE9TVCwgREVMRVRFLCBPUFRJT05TJyk7XG4gIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLCAnQ29udGVudC1UeXBlJyk7XG4gIG5leHQoKTtcbn0pO1xuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUpKSk7XG5hcHAudXNlKCcvc3R5bGVzJywgZXhwcmVzcy5zdGF0aWMoYCR7X19kaXJuYW1lfS4uLy4uL1VJL3N0eWxlc2ApKTtcbmFwcC51c2UoJy9pbWFnZXMnLCBleHByZXNzLnN0YXRpYyhgJHtfX2Rpcm5hbWV9Li4vLi4vVUkvaW1hZ2VzYCkpO1xuYXBwLnVzZSgnL3NjcmlwdHMnLCBleHByZXNzLnN0YXRpYyhgJHtfX2Rpcm5hbWV9Li4vLi4vVUkvc2NyaXB0c2ApKTtcbmFwcC51c2UoJy92aWV3cycsIGV4cHJlc3Muc3RhdGljKGAke19fZGlybmFtZX0uLi8uLi9VSS92aWV3c2ApKTtcblxuXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgZXh0ZW5kZWQ6IHRydWUsXG59KSk7XG5cbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMDtcblxuLy8gaG9tZXBhZ2VcbmFwcC5nZXQoJy8nLCAocmVxLCByZXMpID0+IHtcbiAgcmVzLnNlbmRGaWxlKHBhdGguam9pbihgJHtfX2Rpcm5hbWV9Li4vLi4vVUkvdmlld3MvaW5kZXguaHRtbGApKTtcbn0pO1xuXG5hcHAuZ2V0KCcvYXBpL3YxJywgKHJlcSwgcmVzKSA9PiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gIHN0YXR1czogMjAwLFxuICBtZXNzYWdlOiAnV2VsY29tZSB0byBQT0xJVElDTycsXG59KSk7XG4vLyBhZG1pbjogY3JlYXRlLCBlZGl0XG5hcHAucG9zdChcbiAgJy9hcGkvdjEvcGFydGllcycsXG4gIHRva2VuLnZlcmlmeVRva2VuLFxuICB2ZXJpZnlBZG1pbi52ZXJpZnlJc0FkbWluLFxuICBwYXJ0eUN0ci5jcmVhdGUsXG4pO1xuXG5hcHAucGF0Y2goXG4gICcvYXBpL3YxL3BhcnRpZXMvOmlkL25hbWUnLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgdmVyaWZ5QWRtaW4udmVyaWZ5SXNBZG1pbixcbiAgcGFydHlDdHIudXBkYXRlLFxuKTtcblxuYXBwLmRlbGV0ZShcbiAgJy9hcGkvdjEvcGFydGllcy86aWQnLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgdmVyaWZ5QWRtaW4udmVyaWZ5SXNBZG1pbixcbiAgcGFydHlDdHIuZGVsZXRlLFxuKTtcblxuYXBwLmRlbGV0ZShcbiAgJy9hcGkvdjEvb2ZmaWNlcy86aWQnLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgdmVyaWZ5QWRtaW4udmVyaWZ5SXNBZG1pbixcbiAgT2ZmaWNlLmRlbGV0ZSxcbik7XG5cbmFwcC5wb3N0KFxuICAnL2FwaS92MS9vZmZpY2VzJyxcbiAgdG9rZW4udmVyaWZ5VG9rZW4sXG4gIHZlcmlmeUFkbWluLnZlcmlmeUlzQWRtaW4sXG4gIE9mZmljZS5jcmVhdGUsXG4pO1xuXG5hcHAucG9zdChcbiAgJy9hcGkvdjEvb2ZmaWNlLzp1c2VyaWQvcmVnaXN0ZXInLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgdmVyaWZ5QWRtaW4udmVyaWZ5SXNBZG1pbixcbiAgdmVyaWZ5SWQudmFsaWRhdGVVc2VySWQsXG4gIGNhbmRpZGF0ZUN0ci5yZWdpc3Rlcixcbik7XG5cbmFwcC5wb3N0KFxuICAnL2FwaS92MS9vZmZpY2UvaW50ZXJlc3QnLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgaW50ZXJlc3RDdHIudXNlckludGVyZXN0LFxuKTtcblxuYXBwLmdldChcbiAgJy9hcGkvdjEvb2ZmaWNlL2ludGVyZXN0JyxcbiAgdG9rZW4udmVyaWZ5VG9rZW4sXG4gIHZlcmlmeUFkbWluLnZlcmlmeUlzQWRtaW4sXG4gIGludGVyZXN0Q3RyLmdldEFsbEludGVyZXN0ZWRDYW5kaWRhdGVzLFxuKTtcblxuYXBwLmdldChcbiAgJy9hcGkvdjEvdXNlcnMnLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgdmVyaWZ5QWRtaW4udmVyaWZ5SXNBZG1pbixcbiAgdmVyaWZ5SWQudmFsaWRhdGVVc2VySWQsXG4gIHVzZXJDdHIuZ2V0QWxsVXNlcnMsXG4pO1xuXG5hcHAuZ2V0KFxuICAnL2FwaS92MS86aWQvdXNlcnMnLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgdmVyaWZ5QWRtaW4udmVyaWZ5SXNBZG1pbixcbiAgdmVyaWZ5SWQudmFsaWRhdGVVc2VySWQsXG4gIHVzZXJDdHIuZ2V0QVVzZXIsXG4pO1xuXG5cbi8vIHVzZXJcbmFwcC5nZXQoXG4gICcvYXBpL3YxL3BhcnRpZXMnLFxuICBwYXJ0eUN0ci5nZXRQYXJ0aWVzLFxuKTtcblxuYXBwLmdldChcbiAgJy9hcGkvdjEvcGFydGllcy86aWQnLFxuICBwYXJ0eUN0ci5nZXRBUGFydHksXG4pO1xuXG5hcHAuZ2V0KFxuICAnL2FwaS92MS9vZmZpY2VzJyxcbiAgdG9rZW4udmVyaWZ5VG9rZW4sXG4gIE9mZmljZS5nZXRBbGxPZmZpY2VzLFxuKTtcblxuYXBwLmdldChcbiAgJy9hcGkvdjEvb2ZmaWNlcy86aWQnLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgT2ZmaWNlLmdldE9uZU9mZmljZSxcbik7XG5cbmFwcC5wb3N0KFxuICAnL2FwaS92MS92b3RlcycsXG4gIHRva2VuLnZlcmlmeVRva2VuLFxuICB2b3Rlc0N0ci52b3Rlcyxcbik7XG5cbmFwcC5nZXQoXG4gICcvYXBpL3YxL29mZmljZS86b2ZmaWNlaWQvcmVzdWx0JyxcbiAgdG9rZW4udmVyaWZ5VG9rZW4sXG4gIE9mZmljZS5vZmZpY2VSZXN1bHQsXG4pO1xuXG5hcHAuZ2V0KFxuICAnL2FwaS92MS9jYW5kaWRhdGVzJyxcbiAgdG9rZW4udmVyaWZ5VG9rZW4sXG4gIGNhbmRpZGF0ZUN0ci5nZXRBbGxDYW5kaWRhdGVzLFxuKTtcblxuLy8gdXNlciBsb2dpblxuYXBwLnBvc3QoXG4gICcvYXBpL3YxL2F1dGgvc2lnbnVwJyxcbiAgdXNlckN0ci5jcmVhdGVVc2VyLFxuKTtcblxuYXBwLnBvc3QoXG4gICcvYXBpL3YxL2F1dGgvbG9naW4nLFxuICB1c2VyQ3RyLmxvZ2luLFxuKTtcblxuLy8gdXNlci9hZG1pbiBsb2dvdXRcbmFwcC5wb3N0KFxuICAnL2FwaS92MS9hdXRoL3NpZ25vdXQnLFxuICB0b2tlbi52ZXJpZnlUb2tlbixcbiAgdXNlckN0ci5zaWdub3V0LFxuKTtcblxuYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4gcmVzLnN0YXR1cygyMDApLnNlbmQoe1xuICBzdGF0dXM6IDIwMCxcbiAgbWVzc2FnZTogJ1dlbGNvbWUgdG8gUE9MSVRJQ08nLFxufSkpO1xuXG4vLyBIYW5kbGUgNDA0OiBzZW5kIGFuIDQwNCBlcnJvciBwYWdlXG4vLyBhcHAudXNlKGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4vLyAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lICsgJy4uLy4uL1VJL3ZpZXdzLzQwNC5odG1sJykpO1xuLy8gfSk7XG5cbi8vIEhhbmRsZSA1MDA6IHNlbmQgYSA1MDAgZXJyb3Jcbi8vIGFwcC51c2UoZnVuY3Rpb24oZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSB7XG4vLyAgIHJlcy5zdGF0dXMoNTAwKS5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lICsgJy4uLy4uL1VJL3ZpZXdzLzUwMC5odG1sJykpO1xuLy8gfSk7XG5cbmFwcC5hbGwoJyonLCAocmVxLCByZXMpID0+IHtcbiAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoe1xuICAgIHN0YXR1czogNDA0LFxuICAgIGVycm9yOiAnUmVzb3VyY2Ugbm90IGZvdW5kIG9uIHRoZSBzZXJ2ZXInLFxuICB9KTtcbn0pO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYGFwcCBpcyBydW5uaW5nIG9uIHBvcnQgJHtwb3J0fWApO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiJdfQ==