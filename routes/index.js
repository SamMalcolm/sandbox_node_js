var express = require('express');
var router = express.Router();

/* GET home page. */

router.post("/openid", (req, res) => {
	let payload = {};
	payload.redirect_uri = "https://sandbox-node-js.herokuapp.com/redirect";
	payload.client_id = "10000000000004";
	payload.login_hint = req.body.login_hint;
	payload.state = "nr147";

	var options = {
		'method': 'POST',
		'url': 'https://localhost:3000/api/lti/authorize_redirect',
		formData: payload
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
		console.log(response.body);
	});

	res.render('index', { title: req.path });


})

router.get('*', function (req, res, next) {
	console.log(req.method);
	console.log(req.path);
	console.log("body")
	console.log(req.body);
	console.log("params")
	console.log(req.params);
	res.render('index', { title: req.path });
});


router.post('*', function (req, res, next) {
	console.log(req.method);
	console.log(req.path);
	console.log("body")
	console.log(req.body);
	console.log("params")
	console.log(req.params);
	res.render('index', { title: req.path });
});


module.exports = router;
