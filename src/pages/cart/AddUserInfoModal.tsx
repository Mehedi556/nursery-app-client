import { ReactNode, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TOrder } from "@/types/Order";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/schemas/orderSchema";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";

import { addUserInfo } from "@/redux/features/products/productSlice";

const AddUserInfoModal = ({children} : {children: ReactNode}) => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<TOrder>({ resolver: zodResolver(orderSchema) })
      const onSubmit: SubmitHandler<TOrder> = async (data) => {

        const result = dispatch(addUserInfo(data));
        console.log(result);
    
        if (result?.payload) {
          navigate('/payment');
          setOpen(false);
          reset({
            name: "",
            address: "",
            phone: "",
            email: "",
            products: []
          })
          
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
          <DialogTitle>Add user information</DialogTitle>
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
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-400 font-bold">
                  Name is required.
                </p>
              )}
            </div>
            <div className="mb-2 space-y-1">
              <label htmlFor="" className="text-xs font-semibold">
                Email
              </label>
              <input
                type="text"
                placeholder=""
                className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-400 font-bold">
                  Email is required.
                </p>
              )}
            </div>
            <div className="mb-2 space-y-1">
              <label htmlFor="" className="text-xs font-semibold">
                Phone
              </label>
              <input
                type="text"
                placeholder=""
                className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-400 font-bold">
                  Phone number is required.
                </p>
              )}
            </div>
            <div className="mb-2 space-y-1">
              <label htmlFor="" className="text-xs font-semibold">
                Address
              </label>
              <input
                type="text"
                placeholder=""
                className="text-sm focus:outline-color-primary pl-4 pr-4 py-2 border border-color-simple rounded w-full"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-xs text-red-400 font-bold">
                  Address is required.
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
              Create Order
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserInfoModal