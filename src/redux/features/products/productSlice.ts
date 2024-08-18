import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TProduct = {
    _id?: string;
    title: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    rating: number;
    image: string;
}

export type TUserInfo = {
    name: string;
    email: string;
    phone: string;
    address: string;
}

type TInitialState = {
    products: TProduct[],
    userInfo: TUserInfo
}

const initialState: TInitialState = {
    products: [],
    userInfo: {
        name: "",
        email: "",
        phone: "",
        address: ""
    }
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<TProduct>) => {
            const isExists = state.products.find(item => item?._id == action.payload._id )
            if(isExists){
                isExists.quantity = isExists.quantity + 1;
            }else {
                state.products.push({...action.payload, quantity: 1})
            }
            
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((item) => item._id !== action.payload)
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex((item) => item._id === action.payload._id);
            
            if(index){
                state.products[index] = action.payload;
            }
        },
        addUserInfo: (state, action: PayloadAction<TUserInfo>) => {
            state.userInfo = {...action.payload}
        },
        clearCart: (state) => {
            state.products = [],
            state.userInfo = {
                name: "",
                email: "",
                phone: "",
                address: ""
            }
        }

    }
})

export const { addProductToCart, removeProduct, updateProduct, addUserInfo, clearCart } = productSlice.actions;

export default productSlice.reducer;