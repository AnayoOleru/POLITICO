'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.candidate4 = exports.badVoteResult5 = exports.badVoteResult4 = exports.badVoteResult3 = exports.badVoteResult2 = exports.badVoteResult1 = exports.goodVoteResult = exports.candidate3 = exports.candidate2 = exports.candidate1 = exports.vote3 = exports.vote2 = exports.vote1 = exports.offices5 = exports.offices4 = exports.offices3 = exports.offices2 = exports.offices = exports.badTestParty8 = exports.badTestParty7 = exports.badTestParty6 = exports.badTestParty5 = exports.badTestParty4 = exports.badTestParty3 = exports.badTestParty2 = exports.badTestParty = exports.testParty = exports.isEmail = exports.badLogin3 = exports.badLogin2 = exports.badLogin = exports.badSignup5 = exports.badSignup4 = exports.badSignup3 = exports.badSignup2 = exports.badSignup = exports.goodLogin = exports.goodSignup = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _badSignup;

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var goodSignup = {
    firstname: 'Anayo',
    lastname: 'Oleru',
    othername: 'David',
    email: 'anayo_oleru@outlook.com',
    phonenumber: '07069583654',
    passportUrl: 'Anayo.jpg',
    password: '223356'
};

var badSignup = {
    firstname: 'Anayo',
    lastname: 'Oleru',
    email: 'anayo_oleru@outlook.com',
    passportUrl: '',
    password: '223356'
};

var badSignup2 = (_badSignup = {
    firstname: '',
    lastname: ''
}, (0, _defineProperty3.default)(_badSignup, 'lastname', ''), (0, _defineProperty3.default)(_badSignup, 'email', 'anayo_oleru@outlook.com'), (0, _defineProperty3.default)(_badSignup, 'passportUrl', 'Anayo.jpg'), (0, _defineProperty3.default)(_badSignup, 'password', '223356'), _badSignup);

var badSignup3 = {
    firstname: 'Anayo',
    lastname: 'Oleru',
    othername: 'David',
    email: 'anayo_oleru@outlook.com',
    phonenumber: '07069583654',
    passportUrl: 'Anayo.jpg',
    password: ''
};

var badSignup4 = {
    firstname: '',
    lastname: '',
    othername: '',
    email: '',
    phonenumber: '',
    passportUrl: '',
    password: ''
};

var badSignup5 = {
    firstname: '    ',
    lastname: '   ',
    othername: '   ',
    email: '   ',
    phonenumber: '  ',
    passportUrl: '  ',
    password: '  '
};

var goodLogin = {
    email: 'anayo_oleru@outlook.com',
    password: 'munachi12345'
};

var badLogin = {
    email: 'anayo_oleruoutlook.com',
    password: '223356'
};

var badLogin2 = {
    email: 'anayo_oleru@outlook.com',
    password: ''
};

var badLogin3 = {
    email: '     ',
    password: '    '
};

var isEmail = {
    email: 'anayo_oleru@outlook.com',
    password: '223356'
};

var testParty = {
    name: 'Action congress Nigeria',
    hqaddress: 'White House 22 Abuja',
    logoUrl: 'https://ACN.jpg'
};

var badTestParty = {
    name: '',
    hqaddress: 'White House 22 Abuja',
    logoUrl: 'https://ac.jpg'
};

var badTestParty2 = {
    name: 'Action congress',
    hqaddress: '',
    logoUrl: 'https://ac.jpg'
};

var badTestParty3 = {
    name: 'Action congress',
    hqaddress: 'White House 22 Abuja',
    logoUrl: ''
};

var badTestParty4 = {
    name: '',
    acronym: '',
    hqaddress: ''
};

var badTestParty5 = {
    name: '3344',
    hqaddress: 'Abuja 24 house Abikoromi',
    logoUrl: 'https://ac.jpg'
};

var badTestParty6 = {
    name: 'Action congress',
    hqaddress: 'Abuja 24 house Abikoromi',
    logoUrl: 'ttc'
};

var badTestParty7 = {
    name: 'john congress',
    hqaddress: '```',
    logoUrl: 'https://ac.jpg'
};

var badTestParty8 = {
    name: 'Action congress',
    hqaddress: '777',
    logoUrl: 'https://ac.jpg'
};

var offices = {
    type: 'Federal',
    name: 'President'
};

var offices2 = {
    type: '',
    name: 'President'
};

var offices3 = {
    type: 'Federal',
    name: ''
};

var offices4 = {
    type: '',
    name: ''
};

var offices5 = {
    type: '8907',
    name: '23456'
};

var vote1 = {
    created_by: " ",
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
};

var vote2 = {
    created_by: "4bdc719e-22c2-4fcc-a085-a51be56f34e9",
    office: " ",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
};

var vote3 = {
    created_by: "4bdc719e-22c2-4fcc-a085-a51be56f34e9",
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    candidate: ""
};

var candidate1 = {
    office: "",
    party: "8356151d-acaf-40d6-9cd8-4207e386108e",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
};

