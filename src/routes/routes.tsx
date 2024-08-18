import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Products from "@/pages/products/Products";
import ProductDetails from "@/pages/productDetails/ProductDetails";
import ManageProducts from "@/pages/manageProducts/ManageProducts";
import Home from "@/pages/home/Home";
import Cart from "@/pages/cart/Cart";
import Payment from "@/pages/payment/Payment";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'products',
                element: <Products />
            },
            {
                path: 'product-details/:id',
                element: <ProductDetails />
            },
            {
                path: 'manage-products',
                element: <ManageProducts />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'payment',
                element: <Payment />
            },
        ]
    },
]);