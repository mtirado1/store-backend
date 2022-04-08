const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv').config();

const app = express();

const productsService = require('./service/product');
const validateProduct = require('./service/validate-product');
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
	.get(productsService.getProducts)
	.post(validateProduct, productsService.createProduct);
productsRouter.route("/:productId")
	.put(productsService.updateProduct)
	.delete(productsService.deleteProduct);
app.use("/products", productsRouter);


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
	connectDatabase();
});
