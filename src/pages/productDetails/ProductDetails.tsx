import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useGetSingleProductQuery } from "@/redux/features/products/productApi";
import { toast } from "sonner";
import { addProductToCart } from "@/redux/features/products/productSlice";
import { useAppDispatch } from "@/redux/hooks";
// import banner from "../../assets/banner.jpg"

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleProductQuery(id);

  const dispatch = useAppDispatch();

  const maxRating = 5;
  const filledStars = Math.floor(data?.data?.rating);
  const unfilledStars = maxRating - filledStars;

  if (isLoading) {
    return <div className="flex justify-center align-middle items-center w-full h-screen">
      <p>Loading...</p>
    </div>
  }
  return (
    <div className="max-w-[1024px] mx-3 lg:mx-auto flex flex-col md:flex-row gap-4 py-10">
      <div className="w-5/5 md:w-3/5 flex justify-center">
        <img className="rounded-lg object-cover object-center max-h-[500px]" src={data?.data?.image} alt="" />
      </div>
      <div className="w-5/5 md:w-2/5 ">
        <div className="p-5 border border-color-primary rounded-md">
          <p className="font-bold">Name: <span className="text-zinc-600 text-3xl ml-1">{data?.data?.title}</span></p>
          <p className="font-bold mt-2">Description: <span className="text-zinc-600 text-sm">{data?.data?.description}</span></p>
          <p className="font-bold mt-5">Category: <span className="bg-color-primary px-2 py-0.5 text-sm text-black rounded-md font-medium">{data?.data?.category}</span></p>

          <div className="flex items-center gap-x-1 mt-2">
            <p className="font-bold">Ratings: </p>
            <div className="flex items-center">
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
              <span className="bg-color-primary text-black text-xs font-semibold px-2.5 py-0.5 rounded ms-3">{data?.data?.rating}</span>
            </div>
          </div>

          <p className="font-bold mt-2">Quantity: <span className="font-medium text-zinc-600">{data?.data?.quantity}</span></p>

          <p className="font-bold mt-6">Price: <span className="font-bold text-3xl bg-color-primary rounded-md px-2 py-0.5 ml-1">${data?.data?.price}</span></p>

          <Button onClick={() => {
                                const res = dispatch(addProductToCart(data?.data))
                                if(res){
                                    toast.success("Product added to cart successfully.")
                                }else {
                                    toast.error("Unable to add to cart. Something went to wrong.")
                                }
                            }} className="bg-color-primary px-2 py-0.5 text-sm font-bold text-black rounded-md mt-14 w-full hover:bg-color-simple">Add to cart</Button>
        </div>


      </div>
    </div>
  )
}

export default ProductDetails