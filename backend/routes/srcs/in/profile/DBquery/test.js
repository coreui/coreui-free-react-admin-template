const getPrivate = require("./getPrivate");
const getPublic = require("./getPublic");
const search = require("./searchOr");
const update = require("./update");
const fakeObj = {
    account:{data:"b07901029",show:true},
    username:{data:"陳君輔",show:false},
    education:{
        major:{
            SD:"NTUEE",
            Note:"三年",
            show:true
        },
        master:{
            SD:"Stanford",
            Note:"二年",
            show:false
        }
    },
    Occupation:[
        {O:"1",P:"2",C:"3",show:true},
        {O:"2",P:"3",C:"4",show:false},
    ]
}

const fakeSearch = {};
fakeSearch.body = {
    account:"b07901029",
    education:{
        major:"EE"
    },
    "education.master":"Stanford",
    Occupation:{
        O:"1"
    }
}

const fakeUpdate = {}
fakeUpdate.body={
    account:{data:"b07901029"},
    username:{data:""},
    "nickname.data":"tofu",
    "education.master.show":true,
    education:{
        major:{SD:""}
    },
    Occupation:[
        {O:"1",P:"2",C:"3",show:true}
    ]
}

// console.log(getPrivate(fakeObj));
// console.log(getPublic(fakeObj));
// console.log(search(fakeSearch))
console.log(update(fakeUpdate));