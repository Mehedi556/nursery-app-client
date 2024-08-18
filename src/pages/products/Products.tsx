/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { TProduct } from "@/types/product";
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/ui-components/ProductCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useGetAllProductsQuery } from "@/redux/features/products/productApi"
import { useDebouncedValue } from "@/lib/utils";
 

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortData, setSortData] = useState('')
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    filterProperty: '',
    filterValue: ''
  });
  const limit = 6;

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 2000);
  const debouncedFilter = useDebouncedValue(filter, 2000);

  const query = {
    searchTerm: debouncedSearchTerm,
    page,
    limit,
    filter: debouncedFilter,
    sortData
  }

  const { data, isLoading } = useGetAllProductsQuery(query);

  const handleClickPreviousPage = () => {
    page !== 1 ? setPage((prev) => prev - 1) : null;
  };

  const handleClickNextPage = () => {
    page !== data?.data?.meta?.totalPage ? setPage((prev) => prev + 1) : null;
  };


  if (isLoading) {
    return <div className="flex justify-center align-middle items-center w-full h-screen">
      <p>Loading...</p>
    </div>
  }

  return (
    <div>
      <h1 className="text-center font-bold text-xl mt-5">All Products</h1>
      <div className="max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-center items-center lg:grid-cols-3 my-5">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>

          </div>
          <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id="search-navbar" className="block w-[300px] p-2 ps-10 text-sm text-gray-900 rounded-md bg-gray-50 focus:outline-none border border-color-primary" placeholder="Search by name or category" />
        </div>

        <div className="mt-1 flex items-center gap-x-0.5">
          <Select onValueChange={(data) => setFilter((prev) => ({ ...prev, ["filterProperty"]: data }))}>
            <SelectTrigger className="w-[125px] focus:outline-none ring-0 focus:ring-0">
              <SelectValue placeholder="Filter by" className="focus:outline-none" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="focus:outline-none">
                <SelectItem value="_id" className="focus:outline-none">_id</SelectItem>
                <SelectItem value="title">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input onChange={(e) => setFilter(prev => ({ ...prev, ["filterValue"]: e.target.value }))} type="text" id="search-navbar" className="p-2 w-full text-sm text-gray-900 rounded-md bg-gray-50 focus:outline-none border border-color-primary" placeholder={`Filter by ${filter?.filterProperty}`} />
        </div>

        <div className=" sm:col-span-2 lg:col-span-1 mt-2 lg:mt-0">
          <div className="flex items-center mt-1">
            <h1 className="mr-2 text-sm font-bold">Sort by Price:</h1>
            <div className="">
              <RadioGroup defaultValue="" className="gap-y-0.5 flex" onValueChange={(data) => setSortData(data)}>
                <div className="flex items-center space-x-0.5">
                  <RadioGroupItem value="-price" id="r1" className="" />
                  <Label htmlFor="r1" className="text-xs">High to low</Label>
                </div>
                <div className="flex items-center space-x-0.5">
                  <RadioGroupItem value="price" id="r2" className="" />
                  <Label htmlFor="r2" className="text-xs">Low to high</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {/* <div className="flex items-center mt-1">
              <h1 className="mr-2 text-xs font-bold">----By Rating:</h1>
              <div className="">
                <RadioGroup defaultValue="" className="gap-y-0.5 flex" onValueChange={(data) => setSortData(data)}>
                  <div className="flex items-center space-x-0.5">
                    <RadioGroupItem value="-rating" id="r1" className="w-4 h-4"/>
                    <Label htmlFor="r1" className="text-xs">High to low</Label>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <RadioGroupItem value="rating" id="r2" className="w-4 h-4" />
                    <Label htmlFor="r2" className="text-xs">Low to high</Label>
                  </div>
                </RadioGroup>
              </div>
          </div> */}
        </div>
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-[1024px] justify-items-center mx-auto py-6 sm:py-10 px-3 lg:px-0">
        {
          data?.data?.result?.map((item: TProduct, i: number) => (<ProductCard key={i} item={item} />))
        }
      </div>
      <div className="flex col-span-3 justify-center pb-10">
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
  )
}

export default Products