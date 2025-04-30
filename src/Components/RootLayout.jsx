import NavBar from "./NavBar"
import { Outlet } from "@tanstack/react-router"

const RootLayout = () => {
    return (
        <div>
            <NavBar/>
            <div className = "countainer mx-auto px-4 py-8"></div>
            <Outlet/>
        </div>
        
    )
}

export default RootLayout;