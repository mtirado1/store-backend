const ordersRepository = require('../repository/order');

function internalError(response, error) {
	console.log(error);
	response.status(500).json({message: "Internal Error"});
}

const ordersService = {
	create: async (request, response) => {
		try {
			const order = request.body;
			const createdOrder = await ordersRepository.create(order);
			if (!createdOrder) {
				response.status(403).json({message: "Product out of stock"});
			} else {
				response.json(createdOrder);
			}
		} catch(error) {
			internalError(response, error);
		}
	}
}

module.exports = ordersService;
