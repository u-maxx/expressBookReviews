const axios = require('axios');
const makeRequestAndLogResult = (url) =>{
    console.log(`Starting GET reuqest to ${url}`);
    const req = axios.get(url);
    req.then(res => {
        console.log(`Response from GET reuqest to ${url}`);
        console.log(res.data);
    })
    .catch(err => {
        console.log(`Error from GET reuqest to ${url}`);
        console.log(err.toString())
    });
}

console.log("Before Task 10")
//getting the list of books available in the shop via Promise using Axios
makeRequestAndLogResult('http://localhost:5000/');
console.log("After Task 10")

console.log("Before Task 11")
//getting the book details based on ISBN via Promise using Axios
makeRequestAndLogResult('http://localhost:5000/isbn/1');
console.log("After Task 11")

console.log("Before Task 12")
//getting the book details based on Author via Promise using Axios
makeRequestAndLogResult('http://localhost:5000/author/Unknown');
console.log("After Task 12")

console.log("Before Task 13")
//getting the book details based on Title via Promise using Axios
makeRequestAndLogResult('http://localhost:5000/title/The Book Of Job');
console.log("After Task 13")