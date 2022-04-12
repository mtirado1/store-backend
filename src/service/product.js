const productsRepository = require('../repository/product');

function internalError(response, error) {
	console.log(error);
	response.status(500).json({message: "Internal Error"});
}

const productsService = {
	get: async (request, response) => {
		try {
			const products = await productsRepository.get();
			response.json(products);
		} catch (error) {
			internalError(response, error);
		}
	},

	getOne: async (request, response) => {
		try {
			const { productId } = request.params;
			const product = await productsRepository.getOne(productId);
			if (product) {
				response.json(product);
			} else {
				response.stats(404).json({message: "Product not Found"});
			}
		} catch (error) {
			internalError(response, error);
		}
	},

	create: async (request, response) => {
		try {
			const product = request.body;
			const createdProduct = await productsRepository.create(product);
			response.status(201).json(createdProduct);
		} catch(error) {
			internalError(response, error);
		}
	},

	update: async (request, response, next) => {
		try {
			const { productId } = request.params;
			const product = request.body;
			const updatedProduct = await productsRepository.update(productId, product);
			if (!updatedProduct) {
				response.status(404).json({message: "Product not found"});
			}
			response.json(updatedProduct);
		} catch(error) {
			internalError(response, error);
		}
	},

	delete: async (request, response, next) => {
		try {
			const { productId } = request.params;
			await productsRepository.delete(productId);
			response.status(204).send();
		} catch(error) {
			internalError(response, error);
		}
	}
}

module.exports = productsService;
