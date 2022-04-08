const productsRepository = require('../repository/product');

function internalError(response, error) {
	console.log(error);
	response.status(500).json({message: "Internal Error"});
}

const productsService = {
	getProducts: async (request, response) => {
		try {
			const products = await productsRepository.getProducts();
			response.json(products);
		} catch (error) {
			console.log(error);
			response.status(500).json({message: "Internal Error"});
		}
	},

	createProduct: async (request, response) => {
		try {
			const product = request.body;
			const createdProduct = await productsRepository.createProduct(product);
			response.status(201).json(createdProduct);
		} catch(error) {
			internalError(response, error);
		}
	},

	updateProduct: async (request, response, next) => {
		try {
			const { productId } = request.params;
			const product = request.body;
			const updatedProduct = await productsRepository.updateProduct(productId, product);
			if (!updatedProduct) {
				response.status(404).json({message: "Product not found"});
			}
			response.json(updatedProduct);
		} catch(error) {
			internalError(response, error);
		}
	},

	deleteProduct: async (request, response, next) => {
		try {
			const { productId } = request.params;
			await productsRepository.deleteProduct(productId);
			response.status(204).send();
		} catch(error) {
			internalError(response, error);
		}
	}
}

module.exports = productsService;
