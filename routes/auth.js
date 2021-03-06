const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const USER_NOT_LOGGED_IN = 'User%20Not%20Logged%20In'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	This route file handles all user auth requests: registration,
	login, logout and currentuser. In addition, it handles update
	requests when the current user changes profile information.
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


router.post('/register', (req, res) => {
	turbo.createUser(req.body)
	.then(data => {
		req.vertexSession.user = {id: data.id} // set session. this logs the user in for future sessions.
		res.redirect('/dashboard') // redirect to dashboard page on successful registration
	})
	.catch(err => {
		res.redirect('/error?message=' + err.message) // registration failed, go back to error page
	})
})

router.post('/login', (req, res) => {
	turbo.login(req.body)
	.then(data => {
		req.vertexSession.user = {id: data.id} // set session. this logs the user in for future sessions.
		res.redirect('/dashboard') // redirect to dashboard page on successful login
	})
	.catch(err => {
		res.redirect('/error?message=' + err.message) // login failed, go back to error page
	})
})

router.post('/update', (req, res) => {
	if (req.vertexSession == null){ // user not logged in, prevent update
		res.redirect('/error?message=' + USER_NOT_LOGGED_IN)
		return
	}

	if (req.vertexSession.user == null){ // user not logged in
		res.redirect('/error?message=' + USER_NOT_LOGGED_IN)
		return
	}

	if (req.body.id != req.vertexSession.user.id){ // user ID's don't match, unauthorized
		res.redirect('/error?message=Not%20Authorized')
		return
	}

	turbo.updateEntity('user', req.body.id, req.body)
	.then(data => {
		res.redirect('/dashboard')
	})
	.catch(err => {
		res.redirect('/error?message=' + err.message)
	})
})

router.get('/currentuser', (req, res) => {
	if (req.vertexSession == null){ // user not logged in
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}

	if (req.vertexSession.user == null){ // user not logged in
		res.json({
			confirmation: 'success',
			user: null
		})
		return
	}

	turbo.fetchOne('user', req.vertexSession.user.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			user: data
		})		
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/logout', (req, res) => {
	req.vertexSession.reset()
	res.redirect('/')
})

module.exports = router
