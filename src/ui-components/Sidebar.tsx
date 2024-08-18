/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useState } from "react"
import logo from "../assets/logo.png"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { House, ShoppingBag, SlidersVertical, Sprout } from "lucide-react"
import { NavLink } from "react-router-dom"
  


const Sidebar = ({children}: {children: ReactNode}) => {
    
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
    <Sheet key="right" open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger>{children}</SheetTrigger>
            <SheetContent className="w-[90%] sm:w-[540px] p-0 m-0">
                <SheetHeader className="bg-color-primary p-2 flex justify-center items-center ">
                    <img src={logo} className="h-12 w-12" alt="Nursery Logo" />
                    <span className="text-xl sm:text-2xl font-bold mt-[-5px]">Nursery Club</span>
                </SheetHeader>
                <div className="flex flex-col gap-y-4 p-6">
                <SheetClose onClick={() => { setSheetOpen(false) }}>
                    <div className="flex items-center gap-x-3">
                        <ShoppingBag className="text-color-primary h-6 w-6"/>
                        <NavLink className="text-md" to="/cart">Cart</NavLink>
                    </div>
                </SheetClose>
                <SheetClose onClick={() => { setSheetOpen(false) }}>
                    <div className="flex items-center gap-x-3">
                        <House className="text-color-primary h-6 w-6"/>
                        <NavLink className="text-md" to="/">Home</NavLink>
                    </div>
                </SheetClose>
                <SheetClose onClick={() => { setSheetOpen(false) }}>
                    <div className="flex items-center gap-x-3">
                        <Sprout className="text-color-primary h-6 w-6"/>
                        <NavLink className="text-md" to="/products">Products</NavLink>
                    </div>
                </SheetClose>
                <SheetClose onClick={() => { setSheetOpen(false) }}>
                    <div className="flex items-center gap-x-3">
                        <SlidersVertical className="text-color-primary h-6 w-6"/>
                        <NavLink className="text-md" to="/manage-products">Management</NavLink>
                    </div>
                </SheetClose>
                </div>
            </SheetContent>
        </Sheet>

  )
}

export default Sidebar