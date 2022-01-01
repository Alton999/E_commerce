import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";

const App = () => {
	// States declaration
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	// Fetching APIs
	const fetchProducts = async () => {
		// Returns a promise
		// Destructure the response
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, quantity) => {
		const { cart } = await commerce.cart.add(productId, quantity);
		setCart(cart);
	};

	const handleUpdateCartQty = async (productId, quantity) => {
		const { cart } = await commerce.cart.update(productId, { quantity });
		setCart(cart);
	};

	const handleRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();
		setCart(cart);
	};
	useEffect(() => {
		fetchProducts();
		fetchCart();
		// Set dependency to empty to render only on the start
	}, []);

	console.log(cart.line_items);
	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<Routes>
					<Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />}/>

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

					<Route path="/checkout" element={<Checkout cart={cart}/>}/>
				</Routes>


			</div>
		</Router>
	);
};

export default App;