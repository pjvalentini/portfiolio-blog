const jsonfile = require('jsonfile');
// console.log(jsonfile);

const get = function(callback) {
	jsonfile.readFile('./models/articles.json', callback);
};

// GET 1 ARTICLE BY ID
const getArticleById = function(id, callback) {
	get((err, list) => {
		callback(err, list.filter(function(article) {
			return article.id === id;
		}).pop());
	});
};

module.exports.get = get;
module.exports.getArticleById = getArticleById;
