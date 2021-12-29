import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({
	cart,
	handleUpdateCartQty,
	handleEmptyCart,
	handleRemoveFromCart
}) => {
	const classes = useStyles();

	const EmptyCart = () => (
		<Typography variant="subtitle1">
			You have no items in your shopping cart,
			<Link to="/" className={classes.link}>
				start adding some!
			</Link>
		</Typography>
	);
	// console.log(cart.line_items);
	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((product) => (
					<Grid item xs={12} sm={4} key={product.id}>
						<CartItem
							product={product}
							onUpdateCartQty={handleUpdateCartQty}
							onRemoveFromCart={handleRemoveFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size="large"
						type="button"
						variant="contained"
						color="secondary"
						onClick={handleEmptyCart}
					>
						Empty Cart
					</Button>
					<Button
						component={Link}
						to="/checkout"
						className={classes.checkoutButton}
						size="large"
						type="button"
						variant="contained"
						color="primary"
					>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);

	if (!cart.line_items) return "Loading...";
	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
