const {Product} = require('../models/product');

const productsRepository = {
	get: async () => {
		return await Product.find().lean().exec();
	},

	getOne: async (id) => {
		return await Product.findById(id);
	},

	create: async (product) => {
		const newProduct = new Product(product);
		await newProduct.save();
		return newProduct;
	},

	update: async (id, product) => {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			returnDocument: "after"
		}).lean().exec();
		return updatedProduct;
	},

	delete: async (id) => {
		await Product.findByIdAndDelete(id).exec();
	}
}

module.exports = productsRepository;
