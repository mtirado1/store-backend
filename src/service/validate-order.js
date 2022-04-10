
function validateOrder(request, response, next) {
	const order = request.body;
	const name = order.customer.name?.trim?.() ?? "";
	const address = order.customer.address?.trim?.() ?? "";

	if (name === "" || address === "" || (order.products ?? []).length === 0) {
		return response.status(400).json({
			message: "Invalid order details"
		});
	}
	next();
}

module.exports = validateOrder;
