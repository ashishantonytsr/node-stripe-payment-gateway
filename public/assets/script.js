// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe('pk_test_51KqsjdACkhrNFFHQh2xyI4YfdSuIy00bqXCBUQl8OiNFsjO4Bx1VdkZHjDeVRvfdhdUZXbmwKVR6ho2By7vLdQ8n006iyi10Tn');
var checkoutButton = document.getElementById("btn");

checkoutButton.addEventListener("click", function () {
	fetch("/payment", {
		headers: {'Content-Type': 'application/json'},
		method: "POST",
		body: JSON.stringify({
				"product": {
						"name": "iPhone 12", 
						"image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000", 
						"amount": 89900,
						"quantity": 1
				}})
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (session) {
			return stripe.redirectToCheckout({ sessionId: session.id });
		})
		.then(function (result) {
			if (result.error) {
				alert(result.error.message);
			}
		})
		.catch(function (error) {
			console.error("Error:", error);
		});
});