const express = require("express");
const parser = require("body-parser");
const app = express();

// parses data with the content typ of the application JSON
app.use(parser.urlencoded({ extended:false }));

const posts = [
	{
		id: 1,
		author: 'John Doe',
		title: 'Templating with EJS',
		body: 'Blog post number 1',
	},
	{
		id: 2,
		author: 'Jane Doe',
		title: 'Express: How to make apps with Express',
		body: 'Blog post number 2',
	},
	{
		id: 3,
		author: 'PJ Valentini',
		title: 'How to code like a beginner',
		body: 'Blog post number 3',
	},
	{
		id: 4,
		author: 'Cody Johnson',
		title: 'Event Emitters',
		body: 'Blog post number 4',
	},
];

// Sets the view engine to ejs
app.set("view engine", "ejs");

// blog home page
app.get("/bloghome", (req, res) => {
	// Render bloghome.ejs with the list of posts
	res.render("bloghome", { posts: posts });
});

// blog post page
app.get("/blogpost/:id", (req, res) => {
	// Find the post in the posts array
	const post = posts.filter((post) => {
		return post.id === req.params.id;
	})[0];

	// render the `post.ejs` template with the post content
	res.render("blogpost", {
		author: post.author,
		title: post.title,
		body: post.body,
	});
});


// This is a catch....
app.get('*', function(request, response) {
	response.status(404).send('Page not found!');
});

const server = app.listen(3000, () => {
	console.log('server started on port', server.address().port);
});
