var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', function (req, res, next) {
	console.log(req.method);
	console.log(req.path);
	console.log("body")
	console.log(req.body);
	console.log("params")
	console.log(req.params);
	res.render('index', { title: 'Express' });
});


router.post('*', function (req, res, next) {
	console.log(req.method);
	console.log(req.path);
	console.log("body")
	console.log(req.body);
	console.log("params")
	console.log(req.params);
	res.render('index', { title: 'Express' });
});


module.exports = router;
