const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		imageUrl: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},

		categories: {
			type: [String],
			required: false
		},
		quantity: {
			type: Number,
			required: true
		},
	},
	
	{ timestamps: true }
);

const ItemSchema = new mongoose.Schema(
	{
		productId: {
			type: String,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		}
	}
);

const OrderSchema = new mongoose.Schema(
	{ 
		products: [ItemSchema],
		customer: {
			name: {
				type: String,
				required: true
			},
			address: {
				type: String,
				required: true
			}
		}
	},
	{ timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
const OrderModel = mongoose.model("Order", OrderSchema);
const ItemModel = mongoose.model("Item", ItemSchema);

module.exports = {
	Product: ProductModel,
	Order: OrderModel,
	Item: ItemModel
};