var candidate2 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    party: "",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
};

var candidate3 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    party: "8356151d-acaf-40d6-9cd8-4207e386108e",
    candidate: ""
};

var candidate4 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    party: "8356151d-acaf-40d6-9cd8-4207e386108e",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
};

var goodVoteResult = {
    created_by: "a5934256-ea1b-476c-af9a-b2ab4c5512b6",
    office: "fd1648b9-32dd-402a-b2fe-98c9df1c585c",
    candidate: "7c01b43d-e911-4a6f-8cc0-1d5c8c16501d"
    // office not found
};var badVoteResult1 = {
    office: " ",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c",
    result: "23"
};

var badVoteResult2 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    candidate: "",
    result: "23"
};

var badVoteResult3 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c",
    result: ""
};

var badVoteResult4 = {
    created_by: "",
    office: "",
    candidate: ""
};

var badVoteResult5 = {
    created_by: "6e2d   c601-8990-4de  3-af32-71918b   87a363     ",
    office: "2643e397-   4cf7-4968-89d5-  96059bfd0ea6           ",
    candidate: "ac0a889d-   57d2-4477-805a-  80cb22cf1b3c      "
};

exports.goodSignup = goodSignup;
exports.goodLogin = goodLogin;
exports.badSignup = badSignup;
exports.badSignup2 = badSignup2;
exports.badSignup3 = badSignup3;
exports.badSignup4 = badSignup4;
exports.badSignup5 = badSignup5;
exports.badLogin = badLogin;
exports.badLogin2 = badLogin2;
exports.badLogin3 = badLogin3;
exports.isEmail = isEmail;
exports.testParty = testParty;
exports.badTestParty = badTestParty;
exports.badTestParty2 = badTestParty2;
exports.badTestParty3 = badTestParty3;
exports.badTestParty4 = badTestParty4;
exports.badTestParty5 = badTestParty5;
exports.badTestParty6 = badTestParty6;
exports.badTestParty7 = badTestParty7;
exports.badTestParty8 = badTestParty8;
exports.offices = offices;
exports.offices2 = offices2;
exports.offices3 = offices3;
exports.offices4 = offices4;
exports.offices5 = offices5;
exports.vote1 = vote1;
exports.vote2 = vote2;
exports.vote3 = vote3;
exports.candidate1 = candidate1;
exports.candidate2 = candidate2;
exports.candidate3 = candidate3;
exports.goodVoteResult = goodVoteResult;
exports.badVoteResult1 = badVoteResult1;
exports.badVoteResult2 = badVoteResult2;
exports.badVoteResult3 = badVoteResult3;
exports.badVoteResult4 = badVoteResult4;
exports.badVoteResult5 = badVoteResult5;
exports.candidate4 = candidate4;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvaW5wdXRGaWVsZC5qcyJdLCJuYW1lcyI6WyJnb29kU2lnbnVwIiwiZmlyc3RuYW1lIiwibGFzdG5hbWUiLCJvdGhlcm5hbWUiLCJlbWFpbCIsInBob25lbnVtYmVyIiwicGFzc3BvcnRVcmwiLCJwYXNzd29yZCIsImJhZFNpZ251cCIsImJhZFNpZ251cDMiLCJiYWRTaWdudXA0IiwiYmFkU2lnbnVwNSIsImdvb2RMb2dpbiIsImJhZExvZ2luIiwiYmFkTG9naW4yIiwiYmFkTG9naW4zIiwiaXNFbWFpbCIsInRlc3RQYXJ0eSIsIm5hbWUiLCJocWFkZHJlc3MiLCJsb2dvVXJsIiwiYmFkVGVzdFBhcnR5IiwiYmFkVGVzdFBhcnR5MiIsImJhZFRlc3RQYXJ0eTMiLCJiYWRUZXN0UGFydHk0IiwiYWNyb255bSIsImJhZFRlc3RQYXJ0eTUiLCJiYWRUZXN0UGFydHk2IiwiYmFkVGVzdFBhcnR5NyIsImJhZFRlc3RQYXJ0eTgiLCJvZmZpY2VzIiwidHlwZSIsIm9mZmljZXMyIiwib2ZmaWNlczMiLCJvZmZpY2VzNCIsIm9mZmljZXM1Iiwidm90ZTEiLCJjcmVhdGVkX2J5Iiwib2ZmaWNlIiwiY2FuZGlkYXRlIiwidm90ZTIiLCJ2b3RlMyIsImNhbmRpZGF0ZTEiLCJwYXJ0eSIsImNhbmRpZGF0ZTIiLCJjYW5kaWRhdGUzIiwiY2FuZGlkYXRlNCIsImdvb2RWb3RlUmVzdWx0IiwiYmFkVm90ZVJlc3VsdDEiLCJyZXN1bHQiLCJiYWRWb3RlUmVzdWx0MiIsImJhZFZvdGVSZXN1bHQzIiwiYmFkVm90ZVJlc3VsdDQiLCJiYWRWb3RlUmVzdWx0NSIsImJhZFNpZ251cDIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsYUFBWTtBQUNkQyxlQURjLE9BQUE7QUFFZEMsY0FGYyxPQUFBO0FBR2RDLGVBSGMsT0FBQTtBQUlkQyxXQUpjLHlCQUFBO0FBS2RDLGlCQUxjLGFBQUE7QUFNZEMsaUJBTmMsV0FBQTtBQU9kQyxjQUFVO0FBUEksQ0FBbEI7O0FBVUEsSUFBTUMsWUFBVztBQUNiUCxlQURhLE9BQUE7QUFFYkMsY0FGYSxPQUFBO0FBR2JFLFdBSGEseUJBQUE7QUFJYkUsaUJBSmEsRUFBQTtBQUtiQyxjQUFVO0FBTEcsQ0FBakI7O0FBUUEsSUFBTSxjQUFBLGFBQUE7QUFDRk4sZUFERSxFQUFBO0FBRUZDLGNBQVU7QUFGUixDQUFBLEVBQUEsQ0FBQSxHQUFBLGlCQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsVUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxpQkFBQSxPQUFBLEVBQUEsVUFBQSxFQUFBLE9BQUEsRUFBQSx5QkFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLGlCQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsYUFBQSxFQUFBLFdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxpQkFBQSxPQUFBLEVBQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLENBQUEsRUFBTixVQUFNLENBQU47O0FBU0EsSUFBTU8sYUFBWTtBQUNkUixlQURjLE9BQUE7QUFFZEMsY0FGYyxPQUFBO0FBR2RDLGVBSGMsT0FBQTtBQUlkQyxXQUpjLHlCQUFBO0FBS2RDLGlCQUxjLGFBQUE7QUFNZEMsaUJBTmMsV0FBQTtBQU9kQyxjQUFVO0FBUEksQ0FBbEI7O0FBVUEsSUFBTUcsYUFBWTtBQUNkVCxlQURjLEVBQUE7QUFFZEMsY0FGYyxFQUFBO0FBR2RDLGVBSGMsRUFBQTtBQUlkQyxXQUpjLEVBQUE7QUFLZEMsaUJBTGMsRUFBQTtBQU1kQyxpQkFOYyxFQUFBO0FBT2RDLGNBQVU7QUFQSSxDQUFsQjs7QUFVQSxJQUFNSSxhQUFZO0FBQ2RWLGVBRGMsTUFBQTtBQUVkQyxjQUZjLEtBQUE7QUFHZEMsZUFIYyxLQUFBO0FBSWRDLFdBSmMsS0FBQTtBQUtkQyxpQkFMYyxJQUFBO0FBTWRDLGlCQU5jLElBQUE7QUFPZEMsY0FBVTtBQVBJLENBQWxCOztBQVVBLElBQU1LLFlBQVc7QUFDYlIsV0FEYSx5QkFBQTtBQUViRyxjQUFVO0FBRkcsQ0FBakI7O0FBS0EsSUFBTU0sV0FBVTtBQUNaVCxXQURZLHdCQUFBO0FBRVpHLGNBQVU7QUFGRSxDQUFoQjs7QUFLQSxJQUFNTyxZQUFXO0FBQ2JWLFdBRGEseUJBQUE7QUFFYkcsY0FBVTtBQUZHLENBQWpCOztBQUtBLElBQU1RLFlBQVc7QUFDYlgsV0FEYSxPQUFBO0FBRWJHLGNBQVU7QUFGRyxDQUFqQjs7QUFLQSxJQUFNUyxVQUFTO0FBQ1haLFdBRFcseUJBQUE7QUFFWEcsY0FBVTtBQUZDLENBQWY7O0FBS0EsSUFBTVUsWUFBVztBQUNiQyxVQURhLHlCQUFBO0FBRWJDLGVBRmEsc0JBQUE7QUFHYkMsYUFBUztBQUhJLENBQWpCOztBQU1BLElBQU1DLGVBQWM7QUFDaEJILFVBRGdCLEVBQUE7QUFFaEJDLGVBRmdCLHNCQUFBO0FBR2hCQyxhQUFTO0FBSE8sQ0FBcEI7O0FBTUEsSUFBTUUsZ0JBQWU7QUFDakJKLFVBRGlCLGlCQUFBO0FBRWpCQyxlQUZpQixFQUFBO0FBR2pCQyxhQUFTO0FBSFEsQ0FBckI7O0FBTUEsSUFBTUcsZ0JBQWU7QUFDakJMLFVBRGlCLGlCQUFBO0FBRWpCQyxlQUZpQixzQkFBQTtBQUdqQkMsYUFBUztBQUhRLENBQXJCOztBQU9BLElBQU1JLGdCQUFlO0FBQ2pCTixVQURpQixFQUFBO0FBRWpCTyxhQUZpQixFQUFBO0FBR2pCTixlQUFXO0FBSE0sQ0FBckI7O0FBTUEsSUFBTU8sZ0JBQWU7QUFDakJSLFVBRGlCLE1BQUE7QUFFakJDLGVBRmlCLDBCQUFBO0FBR2pCQyxhQUFTO0FBSFEsQ0FBckI7O0FBTUEsSUFBTU8sZ0JBQWU7QUFDakJULFVBRGlCLGlCQUFBO0FBRWpCQyxlQUZpQiwwQkFBQTtBQUdqQkMsYUFBUztBQUhRLENBQXJCOztBQU1BLElBQU1RLGdCQUFjO0FBQ2hCVixVQURnQixlQUFBO0FBRWhCQyxlQUZnQixLQUFBO0FBR2hCQyxhQUFTO0FBSE8sQ0FBcEI7O0FBTUEsSUFBTVMsZ0JBQWM7QUFDaEJYLFVBRGdCLGlCQUFBO0FBRWhCQyxlQUZnQixLQUFBO0FBR2hCQyxhQUFTO0FBSE8sQ0FBcEI7O0FBTUEsSUFBTVUsVUFBUztBQUNYQyxVQURXLFNBQUE7QUFFWGIsVUFBTTtBQUZLLENBQWY7O0FBS0EsSUFBTWMsV0FBVTtBQUNaRCxVQURZLEVBQUE7QUFFWmIsVUFBTTtBQUZNLENBQWhCOztBQUtBLElBQU1lLFdBQVU7QUFDWkYsVUFEWSxTQUFBO0FBRVpiLFVBQU07QUFGTSxDQUFoQjs7QUFLQSxJQUFNZ0IsV0FBVTtBQUNaSCxVQURZLEVBQUE7QUFFWmIsVUFBTTtBQUZNLENBQWhCOztBQUtBLElBQU1pQixXQUFVO0FBQ1pKLFVBRFksTUFBQTtBQUVaYixVQUFNO0FBRk0sQ0FBaEI7O0FBS0EsSUFBTWtCLFFBQVE7QUFDTkMsZ0JBRE0sR0FBQTtBQUVOQyxZQUZNLHNDQUFBO0FBR05DLGVBQVc7QUFITCxDQUFkOztBQU1BLElBQU1DLFFBQVE7QUFDVkgsZ0JBRFUsc0NBQUE7QUFFVkMsWUFGVSxHQUFBO0FBR1ZDLGVBQVc7QUFIRCxDQUFkOztBQU1BLElBQU1FLFFBQVE7QUFDVkosZ0JBRFUsc0NBQUE7QUFFVkMsWUFGVSxzQ0FBQTtBQUdWQyxlQUFXO0FBSEQsQ0FBZDs7QUFNQSxJQUFNRyxhQUFhO0FBQ2ZKLFlBRGUsRUFBQTtBQUVmSyxXQUZlLHNDQUFBO0FBR2ZKLGVBQVc7QUFISSxDQUFuQjs7QUFNQSxJQUFNSyxhQUFhO0FBQ2ZOLFlBRGUsc0NBQUE7QUFFZkssV0FGZSxFQUFBO0FBR2ZKLGVBQVc7QUFISSxDQUFuQjs7QUFNQSxJQUFNTSxhQUFhO0FBQ2ZQLFlBRGUsc0NBQUE7QUFFZkssV0FGZSxzQ0FBQTtBQUdmSixlQUFXO0FBSEksQ0FBbkI7O0FBTUEsSUFBTU8sYUFBYTtBQUNmUixZQURlLHNDQUFBO0FBRWZLLFdBRmUsc0NBQUE7QUFHZkosZUFBVztBQUhJLENBQW5COztBQU1BLElBQU1RLGlCQUFpQjtBQUNuQlYsZ0JBRG1CLHNDQUFBO0FBRW5CQyxZQUZtQixzQ0FBQTtBQUduQkMsZUFBVztBQUVmO0FBTHVCLENBQXZCLENBTUEsSUFBTVMsaUJBQWlCO0FBQ25CVixZQURtQixHQUFBO0FBRW5CQyxlQUZtQixzQ0FBQTtBQUduQlUsWUFBUTtBQUhXLENBQXZCOztBQU1BLElBQU1DLGlCQUFpQjtBQUNuQlosWUFEbUIsc0NBQUE7QUFFbkJDLGVBRm1CLEVBQUE7QUFHbkJVLFlBQVE7QUFIVyxDQUF2Qjs7QUFNQSxJQUFNRSxpQkFBaUI7QUFDbkJiLFlBRG1CLHNDQUFBO0FBRW5CQyxlQUZtQixzQ0FBQTtBQUduQlUsWUFBUTtBQUhXLENBQXZCOztBQU1BLElBQU1HLGlCQUFpQjtBQUNuQmYsZ0JBRG1CLEVBQUE7QUFFbkJDLFlBRm1CLEVBQUE7QUFHbkJDLGVBQVc7QUFIUSxDQUF2Qjs7QUFNQSxJQUFNYyxpQkFBaUI7QUFDbkJoQixnQkFEbUIsbURBQUE7QUFFbkJDLFlBRm1CLHNEQUFBO0FBR25CQyxlQUFXO0FBSFEsQ0FBdkI7O1FBUUl2QyxVLEdBQUFBLFU7UUFBWVksUyxHQUFBQSxTO1FBQVdKLFMsR0FBQUEsUztRQUFXOEMsVSxHQUFBQSxVO1FBQVk3QyxVLEdBQUFBLFU7UUFBWUMsVSxHQUFBQSxVO1FBQVdDLFUsR0FBQUEsVTtRQUFZRSxRLEdBQUFBLFE7UUFBVUMsUyxHQUFBQSxTO1FBQVdDLFMsR0FBQUEsUztRQUFXQyxPLEdBQUFBLE87UUFBU0MsUyxHQUFBQSxTO1FBQVdJLFksR0FBQUEsWTtRQUNySUMsYSxHQUFBQSxhO1FBQWVDLGEsR0FBQUEsYTtRQUFlQyxhLEdBQUFBLGE7UUFBZUUsYSxHQUFBQSxhO1FBQWVDLGEsR0FBQUEsYTtRQUFlQyxhLEdBQUFBLGE7UUFBZUMsYSxHQUFBQSxhO1FBQWVDLE8sR0FBQUEsTztRQUFTRSxRLEdBQUFBLFE7UUFBVUMsUSxHQUFBQSxRO1FBQVVDLFEsR0FBQUEsUTtRQUFVQyxRLEdBQUFBLFE7UUFDaEpDLEssR0FBQUEsSztRQUFPSSxLLEdBQUFBLEs7UUFBT0MsSyxHQUFBQSxLO1FBQU9DLFUsR0FBQUEsVTtRQUFZRSxVLEdBQUFBLFU7UUFBWUMsVSxHQUFBQSxVO1FBQVlFLGMsR0FBQUEsYztRQUFnQkMsYyxHQUFBQSxjO1FBQWdCRSxjLEdBQUFBLGM7UUFBZ0JDLGMsR0FBQUEsYztRQUFnQkMsYyxHQUFBQSxjO1FBQWdCQyxjLEdBQUFBLGM7UUFDeklQLFUsR0FBQUEsVSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdvb2RTaWdudXAgPXtcbiAgICBmaXJzdG5hbWU6ICdBbmF5bycsXG4gICAgbGFzdG5hbWU6ICdPbGVydScsXG4gICAgb3RoZXJuYW1lOiAnRGF2aWQnLFxuICAgIGVtYWlsOiAnYW5heW9fb2xlcnVAb3V0bG9vay5jb20nLFxuICAgIHBob25lbnVtYmVyOiAnMDcwNjk1ODM2NTQnLFxuICAgIHBhc3Nwb3J0VXJsOiAnQW5heW8uanBnJyxcbiAgICBwYXNzd29yZDogJzIyMzM1Nidcbn07XG5cbmNvbnN0IGJhZFNpZ251cCA9e1xuICAgIGZpcnN0bmFtZTogJ0FuYXlvJyxcbiAgICBsYXN0bmFtZTogJ09sZXJ1JyxcbiAgICBlbWFpbDogJ2FuYXlvX29sZXJ1QG91dGxvb2suY29tJyxcbiAgICBwYXNzcG9ydFVybDogJycsXG4gICAgcGFzc3dvcmQ6ICcyMjMzNTYnXG59O1xuXG5jb25zdCBiYWRTaWdudXAyID17XG4gICAgZmlyc3RuYW1lOiAnJyxcbiAgICBsYXN0bmFtZTogJycsXG4gICAgbGFzdG5hbWU6ICcnLFxuICAgIGVtYWlsOiAnYW5heW9fb2xlcnVAb3V0bG9vay5jb20nLFxuICAgIHBhc3Nwb3J0VXJsOiAnQW5heW8uanBnJyxcbiAgICBwYXNzd29yZDogJzIyMzM1Nidcbn07XG5cbmNvbnN0IGJhZFNpZ251cDMgPXtcbiAgICBmaXJzdG5hbWU6ICdBbmF5bycsXG4gICAgbGFzdG5hbWU6ICdPbGVydScsXG4gICAgb3RoZXJuYW1lOiAnRGF2aWQnLFxuICAgIGVtYWlsOiAnYW5heW9fb2xlcnVAb3V0bG9vay5jb20nLFxuICAgIHBob25lbnVtYmVyOiAnMDcwNjk1ODM2NTQnLFxuICAgIHBhc3Nwb3J0VXJsOiAnQW5heW8uanBnJyxcbiAgICBwYXNzd29yZDogJydcbn07XG5cbmNvbnN0IGJhZFNpZ251cDQgPXtcbiAgICBmaXJzdG5hbWU6ICcnLFxuICAgIGxhc3RuYW1lOiAnJyxcbiAgICBvdGhlcm5hbWU6ICcnLFxuICAgIGVtYWlsOiAnJyxcbiAgICBwaG9uZW51bWJlcjogJycsXG4gICAgcGFzc3BvcnRVcmw6ICcnLFxuICAgIHBhc3N3b3JkOiAnJ1xufTtcblxuY29uc3QgYmFkU2lnbnVwNSA9e1xuICAgIGZpcnN0bmFtZTogJyAgICAnLFxuICAgIGxhc3RuYW1lOiAnICAgJyxcbiAgICBvdGhlcm5hbWU6ICcgICAnLFxuICAgIGVtYWlsOiAnICAgJyxcbiAgICBwaG9uZW51bWJlcjogJyAgJyxcbiAgICBwYXNzcG9ydFVybDogJyAgJyxcbiAgICBwYXNzd29yZDogJyAgJ1xufTtcblxuY29uc3QgZ29vZExvZ2luID17XG4gICAgZW1haWw6ICdhbmF5b19vbGVydUBvdXRsb29rLmNvbScsXG4gICAgcGFzc3dvcmQ6ICdtdW5hY2hpMTIzNDUnXG59O1xuXG5jb25zdCBiYWRMb2dpbiA9e1xuICAgIGVtYWlsOiAnYW5heW9fb2xlcnVvdXRsb29rLmNvbScsXG4gICAgcGFzc3dvcmQ6ICcyMjMzNTYnXG59O1xuXG5jb25zdCBiYWRMb2dpbjIgPXtcbiAgICBlbWFpbDogJ2FuYXlvX29sZXJ1QG91dGxvb2suY29tJyxcbiAgICBwYXNzd29yZDogJydcbn07XG5cbmNvbnN0IGJhZExvZ2luMyA9e1xuICAgIGVtYWlsOiAnICAgICAnLFxuICAgIHBhc3N3b3JkOiAnICAgICdcbn07XG5cbmNvbnN0IGlzRW1haWwgPXtcbiAgICBlbWFpbDogJ2FuYXlvX29sZXJ1QG91dGxvb2suY29tJyxcbiAgICBwYXNzd29yZDogJzIyMzM1Nidcbn07XG5cbmNvbnN0IHRlc3RQYXJ0eSA9e1xuICAgIG5hbWU6ICdBY3Rpb24gY29uZ3Jlc3MgTmlnZXJpYScsXG4gICAgaHFhZGRyZXNzOiAnV2hpdGUgSG91c2UgMjIgQWJ1amEnLFxuICAgIGxvZ29Vcmw6ICdodHRwczovL0FDTi5qcGcnXG59O1xuXG5jb25zdCBiYWRUZXN0UGFydHkgPXtcbiAgICBuYW1lOiAnJyxcbiAgICBocWFkZHJlc3M6ICdXaGl0ZSBIb3VzZSAyMiBBYnVqYScsXG4gICAgbG9nb1VybDogJ2h0dHBzOi8vYWMuanBnJ1xufTtcblxuY29uc3QgYmFkVGVzdFBhcnR5MiA9e1xuICAgIG5hbWU6ICdBY3Rpb24gY29uZ3Jlc3MnLFxuICAgIGhxYWRkcmVzczogJycsXG4gICAgbG9nb1VybDogJ2h0dHBzOi8vYWMuanBnJ1xufTtcblxuY29uc3QgYmFkVGVzdFBhcnR5MyA9e1xuICAgIG5hbWU6ICdBY3Rpb24gY29uZ3Jlc3MnLFxuICAgIGhxYWRkcmVzczogJ1doaXRlIEhvdXNlIDIyIEFidWphJyxcbiAgICBsb2dvVXJsOiAnJ1xufTtcblxuXG5jb25zdCBiYWRUZXN0UGFydHk0ID17XG4gICAgbmFtZTogJycsXG4gICAgYWNyb255bTogJycsXG4gICAgaHFhZGRyZXNzOiAnJyxcbn07XG5cbmNvbnN0IGJhZFRlc3RQYXJ0eTUgPXtcbiAgICBuYW1lOiAnMzM0NCcsXG4gICAgaHFhZGRyZXNzOiAnQWJ1amEgMjQgaG91c2UgQWJpa29yb21pJyxcbiAgICBsb2dvVXJsOiAnaHR0cHM6Ly9hYy5qcGcnXG59O1xuXG5jb25zdCBiYWRUZXN0UGFydHk2ID17XG4gICAgbmFtZTogJ0FjdGlvbiBjb25ncmVzcycsXG4gICAgaHFhZGRyZXNzOiAnQWJ1amEgMjQgaG91c2UgQWJpa29yb21pJyxcbiAgICBsb2dvVXJsOiAndHRjJ1xufTtcblxuY29uc3QgYmFkVGVzdFBhcnR5Nz17XG4gICAgbmFtZTogJ2pvaG4gY29uZ3Jlc3MnLFxuICAgIGhxYWRkcmVzczogJ2BgYCcsXG4gICAgbG9nb1VybDogJ2h0dHBzOi8vYWMuanBnJ1xufTtcblxuY29uc3QgYmFkVGVzdFBhcnR5OD17XG4gICAgbmFtZTogJ0FjdGlvbiBjb25ncmVzcycsXG4gICAgaHFhZGRyZXNzOiAnNzc3JyxcbiAgICBsb2dvVXJsOiAnaHR0cHM6Ly9hYy5qcGcnXG59O1xuXG5jb25zdCBvZmZpY2VzID17XG4gICAgdHlwZTogJ0ZlZGVyYWwnLFxuICAgIG5hbWU6ICdQcmVzaWRlbnQnXG59O1xuXG5jb25zdCBvZmZpY2VzMiA9e1xuICAgIHR5cGU6ICcnLFxuICAgIG5hbWU6ICdQcmVzaWRlbnQnXG59O1xuXG5jb25zdCBvZmZpY2VzMyA9e1xuICAgIHR5cGU6ICdGZWRlcmFsJyxcbiAgICBuYW1lOiAnJ1xufTtcblxuY29uc3Qgb2ZmaWNlczQgPXtcbiAgICB0eXBlOiAnJyxcbiAgICBuYW1lOiAnJ1xufTtcblxuY29uc3Qgb2ZmaWNlczUgPXtcbiAgICB0eXBlOiAnODkwNycsXG4gICAgbmFtZTogJzIzNDU2J1xufTtcblxuY29uc3Qgdm90ZTEgPSB7XG4gICAgICAgIGNyZWF0ZWRfYnk6IFwiIFwiLFxuICAgICAgICBvZmZpY2U6IFwiMjY0M2UzOTctNGNmNy00OTY4LTg5ZDUtOTYwNTliZmQwZWE2XCIsXG4gICAgICAgIGNhbmRpZGF0ZTogXCJhYzBhODg5ZC01N2QyLTQ0NzctODA1YS04MGNiMjJjZjFiM2NcIlxufVxuXG5jb25zdCB2b3RlMiA9IHtcbiAgICBjcmVhdGVkX2J5OiBcIjRiZGM3MTllLTIyYzItNGZjYy1hMDg1LWE1MWJlNTZmMzRlOVwiLFxuICAgIG9mZmljZTogXCIgXCIsXG4gICAgY2FuZGlkYXRlOiBcImFjMGE4ODlkLTU3ZDItNDQ3Ny04MDVhLTgwY2IyMmNmMWIzY1wiXG59XG5cbmNvbnN0IHZvdGUzID0ge1xuICAgIGNyZWF0ZWRfYnk6IFwiNGJkYzcxOWUtMjJjMi00ZmNjLWEwODUtYTUxYmU1NmYzNGU5XCIsXG4gICAgb2ZmaWNlOiBcIjI2NDNlMzk3LTRjZjctNDk2OC04OWQ1LTk2MDU5YmZkMGVhNlwiLFxuICAgIGNhbmRpZGF0ZTogXCJcIlxufVxuXG5jb25zdCBjYW5kaWRhdGUxID0ge1xuICAgIG9mZmljZTogXCJcIixcbiAgICBwYXJ0eTogXCI4MzU2MTUxZC1hY2FmLTQwZDYtOWNkOC00MjA3ZTM4NjEwOGVcIixcbiAgICBjYW5kaWRhdGU6IFwiYWMwYTg4OWQtNTdkMi00NDc3LTgwNWEtODBjYjIyY2YxYjNjXCJcbn1cblxuY29uc3QgY2FuZGlkYXRlMiA9IHtcbiAgICBvZmZpY2U6IFwiMjY0M2UzOTctNGNmNy00OTY4LTg5ZDUtOTYwNTliZmQwZWE2XCIsXG4gICAgcGFydHk6IFwiXCIsXG4gICAgY2FuZGlkYXRlOiBcImFjMGE4ODlkLTU3ZDItNDQ3Ny04MDVhLTgwY2IyMmNmMWIzY1wiXG59XG5cbmNvbnN0IGNhbmRpZGF0ZTMgPSB7XG4gICAgb2ZmaWNlOiBcIjI2NDNlMzk3LTRjZjctNDk2OC04OWQ1LTk2MDU5YmZkMGVhNlwiLFxuICAgIHBhcnR5OiBcIjgzNTYxNTFkLWFjYWYtNDBkNi05Y2Q4LTQyMDdlMzg2MTA4ZVwiLFxuICAgIGNhbmRpZGF0ZTogXCJcIlxufVxuXG5jb25zdCBjYW5kaWRhdGU0ID0ge1xuICAgIG9mZmljZTogXCIyNjQzZTM5Ny00Y2Y3LTQ5NjgtODlkNS05NjA1OWJmZDBlYTZcIixcbiAgICBwYXJ0eTogXCI4MzU2MTUxZC1hY2FmLTQwZDYtOWNkOC00MjA3ZTM4NjEwOGVcIixcbiAgICBjYW5kaWRhdGU6IFwiYWMwYTg4OWQtNTdkMi00NDc3LTgwNWEtODBjYjIyY2YxYjNjXCJcbn1cblxuY29uc3QgZ29vZFZvdGVSZXN1bHQgPSB7XG4gICAgY3JlYXRlZF9ieTogXCJhNTkzNDI1Ni1lYTFiLTQ3NmMtYWY5YS1iMmFiNGM1NTEyYjZcIixcbiAgICBvZmZpY2U6IFwiZmQxNjQ4YjktMzJkZC00MDJhLWIyZmUtOThjOWRmMWM1ODVjXCIsXG4gICAgY2FuZGlkYXRlOiBcIjdjMDFiNDNkLWU5MTEtNGE2Zi04Y2MwLTFkNWM4YzE2NTAxZFwiLFxufVxuLy8gb2ZmaWNlIG5vdCBmb3VuZFxuY29uc3QgYmFkVm90ZVJlc3VsdDEgPSB7XG4gICAgb2ZmaWNlOiBcIiBcIixcbiAgICBjYW5kaWRhdGU6IFwiYWMwYTg4OWQtNTdkMi00NDc3LTgwNWEtODBjYjIyY2YxYjNjXCIsXG4gICAgcmVzdWx0OiBcIjIzXCIsXG59XG5cbmNvbnN0IGJhZFZvdGVSZXN1bHQyID0ge1xuICAgIG9mZmljZTogXCIyNjQzZTM5Ny00Y2Y3LTQ5NjgtODlkNS05NjA1OWJmZDBlYTZcIixcbiAgICBjYW5kaWRhdGU6IFwiXCIsXG4gICAgcmVzdWx0OiBcIjIzXCIsXG59XG5cbmNvbnN0IGJhZFZvdGVSZXN1bHQzID0ge1xuICAgIG9mZmljZTogXCIyNjQzZTM5Ny00Y2Y3LTQ5NjgtODlkNS05NjA1OWJmZDBlYTZcIixcbiAgICBjYW5kaWRhdGU6IFwiYWMwYTg4OWQtNTdkMi00NDc3LTgwNWEtODBjYjIyY2YxYjNjXCIsXG4gICAgcmVzdWx0OiBcIlwiLFxufVxuXG5jb25zdCBiYWRWb3RlUmVzdWx0NCA9IHtcbiAgICBjcmVhdGVkX2J5OiBcIlwiLFxuICAgIG9mZmljZTogXCJcIixcbiAgICBjYW5kaWRhdGU6IFwiXCIsXG59XG5cbmNvbnN0IGJhZFZvdGVSZXN1bHQ1ID0ge1xuICAgIGNyZWF0ZWRfYnk6IFwiNmUyZCAgIGM2MDEtODk5MC00ZGUgIDMtYWYzMi03MTkxOGIgICA4N2EzNjMgICAgIFwiLFxuICAgIG9mZmljZTogXCIyNjQzZTM5Ny0gICA0Y2Y3LTQ5NjgtODlkNS0gIDk2MDU5YmZkMGVhNiAgICAgICAgICAgXCIsXG4gICAgY2FuZGlkYXRlOiBcImFjMGE4ODlkLSAgIDU3ZDItNDQ3Ny04MDVhLSAgODBjYjIyY2YxYjNjICAgICAgXCIsXG59XG5cblxuZXhwb3J0IHtcbiAgICBnb29kU2lnbnVwLCBnb29kTG9naW4sIGJhZFNpZ251cCwgYmFkU2lnbnVwMiwgYmFkU2lnbnVwMywgYmFkU2lnbnVwNCxiYWRTaWdudXA1LCBiYWRMb2dpbiwgYmFkTG9naW4yLCBiYWRMb2dpbjMsIGlzRW1haWwsIHRlc3RQYXJ0eSwgYmFkVGVzdFBhcnR5LFxuICAgIGJhZFRlc3RQYXJ0eTIsIGJhZFRlc3RQYXJ0eTMsIGJhZFRlc3RQYXJ0eTQsIGJhZFRlc3RQYXJ0eTUsIGJhZFRlc3RQYXJ0eTYsIGJhZFRlc3RQYXJ0eTcsIGJhZFRlc3RQYXJ0eTgsIG9mZmljZXMsIG9mZmljZXMyLCBvZmZpY2VzMywgb2ZmaWNlczQsIG9mZmljZXM1LCBcbiAgICB2b3RlMSwgdm90ZTIsIHZvdGUzLCBjYW5kaWRhdGUxLCBjYW5kaWRhdGUyLCBjYW5kaWRhdGUzLCBnb29kVm90ZVJlc3VsdCwgYmFkVm90ZVJlc3VsdDEsIGJhZFZvdGVSZXN1bHQyLCBiYWRWb3RlUmVzdWx0MywgYmFkVm90ZVJlc3VsdDQsIGJhZFZvdGVSZXN1bHQ1LFxuICAgIGNhbmRpZGF0ZTRcblxufTtcblxuIl19