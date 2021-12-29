import React from "react";

import {
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia
} from "@material-ui/core";

import useStyles from "./styles";
const CartItem = ({ product, onUpdateCartQty, onRemoveFromCart }) => {
	const classes = useStyles();
	return (
		<Card>
			<CardMedia
				image={product.media.source}
				alt={product.name}
				className={classes.media}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant="h4">{product.name}</Typography>
				<Typography variant="h5">
					{product.line_total.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button
						type="button"
						size="small"
						onClick={() => onUpdateCartQty(product.id, product.quantity - 1)}
					>
						-
					</Button>
					<Typography>{product.quantity}</Typography>
					<Button
						type="button"
						size="small"
						onClick={() => onUpdateCartQty(product.id, product.quantity + 1)}
					>
						+
					</Button>
				</div>
				<Button
					variant="contained"
					type="button"
					color="secondary"
					onClick={() => onRemoveFromCart(product.id)}
				>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
