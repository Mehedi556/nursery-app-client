import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"


const MainLayout = () => {
    return (
        <div className="mx-auto">
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
            
        </div>
    )
}

export default MainLayout