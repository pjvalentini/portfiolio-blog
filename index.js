const express = require("express");
const parser = require("body-parser");
const app = express();
// var articles;

// parses data with the content type of the application JSON
app.use(parser.urlencoded({ extended:false }));
app.use(parser.json());

// middleware to serve static assets.
app.use(express.static('public'));

// Sets the view engine to ejs
app.set("view engine", "ejs");

const articlesController = require('./controllers/articles');

// Index page route setup
app.get("/", (req, res) => {
	// Render index.ejs page
	res.render("index");
});

// About Page route setup
app.get("/about", (req, res) => {
	// Render index.ejs page
	res.render("about");
});

// Contact Page route setup
app.get("/contact", (req, res) => {
	// Render index.ejs page
	res.render("contact");
});

// blog homepage
app.get('/bloghome', articlesController.get);

// blog post page
app.get("/blogpost/:id", articlesController.show);


// This is a catch....
app.get('*', function(req, res) {
	res.status(404).send('Page not found!');
});

const server = app.listen(3000, () => {
	console.log('server started on port', server.address().port);
});
