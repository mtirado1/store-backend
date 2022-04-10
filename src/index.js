const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv').config();

const app = express();

const productsService = require('./service/product');
const ordersService = require('./service/order');
const validateProduct = require('./service/validate-product');
const validateOrder = require('./service/validate-order');
const PORT = process.env.PORT;

function connectDatabase() {
	try {
		mongoose.connect(process.env.DB_URI);
		console.log("Database connected.");
	} catch(error) {
		console.log(error);
	}
}

// Configure Express
app.use(express.json());
app.use(cors());

// Routing
const productsRouter = express.Router();
productsRouter.route("/")
	.get(productsService.get)
	.post(validateProduct, productsService.create);
productsRouter.route("/:productId")
	.put(productsService.update)
	.delete(productsService.delete);

const ordersRouter = express.Router();
ordersRouter.route("/")
	.post(validateOrder, ordersService.create);

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
	connectDatabase();
});
