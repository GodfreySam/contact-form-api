const contactRouter = require("./contact.route");

const routers = (app) => {
	app.use("/api/v1", contactRouter);
};

module.exports = routers;
