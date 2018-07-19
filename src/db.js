const mongoose = require('mongoose');

exports.db = async callback => {
	// connect to a database if needed, then pass it to `callback`:
	const db = await mongoose.connect('mongodb://localhost/finance');
	callback( db );
}