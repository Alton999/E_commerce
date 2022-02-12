import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";

const App = () => {
	// States declaration
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();

		setProducts(data);
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, quantity) => {
		const item = await commerce.cart.add(productId, quantity);

		setCart(item.cart);
	};

	const handleUpdateCartQty = async (lineItemId, quantity) => {
		const response = await commerce.cart.update(lineItemId, { quantity });

		setCart(response.cart);
	};

	const handleRemoveFromCart = async (lineItemId) => {
		const response = await commerce.cart.remove(lineItemId);

		setCart(response.cart);
	};

	const handleEmptyCart = async () => {
		const response = await commerce.cart.empty();

		setCart(response.cart);
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();

		setCart(newCart);
	};

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				JSON.stringify(newOrder)
			);
			console.log("Success", incomingOrder);
			setOrder(incomingOrder);

			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	console.log(cart.line_items);
	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<Routes>
					<Route
						path="/"
						element={
							<Products products={products} onAddToCart={handleAddToCart} />
						}
					/>

					<Route
						path="/cart"
						element={
							<Cart
								cart={cart}
								handleEmptyCart={handleEmptyCart}
								handleRemoveFromCart={handleRemoveFromCart}
								handleUpdateCartQty={handleUpdateCartQty}
							/>
						}
					/>

					<Route
						path="/checkout"
						element={
							<Checkout
								cart={cart}
								order={order}
								onCaptureCheckout={handleCaptureCheckout}
								error={errorMessage}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
