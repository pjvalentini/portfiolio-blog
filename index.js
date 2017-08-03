const express = require("express");
const parser = require("body-parser");
const app = express();

// parses data with the content typ of the application JSON
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

app.get('/articles', articlesController.get);

// blog home page
app.get("/bloghome", (req, res) => {
	// Render bloghome.ejs with the list of posts
	res.render("bloghome");
});

// blog post page
app.get("/blogpost/:id", (req, res) => {
	// Find the article in the articles.json file.
		 const article = articles.filter((article) => {
			return article.id == req.params.id; // eslint-disable-line
		});
	// render the blogpost.ejs template with the articles content
	res.render("blogpost", {
		img: article[0].img,
		author: article[0].author,
		title: article[0].title,
		body: article[0].body,
	});
});


// This is a catch....
app.get('*', function(req, res) {
	res.status(404).send('Page not found!');
});

const server = app.listen(3000, () => {
	console.log('server started on port', server.address().port);
});
