const goodSignup ={
    firstname: 'Anayo',
    lastname: 'Oleru',
    othername: 'David',
    email: 'anayo_oleru@outlook.com',
    phonenumber: '07069583654',
    passportUrl: 'Anayo.jpg',
    password: '223356'
};

const badSignup ={
    firstname: 'Anayo',
    lastname: 'Oleru',
    email: 'anayo_oleru@outlook.com',
    passportUrl: '',
    password: '223356'
};

const badSignup2 ={
    firstname: '',
    lastname: '',
    lastname: '',
    email: 'anayo_oleru@outlook.com',
    passportUrl: 'Anayo.jpg',
    password: '223356'
};

const badSignup3 ={
    firstname: 'Anayo',
    lastname: 'Oleru',
    othername: 'David',
    email: 'anayo_oleru@outlook.com',
    phonenumber: '07069583654',
    passportUrl: 'Anayo.jpg',
    password: ''
};

const goodLogin ={
    email: 'anayo_oleruoutlook.com',
    password: '223356'
};

const badLogin ={
    email: 'anayo_oleruoutlook.com',
    password: '223356'
};

const badLogin2 ={
    email: 'anayo_oleru@outlook.com',
    password: ''
};

const badLogin3 ={
    email: '',
    password: ''
};

const isEmail ={
    email: 'anayo_oleru@outlook.com',
    password: '223356'
};

const testParty ={
    name: 'Action congress',
    acronym: 'AC',
    hqAddress: 'White House 22 Abuja',
    logoUrl: 'apc.jpg'
};

const badTestParty ={
    name: '#$',
    acronym: 'AC',
    hqAddress: 'White House 22 Abuja',
    logoUrl: 'apc'
};

const badTestParty2 ={
    name: 'Action Congress',
    acronym: 'AC',
    hqAddress: '',
    logoUrl: 'apc.jpeg'
};

const badTestParty3 ={
    name: 'Action Congress',
    acronym: 'AC',
    hqAddress: 'White House 22 Abuja',
    logoUrl: ''
};

const badTestParty4 ={
    name: '',
    acronym: '',
    hqAddress: '',
    logoUrl: ''
};

const offices ={
    type: 'Federal',
    name: 'President'
};

const offices2 ={
    type: '',
    name: 'President'
};

const offices3 ={
    type: 'Federal',
    name: ''
};

const vote1 = {
        created_by: " ",
        office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
        candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
}

const vote2 = {
    created_by: "4bdc719e-22c2-4fcc-a085-a51be56f34e9",
    office: " ",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
}

const vote3 = {
    created_by: "4bdc719e-22c2-4fcc-a085-a51be56f34e9",
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    candidate: ""
}


export {
    goodSignup, goodLogin, badSignup, badSignup2, badSignup3, badLogin, badLogin2, badLogin3, isEmail, testParty, badTestParty,
    badTestParty2, badTestParty3, badTestParty4, offices, offices2, offices3,
    vote1, vote2, vote3
};

