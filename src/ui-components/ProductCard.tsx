/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { addProductToCart } from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/product";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";


const ProductCard = ({ item }: { item: TProduct }) => {
    const { products } = useAppSelector((state) => state.product)
    const maxRating = 5;
    const filledStars = Math.floor(item?.rating);
    const unfilledStars = maxRating - filledStars;

    const dispatch = useAppDispatch();

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg">

            <img className="rounded-t-lg object-cover object-center h-[250px] w-full" src={item?.image} alt="product image" />

            <div className="px-4 pb-4">

                <h5 className="text-lg font-bold tracking-tight pt-2 text-gray-900">{item?.title}</h5>
                <p className="text-xs text-gray-600 ">{item?.description.substring(0, 100)}</p>
                <div className="flex mt-2 items">
                    <p className="text-xs font-bold mr-2">Category:</p>
                    <p className="text-xs font-semibold px-2  bg-color-primary text-black rounded-sm">{item?.category}</p>
                </div>

                <div className="flex items-center mt-2 mb-2">
                    {[...Array(filledStars)].map((_, index) => (
                        <svg key={index} className="w-3 h-3 text-color-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                    {[...Array(unfilledStars)].map((_, index) => (
                        <svg key={index} className="w-3 h-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                    <span className="bg-color-primary text-black text-xs font-semibold px-2.5 py-0.5 rounded ms-3">{item?.rating}</span>
                </div>

                <div className="flex items">
                    <p className="text-xs font-bold mr-2">Available:</p>
                    <p className="text-xs text-gray-600">{item?.quantity} pcs</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-bold text-gray-900">${item?.price}</span>
                    <div className="flex justify-around gap-x-2 pt-1">
                        <NavLink to={`/product-details/${item?._id}`}>
                            <Button className="text-black border border-color-primary bg-white hover:bg-color-simple  focus:outline-none font-medium rounded-sm text-xs px-4 py-2 text-center">See Details</Button>
                        </NavLink>

                        <Button onClick={() => {
                            const isExists = products.find(product => product?._id == item?._id)
                            if(isExists &&  (isExists?.quantity >= item?.quantity)){
                                toast.error("This product is not available in stock.")
                            }else if(item?.quantity < 1){
                                toast.error("This product is not available in stock.")
                            }else {
                                const res = dispatch(addProductToCart(item))
                                if(res){
                                    toast.success("Product added to cart successfully.")
                                }else {
                                    toast.error("Unable to add to cart. Something went to wrong.")
                                }
                            }
                            }} className="text-black bg-color-primary hover:bg-color-simple  focus:outline-none font-medium rounded-sm text-xs px-4 py-2 text-center">Add to cart</Button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ProductCard