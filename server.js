const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");

// dotenv.config();
dotenv.config({ path: "./config/config.env" });

const server = http.createServer(app);

const PORT = process.env.PORT || 3050;

app.listen(PORT, () =>
	console.log(`Server running on port http://localhost:${PORT}`),
);
