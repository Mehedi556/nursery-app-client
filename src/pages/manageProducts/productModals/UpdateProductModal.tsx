import { useForm, SubmitHandler } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { productSchema } from "@/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProductMutation } from "@/redux/features/products/productApi";
import { toast } from "sonner";
import { TProduct } from "@/types/product";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/category";


const UpdateProductModal = ({ children, product }: { children: ReactNode, product: TProduct }) => {
    // console.log(product);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');

    const { data } = useGetAllCategoriesQuery(undefined)


    const [updateProduct] = useUpdateProductMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TProduct>({ resolver: zodResolver(productSchema) });

    useEffect(() => {
        reset(product)
        setCategory(product?.category)
    }, [product])
    

    

    const onSubmit: SubmitHandler<TProduct> = async (data) => {

        const result = await updateProduct({ ...data, _id: product?._id });
        console.log(result);

        if (result?.data?.success) {
            setOpen(false);
            setCategory(result?.data?.data?.category)
            toast.success('Product updated successfully.');
        } else {
            toast.error('Please fill all the fields. Because all are required. Otherwise something went wrong, please contact to the author please.')
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update product details</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <div onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2 space-y-1">
                            <label htmlFor="" className="text-xs font-semibold">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                                {...register("title")}
                            />
                            {errors.title && (
                                <p className="text-xs text-red-400 font-bold">
                                    Name is required.
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between items-center gap-x-3">
                            <div className="mb-2 space-y-1 w-2/3">
                                <label htmlFor="" className="text-xs font-semibold">
                                    Category
                                </label>
                                <Select onValueChange={(data) => {
                                        setValue('category', data)
                                        setCategory(data)
                                    }} value={category}>
                                    <SelectTrigger className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full">
                                        <SelectValue placeholder="Select any category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {
                                        data?.data?.map((category: TCategory) => <SelectItem key={category?._id} value={category?.title}>{category?.title}</SelectItem>)
                                    }
                                    </SelectContent>
                                </Select>

                                {errors.category && (
                                    <p className="text-xs text-red-400 font-bold">
                                        Category is required.
                                    </p>
                                )}
                            </div>

                            <div className="mb-2 space-y-1 w-1/3">
                                <label htmlFor="" className="text-xs font-semibold">
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    placeholder="Type 1 to 5"
                                    className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                                    {...register("rating", {
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.rating && (
                                    <p className="text-xs text-red-400 font-bold">
                                        Rating is required.
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="flex justify-between items-center gap-x-3">
                            <div className="mb-2 space-y-1">
                                <label htmlFor="" className="text-xs font-semibold">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    placeholder=""
                                    className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                                    {...register("price", {
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.price && (
                                    <p className="text-xs text-red-400 font-bold">
                                        Price is required.
                                    </p>
                                )}
                            </div>

                            <div className="mb-2 space-y-1">
                                <label htmlFor="" className="text-xs font-semibold">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    placeholder=""
                                    className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                                    {...register("quantity", {
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.quantity && (
                                    <p className="text-xs text-red-400 font-bold">
                                        Quantity is required.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-2 space-y-1">
                            <label htmlFor="" className="text-xs font-semibold">
                                Image URL
                            </label>
                            <input
                                type="text"
                                placeholder="Paste image link only.."
                                className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                                {...register("image")}
                            />
                            {errors.image && (
                                <p className="text-xs text-red-400 font-bold">
                                    Image link is required.
                                </p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="" className="text-xs font-semibold">
                                Description
                            </label>
                            <Textarea
                                placeholder="Type short description about this plant here.."
                                className="text-sm focus:outline-none pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-xs text-red-400 font-bold">
                                    Description is required.
                                </p>
                            )}
                        </div>

                    </div>
                </div>
                <DialogFooter className="">
                    <DialogClose asChild>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            className="py-2 w-full bg-color-primary text-sm font-bold text-black rounded mb-4 border-2 border-color-primary hover:bg-color-simple transition ease-in-out duration-500 space-x-2 flex items-center justify-center"
                        >
                            Update Product
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProductModal