import banner from "../assets/banner.jpg"
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-w-[1024px] py-10 sm:py-16 mx-auto px-3 lg:px-0">
    {/* Grid */}
    <div className="grid md:grid-cols-2 gap-5 md:gap-8 xl:gap-20  md:items-center">
      <div>
        <h1 className="scroll-m-20 text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
        Transform Your Space with Beautiful, Lush Greenery
        </h1>
        <p className="mt-3 text-xs sm:text-lg text-muted-foreground">
            Explore Our Wide Selection of Plants, from Vibrant Flowers to Thriving Houseplants. Find Your Perfect Plant Today!
        </p>
        {/* Buttons */}
        <div className="mt-4 sm:mt-7 grid gap-3 w-full sm:inline-flex">
          <NavLink to="/products">
            <button className="bg-color-primary hover:bg-color-simple text-black py-1.5 sm:py-3 px-3 sm:px-5 text-sm sm:text-md rounded-md font-semibold">All products</button>
          </NavLink>
        </div>
      </div>
      {/* Col */}
      <div className="relative">
        <img
          className="w-full rounded-md"
          src={banner}
          alt="Banner Image"
        />
      </div>
      {/* End Col */}
    </div>
    {/* End Grid */}
  </div>
  )
}

export default Hero