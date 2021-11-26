const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3050;

app.listen(PORT, () =>
	console.log(`Server running on port http://localhost:${PORT}`),
);
