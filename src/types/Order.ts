import { TProduct } from "./product";

export type TOrder = {
    name: string;
    phone: string;
    address: string;
    email: string;
    products: TProduct[]
    
}