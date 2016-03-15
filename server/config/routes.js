
module.exports = function(app) {
	var dbRoutes = require('../routes/dbRoutes');
	app.use("/api", dbRoutes);
	var userRoutes = require('../routes/userRoutes');
	app.use("/user", userRoutes);
	app.use("/files", require('../routes/imageRoutes'));
}

