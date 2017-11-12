var mongoose = require('mongoose');
var Event = mongoose.model('Event');

exports.findAll = function(req, res) {
	Event.find({}, function(err, results){
		return res.send(results);
	});
};

exports.findById = function(req, res) {
	var id = req.params.id;

	Event.findOne({'_id':id}, function(err, result){
		return res.send(result);
	});
};

exports.findByTag = function(req, res) {
	var tag = req.params.tag;

	Event.find({'tags':tag}, function(err, results){
		return res.send(results);
	});
};

exports.findByDate = function(req, res) {
	// Expect date of form: 'yyyy-mm-ddThh:mm:ss'
	var date = new Date(req.params.date);
	var dayAfter = new Date(date.toString());
	dayAfter.setDate(date.getDate()+1);

	// Find events whose 'start' or 'end' is greater than 'date' and less than 'dayAfter'
	Event.find({$or :[
			{'start': {'$gte': date, '$lt': dayAfter}},
			{'end': {'$gte': date, '$lt': dayAfter}}
		]}, function(err, results){
		return res.send(results);
	});
};

exports.findByQuery = function(req, res) {
	var query = req.params.query

	Event.find({$or :[
		{title: new RegExp(query, "i")},
		{description: new RegExp(query, "i")},
		{venue: new RegExp(query, "i")}
		]}, function(err, results) {
		return res.send(results);
	});
};

exports.addEvent = function(req, res) {
	Event.create(req.body, function(err, event) {
		if (err) return console.log(err);
		return res.send(event);
	});
};

exports.updateEvent = function(req, res) {
	var id = req.params.id;
	var updates = req.body;

	Event.update({'_id':id}, updates, function(err, numberAffected) {
		if (err) return console.log(err);
		console.log('Event updated');
		res.send(202);
	});
};

exports.deleteEvent = function(req, res) {
	var id = req.params.id;

	Event.remove({'_id':id}, function(result) {
		return res.send(result);
	});
};

exports.deleteAll = function(req, res) {
	Event.remove({}, function(result) {
		return res.send(result);
	});
};

exports.import = function(req, res) {
	Event.create(
		{ "title": "Name A", "description": " Name A ", "tags": ["uni"], "start": "2015-11-05T22:00:00Z" , "end": "2015-11-05T22:00:00Z", "venue": "Cs-Building" },
		{ "title": "Name B", "description": "Name B", "tags": ["private"], "start": "2015-11-11T22:00:00Z" , "end": "2015-11-18T22:00:00Z", "venue": "Helsinki" },
		{ "title": "Project", "description": "Work project", "tags": ["work"], "start": "2015-12-05T22:00:00Z" , "end": "2015-12-10T22:00:00Z", "venue": "Cs-Building" },
		{ "title": "Mini-Project", "description": "A mini project", "tags": ["uni"], "start": "2015-11-20T22:00:00Z" , "end": "2015-11-20T22:00:00Z", "venue": "Cs-Building" }
		, function(err) {
			if (err) return console.log(err);
			return res.send(202);
	});
};
