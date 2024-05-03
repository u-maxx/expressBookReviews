const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    let usersWithSameName = users.filter((user) => {
        return user.username === username
      });
      if (usersWithSameName.length === 0) {
        return true;
      } else {
        return false;
      }
}

const authenticatedUser = (username, password) => {
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password)
      });
      if (validusers.length > 0) {
        return true;
      } else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60*60 });
  
        req.session.authorization = { accessToken, username };
        return res.status(200).json({message: `User ${username} successfully logged in`});
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    if (!books[isbn]) {
        return res.status(404).json({message: "Invalid ISBN"});
    }
    const newReviewText = req.query.text;
    const currentUser = req.session.authorization.username;
   
    if (!books[isbn].reviews[currentUser]) {
        books[isbn].reviews[currentUser] = {"text": newReviewText};                                
        return res.status(200).json({message: `Review from ${currentUser} added`});
    } else {
        books[isbn].reviews[currentUser].text = newReviewText;                                
        return res.status(200).json({message: `Review from ${currentUser} updated`});
    }
});

//delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    if (!books[isbn]) {
        return res.status(404).json({message: "Invalid ISBN"});
    }
    const currentUser = req.session.authorization.username;
    if (!books[isbn].reviews[currentUser]) {
        return res.status(404).json({message: `Review from ${currentUser} not found`});
    } else {
        delete books[isbn].reviews[currentUser];
        return res.status(200).json({message: `Review from ${currentUser} deleted`});
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
