let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

// connect to our Book Model
//let Book = require("../models/book");

let contactListController = require("../controllers/contactlist");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Route for the Contacts List page - READ Operation */
router.get("/", contactListController.displayContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", requireAuth, contactListController.addpage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", requireAuth, contactListController.addprocesspage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, contactListController.displayeditpage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, contactListController.processingeditpage);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, contactListController.deletepage);

module.exports = router;
