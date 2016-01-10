module.exports = function(app) {
	var events = require('./controllers/events');
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	  next();
	});
	app.get('/events', events.findAll);
	app.get('/events/:id', events.findById);
	app.get('/events/tag/:tag', events.findByTag);
	app.get('/events/date/:date', events.findByDate);
	app.get('/events/query/:query', events.findByQuery);
	app.post('/events', events.addEvent);
	app.put('/events/:id', events.updateEvent);
	app.delete('/events/:id', events.deleteEvent);
	app.delete('/events', events.deleteAll);
	app.get('/import', events.import)
}
