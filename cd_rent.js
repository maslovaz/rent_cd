var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function (callback) {
//  // yay!
//});

//validators
function directorNumValidator(val) {
  return val.size() == 'something';
}

//schemas
var genreSchema = mongoose.Schema({
	genreName: {
		type: String,
		required: true,
		unique: true
	}
});
var studioSchema = mongoose.Schema({
	studioName: {
		type: String,
		required: true,
		unique: true
	}
});
var actorSchema = mongoose.Schema({
	actorName: {
		type: String,
		required: true
	},
	actorSurname: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: Date,
		required: false
	}
});
var catalogueSchema = mongoose.Schema({
	movieName: {
		type: String,
		required: true
	},
	movieRate: {
		type: Number,
		required: true,
		min: 0,
		max: 10
	},
	numberOfCD: {
		type: Number,
		required: true,
		min: 0
	},
	numberOfRentedCD: {
		type: Number,
		required: true
	},
	costPerDay: {
		type: Number,
		required: true
	},
	mainGenre: {
		type: mongoose.Schema.Types.ObjectId,
		required: false
	},
	genreList: {
		type: [mongoose.Schema.Types.ObjectId],
		required: false
		//toDo: can be set once
	},
	studioList: {
		type: [mongoose.Schema.Types.ObjectId],
		required: false
	},
	actorList: {
		type: [mongoose.Schema.Types.ObjectId],
		required: false
	},
	directorList: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
		validate: directorNumValidator
	}
});

//models
var Genre = mongoose.model('Genre', genreSchema);
var Studio = mongoose.model('Studio', studioSchema);
var Actor = mongoose.model('Actor', actorSchema);
var Catalogue = mongoose.model('Catalogue', catalogueSchema);
//var comedy = new Genre({genreName : 'Comedy'});

//exports
module.exports.Genre = Genre;
module.exports.Studio = Studio;
module.exports.Actor = Actor;
module.exports.Catalogue = Catalogue;

