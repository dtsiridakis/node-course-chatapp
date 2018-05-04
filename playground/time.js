// UNIX EPIC jan 1st 1970 00:00:00 am

//this Number -1000 is Dec 31st 1969 23:59:59 pm
//this Number  1000 is Jan 31st 1970 00:00:01 am

var moment = require('moment');

var createdAt = 1000;

var date = moment(createdAt);

// // console.log(date.format('YYYY, MMM')); // 2018, May
// date.add(100, 'year');// This method adds stuff (manipulation section
// console.log(date.format('MMM Do YYYY')); // 2018, May

console.log(date.format('YYYY, MMM, Do, h:mm:ss a')); 
