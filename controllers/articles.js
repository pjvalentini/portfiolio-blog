const articles = require('../models/articles');
const defaultMessage = 'Sorry, cannot find that article.';
console.log(articles);

// (Get) a list of articles from the model
module.exports.get = function(request, response) {
	articles.get(function(err, list) {
		console.log(list);
		if (err) {
			const message = err.errno === -2 ? defaultMessage : 'Try again later';
			return response.render('404', { message: message });
		 }
		response.render('bloghome', { articles : list });
	});
};

module.exports.show = function(request, response) {
	const id = request.params.id;

	if (!id) {
		return response.render('404', { message: defaultMessage });
	}

	// use parseInt to convert a string to a number.
	articles.getArticleById(parseInt(id), function(err, article) { // eslint-disable-line
		// here we handle the error passed through in the model.
		if (err) {
			const message = err.errno === -2 ? defaultMessage : 'Try again later';
			return response.render('404', { message: message });
		}

		if (!article || article.length === 0) {
			return response.render('404', { message: defaultMessage });
		}

		response.render('blogpost', {
			article: article,
			title: article.title,
		});
	});
};
