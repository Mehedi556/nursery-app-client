import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import { useGetAllProductsQuery, useUpdateProductMutation } from "@/redux/features/products/productApi";
import { clearCart } from "@/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/product";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const sum = (numbers: Array<number>) => {
    let sum = 0;
    numbers?.forEach((item) => (sum += item));
    return sum;
};

const Payment = () => {
    const [selectedOption, setSelectedOption] = useState<string>("cod");

    const [createOrder] = useCreateOrderMutation();

    const [updateProduct] = useUpdateProductMutation();

    const { data: dbData } = useGetAllProductsQuery({});
    console.log(dbData);

    const { products, userInfo } = useAppSelector((state) => state.product)

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const paymentOptions = [
        { id: "stripe", label: "Stripe Payment" },
        { id: "cod", label: "Cash on Delivery" },
    ];

    const handleCreateOrder = async () => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const changedData: any = []
        products.map(item => {
            changedData.push({ title: item?.title, category: item?.category, price: item?.price, quantity: item?.quantity })
        })

        products.map(product => {
            const foundedData = dbData?.data?.result.find((item: TProduct) => item?._id === product?._id)
            console.log(foundedData);
            if (foundedData) {
                const updatedData = {
                    _id: product?._id,
                    quantity: foundedData?.quantity - product?.quantity
                }
                updateProduct(updatedData)
            }
        })

        const result = await createOrder({ ...userInfo, paymentType: selectedOption, totalAmount: sum(products.map((item) => item?.price * item?.quantity)), products: changedData });
        if (result?.data?.success) {
            dispatch(clearCart())
            toast.success("Order Confirmed. Thank you for your purchase! Your order will be placed soon..");
            navigate('/products')
        }

    }
    return (
        <div>
            <div className="max-w-[1024px] mx-auto px-3 lg:px-0">
                <div className='grid gap-x-5 grid-cols-3 my-10'>
                    <div className="col-span-3 md:col-span-2 gap-10 flex justify-center items-center">
                        {paymentOptions.map((option) => (
                            <div
                                key={option.id}
                                className={`rounded flex items-start gap-x-2 p-5 md:p-10 cursor-pointer ${selectedOption === option.id
                                    ? "border-2 border-color-primary"
                                    : "border border-secondary_color"
                                    }`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <div>
                                    <RadioGroup defaultValue={option.id}>
                                        <div className="flex justify-center items-center space-x-2">
                                            <RadioGroupItem
                                                value={option.id}
                                                id={option.id}
                                                className={` ${selectedOption === option.id
                                                    ? "text-color-primary border-color-primary"
                                                    : "text-black border-black"
                                                    }`}
                                            />
                                            <label className="mb-1" htmlFor={option.id}>{option.label}</label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-10 md:mt-0 col-span-3 md:col-span-1'>
                        <div className='border rounded-md text-slate-500'>
                            <div className='p-6 flex flex-col gap-y-2'>
                                <div className='flex justify-between items-center'>
                                    <p>Item total</p>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    <p>${sum(products.map((item) => item?.price * item?.quantity))}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p>Discount</p>
                                    <p className='text-green-500'>-$0</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p>Delivery fee</p>
                                    <p className='text-green-500'>FREE</p>
                                </div>
                            </div>

                            <div className='px-6'>
                                <div className='w-full border-b border-dashed '></div>
                            </div>

                            <div className='p-6'>
                                <div className='flex justify-between text-black text-lg'>
                                    <h1>Grand total</h1>
                                    <p>${sum(products.map((item) => item?.price * item?.quantity))}</p>
                                </div>
                                <p>Inclusive of all taxes</p>
                            </div>

                            <div className='px-6'>
                                <div className='w-full border-b border-dashed '></div>
                            </div>

                            <div className='p-6'>
                                <h1 className='text-gray-500'>Average delivery time: <span className='text-black'>3-5 days</span></h1>
                            </div>

                            <div className='border-t p-2'>
                                <button onClick={handleCreateOrder} className='text-black hover:bg-color-simple bg-color-primary py-3 w-full rounded-md'>Proceed to pay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment