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
	payload.scope = "openid";
	payload.response_type = "id_token";
	payload.response_mode = "form_post";
	payload.nonce = "nr147";
	payload.prompt = "none";

	const qs = Object.keys(payload)
		.map(key => `${key}=${payload[key]}`)
		.join('&');

	// print query string
	res.redirect('https://rmit-lab.instructure.com/api/lti/authorize_redirect?' + qs)


})

router.post("/redirect", (req, res) => {

	res.redirect('https://rmit-lab.instructure.com/login/oauth2/auth?client_id=115150000000000152&response_type=code&state=YYY&redirect_uri=https://sandbox-node-js.herokuapp.com/oauth')

})
router.get("/redirect_local", (req, res) => {

	res.redirect('https://rmit-lab.instructure.com/login/oauth2/auth?client_id=115150000000000152&response_type=code&state=YYY&redirect_uri=https://sandbox-node-js.herokuapp.com/oauth')

})

const getFiles = (access_token, course_id) => {
	return new Promise((resolve, reject) => {
		let options = {
			"method": "GET",
			"url": "https://rmit-lab.instructure.com/api/v1/courses" + course_id + "/files",
			"headers": {
				"Authorization": "Bearer " + access_token
			}
		}
		request(options, (err, response, body) => {
			if (err) {
				console.log(err);
			} else {
				console.log(body);
				resolve(body);
			}
		})
	})
}

router.get("/oauth", (req, res) => {
	let payload = {};
	payload.code = req.query.code;
	payload.grant_type = "authorization_code";
	payload.client_id = "115150000000000152"
	payload.client_secret = "Fhe4wMMOddTe3X47Lz4goFokxkrG5tRGsFrI55PiPRcwp22w2q4nx5RTEpWBxKTq";
	payload.redirect_uri = "https://sandbox-node-js.herokuapp.com/oauth";
	var options = {
		'method': 'POST',
		'url': 'https://rmit-lab.instructure.com/login/oauth2/token',
		formData: payload
	};
	request(options, async (err, response, body) => {
		if (err) {
			console.log(err);
		} else {
			let data = JSON.parse(response.body);
			let files = [];
			console.log(data.access_token);
			files = await getFiles(data.access_token, "485")
			console.log(files);
			res.render('index', { title: req.path, files: files });
		}
	});
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
