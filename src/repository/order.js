const {Product, Order, Item} = require('../models/product');

const ordersRepository = {
	create: async (order) => {
		const validOrder = await validateProductStock(order.products);
		if (validOrder) {
			const newOrder = new Order(order);
			await newOrder.save();
			return newOrder;
		}
		return null;
	}
}

async function validateProductStock(products) {
	// Check that all products are in stock
	for (item of products) {
		const {productId, quantity} = item;
		const product = await Product.findById(productId);
		if(!product || product.quantity < quantity) {
			return false;
		}
	}

	// Update product quantities
	for (item of products) {
		const {productId, quantity} = item;
		await Product.findOneAndUpdate(
			{_id: productId},
			{
				$inc: {
					quantity: -quantity
				}
			}
		);
	}
	return true;
}

module.exports = ordersRepository;
