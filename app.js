require('dotenv').config()

const express = require('express')
const app = express()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.static('./public'))

app.post("/payment", async (req, res) => {
	const { product } = req.body;
	const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
					{
							price_data: {
									currency: "inr",
									product_data: {
											name: product.name,
											images: [product.image],
									},
									unit_amount: product.amount * 100,
							},
							quantity: product.quantity,
					},
			],
			mode: "payment",
			success_url: `${process.env.SERVER_URL}/success.html`,
			cancel_url: `${process.env.SERVER_URL}/cancel.html`,
	});

	res.json({ id: session.id });
});

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is listening to ${PORT}`))
