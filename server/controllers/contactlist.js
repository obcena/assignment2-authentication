let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let List = require("../models/contactlist");

module.exports.displayContactList = (req, res, next) => {
  List.find((err, contactlist) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(bookList);

      res.render("contactlist/list", { title: "Contacts", ContactList: contactlist });
      //render book.ejs and pass title and Booklist variable we are passing bookList object to BookList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("contactlist/add", {
    title: "Add Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newList = List({
    Name: req.body.Name,
    ContactNumber: req.body.ContactNumber,
    Email: req.body.Email,

  });
  List.create(newList, (err, contactlist) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact list
      res.redirect("/contact-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {  
  let id = req.params.id; //id of actual object

  List.findById(id, (err, listtoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("contactlist/edit", { title: "Edit contactlist", list: listtoedit });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatebook = List({
    _id: id,
    Name: req.body.Name,
    ContactNumber: req.body.ContactNumber,
    Email: req.body.Email,
  });
  List.updateOne({ _id: id }, updatebook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/contact-list"); //<!-- ad-->
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  List.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book list
      res.redirect("/contact-list");
    }
  });
};
