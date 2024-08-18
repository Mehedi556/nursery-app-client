import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeProduct } from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/product";
import { Trash2 } from "lucide-react";
import AddUserInfoModal from "./AddUserInfoModal";

const Cart = () => {
  const { products } = useAppSelector((state) => state.product)
  const dispatch = useAppDispatch()
return (
  <div>
      <div className="max-w-[1024px] mx-auto px-3 lg:px-0">
      <div className="py-5">
        <h1 className="text-lg sm:text-xl font-bold">Cart products</h1>
      </div>
    <Table>
      <TableCaption>Recent added products to cart.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left p-0 font-bold text-black">Plant</TableHead>
          <TableHead className=" p-0 pl-1 sm:pl-3 font-bold text-black">Title</TableHead>
          <TableHead className=" p-0 font-bold text-black">Category</TableHead>
          <TableHead className=" p-0 font-bold text-black">Quantity</TableHead>
          <TableHead className=" p-0 font-bold text-black">Price</TableHead>
          <TableHead className="p-0 text-right font-bold text-black">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          products?.map(( item: TProduct ) => (
            <TableRow className="mb-6" key={item?._id}>
              <TableCell className="font-medium p-0">
                <img className="h-14 sm:h-24 w-14 sm:w-24 object-cover object-center" src={item?.image} alt="" />
              </TableCell>
              <TableCell className="p-0 pl-1 sm:pl-3 text-zinc-600">{item?.title}</TableCell>
              <TableCell className="p-0 text-zinc-600">{item?.category}</TableCell>
              <TableCell className="p-0 text-zinc-600">{item?.quantity} pcs</TableCell>
              <TableCell className="p-0 text-zinc-600">${item?.price * item?.quantity}</TableCell>
              <TableCell className="">
                <div className="flex justify-end">
                  <button onClick={() => dispatch(removeProduct(item?._id as string))}>
                    <Trash2 className="text-red-600 h-4 sm:h-6 w-4 sm:w-6"/>
                  </button>
                
                </div>
              </TableCell>
            </TableRow>
          ))
        }
        
      </TableBody>
    </Table>

    <div className="flex justify-end">
      <AddUserInfoModal>
        <button disabled={products.length == 0} className="bg-color-primary px-10 py-3 text-sm font-bold text-black rounded-md mt-14 hover:bg-color-simple">Proceed to checkout</button>
      </AddUserInfoModal>
      
    </div>
      </div>
  </div>
)
}

export default Cart