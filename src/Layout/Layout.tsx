import { NavLink, Outlet } from "react-router";



export default function Layout(){

    return(
        <>
            <header className="flex p-10 gap-10 justify-center">
                <NavLink className='text-2xl font-bold text-blue-700' to="/">Jotai</NavLink>
                <NavLink className='text-2xl font-bold text-red-700' to="redux">Redux</NavLink>
            </header>
            <Outlet/>
        </>
    )
}