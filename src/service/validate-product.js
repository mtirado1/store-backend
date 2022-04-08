
function validateProduct(request, response, next) {
	const product = request.body;
	const title = product.title?.trim?.() ?? "";
	const imageUrl = product.imageUrl?.trim?.() ?? "";
	const price = Number(product.price);
	const quantity = Number(product.quantity);
	if (title === "" || imageUrl === "" || Number.isNaN(quantity) || Number.isNaN(price)) {
		return response.status(400).json({ message: "Invalid product" });
	}
	next();
}

module.exports = validateProduct;
