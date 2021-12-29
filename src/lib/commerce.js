import Commerce from "@chec/commerce.js";

// Creating a new instance of that specific commerce as store
// 1st parameter would be public key
export const commerce = new Commerce(
	process.env.REACT_APP_CHEC_PUBLIC_KEY,
	true
);
