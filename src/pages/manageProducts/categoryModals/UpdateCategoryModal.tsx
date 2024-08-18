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
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TCategory } from "@/types/category";
import { categorySchema } from "@/schemas/categorySchema";
import { useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";

const UpdateCategoryModal = ({ children, category }: { children: ReactNode, category: TCategory }) => {
    const [open, setOpen] = useState(false);

    const [updateCategory] = useUpdateCategoryMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TCategory>({ resolver: zodResolver(categorySchema) })

    useEffect(() => {
        reset(category)
    }, [category])

    const onSubmit: SubmitHandler<TCategory> = async (data) => {
        //! for local state management
        const result = await updateCategory({...data, _id: category?._id});

        if (result?.data?.success) {
            setOpen(false);
            toast.success('Category updated successfully.');
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
                    <DialogTitle>Update category details</DialogTitle>
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

                        <div className="mb-2 space-y-1">
                            <label htmlFor="" className="text-xs font-semibold">
                                Heading
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                                {...register("heading")}
                            />
                            {errors.heading && (
                                <p className="text-xs text-red-400 font-bold">
                                    Category header is required.
                                </p>
                            )}
                        </div>

                        <div className="mb-2 space-y-1">
                            <label htmlFor="" className="text-xs font-semibold">
                                Image URL
                            </label>
                            <input
                                type="text"
                                placeholder="Paste image link only.."
                                className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                                {...register("imageUrl")}
                            />
                            {errors.imageUrl && (
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
                            Update Category
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCategoryModal