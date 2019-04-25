'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.candidate4 = exports.badVoteResult5 = exports.badVoteResult4 = exports.badVoteResult3 = exports.badVoteResult2 = exports.badVoteResult1 = exports.goodVoteResult = exports.candidate3 = exports.candidate2 = exports.candidate1 = exports.vote3 = exports.vote2 = exports.vote1 = exports.offices5 = exports.offices4 = exports.offices3 = exports.offices2 = exports.offices = exports.badTestParty8 = exports.badTestParty7 = exports.badTestParty6 = exports.badTestParty5 = exports.badTestParty4 = exports.badTestParty3 = exports.badTestParty2 = exports.badTestParty = exports.testParty = exports.isEmail = exports.badLogin3 = exports.badLogin2 = exports.badLogin = exports.badSignup5 = exports.badSignup4 = exports.badSignup3 = exports.badSignup2 = exports.badSignup = exports.goodLogin = exports.goodSignup = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _badSignup;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvaW5wdXRGaWVsZC5qcyJdLCJuYW1lcyI6WyJnb29kU2lnbnVwIiwiZmlyc3RuYW1lIiwibGFzdG5hbWUiLCJvdGhlcm5hbWUiLCJlbWFpbCIsInBob25lbnVtYmVyIiwicGFzc3BvcnRVcmwiLCJwYXNzd29yZCIsImJhZFNpZ251cCIsImJhZFNpZ251cDIiLCJiYWRTaWdudXAzIiwiYmFkU2lnbnVwNCIsImJhZFNpZ251cDUiLCJnb29kTG9naW4iLCJiYWRMb2dpbiIsImJhZExvZ2luMiIsImJhZExvZ2luMyIsImlzRW1haWwiLCJ0ZXN0UGFydHkiLCJuYW1lIiwiaHFhZGRyZXNzIiwibG9nb1VybCIsImJhZFRlc3RQYXJ0eSIsImJhZFRlc3RQYXJ0eTIiLCJiYWRUZXN0UGFydHkzIiwiYmFkVGVzdFBhcnR5NCIsImFjcm9ueW0iLCJiYWRUZXN0UGFydHk1IiwiYmFkVGVzdFBhcnR5NiIsImJhZFRlc3RQYXJ0eTciLCJiYWRUZXN0UGFydHk4Iiwib2ZmaWNlcyIsInR5cGUiLCJvZmZpY2VzMiIsIm9mZmljZXMzIiwib2ZmaWNlczQiLCJvZmZpY2VzNSIsInZvdGUxIiwiY3JlYXRlZF9ieSIsIm9mZmljZSIsImNhbmRpZGF0ZSIsInZvdGUyIiwidm90ZTMiLCJjYW5kaWRhdGUxIiwicGFydHkiLCJjYW5kaWRhdGUyIiwiY2FuZGlkYXRlMyIsImNhbmRpZGF0ZTQiLCJnb29kVm90ZVJlc3VsdCIsImJhZFZvdGVSZXN1bHQxIiwicmVzdWx0IiwiYmFkVm90ZVJlc3VsdDIiLCJiYWRWb3RlUmVzdWx0MyIsImJhZFZvdGVSZXN1bHQ0IiwiYmFkVm90ZVJlc3VsdDUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLGFBQVk7QUFDZEMsZUFBVyxPQURHO0FBRWRDLGNBQVUsT0FGSTtBQUdkQyxlQUFXLE9BSEc7QUFJZEMsV0FBTyx5QkFKTztBQUtkQyxpQkFBYSxhQUxDO0FBTWRDLGlCQUFhLFdBTkM7QUFPZEMsY0FBVTtB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Q25CZixnQkFBWSxFQURPO0FBRW5CQyxZQUFRLEVBRlc7QUFHbkJDLGVBQVc7QUFIUSxDQUF2Qjs7QUFNQSxJQUFNYyxpQkFBaUI7QUFDbkJoQixnQkFBWSxtREFETztBQUVuQkMsWUFBUSxzREFGVztBQUduQkMsZUFBVztBQUhRLENBQXZCOztRQVFJeEMsVSxHQUFBQSxVO1FBQVlhLFMsR0FBQUEsUztRQUFXTCxTLEdBQUFBLFM7UUFBV0MsVSxHQUFBQSxVO1FBQVlDLFUsR0FBQUEsVTtRQUFZQyxVLEdBQUFBLFU7UUFBV0MsVSxHQUFBQSxVO1FBQVlFLFEsR0FBQUEsUTtRQUFVQyxTLEdBQUFBLFM7UUFBV0MsUyxHQUFBQSxTO1FBQVdDLE8sR0FBQUEsTztRQUFTQyxTLEdBQUFBLFM7UUFBV0ksWSxHQUFBQSxZO1FBQ3JJQyxhLEdBQUFBLGE7UUFBZUMsYSxHQUFBQSxhO1FBQWVDLGEsR0FBQUEsYTtRQUFlRSxhLEdBQUFBLGE7UUFBZUMsYSxHQUFBQSxhO1FBQWVDLGEsR0FBQUEsYTtRQUFlQyxhLEdBQUFBLGE7UUFBZUMsTyxHQUFBQSxPO1FBQVNFLFEsR0FBQUEsUTtRQUFVQyxRLEdBQUFBLFE7UUFBVUMsUSxHQUFBQSxRO1FBQVVDLFEsR0FBQUEsUTtRQUNoSkMsSyxHQUFBQSxLO1FBQU9JLEssR0FBQUEsSztRQUFPQyxLLEdBQUFBLEs7UUFBT0MsVSxHQUFBQSxVO1FBQVlFLFUsR0FBQUEsVTtRQUFZQyxVLEdBQUFBLFU7UUFBWUUsYyxHQUFBQSxjO1FBQWdCQyxjLEdBQUFBLGM7UUFBZ0JFLGMsR0FBQUEsYztRQUFnQkMsYyxHQUFBQSxjO1FBQWdCQyxjLEdBQUFBLGM7UUFBZ0JDLGMsR0FBQUEsYztRQUN6SVAsVSxHQUFBQSxVIiwiZmlsZSI6ImlucHV0RmllbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnb29kU2lnbnVwID17XG4gICAgZmlyc3RuYW1lOiAnQW5heW8nLFxuICAgIGxhc3RuYW1lOiAnT2xlcnUnLFxuICAgIG90aGVybmFtZTogJ0RhdmlkJyxcbiAgICBlbWFpbDogJ2FuYXlvX29sZXJ1QG91dGxvb2suY29tJyxcbiAgICBwaG9uZW51bWJlcjogJzA3MDY5NTgzNjU0JyxcbiAgICBwYXNzcG9ydFVybDogJ0FuYXlvLmpwZycsXG4gICAgcGFzc3dvcmQ6ICcyMjMzNTYnXG59O1xuXG5jb25zdCBiYWRTaWdudXAgPXtcbiAgICBmaXJzdG5hbWU6ICdBbmF5bycsXG4gICAgbGFzdG5hbWU6ICdPbGVydScsXG4gICAgZW1haWw6ICdhbmF5b19vbGVydUBvdXRsb29rLmNvbScsXG4gICAgcGFzc3BvcnRVcmw6ICcnLFxuICAgIHBhc3N3b3JkOiAnMjIzMzU2J1xufTtcblxuY29uc3QgYmFkU2lnbnVwMiA9e1xuICAgIGZpcnN0bmFtZTogJycsXG4gICAgbGFzdG5hbWU6ICcnLFxuICAgIGxhc3RuYW1lOiAnJyxcbiAgICBlbWFpbDogJ2FuYXlvX29sZXJ1QG91dGxvb2suY29tJyxcbiAgICBwYXNzcG9ydFVybDogJ0FuYXlvLmpwZycsXG4gICAgcGFzc3dvcmQ6ICcyMjMzNTYnXG59O1xuXG5jb25zdCBiYWRTaWdudXAzID17XG4gICAgZmlyc3RuYW1lOiAnQW5heW8nLFxuICAgIGxhc3RuYW1lOiAnT2xlcnUnLFxuICAgIG90aGVybmFtZTogJ0RhdmlkJyxcbiAgICBlbWFpbDogJ2FuYXlvX29sZXJ1QG91dGxvb2suY29tJyxcbiAgICBwaG9uZW51bWJlcjogJzA3MDY5NTgzNjU0JyxcbiAgICBwYXNzcG9ydFVybDogJ0FuYXlvLmpwZycsXG4gICAgcGFzc3dvcmQ6ICcnXG59O1xuXG5jb25zdCBiYWRTaWdudXA0ID17XG4gICAgZmlyc3RuYW1lOiAnJyxcbiAgICBsYXN0bmFtZTogJycsXG4gICAgb3RoZXJuYW1lOiAnJyxcbiAgICBlbWFpbDogJycsXG4gICAgcGhvbmVudW1iZXI6ICcnLFxuICAgIHBhc3Nwb3J0VXJsOiAnJyxcbiAgICBwYXNzd29yZDogJydcbn07XG5cbmNvbnN0IGJhZFNpZ251cDUgPXtcbiAgICBmaXJzdG5hbWU6ICcgICAgJyxcbiAgICBsYXN0bmFtZTogJyAgICcsXG4gICAgb3RoZXJuYW1lOiAnICAgJyxcbiAgICBlbWFpbDogJyAgICcsXG4gICAgcGhvbmVudW1iZXI6ICcgICcsXG4gICAgcGFzc3BvcnRVcmw6ICcgICcsXG4gICAgcGFzc3dvcmQ6ICcgICdcbn07XG5cbmNvbnN0IGdvb2RMb2dpbiA9e1xuICAgIGVtYWlsOiAnYW5heW9fb2xlcnVAb3V0bG9vay5jb20nLFxuICAgIHBhc3N3b3JkOiAnbXVuYWNoaTEyMzQ1J1xufTtcblxuY29uc3QgYmFkTG9naW4gPXtcbiAgICBlbWFpbDogJ2FuYXlvX29sZXJ1b3V0bG9vay5jb20nLFxuICAgIHBhc3N3b3JkOiAnMjIzMzU2J1xufTtcblxuY29uc3QgYmFkTG9naW4yID17XG4gICAgZW1haWw6ICdhbmF5b19vbGVydUBvdXRsb29rLmNvbScsXG4gICAgcGFzc3dvcmQ6ICcnXG59O1xuXG5jb25zdCBiYWRMb2dpbjMgPXtcbiAgICBlbWFpbDogJyAgICAgJyxcbiAgICBwYXNzd29yZDogJyAgICAnXG59O1xuXG5jb25zdCBpc0VtYWlsID17XG4gICAgZW1haWw6ICdhbmF5b19vbGVydUBvdXRsb29rLmNvbScsXG4gICAgcGFzc3dvcmQ6ICcyMjMzNTYnXG59O1xuXG5jb25zdCB0ZXN0UGFydHkgPXtcbiAgICBuYW1lOiAnQWN0aW9uIGNvbmdyZXNzIE5pZ2VyaWEnLFxuICAgIGhxYWRkcmVzczogJ1doaXRlIEhvdXNlIDIyIEFidWphJyxcbiAgICBsb2dvVXJsOiAnaHR0cHM6Ly9BQ04uanBnJ1xufTtcblxuY29uc3QgYmFkVGVzdFBhcnR5ID17XG4gICAgbmFtZTogJycsXG4gICAgaHFhZGRyZXNzOiAnV2hpdGUgSG91c2UgMjIgQWJ1amEnLFxuICAgIGxvZ29Vcmw6ICdodHRwczovL2FjLmpwZydcbn07XG5cbmNvbnN0IGJhZFRlc3RQYXJ0eTIgPXtcbiAgICBuYW1lOiAnQWN0aW9uIGNvbmdyZXNzJyxcbiAgICBocWFkZHJlc3M6ICcnLFxuICAgIGxvZ29Vcmw6ICdodHRwczovL2FjLmpwZydcbn07XG5cbmNvbnN0IGJhZFRlc3RQYXJ0eTMgPXtcbiAgICBuYW1lOiAnQWN0aW9uIGNvbmdyZXNzJyxcbiAgICBocWFkZHJlc3M6ICdXaGl0ZSBIb3VzZSAyMiBBYnVqYScsXG4gICAgbG9nb1VybDogJydcbn07XG5cblxuY29uc3QgYmFkVGVzdFBhcnR5NCA9e1xuICAgIG5hbWU6ICcnLFxuICAgIGFjcm9ueW06ICcnLFxuICAgIGhxYWRkcmVzczogJycsXG59O1xuXG5jb25zdCBiYWRUZXN0UGFydHk1ID17XG4gICAgbmFtZTogJzMzNDQnLFxuICAgIGhxYWRkcmVzczogJ0FidWphIDI0IGhvdXNlIEFiaWtvcm9taScsXG4gICAgbG9nb1VybDogJ2h0dHBzOi8vYWMuanBnJ1xufTtcblxuY29uc3QgYmFkVGVzdFBhcnR5NiA9e1xuICAgIG5hbWU6ICdBY3Rpb24gY29uZ3Jlc3MnLFxuICAgIGhxYWRkcmVzczogJ0FidWphIDI0IGhvdXNlIEFiaWtvcm9taScsXG4gICAgbG9nb1VybDogJ3R0Yydcbn07XG5cbmNvbnN0IGJhZFRlc3RQYXJ0eTc9e1xuICAgIG5hbWU6ICdqb2huIGNvbmdyZXNzJyxcbiAgICBocWFkZHJlc3M6ICdgYGAnLFxuICAgIGxvZ29Vcmw6ICdodHRwczovL2FjLmpwZydcbn07XG5cbmNvbnN0IGJhZFRlc3RQYXJ0eTg9e1xuICAgIG5hbWU6ICdBY3Rpb24gY29uZ3Jlc3MnLFxuICAgIGhxYWRkcmVzczogJzc3NycsXG4gICAgbG9nb1VybDogJ2h0dHBzOi8vYWMuanBnJ1xufTtcblxuY29uc3Qgb2ZmaWNlcyA9e1xuICAgIHR5cGU6ICdGZWRlcmFsJyxcbiAgICBuYW1lOiAnUHJlc2lkZW50J1xufTtcblxuY29uc3Qgb2ZmaWNlczIgPXtcbiAgICB0eXBlOiAnJyxcbiAgICBuYW1lOiAnUHJlc2lkZW50J1xufTtcblxuY29uc3Qgb2ZmaWNlczMgPXtcbiAgICB0eXBlOiAnRmVkZXJhbCcsXG4gICAgbmFtZTogJydcbn07XG5cbmNvbnN0IG9mZmljZXM0ID17XG4gICAgdHlwZTogJycsXG4gICAgbmFtZTogJydcbn07XG5cbmNvbnN0IG9mZmljZXM1ID17XG4gICAgdHlwZTogJzg5MDcnLFxuICAgIG5hbWU6ICcyMzQ1Nidcbn07XG5cbmNvbnN0IHZvdGUxID0ge1xuICAgICAgICBjcmVhdGVkX2J5OiBcIiBcIixcbiAgICAgICAgb2ZmaWNlOiBcIjI2NDNlMzk3LTRjZjctNDk2OC04OWQ1LTk2MDU5YmZkMGVhNlwiLFxuICAgICAgICBjYW5kaWRhdGU6IFwiYWMwYTg4OWQtNTdkMi00NDc3LTgwNWEtODBjYjIyY2YxYjNjXCJcbn1cblxuY29uc3Qgdm90ZTIgPSB7XG4gICAgY3JlYXRlZF9ieTogXCI0YmRjNzE5ZS0yMmMyLTRmY2MtYTA4NS1hNTFiZTU2ZjM0ZTlcIixcbiAgICBvZmZpY2U6IFwiIFwiLFxuICAgIGNhbmRpZGF0ZTogXCJhYzBhODg5ZC01N2QyLTQ0NzctODA1YS04MGNiMjJjZjFiM2NcIlxufVxuXG5jb25zdCB2b3RlMyA9IHtcbiAgICBjcmVhdGVkX2J5OiBcIjRiZGM3MTllLTIyYzItNGZjYy1hMDg1LWE1MWJlNTZmMzRlOVwiLFxuICAgIG9mZmljZTogXCIyNjQzZTM5Ny00Y2Y3LTQ5NjgtODlkNS05NjA1OWJmZDBlYTZcIixcbiAgICBjYW5kaWRhdGU6IFwiXCJcbn1cblxuY29uc3QgY2FuZGlkYXRlMSA9IHtcbiAgICBvZmZpY2U6IFwiXCIsXG4gICAgcGFydHk6IFwiODM1NjE1MWQtYWNhZi00MGQ2LTljZDgtNDIwN2UzODYxMDhlXCIsXG4gICAgY2FuZGlkYXRlOiBcImFjMGE4ODlkLTU3ZDItNDQ3Ny04MDVhLTgwY2IyMmNmMWIzY1wiXG59XG5cbmNvbnN0IGNhbmRpZGF0ZTIgPSB7XG4gICAgb2ZmaWNlOiBcIjI2NDNlMzk3LTRjZjctNDk2OC04OWQ1LTk2MDU5YmZkMGVhNlwiLFxuICAgIHBhcnR5OiBcIlwiLFxuICAgIGNhbmRpZGF0ZTogXCJhYzBhODg5ZC01N2QyLTQ0NzctODA1YS04MGNiMjJjZjFiM2NcIlxufVxuXG5jb25zdCBjYW5kaWRhdGUzID0ge1xuICAgIG9mZmljZTogXCIyNjQzZTM5Ny00Y2Y3LTQ5NjgtODlkNS05NjA1OWJmZDBlYTZcIixcbiAgICBwYXJ0eTogXCI4MzU2MTUxZC1hY2FmLTQwZDYtOWNkOC00MjA3ZTM4NjEwOGVcIixcbiAgICBjYW5kaWRhdGU6IFwiXCJcbn1cblxuY29uc3QgY2FuZGlkYXRlNCA9IHtcbiAgICBvZmZpY2U6IFwiMjY0M2UzOTctNGNmNy00OTY4LTg5ZDUtOTYwNTliZmQwZWE2XCIsXG4gICAgcGFydHk6IFwiODM1NjE1MWQtYWNhZi00MGQ2LTljZDgtNDIwN2UzODYxMDhlXCIsXG4gICAgY2FuZGlkYXRlOiBcImFjMGE4ODlkLTU3ZDItNDQ3Ny04MDVhLTgwY2IyMmNmMWIzY1wiXG59XG5cbmNvbnN0IGdvb2RWb3RlUmVzdWx0ID0ge1xuICAgIGNyZWF0ZWRfYnk6IFwiYTU5MzQyNTYtZWExYi00NzZjLWFmOWEtYjJhYjRjNTUxMmI2XCIsXG4gICAgb2ZmaWNlOiBcImZkMTY0OGI5LTMyZGQtNDAyYS1iMmZlLTk4YzlkZjFjNTg1Y1wiLFxuICAgIGNhbmRpZGF0ZTogXCI3YzAxYjQzZC1lOTExLTRhNmYtOGNjMC0xZDVjOGMxNjUwMWRcIixcbn1cbi8vIG9mZmljZSBub3QgZm91bmRcbmNvbnN0IGJhZFZvdGVSZXN1bHQxID0ge1xuICAgIG9mZmljZTogXCIgXCIsXG4gICAgY2FuZGlkYXRlOiBcImFjMGE4ODlkLTU3ZDItNDQ3Ny04MDVhLTgwY2IyMmNmMWIzY1wiLFxuICAgIHJlc3VsdDogXCIyM1wiLFxufVxuXG5jb25zdCBiYWRWb3RlUmVzdWx0MiA9IHtcbiAgICBvZmZpY2U6IFwiMjY0M2UzOTctNGNmNy00OTY4LTg5ZDUtOTYwNTliZmQwZWE2XCIsXG4gICAgY2FuZGlkYXRlOiBcIlwiLFxuICAgIHJlc3VsdDogXCIyM1wiLFxufVxuXG5jb25zdCBiYWRWb3RlUmVzdWx0MyA9IHtcbiAgICBvZmZpY2U6IFwiMjY0M2UzOTctNGNmNy00OTY4LTg5ZDUtOTYwNTliZmQwZWE2XCIsXG4gICAgY2FuZGlkYXRlOiBcImFjMGE4ODlkLTU3ZDItNDQ3Ny04MDVhLTgwY2IyMmNmMWIzY1wiLFxuICAgIHJlc3VsdDogXCJcIixcbn1cblxuY29uc3QgYmFkVm90ZVJlc3VsdDQgPSB7XG4gICAgY3JlYXRlZF9ieTogXCJcIixcbiAgICBvZmZpY2U6IFwiXCIsXG4gICAgY2FuZGlkYXRlOiBcIlwiLFxufVxuXG5jb25zdCBiYWRWb3RlUmVzdWx0NSA9IHtcbiAgICBjcmVhdGVkX2J5OiBcIjZlMmQgICBjNjAxLTg5OTAtNGRlICAzLWFmMzItNzE5MThiICAgODdhMzYzICAgICBcIixcbiAgICBvZmZpY2U6IFwiMjY0M2UzOTctICAgNGNmNy00OTY4LTg5ZDUtICA5NjA1OWJmZDBlYTYgICAgICAgICAgIFwiLFxuICAgIGNhbmRpZGF0ZTogXCJhYzBhODg5ZC0gICA1N2QyLTQ0NzctODA1YS0gIDgwY2IyMmNmMWIzYyAgICAgIFwiLFxufVxuXG5cbmV4cG9ydCB7XG4gICAgZ29vZFNpZ251cCwgZ29vZExvZ2luLCBiYWRTaWdudXAsIGJhZFNpZ251cDIsIGJhZFNpZ251cDMsIGJhZFNpZ251cDQsYmFkU2lnbnVwNSwgYmFkTG9naW4sIGJhZExvZ2luMiwgYmFkTG9naW4zLCBpc0VtYWlsLCB0ZXN0UGFydHksIGJhZFRlc3RQYXJ0eSxcbiAgICBiYWRUZXN0UGFydHkyLCBiYWRUZXN0UGFydHkzLCBiYWRUZXN0UGFydHk0LCBiYWRUZXN0UGFydHk1LCBiYWRUZXN0UGFydHk2LCBiYWRUZXN0UGFydHk3LCBiYWRUZXN0UGFydHk4LCBvZmZpY2VzLCBvZmZpY2VzMiwgb2ZmaWNlczMsIG9mZmljZXM0LCBvZmZpY2VzNSwgXG4gICAgdm90ZTEsIHZvdGUyLCB2b3RlMywgY2FuZGlkYXRlMSwgY2FuZGlkYXRlMiwgY2FuZGlkYXRlMywgZ29vZFZvdGVSZXN1bHQsIGJhZFZvdGVSZXN1bHQxLCBiYWRWb3RlUmVzdWx0MiwgYmFkVm90ZVJlc3VsdDMsIGJhZFZvdGVSZXN1bHQ0LCBiYWRWb3RlUmVzdWx0NSxcbiAgICBjYW5kaWRhdGU0XG5cbn07XG5cbiJdfQ==