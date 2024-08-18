/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ArrowLeft, ArrowRight, Edit, Settings, Trash2 } from 'lucide-react';
import AddProductModal from "./productModals/AddProductModal";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/product";
import { useState } from "react";
import DeleteProductModal from "./productModals/DeleteProductModal";
import UpdateProductModal from "./productModals/UpdateProductModal";
import ManageCategoriesModal from "./categoryModals/ManageCategoriesModal";
// import { useAppSelector } from "@/redux/hooks";





const ManageProducts = () => {
  // const { products } = useAppSelector((state) => state.product)
  const [page, setPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const limit = 6;


  const queryData = {
    page,
    limit
  }
  const { data, isLoading } = useGetAllProductsQuery(queryData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClickPreviousPage = () => {
    page !== 1 ? setPage((prev) => prev - 1) : null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClickNextPage = () => {
    page !== data?.data?.meta?.totalPage ? setPage((prev) => prev + 1) : null;
  };

  if(isLoading){
    return <div className="flex justify-center align-middle items-center w-full h-screen">
            <p>Loading...</p>
          </div>
  }

  return (
    <div>
      <div className="max-w-[1024px] mx-auto px-3 lg:px-0">
        <div className="flex justify-between py-3 sm:py-5">
          <h1 className="text-xl sm:text-2xl font-bold">Manage products</h1>
          <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2">
            <ManageCategoriesModal>
              <button className="text-black bg-color-primary hover:bg-color-simple text-sm sm:text-md py-1.5 sm:py-3 px-3 sm:px-5 rounded-sm">
              Manage Categories
            </button>
            </ManageCategoriesModal>
            
            <AddProductModal>
              <button className="text-black bg-color-primary hover:bg-color-simple text-sm sm:text-md py-1.5 sm:py-3 px-3 sm:px-5 rounded-sm">
              Add Product
            </button>
            </AddProductModal>
          </div>
        </div>
      <Table className="">
        <TableCaption>Recent added products.</TableCaption>
        <TableHeader className="text-xs sm:text-base">
          <TableRow>
            <TableHead className="text-left p-0 font-bold text-black">Plant</TableHead>
            <TableHead className=" p-0 pl-1 sm:pl-3 font-bold text-black">Title</TableHead>
            <TableHead className=" p-0 font-bold text-black">Category</TableHead>
            <TableHead className=" p-0 font-bold text-black">Quantity</TableHead>
            <TableHead className=" p-0 font-bold text-black">Price</TableHead>
            <TableHead className="p-0 text-right font-bold text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs sm:text-base">
          {
            data?.data?.result.map(( item: TProduct ) => (
              <TableRow className="mb-6" key={item?._id}>
                <TableCell className="font-medium p-0 h-14 sm:h-24 w-14 sm:w-24">
                  <img className="h-14 sm:h-24 w-14 sm:w-24 object-cover object-center" src={item?.image} alt="" />
                </TableCell>
                <TableCell className="p-0 pl-1 sm:pl-3 text-zinc-600">{item?.title}</TableCell>
                <TableCell className="p-0 text-zinc-600">{item?.category}</TableCell>
                <TableCell className="p-0 text-zinc-600">{item?.quantity} pcs</TableCell>
                <TableCell className="p-0 text-zinc-600">${item?.price}</TableCell>
                <TableCell className="">
                  <div className="flex justify-end">
                    <Popover>
                      <PopoverTrigger>
                        <Settings color="#AED581" className="cursor-pointer h-4 sm:h-6 w-4 sm:w-6"/>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px]">
                      <h1 className="font-bold text-sm border-b pb-2">
                          Actions
                        </h1>
                        <div className="mt-2">
                          <UpdateProductModal
                            product={item}
                          >
                            <button className="flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 w-full rounded">
                              <Edit size={16} />
                              <p>Update</p>
                            </button>
                          </UpdateProductModal>

                          <DeleteProductModal _id={item?._id as string}>
                            <button className="flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 w-full rounded">
                              <Trash2 className="text-red-600" size={16} />
                              <p>Delete</p>
                            </button>
                          </DeleteProductModal>

                        </div>
                      </PopoverContent>
                    </Popover>

                  </div>
                </TableCell>
              </TableRow>
            ))
          }
          
        </TableBody>
      </Table>

      <div className="flex col-span-3 justify-center sm:justify-end py-3">
          <button onClick={handleClickPreviousPage}>
            <ArrowLeft size={16} className="text-color-primary" />
          </button>
          <p className="text-xs mx-2 font-semibold text-gray-600">
            {page}/{data?.data?.meta?.totalPage}
          </p>
          <button onClick={handleClickNextPage}>
            <ArrowRight size={16} className="text-color-primary" />
          </button>
        </div>

      </div>
    </div>
  )
}

export default ManageProducts