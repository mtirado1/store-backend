const {Product} = require('../models/product');

const productsRepository = {
	getProducts: async () => {
		return await Product.find().lean().exec();
	},

	createProduct: async (product) => {
		const newProduct = new Product(product);
		await newProduct.save();
		return newProduct;
	},

	updateProduct: async (id, product) => {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			returnDocument: "after"
		}).lean().exec();
		return updatedProduct;
	},

	deleteProduct: async (id) => {
		await Product.findByIdAndDelete(id).exec();
	}
}

module.exports = productsRepository;
