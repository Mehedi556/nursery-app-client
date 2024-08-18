/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import Hero from "@/ui-components/Hero"
import { TProduct } from "@/types/product"
import { TCategory } from "@/types/category"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ProductCard from "@/ui-components/ProductCard"
import CategoryCard from "@/ui-components/CategoryCard"
import { useGetAllProductsQuery } from "@/redux/features/products/productApi"
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi"
import { useDebouncedValue } from "@/lib/utils"


const galleryImages = [
    "https://i.ibb.co/FH6WRv5/8.jpg",
    "https://i.ibb.co/TbbSwYH/7.jpg",
    "https://i.ibb.co/d6BQNCN/6.jpg",
    "https://i.ibb.co/VJwFdk4/5.jpg",
    "https://i.ibb.co/xCVzrbc/4.jpg",
    "https://i.ibb.co/rcDY7dH/1.jpg",
    "https://i.ibb.co/8cPrWn1/2.jpg",
    "https://i.ibb.co/VNqpbvK/3.jpg",
    "https://i.ibb.co/LR2S8Fd/9.jpg",
    "https://i.ibb.co/0FMJfjS/10.jpg",
    "https://i.ibb.co/KxkZ70Z/11.jpg",
    "https://i.ibb.co/kMyY4L3/12.jpg",
    "https://i.ibb.co/Lprryy4/13.jpg",
    "https://i.ibb.co/Bg3Sq0n/14.jpg",
    "https://i.ibb.co/jvSrfSz/16.jpg",
    "https://i.ibb.co/p4G9b8C/15.jpg",
    "https://i.ibb.co/jvSrfSz/16.jpg",
    "https://i.ibb.co/Bg3Sq0n/14.jpg",
]

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({
        filterProperty: '',
        filterValue: ''
    });
    const limit = 6;
    const sortData = "";

    const debouncedSearchTerm = useDebouncedValue(searchTerm, 2000);
    const debounsedFilter = useDebouncedValue(filter, 2000);


    const query = {
        searchTerm: debouncedSearchTerm,
        page,
        limit,
        filter: debounsedFilter,
        sortData
    }

    const { data, isLoading } = useGetAllProductsQuery(query);
    const { data:categoryData } = useGetAllCategoriesQuery(undefined);


    const handleClickPreviousPage = () => {
        page !== 1 ? setPage((prev) => prev - 1) : null;
    };

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
            <Hero />

            <h1 className="text-center font-bold text-xl pt-16">Popular Categories</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 max-w-[1024px] mx-auto py-10 sm:py-16 px-3 lg:px-0">
                {
                    categoryData?.data?.map((item:TCategory) => ( <CategoryCard key={item?._id} item={item} />))
                }
            </div>

            <h1 className="text-center font-bold text-xl pt-16">Latest Products</h1>

            <div className="max-w-[1024px] mx-auto flex flex-col sm:flex-row justify-center items-center gap-x-10 gap-y-2 mt-5">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id="search-navbar" className="block w-[300px] p-2 ps-10 text-sm text-gray-900 rounded-md bg-gray-50 focus:outline-none border border-color-primary" placeholder="Search by name or category" />
                </div>

                <div className=" flex items-center gap-x-0.5">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-5 max-w-[1024px] mx-auto pt-10 sm:pt-16 pb-6 px-3 lg:px-0">
                {
                    data?.data?.result?.map((item:TProduct) => ( <ProductCard key={item?._id} item={item} />))
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

            <h1 className="text-center font-bold text-xl pt-16">Plant Gallery</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-[200px] py-16 max-w-[1024px] mx-auto  px-3 lg:px-0">
                {galleryImages.map((src, index) => (
                    <div key={index} className={`flex justify-center items-center ${index % 6 === 2 || index % 6 === 5 ? "row-span-2" : ""}`}>
                    <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home