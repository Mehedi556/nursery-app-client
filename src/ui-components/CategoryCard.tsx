import { TCategory } from "@/types/category"


const CategoryCard = ({item}: {item: TCategory}) => {

  return (
    <div className="relative group">
      <img src={item?.imageUrl} className="object-cover object-center h-[300px] w-[100%] relative" alt="category" />
      <div className="absolute flex justify-center w-[100%]  bottom-5 text-black font-medium tracking-wide">
        <div className=" w-4/5 hover:w-5/5 bg-color-primary rounded-lg mx-auto text-center p-1 uppercase">
          <h2 className="">{item?.title}</h2>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-[rgba(174,213,129,0.60)] overflow-hidden w-[100%] h-0 group-hover:h-full transition-all duration-500 ease-in-out mx-auto">
        <div className="">
          <h1 className="w-full mt-10 text-center text-Black font-bold text-xl absolute tracking-wide p-1">{item?.heading}</h1>
          <p className="w-full mt-28 text-center text-gray-800 text-sm font-semibold absolute tracking-wide p-1">{item?.description}</p>
        </div>
        
      </div>
    </div>
  )
}

export default CategoryCard