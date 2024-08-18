import logo from "../assets/logo.png"
const Footer = () => {
  return (
    <div className="border border-t-color-primary border-t-2">
        <div className="max-w-[1024px] mx-auto grid grid-cols-6 py-3 gap-y-5  px-3 lg:px-0">
            <div className="col-span-6 sm:col-span-2 flex justify-center sm:justify-start">
                <img className="h-28 w-28" src={logo} alt="" />
            </div>
            <div className="col-span-6 sm:col-span-2 text-center">
                <h1 className="font-semibold text-sm">Who we are?</h1>
                <p className="text-xs text-gray-800 pt-1">Enhance your outdoor living space with our range of outdoor plants. Whether your looking for hardy shrubs, climbing vines, or decorative grasses, we have the perfect plants to create a stunning and sustainable garden.</p>
            </div>
            <div className="col-span-6 sm:col-span-2 flex text-center justify-center sm:justify-end">
                <div>
                    <h1 className="font-semibold text-sm">Important Links</h1>
                    <ul className="text-xs text-gray-800 pt-1 flex flex-col gap-y-1">
                        <li>Home</li>
                        <li>Products</li>
                        <li>Management</li>
                    </ul>
                </div>
                
            </div>
        </div>
        <div className="flex justify-center bg-color-primary">
            <p className="text-xs py-3">© 2024 Nursery Club ™.  All Rights Reserved.</p>
        </div>
    </div>
    
  )
}

export default Footer