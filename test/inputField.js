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

const badSignup4 ={
    firstname: '',
    lastname: '',
    othername: '',
    email: '',
    phonenumber: '',
    passportUrl: '',
    password: ''
};

const badSignup5 ={
    firstname: '    ',
    lastname: '   ',
    othername: '   ',
    email: '   ',
    phonenumber: '  ',
    passportUrl: '  ',
    password: '  '
};

const goodLogin ={
    email: 'anayo_oleru@outlook.com',
    password: 'munachi12345'
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
    email: '     ',
    password: '    '
};

const isEmail ={
    email: 'anayo_oleru@outlook.com',
    password: '223356'
};

const testParty ={
    name: 'Action congress Nigeria',
    hqaddress: 'White House 22 Abuja',
    logoUrl: 'https://ACN.jpg'
};

const badTestParty ={
    name: '',
    hqaddress: 'White House 22 Abuja',
    logoUrl: 'https://ac.jpg'
};

const badTestParty2 ={
    name: 'Action congress',
    hqaddress: '',
    logoUrl: 'https://ac.jpg'
};

const badTestParty3 ={
    name: 'Action congress',
    hqaddress: 'White House 22 Abuja',
    logoUrl: ''
};


const badTestParty4 ={
    name: '',
    acronym: '',
    hqaddress: '',
};

const badTestParty5 ={
    name: '3344',
    hqaddress: 'Abuja 24 house Abikoromi',
    logoUrl: 'https://ac.jpg'
};

const badTestParty6 ={
    name: 'Action congress',
    hqaddress: 'Abuja 24 house Abikoromi',
    logoUrl: 'ttc'
};

const badTestParty7={
    name: 'john congress',
    hqaddress: '```',
    logoUrl: 'https://ac.jpg'
};

const badTestParty8={
    name: 'Action congress',
    hqaddress: '777',
    logoUrl: 'https://ac.jpg'
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

const offices4 ={
    type: '',
    name: ''
};

const offices5 ={
    type: '8907',
    name: '23456'
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

const candidate1 = {
    office: "",
    party: "8356151d-acaf-40d6-9cd8-4207e386108e",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
}

const candidate2 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    party: "",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
}

const candidate3 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    party: "8356151d-acaf-40d6-9cd8-4207e386108e",
    candidate: ""
}

const candidate4 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    party: "8356151d-acaf-40d6-9cd8-4207e386108e",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c"
}

const goodVoteResult = {
    created_by: "a5934256-ea1b-476c-af9a-b2ab4c5512b6",
    office: "fd1648b9-32dd-402a-b2fe-98c9df1c585c",
    candidate: "7c01b43d-e911-4a6f-8cc0-1d5c8c16501d",
}
// office not found
const badVoteResult1 = {
    office: " ",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c",
    result: "23",
}

const badVoteResult2 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    candidate: "",
    result: "23",
}

const badVoteResult3 = {
    office: "2643e397-4cf7-4968-89d5-96059bfd0ea6",
    candidate: "ac0a889d-57d2-4477-805a-80cb22cf1b3c",
    result: "",
}

const badVoteResult4 = {
    created_by: "",
    office: "",
    candidate: "",
}

const badVoteResult5 = {
    created_by: "6e2d   c601-8990-4de  3-af32-71918b   87a363     ",
    office: "2643e397-   4cf7-4968-89d5-  96059bfd0ea6           ",
    candidate: "ac0a889d-   57d2-4477-805a-  80cb22cf1b3c      ",
}


export {
    goodSignup, goodLogin, badSignup, badSignup2, badSignup3, badSignup4,badSignup5, badLogin, badLogin2, badLogin3, isEmail, testParty, badTestParty,
    badTestParty2, badTestParty3, badTestParty4, badTestParty5, badTestParty6, badTestParty7, badTestParty8, offices, offices2, offices3, offices4, offices5, 
    vote1, vote2, vote3, candidate1, candidate2, candidate3, goodVoteResult, badVoteResult1, badVoteResult2, badVoteResult3, badVoteResult4, badVoteResult5,
    candidate4

};

