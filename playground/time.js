const moment = require('moment');

// const date = new Date()
//
// const string = date.toString();
// const getTime = date.getTime();
//
// console.log(string);
// console.log(getTime);
var timeStamp = moment().valueOf();
const date = moment();
console.log(date.format('LT'));
console.log(timeStamp);
