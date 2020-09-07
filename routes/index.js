var express = require('express');
var router = express.Router();
const request = require('request');

router.post("/openid", (req, res) => {
	console.log(req.method);
	console.log(req.path);
	console.log("body")
	console.log(req.body);
	console.log("params")
	console.log(req.params);
	let payload = {};
	payload.redirect_uri = "https://sandbox-node-js.herokuapp.com/redirect";
	payload.client_id = "115150000000000151";
	payload.login_hint = req.body.login_hint;
	payload.state = "nr147";
	payload.lti_message_hint = req.body.lti_message_hint;

	const qs = Object.keys(payload)
		.map(key => `${key}=${payload[key]}`)
		.join('&');

	// print query string
	res.redirect('https://rmit-lab.instructure.com/api/lti/authorize_redirect?' + qs)


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
