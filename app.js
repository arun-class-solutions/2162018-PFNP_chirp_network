//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect(301, "/chirps");
});

//Get all chirps
app.get("/chirps", (req, res) => {
  // Step 1: Retrieve all chirps from DB
  // Step 2: Send back HTML template with chirps inside
  models.Chirp.findAll().then((chirps) => {
    res.render("index", { chirps });
  });
});

//Create new chirp
app.post("/chirps", (req, res) => {
  // Step 1: Read new chirp text from form
  // Step 2: Save chirp text to DB
  // Step 3: Redirect back to chirp list page
  models.Chirp.create(req.body).then(() => {
    res.redirect("/chirps");
  });
});

//Get specific chirp
app.get("/chirps/:id/edit", (req, res) => {
  // Step 1: Retrieve specific chirp from DB via its ID
  // Step 2: Send back edit template with specific chirp inside
  models.Chirp.findById(req.params.id).then((chirp) => {
    res.render("edit", { chirp });
  });
});

//Edit a chirp
app.put("/chirps/:id", (req, res) => {
  // Step 1: Retrieve chirp via its ID
  // Step 2: Read updated chirp text from form
  // Step 3: Perform update to record with updated chirp text
  // Step 4: Redirect back to show all chirps page
  models.Chirp.findById(req.params.id).then((chirp) => {
    chirp.updateAttributes(req.body).then(() => {
      res.redirect("/chirps");
    });
  });
});

//Delete a chirp
app.delete("/chirps/:id", (req, res) => {
  // Step 1: Retrieve specific chirp via its ID
  // Step 2: Destroy record from DB
  // Step 3: Redirect back to show all chirps page
  models.Chirp.findById(req.params.id).then((chirp) => {
    chirp.destroy().then(() => {
      res.redirect("/chirps");
    });
  });
});

app.listen(process.env.PORT || 3000);
